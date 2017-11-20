import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function ErrorMessage({ isGeocodingError, message }) {
  return (
    <Error>
      {
        `Something went wrong: ${
          isGeocodingError ?
          'No location found :(' :
          message
        }`
      }
    </Error>
  );
}

const Error = styled.p`
  color: red;
`;

ErrorMessage.propTypes = {
  isGeocodingError: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
};
