import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Phone, MessageCircle, MoreHorizontal, GripVertical, User, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser, mockUsers } from "@/contexts/UserContext";

interface Lead {
  id: string;
  name: string;
  phone: string;
  tag: string;
  initials: string;
  assignedTo: string;
}

interface Column {
  id: string;
  title: string;
  colorDot: string;
  bgCard: string;
  leads: Lead[];
}

const initialColumns: Column[] = [
  {
    id: "novo",
    title: "Novo Lead",
    colorDot: "bg-info",
    bgCard: "border-l-info",
    leads: [
      { id: "1", name: "Maria Silva", phone: "(11) 99999-1234", tag: "WhatsApp", initials: "MS", assignedTo: "u2" },
      { id: "2", name: "Pedro Lima", phone: "(21) 98888-5678", tag: "Indicação", initials: "PL", assignedTo: "u3" },
      { id: "3", name: "Lucas Mendes", phone: "(31) 97777-9012", tag: "Site", initials: "LM", assignedTo: "u2" },
    ],
  },
  {
    id: "contato",
    title: "Em Contato",
    colorDot: "bg-warning",
    bgCard: "border-l-warning",
    leads: [
      { id: "4", name: "Ana Costa", phone: "(11) 96666-3456", tag: "WhatsApp", initials: "AC", assignedTo: "u2" },
      { id: "5", name: "Bruno Dias", phone: "(41) 95555-7890", tag: "Ligação", initials: "BD", assignedTo: "u3" },
    ],
  },
  {
    id: "proposta",
    title: "Proposta Enviada",
    colorDot: "bg-primary",
    bgCard: "border-l-primary",
    leads: [
      { id: "6", name: "João Santos", phone: "(11) 94444-1234", tag: "E-mail", initials: "JS", assignedTo: "u3" },
      { id: "7", name: "Carla Souza", phone: "(51) 93333-5678", tag: "WhatsApp", initials: "CS", assignedTo: "u2" },
    ],
  },
  {
    id: "negociacao",
    title: "Negociação",
    colorDot: "bg-accent-foreground",
    bgCard: "border-l-accent-foreground",
    leads: [
      { id: "8", name: "Fernanda Alves", phone: "(11) 92222-9012", tag: "Reunião", initials: "FA", assignedTo: "u2" },
    ],
  },
  {
    id: "fechado",
    title: "Fechado",
    colorDot: "bg-primary",
    bgCard: "border-l-primary",
    leads: [
      { id: "9", name: "Ricardo Ferreira", phone: "(21) 91111-3456", tag: "Contrato", initials: "RF", assignedTo: "u3" },
      { id: "10", name: "Patrícia Rocha", phone: "(11) 90000-7890", tag: "Contrato", initials: "PR", assignedTo: "u2" },
    ],
  },
];

const tagColors: Record<string, string> = {
  WhatsApp: "bg-primary/10 text-primary border-primary/20",
  Indicação: "bg-accent text-accent-foreground border-accent-foreground/20",
  Site: "bg-info/10 text-info border-info/20",
  Ligação: "bg-warning/10 text-warning border-warning/20",
  "E-mail": "bg-muted text-muted-foreground border-border",
  Reunião: "bg-accent text-accent-foreground border-accent-foreground/20",
  Contrato: "bg-primary/10 text-primary border-primary/20",
};

