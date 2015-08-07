import superMap from 'can-connect/can/super-map/';
import baseUrl from './base-url';

export const connection = superMap({
  url: baseUrl + '/api/restaurants',
  idProp: '_id',
  name: 'restaurants'
});

export default connection.Map;
