import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DollarSign, TrendingUp, CheckCircle } from "lucide-react";

const stats = [
  { label: "Total de Leads", value: "248", icon: Users, change: "+12%" },
  { label: "Vendas do Mês", value: "R$ 45.800", icon: DollarSign, change: "+8%" },
  { label: "Taxa de Conversão", value: "23%", icon: TrendingUp, change: "+3%" },
  { label: "Fechados", value: "57", icon: CheckCircle, change: "+15%" },
];

const recentLeads = [
  { name: "Maria Silva", email: "maria@email.com", status: "Novo", date: "Hoje" },
  { name: "João Santos", email: "joao@email.com", status: "Em Negociação", date: "Ontem" },
  { name: "Ana Costa", email: "ana@email.com", status: "Qualificado", date: "2 dias" },
  { name: "Pedro Lima", email: "pedro@email.com", status: "Novo", date: "3 dias" },
  { name: "Carla Souza", email: "carla@email.com", status: "Fechado", date: "4 dias" },
];

const statusColor: Record<string, string> = {
  Novo: "bg-info/10 text-info",
  Qualificado: "bg-warning/10 text-warning",
  "Em Negociação": "bg-primary/10 text-primary",
  Fechado: "bg-success/10 text-success",
};

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle>
              <s.icon className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{s.value}</div>
              <p className="text-xs text-primary mt-1">{s.change} vs mês anterior</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Leads Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-muted-foreground">
                  <th className="text-left py-2 font-medium">Nome</th>
                  <th className="text-left py-2 font-medium hidden sm:table-cell">Email</th>
                  <th className="text-left py-2 font-medium">Status</th>
                  <th className="text-right py-2 font-medium">Data</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((l) => (
                  <tr key={l.email} className="border-b last:border-0">
                    <td className="py-3 font-medium">{l.name}</td>
                    <td className="py-3 text-muted-foreground hidden sm:table-cell">{l.email}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[l.status] || ""}`}>
                        {l.status}
                      </span>
                    </td>
                    <td className="py-3 text-right text-muted-foreground">{l.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
