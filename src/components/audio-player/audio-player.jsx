import React, {Component} from "react";
import PropTypes from "prop-types";

class AudioPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      isLoading: true,
      isPlaying: props.isPlaying,
    };
    this._audioRef = React.createRef();
    this._handlePlayPause = this._handlePlayPause.bind(this);
  }

  componentDidMount() {
    const audio = this._audioRef.current;
    // console.log(audio);
    audio.oncanplaythrough = () => this.setState({
      isLoading: false,
    });

    audio.onplay = () => this.setState({
      isPlaying: true,
    });

    audio.onpause = () => this.setState({
      isPlaying: false,
    });

    audio.ontimeupdate = () => this.setState({
      progress: audio.currentTime
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isPlaying !== this.props.isPlaying || prevState.isPlaying !== this.state.isPlaying) {
      const audio = this._audioRef.current;
      if (this.state.isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isPlaying !== this.props.isPlaying) {
      this.setState({isPlaying: nextProps.isPlaying});
    }
  }

  componentWillUnmount() {
    const audio = this._audioRef.current;

    audio.oncanplaythrough = null;
    audio.onplay = null;
    audio.onpause = null;
    audio.ontimeupdate = null;
  }

  _handlePlayPause() {
    const {playButtonClick} = this.props;

    if (playButtonClick) {
      playButtonClick();
    }

    this.setState({
      isPlaying: !this.state.isPlaying,
    });
  }

  render() {
    const {source} = this.props;
    const {isPlaying} = this.state;
    const trackBtnClass = isPlaying ? `pause` : `play`;
    return (
      <div className="game__track">
        <button
          onClick={this._handlePlayPause}
          className={`track__button track__button--${trackBtnClass}`}
          type="button" />
        <div className="track__status">
          <audio
            src={source}
            ref={this._audioRef}
          />
        </div>
      </div>
    );
  }
}

AudioPlayer.propTypes = {
  source: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool,
  playButtonClick: PropTypes.func,
};

export default AudioPlayer;
