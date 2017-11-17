import React from 'react';
import PropTypes from 'prop-types';

export default function ErrorDisplay({ data, colorize, asListItem }) {
  const text = `Location: ${data.location} - Air quality: ${data.aq}`;
  if (asListItem) {
    return <li>{text}</li>;
  }
  return (
    <div>
      <p style={{ color: colorize ? data.color : '' }}>
        {text}
      </p>
    </div>
  );
}

ErrorDisplay.propTypes = {
  asListItem: PropTypes.bool,
  colorize: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.shape({
    location: PropTypes.string.isRequired,
    aq: PropTypes.number.isRequired,
    color: PropTypes.string,
  })).isRequired,
};

ErrorDisplay.defaultProps = {
  asListItem: false,
  colorize: false,
};
