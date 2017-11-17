import React from 'react';
import PropTypes from 'prop-types';
import LocationDisplay from '../LocationDisplay';

export default function LocationList(props) {
  const { data } = props;
  const listItems = data.slice(0, 5).map(item => <LocationDisplay data={item} asListItem />);
  return (
    <ul>{listItems}</ul>
  );
}
LocationList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    location: PropTypes.string.isRequired,
    aq: PropTypes.number.isRequired,
  })).isRequired,
};
