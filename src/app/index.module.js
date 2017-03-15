/* global malarkey:false, moment:false */

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
  DetailController
} from './detail/detail.controller';

import {
  GithubContributorService
} from '../app/components/githubContributor/githubContributor.service';
import {
  WebDevTecService
} from '../app/components/webDevTec/webDevTec.service';
import {
  CloudantService
} from '../app/components/cloudant/cloudant.service';
import {
  NavbarDirective
} from '../app/components/navbar/navbar.directive';
import {
  MalarkeyDirective
} from '../app/components/malarkey/malarkey.directive';

angular.module('alertAdmin', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ui.router', 'ui.bootstrap', 'toastr', 'ui.grid', 'ui.grid.pagination', 'ui.grid.autoResize', 'ui.grid.selection', 'ui.grid.grouping', 'ui.grid.exporter', 'base64'])
  .constant('malarkey', malarkey)
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .service('githubContributor', GithubContributorService)
  .service('webDevTec', WebDevTecService)
  .service('cloudantService', CloudantService)

  .controller('MainController', MainController)
  .controller('DetailController', DetailController)

  .directive('acmeNavbar', NavbarDirective)
  .directive('acmeMalarkey', MalarkeyDirective);
