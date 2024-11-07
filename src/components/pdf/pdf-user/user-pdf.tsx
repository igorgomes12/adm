import pdfMake from "pdfmake/build/pdfmake"

// Mapeamento de ID para Nome de Perfil
const profileNames: Record<number, string> = {
  1: "Administrador",
  2: "Financeiro",
  3: "Representante",
  4: "Supervisor de Representantes",
  5: "Programação",
  6: "Supervisor de Programação",
  7: "Suporte",
  8: "Supervisor de Suporte",
}

export type TUser = {
  id: number
  name: string
  profile: number
  email: string
}

export const generateUserPDF = (data: TUser[]) => {
  const docDefinition = {
    content: [
      { text: "Usuários", style: "header" },
      {
        table: {
          headerRows: 1,
          widths: ["auto", "*", "auto", "auto"],
          body: [
            [
              { text: "Cód.", bold: true },
              { text: "Nome", bold: true },
              { text: "Perfil", bold: true },
              { text: "Email", bold: true },
            ],
            ...data.map(user => [
              user.id ?? "N/A",
              user.name ?? "N/A",
              profileNames[user.profile] ?? "N/A",
              user.email ?? "N/A",
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

  pdfMake.createPdf(docDefinition).download("usuarios.pdf")
}
