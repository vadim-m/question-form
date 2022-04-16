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
      .then(addToLocalStorage);
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
