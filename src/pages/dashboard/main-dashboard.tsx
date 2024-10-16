import { FaArrowDown, FaArrowUp } from 'react-icons/fa'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

const data = [
  {
    label: 'Valor de entrada',
    value: 15000,
    icon: <FaArrowUp color="green" />,
  },
  { label: 'Valor de saída', value: 8000, icon: <FaArrowDown color="red" /> },
  { label: 'Gastos Mensais', value: 5000, icon: <FaArrowDown color="red" /> },
  {
    label: 'Gastos Semestrais',
    value: 30000,
    icon: <FaArrowDown color="red" />,
  },
]

export function MainDashboard() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-white bg-opacity-20 backdrop-blur-sm p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-between bg-white bg-opacity-20 backdrop-blur-sm border border-gray-200 rounded-2xl p-4 shadow-lg"
          >
            <h2 className="text-lg text-gray-800 font-semibold">
              {item.label}
            </h2>
            <div className="flex items-center mt-2">
              {item.icon}
              <span className="text-2xl text-gray-900 font-bold ml-2">
                R$ {item.value.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-grow">
        <Card className="bg-white bg-opacity-40 backdrop-blur-md shadow-lg">
          <CardHeader>
            <CardDescription>Faturamentos do Dia</CardDescription>
            <CardTitle className="text-4xl tabular-nums">
              R$ 12.584{' '}
              <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                reais
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ChartContainer
              config={{
                faturamento: {
                  label: 'Faturamento',
                  color: 'hsl(var(--chart-1))',
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { date: '2024-01-01', faturamento: 10000 },
                    { date: '2024-01-02', faturamento: 12000 },
                    { date: '2024-01-03', faturamento: 11000 },
                    { date: '2024-01-04', faturamento: 13000 },
                    { date: '2024-01-05', faturamento: 14000 },
                    { date: '2024-01-06', faturamento: 12500 },
                    { date: '2024-01-07', faturamento: 11600 },
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={value =>
                      new Date(value).toLocaleDateString('pt-BR', {
                        weekday: 'short',
                      })
                    }
                  />
                  <YAxis />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
                  />
                  <Bar dataKey="faturamento" fill="#8884d8" />
                  <ReferenceLine y={12000} stroke="red" strokeDasharray="3 3">
                    <Label value="Média" position="insideTopLeft" />
                  </ReferenceLine>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
          {/* ... resto do código ... */}
        </Card>
        <Card className="bg-white bg-opacity-40 backdrop-blur-md shadow-lg">
          <CardHeader>
            <CardDescription>Novos Usuários e Retenção</CardDescription>
            <div className="flex justify-between">
              <CardTitle className="text-4xl tabular-nums">
                62{' '}
                <span className="text-sm font-normal text-muted-foreground">
                  /dia
                </span>
              </CardTitle>
              <CardTitle className="text-4xl tabular-nums">85%</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ChartContainer
              config={{
                usuarios: {
                  label: 'Usuários',
                  color: 'hsl(var(--chart-1))',
                },
                retencao: {
                  label: 'Retenção',
                  color: 'hsl(var(--chart-2))',
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[
                    { date: '2024-01-01', usuarios: 50, retencao: 80 },
                    { date: '2024-01-02', usuarios: 55, retencao: 82 },
                    { date: '2024-01-03', usuarios: 60, retencao: 85 },
                    { date: '2024-01-04', usuarios: 58, retencao: 83 },
                    { date: '2024-01-05', usuarios: 62, retencao: 86 },
                    { date: '2024-01-06', usuarios: 65, retencao: 88 },
                    { date: '2024-01-07', usuarios: 70, retencao: 85 },
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={value =>
                      new Date(value).toLocaleDateString('pt-BR', {
                        weekday: 'short',
                      })
                    }
                  />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="usuarios"
                    stroke="var(--color-usuarios)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="retencao"
                    stroke="var(--color-retencao)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
