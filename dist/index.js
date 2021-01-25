require('./sourcemap-register.js');module.exports =
/******/ (function(modules, runtime) { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	__webpack_require__.ab = __dirname + "/";
/******/
/******/ 	// the startup function
/******/ 	function startup() {
/******/ 		// Load entry module and return exports
/******/ 		return __webpack_require__(109);
/******/ 	};
/******/
/******/ 	// run startup
/******/ 	return startup();
/******/ })
/************************************************************************/
/******/ ({

/***/ 87:
/***/ (function(module) {

module.exports = require("os");

/***/ }),

/***/ 109:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(__webpack_require__(186));
const slug_1 = __webpack_require__(565);
const short_1 = __webpack_require__(213);
const partial_1 = __webpack_require__(373);
const SEPARATOR = '/';
/**
 * Inputs environments variables keys from Github actions job
 * see https://docs.github.com/en/actions/configuring-and-managing-workflows/using-environment-variables#default-environment-variables
 */
const GITHUB_REPOSITORY = 'GITHUB_REPOSITORY';
const GITHUB_REF = 'GITHUB_REF';
const GITHUB_HEAD_REF = 'GITHUB_HEAD_REF';
const GITHUB_BASE_REF = 'GITHUB_BASE_REF';
const GITHUB_SHA = 'GITHUB_SHA';
const GITHUB_EVENT_PATH = 'GITHUB_EVENT_PATH';
/**
 * Partial outputs environments variables keys
 */
const GITHUB_REPOSITORY_OWNER_PART = 'GITHUB_REPOSITORY_OWNER_PART';
const GITHUB_REPOSITORY_NAME_PART = 'GITHUB_REPOSITORY_NAME_PART';
/**
 * Slugged outputs environments variables keys
 */
const GITHUB_REPOSITORY_SLUG = 'GITHUB_REPOSITORY_SLUG';
const GITHUB_REPOSITORY_OWNER_PART_SLUG = 'GITHUB_REPOSITORY_OWNER_PART_SLUG';
const GITHUB_REPOSITORY_NAME_PART_SLUG = 'GITHUB_REPOSITORY_NAME_PART_SLUG';
const GITHUB_REF_SLUG = 'GITHUB_REF_SLUG';
const GITHUB_HEAD_REF_SLUG = 'GITHUB_HEAD_REF_SLUG';
const GITHUB_BASE_REF_SLUG = 'GITHUB_BASE_REF_SLUG';
const GITHUB_EVENT_REF_SLUG = 'GITHUB_EVENT_REF_SLUG';
/**
 * URL-Slugged outputs environments variables keys
 */
const GITHUB_REPOSITORY_SLUG_URL = 'GITHUB_REPOSITORY_SLUG_URL';
const GITHUB_REPOSITORY_OWNER_PART_SLUG_URL = 'GITHUB_REPOSITORY_OWNER_PART_SLUG_URL';
const GITHUB_REPOSITORY_NAME_PART_SLUG_URL = 'GITHUB_REPOSITORY_NAME_PART_SLUG_URL';
const GITHUB_REF_SLUG_URL = 'GITHUB_REF_SLUG_URL';
const GITHUB_HEAD_REF_SLUG_URL = 'GITHUB_HEAD_REF_SLUG_URL';
const GITHUB_BASE_REF_SLUG_URL = 'GITHUB_BASE_REF_SLUG_URL';
const GITHUB_EVENT_REF_SLUG_URL = 'GITHUB_EVENT_REF_SLUG_URL';
/**
 * Shorted outputs environments variables keys
 */
const GITHUB_SHA_SHORT = 'GITHUB_SHA_SHORT';
const GITHUB_EVENT_PULL_REQUEST_HEAD_SHA_SHORT = 'GITHUB_EVENT_PULL_REQUEST_HEAD_SHA_SHORT';
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const eventPath = process.env[GITHUB_EVENT_PATH];
            if (eventPath) {
                const eventData = yield Promise.resolve().then(() => __importStar(require(eventPath)));
                if (eventData.hasOwnProperty('ref')) {
                    core.exportVariable(GITHUB_EVENT_REF_SLUG, slug_1.slugref(eventData.ref));
                    core.exportVariable(GITHUB_EVENT_REF_SLUG_URL, slug_1.slugurlref(eventData.ref));
                }
                else if (eventData.hasOwnProperty('pull_request')) {
                    core.exportVariable(GITHUB_EVENT_PULL_REQUEST_HEAD_SHA_SHORT, short_1.shortsha(eventData.pull_request.head.sha));
                }
            }
            exportFirstPart(GITHUB_REPOSITORY, SEPARATOR, GITHUB_REPOSITORY_OWNER_PART);
            exportSecondPart(GITHUB_REPOSITORY, SEPARATOR, GITHUB_REPOSITORY_NAME_PART);
            exportSlug(GITHUB_REPOSITORY, GITHUB_REPOSITORY_SLUG);
            exportFirstPartSlug(GITHUB_REPOSITORY, SEPARATOR, GITHUB_REPOSITORY_OWNER_PART_SLUG);
            exportSecondPartSlug(GITHUB_REPOSITORY, SEPARATOR, GITHUB_REPOSITORY_NAME_PART_SLUG);
            exportSlugUrl(GITHUB_REPOSITORY, GITHUB_REPOSITORY_SLUG_URL);
            exportFirstPartSlugUrl(GITHUB_REPOSITORY, SEPARATOR, GITHUB_REPOSITORY_OWNER_PART_SLUG_URL);
            exportSecondPartSlugUrl(GITHUB_REPOSITORY, SEPARATOR, GITHUB_REPOSITORY_NAME_PART_SLUG_URL);
            exportSlugRef(GITHUB_REF, GITHUB_REF_SLUG);
            exportSlugRef(GITHUB_HEAD_REF, GITHUB_HEAD_REF_SLUG);
            exportSlugRef(GITHUB_BASE_REF, GITHUB_BASE_REF_SLUG);
            exportSlugUrlRef(GITHUB_REF, GITHUB_REF_SLUG_URL);
            exportSlugUrlRef(GITHUB_HEAD_REF, GITHUB_HEAD_REF_SLUG_URL);
            exportSlugUrlRef(GITHUB_BASE_REF, GITHUB_BASE_REF_SLUG_URL);
            exportShortSha(GITHUB_SHA, GITHUB_SHA_SHORT);
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
function exportFirstPart(inputKey, separator, outputKey) {
    const envVar = process.env[inputKey];
    if (envVar) {
        core.exportVariable(outputKey, partial_1.get_first_part(envVar, separator));
    }
}
function exportSecondPart(inputKey, separator, outputKey) {
    const envVar = process.env[inputKey];
    if (envVar) {
        core.exportVariable(outputKey, partial_1.get_second_part(envVar, separator));
    }
}
function exportSlug(inputKey, outputKey) {
    const envVar = process.env[inputKey];
    if (envVar) {
        core.exportVariable(outputKey, slug_1.slug(envVar));
    }
}
function exportFirstPartSlug(inputKey, separator, outputKey) {
    const envVar = process.env[inputKey];
    if (envVar) {
        const value = partial_1.get_first_part(envVar, separator);
        core.exportVariable(outputKey, slug_1.slug(value));
    }
}
function exportSecondPartSlug(inputKey, separator, outputKey) {
    const envVar = process.env[inputKey];
    if (envVar) {
        const value = partial_1.get_second_part(envVar, separator);
        core.exportVariable(outputKey, slug_1.slug(value));
    }
}
function exportSlugRef(inputKey, outputKey) {
    const envVar = process.env[inputKey];
    if (envVar) {
        core.exportVariable(outputKey, slug_1.slugref(envVar));
    }
}
function exportSlugUrl(inputKey, outputKey) {
    const envVar = process.env[inputKey];
    if (envVar) {
        core.exportVariable(outputKey, slug_1.slugurl(envVar));
    }
}
function exportFirstPartSlugUrl(inputKey, separator, outputKey) {
    const envVar = process.env[inputKey];
    if (envVar) {
        const value = partial_1.get_first_part(envVar, separator);
        core.exportVariable(outputKey, slug_1.slugurl(value));
    }
}
function exportSecondPartSlugUrl(inputKey, separator, outputKey) {
    const envVar = process.env[inputKey];
    if (envVar) {
        const value = partial_1.get_second_part(envVar, separator);
        core.exportVariable(outputKey, slug_1.slugurl(value));
    }
}
function exportSlugUrlRef(inputKey, outputKey) {
    const envVar = process.env[inputKey];
    if (envVar) {
        core.exportVariable(outputKey, slug_1.slugurlref(envVar));
    }
}
function exportShortSha(inputKey, outputKey) {
    const envVar = process.env[inputKey];
    if (envVar) {
        core.exportVariable(outputKey, short_1.shortsha(envVar));
    }
}
run();


/***/ }),

