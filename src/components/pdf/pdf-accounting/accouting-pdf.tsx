import pdfMake from "pdfmake/build/pdfmake"
import pdfFonts from "pdfmake/build/vfs_fonts"

if (pdfFonts.pdfMake) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs
} else {
  console.error("Erro ao configurar as fontes para o PDFMake.")
}

type TAccount = {
  id: number
  name: string
  email: string
  phone: string
  contact: string
  crc: string
  cnpj: string
}

export const generatePDF = (data: TAccount[]) => {
  const docDefinition = {
    content: [
      { text: "Contabilidades", style: "header" },
      {
        table: {
          headerRows: 1,
          widths: ["auto", "*", "auto", "auto", "auto"],
          body: [
            ["Cód.", "Nome Contabilidade", "CNPJ", "CRC", "Telefone"].map(
              header => ({ text: header, bold: true })
            ),
            ...data.map(account => [
              account.id,
              account.name,
              account.cnpj,
              account.crc,
              account.phone,
            ]),
          ],
        },
        layout: {
          fillColor: (rowIndex: number) => (rowIndex === 0 ? "#CCCCCC" : null),
        },
      },
    ],
    styles: {
      header: {
        fontSize: 24,
        bold: true,
      },
      tableHeader: {
        bold: true,
        fontSize: 12,
        color: "black",
      },
    },
    defaultStyle: {
      fontSize: 10,
    },
  }

  pdfMake.createPdf(docDefinition).download("contabilidades.pdf")
}
