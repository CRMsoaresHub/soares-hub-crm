import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Search, Plus, Phone, Mail, MessageCircle, Calendar, Clock, User, StickyNote } from "lucide-react";
import { useUser, mockUsers } from "@/contexts/UserContext";

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: string;
  origin: string;
  createdAt: string;
  notes: string;
  assignedTo: string;
  history: { action: string; date: string; icon: "phone" | "message" | "mail" | "note" }[];
}

const initialLeads: Lead[] = [
  {
    id: "1", name: "Maria Silva", phone: "(11) 99999-1234", email: "maria@email.com",
    status: "Novo", origin: "WhatsApp", createdAt: "28/03/2026", notes: "Interessada no plano premium.", assignedTo: "u2",
    history: [{ action: "Lead adicionado via WhatsApp", date: "28/03 10:30", icon: "message" }],
  },
  {
    id: "2", name: "João Santos", phone: "(21) 98888-5678", email: "joao@email.com",
    status: "Em Contato", origin: "Indicação", createdAt: "25/03/2026", notes: "Retornar na sexta-feira.", assignedTo: "u3",
    history: [
      { action: "Ligação realizada — sem resposta", date: "27/03 14:00", icon: "phone" },
      { action: "Lead adicionado por indicação", date: "25/03 09:00", icon: "note" },
    ],
  },
  {
    id: "3", name: "Ana Costa", phone: "(11) 96666-3456", email: "ana@email.com",
    status: "Proposta Enviada", origin: "Site", createdAt: "20/03/2026", notes: "Aguardando retorno da proposta.", assignedTo: "u2",
    history: [
      { action: "Proposta enviada por e-mail", date: "26/03 11:00", icon: "mail" },
      { action: "Reunião online realizada", date: "24/03 15:00", icon: "phone" },
      { action: "Primeiro contato via site", date: "20/03 08:30", icon: "note" },
    ],
  },
  {
    id: "4", name: "Pedro Lima", phone: "(31) 97777-9012", email: "pedro@email.com",
    status: "Negociação", origin: "Ligação", createdAt: "15/03/2026", notes: "Negociando desconto de 10%.", assignedTo: "u3",
    history: [
      { action: "Contraproposta recebida", date: "28/03 09:00", icon: "mail" },
      { action: "Proposta enviada", date: "22/03 16:00", icon: "mail" },
      { action: "Ligação de qualificação", date: "18/03 10:00", icon: "phone" },
      { action: "Lead adicionado via ligação", date: "15/03 14:30", icon: "phone" },
    ],
  },
  {
    id: "5", name: "Carla Souza", phone: "(51) 93333-5678", email: "carla@email.com",
    status: "Fechado", origin: "WhatsApp", createdAt: "10/03/2026", notes: "Contrato assinado. Cliente ativa.", assignedTo: "u2",
    history: [
      { action: "Contrato assinado", date: "27/03 10:00", icon: "note" },
      { action: "Proposta aceita", date: "25/03 14:00", icon: "mail" },
      { action: "Mensagem no WhatsApp", date: "12/03 09:00", icon: "message" },
      { action: "Lead adicionado", date: "10/03 11:00", icon: "note" },
    ],
  },
  {
    id: "6", name: "Ricardo Ferreira", phone: "(11) 91111-2222", email: "ricardo@email.com",
    status: "Novo", origin: "Site", createdAt: "29/03/2026", notes: "", assignedTo: "u3",
    history: [{ action: "Lead captado pelo formulário do site", date: "29/03 08:00", icon: "note" }],
  },
  {
    id: "7", name: "Fernanda Alves", phone: "(41) 94444-3333", email: "fernanda@email.com",
    status: "Em Contato", origin: "E-mail", createdAt: "22/03/2026", notes: "Prefere contato por e-mail.", assignedTo: "u2",
    history: [
      { action: "E-mail de follow-up enviado", date: "28/03 10:00", icon: "mail" },
      { action: "Primeiro e-mail enviado", date: "23/03 09:00", icon: "mail" },
      { action: "Lead adicionado", date: "22/03 15:00", icon: "note" },
    ],
  },
  {
    id: "8", name: "Lucas Mendes", phone: "(61) 95555-4444", email: "lucas@email.com",
    status: "Proposta Enviada", origin: "Indicação", createdAt: "18/03/2026", notes: "Indicado pelo Ricardo.",
    history: [
      { action: "Proposta enviada", date: "26/03 14:00", icon: "mail" },
      { action: "Reunião presencial", date: "24/03 10:00", icon: "phone" },
      { action: "Lead adicionado por indicação", date: "18/03 11:00", icon: "note" },
    ],
  },
];

const statuses = ["Todos", "Novo", "Em Contato", "Proposta Enviada", "Negociação", "Fechado"];

const statusBadge: Record<string, string> = {
  Novo: "bg-info/10 text-info border-info/20",
  "Em Contato": "bg-warning/10 text-warning border-warning/20",
  "Proposta Enviada": "bg-primary/10 text-primary border-primary/20",
  Negociação: "bg-accent text-accent-foreground border-accent-foreground/20",
  Fechado: "bg-primary/15 text-primary border-primary/30",
};

