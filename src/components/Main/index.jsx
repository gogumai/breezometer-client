import React from 'react';
import PropTypes from 'prop-types';

import LocationList from '../LocationList';
import Loader from '../Loader';
import ErrorMessage from '../ErrorMessage';
import LocationDisplay from '../LocationDisplay';

// -------- Inline Styles --------
const isFetchingStyle = {
  height: '18px'
};
// ------ End Inline Styles ------

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      isGeocodingError: false,
    };
  }

  componentDidMount() {
    this.geocoder = new window.google.maps.Geocoder();
  }

  handleChange = event => {
    this.setState({ inputValue: event.target.value });
  }

  handleSubmit = event => {
    this.geocodeAddress(this.state.inputValue);
    event.preventDefault();
  }

  geocodeAddress = (address) => {
    this.geocoder.geocode(
      { 'address': address },
      function handleResults(results, status) {
        if (status === window.google.maps.GeocoderStatus.OK) {
          const location = {
            latitude: results[0].geometry.location.lat(),
            longitude: results[0].geometry.location.lng(),
          }
          this.setState({
            isGeocodingError: false
          });
          this.props.fetchData(location);
          return;
        }
        this.setState({
          isGeocodingError: true
        });
      }.bind(this)
    );
  }

  render() {
    const { data, error, isFetching } = this.props.appData;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="location">
            Location:
            <input
              id="location"
              value={this.state.inputValue}
              onChange={this.handleChange}
            />
          </label>
          <input
            type="submit"
            value="Search"
          />
        </form>
        { isFetching ? <Loader /> : <div style={isFetchingStyle}></div> }
        {
          (error !== '' || this.state.isGeocodingError) &&
          <ErrorMessage
            isGeocodingError={this.state.isGeocodingError}
            message={error}
          />
        }
        {
          data.length > 0 &&
          <LocationDisplay
            data={data[0]}
            colorize
          />
        }
        <LocationList data={data} />
      </div>
    );
  }
}
