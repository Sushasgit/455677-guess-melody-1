import React from "react";
import PropTypes from "prop-types";
import AudioPlayer from "../audio-player/audio-player.jsx";

export class GuessGenreQuestion extends React.PureComponent {
  constructor(props) {
    super(props);

    const {question} = this.props;
    const {answers} = question;

    this.state = {
      activePlayerIndex: null,
      userAnswer: new Array(answers.length).fill(false),
    };

    this._hadleChangeAnswer = this._hadleChangeAnswer.bind(this);
  }

  _hadleChangeAnswer(answerIndex) {
    const userAnswer = [...this.state.userAnswer];
    userAnswer[answerIndex] = !userAnswer[answerIndex];
    this.setState({userAnswer});
  }

  render() {
    const {question, onAnswer} = this.props;
    const {genre, answers} = question;
    const {activePlayerIndex} = this.state;

    return (
      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form
          className="game__tracks"
          onSubmit={(evt) => {
            evt.preventDefault();
            onAnswer(this.state.userAnswer);
          }}
        >
          {answers.map((it, i) => <div className="track" key={`answer-${i}`}>
            <AudioPlayer
              isPlaying={activePlayerIndex === i}
              playButtonClick={() => this.setState({
                activePlayerIndex: this.state.activePlayerIndex === i ? null : i,
              })}
              src={it.src} />
            <div className="game__answer">
              <input
                className="game__input visually-hidden"
                type="checkbox"
                name="answer"
                value={`answer-${i}`}
                id={`answer-${i}`}
                onChange={() => {
                  this. _hadleChangeAnswer(i);
                }}
              />
              <label className="game__check" htmlFor={`answer-${i}`}>
                Отметить
              </label>
            </div>
          </div>)}
          <button className="game__submit button" type="submit">Ответить</button>
        </form>
      </section>
    );
  }
}

GuessGenreQuestion.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  question: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
      genre: PropTypes.oneOf([`rock`, `jazz`, `blues`, `pop`]).isRequired,
    })).isRequired,
    genre: PropTypes.oneOf([`rock`, `jazz`, `blues`, `pop`]).isRequired,
    type: PropTypes.oneOf([`genre`, `artist`, `pop`]).isRequired,
  }).isRequired,
};


export default GuessGenreQuestion;
