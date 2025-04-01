/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./config/config.ts":
/*!**************************!*\
  !*** ./config/config.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = {
    host: 'http://localhost:3000/api'
};


/***/ }),

/***/ "./services/auth.ts":
/*!**************************!*\
  !*** ./services/auth.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Auth = void 0;
var config_1 = __importDefault(__webpack_require__(/*! ../config/config */ "./config/config.ts"));
var Auth = /** @class */ (function () {
    function Auth() {
    }
    Auth.processUnauthorizedResponse = function () {
        return __awaiter(this, void 0, void 0, function () {
            var refreshToken, response, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        refreshToken = localStorage.getItem(this.refreshTokenKey);
                        if (!refreshToken) return [3 /*break*/, 3];
                        return [4 /*yield*/, fetch(config_1.default.host + "/refresh", {
                                method: 'POST',
                                headers: {
                                    'Content-type': "application/json",
                                    'Accept': 'application/json',
                                },
                                body: JSON.stringify({ refreshToken: refreshToken }),
                            })];
                    case 1:
                        response = _a.sent();
                        if (!(response && response.status === 200)) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        result = _a.sent();
                        if (result && !result.error && result.accessToken && result.refreshToken) {
                            this.setTokens(result.accessToken, result.refreshToken);
                            return [2 /*return*/, true];
                        }
                        _a.label = 3;
                    case 3:
                        this.removeTokens();
                        location.href = '#/';
                        return [2 /*return*/, false];
                }
            });
        });
    };
    Auth.logout = function () {
        return __awaiter(this, void 0, void 0, function () {
            var refreshToken, response, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        refreshToken = localStorage.getItem(this.refreshTokenKey);
                        if (!refreshToken) return [3 /*break*/, 3];
                        return [4 /*yield*/, fetch(config_1.default.host + "/logout", {
                                method: 'POST',
                                headers: {
                                    'Content-type': "application/json",
                                    'Accept': 'application/json',
                                },
                                body: JSON.stringify({ refreshToken: refreshToken }),
                            })];
                    case 1:
                        response = _a.sent();
                        if (!(response && response.status === 200)) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        result = _a.sent();
                        if (result && !result.error) {
                            Auth.removeTokens();
                            localStorage.removeItem(Auth.userInfoKey);
                            return [2 /*return*/, true];
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/, false];
                }
            });
        });
    };
    Auth.setTokens = function (accessToken, refreshToken) {
        localStorage.setItem(this.accessTokenKey, accessToken);
        localStorage.setItem(this.refreshTokenKey, refreshToken);
    };
    Auth.removeTokens = function () {
        localStorage.removeItem(this.accessTokenKey);
        localStorage.removeItem(this.refreshTokenKey);
    };
    Auth.setUserInfo = function (info) {
        localStorage.setItem(this.userInfoKey, JSON.stringify(info));
    };
    Auth.getUserInfo = function () {
        var userInfo = localStorage.getItem(this.userInfoKey);
        if (userInfo) {
            return JSON.parse(userInfo);
        }
        return null;
    };
    Auth.accessTokenKey = 'accessToken';
    Auth.refreshTokenKey = 'refreshToken';
    Auth.userInfoKey = 'userInfo';
    return Auth;
}());
exports.Auth = Auth;


/***/ }),

/***/ "./services/custom-http.ts":
/*!*********************************!*\
  !*** ./services/custom-http.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomHttp = void 0;
var auth_1 = __webpack_require__(/*! ./auth */ "./services/auth.ts");
var CustomHttp = /** @class */ (function () {
    function CustomHttp() {
    }
    CustomHttp.request = function (url_1) {
        return __awaiter(this, arguments, void 0, function (url, method, body) {
            var params, token, response, result;
            if (method === void 0) { method = 'GET'; }
            if (body === void 0) { body = null; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {
                            method: method,
                            headers: {
                                'Content-type': "application/json",
                                'Accept': 'application/json',
                            },
                        };
                        token = localStorage.getItem(auth_1.Auth.accessTokenKey);
                        if (token) {
                            params.headers['x-access-token'] = token;
                        }
                        if (body) {
                            params.body = JSON.stringify(body);
                        }
                        return [4 /*yield*/, fetch(url, params)];
                    case 1:
                        response = _a.sent();
                        if (!(response.status < 200 || response.status >= 300)) return [3 /*break*/, 6];
                        if (!(response.status === 401)) return [3 /*break*/, 5];
                        return [4 /*yield*/, auth_1.Auth.processUnauthorizedResponse()];
                    case 2:
                        result = _a.sent();
                        if (!result) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.request(url, method, body)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4: return [2 /*return*/, null];
                    case 5: throw new Error(response.statusText);
                    case 6: return [4 /*yield*/, response.json()];
                    case 7: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return CustomHttp;
}());
exports.CustomHttp = CustomHttp;


/***/ }),

/***/ "./src/components/answers.ts":
/*!***********************************!*\
  !*** ./src/components/answers.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Answers = void 0;
var auth_1 = __webpack_require__(/*! ../../services/auth */ "./services/auth.ts");
var custom_http_1 = __webpack_require__(/*! ../../services/custom-http */ "./services/custom-http.ts");
var config_1 = __importDefault(__webpack_require__(/*! ../../config/config */ "./config/config.ts"));
var url_manager_1 = __webpack_require__(/*! ../utils/url-manager */ "./src/utils/url-manager.ts");
var Answers = /** @class */ (function () {
    function Answers() {
        this.questionTitleElement = null;
        this.quiz = null;
        this.optionsElement = null;
        this.routeParams = url_manager_1.UrlManager.getQueryParams();
        this.init();
    }
    Answers.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userInfo, result, e_1, backToResultButton;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userInfo = auth_1.Auth.getUserInfo();
                        if (!userInfo) {
                            location.href = '#/';
                            return [2 /*return*/];
                        }
                        if (!this.routeParams.id) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, custom_http_1.CustomHttp.request(config_1.default.host + '/tests/' + this.routeParams.id + "/result/details?userId=" + userInfo.userId)];
                    case 2:
                        result = _a.sent();
                        if (result) {
                            console.log(result);
                            this.quiz = result.test;
                            if (result.error) {
                                throw new Error(result.error);
                            }
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [3 /*break*/, 4];
                    case 4:
                        this.setUserName();
                        this.startQuiz();
                        _a.label = 5;
                    case 5:
                        backToResultButton = document.getElementById('back-to-result');
                        if (backToResultButton && this.routeParams.id) {
                            backToResultButton.onclick = function () {
                                location.href = "#/result?id=" + _this.routeParams.id;
                            };
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Answers.prototype.startQuiz = function () {
        if (!this.quiz) {
            return;
        }
        this.questionTitleElement = document.getElementById("question-title");
        this.optionsElement = document.getElementById("options");
        var testNameElement = document.getElementById('test-name');
        if (testNameElement) {
            testNameElement.innerText = this.quiz.name;
        }
        this.showQuestions();
    };
    Answers.prototype.setUserName = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userInfo, fullName, doneTextElement;
            return __generator(this, function (_a) {
                userInfo = auth_1.Auth.getUserInfo();
                if (userInfo) {
                    fullName = userInfo.fullName;
                    doneTextElement = document.getElementById('done-text');
                    if (doneTextElement) {
                        doneTextElement.innerText = fullName;
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    Answers.prototype.showQuestions = function () {
        var _this = this;
        if (!this.quiz)
            return;
        this.quiz.questions.forEach(function (question, index) {
            var questionBlock = document.createElement("div");
            questionBlock.className = "question-block";
            var questionTitle = document.createElement("div");
            questionTitle.className = "test-question-title";
            questionTitle.innerHTML = "<span>\u0412\u043E\u043F\u0440\u043E\u0441 ".concat(index + 1, ":</span> ").concat(question.question);
            questionBlock.appendChild(questionTitle);
            var optionsContainer = document.createElement("div");
            optionsContainer.className = "options-container";
            question.answers.forEach(function (answer) {
                var optionElement = document.createElement("div");
                optionElement.className = "test-question-option";
                var inputId = "answer-".concat(question.id, "-").concat(answer.id);
                var inputElement = document.createElement("input");
                inputElement.className = "option-answer";
                inputElement.setAttribute("id", inputId);
                inputElement.setAttribute("type", "radio");
                inputElement.setAttribute("disabled", "disabled");
                inputElement.setAttribute("name", "answer-".concat(question.id));
                inputElement.setAttribute("value", answer.id.toString());
                var labelElement = document.createElement("label");
                labelElement.setAttribute("for", inputId);
                labelElement.innerText = answer.answer;
                // if (answer.correct === true) {
                //     optionElement.style.color = "#5FDC33";
                //     inputElement.style.display = "block";
                //     inputElement.style.border = "6px solid #5FDC33";
                //     inputElement.setAttribute("checked", "checked");
                // } else if (answer.correct === false) {
                //     optionElement.style.color = "#DC3333";
                //     inputElement.style.display = "block";
                //     inputElement.style.border = "6px solid #DC3333";
                //     inputElement.setAttribute("checked", "checked");
                // }
                optionElement.appendChild(inputElement);
                optionElement.appendChild(labelElement);
                optionsContainer.appendChild(optionElement);
            });
            questionBlock.appendChild(optionsContainer);
            if (_this.optionsElement) {
                _this.optionsElement.appendChild(questionBlock);
            }
        });
    };
    return Answers;
}());
exports.Answers = Answers;


/***/ }),

/***/ "./src/components/choice.ts":
/*!**********************************!*\
  !*** ./src/components/choice.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Choice = void 0;
var url_manager_1 = __webpack_require__(/*! ../utils/url-manager */ "./src/utils/url-manager.ts");
var custom_http_1 = __webpack_require__(/*! ../../services/custom-http */ "./services/custom-http.ts");
var config_1 = __importDefault(__webpack_require__(/*! ../../config/config */ "./config/config.ts"));
var auth_1 = __webpack_require__(/*! ../../services/auth */ "./services/auth.ts");
var Choice = /** @class */ (function () {
    function Choice() {
        this.quizzes = [];
        this.testResult = null;
        this.routeParams = url_manager_1.UrlManager.getQueryParams();
        this.init();
    }
    Choice.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, error_1, userInfo, result, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = this;
                        return [4 /*yield*/, custom_http_1.CustomHttp.request(config_1.default.host + '/tests')];
                    case 1:
                        _a.quizzes = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        console.log(error_1);
                        return [2 /*return*/];
                    case 3:
                        userInfo = auth_1.Auth.getUserInfo();
                        if (!userInfo) return [3 /*break*/, 7];
                        _b.label = 4;
                    case 4:
                        _b.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, custom_http_1.CustomHttp.request(config_1.default.host + '/tests/results?userId=' + userInfo.userId)];
                    case 5:
                        result = _b.sent();
                        if (result) {
                            if (result.error !== undefined) {
                                throw new Error(result.message);
                            }
                            this.testResult = result;
                        }
                        return [3 /*break*/, 7];
                    case 6:
                        error_2 = _b.sent();
                        console.log(error_2);
                        return [2 /*return*/];
                    case 7:
                        this.processQuizzes();
                        return [2 /*return*/];
                }
            });
        });
    };
    Choice.prototype.processQuizzes = function () {
        var _this = this;
        var choiceOptionsElement = document.getElementById("choice-options");
        if (this.quizzes && this.quizzes.length > 0 && choiceOptionsElement) {
            this.quizzes.forEach(function (quiz) {
                var that = _this;
                var choiceOptionElement = document.createElement("div");
                choiceOptionElement.className = ("choice-option");
                choiceOptionElement.setAttribute("data-id", quiz.id.toString());
                choiceOptionElement.onclick = function () {
                    that.chooseQuiz(this);
                };
                var choiceOptionTextElement = document.createElement("div");
                choiceOptionTextElement.className = ("choice-option-text");
                choiceOptionTextElement.innerText = quiz.name;
                var choiceOptionArrowElement = document.createElement("div");
                choiceOptionArrowElement.className = ("choice-option-arrow");
                if (_this.testResult) {
                    var result = _this.testResult.find(function (item) { return item.testId === quiz.id; });
                    if (result) {
                        var choiceOptionResultElement = document.createElement("div");
                        choiceOptionResultElement.className = "choice-option-result";
                        choiceOptionResultElement.innerHTML = '<div>Результат</div><div>' + result.score + '/' + result.total + '</div>';
                        choiceOptionElement.appendChild(choiceOptionResultElement);
                    }
                }
                var choiceOptionImgElement = document.createElement("img");
                choiceOptionImgElement.setAttribute("src", "/img/arrow.png");
                choiceOptionImgElement.setAttribute("alt", "arrow picture");
                choiceOptionArrowElement.appendChild(choiceOptionImgElement);
                choiceOptionElement.appendChild(choiceOptionTextElement);
                choiceOptionElement.appendChild(choiceOptionArrowElement);
                choiceOptionsElement.appendChild(choiceOptionElement);
            });
        }
    };
    Choice.prototype.chooseQuiz = function (element) {
        var dataId = element.getAttribute("data-id");
        if (dataId) {
            location.href = "#/test?id=" + dataId;
        }
    };
    return Choice;
}());
exports.Choice = Choice;


