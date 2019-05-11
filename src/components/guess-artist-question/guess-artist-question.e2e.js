import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import GuessArtistQuestion from "./guess-artist-question.jsx";

configure({adapter: new Adapter()});

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
    ],
  },
};

it(`When user answers artist question form is not sent`, () => {
  const {question} = mock;
  const onAnswer = jest.fn();
  const artistQuestion = mount(<GuessArtistQuestion
    onAnswer={onAnswer}
    question={question}
  />);

  const form = artistQuestion.find(`form`);
  const formSendPrevention = jest.fn();
  form.simulate(`submit`, {
    preventDefault: formSendPrevention,
  });

  expect(onAnswer).toHaveBeenCalledTimes(1);
  expect(formSendPrevention).toHaveBeenCalledTimes(1);
});
