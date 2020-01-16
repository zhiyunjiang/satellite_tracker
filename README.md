# What is?
This application is the tracker of International Satelite Statation(ISS) on 3D map.

https://satelite-tracker-f293f.firebaseapp.com

# Requirement
```
$ node -v
v11.13.0

$ npm -v
6.7.0

$ python -V
Python 3.7.5

$ pipenv --version
pipenv, version 2018.11.26
```

# Get starting
```
# Clone
$ git clone <repo>
$ cd path/to/repo

# Build
$ pipenv install --dev
$ npm install 

# Start
$ pipenv run start
$ npm start

$ open http://localhost:3001
```

# Deployment

## Deploying the backend function to Google Cloud Functions

* Install `google-cloud-sdk` and `gcloud init`

* Generate `requirements.txt`
```
$ pipenv lock -r > requirements.txt
```

* Deploy

`APPLICATION_URL` is the page url calls google cloud function.

```
$ gcloud functions deploy orbitals --trigger-http --runtime=python37 --set-env-vars APPLICATION_URL=<application url>
```
