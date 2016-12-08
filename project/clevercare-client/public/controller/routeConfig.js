var rhrApp = angular.module('rhrApp', ['ngRoute', 'angular.morris', 'ngMaterial']);

rhrApp.config(function ($routeProvider) {
    $routeProvider
        .when("/login", {
            templateUrl: "/login.ejs",
            controller: "authController"
        })
        .when("/dashboard", {
            templateUrl: "/dashboard.ejs",
            controller: "dashboardController"
        })
        .when("/patients", {
            templateUrl: "patients.ejs",
            controller: "patientsController"
        })
        .when("/files", {
            templateUrl: "files.ejs",
            controller: "filesController"
        })
        .when("/charts", {
            templateUrl: "charts.ejs",
            controller: "chartsController"
        })
        .when("/settings", {
            templateUrl: "settings.ejs",
            controller: "settingsController"
        })
        .when("/settings/edit", {
            templateUrl: "settingsEdit.ejs",
            controller: "settingsEditController"
        })
        .when("/patientForm", {
            templateUrl: "patientForm.ejs",
            controller: "patientFormController"
        })
        .otherwise({
            templateUrl: "login.ejs",
            controller: "authController"
        });
});
