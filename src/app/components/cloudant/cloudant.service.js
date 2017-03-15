export class CloudantService {
  constructor($http, $base64) {
    'ngInject';

    this.$http = $http;

    this.apiUrl = 'https://alert-disaster.cloudant.com/alert_disaster';
    this.apiUser = 'postudethectioureculacho';
    this.apiPW = 'e94b9f7f17250d5456f03d85cb139399de336891';

    var auth = $base64.encode(`${this.apiUser}:${this.apiPW}`);
    $http.defaults.headers.common['Authorization'] = `Basic ${auth}`;

  }

  _getAllDocs() {
    const url = this.apiUrl;
    return this.$http({
      method: 'GET',
      url: url + '/_all_docs?include_docs=true'
    }).then(result => {
      return result.data.docs;
    }).catch(err => {
      return err;
    });
  }

  _search(query) {
    const url = this.apiUrl;
    return this.$http({
      method: 'POST',
      url: url + '/_find',
      data: query
    }).then(result => {
      return result.data.docs;
    }).catch(err => {
      return err;
    });
  }
}
