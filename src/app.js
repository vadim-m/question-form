import { isValue } from "./utils";
import "./style.css";

const form = document.querySelector("#form");
const input = form.querySelector("#question-input");
const submitBtn = form.querySelector("#submit");

form.addEventListener("submit", submitFormHandler);

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

    // Очищаем поле, убираем ненужные классы, включаем кнопку
    input.value = "";
    input.classList = "";
    submitBtn.disabled = false;
  }
}
