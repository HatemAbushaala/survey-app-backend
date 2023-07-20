"use strict";

const preloaded_questions = require("../../preloaded_questions");

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#bootstrap
 */

module.exports = async () => {
  const questions_count = await strapi.query("questions").count();
  // if no questions available then we need to load default questions
  if (questions_count === 0) {
    const create_questions_promises = preloaded_questions.map((q) => {
      return strapi.query("questions").create(q);
    });
    await Promise.all(create_questions_promises);
    console.log("questions loaded successfully");
  }
};
