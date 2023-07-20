"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const random = async (ctx) => {
  const guest_id = ctx.request.query.guest_id;

  const result = await strapi.connections.default.raw(
    `select id,question from questions where id not in (select question from answers where guest_id = '${guest_id}') order by  RANDOM() limit 1`
  );
  // there's no available questions
  if (!result || !result[0])
    return {
      data: null,
      available: false,
    };

  const question = await strapi
    .query("questions")
    .findOne({ id: result[0].id });

  return { data: question, available: true };
};

const results = async () => {
  // count questions answers
  const result = await strapi.connections.default.raw(
    `select questions.id question_id,answer,questions.question,count(*) count from answers join questions on questions.id = answers.question group by answerId order by count desc`
  );
  // group answers by question
  const questions = strapi.services.questions.groupAnswersByQuestion(result);
  return questions;
};
module.exports = {
  random,
  results,
};
