import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import WelcomeScreen from './welcome-screen.jsx';

Enzyme.configure({adapter: new Adapter()});

it(`should call the callback method on click`, () => {
  const clickHandler = jest.fn();
  const app = shallow(<WelcomeScreen
    onClick={clickHandler}
  />
  );
  clickHandler();
  const startButton = app.find(`button`);
  startButton.simulate(`click`, {preventDefault() {}});
  expect(clickHandler).toHaveBeenCalled();
});
