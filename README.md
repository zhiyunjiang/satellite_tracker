# What is?
This application is the tracker of International Satelite Statation(ISS) on 3D/2D geological map.

<img src="https://camo.qiitausercontent.com/520c5e0d76ccef66dc11d02ab7912249ce88acfa/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3231383530362f35316666336164302d663239622d383233362d356262362d6239373038663934343862352e676966" alt="satelite-tracker2.gif" data-canonical-src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/218506/51ff3ad0-f29b-8236-5bb6-b9708f9448b5.gif">

If you know details of this app, please read the following post,

[バーチャル地球儀上で国際宇宙ステーションの現在位置が分かるアプリの開発](https://qiita.com/Ushinji/items/76d4901658bce767df36)

# Requirement

* node.js: >= 16

# Get starting

```
# Build
$ npm install

# Make Symbolic link
$ npx symlink-dir node_modules/cesium/Build/Cesium public/cesium

# Start
$ npm run dev

$ open http://localhost:3000
```

# Deployment

## Set Environmental Variables

|  Name  | Description |
| ---- | ---- |
|  CLOUD_FUNCTIONS_BASE_URL  |  Clound Functions base url. This is only used on production. |
|  GA_TRACKING_CODE  |  Google Analytics code. This is only used on production. |
