import React from 'react';
import renderer from 'react-test-renderer';

import GuessArtistQuestion from './guess-artist-question.jsx';

const mock = {
  question: {
    type: `artist`,
    song: {
      artist: `Jim Beam`,
      src: `path.mp3`,
    },
    answers: [
      {
        picture: `path.jpg`,
        artist: `John Snow`,
      },
      {
        picture: `path.jpg`,
        artist: `Jack Daniels`,
      },
      {
        picture: `path.jpg`,
        artist: `Jim Beam`,
      },
    ],
  },
};

it(`ArtistQuestionScreen is rendered correctly`, () => {
  const createNodeMock = (element) => {
    if (element.type === `audio`) {
      return {
        source: ``
      };
    }
    return null;
  };
  const {question} = mock;
  const tree = renderer.create(<GuessArtistQuestion
    onAnswer={jest.fn()}
    question={question}
  />, {createNodeMock}).toJSON();

  expect(tree).toMatchSnapshot();
});
