export class MainController {
  constructor($timeout, $scope, $state, counties) {
    'ngInject';

    this.$state = $state;

    this.counties = counties.sort();

    this._init();
  }

  _init() { }

  goToCounty(countyName) {
    this.$state.go('county', {countyName});
  }

}
