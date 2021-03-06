
import React from 'react';
import renderer from 'react-test-renderer';
import App from "./app.jsx";

const mock = {
  questions: [
    {
      type: `genre`,
      genre: `rock`,
      answers: [
        {
          src: `path`,
          genre: `rock`,
        },
      ],
    },
    {
      type: `artist`,
      song: {
        artist: `One`,
        src: ``,
      },
      answers: [
        {
          picture: ``,
          artist: `One`,
        },
      ],
    }
  ],
};

it(`App run correctly`, () => {
  const createNodeMock = (element) => {
    if (element.type === `audio`) {
      return {
        source: ``
      };
    }
    return null;
  };
  const {questions} = mock;
  const tree = renderer
    .create(<App
      errorCount={0}
      gameTime={0}
      questions={questions}
      onClick={jest.fn()}
    />, {createNodeMock})
    .toJSON();

  expect(tree).toMatchSnapshot();
});