export default function Pipeline() {
  const { currentUser, isAdmin, allUsers } = useUser();
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [draggedLead, setDraggedLead] = useState<{ lead: Lead; fromColId: string } | null>(null);
  const [dragOverColId, setDragOverColId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newLead, setNewLead] = useState({ name: "", phone: "", tag: "WhatsApp" });
  const [attendantFilter, setAttendantFilter] = useState("todos");

  // Filter columns based on role + attendant filter
  const visibleColumns = columns.map((col) => ({
    ...col,
    leads: isAdmin
      ? attendantFilter === "todos"
        ? col.leads
        : col.leads.filter((l) => l.assignedTo === attendantFilter)
      : col.leads.filter((l) => l.assignedTo === currentUser.id),
  }));

  const handleDragStart = (lead: Lead, fromColId: string) => {
    setDraggedLead({ lead, fromColId });
  };

  const handleDragOver = (e: React.DragEvent, colId: string) => {
    e.preventDefault();
    setDragOverColId(colId);
  };

  const handleDragLeave = () => {
    setDragOverColId(null);
  };

  const handleDrop = (toColId: string) => {
    if (!draggedLead || draggedLead.fromColId === toColId) {
      setDraggedLead(null);
      setDragOverColId(null);
      return;
    }

    setColumns((prev) =>
      prev.map((col) => {
        if (col.id === draggedLead.fromColId) {
          return { ...col, leads: col.leads.filter((l) => l.id !== draggedLead.lead.id) };
        }
        if (col.id === toColId) {
          return { ...col, leads: [...col.leads, draggedLead.lead] };
        }
        return col;
      })
    );

    setDraggedLead(null);
    setDragOverColId(null);
  };

  const handleAddLead = () => {
    if (!newLead.name.trim()) return;
    const initials = newLead.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    const lead: Lead = {
      id: Date.now().toString(),
      name: newLead.name,
      phone: newLead.phone || "(00) 00000-0000",
      tag: newLead.tag,
      initials,
      assignedTo: currentUser.id,
    };

    setColumns((prev) =>
      prev.map((col) => (col.id === "novo" ? { ...col, leads: [lead, ...col.leads] } : col))
    );
    setNewLead({ name: "", phone: "", tag: "WhatsApp" });
    setDialogOpen(false);
  };

  const moveLead = (leadId: string, fromColId: string, toColId: string) => {
    setColumns((prev) => {
      const lead = prev.find((c) => c.id === fromColId)?.leads.find((l) => l.id === leadId);
      if (!lead) return prev;
      return prev.map((col) => {
        if (col.id === fromColId) return { ...col, leads: col.leads.filter((l) => l.id !== leadId) };
        if (col.id === toColId) return { ...col, leads: [...col.leads, lead] };
        return col;
      });
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Pipeline</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1.5">
              <Plus className="h-4 w-4" />
              Novo Lead
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Novo Lead</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label>Nome</Label>
                <Input
                  placeholder="Nome do lead"
                  value={newLead.name}
                  onChange={(e) => setNewLead((p) => ({ ...p, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Telefone</Label>
                <Input
                  placeholder="(00) 00000-0000"
                  value={newLead.phone}
                  onChange={(e) => setNewLead((p) => ({ ...p, phone: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Origem</Label>
                <div className="flex flex-wrap gap-2">
                  {["WhatsApp", "Indicação", "Site", "Ligação", "E-mail"].map((t) => (
                    <Badge
                      key={t}
                      variant={newLead.tag === t ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setNewLead((p) => ({ ...p, tag: t }))}
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button onClick={handleAddLead} className="w-full">
                Adicionar Lead
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {!isAdmin && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/40 rounded-lg px-3 py-2">
          <User className="h-4 w-4" />
          Exibindo apenas leads atribuídos a <span className="font-medium text-foreground">{currentUser.name}</span>
        </div>
      )}

      <div className="flex gap-4 overflow-x-auto pb-4">
        {visibleColumns.map((col) => (
          <div
            key={col.id}
            className={`min-w-[260px] w-[260px] flex-shrink-0 rounded-xl p-3 transition-colors ${
              dragOverColId === col.id ? "bg-accent ring-2 ring-primary/30" : "bg-muted/40"
            }`}
            onDragOver={(e) => handleDragOver(e, col.id)}
            onDragLeave={handleDragLeave}
            onDrop={() => handleDrop(col.id)}
          >
            {/* Column header */}
            <div className="flex items-center gap-2 mb-3 px-1">
              <span className={`h-2.5 w-2.5 rounded-full ${col.colorDot}`} />
              <h3 className="font-semibold text-sm text-foreground">{col.title}</h3>
              <span className="ml-auto text-xs font-medium bg-background text-muted-foreground rounded-full px-2 py-0.5">
                {col.leads.length}
              </span>
            </div>

            {/* Cards */}
            <div className="space-y-2.5">
              {col.leads.map((lead) => (
                <Card
                  key={lead.id}
                  draggable
                  onDragStart={() => handleDragStart(lead, col.id)}
                  className={`cursor-grab active:cursor-grabbing border-l-[3px] ${col.bgCard} hover:shadow-md transition-all ${
                    draggedLead?.lead.id === lead.id ? "opacity-40 scale-95" : ""
                  }`}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start gap-2.5">
                      <GripVertical className="h-4 w-4 text-muted-foreground/40 mt-1 shrink-0" />
                      <Avatar className="h-8 w-8 shrink-0">
                        <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-semibold">
                          {lead.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{lead.name}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <Phone className="h-3 w-3" />
                          {lead.phone}
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-1">
                          Resp: {mockUsers.find((u) => u.id === lead.assignedTo)?.name || "—"}
                        </p>
                        <div className="mt-1.5 flex items-center justify-between">
                          <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${tagColors[lead.tag] || ""}`}>
                            {lead.tag}
                          </Badge>
                          <div className="flex gap-0.5">
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <MessageCircle className="h-3.5 w-3.5 text-primary" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                  <MoreHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                {columns
                                  .filter((c) => c.id !== col.id)
                                  .map((c) => (
                                    <DropdownMenuItem key={c.id} onClick={() => moveLead(lead.id, col.id, c.id)}>
                                      Mover para {c.title}
                                    </DropdownMenuItem>
                                  ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
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
