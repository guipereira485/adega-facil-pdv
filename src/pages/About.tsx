import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Wine, ArrowLeft, Users, Target, Code } from "lucide-react";

const About = () => {
  const navigate = useNavigate();

  const teamMembers = [
    { name: "Guilherme Pereira", role: "Desenvolvedor" },
    { name: "Jeferson Nepomuceno", role: "Desenvolvedor" },
    { name: "Pablo Lima", role: "Desenvolvedor" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-wine via-wine-dark to-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Button
              variant="ghost"
              className="mb-6 text-white hover:bg-white/10"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>

            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-3xl mb-6">
              <Wine className="w-12 h-12 text-white" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Sobre o Smartmalte
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Conheça o projeto e a equipe por trás do sistema
            </p>
          </div>

          {/* Sobre o Sistema */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-8">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Sobre o Sistema</h2>
              </div>
              <p className="text-white/90 leading-relaxed mb-4">
                O Smartmalte é um sistema completo de ponto de venda desenvolvido especialmente 
                para pequenas adegas e lojas de bebidas. Com uma interface moderna e intuitiva, 
                o sistema oferece controle completo de vendas, estoque, pagamentos e relatórios.
              </p>
              <p className="text-white/90 leading-relaxed">
                Desenvolvido como Projeto Integrador do 5º semestre do curso de Análise e 
                Desenvolvimento de Sistemas da FATEC Indaiatuba, o Smartmalte integra os 
                conhecimentos das disciplinas de Engenharia de Software III, Programação para 
                Dispositivos Móveis e Laboratório de Banco de Dados.
              </p>
            </CardContent>
          </Card>

          {/* Funcionalidades */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-8">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Principais Funcionalidades</h2>
              </div>
              <ul className="space-y-3 text-white/90">
                <li className="flex items-start gap-2">
                  <span className="text-white/60 mt-1">•</span>
                  <span>Sistema de autenticação com validação de CPF</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white/60 mt-1">•</span>
                  <span>Gestão completa de produtos e controle de estoque</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white/60 mt-1">•</span>
                  <span>Sistema de vendas com carrinho e busca por código de barras</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white/60 mt-1">•</span>
                  <span>Múltiplas formas de pagamento (Cartão, Dinheiro, PIX)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white/60 mt-1">•</span>
                  <span>Dashboard com estatísticas e indicadores de performance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white/60 mt-1">•</span>
                  <span>Interface responsiva e moderna</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Equipe */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Equipe de Desenvolvimento</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className="bg-white/5 rounded-lg p-4 border border-white/10"
                  >
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm text-white/70">{member.role}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-12">
            <p className="text-white/60 text-sm">
              FATEC Indaiatuba - Análise e Desenvolvimento de Sistemas
            </p>
            <p className="text-white/60 text-sm mt-2">
              Projeto Integrador - 2º Semestre de 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
