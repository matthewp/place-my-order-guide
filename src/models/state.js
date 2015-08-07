// src/models/state.js
import superMap from 'can-connect/can/super-map/';
import baseUrl from './base-url';

export const connection = superMap({
  url: baseUrl + '/api/states',
  idProp: 'short',
  name: 'states'
});

export default connection.Map;
