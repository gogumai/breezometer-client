import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Main } from './index';

import store from '../../redux/store';

const france = { location: 'France', aq: 20, color: '#ff0000' };
const eeuu = { location: 'United States', aq: 67, color: '#ff00ff' };
const uk = { location: 'United Kingdom', aq: 50, color: '#ff00ff' };
const mexico = { location: 'Mexico', aq: 20, color: '#ff00ff' };
const canada = { location: 'Canada', aq: 88, color: '#ff00ff' };
const brazil = { location: 'Brazil', aq: 74, color: '#ff00ff' };
const data = [france, eeuu, uk, mexico, brazil, canada];

const appData = { data: [], isFetching: false, error: '' };
const appDataNew = { data, isFetching: false, error: '' };

it('test localStorage', () => {
  const wrapper = mount(<Main appData={appData} fetchData={jest.fn} rehydrate={jest.fn} />);

  // triggers componentWillReceiveProps
  wrapper.setProps({ appData: { ...appDataNew } });

  const localStorageData = JSON.parse(localStorage.getItem('appData'));

  expect(wrapper.props().appData.data.slice(0, 5)).toEqual(localStorageData);
  expect(appDataNew.data.slice(0, 5)).toEqual(localStorageData);
});
