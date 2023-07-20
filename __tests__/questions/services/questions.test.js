const {
  groupAnswersByQuestion,
} = require("../../../api/questions/services/questions");

describe("groupAnswersByQuestion", () => {
  it("should group answers by question ID", () => {
    const input = [
      {
        question_id: 2,
        answer: "fullstack developer",
        question: "What's your role",
        count: 2,
      },
      {
        question_id: 3,
        answer: "2-5 Years",
        question: "How much experience do you have",
        count: 1,
      },
      {
        question_id: 3,
        answer: "1-2 Years",
        question: "How much experience do you have",
        count: 1,
      },
      {
        question_id: 1,
        answer: "c#",
        question: "What's your favorite programming language",
        count: 1,
      },
      {
        question_id: 1,
        answer: "javascript",
        question: "What's your favorite programming language",
        count: 1,
      },
    ];

    const expectedOutput = [
      {
        question: "What's your role",
        id: 2,
        answers: [
          {
            count: 2,
            answer: "fullstack developer",
          },
        ],
      },
      {
        question: "How much experience do you have",
        id: 3,
        answers: [
          {
            count: 1,
            answer: "2-5 Years",
          },
          {
            count: 1,
            answer: "1-2 Years",
          },
        ],
      },
      {
        question: "What's your favorite programming language",
        id: 1,
        answers: [
          {
            count: 1,
            answer: "c#",
          },
          {
            count: 1,
            answer: "javascript",
          },
        ],
      },
    ];

    const result = groupAnswersByQuestion(input);

    expect(result).toEqual(expect.arrayContaining(expectedOutput));
  });
});
