describe('controllers', () => {
  let vm;

  beforeEach(angular.mock.module('surfcast'));

  beforeEach(inject(($controller, $rootScope) => {
    var scope = $rootScope.$new();
    var counties = ['San Diego', 'Huntington'];
    vm = $controller('MainController', {$scope: scope, counties: counties});
  }));

  it('should have an array of counties', () => {
    expect(angular.isArray(vm.counties)).toBeTruthy();
  });

  it('should have greater than 0 counties', () => {
    expect(vm.counties.length > 0).toBeTruthy();
  });
});
