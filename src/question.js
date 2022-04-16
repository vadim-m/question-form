export class Question {
  static create(question) {
    return fetch(
      "https://questionnaire-a04ac-default-rtdb.firebaseio.com/questions.json",
      {
        method: "POST",
        body: JSON.stringify(question),
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        question.id = response.name;
        return question;
      })
      .then(addToLocalStorage)
      .then(Question.renderList);
  }

  static renderList() {
    const questions = getQuestonsFromLocaleStorage();

    const htmlTemplate = questions.length
      ? questions.map(toCard).join("")
      : `<div class="mui--text-headline">
    В вашем localStorage вопросов пока нет.
    </div>`;
    const list = document.querySelector("#list");

    list.innerHTML = htmlTemplate;
  }
}

function addToLocalStorage(question) {
  const allQuestions = getQuestonsFromLocaleStorage();
  allQuestions.push(question);
  localStorage.setItem("questions", JSON.stringify(allQuestions));
}

function getQuestonsFromLocaleStorage() {
  return JSON.parse(localStorage.getItem("questions") || "[]");
}

function toCard(question) {
  return `
    <div class="mui--text-black-54">
      Дата вопроса: ${new Date(question.date).toLocaleDateString()}
    </div>
    <div class="mui--text-black-54">
      ${question.text}
    </div>
    <br>
  `;
}
