export class MainController {
  constructor($timeout, webDevTec, toastr, $scope, $state, workOrders) {
    'ngInject';

    this.awesomeThings = [];
    this.classAnimation = '';
    this.creationDate = 1489536166170;
    this.toastr = toastr;
    this.workOrders = workOrders;

    this.columns = [{
      field: '_id',
      displayName: 'Work Order ID'
    }, {
      field: 'subcontractor.name',
      displayName: 'Subcontractor'
    }, {
      field: 'subcontractor.phone',
      displayName: 'Phone'
    }, {
      field: 'subcontractor.email',
      displayName: 'Email'
    }, {
      field: 'status'
    }];

    this.gridOptions = {
      paginationPageSizes: [20, 50, 100],
      paginationPageSize: 20,
      multiSelect: false,
      enableHiding: false,
      enableRowSelection: true,
      enableSorting: false,
      enableRowHeaderSelection: false,
      modifierKeysToMultiSelect: false,
      noUnselect: true,
      columnDefs: this.columns,
      data: workOrders,
      onRegisterApi: function(gridApi) {
        $scope.gridApi = gridApi;
        gridApi.selection.on.rowSelectionChanged($scope, (row) => {
          // this.goToVoter(row.entity);
          $state.go('detail', {
            id: row.entity._id
          })
          console.log(row.entity);
        });
      }
    };

    this.activate();
  }

  activate() {
    this.upperStatus();
  }

  upperStatus() {
    this.workOrders.forEach(wo => {
      wo.status = wo.status.charAt(0).toUpperCase() + wo.status.slice(1);
    })
  }

  showToastr() {
    this.toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
    this.classAnimation = '';
  }
}
