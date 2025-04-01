import {Auth} from "../../services/auth";
import {CustomHttp} from "../../services/custom-http";
import config from "../../config/config";
import {UrlManager} from "../utils/url-manager";
import {QuizAnswerType, QuizQuestionType, QuizType} from "../types/quiz.type";
import {QueryParams} from "../types/query-params.type";
import {UserInfoType} from "../types/user-info.type";

export class Answers {
    private quiz:QuizType | null;
    private optionsElement:HTMLElement | null;
    private routeParams: QueryParams;
    private questionTitleElement:HTMLElement | null = null;
    constructor() {
        this.quiz = null;
        this.optionsElement = null;
        this.routeParams = UrlManager.getQueryParams();
        this.init();
    }

    private async init():Promise<void> {
        const userInfo:UserInfoType| null = Auth.getUserInfo();
        if (!userInfo) {
            location.href='#/';
            return ;
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

    private startQuiz():void {
        if (!this.quiz) {
            return;
        }
        this.questionTitleElement = document.getElementById("question-title");
        this.optionsElement = document.getElementById("options");
        const testNameElement:HTMLElement |null = document.getElementById('test-name');
        if (testNameElement) {
            testNameElement.innerText = this.quiz.name;
        }
        this.showQuestions();
    }

    private async setUserName():Promise<void> {
        const userInfo:UserInfoType|null = Auth.getUserInfo();
        if (userInfo) {
            const fullName:string = userInfo.fullName;
            const doneTextElement:HTMLElement |null = document.getElementById('done-text');
            if (doneTextElement) {
                doneTextElement.innerText = fullName;
            }
        }
    }

    showQuestions() {
        if (!this.quiz) return;
        this.quiz.questions.forEach((question:QuizQuestionType, index) => {
            const questionBlock:HTMLElement |null = document.createElement("div");
            questionBlock.className = "question-block";

            const questionTitle:HTMLElement |null = document.createElement("div");
            questionTitle.className = "test-question-title";
            questionTitle.innerHTML = `<span>Вопрос ${index + 1}:</span> ${question.question}`;
            questionBlock.appendChild(questionTitle);

            const optionsContainer:HTMLElement |null= document.createElement("div");
            optionsContainer.className = "options-container";

            question.answers.forEach((answer:QuizAnswerType) => {
                const optionElement:HTMLElement |null = document.createElement("div");
                optionElement.className = "test-question-option";

                const inputId = `answer-${question.id}-${answer.id}`;

                const inputElement:HTMLInputElement | null = document.createElement("input");
                inputElement.className = "option-answer";
                inputElement.setAttribute("id", inputId);
                inputElement.setAttribute("type", "radio");
                inputElement.setAttribute("disabled", "disabled");
                inputElement.setAttribute("name", `answer-${question.id}`);
                inputElement.setAttribute("value", answer.id.toString());

                const labelElement:HTMLElement |null = document.createElement("label");
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
            if (this.optionsElement) {
                this.optionsElement.appendChild(questionBlock);
            }
        });
    }

}