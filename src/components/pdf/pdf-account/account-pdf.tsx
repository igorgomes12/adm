import pdfMake from "pdfmake/build/pdfmake"
import type { TAccounts } from "@/components/modules/Finance/account/dto/account.dto"

export const generateAccountPDF = (data: TAccounts[]) => {
  const docDefinition = {
    content: [
      { text: "Cadastro de Contas", style: "header" },
      {
        table: {
          headerRows: 1,
          widths: ["auto", "auto", "auto", "*"],
          body: [
            [
              { text: "Cód.", style: "tableHeader" },
              { text: "Descrição", style: "tableHeader" },
              { text: "Saldo Atual", style: "tableHeader" },
              { text: "Observação", style: "tableHeader" },
            ],
            ...data.map(acc => [
              acc.id ?? "N/A",
              acc.description ?? "N/A",
              acc.value ?? "N/A",
              { text: acc.observation ?? "N/A", alignment: "left" },
            ]),
          ],
        },
        layout: {
          fillColor: (rowIndex: number) => (rowIndex === 0 ? "#CCCCCC" : null),
          paddingTop: () => 8,
          paddingBottom: () => 8,
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
        fillColor: "#CCCCCC",
      },
    },
    defaultStyle: {
      fontSize: 10,
    },
  }

  pdfMake.createPdf(docDefinition).download("contas.pdf")
}
