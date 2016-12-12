from __future__ import print_function

import csv2libsvm

import csv
import os
from flask import Flask,json,request,jsonify,session,Response
from datetime import date
from sqlalchemy.sql.expression import func


# $example on$
from pyspark.ml import Pipeline
from pyspark.ml.classification import RandomForestClassifier
from pyspark.ml.feature import IndexToString, StringIndexer, VectorIndexer
from pyspark.ml.evaluation import MulticlassClassificationEvaluator

''''''
from pyspark import SparkConf, SparkContext
from pyspark.sql.types import *
from pyspark.mllib.classification import SVMWithSGD, SVMModel
from pyspark.sql import SQLContext
from pyspark.sql.types import DoubleType
from pyspark.sql.functions import UserDefinedFunction
from pyspark.mllib.regression import LabeledPoint
from pyspark.mllib.tree import DecisionTree
from pyspark.mllib.classification import LogisticRegressionWithLBFGS, LogisticRegressionModel
# $example off$
from pyspark.sql import SparkSession

app = Flask(__name__)

''''''
conf = SparkConf().setAppName("building a warehouse")
sc = SparkContext(conf=conf)
sqlContext = SQLContext(sc)
'''
data = sqlContext.read.load('diabetes_data_modified.csv', 
                      format='com.databricks.spark.csv', 
                      header='true', 
                      inferSchema='true')

binary_map = {  'Yes':1.0, 'No':0.0, 'True':1.0, 'False':0.0, 
            'Caucasian': 0.0, 'AfricanAmerican':1.0, 'defaultRace':2.0, 'Asian':3.0, 'Hispanic':4.0, 'Other':5.0,
            'Male':1.0, 'Female':0.0, 'Other':2.0, 'defaultGender': 3.0,
            '<30': 0.0, '>30': 0.0, 'NO': 1.0, 
            '(null)': 0.0, None: 0.0, 'Unknown/Invalid': 2.0,
            'Steady' : 1.0, 'Up': 2.0, 'Down':3.0
            }
toNum = UserDefinedFunction(lambda k: binary_map[k], DoubleType())

data = data.select('insulin', 'race', 'readmission_result').withColumn('readmission_result', toNum(data['readmission_result'])).withColumn('race', toNum(data['race'])).withColumn('insulin', toNum(data['insulin'])) 
'''
customSchema = StructType([ \
    StructField("num_lab_procedures", StringType(), True), \
    StructField("num_procedures", StringType(), True), \
    StructField("num_medications", StringType(), True), \
    StructField("number_outpatient", StringType(), True), \
    StructField("number_emergency", StringType(), True), \
    StructField("number_inpatient", StringType(), True), \
    StructField("readmission_result", StringType(), True)])

csv2libsvm.startHere("diabetes_learning_data.csv", "libsvm.txt", 6 , True)

data = sqlContext.read.format("libsvm").load("libsvm.txt")

# $example on$
# Load and parse the data file, converting it to a DataFrame.
#data = spark.read.format("libsvm").load("diabetes_data_modified.csv")

# Index labels, adding metadata to the label column.
# Fit on whole dataset to include all labels in index.
#labelIndexer = StringIndexer(inputCol="label", outputCol="indexedLabel").fit(data)

# Automatically identify categorical features, and index them.
# Set maxCategories so features with > 4 distinct values are treated as continuous.
#featureIndexer = VectorIndexer(inputCol="features", outputCol="indexedFeatures", maxCategories=6).fit(data)

# Split the data into training and test sets (30% held out for testing)
(trainingData, testData) = data.randomSplit([0.999, 0.001])

# Train a RandomForest model.
rf = RandomForestClassifier(labelCol="label", featuresCol="features", numTrees=10)

# Chain indexers and forest in a Pipeline
pipeline = Pipeline(stages=[rf])

# Train model.  This also runs the indexers.
model = pipeline.fit(trainingData)

predictions = model.transform(testData)


# Select (prediction, true label) and compute test error
evaluator = MulticlassClassificationEvaluator(labelCol="label", predictionCol="prediction", metricName="accuracy")
accuracy = evaluator.evaluate(predictions)
print ("Accuracy= %g" % (accuracy))
print("Test Error = %g" % (1.0 - accuracy))

rfModel = model.stages[0]
print(rfModel) 

spark = SparkSession.builder.master("local").appName("CleverCare").getOrCreate()

''''''

@app.route("/v1/getScore",methods=['POST'])
def getScore():
    req_data = request.get_json()
    print(req_data)

    arrayofdata=[[req_data['data1'],req_data['data2'],req_data['data3'],req_data['data4'],req_data['data5'],req_data['data6']]]
             
    with open('local_temp_file.csv', 'w') as mycsvfile:
         thedatawriter = csv.writer(mycsvfile)
         for row in arrayofdata:
             thedatawriter.writerow(row)

    csv2libsvm.startHere("local_temp_file.csv", "libsvm.txt", -1 , False)
    testData = sqlContext.read.format("libsvm").load("libsvm.txt")

    os.remove("local_temp_file.csv")

    # Make predictions.
    testData.show()
    predictions = model.transform(testData)

    # Select (prediction, true label) and compute test error
    evaluator = MulticlassClassificationEvaluator(
        labelCol="label", predictionCol="prediction", metricName="accuracy")
    accuracy = evaluator.evaluate(predictions)
    print("Test Error = %g" % (1.0 - accuracy))
    print(evaluator.metricName)

    rfModel = model.stages[0]
    print(rfModel)

    # Select example rows to display.
    rows = predictions.collect()
    row = rows[0]
    print(row)
    responsetempVar = { "result" : {"rawPrediction":row.rawPrediction.tolist(), "probability":row.probability.tolist(), "prediction":row.prediction} }
    response = jsonify(responsetempVar)
    response.status_code = 200
    return response
    #sc.stop()
    
if __name__ == "__main__":
    app.run(debug=False,host="0.0.0.0",port=3000)