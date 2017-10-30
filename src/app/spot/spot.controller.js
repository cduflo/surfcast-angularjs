export class SpotController {
  constructor($timeout, $state, $stateParams, spotData) {
    'ngInject';

    this.spot = spotData;
    this.spotName = spotData[0]['spot_name'];

    this._init();
  }

  _init() {

  }

}
