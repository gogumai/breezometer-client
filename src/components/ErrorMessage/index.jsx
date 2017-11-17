import React from 'react';
import PropTypes from 'prop-types';

// -------- Inline Styles --------
const errorStyle = {
  fontSize: '15px',
  color: '#ff0000',
};
// ------ End Inline Styles ------

export default function ErrorMessage({ isGeocodingError, message }) {
  return (
    <div>
      <p
        style={errorStyle}
      >
        {
          `Something went wrong: ${
            isGeocodingError ?
            'No location found :(' :
            message
          }`
        }
      </p>
    </div>
  );
}

ErrorMessage.propTypes = {
  isGeocodingError: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
};
