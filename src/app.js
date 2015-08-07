import AppMap from "can-ssr/app-map";
import route from 'can/route/';
import 'can/route/pushstate/';
import platform from 'steal-platform';

if(platform.isCordova || platform.isNW) {
  route.defaultBinding = 'hashchange';
}

can.baseURL = "/";

const AppState = AppMap.extend({});

export default AppState;

route(':page', { page: 'home' });
route(':page/:slug', { slug: null });
route(':page/:slug/:action', { slug: null, action: null });

export default AppState;
