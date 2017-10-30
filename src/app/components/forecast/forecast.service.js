import _ from 'lodash';

export class ForecastService {
  constructor($http) {
    'ngInject';

    this.$http = $http;

    this.apiUrl = 'http://api.spitcast.com/api/';
  }

  _getAllCounties() {
    const url = this.apiUrl;
    return this.$http({
      method: 'GET',
      url: url + 'spot/all'
    }).then(result => {
      const counties = _.uniq(_.map(result.data, 'county_name'));
      return counties;
    }).catch(err => {
      return err;
    });
  }

  _getCountyData(countyName) {
    const formattedCountyName = countyName.toLowerCase().split(' ').join('-');
    const url = this.apiUrl;
    return this.$http({
      method: 'GET',
      url: url + `county/water-temperature/${formattedCountyName}/`
    }).then(result => {
      return result.data;
    }).catch(err => {
      return err;
    });
  }

  _getSpots(countyName) {
    const formattedCountyName = countyName.toLowerCase().split(' ').join('-');
    const url = this.apiUrl;
    return this.$http({
      method: 'GET',
      url: url + `county/spots/${formattedCountyName}/`
    }).then(result => {
      return result.data;
    }).catch(err => {
      return err;
    });
  }

  _getSpotData(spotId) {
    const url = this.apiUrl;
    return this.$http({
      method: 'GET',
      url: url + `spot/forecast/${spotId}/`
    }).then(result => {
      return result.data;
    }).catch(err => {
      return err;
    });
  }
}
