import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Lead {
  name: string;
  company: string;
  value: string;
  initials: string;
}

const columns: { title: string; color: string; leads: Lead[] }[] = [
  {
    title: "Novo",
    color: "bg-info",
    leads: [
      { name: "Maria Silva", company: "Tech Corp", value: "R$ 5.000", initials: "MS" },
      { name: "Pedro Lima", company: "StartApp", value: "R$ 3.200", initials: "PL" },
    ],
  },
  {
    title: "Qualificado",
    color: "bg-warning",
    leads: [
      { name: "Ana Costa", company: "Design Co", value: "R$ 8.500", initials: "AC" },
    ],
  },
  {
    title: "Em Negociação",
    color: "bg-primary",
    leads: [
      { name: "João Santos", company: "MegaStore", value: "R$ 12.000", initials: "JS" },
      { name: "Carla Souza", company: "InfoTech", value: "R$ 7.800", initials: "CS" },
      { name: "Bruno Dias", company: "NetShop", value: "R$ 4.500", initials: "BD" },
    ],
  },
  {
    title: "Fechado",
    color: "bg-success",
    leads: [
      { name: "Fernanda Alves", company: "CloudSys", value: "R$ 15.000", initials: "FA" },
    ],
  },
];

export default function Pipeline() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Pipeline</h2>

      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
        {columns.map((col) => (
          <div key={col.title} className="min-w-[280px] flex-shrink-0">
            <div className="flex items-center gap-2 mb-3">
              <span className={`h-3 w-3 rounded-full ${col.color}`} />
              <h3 className="font-semibold text-foreground">{col.title}</h3>
              <span className="text-xs text-muted-foreground ml-auto">{col.leads.length}</span>
            </div>

            <div className="space-y-3">
              {col.leads.map((lead) => (
                <Card key={lead.name} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-9 w-9 shrink-0">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                          {lead.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="font-medium text-sm truncate">{lead.name}</p>
                        <p className="text-xs text-muted-foreground">{lead.company}</p>
                        <p className="text-sm font-semibold text-primary mt-1">{lead.value}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
