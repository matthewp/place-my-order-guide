// src/models/city.js
import superMap from 'can-connect/can/super-map/';
import baseUrl from './base-url';

export const connection = superMap({
  url: baseUrl + '/api/cities',
  idProp: 'name',
  name: 'states'
});

export default connection.Map;
