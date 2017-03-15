export function routerConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'vm',
      resolve: {
        workOrders: ['$stateParams', 'cloudantService', ($stateParams, cloudantService) => {
          let query = {
            "selector": {
              "type": "workOrder"
            }
          }
          return cloudantService._search(query)
        }]
      }
    })
    .state('detail', {
      url: '/detail',
      templateUrl: 'app/detail/detail.html',
      controller: 'DetailController',
      controllerAs: 'vm'
    });

  $urlRouterProvider.otherwise('/');
}
