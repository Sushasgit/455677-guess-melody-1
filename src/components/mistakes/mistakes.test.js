import React from 'react';
import renderer from 'react-test-renderer';
import Mistakes from './mistakes.jsx';

it(`WelcomeScreen run correctly`, () => {
  const tree = renderer
    .create(<Mistakes
      mistakes={0}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
