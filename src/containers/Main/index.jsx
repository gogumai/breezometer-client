import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import MainComponent from '../../components/Main';
import { fetchData, rehydrate } from './actions';

export class Main extends React.Component {
  componentWillMount() {
    const localStorageData = JSON.parse(localStorage.getItem('appData'));
    this.props.rehydrate(localStorageData);
  }

  componentWillReceiveProps(nextProps) {
    localStorage.setItem('appData', JSON.stringify(nextProps.appData.data.slice(0, 5)));
  }

  render() {
    const { appData, fetchData } = this.props;

    return (
      <MainComponent
        appData={appData}
        fetchData={fetchData}
      />
    );
  }
}

Main.propTypes = {
  fetchData: PropTypes.func.isRequired,
  appData: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
      location: PropTypes.string.isRequired,
      aq: PropTypes.number.isRequired,
    })).isRequired,
    error: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  appData: state.main,
});

const mapDispatchToProps = dispatch => ({
  fetchData: coordinates => dispatch(fetchData(coordinates)),
  rehydrate: appData => dispatch(rehydrate(appData)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
