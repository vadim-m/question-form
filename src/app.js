import { Question } from "./question";
import { createModal, isValue } from "./utils";
import { getAuthForm } from "./auth";
import { authWithEmailAndPassword } from "./auth";
import "./style.css";

const form = document.querySelector("#form");
const input = form.querySelector("#question-input");
const submitBtn = form.querySelector("#submit");
const login = document.querySelector("#login-btn");

window.addEventListener("load", Question.renderList);
form.addEventListener("submit", submitFormHandler);
login.addEventListener("click", openModal);

function submitFormHandler(event) {
  event.preventDefault();

  if (isValue(input.value)) {
    const question = {
      text: input.value.trim(),
      date: new Date().toJSON(),
    };

    // Чтобы не спамить вопросы. ждем ответа от сервера
    submitBtn.disabled = true;
    console.log(question);
    // async request to server
    Question.create(question).then(function () {
      // Очищаем поле, убираем ненужные классы, включаем кнопку
      input.value = "";
      input.classList = "";
      submitBtn.disabled = false;
    });
  }
}

function openModal() {
  createModal("Авторизация", getAuthForm());

  document
    .querySelector("#auth-form")
    .addEventListener("submit", authFormHandler, { once: true });
}

function authFormHandler(event) {
  event.preventDefault();

  const btn = event.target.querySelector("button");
  const email = event.target.querySelector("#email").value;
  const password = event.target.querySelector("#password").value;

  btn.disabled = true;
  authWithEmailAndPassword(email, password)
    .then(Question.fetch)
    .then(renderModalAfterAuth)
    .then(() => (btn.disabled = false));
}

function renderModalAfterAuth(content) {
  if (typeof content === "string") {
    createModal("Ошибка авторизации", content);
  } else {
    // убираем модалку
    const modal = document.querySelector(".modal");
    mui.overlay("off", modal);

    // меняем кнопку log in
    const loginBtn = document.querySelector(".login-btn");
    loginBtn.classList.add("login-btn--green");
    loginBtn.textContent = "Log in ✔";
    login.disabled = true;

    // вставляем полученный список вопрос из firebase
    const firebaseList = document.querySelector("#firebase-list");
    firebaseList.innerHTML = Question.listToHTML(content);
  }
}