/***/ }),

/***/ "./src/components/form.ts":
/*!********************************!*\
  !*** ./src/components/form.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Form = void 0;
var custom_http_1 = __webpack_require__(/*! ../../services/custom-http */ "./services/custom-http.ts");
var auth_1 = __webpack_require__(/*! ../../services/auth */ "./services/auth.ts");
var config_1 = __importDefault(__webpack_require__(/*! ../../config/config */ "./config/config.ts"));
var Form = /** @class */ (function () {
    function Form(page) {
        this.fields = [];
        this.agreeElement = null;
        this.processElement = null;
        this.page = page;
        var accessToken = localStorage.getItem(auth_1.Auth.accessTokenKey);
        if (accessToken) {
            location.href = '#/choice';
            return;
        }
        this.fields = [
            {
                name: "email",
                id: "email",
                element: null,
                regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                valid: false,
            },
            {
                name: "password",
                id: "password",
                element: null,
                regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                valid: false,
            }
        ];
        if (this.page === 'signup') {
            this.fields.unshift({
                name: "name",
                id: "name",
                element: null,
                regex: /^[А-Я][а-я]+\s*$/,
                valid: false,
            }, {
                name: "lastName",
                id: "lastname",
                element: null,
                regex: /^[А-Я][а-я]+\s*$/,
                valid: false,
            });
        }
        var that = this;
        this.fields.forEach(function (item) {
            item.element = document.getElementById(item.id);
            if (item.element) {
                item.element.onchange = function () {
                    that.validateField.call(that, item, this);
                };
            }
        });
        this.processElement = document.getElementById("process");
        if (this.processElement) {
            this.processElement.onclick = function () {
                that.processForm();
            };
        }
        if (this.page === 'signup') {
            this.agreeElement = document.getElementById("agree");
            if (this.agreeElement) {
                this.agreeElement.onchange = function () {
                    that.validateForm();
                };
            }
        }
    }
    Form.prototype.validateField = function (field, element) {
        if (element.parentNode) {
            if (!element.value || !element.value.match(field.regex)) {
                element.parentNode.style.borderColor = "red";
                field.valid = false;
            }
            else {
                element.parentNode.removeAttribute("style");
                field.valid = true;
            }
            this.validateForm();
        }
    };
    Form.prototype.validateForm = function () {
        var validForm = this.fields.every(function (item) { return item.valid; });
        var isValid = this.agreeElement ? this.agreeElement.checked && validForm : validForm;
        if (this.processElement) {
            if (isValid) {
                this.processElement.removeAttribute("disabled");
            }
            else {
                this.processElement.setAttribute("disabled", "disabled");
            }
        }
        return isValid;
    };
    Form.prototype.processForm = function () {
        return __awaiter(this, void 0, void 0, function () {
            var email, password, result, error_1, result, error_2;
            var _a, _b, _c, _d, _e, _f, _g, _h;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        if (!this.validateForm()) return [3 /*break*/, 7];
                        email = (_b = (_a = this.fields.find(function (item) { return item.name === 'email'; })) === null || _a === void 0 ? void 0 : _a.element) === null || _b === void 0 ? void 0 : _b.value;
                        password = (_d = (_c = this.fields.find(function (item) { return item.name === 'password'; })) === null || _c === void 0 ? void 0 : _c.element) === null || _d === void 0 ? void 0 : _d.value;
                        if (!(this.page === 'signup')) return [3 /*break*/, 4];
                        _j.label = 1;
                    case 1:
                        _j.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, custom_http_1.CustomHttp.request(config_1.default.host + '/signup', 'POST', {
                                name: (_f = (_e = this.fields.find(function (item) { return item.name === 'name'; })) === null || _e === void 0 ? void 0 : _e.element) === null || _f === void 0 ? void 0 : _f.value,
                                lastName: (_h = (_g = this.fields.find(function (item) { return item.name === 'lastName'; })) === null || _g === void 0 ? void 0 : _g.element) === null || _h === void 0 ? void 0 : _h.value,
                                email: email,
                                password: password,
                            })];
                    case 2:
                        result = _j.sent();
                        if (result) {
                            if (result.error || !result.user) {
                                throw new Error(result.message);
                            }
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _j.sent();
                        console.log(error_1);
                        return [2 /*return*/];
                    case 4:
                        _j.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, custom_http_1.CustomHttp.request(config_1.default.host + '/login', 'POST', {
                                email: email,
                                password: password,
                            })];
                    case 5:
                        result = _j.sent();
                        if (result) {
                            if (result.error || !result.accessToken || !result.refreshToken || !result.fullName || !result.userId) {
                                throw new Error(result.message);
                            }
                            // const userEmail:string | undefined = this.fields.find(item => item.name === 'email').element.value;
                            auth_1.Auth.setTokens(result.accessToken, result.refreshToken);
                            auth_1.Auth.setUserInfo({
                                fullName: result.fullName,
                                userId: result.userId,
                                // email: userEmail,
                            });
                            location.href = '#/choice';
                        }
                        return [3 /*break*/, 7];
                    case 6:
                        error_2 = _j.sent();
                        console.log(error_2);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return Form;
}());
exports.Form = Form;


/***/ }),

/***/ "./src/components/result.ts":
/*!**********************************!*\
  !*** ./src/components/result.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Result = void 0;
var url_manager_1 = __webpack_require__(/*! ../utils/url-manager */ "./src/utils/url-manager.ts");
var custom_http_1 = __webpack_require__(/*! ../../services/custom-http */ "./services/custom-http.ts");
var config_1 = __importDefault(__webpack_require__(/*! ../../config/config */ "./config/config.ts"));
var auth_1 = __webpack_require__(/*! ../../services/auth */ "./services/auth.ts");
var Result = /** @class */ (function () {
    function Result() {
        this.routeParams = url_manager_1.UrlManager.getQueryParams();
        this.init();
    }
    Result.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userInfo, result, resultScoreElement, viewAnswersButton, e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userInfo = auth_1.Auth.getUserInfo();
                        if (!userInfo) {
                            location.href = '#/';
                            return [2 /*return*/];
                        }
                        if (!this.routeParams.id) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, custom_http_1.CustomHttp.request(config_1.default.host + '/tests/' + this.routeParams.id + '/result?userId=' + userInfo.userId)];
                    case 2:
                        result = _a.sent();
                        if (result) {
                            if (result.error !== undefined) {
                                throw new Error(result.message);
                            }
                            resultScoreElement = document.getElementById('result-score');
                            if (resultScoreElement) {
                                resultScoreElement.innerText = result.score + '/' + result.total;
                            }
                            viewAnswersButton = document.getElementById('view-answers');
                            if (viewAnswersButton) {
                                viewAnswersButton.addEventListener('click', function (event) {
                                    event.preventDefault();
                                    window.location.href = "#/answers?id=" + _this.routeParams.id;
                                });
                            }
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [3 /*break*/, 4];
                    case 4:
                        location.href = '#/';
                        return [2 /*return*/];
                }
            });
        });
    };
    return Result;
}());
exports.Result = Result;


/***/ }),

/***/ "./src/components/test.ts":
/*!********************************!*\
  !*** ./src/components/test.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Test = void 0;
var url_manager_1 = __webpack_require__(/*! ../utils/url-manager */ "./src/utils/url-manager.ts");
var custom_http_1 = __webpack_require__(/*! ../../services/custom-http */ "./services/custom-http.ts");
var config_1 = __importDefault(__webpack_require__(/*! ../../config/config */ "./config/config.ts"));
var auth_1 = __webpack_require__(/*! ../../services/auth */ "./services/auth.ts");
var action_test_type_1 = __webpack_require__(/*! ../types/action-test.type */ "./src/types/action-test.type.ts");
var Test = /** @class */ (function () {
    function Test() {
        this.interval = 0;
        this.quiz = null;
        this.questionTitleElement = null;
        this.progressBarElement = null;
        this.nextButtonElement = null;
        this.passButtonElement = null;
        this.prevButtonElement = null;
        this.optionsElement = null;
        this.currentQuestionIndex = 1;
        this.userResult = [];
        this.routeParams = url_manager_1.UrlManager.getQueryParams();
        this.init();
    }
    Test.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.routeParams.id) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, custom_http_1.CustomHttp.request(config_1.default.host + '/tests/' + this.routeParams.id)];
                    case 2:
                        result = _a.sent();
                        if (result) {
                            if (result.error !== undefined) {
                                throw new Error(result.message);
                            }
                            this.quiz = result;
                            this.startQuiz();
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Test.prototype.startQuiz = function () {
        if (!this.quiz) {
            return;
        }
        this.questionTitleElement = document.getElementById("question-title");
        this.progressBarElement = document.getElementById("progress-bar");
        this.optionsElement = document.getElementById("options");
        this.nextButtonElement = document.getElementById("next");
        if (this.nextButtonElement) {
            this.nextButtonElement.onclick = this.move.bind(this, action_test_type_1.ActionTypes.next);
        }
        this.passButtonElement = document.getElementById("pass");
        if (this.passButtonElement) {
            this.passButtonElement.onclick = this.move.bind(this, action_test_type_1.ActionTypes.pass);
        }
        this.prevButtonElement = document.getElementById("prev");
        if (this.prevButtonElement) {
            this.prevButtonElement.onclick = this.move.bind(this, action_test_type_1.ActionTypes.prev);
        }
        var preTitleElement = document.getElementById("pre-title");
        if (preTitleElement) {
            preTitleElement.innerText = this.quiz.name;
        }
        this.prepareProgressBar();
        this.showQuestion();
        var timerElement = document.getElementById("timer");
        var seconds = 59;
        var that = this;
        this.interval = window.setInterval(function () {
            seconds--;
            if (timerElement) {
                timerElement.innerText = seconds.toString();
            }
            if (seconds === 0) {
                clearInterval(that.interval);
                that.complete();
            }
        }.bind(this), 1000);
    };
    Test.prototype.prepareProgressBar = function () {
        if (!this.quiz)
            return;
        for (var i = 0; i < this.quiz.questions.length; i++) {
            var itemElement = document.createElement("div");
            itemElement.className = 'test-progress-bar-item' + (i === 0 ? ' active' : '');
            var itemCircleElement = document.createElement("div");
            itemCircleElement.className = 'test-progress-bar-item-circle';
            var itemTextElement = document.createElement("div");
            itemTextElement.className = ("test-progress-bar-text");
            itemTextElement.innerText = 'Вопрос ' + (i + 1);
            itemElement.appendChild(itemCircleElement);
            itemElement.appendChild(itemTextElement);
            if (this.progressBarElement) {
                this.progressBarElement.appendChild(itemElement);
            }
        }
    };
    Test.prototype.showQuestion = function () {
        var _this = this;
        if (!this.quiz)
            return;
        var activeQuestion = this.quiz.questions[this.currentQuestionIndex - 1];
        if (this.questionTitleElement) {
            this.questionTitleElement.innerHTML = '<span>Вопрос ' + this.currentQuestionIndex + ':</span> ' + activeQuestion.question;
        }
        if (this.optionsElement) {
            this.optionsElement.innerHTML = '';
        }
        var that = this;
        var chosenOption = this.userResult.find(function (item) { return item.questionId === activeQuestion.id; });
        activeQuestion.answers.forEach(function (answer) {
            var optionElement = document.createElement("div");
            optionElement.className = ("test-question-option");
            var inputId = 'answer-' + answer.id;
            var inputElement = document.createElement("input");
            inputElement.className = 'option-answer';
            inputElement.setAttribute("id", inputId);
            inputElement.setAttribute("type", "radio");
            inputElement.setAttribute("name", "answer");
            inputElement.setAttribute("value", answer.id.toString());
            if (chosenOption && chosenOption.chosenAnswerId === answer.id) {
                inputElement.setAttribute('checked', 'checked');
            }
            inputElement.onchange = function () {
                that.chooseAnswer();
            };
            var labelElement = document.createElement("label");
            labelElement.setAttribute("for", inputId);
            labelElement.innerText = answer.answer;
            optionElement.appendChild(inputElement);
            optionElement.appendChild(labelElement);
            if (_this.optionsElement) {
                _this.optionsElement.appendChild(optionElement);
            }
        });
        if (this.nextButtonElement) {
            if (chosenOption && chosenOption.chosenAnswerId) {
                this.nextButtonElement.removeAttribute("disabled");
            }
            else {
                this.nextButtonElement.setAttribute("disabled", 'disabled');
            }
        }
        if (this.nextButtonElement) {
            if (this.currentQuestionIndex === this.quiz.questions.length) {
                this.nextButtonElement.innerText = "Завершить";
            }
            else {
                this.nextButtonElement.innerText = "Дальше";
            }
        }
        if (this.prevButtonElement) {
            if (this.currentQuestionIndex > 1) {
                this.prevButtonElement.removeAttribute("disabled");
            }
            else {
                this.prevButtonElement.setAttribute("disabled", "disabled");
            }
        }
    };
    Test.prototype.chooseAnswer = function () {
        if (this.nextButtonElement) {
            this.nextButtonElement.removeAttribute("disabled");
        }
    };
    Test.prototype.move = function (action) {
        var _this = this;
        if (!this.quiz)
            return;
        var activeQuestion = this.quiz.questions[this.currentQuestionIndex - 1];
        var chosenAnswer = Array.from(document.getElementsByClassName('option-answer')).find(function (element) {
            return element.checked;
        });
        var chosenAnswerId = null;
        if (chosenAnswer && chosenAnswer.value) {
            chosenAnswerId = Number(chosenAnswer.value);
        }
        var existingResult = this.userResult.find(function (item) {
            return item.questionId === activeQuestion.id;
        });
        if (chosenAnswerId) {
            if (existingResult) {
                existingResult.chosenAnswerId = chosenAnswerId;
            }
            else {
                this.userResult.push({
                    questionId: activeQuestion.id,
                    chosenAnswerId: chosenAnswerId
                });
            }
        }
        if (action === action_test_type_1.ActionTypes.next || action === action_test_type_1.ActionTypes.pass) {
            this.currentQuestionIndex++;
        }
        else {
            this.currentQuestionIndex--;
        }
        if (this.currentQuestionIndex > this.quiz.questions.length) {
            clearInterval(this.interval);
            this.complete();
            return;
        }
        if (this.progressBarElement) {
            Array.from(this.progressBarElement.children).forEach(function (item, index) {
                var currentItemIndex = index + 1;
                item.classList.remove('complete');
                item.classList.remove('active');
                if (currentItemIndex === _this.currentQuestionIndex) {
                    item.classList.add('active');
                }
                else if (currentItemIndex < _this.currentQuestionIndex) {
                    item.classList.add('complete');
                }
            });
        }
        this.showQuestion();
    };
    Test.prototype.complete = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userInfo, result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userInfo = auth_1.Auth.getUserInfo();
                        if (!userInfo) {
                            location.href = '#/';
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, custom_http_1.CustomHttp.request(config_1.default.host + '/tests/' + this.routeParams.id + '/pass', 'POST', {
                                userId: userInfo.userId,
                                results: this.userResult
                            })];
                    case 2:
                        result = _a.sent();
                        if (result) {
                            if (result.error !== undefined) {
                                throw new Error(result.message);
                            }
                            location.href = "#/result?id=" + this.routeParams.id;
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Test;
}());
exports.Test = Test;


