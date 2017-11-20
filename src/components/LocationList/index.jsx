import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LocationDisplay from '../LocationDisplay';

export default function LocationList(props) {
  const { data } = props;
  const listItems = data.slice(0, 5).map((item, i, arr) =>
    <LocationDisplay data={item} asListItem lastItem={i === arr.length - 1} />);
  return (
    <List>{listItems}</List>
  );
}
LocationList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    location: PropTypes.string.isRequired,
    aq: PropTypes.number.isRequired,
  })).isRequired,
};

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;
