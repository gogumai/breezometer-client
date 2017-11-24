import React from 'react';
import { shallow, mount } from 'enzyme';
import Main from '../index';

const appData = { data: [], isFetching: false, error: '' };
const appDataFetching = { data: [], isFetching: true, error: '' };
const location = { location: 'France', aq: 20, color: '#ff0000' };

const fetchData = (withError = false) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (withError) {
      reject('Something went wrong :(');
    }
    resolve(location);
  }, 100);
});

it('button is disabled when input has no text', () => {
  const wrapper = shallow(<Main appData={appData} />);
  expect(wrapper.find('Search').props().disabled).toBe(true);
});

it('button is enabled when input has text', () => {
  const wrapper = shallow(<Main appData={appData} />);
  const value = 'France';
  wrapper.find('Input').simulate('change', { target: { value } });
  expect(wrapper.state('inputValue')).toBe(value);
  expect(wrapper.find('Input').props().value).toBe(value);
  expect(wrapper.find('Search').props().disabled).toBe(false);
});

it('when user performs a search the app shows the expected behavior', () => {
  expect.assertions(2);
  return fetchData().then((location) => {
    const wrapper = mount(<Main appData={appData} fetchData={jest.fn} />);

    // triggers componentWillReceiveProps
    wrapper.setProps({ appData: { ...appData, data: [location] } });

    // Check that LocationDisplay's data prop matches with the parent component prop 'data[0]'
    expect(wrapper.find('LocationDisplay').at(0).props().data)
      .toEqual(wrapper.props().appData.data[0]);
    expect(wrapper.find('LocationDisplay').at(0).props().data)
      .toEqual(location);
  });
});

it('while fetching data, show loader', () => {
  const wrapper = mount(<Main appData={appDataFetching} fetchData={jest.fn} />);
  expect(wrapper.find('Loader').exists()).toEqual(true);
});

it('search produced error', () => {
  expect.assertions(1);
  return fetchData(true).catch((error) => {
    const wrapper = mount(<Main appData={appData} fetchData={jest.fn} />);

    // triggers componentWillReceiveProps
    wrapper.setProps({ appData: { ...appData, error } });

    expect(wrapper.find('ErrorMessage').at(0).props().message)
      .toEqual(wrapper.props().appData.error);
  });
});
