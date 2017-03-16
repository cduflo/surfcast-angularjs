export class DetailController {
  constructor($timeout, $state, $stateParams, webDevTec, toastr, pdfService, workOrder, cloudantService) {
    'ngInject';

    this.awesomeThings = [];
    this.classAnimation = '';
    this.creationDate = 1489536166170;
    this.toastr = toastr;
    this.$state = $state;
    this.cloudantService = cloudantService;
    this.workOrderNum = $stateParams.id;
    this.workOrder = workOrder;
    console.log(workOrder);

    this.activate(pdfService);
  }

  activate(pdfService) {
    pdfService.createWorkOrder(this.workOrder).then(result => {
      const iframe = document.querySelector('#iframeContainer');
      iframe.src = result;
    })
  }

  updateWO(status) {
    this.workOrder.status = status;
    this.cloudantService._put(this.workOrderNum, this.workOrder)
      .then(result => {
        this.$state.reload();
      })
      .catch(err => {
        console.log(err);
      })
    this.showToastr();
  }

  showToastr() {
    this.toastr.info('Work Order Status Updated');
    this.classAnimation = '';
  }
}
