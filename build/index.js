require("source-map-support").install();
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

module.exports = require("fs-extra");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var patch_1 = __webpack_require__(6);
var minor_1 = __webpack_require__(5);
var major_1 = __webpack_require__(4);
exports.bumpers = [patch_1.patch, minor_1.minor, major_1.major];


/***/ },
/* 2 */
/***/ function(module, exports) {

module.exports = require("chalk");

/***/ },
/* 3 */
/***/ function(module, exports) {

module.exports = require("path");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var fs_extra_1 = __webpack_require__(0);
function major(path) {
    return new Promise(function (resolve, reject) {
        fs_extra_1.readJSON(path, function (err, data) {
            if (err)
                reject(err);
            var versionArray = data.version.split('.');
            var major = versionArray[0];
            var majorNumber = parseInt(major);
            var newMajorNumber = majorNumber + 1;
            var newVersion = newMajorNumber + "." + versionArray[1] + "." + versionArray[2];
            var newPackage = Object.assign({}, data, { version: newVersion });
            fs_extra_1.outputJSON(path, newPackage, function (err) {
                if (err)
                    reject(err);
                resolve(true);
            });
        });
    });
}
exports.major = major;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var fs_extra_1 = __webpack_require__(0);
function minor(path) {
    return new Promise(function (resolve, reject) {
        fs_extra_1.readJSON(path, function (err, data) {
            if (err)
                reject(err);
            var versionArray = data.version.split('.');
            var minor = versionArray[1];
            var minorNumber = parseInt(minor);
            var newMinorNumber = minorNumber + 1;
            var newVersion = versionArray[0] + "." + newMinorNumber + "." + versionArray[2];
            var newPackage = Object.assign({}, data, { version: newVersion });
            fs_extra_1.outputJSON(path, newPackage, function (err) {
                if (err)
                    reject(err);
                resolve(true);
            });
        });
    });
}
exports.minor = minor;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var fs_extra_1 = __webpack_require__(0);
function patch(path) {
    return new Promise(function (resolve, reject) {
        fs_extra_1.readJSON(path, function (err, data) {
            if (err)
                reject(err);
            var versionArray = data.version.split('.');
            var patch = versionArray[2];
            var patchNumber = parseInt(patch);
            var newPatchNumber = patchNumber + 1;
            var newVersion = versionArray[0] + "." + versionArray[1] + "." + newPatchNumber;
            var newPackage = Object.assign({}, data, { version: newVersion });
            fs_extra_1.outputJSON(path, newPackage, function (err) {
                if (err)
                    reject(err);
                resolve(true);
            });
        });
    });
}
exports.patch = patch;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var bumpers_1 = __webpack_require__(1);
var path_1 = __webpack_require__(3);
var child_process_1 = __webpack_require__(8);
var readline_1 = __webpack_require__(9);
var chalk = __webpack_require__(2);
var args = process.argv.filter(function (a, i) { return i > 1; });
if (args.length > 0) {
    bumpers_1.bumpers
        .filter(function (f) { return f.name === args[0]; })
        .forEach(function (f) {
        var p = path_1.resolve('package.json');
        console.log(chalk.yellow("Bumping up " + f.name + " version based on version reported in file: \n\r" + p));
        f(p)
            .then(function () {
            args.shift(); //remove the first element, which happens to be the type of bump, which we already covered.
            var line = readline_1.createInterface(process.stdin, process.stdout);
            args.forEach(function (ar) {
                switch (ar.trim()) {
                    case '--git':
                        line.question("List all files you would you like to commit to git.\n\r\t*)Default is \"package.json\"\n\r\t*)pass in \"--all\" to stage and commit all modified files.", function (answer) {
                            if (answer.trim() === '') {
                                child_process_1.exec('git add package.json', function (err, stdout, stderr) {
                                    if (err) {
                                        console.error(chalk.red(err.message));
                                        process.exit(1);
                                    }
                                    console.info(chalk.green(stdout));
                                });
                            }
                            else {
                                child_process_1.exec("git add " + answer.trim(), function (err, stdout, stderr) {
                                    if (err) {
                                        console.error(chalk.red(err.message));
                                        process.exit(1);
                                    }
                                    console.info(chalk.green(stdout));
                                });
                            }
                            line.question("Please enter the message to append to this git commit.\n\r\tdefault is: \"bump " + f.name + " version number\"", function (answer) {
                                var message;
                                answer.trim() === '' ? message = "bump " + f.name + " version number" : message = answer;
                                child_process_1.exec("git commit -m\"" + message + "\"", function (err, stdout, stdin) {
                                    if (err) {
                                        console.error(chalk.red(err.message));
                                        process.exit(1);
                                    }
                                    console.info(chalk.green(stdout));
                                });
                            });
                        });
                        //git add package.json
                        //git commit -m"some message"
                        break;
                    case '--npm':
                        console.log('deal with npm!');
                        //login npm user
                        //handle possible errors
                        //publish file
                        break;
                    default:
                        break;
                }
            });
        })
            .catch(function (er) { return console.log(chalk.red(er)); });
    });
}
else {
    console.log(chalk.magenta("Please specify which level of versioning you which to bump.\n\rAcceptable values are: " + chalk.bold('"patch"') + ", " + chalk.bold('"minor"') + ", " + chalk.bold('"major"')));
}


/***/ },
/* 8 */
/***/ function(module, exports) {

module.exports = require("child_process");

/***/ },
/* 9 */
/***/ function(module, exports) {

module.exports = require("readline");

/***/ }
/******/ ]);
//# sourceMappingURL=index.js.map