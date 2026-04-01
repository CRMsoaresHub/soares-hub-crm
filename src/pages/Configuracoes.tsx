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
  const [selectedPlan, setSelectedPlan] = useState<"basico" | "pro">("basico");

  const handleSave = (section: string) => {
    toast.success(`${section} salvo com sucesso!`);
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
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2"><Users className="h-5 w-5 text-primary" /> Equipe</CardTitle>
          <CardDescription>Gerencie os membros da sua equipe</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {teamMembers.map((m) => (
              <div key={m.email} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">{m.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.email}</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">{m.role}</Badge>
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <div className="flex gap-3 items-end">
            <div className="flex-1 space-y-2">
              <Label>Convidar membro</Label>
              <Input placeholder="email@exemplo.com" />
            </div>
            <Button variant="outline" onClick={() => toast.success("Convite enviado!")}>Convidar</Button>
          </div>
        </CardContent>
      </Card>

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