/***/ }),

/***/ "./src/router.ts":
/*!***********************!*\
  !*** ./src/router.ts ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Router = void 0;
var form_1 = __webpack_require__(/*! ./components/form */ "./src/components/form.ts");
var choice_1 = __webpack_require__(/*! ./components/choice */ "./src/components/choice.ts");
var test_1 = __webpack_require__(/*! ./components/test */ "./src/components/test.ts");
var answers_1 = __webpack_require__(/*! ./components/answers */ "./src/components/answers.ts");
var result_1 = __webpack_require__(/*! ./components/result */ "./src/components/result.ts");
var auth_1 = __webpack_require__(/*! ../services/auth */ "./services/auth.ts");
var Router = /** @class */ (function () {
    function Router() {
        this.contentElement = document.getElementById("content");
        this.stylesElement = document.getElementById("styles");
        this.titleElement = document.getElementById('page-title');
        this.profileElement = document.getElementById('profile');
        this.profileFullNameElement = document.getElementById('profile-full-name');
        this.routes = [
            {
                route: '#/',
                title: 'Главная',
                template: 'templates/index.html',
                styles: "styles/index.css",
                load: function () {
                }
            },
            {
                route: '#/signup',
                title: 'Регистрация',
                template: 'templates/signup.html',
                styles: "styles/form.css",
                load: function () {
                    new form_1.Form('signup');
                }
            },
            {
                route: '#/login',
                title: 'Вход в систему',
                template: 'templates/login.html',
                styles: "styles/form.css",
                load: function () {
                    new form_1.Form('login');
                }
            },
            {
                route: '#/choice',
                title: 'Выбор теста',
                template: 'templates/choice.html',
                styles: "styles/choice.css",
                load: function () {
                    new choice_1.Choice();
                }
            },
            {
                route: '#/test',
                title: 'Прохождение теста',
                template: 'templates/test.html',
                styles: "styles/test.css",
                load: function () {
                    new test_1.Test();
                }
            },
            {
                route: '#/result',
                title: 'Результаты',
                template: 'templates/result.html',
                styles: "styles/result.css",
                load: function () {
                    new result_1.Result();
                }
            },
            {
                route: '#/answers',
                title: 'Правильные ответы',
                template: 'templates/answers.html',
                styles: "styles/answers.css",
                load: function () {
                    new answers_1.Answers();
                }
            },
        ];
    }
    Router.prototype.openRoute = function () {
        return __awaiter(this, void 0, void 0, function () {
            var urlRoute, result, newRoute, _a, userInfo, accessToken;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        urlRoute = window.location.hash.split('?')[0];
                        if (!(urlRoute === '#/logout')) return [3 /*break*/, 2];
                        return [4 /*yield*/, auth_1.Auth.logout()];
                    case 1:
                        result = _b.sent();
                        if (result) {
                            window.location.href = "#/";
                            return [2 /*return*/];
                        }
                        else {
                        }
                        _b.label = 2;
                    case 2:
                        newRoute = this.routes.find(function (item) {
                            return item.route === urlRoute;
                        });
                        if (!newRoute) {
                            window.location.href = "#/";
                            return [2 /*return*/];
                        }
                        if (!this.contentElement || !this.stylesElement || !this.titleElement || !this.profileElement || !this.profileFullNameElement) {
                            if (urlRoute === '#/') {
                                return [2 /*return*/];
                            }
                            else {
                                window.location.href = "#/";
                                return [2 /*return*/];
                            }
                        }
                        _a = this.contentElement;
                        return [4 /*yield*/, fetch(newRoute.template).then(function (response) { return response.text(); })];
                    case 3:
                        _a.innerHTML = _b.sent();
                        this.stylesElement.setAttribute("href", newRoute.styles);
                        this.titleElement.innerText = newRoute.title;
                        userInfo = auth_1.Auth.getUserInfo();
                        accessToken = localStorage.getItem(auth_1.Auth.accessTokenKey);
                        if (userInfo && accessToken) {
                            this.profileElement.style.display = 'flex';
                            this.profileFullNameElement.innerText = userInfo.fullName;
                        }
                        else {
                            this.profileElement.style.display = 'none';
                        }
                        newRoute.load();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Router;
}());
exports.Router = Router;


/***/ }),

/***/ "./src/types/action-test.type.ts":
/*!***************************************!*\
  !*** ./src/types/action-test.type.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActionTypes = void 0;
var ActionTypes;
(function (ActionTypes) {
    ActionTypes["next"] = "next";
    ActionTypes["pass"] = "pass";
    ActionTypes["prev"] = "prev";
})(ActionTypes || (exports.ActionTypes = ActionTypes = {}));


/***/ }),

