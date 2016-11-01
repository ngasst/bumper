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
var readline_1 = __webpack_require__(9);
var actions_1 = __webpack_require__(10);
var chalk = __webpack_require__(2);
var args = process.argv.filter(function (a, i) { return i > 1; });
if (args.length > 0) {
    Promise.resolve()
        .then(function () {
        return new Promise(function (resolve, reject) {
            bumpers_1.bumpers
                .filter(function (f) { return f.name === args[0]; })
                .forEach(function (f) {
                var p = path_1.resolve('package.json');
                console.log(chalk.yellow("Bumping up " + f.name + " version based on version reported in file: \n\r" + p));
                f(p)
                    .then(function () {
                    args.shift(); //remove the first element, which happens to be the type of bump, which we already covered.
                    var line = readline_1.createInterface(process.stdin, process.stdout);
                    Promise.resolve()
                        .then(function () { return args.indexOf('--git') !== -1 ? actions_1.git(line, f.name) : false; })
                        .then(function () { return args.indexOf('--npm') !== -1 ? actions_1.npm(line, f.name) : false; })
                        .then(function () {
                        console.log(chalk.bgGreen('Fished!'));
                        resolve(true);
                        process.exit();
                    })
                        .catch(function (err) {
                        console.error(chalk.red(err));
                        reject(err);
                    });
                })
                    .catch(function (err) {
                    console.log(chalk.red(err));
                    reject(err);
                });
            });
        });
    })
        .catch(function (err) { return console.error(chalk.red(err)); });
}
else {
    console.log(chalk.magenta("Please specify which level of versioning you which to bump.\n\rAcceptable values are: " + chalk.bold('"patch"') + ", " + chalk.bold('"minor"') + ", " + chalk.bold('"major"')));
    process.exit(0);
}


/***/ },
/* 8 */
/***/ function(module, exports) {

module.exports = require("child_process");

/***/ },
/* 9 */
/***/ function(module, exports) {

module.exports = require("readline");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var git_1 = __webpack_require__(11);
exports.git = git_1.git;
var npm_1 = __webpack_require__(12);
exports.npm = npm_1.npm;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var child_process_1 = __webpack_require__(8);
var chalk = __webpack_require__(2);
function git(line, type) {
    return new Promise(function (resolve, reject) {
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
            line.question("Please enter the message to append to this git commit.\n\r\tdefault is: \"bump " + type + " version number\"", function (answer) {
                var message;
                answer.trim() === '' ? message = "bump " + type + " version number" : message = answer;
                child_process_1.exec("git commit -m\"" + message + "\"", function (err, stdout, stdin) {
                    if (err) {
                        console.error(chalk.red(err.message));
                        process.exit(1);
                    }
                    console.info(chalk.green(stdout));
                    resolve(true);
                });
            });
        });
    });
}
exports.git = git;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var child_process_1 = __webpack_require__(8);
var chalk = __webpack_require__(2);
function npm(line, type) {
    return new Promise(function (resolve, reject) {
        child_process_1.exec('npm whoami', function (err, stdout, stderr) {
            if (err) {
                console.error(chalk.red("It appears you are not logged in. Please run \"npm login first and try again...\"\r\n\t" + err.message));
                process.exit(1);
            }
            var username = stdout;
            line.question("Is this your npm username? (" + username + ")\r\n\tPlease write \"yes\" or \"no\" explicitly to continue.", function (answer) {
                if (answer.trim() === 'no') {
                    console.log(chalk.blue('Log into npm with the desired username/password before trying again.'));
                    process.exit(0);
                }
                if (answer.trim() === 'yes') {
                    child_process_1.exec('npm publish', function (err, stdout, stderr) {
                        if (err) {
                            console.log(chalk.red("An error occured. Please correct and try again!\r\n\t" + err.message));
                            process.exit(1);
                        }
                        console.info(chalk.green(stdout));
                        resolve(true);
                    });
                }
            });
        });
    });
}
exports.npm = npm;


/***/ }
/******/ ]);
//# sourceMappingURL=index.js.map