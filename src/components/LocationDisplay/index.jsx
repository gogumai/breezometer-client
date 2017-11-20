import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function LocationDisplay({
  data,
  colorize,
  asListItem,
  lastItem,
}) {
  const text = `Location: ${data.location} - Air quality: ${data.aq}`;
  if (asListItem) {
    return (
      <ListItem lastItem={lastItem}>
        {text}
      </ListItem>
    );
  }
  return (
    <div>
      <p style={{ color: colorize ? data.color : '' }}>
        {text}
      </p>
    </div>
  );
}

LocationDisplay.propTypes = {
  asListItem: PropTypes.bool,
  colorize: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.shape({
    location: PropTypes.string.isRequired,
    aq: PropTypes.number.isRequired,
    color: PropTypes.string,
  })).isRequired,
  lastItem: PropTypes.bool,
};

LocationDisplay.defaultProps = {
  asListItem: false,
  colorize: false,
  lastItem: false,
};

const ListItem = styled.li`
  font: 200 16px/1.5 Helvetica, Verdana, sans-serif;
  border-bottom: ${props => (props.lastItem ? '0px' : '1px solid #ccc')};
  color: #000;
  display: block;
  width: 300px;
`;
