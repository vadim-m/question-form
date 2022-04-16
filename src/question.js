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
        console.log(response);
      });
  }
}
