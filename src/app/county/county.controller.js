import _ from 'lodash';

export class CountyController {
  constructor($timeout, $state, $stateParams, $log, countyData, spots) {
    'ngInject';

    this.$state = $state;
    this.$log = $log;

    this.county = countyData;
    this.spots = _.sortBy(spots, 'spot_name');

    this._init();
  }

  _init() {
    this.datapoints = [
      {
        title: 'Wetsuit Recommended:',
        info: this.county.wetsuit
      },
      {
        title: 'Temperature in Fahrenheit',
        info: this.county.fahrenheit
      }
    ]
  }

  goToSpot(spot) {
    this.$state.go('spot', {id: spot['spot_id']});
  }

}
