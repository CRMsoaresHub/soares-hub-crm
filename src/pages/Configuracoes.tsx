import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { User, Users, Plug, Settings, Crown, Check, MessageCircle, Mail, Bell, BarChart3, Plus, Pencil, Trash2 } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import type { UserRole } from "@/contexts/UserContext";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  roleLabel: string;
  initials: string;
  active: boolean;
}

const initialTeam: TeamMember[] = [
  { id: "u1", name: "Rafael Soares", email: "rafael@soareshub.com", role: "admin", roleLabel: "Administrador", initials: "RS", active: true },
  { id: "u2", name: "Juliana Costa", email: "juliana@soareshub.com", role: "atendente", roleLabel: "Atendente", initials: "JC", active: true },
  { id: "u3", name: "Carlos Mendes", email: "carlos@soareshub.com", role: "atendente", roleLabel: "Atendente", initials: "CM", active: true },
  { id: "u4", name: "Marcos Oliveira", email: "marcos@soareshub.com", role: "atendente", roleLabel: "Atendente", initials: "MO", active: false },
];

export default function Configuracoes() {
  const { currentUser, isAdmin } = useUser();
  const [selectedPlan, setSelectedPlan] = useState<"basico" | "pro">("basico");
  const [team, setTeam] = useState<TeamMember[]>(initialTeam);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editMember, setEditMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", role: "atendente" as UserRole });
  const handleSave = (section: string) => {
    toast.success(`${section} salvo com sucesso!`);
  };

  const handleAddMember = () => {
    if (!formData.name.trim() || !formData.email.trim()) return;
    const initials = formData.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
    const member: TeamMember = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      roleLabel: formData.role === "admin" ? "Administrador" : "Atendente",
      initials,
      active: true,
    };
    setTeam((prev) => [...prev, member]);
    setFormData({ name: "", email: "", role: "atendente" });
    setAddDialogOpen(false);
    toast.success("Usuário adicionado com sucesso!");
  };

  const handleEditMember = () => {
    if (!editMember || !formData.name.trim()) return;
    setTeam((prev) =>
      prev.map((m) =>
        m.id === editMember.id
          ? { ...m, name: formData.name, email: formData.email, role: formData.role, roleLabel: formData.role === "admin" ? "Administrador" : "Atendente", initials: formData.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) }
          : m
      )
    );
    setEditMember(null);
    setFormData({ name: "", email: "", role: "atendente" });
    toast.success("Usuário atualizado!");
  };

  const handleRemoveMember = (id: string) => {
    setTeam((prev) => prev.filter((m) => m.id !== id));
    toast.success("Usuário removido!");
  };

  const toggleActive = (id: string) => {
    setTeam((prev) => prev.map((m) => m.id === id ? { ...m, active: !m.active } : m));
  };

  const openEdit = (m: TeamMember) => {
    setFormData({ name: m.name, email: m.email, role: m.role });
    setEditMember(m);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <h2 className="text-2xl font-bold text-foreground">Configurações</h2>

      {/* Perfil */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2"><User className="h-5 w-5 text-primary" /> Perfil do Usuário</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 mb-2">
            <Avatar className="h-14 w-14">
              <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">RS</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">Rafael Soares</p>
              <p className="text-sm text-muted-foreground">Administrador</p>
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nome</Label>
              <Input defaultValue="Rafael Soares" />
            </div>
            <div className="space-y-2">
              <Label>E-mail</Label>
              <Input defaultValue="rafael@soareshub.com" />
            </div>
            <div className="space-y-2">
              <Label>Telefone</Label>
              <Input defaultValue="(11) 99999-0000" />
            </div>
            <div className="space-y-2">
              <Label>Cargo</Label>
              <Input defaultValue="Diretor Comercial" />
            </div>
          </div>
          <Button onClick={() => handleSave("Perfil")}>Salvar Perfil</Button>
        </CardContent>
      </Card>

      {/* Equipe */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2"><Users className="h-5 w-5 text-primary" /> Equipe</CardTitle>
            <CardDescription>Gerencie os membros da sua equipe</CardDescription>
          </div>
          {isAdmin && (
            <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-1.5" onClick={() => setFormData({ name: "", email: "", role: "atendente" })}>
                  <Plus className="h-4 w-4" /> Adicionar usuário
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Novo Usuário</DialogTitle></DialogHeader>
                <div className="space-y-4 pt-2">
                  <div className="space-y-2"><Label>Nome</Label><Input placeholder="Nome completo" value={formData.name} onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))} /></div>
                  <div className="space-y-2"><Label>E-mail</Label><Input placeholder="email@exemplo.com" value={formData.email} onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))} /></div>
                  <div className="space-y-2">
                    <Label>Tipo de usuário</Label>
                    <div className="flex gap-2">
                      {([["admin", "Administrador"], ["atendente", "Atendente"]] as const).map(([val, label]) => (
                        <Badge key={val} variant={formData.role === val ? "default" : "outline"} className="cursor-pointer" onClick={() => setFormData((p) => ({ ...p, role: val }))}>{label}</Badge>
                      ))}
                    </div>
                  </div>
                  <Button onClick={handleAddMember} className="w-full">Adicionar</Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {team.map((m) => (
              <div key={m.id} className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${m.active ? "" : "opacity-50"}`}>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">{m.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={`text-[11px] ${m.role === "admin" ? "bg-primary/10 text-primary border-primary/20" : ""}`}>{m.roleLabel}</Badge>
                  <Badge variant="outline" className={`text-[10px] ${m.active ? "bg-primary/10 text-primary border-primary/20" : "bg-muted text-muted-foreground"}`}>
                    {m.active ? "Ativo" : "Inativo"}
                  </Badge>
                  {isAdmin && (
                    <div className="flex gap-1 ml-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => toggleActive(m.id)}>
                        <Switch checked={m.active} className="scale-75" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(m)}>
                        <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleRemoveMember(m.id)}>
                        <Trash2 className="h-3.5 w-3.5 text-destructive" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit member dialog */}
      <Dialog open={!!editMember} onOpenChange={(open) => !open && setEditMember(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Editar Usuário</DialogTitle></DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2"><Label>Nome</Label><Input value={formData.name} onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))} /></div>
            <div className="space-y-2"><Label>E-mail</Label><Input value={formData.email} onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))} /></div>
            <div className="space-y-2">
              <Label>Tipo de usuário</Label>
              <div className="flex gap-2">
                {([["admin", "Administrador"], ["atendente", "Atendente"]] as const).map(([val, label]) => (
                  <Badge key={val} variant={formData.role === val ? "default" : "outline"} className="cursor-pointer" onClick={() => setFormData((p) => ({ ...p, role: val }))}>{label}</Badge>
                ))}
              </div>
            </div>
            <Button onClick={handleEditMember} className="w-full">Salvar</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Integrações */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2"><Plug className="h-5 w-5 text-primary" /> Integrações</CardTitle>
          <CardDescription>Conecte ferramentas ao seu CRM</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg border">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">WhatsApp Business</p>
                <p className="text-xs text-muted-foreground">Envie e receba mensagens direto no CRM</p>
              </div>
            </div>
            <Badge variant="outline" className="text-xs text-warning border-warning/30">Em breve</Badge>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg border">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">E-mail (SMTP)</p>
                <p className="text-xs text-muted-foreground">Conecte seu e-mail para automações</p>
              </div>
            </div>
            <Badge variant="outline" className="text-xs text-warning border-warning/30">Em breve</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Preferências */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2"><Settings className="h-5 w-5 text-primary" /> Preferências</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { title: "Novos leads", desc: "Receber alerta quando um novo lead chegar", icon: Bell, on: true },
            { title: "Vendas fechadas", desc: "Notificar quando uma venda for concluída", icon: Check, on: true },
            { title: "Relatórios semanais", desc: "Enviar resumo por e-mail toda segunda", icon: BarChart3, on: false },
          ].map((p) => (
            <div key={p.title} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <p.icon className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{p.title}</p>
                  <p className="text-xs text-muted-foreground">{p.desc}</p>
                </div>
              </div>
              <Switch defaultChecked={p.on} />
            </div>
          ))}
          <Separator />
          <Button variant="outline" onClick={() => handleSave("Preferências")}>Salvar Preferências</Button>
        </CardContent>
      </Card>

      {/* Planos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2"><Crown className="h-5 w-5 text-primary" /> Upgrade de Plano</CardTitle>
          <CardDescription>Escolha o plano ideal para o seu negócio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Básico */}
            <div
              className={`relative rounded-xl border-2 p-5 cursor-pointer transition-all ${
                selectedPlan === "basico" ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
              }`}
              onClick={() => setSelectedPlan("basico")}
            >
              {selectedPlan === "basico" && (
                <Badge className="absolute -top-2.5 right-3 text-[10px]">Atual</Badge>
              )}
              <h4 className="font-semibold text-foreground">Plano Básico</h4>
              <p className="text-2xl font-bold text-foreground mt-2">R$ 97<span className="text-sm font-normal text-muted-foreground">/mês</span></p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Até 500 leads</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> 1 usuário</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Pipeline Kanban</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Relatórios básicos</li>
              </ul>
            </div>

            {/* Pro */}
            <div
              className={`relative rounded-xl border-2 p-5 cursor-pointer transition-all ${
                selectedPlan === "pro" ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
              }`}
              onClick={() => setSelectedPlan("pro")}
            >
              {selectedPlan === "pro" && (
                <Badge className="absolute -top-2.5 right-3 text-[10px]">Selecionado</Badge>
              )}
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-foreground">Plano Pro</h4>
                <Badge variant="outline" className="text-[10px] border-primary/30 text-primary">Popular</Badge>
              </div>
              <p className="text-2xl font-bold text-foreground mt-2">R$ 197<span className="text-sm font-normal text-muted-foreground">/mês</span></p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Leads ilimitados</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Até 5 usuários</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Integração WhatsApp</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Relatórios avançados</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Suporte prioritário</li>
              </ul>
            </div>
          </div>

          <Button className="w-full mt-4" disabled={selectedPlan === "basico"} onClick={() => toast.success("Upgrade realizado com sucesso!")}>
            {selectedPlan === "basico" ? "Plano Atual" : "Fazer Upgrade para Pro"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
