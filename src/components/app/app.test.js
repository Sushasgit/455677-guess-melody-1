import React from 'react';
import renderer from 'react-test-renderer';
import {App} from './app.jsx';

import game from '../../mocks/game.js';

it(`App correctly renders first screen`, () => {
  const {questions} = game;
  const tree = renderer.create(<App
    mistakes={0}
    maxMistakes={Infinity}
    gameTime={100}
    questions={questions}
    step={-1}
    onUserAnswer={jest.fn()}
    onWelcomeScreenClick={jest.fn()}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`App correctly renders genre question screen`, () => {
  const {questions} = game;
  const tree = renderer.create(<App
    mistakes={0}
    maxMistakes={Infinity}
    gameTime={100}
    questions={questions}
    step={1}
    onUserAnswer={jest.fn()}
    onWelcomeScreenClick={jest.fn()}
  />, {
    createNodeMock: () => {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`App correctly renders artist question screen`, () => {
  const {questions} = game;
  const tree = renderer.create(<App
    mistakes={0}
    maxMistakes={Infinity}
    gameTime={100}
    questions={questions}
    step={2}
    onUserAnswer={jest.fn()}
    onWelcomeScreenClick={jest.fn()}
  />, {
    createNodeMock: () => {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
