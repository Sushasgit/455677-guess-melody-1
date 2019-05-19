import * as React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";

import AudioPlayer from "./audio-player.jsx";

Enzyme.configure({adapter: new Adapter()});

const mocks = {
  isPlaying: false,
  playButtonClick: jest.fn(),
  src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`,
};

global.window.HTMLMediaElement.prototype.pause = () => {};
global.window.HTMLMediaElement.prototype.play = () => {};

it(`Click on play-button`, () => {
  const player = mount(<AudioPlayer playButtonClick={jest.fn()} {...mocks} />);
  const PlayerButton = player.find(`.track__button`);
  PlayerButton.simulate(`click`);
  player.update();

  expect(player.state(`isPlaying`)).toEqual(true);
});

it(`Click on pause-button`, () => {
  const player = mount(<AudioPlayer playButtonClick={jest.fn()} {...mocks} />);
  const PlayerButton = player.find(`.track__button`);
  player.setState({
    isPlaying: true
  });
  player.update();
  PlayerButton.simulate(`click`);
  player.update();

  expect(player.state(`isPlaying`)).toEqual(false);
});