const historyIcons = {
  phone: Phone,
  message: MessageCircle,
  mail: Mail,
  note: StickyNote,
};

export default function Contatos() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [leads, setLeads] = useState(initialLeads);
  const [newLead, setNewLead] = useState({ name: "", phone: "", email: "", origin: "WhatsApp" });

  const filtered = leads.filter((l) => {
    const matchSearch =
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.phone.includes(search) ||
      l.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "Todos" || l.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleAddLead = () => {
    if (!newLead.name.trim()) return;
    const lead: Lead = {
      id: Date.now().toString(),
      name: newLead.name,
      phone: newLead.phone || "(00) 00000-0000",
      email: newLead.email,
      status: "Novo",
      origin: newLead.origin,
      createdAt: new Date().toLocaleDateString("pt-BR"),
      notes: "",
      history: [{ action: "Lead adicionado manualmente", date: new Date().toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }), icon: "note" }],
    };
    setLeads((prev) => [lead, ...prev]);
    setNewLead({ name: "", phone: "", email: "", origin: "WhatsApp" });
    setDialogOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-2xl font-bold text-foreground">Contatos</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1.5">
              <Plus className="h-4 w-4" /> Adicionar Lead
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo Lead</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label>Nome</Label>
                <Input placeholder="Nome completo" value={newLead.name} onChange={(e) => setNewLead((p) => ({ ...p, name: e.target.value }))} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Telefone</Label>
                  <Input placeholder="(00) 00000-0000" value={newLead.phone} onChange={(e) => setNewLead((p) => ({ ...p, phone: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label>E-mail</Label>
                  <Input placeholder="email@exemplo.com" value={newLead.email} onChange={(e) => setNewLead((p) => ({ ...p, email: e.target.value }))} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Origem</Label>
                <div className="flex flex-wrap gap-2">
                  {["WhatsApp", "Indicação", "Site", "Ligação", "E-mail"].map((o) => (
                    <Badge key={o} variant={newLead.origin === o ? "default" : "outline"} className="cursor-pointer" onClick={() => setNewLead((p) => ({ ...p, origin: o }))}>
                      {o}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button onClick={handleAddLead} className="w-full">Adicionar</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar por nome, telefone ou e-mail..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {statuses.map((s) => (
            <Button key={s} variant={statusFilter === s ? "default" : "outline"} size="sm" className="text-xs" onClick={() => setStatusFilter(s)}>
              {s}
            </Button>
          ))}
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Nome</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground hidden md:table-cell">Telefone</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground hidden lg:table-cell">Origem</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground hidden sm:table-cell">Criado em</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((l) => (
                  <tr key={l.id} className="border-b last:border-0 hover:bg-muted/20 cursor-pointer transition-colors" onClick={() => setSelectedLead(l)}>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-semibold shrink-0">
                          {l.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-medium">{l.name}</p>
                          <p className="text-xs text-muted-foreground md:hidden">{l.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground hidden md:table-cell">{l.phone}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className={`text-[11px] ${statusBadge[l.status] || ""}`}>{l.status}</Badge>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground hidden lg:table-cell">{l.origin}</td>
                    <td className="py-3 px-4 text-right text-muted-foreground hidden sm:table-cell">{l.createdAt}</td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-muted-foreground">Nenhum contato encontrado.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Lead detail sheet */}
      <Sheet open={!!selectedLead} onOpenChange={(open) => !open && setSelectedLead(null)}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto">
          {selectedLead && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                    {selectedLead.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  {selectedLead.name}
                </SheetTitle>
              </SheetHeader>

              <div className="mt-6 space-y-5">
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-foreground">Informações</h4>
                  <div className="grid gap-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground"><Phone className="h-3.5 w-3.5" /> {selectedLead.phone}</div>
                    <div className="flex items-center gap-2 text-muted-foreground"><Mail className="h-3.5 w-3.5" /> {selectedLead.email}</div>
                    <div className="flex items-center gap-2 text-muted-foreground"><User className="h-3.5 w-3.5" /> Origem: {selectedLead.origin}</div>
                    <div className="flex items-center gap-2 text-muted-foreground"><Calendar className="h-3.5 w-3.5" /> Criado em {selectedLead.createdAt}</div>
                    <Badge variant="outline" className={`text-xs w-fit ${statusBadge[selectedLead.status] || ""}`}>{selectedLead.status}</Badge>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-foreground">Observações</h4>
                  <Textarea defaultValue={selectedLead.notes} placeholder="Adicione observações sobre este lead..." rows={3} className="text-sm" />
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-foreground">Histórico de Interações</h4>
                  <div className="space-y-3">
                    {selectedLead.history.map((h, i) => {
                      const Icon = historyIcons[h.icon];
                      return (
                        <div key={i} className="flex items-start gap-3">
                          <div className="mt-0.5 rounded-full bg-accent p-1.5">
                            <Icon className="h-3 w-3 text-accent-foreground" />
                          </div>
                          <div>
                            <p className="text-sm">{h.action}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                              <Clock className="h-3 w-3" /> {h.date}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
