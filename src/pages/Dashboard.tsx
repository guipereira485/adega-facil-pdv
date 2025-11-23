import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Wine, 
  ShoppingCart, 
  Package, 
  CreditCard, 
  TrendingUp,
  Users,
  DollarSign,
  LogOut
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userCPF, setUserCPF] = useState("");

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated");
    const cpf = localStorage.getItem("userCPF");
    
    if (!isAuth) {
      navigate("/login");
      return;
    }
    
    if (cpf) {
      setUserCPF(cpf);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userCPF");
    navigate("/login");
  };

  const stats = [
    {
      title: "Vendas Hoje",
      value: "R$ 2.450,00",
      icon: DollarSign,
      trend: "+12%",
      color: "text-green-600"
    },
    {
      title: "Pedidos",
      value: "24",
      icon: ShoppingCart,
      trend: "+8%",
      color: "text-blue-600"
    },
    {
      title: "Produtos",
      value: "156",
      icon: Package,
      trend: "+3",
      color: "text-purple-600"
    },
    {
      title: "Clientes",
      value: "89",
      icon: Users,
      trend: "+5",
      color: "text-orange-600"
    }
  ];

  const quickActions = [
    {
      title: "Nova Venda",
      description: "Iniciar um novo pedido",
      icon: ShoppingCart,
      action: () => navigate("/orders"),
      color: "bg-primary hover:bg-primary/90"
    },
    {
      title: "Produtos",
      description: "Gerenciar estoque",
      icon: Package,
      action: () => navigate("/products"),
      color: "bg-accent hover:bg-accent/90"
    },
    {
      title: "Pagamentos",
      description: "Processar pagamento",
      icon: CreditCard,
      action: () => navigate("/payment"),
      color: "bg-wine hover:bg-wine-dark"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Wine className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">PDV Adegas</h1>
                <p className="text-xs text-muted-foreground">Sistema de Vendas</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-foreground">Operador</p>
                <p className="text-xs text-muted-foreground">{userCPF}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Painel de Controle
          </h2>
          <p className="text-muted-foreground">
            Gerencie suas vendas, produtos e pagamentos
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  <span className="text-sm font-medium text-green-600">
                    {stat.trend}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            Ações Rápidas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <Card 
                key={index}
                className="cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1"
                onClick={action.action}
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center mb-3`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>{action.title}</CardTitle>
                  <CardDescription>{action.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Atividade Recente
            </CardTitle>
            <CardDescription>
              Últimas transações e movimentações
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "Venda realizada", value: "R$ 185,00", time: "5 min atrás" },
                { action: "Produto adicionado", value: "Vinho Tinto", time: "12 min atrás" },
                { action: "Pagamento recebido", value: "R$ 320,00", time: "25 min atrás" },
                { action: "Venda realizada", value: "R$ 95,00", time: "1 hora atrás" }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div>
                    <p className="font-medium text-foreground">{item.action}</p>
                    <p className="text-sm text-muted-foreground">{item.time}</p>
                  </div>
                  <p className="font-semibold text-foreground">{item.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
