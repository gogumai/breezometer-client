import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import LocationList from '../LocationList';
import Loader from '../Loader';
import ErrorMessage from '../ErrorMessage';
import LocationDisplay from '../LocationDisplay';

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
      { address },
      (results, status) => {
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
      }
    );
  }

  render() {
    const { data, error, isFetching } = this.props.appData;
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Input
            id="location"
            placeholder={'Enter a location...'}
            value={this.state.inputValue}
            onChange={this.handleChange}
            autoComplete={'off'}
          />
          <Search
            type="submit"
            value="SEARCH"
            disabled={this.state.inputValue === ''}
          />
          { isFetching && <Loader /> }
        </Form>
        <DisplayData>
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
        </DisplayData>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 10px;
`;
Container.displayName = 'Container';

const DisplayData = styled.div`
  margin: 0.5em;
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: white;
`;
DisplayData.displayName = 'DisplayData';

const WhiteSpace = styled.div`
  width: 30px;
`;
WhiteSpace.displayName = 'WhiteSpace';

const Form = styled.form`
  display: flex;
  align-items: center;
`;
Form.displayName = 'Form';

const Input = styled.input`
	padding: 0.5em;
	margin: 0.5em;
  font-size: 16px;
	color: palevioletred;
  border-style: solid;
  border-width: 1px;
  border-color: #bebebe;
	border-radius: 3px;
  outline: none;
`;
Input.displayName = 'Input';

const Search = styled.input`
  width: 100px;
  height: 36px;
	color: palevioletred;
  border-width: 1px;
	border-radius: 3px;
  border-color: palevioletred;
  outline: none;
`;
Search.displayName = 'Search';
