/* global moment:false */

import {
  config
} from './index.config';
import {
  routerConfig
} from './index.route';
import {
  runBlock
} from './index.run';

import {
  MainController
} from './main/main.controller';
import {
  SpotController
} from './spot/spot.controller';
import {
  CountyController
} from './county/county.controller';

import {
  ForecastService
} from '../app/components/forecast/forecast.service';
import {
  NavbarDirective
} from '../app/components/navbar/navbar.directive';

angular.module('surfcast', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ui.router', 'ui.bootstrap', 'toastr', 'ui.grid', 'ui.grid.pagination', 'ui.grid.autoResize', 'ui.grid.selection', 'ui.grid.grouping', 'ui.grid.exporter', 'base64', 'pdf'])
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .service('forecastService', ForecastService)

  .controller('MainController', MainController)
  .controller('CountyController', CountyController)
  .controller('SpotController', SpotController)

  .directive('acmeNavbar', NavbarDirective)
