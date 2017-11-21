import React from 'react';
import { shallow } from 'enzyme';
import Main from './index';

const appData = { data: [], isFetching: false, error: '' };

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
