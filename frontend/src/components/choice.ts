import {UrlManager} from "../utils/url-manager";
import {CustomHttp} from "../../services/custom-http";
import config from "../../config/config";
import {Auth} from "../../services/auth";
import {QueryParams} from "../types/query-params.type";
import {QuizListType} from "../types/quiz-list.type";
import {TestResultType} from "../types/test-result.type";
import {UserInfoType} from "../types/user-info.type";
import {DefaultResponseType} from "../types/default-response.type";

export class Choice {
    private quizzes:QuizListType[] = [];
    private testResult:TestResultType[] | null = null;
    private routeParams: QueryParams;
    constructor() {
        this.routeParams = UrlManager.getQueryParams();
        this.init();
    }

    private async init():Promise<void> {
        try {
            this.quizzes = await CustomHttp.request(config.host + '/tests')
        } catch (error) {
            console.log(error);
            return;
        }
        const userInfo:UserInfoType | null = Auth.getUserInfo();
        if (userInfo) {
            try {
                const result: DefaultResponseType|TestResultType = await CustomHttp.request(config.host + '/tests/results?userId=' + userInfo.userId);
                if (result) {
                    if (result.error) {
                        throw new Error(result.error)
                    }
                    this.testResult = result;
                }
            } catch (error) {
                console.log(error);
                return;
            }
        }
        this.processQuizzes();
    }

    processQuizzes() {
        const choiceOptionsElement = document.getElementById("choice-options");
        if (this.quizzes && this.quizzes.length > 0) {
            this.quizzes.forEach((quiz) => {
                const that = this;
                const choiceOptionElement = document.createElement("div");
                choiceOptionElement.className = ("choice-option");
                choiceOptionElement.setAttribute("data-id", quiz.id);
                choiceOptionElement.onclick = function () {
                    that.chooseQuiz(this);
                }
                const choiceOptionTextElement = document.createElement("div");
                choiceOptionTextElement.className = ("choice-option-text");
                choiceOptionTextElement.innerText = quiz.name;
                const choiceOptionArrowElement = document.createElement("div");
                choiceOptionArrowElement.className = ("choice-option-arrow");

                const result = this.testResult.find(item => item.testId === quiz.id);
                if (result) {
                    const choiceOptionResultElement = document.createElement("div");
                    choiceOptionResultElement.className = "choice-option-result";
                    choiceOptionResultElement.innerHTML = '<div>Результат</div><div>'+ result.score + '/' + result.total + '</div>';
                    choiceOptionElement.appendChild(choiceOptionResultElement);
                }

                const choiceOptionImgElement = document.createElement("img");
                choiceOptionImgElement.setAttribute("src", "/img/arrow.png");
                choiceOptionImgElement.setAttribute("alt", "arrow picture");

                choiceOptionArrowElement.appendChild(choiceOptionImgElement);
                choiceOptionElement.appendChild(choiceOptionTextElement);
                choiceOptionElement.appendChild(choiceOptionArrowElement);
                choiceOptionsElement.appendChild(choiceOptionElement);
            });
        }

    }

    chooseQuiz(element) {
        const dataId = element.getAttribute("data-id");
        if (dataId) {
            location.href = "#/test?id=" + dataId;
        }
    }
}

