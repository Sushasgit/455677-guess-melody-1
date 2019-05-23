import React from 'react';
import renderer from 'react-test-renderer';

import GuessGenreQuestion from './guess-genre-question.jsx';

const mock = {
  question: {
    type: `genre`,
    genre: `rock`,
    answers: [
      {
        src: `test.mp3`,
        genre: `rock`,
      },
      {
        src: `test.mp3`,
        genre: `blues`,
      },
      {
        src: `test.mp3`,
        genre: `jazz`,
      },
      {
        src: `test.mp3`,
        genre: `rock`,
      },
    ],
  },
};


it(`GenreQuestionScreen is rendered correctly`, () => {
  const createNodeMock = (element) => {
    if (element.type === `audio`) {
      return {
        source: ``
      };
    }
    return null;
  };
  const {question} = mock;
  const tree = renderer.create(<GuessGenreQuestion
    onAnswer={jest.fn()}
    question={question}
  />, {createNodeMock}).toJSON();

  expect(tree).toMatchSnapshot();
});
