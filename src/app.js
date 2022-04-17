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

  const email = event.target.querySelector("#email").value;
  const password = event.target.querySelector("#password").value;
  authWithEmailAndPassword(email, password).then((token) => {
    // здесь уже получение данных по токену из backend`a
  });
}
