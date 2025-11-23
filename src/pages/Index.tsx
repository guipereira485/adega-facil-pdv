import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Wine, ShoppingCart, Package, CreditCard, Shield, BarChart3 } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: ShoppingCart,
      title: "Vendas Rápidas",
      description: "Interface intuitiva para processamento ágil de vendas"
    },
    {
      icon: Package,
      title: "Gestão de Estoque",
      description: "Controle completo do inventário de produtos"
    },
    {
      icon: CreditCard,
      title: "Múltiplos Pagamentos",
      description: "Aceite cartão, dinheiro e PIX"
    },
    {
      icon: Shield,
      title: "Seguro e Confiável",
      description: "Sistema com criptografia e validações robustas"
    },
    {
      icon: BarChart3,
      title: "Relatórios",
      description: "Acompanhe suas vendas e performance"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-wine via-wine-dark to-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-3xl mb-6">
            <Wine className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Smartmalte
          </h1>
          
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Sistema completo de ponto de venda para sua adega. 
            Gerencie vendas, estoque e pagamentos de forma simples e eficiente.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg"
              className="text-lg px-8 bg-white text-wine hover:bg-white/90"
              onClick={() => navigate("/login")}
            >
              Acessar Sistema
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="text-lg px-8 bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20"
            >
              Saiba Mais
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-white/80">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="border-t border-white/20 pt-8">
            <p className="text-white/60 text-sm mb-2">
              Projeto Integrador - 5º Semestre
            </p>
            <p className="text-white/60 text-sm">
              FATEC Indaiatuba - Análise e Desenvolvimento de Sistemas
            </p>
            <p className="text-white/40 text-xs mt-4">
              © 2025 Smartmalte. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