/***/ "./src/utils/url-manager.ts":
/*!**********************************!*\
  !*** ./src/utils/url-manager.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UrlManager = void 0;
var UrlManager = /** @class */ (function () {
    function UrlManager() {
    }
    UrlManager.getQueryParams = function () {
        var qs = document.location.hash.split('+').join(' ');
        var params = {}, tokens, re = /[?&]([^=]+)=([^&]*)/g;
        while (tokens = re.exec(qs)) {
            params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
        }
        return params;
    };
    return UrlManager;
}());
exports.UrlManager = UrlManager;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
var router_1 = __webpack_require__(/*! ./router */ "./src/router.ts");
var App = /** @class */ (function () {
    function App() {
        this.router = new router_1.Router();
        window.addEventListener('DOMContentLoaded', this.handleRouteChanging.bind(this));
        window.addEventListener('popstate', this.handleRouteChanging.bind(this));
    }
    App.prototype.handleRouteChanging = function () {
        this.router.openRoute();
    };
    return App;
}());
(new App());

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBQ08saUNBQW1CLEdBQTNCO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBQ0wsVUFBQztBQUFELENBQUM7QUFFRCxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3F1aXovLi9jb25maWcvY29uZmlnLnRzIiwid2VicGFjazovL3F1aXovLi9zZXJ2aWNlcy9hdXRoLnRzIiwid2VicGFjazovL3F1aXovLi9zZXJ2aWNlcy9jdXN0b20taHR0cC50cyIsIndlYnBhY2s6Ly9xdWl6Ly4vc3JjL2NvbXBvbmVudHMvYW5zd2Vycy50cyIsIndlYnBhY2s6Ly9xdWl6Ly4vc3JjL2NvbXBvbmVudHMvY2hvaWNlLnRzIiwid2VicGFjazovL3F1aXovLi9zcmMvY29tcG9uZW50cy9mb3JtLnRzIiwid2VicGFjazovL3F1aXovLi9zcmMvY29tcG9uZW50cy9yZXN1bHQudHMiLCJ3ZWJwYWNrOi8vcXVpei8uL3NyYy9jb21wb25lbnRzL3Rlc3QudHMiLCJ3ZWJwYWNrOi8vcXVpei8uL3NyYy9yb3V0ZXIudHMiLCJ3ZWJwYWNrOi8vcXVpei8uL3NyYy90eXBlcy9hY3Rpb24tdGVzdC50eXBlLnRzIiwid2VicGFjazovL3F1aXovLi9zcmMvdXRpbHMvdXJsLW1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vcXVpei93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9xdWl6Ly4vc3JjL2FwcC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XHJcbiAgICBob3N0OiAnaHR0cDovL2xvY2FsaG9zdDozMDAwL2FwaSdcclxufSIsImltcG9ydCBjb25maWcgZnJvbSBcIi4uL2NvbmZpZy9jb25maWdcIjtcclxuaW1wb3J0IHtVc2VySW5mb1R5cGV9IGZyb20gXCIuLi9zcmMvdHlwZXMvdXNlci1pbmZvLnR5cGVcIjtcclxuaW1wb3J0IHtSZWZyZXNoUmVzcG9uc2V9IGZyb20gXCIuLi9zcmMvdHlwZXMvcmVmcmVzaC1yZXNwb25zZS50eXBlXCI7XHJcbmltcG9ydCB7TG9nb3V0UmVzcG9uc2VUeXBlfSBmcm9tIFwiLi4vc3JjL3R5cGVzL2xvZ291dC1yZXNwb25zZS50eXBlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQXV0aCB7XHJcbiAgICBwdWJsaWMgc3RhdGljIGFjY2Vzc1Rva2VuS2V5OnN0cmluZyA9ICdhY2Nlc3NUb2tlbidcclxuICAgIHByaXZhdGUgc3RhdGljIHJlZnJlc2hUb2tlbktleTpzdHJpbmcgPSAncmVmcmVzaFRva2VuJ1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgdXNlckluZm9LZXk6c3RyaW5nID0gJ3VzZXJJbmZvJ1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgYXN5bmMgcHJvY2Vzc1VuYXV0aG9yaXplZFJlc3BvbnNlKCk6UHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICAgICAgY29uc3QgcmVmcmVzaFRva2VuOnN0cmluZyB8IG51bGwgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLnJlZnJlc2hUb2tlbktleSk7XHJcbiAgICAgICAgaWYgKHJlZnJlc2hUb2tlbikge1xyXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZTpSZXNwb25zZSA9IGF3YWl0IGZldGNoKGNvbmZpZy5ob3N0ICtcIi9yZWZyZXNoXCIsIHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyczp7XHJcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtdHlwZSc6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe3JlZnJlc2hUb2tlbjogcmVmcmVzaFRva2VufSksXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZSAmJiByZXNwb25zZS5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0OlJlZnJlc2hSZXNwb25zZSB8IG51bGwgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0ICYmICFyZXN1bHQuZXJyb3IgJiYgcmVzdWx0LmFjY2Vzc1Rva2VuICYmIHJlc3VsdC5yZWZyZXNoVG9rZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFRva2VucyhyZXN1bHQuYWNjZXNzVG9rZW4scmVzdWx0LnJlZnJlc2hUb2tlbik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZW1vdmVUb2tlbnMoKTtcclxuICAgICAgICBsb2NhdGlvbi5ocmVmID0nIy8nXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgYXN5bmMgbG9nb3V0KCk6UHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICAgICAgY29uc3QgcmVmcmVzaFRva2VuOnN0cmluZyB8IG51bGwgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLnJlZnJlc2hUb2tlbktleSk7XHJcbiAgICAgICAgaWYgKHJlZnJlc2hUb2tlbikge1xyXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZTogUmVzcG9uc2UgPSBhd2FpdCBmZXRjaChjb25maWcuaG9zdCArXCIvbG9nb3V0XCIsIHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyczp7XHJcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtdHlwZSc6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe3JlZnJlc2hUb2tlbjogcmVmcmVzaFRva2VufSksXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZSAmJiByZXNwb25zZS5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0OkxvZ291dFJlc3BvbnNlVHlwZSB8IG51bGwgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0ICYmICFyZXN1bHQuZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBBdXRoLnJlbW92ZVRva2VucygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKEF1dGgudXNlckluZm9LZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHNldFRva2VucyhhY2Nlc3NUb2tlbjpzdHJpbmcsIHJlZnJlc2hUb2tlbjpzdHJpbmcpOnZvaWQge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMuYWNjZXNzVG9rZW5LZXksIGFjY2Vzc1Rva2VuKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLnJlZnJlc2hUb2tlbktleSwgcmVmcmVzaFRva2VuKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgc3RhdGljIHJlbW92ZVRva2VucygpOnZvaWQge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHRoaXMuYWNjZXNzVG9rZW5LZXkpO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHRoaXMucmVmcmVzaFRva2VuS2V5KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHNldFVzZXJJbmZvKGluZm86IFVzZXJJbmZvVHlwZSk6dm9pZCB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy51c2VySW5mb0tleSwgSlNPTi5zdHJpbmdpZnkoaW5mbykpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0VXNlckluZm8oKTogVXNlckluZm9UeXBlIHwgbnVsbCB7XHJcbiAgICAgICAgY29uc3QgdXNlckluZm86c3RyaW5nIHwgbnVsbCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMudXNlckluZm9LZXkpO1xyXG4gICAgICAgIGlmICh1c2VySW5mbykge1xyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh1c2VySW5mbyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtBdXRofSBmcm9tIFwiLi9hdXRoXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ3VzdG9tSHR0cCB7XHJcbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIHJlcXVlc3QodXJsOnN0cmluZywgbWV0aG9kOnN0cmluZyA9ICdHRVQnLGJvZHk6YW55ID0gbnVsbCk6UHJvbWlzZTxhbnk+IHtcclxuICAgICAgICBjb25zdCBwYXJhbXM6YW55ID0ge1xyXG4gICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcclxuICAgICAgICAgICAgaGVhZGVyczp7XHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC10eXBlJzogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdG9rZW46c3RyaW5nIHxudWxsID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oQXV0aC5hY2Nlc3NUb2tlbktleSk7XHJcbiAgICAgICAgaWYgKHRva2VuKSB7XHJcbiAgICAgICAgICAgIHBhcmFtcy5oZWFkZXJzWyd4LWFjY2Vzcy10b2tlbiddID0gdG9rZW47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYm9keSkge1xyXG4gICAgICAgICAgICBwYXJhbXMuYm9keSA9IEpTT04uc3RyaW5naWZ5KGJvZHkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2U6UmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIHBhcmFtcylcclxuXHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA8IDIwMCB8fCByZXNwb25zZS5zdGF0dXMgPj0gMzAwKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDQwMSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0OmJvb2xlYW4gPSBhd2FpdCBBdXRoLnByb2Nlc3NVbmF1dGhvcml6ZWRSZXNwb25zZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnJlcXVlc3QodXJsLCBtZXRob2QsIGJvZHkpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2Uuc3RhdHVzVGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcblxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtBdXRofSBmcm9tIFwiLi4vLi4vc2VydmljZXMvYXV0aFwiO1xyXG5pbXBvcnQge0N1c3RvbUh0dHB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jdXN0b20taHR0cFwiO1xyXG5pbXBvcnQgY29uZmlnIGZyb20gXCIuLi8uLi9jb25maWcvY29uZmlnXCI7XHJcbmltcG9ydCB7VXJsTWFuYWdlcn0gZnJvbSBcIi4uL3V0aWxzL3VybC1tYW5hZ2VyXCI7XHJcbmltcG9ydCB7UXVpekFuc3dlclR5cGUsIFF1aXpRdWVzdGlvblR5cGUsIFF1aXpUeXBlfSBmcm9tIFwiLi4vdHlwZXMvcXVpei50eXBlXCI7XHJcbmltcG9ydCB7UXVlcnlQYXJhbXN9IGZyb20gXCIuLi90eXBlcy9xdWVyeS1wYXJhbXMudHlwZVwiO1xyXG5pbXBvcnQge1VzZXJJbmZvVHlwZX0gZnJvbSBcIi4uL3R5cGVzL3VzZXItaW5mby50eXBlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQW5zd2VycyB7XHJcbiAgICBwcml2YXRlIHF1aXo6UXVpelR5cGUgfCBudWxsO1xyXG4gICAgcHJpdmF0ZSBvcHRpb25zRWxlbWVudDpIVE1MRWxlbWVudCB8IG51bGw7XHJcbiAgICBwcml2YXRlIHJvdXRlUGFyYW1zOiBRdWVyeVBhcmFtcztcclxuICAgIHByaXZhdGUgcXVlc3Rpb25UaXRsZUVsZW1lbnQ6SFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMucXVpeiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zRWxlbWVudCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5yb3V0ZVBhcmFtcyA9IFVybE1hbmFnZXIuZ2V0UXVlcnlQYXJhbXMoKTtcclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIGluaXQoKTpQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBjb25zdCB1c2VySW5mbzpVc2VySW5mb1R5cGV8IG51bGwgPSBBdXRoLmdldFVzZXJJbmZvKCk7XHJcbiAgICAgICAgaWYgKCF1c2VySW5mbykge1xyXG4gICAgICAgICAgICBsb2NhdGlvbi5ocmVmPScjLyc7XHJcbiAgICAgICAgICAgIHJldHVybiA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnJvdXRlUGFyYW1zLmlkKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBDdXN0b21IdHRwLnJlcXVlc3QoY29uZmlnLmhvc3QgKyAnL3Rlc3RzLycgKyB0aGlzLnJvdXRlUGFyYW1zLmlkICtcIi9yZXN1bHQvZGV0YWlscz91c2VySWQ9XCIgKyB1c2VySW5mby51c2VySWQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnF1aXogPSByZXN1bHQudGVzdDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXN1bHQuZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZXRVc2VyTmFtZSgpO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0UXVpeigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBiYWNrVG9SZXN1bHRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmFjay10by1yZXN1bHQnKTtcclxuICAgICAgICBpZiAoYmFja1RvUmVzdWx0QnV0dG9uICYmIHRoaXMucm91dGVQYXJhbXMuaWQpIHtcclxuICAgICAgICAgICAgYmFja1RvUmVzdWx0QnV0dG9uLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gXCIjL3Jlc3VsdD9pZD1cIiArIHRoaXMucm91dGVQYXJhbXMuaWRcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGFydFF1aXooKTp2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMucXVpeikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucXVlc3Rpb25UaXRsZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInF1ZXN0aW9uLXRpdGxlXCIpO1xyXG4gICAgICAgIHRoaXMub3B0aW9uc0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm9wdGlvbnNcIik7XHJcbiAgICAgICAgY29uc3QgdGVzdE5hbWVFbGVtZW50OkhUTUxFbGVtZW50IHxudWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rlc3QtbmFtZScpO1xyXG4gICAgICAgIGlmICh0ZXN0TmFtZUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdGVzdE5hbWVFbGVtZW50LmlubmVyVGV4dCA9IHRoaXMucXVpei5uYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNob3dRdWVzdGlvbnMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIHNldFVzZXJOYW1lKCk6UHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgY29uc3QgdXNlckluZm86VXNlckluZm9UeXBlfG51bGwgPSBBdXRoLmdldFVzZXJJbmZvKCk7XHJcbiAgICAgICAgaWYgKHVzZXJJbmZvKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZ1bGxOYW1lOnN0cmluZyA9IHVzZXJJbmZvLmZ1bGxOYW1lO1xyXG4gICAgICAgICAgICBjb25zdCBkb25lVGV4dEVsZW1lbnQ6SFRNTEVsZW1lbnQgfG51bGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZG9uZS10ZXh0Jyk7XHJcbiAgICAgICAgICAgIGlmIChkb25lVGV4dEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGRvbmVUZXh0RWxlbWVudC5pbm5lclRleHQgPSBmdWxsTmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93UXVlc3Rpb25zKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5xdWl6KSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5xdWl6LnF1ZXN0aW9ucy5mb3JFYWNoKChxdWVzdGlvbjpRdWl6UXVlc3Rpb25UeXBlLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBxdWVzdGlvbkJsb2NrOkhUTUxFbGVtZW50IHxudWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgcXVlc3Rpb25CbG9jay5jbGFzc05hbWUgPSBcInF1ZXN0aW9uLWJsb2NrXCI7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBxdWVzdGlvblRpdGxlOkhUTUxFbGVtZW50IHxudWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgcXVlc3Rpb25UaXRsZS5jbGFzc05hbWUgPSBcInRlc3QtcXVlc3Rpb24tdGl0bGVcIjtcclxuICAgICAgICAgICAgcXVlc3Rpb25UaXRsZS5pbm5lckhUTUwgPSBgPHNwYW4+0JLQvtC/0YDQvtGBICR7aW5kZXggKyAxfTo8L3NwYW4+ICR7cXVlc3Rpb24ucXVlc3Rpb259YDtcclxuICAgICAgICAgICAgcXVlc3Rpb25CbG9jay5hcHBlbmRDaGlsZChxdWVzdGlvblRpdGxlKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnNDb250YWluZXI6SFRNTEVsZW1lbnQgfG51bGw9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgIG9wdGlvbnNDb250YWluZXIuY2xhc3NOYW1lID0gXCJvcHRpb25zLWNvbnRhaW5lclwiO1xyXG5cclxuICAgICAgICAgICAgcXVlc3Rpb24uYW5zd2Vycy5mb3JFYWNoKChhbnN3ZXI6UXVpekFuc3dlclR5cGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbkVsZW1lbnQ6SFRNTEVsZW1lbnQgfG51bGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uRWxlbWVudC5jbGFzc05hbWUgPSBcInRlc3QtcXVlc3Rpb24tb3B0aW9uXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgaW5wdXRJZCA9IGBhbnN3ZXItJHtxdWVzdGlvbi5pZH0tJHthbnN3ZXIuaWR9YDtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbnB1dEVsZW1lbnQ6SFRNTElucHV0RWxlbWVudCB8IG51bGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICAgICAgICAgICAgICBpbnB1dEVsZW1lbnQuY2xhc3NOYW1lID0gXCJvcHRpb24tYW5zd2VyXCI7XHJcbiAgICAgICAgICAgICAgICBpbnB1dEVsZW1lbnQuc2V0QXR0cmlidXRlKFwiaWRcIiwgaW5wdXRJZCk7XHJcbiAgICAgICAgICAgICAgICBpbnB1dEVsZW1lbnQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInJhZGlvXCIpO1xyXG4gICAgICAgICAgICAgICAgaW5wdXRFbGVtZW50LnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgICAgICAgICBpbnB1dEVsZW1lbnQuc2V0QXR0cmlidXRlKFwibmFtZVwiLCBgYW5zd2VyLSR7cXVlc3Rpb24uaWR9YCk7XHJcbiAgICAgICAgICAgICAgICBpbnB1dEVsZW1lbnQuc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgYW5zd2VyLmlkLnRvU3RyaW5nKCkpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGxhYmVsRWxlbWVudDpIVE1MRWxlbWVudCB8bnVsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcclxuICAgICAgICAgICAgICAgIGxhYmVsRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJmb3JcIiwgaW5wdXRJZCk7XHJcbiAgICAgICAgICAgICAgICBsYWJlbEVsZW1lbnQuaW5uZXJUZXh0ID0gYW5zd2VyLmFuc3dlcjtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBpZiAoYW5zd2VyLmNvcnJlY3QgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICBvcHRpb25FbGVtZW50LnN0eWxlLmNvbG9yID0gXCIjNUZEQzMzXCI7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgaW5wdXRFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgaW5wdXRFbGVtZW50LnN0eWxlLmJvcmRlciA9IFwiNnB4IHNvbGlkICM1RkRDMzNcIjtcclxuICAgICAgICAgICAgICAgIC8vICAgICBpbnB1dEVsZW1lbnQuc2V0QXR0cmlidXRlKFwiY2hlY2tlZFwiLCBcImNoZWNrZWRcIik7XHJcbiAgICAgICAgICAgICAgICAvLyB9IGVsc2UgaWYgKGFuc3dlci5jb3JyZWN0ID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIG9wdGlvbkVsZW1lbnQuc3R5bGUuY29sb3IgPSBcIiNEQzMzMzNcIjtcclxuICAgICAgICAgICAgICAgIC8vICAgICBpbnB1dEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgICAgICAgICAgIC8vICAgICBpbnB1dEVsZW1lbnQuc3R5bGUuYm9yZGVyID0gXCI2cHggc29saWQgI0RDMzMzM1wiO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGlucHV0RWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJjaGVja2VkXCIsIFwiY2hlY2tlZFwiKTtcclxuICAgICAgICAgICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgICAgICAgICBvcHRpb25FbGVtZW50LmFwcGVuZENoaWxkKGlucHV0RWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25FbGVtZW50LmFwcGVuZENoaWxkKGxhYmVsRWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zQ29udGFpbmVyLmFwcGVuZENoaWxkKG9wdGlvbkVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHF1ZXN0aW9uQmxvY2suYXBwZW5kQ2hpbGQob3B0aW9uc0NvbnRhaW5lcik7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnNFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNFbGVtZW50LmFwcGVuZENoaWxkKHF1ZXN0aW9uQmxvY2spO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHtVcmxNYW5hZ2VyfSBmcm9tIFwiLi4vdXRpbHMvdXJsLW1hbmFnZXJcIjtcclxuaW1wb3J0IHtDdXN0b21IdHRwfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY3VzdG9tLWh0dHBcIjtcclxuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi4vLi4vY29uZmlnL2NvbmZpZ1wiO1xyXG5pbXBvcnQge0F1dGh9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9hdXRoXCI7XHJcbmltcG9ydCB7UXVlcnlQYXJhbXN9IGZyb20gXCIuLi90eXBlcy9xdWVyeS1wYXJhbXMudHlwZVwiO1xyXG5pbXBvcnQge1F1aXpMaXN0VHlwZX0gZnJvbSBcIi4uL3R5cGVzL3F1aXotbGlzdC50eXBlXCI7XHJcbmltcG9ydCB7VGVzdFJlc3VsdFR5cGV9IGZyb20gXCIuLi90eXBlcy90ZXN0LXJlc3VsdC50eXBlXCI7XHJcbmltcG9ydCB7VXNlckluZm9UeXBlfSBmcm9tIFwiLi4vdHlwZXMvdXNlci1pbmZvLnR5cGVcIjtcclxuaW1wb3J0IHtEZWZhdWx0UmVzcG9uc2VUeXBlfSBmcm9tIFwiLi4vdHlwZXMvZGVmYXVsdC1yZXNwb25zZS50eXBlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2hvaWNlIHtcclxuICAgIHByaXZhdGUgcXVpenplczpRdWl6TGlzdFR5cGVbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSB0ZXN0UmVzdWx0OlRlc3RSZXN1bHRUeXBlW10gfCBudWxsID0gbnVsbDtcclxuICAgIHByaXZhdGUgcm91dGVQYXJhbXM6IFF1ZXJ5UGFyYW1zO1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZVBhcmFtcyA9IFVybE1hbmFnZXIuZ2V0UXVlcnlQYXJhbXMoKTtcclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIGluaXQoKTpQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB0aGlzLnF1aXp6ZXMgPSBhd2FpdCBDdXN0b21IdHRwLnJlcXVlc3QoY29uZmlnLmhvc3QgKyAnL3Rlc3RzJylcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgdXNlckluZm86VXNlckluZm9UeXBlIHwgbnVsbCA9IEF1dGguZ2V0VXNlckluZm8oKTtcclxuICAgICAgICBpZiAodXNlckluZm8pIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdDogRGVmYXVsdFJlc3BvbnNlVHlwZXxUZXN0UmVzdWx0VHlwZVtdID0gYXdhaXQgQ3VzdG9tSHR0cC5yZXF1ZXN0KGNvbmZpZy5ob3N0ICsgJy90ZXN0cy9yZXN1bHRzP3VzZXJJZD0nICsgdXNlckluZm8udXNlcklkKTtcclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoKHJlc3VsdCBhcyBEZWZhdWx0UmVzcG9uc2VUeXBlKS5lcnJvciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigocmVzdWx0IGFzIERlZmF1bHRSZXNwb25zZVR5cGUpLm1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGVzdFJlc3VsdCA9IHJlc3VsdCBhcyBUZXN0UmVzdWx0VHlwZVtdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucHJvY2Vzc1F1aXp6ZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHByb2Nlc3NRdWl6emVzKCk6dm9pZCB7XHJcbiAgICAgICAgY29uc3QgY2hvaWNlT3B0aW9uc0VsZW1lbnQ6SFRNTEVsZW1lbnQgfCBudWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaG9pY2Utb3B0aW9uc1wiKTtcclxuICAgICAgICBpZiAodGhpcy5xdWl6emVzICYmIHRoaXMucXVpenplcy5sZW5ndGggPiAwICYmIGNob2ljZU9wdGlvbnNFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMucXVpenplcy5mb3JFYWNoKChxdWl6OlF1aXpMaXN0VHlwZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGhhdDpDaG9pY2UgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2hvaWNlT3B0aW9uRWxlbWVudDpIVE1MRWxlbWVudCB8IG51bGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICAgICAgY2hvaWNlT3B0aW9uRWxlbWVudC5jbGFzc05hbWUgPSAoXCJjaG9pY2Utb3B0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgY2hvaWNlT3B0aW9uRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIsIHF1aXouaWQudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICBjaG9pY2VPcHRpb25FbGVtZW50Lm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5jaG9vc2VRdWl6KDxIVE1MRWxlbWVudD50aGlzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IGNob2ljZU9wdGlvblRleHRFbGVtZW50OkhUTUxFbGVtZW50IHwgbnVsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgICAgICBjaG9pY2VPcHRpb25UZXh0RWxlbWVudC5jbGFzc05hbWUgPSAoXCJjaG9pY2Utb3B0aW9uLXRleHRcIik7XHJcbiAgICAgICAgICAgICAgICBjaG9pY2VPcHRpb25UZXh0RWxlbWVudC5pbm5lclRleHQgPSBxdWl6Lm5hbWU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjaG9pY2VPcHRpb25BcnJvd0VsZW1lbnQ6SFRNTEVsZW1lbnQgfCBudWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgICAgIGNob2ljZU9wdGlvbkFycm93RWxlbWVudC5jbGFzc05hbWUgPSAoXCJjaG9pY2Utb3B0aW9uLWFycm93XCIpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnRlc3RSZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQ6VGVzdFJlc3VsdFR5cGUgfCB1bmRlZmluZWQgPSB0aGlzLnRlc3RSZXN1bHQuZmluZChpdGVtID0+IGl0ZW0udGVzdElkID09PSBxdWl6LmlkKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNob2ljZU9wdGlvblJlc3VsdEVsZW1lbnQ6SFRNTEVsZW1lbnQgfCBudWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hvaWNlT3B0aW9uUmVzdWx0RWxlbWVudC5jbGFzc05hbWUgPSBcImNob2ljZS1vcHRpb24tcmVzdWx0XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNob2ljZU9wdGlvblJlc3VsdEVsZW1lbnQuaW5uZXJIVE1MID0gJzxkaXY+0KDQtdC30YPQu9GM0YLQsNGCPC9kaXY+PGRpdj4nKyByZXN1bHQuc2NvcmUgKyAnLycgKyByZXN1bHQudG90YWwgKyAnPC9kaXY+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hvaWNlT3B0aW9uRWxlbWVudC5hcHBlbmRDaGlsZChjaG9pY2VPcHRpb25SZXN1bHRFbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgY2hvaWNlT3B0aW9uSW1nRWxlbWVudDpIVE1MRWxlbWVudCB8IG51bGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xyXG4gICAgICAgICAgICAgICAgY2hvaWNlT3B0aW9uSW1nRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgXCIvaW1nL2Fycm93LnBuZ1wiKTtcclxuICAgICAgICAgICAgICAgIGNob2ljZU9wdGlvbkltZ0VsZW1lbnQuc2V0QXR0cmlidXRlKFwiYWx0XCIsIFwiYXJyb3cgcGljdHVyZVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjaG9pY2VPcHRpb25BcnJvd0VsZW1lbnQuYXBwZW5kQ2hpbGQoY2hvaWNlT3B0aW9uSW1nRWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICBjaG9pY2VPcHRpb25FbGVtZW50LmFwcGVuZENoaWxkKGNob2ljZU9wdGlvblRleHRFbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIGNob2ljZU9wdGlvbkVsZW1lbnQuYXBwZW5kQ2hpbGQoY2hvaWNlT3B0aW9uQXJyb3dFbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIGNob2ljZU9wdGlvbnNFbGVtZW50LmFwcGVuZENoaWxkKGNob2ljZU9wdGlvbkVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2hvb3NlUXVpeihlbGVtZW50OkhUTUxFbGVtZW50KTp2b2lkIHtcclxuICAgICAgICBjb25zdCBkYXRhSWQ6c3RyaW5nIHwgbnVsbCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiKTtcclxuICAgICAgICBpZiAoZGF0YUlkKSB7XHJcbiAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSBcIiMvdGVzdD9pZD1cIiArIGRhdGFJZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsImltcG9ydCB7Q3VzdG9tSHR0cH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2N1c3RvbS1odHRwXCI7XHJcbmltcG9ydCB7QXV0aH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2F1dGhcIjtcclxuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi4vLi4vY29uZmlnL2NvbmZpZ1wiO1xyXG5pbXBvcnQge0Zvcm1GaWVsZFR5cGV9IGZyb20gXCIuLi90eXBlcy9mb3JtLWZpZWxkLnR5cGVcIjtcclxuaW1wb3J0IHtTaWdudXBSZXNwb25zZVR5cGV9IGZyb20gXCIuLi90eXBlcy9zaWdudXAtcmVzcG9uc2UudHlwZVwiO1xyXG5pbXBvcnQge0xvZ2luUmVzcG9uc2VUeXBlfSBmcm9tIFwiLi4vdHlwZXMvbG9naW4tcmVzcG9uc2UudHlwZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZvcm0ge1xyXG4gICAgcmVhZG9ubHkgYWdyZWVFbGVtZW50OkhUTUxJbnB1dEVsZW1lbnQgfCBudWxsO1xyXG4gICAgcmVhZG9ubHkgcHJvY2Vzc0VsZW1lbnQ6SFRNTEVsZW1lbnQgfCBudWxsO1xyXG4gICAgcmVhZG9ubHkgcGFnZTonc2lnbnVwJyB8ICdsb2dpbic7XHJcbiAgICBwcml2YXRlIGZpZWxkczpGb3JtRmllbGRUeXBlW10gPSBbXTtcclxuICAgIGNvbnN0cnVjdG9yKHBhZ2U6ICdzaWdudXAnIHwgJ2xvZ2luJykge1xyXG4gICAgICAgIHRoaXMuYWdyZWVFbGVtZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLnByb2Nlc3NFbGVtZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLnBhZ2UgPSBwYWdlO1xyXG5cclxuICAgICAgICBjb25zdCBhY2Nlc3NUb2tlbjpzdHJpbmcgfCBudWxsID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oQXV0aC5hY2Nlc3NUb2tlbktleSk7XHJcbiAgICAgICAgaWYgKGFjY2Vzc1Rva2VuKSB7XHJcbiAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9ICcjL2Nob2ljZSc7XHJcbiAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5maWVsZHMgPSBbXHJcblxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImVtYWlsXCIsXHJcbiAgICAgICAgICAgICAgICBpZDogXCJlbWFpbFwiLFxyXG4gICAgICAgICAgICAgICAgZWxlbWVudDogbnVsbCxcclxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvXltcXHctXFwuXStAKFtcXHctXStcXC4pK1tcXHctXXsyLDR9JC8sXHJcbiAgICAgICAgICAgICAgICB2YWxpZDogZmFsc2UsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwicGFzc3dvcmRcIixcclxuICAgICAgICAgICAgICAgIGlkOiBcInBhc3N3b3JkXCIsXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50OiBudWxsLFxyXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9eKD89LipbYS16XSkoPz0uKltBLVpdKSg/PS4qXFxkKVthLXpBLVpcXGRdezgsfSQvLFxyXG4gICAgICAgICAgICAgICAgdmFsaWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXTtcclxuICAgICAgICBpZiAodGhpcy5wYWdlID09PSAnc2lnbnVwJykge1xyXG4gICAgICAgICAgICB0aGlzLmZpZWxkcy51bnNoaWZ0KHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5hbWVcIixcclxuICAgICAgICAgICAgICAgICAgICBpZDogXCJuYW1lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudDogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICByZWdleDogL15b0JAt0K9dW9CwLdGPXStcXHMqJC8sXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImxhc3ROYW1lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwibGFzdG5hbWVcIixcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50OiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvXlvQkC3Qr11b0LAt0Y9dK1xccyokLyxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgdGhhdDpGb3JtID0gdGhpcztcclxuICAgICAgICB0aGlzLmZpZWxkcy5mb3JFYWNoKChpdGVtOkZvcm1GaWVsZFR5cGUpID0+IHtcclxuICAgICAgICAgICAgaXRlbS5lbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaXRlbS5pZCkgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgICAgICAgICAgaWYgKGl0ZW0uZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5lbGVtZW50Lm9uY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQudmFsaWRhdGVGaWVsZC5jYWxsKHRoYXQsIGl0ZW0sPEhUTUxJbnB1dEVsZW1lbnQ+dGhpcyk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMucHJvY2Vzc0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2Nlc3NcIik7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvY2Vzc0VsZW1lbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9jZXNzRWxlbWVudC5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5wcm9jZXNzRm9ybSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgaWYgKHRoaXMucGFnZSA9PT0gJ3NpZ251cCcpIHtcclxuICAgICAgICAgICAgdGhpcy5hZ3JlZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFncmVlXCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmFncmVlRWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZ3JlZUVsZW1lbnQub25jaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC52YWxpZGF0ZUZvcm0oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdmFsaWRhdGVGaWVsZChmaWVsZDpGb3JtRmllbGRUeXBlLCBlbGVtZW50OkhUTUxJbnB1dEVsZW1lbnQpOnZvaWQge1xyXG4gICAgICAgIGlmIChlbGVtZW50LnBhcmVudE5vZGUpIHtcclxuICAgICAgICAgICAgaWYgKCFlbGVtZW50LnZhbHVlIHx8ICFlbGVtZW50LnZhbHVlLm1hdGNoKGZpZWxkLnJlZ2V4KSkge1xyXG4gICAgICAgICAgICAgICAgKGVsZW1lbnQucGFyZW50Tm9kZSBhcyBIVE1MRWxlbWVudCkuc3R5bGUuYm9yZGVyQ29sb3IgPSBcInJlZFwiO1xyXG4gICAgICAgICAgICAgICAgZmllbGQudmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIChlbGVtZW50LnBhcmVudE5vZGUgYXMgSFRNTEVsZW1lbnQpLnJlbW92ZUF0dHJpYnV0ZShcInN0eWxlXCIpO1xyXG4gICAgICAgICAgICAgICAgZmllbGQudmFsaWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMudmFsaWRhdGVGb3JtKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdmFsaWRhdGVGb3JtKCk6Ym9vbGVhbiB7XHJcbiAgICAgICAgY29uc3QgdmFsaWRGb3JtOmJvb2xlYW4gPSB0aGlzLmZpZWxkcy5ldmVyeShpdGVtID0+IGl0ZW0udmFsaWQpO1xyXG4gICAgICAgIGNvbnN0IGlzVmFsaWQgOmJvb2xlYW49IHRoaXMuYWdyZWVFbGVtZW50ID8gdGhpcy5hZ3JlZUVsZW1lbnQuY2hlY2tlZCAmJiB2YWxpZEZvcm0gOiB2YWxpZEZvcm07XHJcbiAgICAgICAgaWYgKHRoaXMucHJvY2Vzc0VsZW1lbnQpIHtcclxuICAgICAgICAgICAgaWYgKGlzVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc0VsZW1lbnQucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NFbGVtZW50LnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGlzVmFsaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBwcm9jZXNzRm9ybSgpOlByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGlmICh0aGlzLnZhbGlkYXRlRm9ybSgpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVtYWlsID0gdGhpcy5maWVsZHMuZmluZChpdGVtID0+IGl0ZW0ubmFtZSA9PT0gJ2VtYWlsJyk/LmVsZW1lbnQ/LnZhbHVlO1xyXG4gICAgICAgICAgICBjb25zdCBwYXNzd29yZCA9IHRoaXMuZmllbGRzLmZpbmQoaXRlbSA9PiBpdGVtLm5hbWUgPT09ICdwYXNzd29yZCcpPy5lbGVtZW50Py52YWx1ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGFnZSA9PT0gJ3NpZ251cCcpIHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0OiBTaWdudXBSZXNwb25zZVR5cGUgPSBhd2FpdCBDdXN0b21IdHRwLnJlcXVlc3QoY29uZmlnLmhvc3QgKyAnL3NpZ251cCcsICdQT1NUJywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLmZpZWxkcy5maW5kKGl0ZW0gPT4gaXRlbS5uYW1lID09PSAnbmFtZScpPy5lbGVtZW50Py52YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdE5hbWU6IHRoaXMuZmllbGRzLmZpbmQoaXRlbSA9PiBpdGVtLm5hbWUgPT09ICdsYXN0TmFtZScpPy5lbGVtZW50Py52YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW1haWw6IGVtYWlsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmQsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmVycm9yIHx8ICFyZXN1bHQudXNlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3VsdC5tZXNzYWdlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQ6TG9naW5SZXNwb25zZVR5cGUgPSBhd2FpdCBDdXN0b21IdHRwLnJlcXVlc3QoY29uZmlnLmhvc3QgKyAnL2xvZ2luJywgJ1BPU1QnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6IGVtYWlsLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZCxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZXJyb3IgfHwgIXJlc3VsdC5hY2Nlc3NUb2tlbiB8fCAhcmVzdWx0LnJlZnJlc2hUb2tlbiB8fCAhcmVzdWx0LmZ1bGxOYW1lIHx8ICFyZXN1bHQudXNlcklkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXN1bHQubWVzc2FnZSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc3QgdXNlckVtYWlsOnN0cmluZyB8IHVuZGVmaW5lZCA9IHRoaXMuZmllbGRzLmZpbmQoaXRlbSA9PiBpdGVtLm5hbWUgPT09ICdlbWFpbCcpLmVsZW1lbnQudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgQXV0aC5zZXRUb2tlbnMocmVzdWx0LmFjY2Vzc1Rva2VuLCByZXN1bHQucmVmcmVzaFRva2VuKTtcclxuICAgICAgICAgICAgICAgICAgICBBdXRoLnNldFVzZXJJbmZvKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnVsbE5hbWU6cmVzdWx0LmZ1bGxOYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IHJlc3VsdC51c2VySWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVtYWlsOiB1c2VyRW1haWwsXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gJyMvY2hvaWNlJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7VXJsTWFuYWdlcn0gZnJvbSBcIi4uL3V0aWxzL3VybC1tYW5hZ2VyXCI7XHJcbmltcG9ydCB7Q3VzdG9tSHR0cH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2N1c3RvbS1odHRwXCI7XHJcbmltcG9ydCBjb25maWcgZnJvbSBcIi4uLy4uL2NvbmZpZy9jb25maWdcIjtcclxuaW1wb3J0IHtBdXRofSBmcm9tIFwiLi4vLi4vc2VydmljZXMvYXV0aFwiO1xyXG5pbXBvcnQge1F1ZXJ5UGFyYW1zfSBmcm9tIFwiLi4vdHlwZXMvcXVlcnktcGFyYW1zLnR5cGVcIjtcclxuaW1wb3J0IHtVc2VySW5mb1R5cGV9IGZyb20gXCIuLi90eXBlcy91c2VyLWluZm8udHlwZVwiO1xyXG5pbXBvcnQge0RlZmF1bHRSZXNwb25zZVR5cGV9IGZyb20gXCIuLi90eXBlcy9kZWZhdWx0LXJlc3BvbnNlLnR5cGVcIjtcclxuaW1wb3J0IHtQYXNzVGVzdFJlc3BvbnNlVHlwZX0gZnJvbSBcIi4uL3R5cGVzL3Bhc3MtdGVzdC1yZXNwb25zZS50eXBlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUmVzdWx0IHtcclxuICAgIHByaXZhdGUgcm91dGVQYXJhbXM6IFF1ZXJ5UGFyYW1zO1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZVBhcmFtcyA9IFVybE1hbmFnZXIuZ2V0UXVlcnlQYXJhbXMoKTtcclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIGluaXQoKTpQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBjb25zdCB1c2VySW5mbzpVc2VySW5mb1R5cGUgfCBudWxsID0gQXV0aC5nZXRVc2VySW5mbygpO1xyXG4gICAgICAgIGlmICghdXNlckluZm8pIHtcclxuICAgICAgICAgICAgbG9jYXRpb24uaHJlZj0nIy8nO1xyXG4gICAgICAgICAgICByZXR1cm4gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5yb3V0ZVBhcmFtcy5pZCkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0OkRlZmF1bHRSZXNwb25zZVR5cGUgfCBQYXNzVGVzdFJlc3BvbnNlVHlwZSA9IGF3YWl0IEN1c3RvbUh0dHAucmVxdWVzdChjb25maWcuaG9zdCArICcvdGVzdHMvJyArIHRoaXMucm91dGVQYXJhbXMuaWQgKyAnL3Jlc3VsdD91c2VySWQ9JyArIHVzZXJJbmZvLnVzZXJJZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChyZXN1bHQgYXMgRGVmYXVsdFJlc3BvbnNlVHlwZSkuZXJyb3IgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKHJlc3VsdCBhcyBEZWZhdWx0UmVzcG9uc2VUeXBlKS5tZXNzYWdlKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHRTY29yZUVsZW1lbnQ6SFRNTEVsZW1lbnQgfCBudWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3VsdC1zY29yZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHRTY29yZUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0U2NvcmVFbGVtZW50LmlubmVyVGV4dCA9IChyZXN1bHQgYXMgUGFzc1Rlc3RSZXNwb25zZVR5cGUpLnNjb3JlICsgJy8nICsgKHJlc3VsdCBhcyBQYXNzVGVzdFJlc3BvbnNlVHlwZSkudG90YWw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZpZXdBbnN3ZXJzQnV0dG9uOkhUTUxFbGVtZW50IHwgbnVsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWV3LWFuc3dlcnMnKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmlld0Fuc3dlcnNCdXR0b24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlld0Fuc3dlcnNCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiIy9hbnN3ZXJzP2lkPVwiICsgdGhpcy5yb3V0ZVBhcmFtcy5pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbG9jYXRpb24uaHJlZj0nIy8nO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtVcmxNYW5hZ2VyfSBmcm9tIFwiLi4vdXRpbHMvdXJsLW1hbmFnZXJcIjtcclxuaW1wb3J0IHtDdXN0b21IdHRwfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY3VzdG9tLWh0dHBcIjtcclxuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi4vLi4vY29uZmlnL2NvbmZpZ1wiO1xyXG5pbXBvcnQge0F1dGh9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9hdXRoXCI7XHJcbmltcG9ydCB7UXVlcnlQYXJhbXN9IGZyb20gXCIuLi90eXBlcy9xdWVyeS1wYXJhbXMudHlwZVwiO1xyXG5pbXBvcnQge1F1aXpBbnN3ZXJUeXBlLCBRdWl6UXVlc3Rpb25UeXBlLCBRdWl6VHlwZX0gZnJvbSBcIi4uL3R5cGVzL3F1aXoudHlwZVwiO1xyXG5pbXBvcnQge1VzZXJSZXN1bHRUeXBlfSBmcm9tIFwiLi4vdHlwZXMvdXNlci1yZXN1bHQudHlwZVwiO1xyXG5pbXBvcnQge0RlZmF1bHRSZXNwb25zZVR5cGV9IGZyb20gXCIuLi90eXBlcy9kZWZhdWx0LXJlc3BvbnNlLnR5cGVcIjtcclxuaW1wb3J0IHtBY3Rpb25UeXBlc30gZnJvbSBcIi4uL3R5cGVzL2FjdGlvbi10ZXN0LnR5cGVcIjtcclxuaW1wb3J0IHtVc2VySW5mb1R5cGV9IGZyb20gXCIuLi90eXBlcy91c2VyLWluZm8udHlwZVwiO1xyXG5pbXBvcnQge1Bhc3NUZXN0UmVzcG9uc2VUeXBlfSBmcm9tIFwiLi4vdHlwZXMvcGFzcy10ZXN0LXJlc3BvbnNlLnR5cGVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBUZXN0IHtcclxuICAgIHByaXZhdGUgcHJvZ3Jlc3NCYXJFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGw7XHJcbiAgICBwcml2YXRlIHF1ZXN0aW9uVGl0bGVFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGw7XHJcbiAgICBwcml2YXRlIG5leHRCdXR0b25FbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGw7XHJcbiAgICBwcml2YXRlIHBhc3NCdXR0b25FbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGw7XHJcbiAgICBwcml2YXRlIHByZXZCdXR0b25FbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGw7XHJcbiAgICBwcml2YXRlIG9wdGlvbnNFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGw7XHJcbiAgICBwcml2YXRlIHF1aXo6IFF1aXpUeXBlIHwgbnVsbDtcclxuICAgIHByaXZhdGUgY3VycmVudFF1ZXN0aW9uSW5kZXg6IG51bWJlcjtcclxuICAgIHJlYWRvbmx5IHVzZXJSZXN1bHQ6IFVzZXJSZXN1bHRUeXBlW107XHJcbiAgICBwcml2YXRlIHJvdXRlUGFyYW1zOiBRdWVyeVBhcmFtcztcclxuICAgIHByaXZhdGUgaW50ZXJ2YWw6bnVtYmVyID0gMDtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMucXVpeiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvblRpdGxlRWxlbWVudCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzc0JhckVsZW1lbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubmV4dEJ1dHRvbkVsZW1lbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMucGFzc0J1dHRvbkVsZW1lbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMucHJldkJ1dHRvbkVsZW1lbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMub3B0aW9uc0VsZW1lbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFF1ZXN0aW9uSW5kZXggPSAxO1xyXG4gICAgICAgIHRoaXMudXNlclJlc3VsdCA9IFtdO1xyXG4gICAgICAgIHRoaXMucm91dGVQYXJhbXMgPSBVcmxNYW5hZ2VyLmdldFF1ZXJ5UGFyYW1zKCk7XHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBpbml0KCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGlmICh0aGlzLnJvdXRlUGFyYW1zLmlkKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQ6IERlZmF1bHRSZXNwb25zZVR5cGUgfCBRdWl6VHlwZSA9IGF3YWl0IEN1c3RvbUh0dHAucmVxdWVzdChjb25maWcuaG9zdCArICcvdGVzdHMvJyArIHRoaXMucm91dGVQYXJhbXMuaWQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgocmVzdWx0IGFzIERlZmF1bHRSZXNwb25zZVR5cGUpLmVycm9yICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKChyZXN1bHQgYXMgRGVmYXVsdFJlc3BvbnNlVHlwZSkubWVzc2FnZSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5xdWl6ID0gcmVzdWx0IGFzIFF1aXpUeXBlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRRdWl6KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gY2F0Y2hcclxuICAgICAgICAgICAgICAgIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhcnRRdWl6KCk6dm9pZCB7XHJcbiAgICAgICAgaWYoIXRoaXMucXVpeikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucXVlc3Rpb25UaXRsZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInF1ZXN0aW9uLXRpdGxlXCIpO1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3NCYXJFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9ncmVzcy1iYXJcIik7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib3B0aW9uc1wiKTtcclxuICAgICAgICB0aGlzLm5leHRCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZXh0XCIpO1xyXG4gICAgICAgIGlmICh0aGlzLm5leHRCdXR0b25FbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMubmV4dEJ1dHRvbkVsZW1lbnQub25jbGljayA9IHRoaXMubW92ZS5iaW5kKHRoaXMsIEFjdGlvblR5cGVzLm5leHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBhc3NCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwYXNzXCIpO1xyXG4gICAgICAgIGlmICh0aGlzLnBhc3NCdXR0b25FbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFzc0J1dHRvbkVsZW1lbnQub25jbGljayA9IHRoaXMubW92ZS5iaW5kKHRoaXMsIEFjdGlvblR5cGVzLnBhc3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnByZXZCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmV2XCIpO1xyXG4gICAgICAgIGlmICh0aGlzLnByZXZCdXR0b25FbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJldkJ1dHRvbkVsZW1lbnQub25jbGljayA9IHRoaXMubW92ZS5iaW5kKHRoaXMsIEFjdGlvblR5cGVzLnByZXYpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBwcmVUaXRsZUVsZW1lbnQ6SFRNTEVsZW1lbnQgfCBudWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmUtdGl0bGVcIik7XHJcbiAgICAgICAgaWYgKHByZVRpdGxlRWxlbWVudCkge1xyXG4gICAgICAgICAgICBwcmVUaXRsZUVsZW1lbnQuaW5uZXJUZXh0ID0gdGhpcy5xdWl6Lm5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucHJlcGFyZVByb2dyZXNzQmFyKCk7XHJcbiAgICAgICAgdGhpcy5zaG93UXVlc3Rpb24oKTtcclxuICAgICAgICBjb25zdCB0aW1lckVsZW1lbnQ6SFRNTEVsZW1lbnQgfCBudWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aW1lclwiKTtcclxuICAgICAgICBsZXQgc2Vjb25kczpudW1iZXIgPSA1OTtcclxuICAgICAgICBjb25zdCB0aGF0IDpUZXN0ID10aGlzO1xyXG4gICAgICAgIHRoaXMuaW50ZXJ2YWwgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzZWNvbmRzLS07XHJcbiAgICAgICAgICAgIGlmICh0aW1lckVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHRpbWVyRWxlbWVudC5pbm5lclRleHQgPSBzZWNvbmRzLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHNlY29uZHMgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhhdC5pbnRlcnZhbCk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LmJpbmQodGhpcyksIDEwMDApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcHJlcGFyZVByb2dyZXNzQmFyKCk6dm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnF1aXopIHJldHVybjtcclxuICAgICAgICBmb3IgKGxldCBpOm51bWJlciA9IDA7IGkgPCB0aGlzLnF1aXoucXVlc3Rpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1FbGVtZW50OkhUTUxFbGVtZW50IHwgbnVsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgIGl0ZW1FbGVtZW50LmNsYXNzTmFtZSA9ICd0ZXN0LXByb2dyZXNzLWJhci1pdGVtJyArIChpID09PSAwID8gJyBhY3RpdmUnIDogJycpO1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtQ2lyY2xlRWxlbWVudDpIVE1MRWxlbWVudCB8IG51bGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICBpdGVtQ2lyY2xlRWxlbWVudC5jbGFzc05hbWUgPSAndGVzdC1wcm9ncmVzcy1iYXItaXRlbS1jaXJjbGUnO1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtVGV4dEVsZW1lbnQ6SFRNTEVsZW1lbnQgfCBudWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgaXRlbVRleHRFbGVtZW50LmNsYXNzTmFtZSA9IChcInRlc3QtcHJvZ3Jlc3MtYmFyLXRleHRcIik7XHJcbiAgICAgICAgICAgIGl0ZW1UZXh0RWxlbWVudC5pbm5lclRleHQgPSAn0JLQvtC/0YDQvtGBICcgKyAoaSArIDEpO1xyXG5cclxuICAgICAgICAgICAgaXRlbUVsZW1lbnQuYXBwZW5kQ2hpbGQoaXRlbUNpcmNsZUVsZW1lbnQpO1xyXG4gICAgICAgICAgICBpdGVtRWxlbWVudC5hcHBlbmRDaGlsZChpdGVtVGV4dEVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMucHJvZ3Jlc3NCYXJFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzQmFyRWxlbWVudC5hcHBlbmRDaGlsZChpdGVtRWxlbWVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzaG93UXVlc3Rpb24oKTp2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMucXVpeikgcmV0dXJuO1xyXG4gICAgICAgIGNvbnN0IGFjdGl2ZVF1ZXN0aW9uOlF1aXpRdWVzdGlvblR5cGUgPSB0aGlzLnF1aXoucXVlc3Rpb25zW3RoaXMuY3VycmVudFF1ZXN0aW9uSW5kZXggLSAxXTtcclxuICAgICAgICBpZiAodGhpcy5xdWVzdGlvblRpdGxlRWxlbWVudCkge1xyXG4gICAgICAgICAgICB0aGlzLnF1ZXN0aW9uVGl0bGVFbGVtZW50LmlubmVySFRNTCA9ICc8c3Bhbj7QktC+0L/RgNC+0YEgJyArIHRoaXMuY3VycmVudFF1ZXN0aW9uSW5kZXggKyAnOjwvc3Bhbj4gJyArIGFjdGl2ZVF1ZXN0aW9uLnF1ZXN0aW9uO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zRWxlbWVudCkge3RoaXMub3B0aW9uc0VsZW1lbnQuaW5uZXJIVE1MID0gJyc7fVxyXG4gICAgICAgIGNvbnN0IHRoYXQ6VGVzdCA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgY2hvc2VuT3B0aW9uOlVzZXJSZXN1bHRUeXBlIHwgdW5kZWZpbmVkICA9IHRoaXMudXNlclJlc3VsdC5maW5kKGl0ZW0gPT4gaXRlbS5xdWVzdGlvbklkID09PSBhY3RpdmVRdWVzdGlvbi5pZCk7XHJcbiAgICAgICAgYWN0aXZlUXVlc3Rpb24uYW5zd2Vycy5mb3JFYWNoKChhbnN3ZXI6UXVpekFuc3dlclR5cGUpOnZvaWQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBvcHRpb25FbGVtZW50OkhUTUxFbGVtZW50IHwgbnVsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgIG9wdGlvbkVsZW1lbnQuY2xhc3NOYW1lID0gKFwidGVzdC1xdWVzdGlvbi1vcHRpb25cIik7XHJcbiAgICAgICAgICAgIGNvbnN0IGlucHV0SWQ6c3RyaW5nID0gJ2Fuc3dlci0nICsgYW5zd2VyLmlkO1xyXG4gICAgICAgICAgICBjb25zdCBpbnB1dEVsZW1lbnQ6SFRNTEVsZW1lbnQgfCBudWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgICAgICAgICBpbnB1dEVsZW1lbnQuY2xhc3NOYW1lID0gJ29wdGlvbi1hbnN3ZXInO1xyXG4gICAgICAgICAgICBpbnB1dEVsZW1lbnQuc2V0QXR0cmlidXRlKFwiaWRcIiwgaW5wdXRJZCk7XHJcbiAgICAgICAgICAgIGlucHV0RWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwicmFkaW9cIik7XHJcbiAgICAgICAgICAgIGlucHV0RWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsIFwiYW5zd2VyXCIpO1xyXG4gICAgICAgICAgICBpbnB1dEVsZW1lbnQuc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgYW5zd2VyLmlkLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICBpZiAoY2hvc2VuT3B0aW9uICYmIGNob3Nlbk9wdGlvbi5jaG9zZW5BbnN3ZXJJZCA9PT0gYW5zd2VyLmlkKSB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dEVsZW1lbnQuc2V0QXR0cmlidXRlKCdjaGVja2VkJywgJ2NoZWNrZWQnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaW5wdXRFbGVtZW50Lm9uY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5jaG9vc2VBbnN3ZXIoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgbGFiZWxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xyXG4gICAgICAgICAgICBsYWJlbEVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZm9yXCIsIGlucHV0SWQpO1xyXG4gICAgICAgICAgICBsYWJlbEVsZW1lbnQuaW5uZXJUZXh0ID0gYW5zd2VyLmFuc3dlcjtcclxuXHJcbiAgICAgICAgICAgIG9wdGlvbkVsZW1lbnQuYXBwZW5kQ2hpbGQoaW5wdXRFbGVtZW50KTtcclxuICAgICAgICAgICAgb3B0aW9uRWxlbWVudC5hcHBlbmRDaGlsZChsYWJlbEVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9uc0VsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc0VsZW1lbnQuYXBwZW5kQ2hpbGQob3B0aW9uRWxlbWVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAodGhpcy5uZXh0QnV0dG9uRWxlbWVudCkge1xyXG4gICAgICAgICAgICBpZiAoY2hvc2VuT3B0aW9uICYmIGNob3Nlbk9wdGlvbi5jaG9zZW5BbnN3ZXJJZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0QnV0dG9uRWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubmV4dEJ1dHRvbkVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMubmV4dEJ1dHRvbkVsZW1lbnQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFF1ZXN0aW9uSW5kZXggPT09IHRoaXMucXVpei5xdWVzdGlvbnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5leHRCdXR0b25FbGVtZW50LmlubmVyVGV4dCA9IFwi0JfQsNCy0LXRgNGI0LjRgtGMXCJcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubmV4dEJ1dHRvbkVsZW1lbnQuaW5uZXJUZXh0ID0gXCLQlNCw0LvRjNGI0LVcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5wcmV2QnV0dG9uRWxlbWVudCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50UXVlc3Rpb25JbmRleCA+IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJldkJ1dHRvbkVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByZXZCdXR0b25FbGVtZW50LnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaG9vc2VBbnN3ZXIoKTp2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5uZXh0QnV0dG9uRWxlbWVudCkge1xyXG4gICAgICAgICAgICB0aGlzLm5leHRCdXR0b25FbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG1vdmUoYWN0aW9uOkFjdGlvblR5cGVzKTp2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMucXVpeikgcmV0dXJuO1xyXG4gICAgICAgIGNvbnN0IGFjdGl2ZVF1ZXN0aW9uOlF1aXpRdWVzdGlvblR5cGUgPSB0aGlzLnF1aXoucXVlc3Rpb25zW3RoaXMuY3VycmVudFF1ZXN0aW9uSW5kZXggLSAxXTtcclxuICAgICAgICBjb25zdCBjaG9zZW5BbnN3ZXI6SFRNTElucHV0RWxlbWVudCB8IHVuZGVmaW5lZCA9IEFycmF5LmZyb20oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnb3B0aW9uLWFuc3dlcicpKS5maW5kKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gKGVsZW1lbnQgYXMgSFRNTElucHV0RWxlbWVudCkuY2hlY2tlZDtcclxuICAgICAgICB9KSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgICAgIGxldCBjaG9zZW5BbnN3ZXJJZDpudW1iZXIgfCBudWxsID0gbnVsbDtcclxuICAgICAgICBpZiAoY2hvc2VuQW5zd2VyICYmIGNob3NlbkFuc3dlci52YWx1ZSkge1xyXG4gICAgICAgICAgICBjaG9zZW5BbnN3ZXJJZCA9IE51bWJlcihjaG9zZW5BbnN3ZXIudmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZXhpc3RpbmdSZXN1bHQ6VXNlclJlc3VsdFR5cGUgfCB1bmRlZmluZWQgPSB0aGlzLnVzZXJSZXN1bHQuZmluZChpdGVtID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW0ucXVlc3Rpb25JZCA9PT0gYWN0aXZlUXVlc3Rpb24uaWQ7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZiAoY2hvc2VuQW5zd2VySWQpIHtcclxuICAgICAgICAgICAgaWYgKGV4aXN0aW5nUmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICBleGlzdGluZ1Jlc3VsdC5jaG9zZW5BbnN3ZXJJZCA9IGNob3NlbkFuc3dlcklkO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51c2VyUmVzdWx0LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9uSWQ6IGFjdGl2ZVF1ZXN0aW9uLmlkLFxyXG4gICAgICAgICAgICAgICAgICAgIGNob3NlbkFuc3dlcklkOiBjaG9zZW5BbnN3ZXJJZFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYWN0aW9uID09PSBBY3Rpb25UeXBlcy5uZXh0IHx8IGFjdGlvbiA9PT0gQWN0aW9uVHlwZXMucGFzcykge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRRdWVzdGlvbkluZGV4Kys7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UXVlc3Rpb25JbmRleC0tO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFF1ZXN0aW9uSW5kZXggPiB0aGlzLnF1aXoucXVlc3Rpb25zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMucHJvZ3Jlc3NCYXJFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIEFycmF5LmZyb20odGhpcy5wcm9ncmVzc0JhckVsZW1lbnQuY2hpbGRyZW4pLmZvckVhY2goKGl0ZW06RWxlbWVudCwgaW5kZXg6bnVtYmVyKTp2b2lkID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRJdGVtSW5kZXg6bnVtYmVyID0gaW5kZXggKyAxO1xyXG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdjb21wbGV0ZScpO1xyXG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50SXRlbUluZGV4ID09PSB0aGlzLmN1cnJlbnRRdWVzdGlvbkluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudEl0ZW1JbmRleCA8IHRoaXMuY3VycmVudFF1ZXN0aW9uSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ2NvbXBsZXRlJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2hvd1F1ZXN0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBjb21wbGV0ZSgpOlByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGNvbnN0IHVzZXJJbmZvOiBVc2VySW5mb1R5cGUgfCBudWxsID0gQXV0aC5nZXRVc2VySW5mbygpO1xyXG4gICAgICAgIGlmICghdXNlckluZm8pIHtcclxuICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9ICcjLyc7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQ6RGVmYXVsdFJlc3BvbnNlVHlwZSB8IFBhc3NUZXN0UmVzcG9uc2VUeXBlID0gYXdhaXQgQ3VzdG9tSHR0cC5yZXF1ZXN0KGNvbmZpZy5ob3N0ICsgJy90ZXN0cy8nICsgdGhpcy5yb3V0ZVBhcmFtcy5pZCArICcvcGFzcycsICdQT1NUJywge1xyXG4gICAgICAgICAgICAgICAgdXNlcklkOiB1c2VySW5mby51c2VySWQsXHJcbiAgICAgICAgICAgICAgICByZXN1bHRzOiB0aGlzLnVzZXJSZXN1bHRcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKChyZXN1bHQgYXMgRGVmYXVsdFJlc3BvbnNlVHlwZSkuZXJyb3IgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigocmVzdWx0IGFzIERlZmF1bHRSZXNwb25zZVR5cGUpLm1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gXCIjL3Jlc3VsdD9pZD1cIiArIHRoaXMucm91dGVQYXJhbXMuaWRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7Rm9ybX0gZnJvbSBcIi4vY29tcG9uZW50cy9mb3JtXCI7XHJcbmltcG9ydCB7Q2hvaWNlfSBmcm9tIFwiLi9jb21wb25lbnRzL2Nob2ljZVwiO1xyXG5pbXBvcnQge1Rlc3R9IGZyb20gXCIuL2NvbXBvbmVudHMvdGVzdFwiO1xyXG5pbXBvcnQge0Fuc3dlcnN9IGZyb20gXCIuL2NvbXBvbmVudHMvYW5zd2Vyc1wiO1xyXG5pbXBvcnQge1Jlc3VsdH0gZnJvbSBcIi4vY29tcG9uZW50cy9yZXN1bHRcIjtcclxuaW1wb3J0IHtBdXRofSBmcm9tIFwiLi4vc2VydmljZXMvYXV0aFwiO1xyXG5pbXBvcnQge1JvdXRlVHlwZX0gZnJvbSBcIi4vdHlwZXMvcm91dGUudHlwZVwiO1xyXG5pbXBvcnQge1VzZXJJbmZvVHlwZX0gZnJvbSBcIi4vdHlwZXMvdXNlci1pbmZvLnR5cGVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBSb3V0ZXIge1xyXG4gICAgcmVhZG9ubHkgY29udGVudEVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbDtcclxuICAgIHJlYWRvbmx5IHN0eWxlc0VsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbDtcclxuICAgIHJlYWRvbmx5IHRpdGxlRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsO1xyXG4gICAgcmVhZG9ubHkgcHJvZmlsZUVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbDtcclxuICAgIHJlYWRvbmx5IHByb2ZpbGVGdWxsTmFtZUVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbDtcclxuICAgIHByaXZhdGUgcm91dGVzOiBSb3V0ZVR5cGVbXTtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuY29udGVudEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRlbnRcIik7XHJcbiAgICAgICAgdGhpcy5zdHlsZXNFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdHlsZXNcIilcclxuICAgICAgICB0aGlzLnRpdGxlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYWdlLXRpdGxlJyk7XHJcbiAgICAgICAgdGhpcy5wcm9maWxlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9maWxlJyk7XHJcbiAgICAgICAgdGhpcy5wcm9maWxlRnVsbE5hbWVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2ZpbGUtZnVsbC1uYW1lJyk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXMgPSBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJvdXRlOiAnIy8nLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfQk9C70LDQstC90LDRjycsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogJ3RlbXBsYXRlcy9pbmRleC5odG1sJyxcclxuICAgICAgICAgICAgICAgIHN0eWxlczogXCJzdHlsZXMvaW5kZXguY3NzXCIsXHJcbiAgICAgICAgICAgICAgICBsb2FkOigpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJvdXRlOiAnIy9zaWdudXAnLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfQoNC10LPQuNGB0YLRgNCw0YbQuNGPJyxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiAndGVtcGxhdGVzL3NpZ251cC5odG1sJyxcclxuICAgICAgICAgICAgICAgIHN0eWxlczogXCJzdHlsZXMvZm9ybS5jc3NcIixcclxuICAgICAgICAgICAgICAgIGxvYWQ6KCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBGb3JtKCdzaWdudXAnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcm91dGU6ICcjL2xvZ2luJyxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAn0JLRhdC+0LQg0LIg0YHQuNGB0YLQtdC80YMnLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6ICd0ZW1wbGF0ZXMvbG9naW4uaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBzdHlsZXM6IFwic3R5bGVzL2Zvcm0uY3NzXCIsXHJcbiAgICAgICAgICAgICAgICBsb2FkOigpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBuZXcgRm9ybSgnbG9naW4nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcm91dGU6ICcjL2Nob2ljZScsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ9CS0YvQsdC+0YAg0YLQtdGB0YLQsCcsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogJ3RlbXBsYXRlcy9jaG9pY2UuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBzdHlsZXM6IFwic3R5bGVzL2Nob2ljZS5jc3NcIixcclxuICAgICAgICAgICAgICAgIGxvYWQ6KCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBDaG9pY2UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcm91dGU6ICcjL3Rlc3QnLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfQn9GA0L7RhdC+0LbQtNC10L3QuNC1INGC0LXRgdGC0LAnLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6ICd0ZW1wbGF0ZXMvdGVzdC5odG1sJyxcclxuICAgICAgICAgICAgICAgIHN0eWxlczogXCJzdHlsZXMvdGVzdC5jc3NcIixcclxuICAgICAgICAgICAgICAgIGxvYWQ6KCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBUZXN0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJvdXRlOiAnIy9yZXN1bHQnLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfQoNC10LfRg9C70YzRgtCw0YLRiycsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogJ3RlbXBsYXRlcy9yZXN1bHQuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBzdHlsZXM6IFwic3R5bGVzL3Jlc3VsdC5jc3NcIixcclxuICAgICAgICAgICAgICAgIGxvYWQ6KCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBSZXN1bHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcm91dGU6ICcjL2Fuc3dlcnMnLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfQn9GA0LDQstC40LvRjNC90YvQtSDQvtGC0LLQtdGC0YsnLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6ICd0ZW1wbGF0ZXMvYW5zd2Vycy5odG1sJyxcclxuICAgICAgICAgICAgICAgIHN0eWxlczogXCJzdHlsZXMvYW5zd2Vycy5jc3NcIixcclxuICAgICAgICAgICAgICAgIGxvYWQ6KCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBBbnN3ZXJzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBvcGVuUm91dGUoKTpQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBjb25zdCB1cmxSb3V0ZTpzdHJpbmcgPSB3aW5kb3cubG9jYXRpb24uaGFzaC5zcGxpdCgnPycpWzBdO1xyXG4gICAgICAgIGlmICh1cmxSb3V0ZSA9PT0gJyMvbG9nb3V0Jykge1xyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQ6Ym9vbGVhbiA9IGF3YWl0IEF1dGgubG9nb3V0KCk7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIjL1wiO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG5ld1JvdXRlOlJvdXRlVHlwZSB8IHVuZGVmaW5lZCA9IHRoaXMucm91dGVzLmZpbmQoaXRlbSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBpdGVtLnJvdXRlID09PSB1cmxSb3V0ZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIW5ld1JvdXRlKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIjL1wiO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZighdGhpcy5jb250ZW50RWxlbWVudCB8fCAhdGhpcy5zdHlsZXNFbGVtZW50IHx8ICF0aGlzLnRpdGxlRWxlbWVudCB8fCAhdGhpcy5wcm9maWxlRWxlbWVudCB8fCAhdGhpcy5wcm9maWxlRnVsbE5hbWVFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGlmICh1cmxSb3V0ZSA9PT0gJyMvJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiIy9cIjtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jb250ZW50RWxlbWVudC5pbm5lckhUTUwgPSBhd2FpdCBmZXRjaChuZXdSb3V0ZS50ZW1wbGF0ZSkudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS50ZXh0KCkpO1xyXG4gICAgICAgIHRoaXMuc3R5bGVzRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIG5ld1JvdXRlLnN0eWxlcyk7XHJcbiAgICAgICAgdGhpcy50aXRsZUVsZW1lbnQuaW5uZXJUZXh0ID0gbmV3Um91dGUudGl0bGU7XHJcblxyXG4gICAgICAgIGNvbnN0IHVzZXJJbmZvIDpVc2VySW5mb1R5cGUgfCBudWxsID0gQXV0aC5nZXRVc2VySW5mbygpO1xyXG4gICAgICAgIGNvbnN0IGFjY2Vzc1Rva2VuOnN0cmluZyB8IG51bGwgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShBdXRoLmFjY2Vzc1Rva2VuS2V5KTtcclxuICAgICAgICBpZiAodXNlckluZm8gJiYgYWNjZXNzVG9rZW4pIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9maWxlRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgICAgICAgICB0aGlzLnByb2ZpbGVGdWxsTmFtZUVsZW1lbnQuaW5uZXJUZXh0ID0gdXNlckluZm8uZnVsbE5hbWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9maWxlRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBuZXdSb3V0ZS5sb2FkKCk7XHJcbiAgICB9XHJcblxyXG5cclxufSIsImV4cG9ydCBlbnVtIEFjdGlvblR5cGVzIHtcclxuICAgIG5leHQgPSAnbmV4dCcsXHJcbiAgICBwYXNzID0gJ3Bhc3MnLFxyXG4gICAgcHJldiA9ICdwcmV2JyxcclxuXHJcbn0iLCJpbXBvcnQge1F1ZXJ5UGFyYW1zfSBmcm9tIFwiLi4vdHlwZXMvcXVlcnktcGFyYW1zLnR5cGVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBVcmxNYW5hZ2VyIHtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFF1ZXJ5UGFyYW1zKCk6UXVlcnlQYXJhbXMge1xyXG4gICAgICAgIGNvbnN0IHFzOnN0cmluZyA9IGRvY3VtZW50LmxvY2F0aW9uLmhhc2guc3BsaXQoJysnKS5qb2luKCcgJyk7XHJcbiAgICAgICAgbGV0IHBhcmFtczpRdWVyeVBhcmFtcyA9IHt9LFxyXG4gICAgICAgICAgICB0b2tlbnMgOiBSZWdFeHBFeGVjQXJyYXkgfCBudWxsLFxyXG4gICAgICAgICAgICByZTpSZWdFeHAgPSAvWz8mXShbXj1dKyk9KFteJl0qKS9nO1xyXG5cclxuICAgICAgICB3aGlsZSh0b2tlbnMgPSByZS5leGVjKHFzKSkge1xyXG4gICAgICAgICAgICBwYXJhbXNbZGVjb2RlVVJJQ29tcG9uZW50KHRva2Vuc1sxXSldID0gZGVjb2RlVVJJQ29tcG9uZW50KHRva2Vuc1syXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwYXJhbXM7XHJcbiAgICB9XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIi4vcm91dGVyXCI7XHJcblxyXG5jbGFzcyBBcHAge1xyXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcjtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMucm91dGVyID0gbmV3IFJvdXRlcigpO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgdGhpcy5oYW5kbGVSb3V0ZUNoYW5naW5nLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb3BzdGF0ZScsIHRoaXMuaGFuZGxlUm91dGVDaGFuZ2luZy5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgaGFuZGxlUm91dGVDaGFuZ2luZygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJvdXRlci5vcGVuUm91dGUoKTtcclxuICAgIH1cclxufVxyXG5cclxuKG5ldyBBcHAoKSk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==