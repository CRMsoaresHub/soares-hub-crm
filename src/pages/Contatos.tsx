import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search, Phone, Mail } from "lucide-react";
import { useState } from "react";

const contacts = [
  { name: "Maria Silva", email: "maria@techcorp.com", phone: "(11) 99999-1111", company: "Tech Corp", initials: "MS" },
  { name: "João Santos", email: "joao@megastore.com", phone: "(21) 98888-2222", company: "MegaStore", initials: "JS" },
  { name: "Ana Costa", email: "ana@designco.com", phone: "(31) 97777-3333", company: "Design Co", initials: "AC" },
  { name: "Pedro Lima", email: "pedro@startapp.com", phone: "(41) 96666-4444", company: "StartApp", initials: "PL" },
  { name: "Carla Souza", email: "carla@infotech.com", phone: "(51) 95555-5555", company: "InfoTech", initials: "CS" },
  { name: "Bruno Dias", email: "bruno@netshop.com", phone: "(61) 94444-6666", company: "NetShop", initials: "BD" },
];

export default function Contatos() {
  const [search, setSearch] = useState("");
  const filtered = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-foreground">Contatos</h2>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar contato..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((c) => (
          <Card key={c.email} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                    {c.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="font-semibold truncate">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.company}</p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    <Mail className="h-3 w-3" />
                    <span className="truncate">{c.email}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                    <Phone className="h-3 w-3" />
                    <span>{c.phone}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
