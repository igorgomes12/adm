import pdfMake from "pdfmake/build/pdfmake"

export type TSystem = {
  name: string
  description: string
  id?: number | undefined
  image_url?: string | File | undefined
  stable_version?: string | undefined
}

export const generateSystemPDF = (data: TSystem[]) => {
  const docDefinition = {
    content: [
      { text: "Sistemas", style: "header" },
      {
        table: {
          headerRows: 1,
          widths: ["auto", "*", "auto", "auto"],
          body: [
            [
              { text: "Cód.", bold: true },
              { text: "Nome Software", bold: true },
              { text: "Versão", bold: true },
              { text: "Descrição", bold: true },
            ],
            ...data.map(system => [
              system.id ?? "N/A",
              system.name ?? "N/A",
              system.stable_version ?? "N/A",
              system.description ?? "N/A",
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

  pdfMake.createPdf(docDefinition).download("sistemas.pdf")
}
