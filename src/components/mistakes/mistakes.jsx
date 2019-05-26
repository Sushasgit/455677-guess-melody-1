import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const Mistakes = ({mistakes}) => {
  return <div className="game__mistakes">
    {
      [...new Array(mistakes)].map((mistake) => {
        return (
          <div key={mistake} className="wrong" />
        );
      })
    }
  </div>;
};

Mistakes.propTypes = {
  mistakes: PropTypes.number.isRequired
};

const mapStateToProps = (state) => ({
  mistakes: state.mistakes,
});

connect(mapStateToProps)(Mistakes);

export default Mistakes;
