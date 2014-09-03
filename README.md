TimeAttack Ionic app
=====================

## Installation

To use this project as is, first clone the repo from GitHub, then run:

```bash
$ cd time-attack-ionic
$ npm install -g cordova ionic gulp ripple-emulator
$ npm install
$ gulp install
```

### Prepare JavaScript application

```bash
gulp clean && glp build
```
Now you're ready to compile native build!

### Install required plugins

```bash
ionic plugin add org.apache.cordova.geolocation
ionic plugin add org.apache.cordova.inappbrowser
```

## Using Sass (optional)

This project makes it easy to use Sass (the SCSS syntax) in your projects. This enables you to override styles from Ionic, and benefit from
Sass's great features.

Just update the `app/scss/ionic.app.scss` file, and run `gulp` or `gulp watch` to rebuild the CSS files for Ionic.

```html
<!-- IF using Sass (run gulp sass first), then remove the CSS include above
<link href="css/ionic.app.css" rel="stylesheet">
-->
```

## Run Ripple emulator

To run project with Ripple emulator use:

```bash
gulp clean && gulp
```

## Build native app

First, add desired platform:

```bash
ionic platform add android
```

Then you can build native app for installed platforms:

```bash
gulp build && ionic build android
```
