import React from 'react';
import renderer from 'react-test-renderer';

import AudioPlayer from "./audio-player.jsx";

const mock = {
  src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`,
  genre: `rock`,
};

it(`AudioPlayer correctly render`, () => {
  const createNodeMock = (element) => {
    if (element.type === `audio`) {
      return {
        source: ``
      };
    }
    return null;
  };
  const tree = renderer.create(<AudioPlayer
    playButtonClick={jest.fn()}
    onAnswer={jest.fn()}
    src={mock.src}
    isPlaying={false}
  />, {createNodeMock}).toJSON();

  expect(tree).toMatchSnapshot();
});
