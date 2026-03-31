import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Users, UserCheck, Clock, DollarSign, MessageCircle, UserPlus, Phone, Mail } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from "recharts";

const stats = [
  { label: "Total de Leads", value: "248", icon: Users, change: "+12% vs mês anterior" },
  { label: "Leads Convertidos", value: "57", icon: UserCheck, change: "+15% vs mês anterior" },
  { label: "Leads em Andamento", value: "134", icon: Clock, change: "+5% vs mês anterior" },
  { label: "Receita Estimada", value: "R$ 89.500", icon: DollarSign, change: "+8% vs mês anterior" },
];

const chartData = [
  { dia: "01/03", leads: 8 },
  { dia: "05/03", leads: 14 },
  { dia: "09/03", leads: 11 },
  { dia: "13/03", leads: 19 },
  { dia: "17/03", leads: 16 },
  { dia: "21/03", leads: 23 },
  { dia: "25/03", leads: 28 },
  { dia: "29/03", leads: 21 },
];

const chartConfig = {
  leads: {
    label: "Leads",
    color: "hsl(142 70% 49%)",
  },
};

const activities = [
  { icon: MessageCircle, text: "João respondeu no WhatsApp", time: "Há 5 min", color: "text-primary" },
  { icon: UserPlus, text: "Novo lead adicionado: Maria Silva", time: "Há 15 min", color: "text-primary" },
  { icon: Phone, text: "Ligação realizada para Pedro Lima", time: "Há 30 min", color: "text-accent-foreground" },
  { icon: UserCheck, text: "Lead Ana Costa convertido com sucesso", time: "Há 1h", color: "text-primary" },
  { icon: Mail, text: "E-mail enviado para Carla Souza", time: "Há 2h", color: "text-muted-foreground" },
  { icon: UserPlus, text: "Novo lead adicionado: Ricardo Ferreira", time: "Há 3h", color: "text-primary" },
  { icon: MessageCircle, text: "Lucas Almeida respondeu no WhatsApp", time: "Há 4h", color: "text-primary" },
  { icon: Phone, text: "Ligação agendada com Fernanda Dias", time: "Há 5h", color: "text-accent-foreground" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle>
              <s.icon className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{s.value}</div>
              <p className="text-xs text-primary mt-1">{s.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gráfico + Atividades */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Gráfico de desempenho */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Leads ao Longo dos Dias</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="dia" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="leads" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Atividades recentes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Atividades Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
              {activities.map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-full bg-accent p-1.5">
                    <a.icon className={`h-3.5 w-3.5 ${a.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground leading-tight">{a.text}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
