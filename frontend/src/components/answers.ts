import {Auth} from "../../services/auth";
import {CustomHttp} from "../../services/custom-http";
import config from "../../config/config";
import {UrlManager} from "../utils/url-manager.ts";

export class Answers {
    constructor() {
        this.quiz = null;
        this.optionsElement = null;
        this.routeParams = UrlManager.getQueryParams();
        this.init();
    }

    async init() {
        const userInfo = Auth.getUserInfo();
        if (!userInfo) {
            location.href='#/'
        }
        if (this.routeParams.id) {
            try {
                const result = await CustomHttp.request(config.host + '/tests/' + this.routeParams.id +"/result/details?userId=" + userInfo.userId);
                if (result) {
                    console.log(result)
                    this.quiz = result.test;
                    if (result.error) {
                        throw new Error(result.error);
                    }
                }
            } catch (e) {
                console.log(e);
            }
            this.setUserName();
            this.startQuiz();
        }
        const backToResultButton = document.getElementById('back-to-result');
        if (backToResultButton && this.routeParams.id) {
            backToResultButton.onclick = () => {
                location.href = "#/result?id=" + this.routeParams.id
            };
        }
    }

    startQuiz() {
        this.questionTitleElement = document.getElementById("question-title");
        this.optionsElement = document.getElementById("options");
        document.getElementById('test-name').innerText = this.quiz.name;
        this.showQuestions();
    }

    async setUserName() {
        const userInfo = Auth.getUserInfo();
        const fullName = userInfo.fullName;
        const email = userInfo.email;
        document.getElementById('done-text').innerText = fullName + ', ' + email;
    }

    showQuestions() {
        this.quiz.questions.forEach((question, index) => {
            const questionBlock = document.createElement("div");
            questionBlock.className = "question-block";

            const questionTitle = document.createElement("div");
            questionTitle.className = "test-question-title";
            questionTitle.innerHTML = `<span>Вопрос ${index + 1}:</span> ${question.question}`;
            questionBlock.appendChild(questionTitle);

            const optionsContainer = document.createElement("div");
            optionsContainer.className = "options-container";

            question.answers.forEach((answer) => {
                const optionElement = document.createElement("div");
                optionElement.className = "test-question-option";

                const inputId = `answer-${question.id}-${answer.id}`;

                const inputElement = document.createElement("input");
                inputElement.className = "option-answer";
                inputElement.setAttribute("id", inputId);
                inputElement.setAttribute("type", "radio");
                inputElement.setAttribute("disabled", "disabled");
                inputElement.setAttribute("name", `answer-${question.id}`);
                inputElement.setAttribute("value", answer.id);

                const labelElement = document.createElement("label");
                labelElement.setAttribute("for", inputId);
                labelElement.innerText = answer.answer;

                if (answer.correct === true) {
                    optionElement.style.color = "#5FDC33";
                    inputElement.style.display = "block";
                    inputElement.style.border = "6px solid #5FDC33";
                    inputElement.setAttribute("checked", "checked");
                } else if (answer.correct === false) {
                    optionElement.style.color = "#DC3333";
                    inputElement.style.display = "block";
                    inputElement.style.border = "6px solid #DC3333";
                    inputElement.setAttribute("checked", "checked");
                }

                optionElement.appendChild(inputElement);
                optionElement.appendChild(labelElement);
                optionsContainer.appendChild(optionElement);
            });

            questionBlock.appendChild(optionsContainer);
            this.optionsElement.appendChild(questionBlock);
        });
    }

}