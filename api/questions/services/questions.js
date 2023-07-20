"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

function groupAnswersByQuestion(arr) {
  const result = {};
  const key = "question_id";

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (result[item[key]]) {
      result[item[key]].answers.push({
        count: item.count,
        answer: item.answer,
      });
    } else {
      result[item[key]] = {
        question: item.question,
        id: item.question_id,
        answers: [
          {
            count: item.count,
            answer: item.answer,
          },
        ],
      };
    }
  }

  return Object.values(result);
}

module.exports = { groupAnswersByQuestion };
