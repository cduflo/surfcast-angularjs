export class DetailController {
  constructor($timeout, $stateParams, webDevTec, toastr, pdfService) {
    'ngInject';

    this.awesomeThings = [];
    this.classAnimation = '';
    this.creationDate = 1489536166170;
    this.toastr = toastr;
    this.workOrderNum = $stateParams.id;

    this.activate(pdfService);
  }

  activate(pdfService) {
    pdfService.createSampleInvoice().then(result => {
      const iframe = document.querySelector('#iframeContainer');
      iframe.src = result;
    })
  }

  getWebDevTec(webDevTec) {
    this.awesomeThings = webDevTec.getTec();

    angular.forEach(this.awesomeThings, (awesomeThing) => {
      awesomeThing.rank = Math.random();
    });
  }

  showToastr() {
    this.toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
    this.classAnimation = '';
  }
}