/***/ 186:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __webpack_require__(351);
const file_command_1 = __webpack_require__(717);
const utils_1 = __webpack_require__(278);
const os = __importStar(__webpack_require__(87));
const path = __importStar(__webpack_require__(622));
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function exportVariable(name, val) {
    const convertedVal = utils_1.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = process.env['GITHUB_ENV'] || '';
    if (filePath) {
        const delimiter = '_GitHubActionsFileCommandDelimeter_';
        const commandValue = `${name}<<${delimiter}${os.EOL}${convertedVal}${os.EOL}${delimiter}`;
        file_command_1.issueCommand('ENV', commandValue);
    }
    else {
        command_1.issueCommand('set-env', { name }, convertedVal);
    }
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    command_1.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    const filePath = process.env['GITHUB_PATH'] || '';
    if (filePath) {
        file_command_1.issueCommand('PATH', inputPath);
    }
    else {
        command_1.issueCommand('add-path', {}, inputPath);
    }
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.  The value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
    command_1.issueCommand('set-output', { name }, value);
}
exports.setOutput = setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */
function setCommandEcho(enabled) {
    command_1.issue('echo', enabled ? 'on' : 'off');
}
exports.setCommandEcho = setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */
function isDebug() {
    return process.env['RUNNER_DEBUG'] === '1';
}
exports.isDebug = isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    command_1.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 */
function error(message) {
    command_1.issue('error', message instanceof Error ? message.toString() : message);
}
exports.error = error;
/**
 * Adds an warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 */
