import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

// -------- Inline Styles --------
const errorStyle = {
  fontSize: '15px',
  color: '#ff0000',
};
const isFetchingStyle = {
  height: '18px'
};
// ------ End Inline Styles ------

function LocationList(props) {
  const { data } = props;
  const listItems = data.slice(0,5).map(item =>
    <li>{`Location: ${item.location} - Air quality: ${item.aq}`}</li>
  );
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

function Loader() {
  return (
    <div className="spinner">
      <div className="bounce1"></div>
      <div className="bounce2"></div>
      <div className="bounce3"></div>
    </div>
  );
}

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
        {
          isFetching
          ? <Loader />
          : <div style={isFetchingStyle}></div>
        }
        {
          (error !== '' || this.state.isGeocodingError) &&
          <div>
            <p
              style={errorStyle}
            >
              {
                `Something went wrong: ${
                  this.state.isGeocodingError ?
                  'No location found :(' :
                  error
                }`
              }
            </p>
          </div>
        }
        {
          data.length > 0 &&
          <div>
            <p
              style={{ color: data[0].color }}
            >
              {`Last result: Location: ${data[0].location} - Air quality: ${data[0].aq}`}
            </p>
          </div>
        }
        <LocationList data={data} />
      </div>
    );
  }
}
