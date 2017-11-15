import React from 'react';
import PropTypes from 'prop-types';

// -------- Styles --------
const errorStyle = {
  fontSize: '15px',
  color: '#ff0000',
};
// ------ End Styles ------

function LocationList(props) {
  const { data } = props;
  const listItems = data.map(item => <li>{`Location: ${item.location} - Air quality: ${item.aq}`}</li>);
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

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '40.748392,-73.985444' };
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  }

  handleSubmit = event => {
    const coordinates = this.state.value.split(',');
    this.props.fetchData({
      latitude: coordinates[0],
      longitude: coordinates[1],
    });
    event.preventDefault();
  }

  render() {
    const { data, error } = this.props.appData;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="location">
            Location:
            <input
              id="location"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input
            type="submit"
            value="Search"
          />
        </form>
        {
          error !== '' &&
          <div>
            <p style={errorStyle}>{`Something went wrong: ${error}`}</p>
          </div>
        }
        {
          data.length > 0 &&
          <div>
            <p style={{ color: data[0].color }}>{`Last result: Location: ${data[0].location} - Air quality: ${data[0].aq}`}</p>
          </div>
        }
        <LocationList data={data} />
      </div>
    );
  }
}
