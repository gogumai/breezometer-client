import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import MainComponent from '../../components/Main';
import { fetchData } from './actions';

function Main({ appData, fetchData }) {
  return (
    <MainComponent
      appData={appData}
      fetchData={fetchData}
    />
  );
}
Main.propTypes = {
  fetchData: PropTypes.func.isRequired,
  appData: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
      location: PropTypes.string.isRequired,
      aq: PropTypes.number.isRequired,
    })).isRequired,
    error: PropTypes.bool.isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    appData: state.main,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchData: () => dispatch(fetchData()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
