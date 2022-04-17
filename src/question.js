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

  // получаем список вопросов по токену
  static fetch(token) {
    if (!token) {
      console.log("токена нет");
      return Promise.resolve(
        "<p class='error'>Не удалось получить токен. Проверьте логин и пароль.</p>"
      );
    }

    const url = `https://questionnaire-a04ac-default-rtdb.firebaseio.com/questions.json?auth=${token}`;

    return fetch(url)
      .then((response) => response.json())
      .then((response) => {
        if (response && response.error) {
          console.log("response.error");
          return `"<p>${response.error}</p>"`;
        }

        return response
          ? Object.keys(response).map((key) => ({
              ...response[key],
              id: key,
            }))
          : [];
      });
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

  static listToHTML(questions) {
    return questions.length
      ? `<div>${questions
          .map(
            (item) => `<date class="mui--text-black-54">
              Дата вопроса: ${new Date(item.date).toLocaleDateString()}
              </date>
              <div class="mui--text-black-54">
                ${item.text}
              </div>
              <br>`
          )
          .join("")}</div>`
      : "<div>Вопросов в базе данных пока нет!</div>";
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
    <date class="mui--text-black-54">
      Дата вопроса: ${new Date(question.date).toLocaleDateString()}
    </date>
    <div class="mui--text-black-54">
      ${question.text}
    </div>
    <br>
  `;
}
