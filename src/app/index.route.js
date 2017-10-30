export function routerConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'vm',
      resolve: {
        counties: ['$stateParams', 'forecastService', ($stateParams, forecastService) => {
          return forecastService._getAllCounties();
        }]
      }
    })
    .state('county', {
      url: '/county/:countyName',
      templateUrl: 'app/county/county.html',
      controller: 'CountyController',
      controllerAs: 'vm',
      resolve: {
        countyData: ['$stateParams', 'forecastService', ($stateParams, forecastService) => {
          return forecastService._getCountyData($stateParams.countyName);
        }],
        spots: ['$stateParams', 'forecastService', ($stateParams, forecastService) => {
          return forecastService._getSpots($stateParams.countyName);
        }]
      }
    })
    .state('spot', {
      url: '/spot/:id',
      templateUrl: 'app/spot/spot.html',
      controller: 'SpotController',
      controllerAs: 'vm',
      resolve: {
        spotData: ['$stateParams', 'forecastService', ($stateParams, forecastService) => {
          return forecastService._getSpotData($stateParams.id);
        }]
      }
    });

  $urlRouterProvider.otherwise('/');
}
