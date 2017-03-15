export class PDFService {
  constructor($q, imageService, $timeout) {
    'ngInject';

    imageService.convertImgToDataURLviaCanvas('assets/images/alert.png', (x) => {
      this.image = x;
    });

    this.$q = $q;
    this.$timeout = $timeout;
  }

  createPDF(doc) {
    return this.$q((resolve, reject) => {
      this.$timeout(() => {
        var dd = this.createDocumentDefinition(doc, this.image);
        var pdf = pdfMake.createPdf(dd);

        pdf.getBase64((output) => {
          resolve(this.base64ToUint8Array(output));
        });
      }, 250)

    });
  }

  base64ToUint8Array(base64) {
    var raw = atob(base64);
    var uint8Array = new Uint8Array(raw.length);
    for (var i = 0; i < raw.length; i++) {
      uint8Array[i] = raw.charCodeAt(i);
    }
    return uint8Array;
  }

  createDocumentDefinition(invoice, img) {
    var items = invoice.Items.map(function(item) {
      return [item.Description, item.Quantity, item.Price];
    });
    var dd = {
      content: [{
          image: img,
          width: 150,
          style: 'header',
          alignment: 'left'
        },
        {
          text: 'INVOICE',
          style: 'header'
        },
        {
          text: invoice.Date,
          alignment: 'right'
        },

        {
          text: 'From',
          style: 'subheader'
        },
        invoice.AddressFrom.Name,
        invoice.AddressFrom.Address,
        invoice.AddressFrom.Country,

        {
          text: 'To',
          style: 'subheader'
        },
        invoice.AddressTo.Name,
        invoice.AddressTo.Address,
        invoice.AddressTo.Country,

        {
          text: 'Items',
          style: 'subheader'
        },
        {
          style: 'itemsTable',
          table: {
            widths: ['*', 75, 75],
            body: [
              [{
                  text: 'Description',
                  style: 'itemsTableHeader'
                },
                {
                  text: 'Quantity',
                  style: 'itemsTableHeader'
                },
                {
                  text: 'Price',
                  style: 'itemsTableHeader'
                },
              ]
            ].concat(items)
          }
        },
        {
          style: 'totalsTable',
          table: {
            widths: ['*', 75, 75],
            body: [
              [
                '',
                'Subtotal',
                invoice.Subtotal,
              ],
              [
                '',
                'Shipping',
                invoice.Shipping,
              ],
              [
                '',
                'Total',
                invoice.Total,
              ]
            ]
          },
          layout: 'noBorders'
        },
      ],
      styles: {
        header: {
          fontSize: 20,
          bold: true,
          margin: [0, 0, 0, 10],
          alignment: 'right'
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 20, 0, 5]
        },
        itemsTable: {
          margin: [0, 5, 0, 15]
        },
        itemsTableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        },
        totalsTable: {
          bold: true,
          margin: [0, 30, 0, 0]
        }
      },
      defaultStyle: {}
    }

    return dd;
  }

  createSampleInvoice() {
    this.setDefaultsForPdfViewer();
    var invoice = this.getDummyData();

    return this.createPDF(invoice)
      .then((pdf) => {
        var blob = new Blob([pdf], {
          type: 'application/pdf'
        });
        this.pdfUrl = URL.createObjectURL(blob);

        return this.pdfUrl;
      });
  }

  getDummyData() {
    return {
      Date: new Date().toLocaleDateString("en-IE", {
        year: "numeric",
        month: "long",
        day: "numeric"
      }),
      AddressFrom: {
        Name: chance.name(),
        Address: chance.address(),
        Country: chance.country({
          full: true
        })
      },
      AddressTo: {
        Name: chance.name(),
        Address: chance.address(),
        Country: chance.country({
          full: true
        })
      },
      Items: [{
          Description: 'iPhone 6S',
          Quantity: '1',
          Price: '€700'
        },
        {
          Description: 'Samsung Galaxy S6',
          Quantity: '2',
          Price: '€655'
        }
      ],
      Subtotal: '€2010',
      Shipping: '€6',
      Total: '€2016'
    };
  }

  setDefaultsForPdfViewer() {
    // this.$scope.scroll = 0;
    // this.$scope.loading = 'loading';
    //
    // this.$scope.onError = function(error) {
    //   console.error(error);
    // };
    //
    // this.$scope.onLoad = function() {
    //   this.$scope.loading = '';
    // };
    //
    // this.$scope.onProgress = function(progress) {
    //   console.log(progress);
    // };
  }
}
