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

## Set Environmental Variables

|  Name  | Description |
| ---- | ---- |
|  CLOUD_FUNCTIONS_BASE_URL  |  Clound Functions base url. This is only used on production. |
|  GA_TRACKING_CODE  |  Google Analytics code. This is only used on production. |


## Deploying the backend function to Google Cloud Functions

* Install `google-cloud-sdk` and `gcloud init`

* Deploying

`APPLICATION_URL` is the page url calls google cloud function. This url is used as the cors setting.

```
$ gcloud functions deploy orbitals --trigger-http --runtime=python37 --set-env-vars APPLICATION_URL=<application url>
```

## Deploying the frontend asset files to Firebase.
### If you haven't create your Firebase project
1. Create your new firebase project at [the firebase console](https://firebase.google.com/products/hosting/?hl=ja).
2. Install `firebase-tools`
```
$ npm install -g firebase-tools
```
3. Init your firebase project.
```
$ firebase login
$ firebase init
```

### Deploy

* Build assets
```
$ npm run build
```

* Firebase deploy
```
$ firebase deploy
```
