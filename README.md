# What is?
This application is the tracker of International Satelite Statation(ISS) on 3D/2D geological map.

https://satelite-tracker-f293f.firebaseapp.com

<img src="https://camo.qiitausercontent.com/520c5e0d76ccef66dc11d02ab7912249ce88acfa/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3231383530362f35316666336164302d663239622d383233362d356262362d6239373038663934343862352e676966" alt="satelite-tracker2.gif" data-canonical-src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/218506/51ff3ad0-f29b-8236-5bb6-b9708f9448b5.gif">

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

## Archtecture on production.

<img src="https://camo.qiitausercontent.com/56ba6cd1908f4de03acfba7dd3584c1c8060a639/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3231383530362f62663561393939392d656265322d653930612d626164352d3533643663333937366236392e706e67" alt="Architecture.png" data-canonical-src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/218506/bf5a9999-ebe2-e90a-bad5-53d6c3976b69.png">

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

### Deployment

* Build assets
```
$ npm run build
```

* Firebase deploy
```
$ firebase deploy
```
