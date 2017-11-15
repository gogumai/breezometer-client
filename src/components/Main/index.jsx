import React from 'react';

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
      </div>
    );
  }
}