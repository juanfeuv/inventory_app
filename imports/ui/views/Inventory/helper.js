import 'pdfmake/build/vfs_fonts.js';
import pdfMake from 'pdfmake/build/pdfmake.js';

import floatFormat from '../../utils/floatFormat';

export const generatePdfContent = ({
  orgName, list
}) => {
  const items = list.map(({ item, quantity, price }) => [item, quantity, `$${floatFormat(price)}`]);

  return {
    content: [
      { text: `Inventory: ${orgName}`, style: 'header' },
      {
        layout: 'lightHorizontalLines', // optional
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: ['*', 'auto', 100],

          body: [
            [{ text: 'Item', bold: true }, { text: 'Quantity', bold: true }, { text: 'Price', bold: true }],
            ...items,
          ]
        }
      }
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10]
      },
    },
  };
};

export const downloadPdf = ({ docDefinition, nit }) => {
  pdfMake.createPdf(docDefinition).download(`inventory_${nit}.pdf`);
};
