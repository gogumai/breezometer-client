import React from 'react';
import PropTypes from 'prop-types';

function LocationList(props) {
  const { data } = props;
  const listItems = data.map(item => <li key={item.location}>{`Location: ${item.location} Air quality: ${item.aq}`}</li>);
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
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert(`A name was submitted: ${this.state.value}`);
    event.preventDefault();
  }

  render() {
    const data = [
      { location: 'a', aq: 1 },
      { location: 'b', aq: 2 },
      { location: 'c', aq: 3 },
      { location: 'd', aq: 4 },
      { location: 'e', aq: 5 },
    ];

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
        <div>
          <p>Result</p>
        </div>
        <LocationList data={data} />
      </div>
    );
  }
}
