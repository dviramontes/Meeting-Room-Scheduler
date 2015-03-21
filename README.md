

points of interest : **src/main.js and test/main.spec.js**

###setup

* [install jspm](http://jspm.io/)

* then run `jspm install` and `npm install`

###test

* with [Karma Test Runner installed](http://karma-runner.github.io/0.12/index.html), run:

* `karma start karma.config.js`

###production

+ build with system.js + config.js :
    - `jspm bundle src/main build.js --inject`
    

+ build with system.js + config.js + self-executing-modul();

    - `jspm bundle-sfx src/main build.js`
    
    - minified `jspm bundle-sfx src/main build.js --minify`
