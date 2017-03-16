export class PDFService {
  constructor($q, imageService, $timeout) {
    'ngInject';

    imageService.convertImgToDataURLviaCanvas('assets/images/alert.png', (x) => {
      this.image = x;
    });

    this.$q = $q;
    this.$timeout = $timeout;
  }

  createWorkOrder(wo) {
    return this.createPDF(wo)
      .then((pdf) => {
        var blob = new Blob([pdf], {
          type: 'application/pdf'
        });
        this.pdfUrl = URL.createObjectURL(blob);

        return this.pdfUrl;
      });
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

  createDocumentDefinition(wo, img) {
    console.log(wo);
    var company = {
      employee: 'David Denison',
      address1: 'P.O. Box 20729',
      address2: 'Bakersfield, CA 93390',
      phone: '1-888-888-8888',
      fax: '1-888-888-8888',
      email: 'DWatkins@AlertDisaster.com'
    };
    var date = new Date().toLocaleDateString("en-IE", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    var total = 0;
    var items = wo.serviceItems.map(function(item) {
      total += item.total;
      return [item.name, item.notes || '', `$${item.total}`];
    });


    var dd = {
      content: [{
          columns: [{
            // auto-sized columns have their widths based on their content
            width: 'auto',
            image: img,
            width: 150,
            style: 'header',
            alignment: 'left'
          }],
          // optional space between columns
          columnGap: 10
        }, {
          text: company.address1,
          alignment: 'center',
          bold: true
        }, {
          text: company.address2,
          alignment: 'center',
          bold: true
        }, {
          text: `Phone: ${company.phone}`,
          alignment: 'center',
          bold: true
        }, {
          text: `Fax: ${company.fax}`,
          alignment: 'center',
          bold: true
        }, {
          text: `Email: ${company.email}`,
          alignment: 'center',
          bold: true,
          margin: [0, 0, 0, 10]
        }, {
          text: 'Work Order',
          alignment: 'center',
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        }, {
          text: [{
            text: 'Printed On: ',
            bold: true
          }, {
            text: date
          }],
          margin: [0, 0, 0, 10]
        },

        {
          table: {
            widths: ['*'],
            body: [
              [{
                  columns: [{
                    // auto-sized columns have their widths based on their content
                    width: '33%',
                    text: [{
                      text: 'Work Order #: ',
                      bold: true
                    }, {
                      text: wo._id
                    }]
                  }, {
                    // fixed width
                    width: '33%',
                    text: [{
                      text: 'Job #: ',
                      bold: true
                    }, {
                      text: ''
                    }, {
                      text: '\nJob Name: ',
                      bold: true
                    }, {
                      text: wo.client.owner
                    }]
                  }, {
                    // percentage width
                    width: '33%',
                    text: [{
                      text: 'Date: ',
                      bold: true
                    }, {
                      text: date
                    }]
                  }],
                  // optional space between columns
                  columnGap: 5
                }

              ]
            ]
          },
          margin: [0, 0, 0, 10]
        },

        {
          table: {
            widths: ['*'],
            margin: [0],
            body: [
              [{
                  columns: [{
                    // auto-sized columns have their widths based on their content
                    width: '50%',
                    text: [{
                        text: 'Employee(ESTIMATOR): ',
                        bold: true
                      }, {
                        text: `${company.employee} \n`
                      },
                      {
                        text: 'Address: ',
                        bold: true
                      }, {
                        text: `${company.address1}, ${company.address2}\n`
                      },
                      {
                        text: 'Phone: ',
                        bold: true
                      }, {
                        text: `${company.phone}\n`
                      },
                      {
                        text: 'Fax: ',
                        bold: true
                      }, {
                        text: `${company.fax}\n`
                      },
                      {
                        text: 'Mobile: ',
                        bold: true
                      }, {
                        text: `${company.phone}\n`
                      },
                      {
                        text: 'Email: ',
                        bold: true
                      }, {
                        text: `${company.email}`
                      }
                    ]
                  }, {
                    // fixed width
                    width: '50%',
                    text: [{
                        text: 'Reference: ',
                        bold: true
                      }, {
                        text: `${wo.subcontractor.name}\n`
                      },
                      {
                        text: 'Address: ',
                        bold: true
                      }, {
                        text: `${wo.subcontractor.address}\n`
                      },
                      {
                        text: 'Phone: ',
                        bold: true
                      }, {
                        text: `${wo.subcontractor.phone}\n`
                      },
                      {
                        text: 'Fax: ',
                        bold: true
                      }, {
                        text: wo.subcontractor.fax
                      }
                    ]
                  }],
                  // optional space between columns
                  columnGap: 5
                }

              ]
            ]
          },
          margin: [0, 0, 0, 10]
        },

        {
          table: {
            widths: ['*'],
            margin: [0],
            body: [
              [{
                  columns: [{
                    // auto-sized columns have their widths based on their content
                    width: '50%',
                    text: [{
                        text: 'Customer Name: ',
                        bold: true
                      }, {
                        text: `${wo.client.owner}\n${wo.client.address}\n`
                      },
                      {
                        text: 'Main Phone: ',
                        bold: true
                      }, {
                        text: `${wo.client.phone}\n`
                      },
                      {
                        text: 'Email: ',
                        bold: true
                      }, {
                        text: `${wo.client.email}\n`
                      }
                    ]
                  }, {
                    // fixed width
                    width: '50%',
                    text: [{
                      text: 'Job Address: ',
                      bold: true
                    }, {
                      text: `${wo.client.owner}\n${wo.client.address}\n`
                    }]
                  }],
                  // optional space between columns
                  columnGap: 5
                }

              ]
            ]
          },
          margin: [0, 0, 0, 10]
        },

        {
          style: 'itemsTable',
          table: {
            widths: ['*', '*', 75],
            body: [
              [{
                  text: 'Description',
                  style: 'itemsTableHeader'
                },
                {
                  text: 'Notes',
                  style: 'itemsTableHeader'
                },
                {
                  text: 'Amount',
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
                'Total',
                `$${total}`,
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
          margin: [0, 10, 0, 0]
        }
      }
    }

    return dd;
  }

  createSampleInvoice() {
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

}
