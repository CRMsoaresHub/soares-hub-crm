import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, UserCheck, Clock, DollarSign, MessageCircle, UserPlus, Phone, Mail, Trophy, Star, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { useUser } from "@/contexts/UserContext";

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
  leads: { label: "Leads", color: "hsl(142 70% 49%)" },
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

const teamRanking = [
  { name: "Juliana Costa", initials: "JC", leads: 82, conversions: 23, rate: 28, revenue: "R$ 34.200" },
  { name: "Carlos Mendes", initials: "CM", leads: 74, conversions: 19, rate: 26, revenue: "R$ 28.500" },
  { name: "Marcos Oliveira", initials: "MO", leads: 52, conversions: 10, rate: 19, revenue: "R$ 16.800" },
  { name: "Ana Paula", initials: "AP", leads: 40, conversions: 5, rate: 13, revenue: "R$ 10.000" },
];

const teamChartData = [
  { name: "Juliana", leads: 82, conversoes: 23 },
  { name: "Carlos", leads: 74, conversoes: 19 },
  { name: "Marcos", leads: 52, conversoes: 10 },
  { name: "Ana P.", leads: 40, conversoes: 5 },
];

const teamChartConfig = {
  leads: { label: "Leads", color: "hsl(142 70% 49%)" },
  conversoes: { label: "Conversões", color: "hsl(var(--info))" },
};

const bestAttendant = teamRanking[0];

export default function Dashboard() {
  const { isAdmin } = useUser();

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

      {/* Admin-only: Team section */}
      {isAdmin && (
        <>
          {/* Best attendant highlight */}
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="py-5">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-primary/15 flex items-center justify-center">
                  <Trophy className="h-7 w-7 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-foreground text-lg">Melhor Atendente do Mês</h3>
                    <Star className="h-5 w-5 text-warning fill-warning" />
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">{bestAttendant.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground">{bestAttendant.name}</p>
                      <p className="text-xs text-muted-foreground">{bestAttendant.leads} leads • {bestAttendant.conversions} conversões • {bestAttendant.revenue} em receita</p>
                    </div>
                  </div>
                </div>
                <Badge className="text-sm px-3 py-1 hidden sm:flex gap-1">
                  <TrendingUp className="h-3.5 w-3.5" /> {bestAttendant.rate}% taxa
                </Badge>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Ranking */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" /> Ranking da Equipe
                </CardTitle>
                <CardDescription>Performance dos atendentes no mês</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {teamRanking.map((member, i) => (
                    <div key={member.name} className="flex items-center gap-3 p-3 rounded-lg border">
                      <span className={`text-lg font-bold w-6 text-center ${i === 0 ? "text-warning" : i === 1 ? "text-muted-foreground" : "text-muted-foreground/60"}`}>
                        {i + 1}º
                      </span>
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">{member.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.revenue}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">{member.leads} <span className="text-muted-foreground font-normal text-xs">leads</span></p>
                        <p className="text-xs text-primary">{member.conversions} conv. ({member.rate}%)</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Team chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Performance por Atendente</CardTitle>
                <CardDescription>Leads atendidos vs conversões</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={teamChartConfig} className="h-[280px] w-full">
                  <BarChart data={teamChartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="name" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="leads" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="conversoes" fill="hsl(var(--info))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Consolidated totals */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6 text-center">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-3xl font-bold">248</p>
                <p className="text-sm text-muted-foreground mt-1">Total geral de leads</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <UserCheck className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-3xl font-bold">57</p>
                <p className="text-sm text-muted-foreground mt-1">Conversões totais</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <DollarSign className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-3xl font-bold">R$ 89.500</p>
                <p className="text-sm text-muted-foreground mt-1">Receita consolidada</p>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
