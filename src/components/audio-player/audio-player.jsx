import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";

export default class AudioPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._audioRef = createRef();

    this.state = {
      isLoading: true,
      isPlaying: props.isPlaying,
    };

    this._playButtonClick = this._playButtonClick.bind(this);
  }

  componentDidMount() {
    const {src} = this.props;
    const audio = this._audioRef.current;

    audio.src = src;

    audio.oncanplaythrough = () => this.setState({
      isLoading: false,
    });

    audio.onplay = () => {
      this.setState({
        isPlaying: true,
      });
    };

    audio.onpause = () => this.setState({
      isPlaying: false,
    });

    audio.ontimeupdate = () => this.setState({
      progress: audio.currentTime
    });
  }

  componentDidUpdate() {
    const audio = this._audioRef.current;

    if (this.props.isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  componentWillUnmount() {
    const audio = this._audioRef.current;

    audio.oncanplaythrough = null;
    audio.onplay = null;
    audio.onpause = null;
    audio.ontimeupdate = null;
    audio.src = ``;
  }

  _playButtonClick() {
    const {playButtonClick} = this.props;
    if (playButtonClick) {
      this.props.playButtonClick();
    }
    this.setState({isPlaying: !this.state.isPlaying});
  }

  render() {
    const {isPlaying} = this.state;
    const trackBtnClass = isPlaying ? `pause` : `play`;
    return (
      <React.Fragment>
        <button
          className={`track__button track__button--${trackBtnClass}`}
          type="button"
          onClick={this._playButtonClick}
        />
        <div className="track__status">
          <audio
            ref={this._audioRef}
          />
        </div>
      </React.Fragment>
    );
  }
}

AudioPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  playButtonClick: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
};