function warning(message) {
    command_1.issue('warning', message instanceof Error ? message.toString() : message);
}
exports.warning = warning;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    command_1.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    command_1.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveState(name, value) {
    command_1.issueCommand('save-state', { name }, value);
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 213:
/***/ (function(__unusedmodule, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.shortsha = void 0;
const SHORT_SHA_SIZE = 8;
/**
 * slug will take envVar and then :
 * - limit the string size to 8 characters
 * @param envVar to be slugged
 */
function shortsha(envVar) {
    return envVar.substring(0, SHORT_SHA_SIZE);
}
exports.shortsha = shortsha;


/***/ }),

/***/ 278:
/***/ (function(__unusedmodule, exports) {

"use strict";

// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */
function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    }
    else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}
exports.toCommandValue = toCommandValue;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 351:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const os = __importStar(__webpack_require__(87));
const utils_1 = __webpack_require__(278);
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        if (first) {
                            first = false;
                        }
                        else {
                            cmdStr += ',';
                        }
                        cmdStr += `${key}=${escapeProperty(val)}`;
                    }
                }
            }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
    }
}
function escapeData(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
function escapeProperty(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}
//# sourceMappingURL=command.js.map

/***/ }),

/***/ 373:
/***/ (function(__unusedmodule, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.get_second_part = exports.get_first_part = void 0;
/**
 * Get the first part of envVar
 * @param envVar to be split
 * @param separator of the split
 */
function get_first_part(envVar, separator) {
    return envVar.replace(RegExp(`${separator}.*$`), '');
}
exports.get_first_part = get_first_part;
/**
 * Get the second part of envVar
 * @param envVar to be split
 * @param separator of the split
 */
function get_second_part(envVar, separator) {
    return envVar.replace(RegExp(`^.*${separator}`), '');
}
exports.get_second_part = get_second_part;


/***/ }),

/***/ 565:
/***/ (function(__unusedmodule, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.slugurlref = exports.slugurl = exports.slugref = exports.slug = void 0;
const MAX_SLUG_STRING_SIZE = 63;
/**
 * slug will take envVar and then :
 * - put the variable content in lower case
 * - replace any character by `-` except `0-9`, `a-z`, and `.`
 * - remove leading and trailing `-` character
 * - limit the string size to 63 characters
 * @param envVar to be slugged
 */
function slug(envVar) {
    return trailHyphen(replaceAnyNonAlphanumericCaracter(envVar.toLowerCase())).substring(0, MAX_SLUG_STRING_SIZE);
}
exports.slug = slug;
/**
 * slug will take envVar and then :
 * - remove refs/(heads|tags)/
 * - put the variable content in lower case
 * - replace any character by `-` except `0-9`, `a-z`, and `.`
 * - remove leading and trailing `-` character
 * - limit the string size to 63 characters
 * @param envVar to be slugged
 */
function slugref(envVar) {
    return slug(removeRef(envVar.toLowerCase()));
}
exports.slugref = slugref;
/**
 * slug will take envVar and then :
 * - put the variable content in lower case
 * - replace any character by `-` except `0-9`, `a-z`
 * - remove leading and trailing `-` character
 * - limit the string size to 63 characters
 * @param envVar to be slugged
 */
function slugurl(envVar) {
    return slug(replaceAnyDotToHyphen(envVar));
}
exports.slugurl = slugurl;
/**
 * slug will take envVar and then :
 * - remove refs/(heads|tags)/
 * - put the variable content in lower case
 * - replace any character by `-` except `0-9`, `a-z`
 * - remove leading and trailing `-` character
 * - limit the string size to 63 characters
 * @param envVar to be slugged
 */
function slugurlref(envVar) {
    return slugurl(slugref(envVar));
}
exports.slugurlref = slugurlref;
function trailHyphen(envVar) {
    return envVar.replace(RegExp('^-*', 'g'), '').replace(RegExp('-*$', 'g'), '');
}
function replaceAnyNonAlphanumericCaracter(envVar) {
    return envVar.replace(RegExp('[^a-z0-9.]', 'g'), '-');
}
function replaceAnyDotToHyphen(envVar) {
    return envVar.replace(RegExp('[.]', 'g'), '-');
}
function removeRef(envVar) {
    return envVar.replace(RegExp('^refs/(heads|tags|pull)/'), '');
}


/***/ }),

/***/ 622:
/***/ (function(module) {

module.exports = require("path");

/***/ }),

/***/ 717:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

// For internal use, subject to change.
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs = __importStar(__webpack_require__(747));
const os = __importStar(__webpack_require__(87));
const utils_1 = __webpack_require__(278);
function issueCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
    }
    if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
    }
    fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
        encoding: 'utf8'
    });
}
exports.issueCommand = issueCommand;
//# sourceMappingURL=file-command.js.map

/***/ }),

/***/ 747:
/***/ (function(module) {

module.exports = require("fs");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map