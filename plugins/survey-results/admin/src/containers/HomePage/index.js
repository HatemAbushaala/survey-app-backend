/*
 *
 * HomePage
 *
 */

import React, { useState, useEffect, memo } from "react";
// import PropTypes from 'prop-types';
import pluginId from "../../pluginId";
import { request, ContainerFluid, List, ListTitle } from "strapi-helper-plugin";

const HomePage = () => {
  const [results, setResults] = useState([]);

  const fetchResults = async () => {
    try {
      const response = await request(`/survey-results`);
      setResults(response);
      // File downloaded successfully - use response.data
    } catch (error) {
      // Handle error scenario
      console.log("fail get answers", error);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <ContainerFluid>
      <h1 style={{ marginBottom: 8 }}>Survey results</h1>
      {results.map((result) => {
        return (
          <List key={result.id}>
            <ContainerFluid>
              <ListTitle>{result.question}</ListTitle>
              <ol>
                {result.answers.map((answer) => {
                  return (
                    <li key={answer.answer}>
                      {answer.answer}
                      {":  "}
                      <strong style={{ color: "#007EFF" }}>
                        {answer.count}
                      </strong>{" "}
                      answers
                    </li>
                  );
                })}
              </ol>
            </ContainerFluid>
          </List>
        );
      })}
    </ContainerFluid>
  );
};

export default memo(HomePage);
