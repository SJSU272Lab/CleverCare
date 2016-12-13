FROM node:argon

# Create app directory
RUN mkdir -p /usr/src/client
WORKDIR /usr/src/client

# Install app dependencies
COPY clevercare-client/package.json /usr/src/client/
RUN npm install

# Bundle app source
COPY ./clevercare-client /usr/src/client

EXPOSE 3000
CMD [ "npm", "start" ]