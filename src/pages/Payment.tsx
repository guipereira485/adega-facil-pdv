import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, CreditCard, Banknote, QrCode, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart = [], total = 0 } = location.state || {};
  
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cash" | "pix">("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: ""
  });

  const [cashData, setCashData] = useState({
    received: "",
    change: 0
  });

  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    return numbers.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
  };

  const formatExpiry = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length >= 2) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}`;
    }
    return numbers;
  };

  const calculateChange = (received: string) => {
    const receivedValue = parseFloat(received) || 0;
    const change = receivedValue - total;
    setCashData({ received, change: change > 0 ? change : 0 });
  };

  const handlePayment = async () => {
    setIsProcessing(true);

    // Validações
    if (paymentMethod === "card") {
      if (!cardData.number || !cardData.name || !cardData.expiry || !cardData.cvv) {
        toast.error("Preencha todos os dados do cartão");
        setIsProcessing(false);
        return;
      }
    }

    if (paymentMethod === "cash") {
      const received = parseFloat(cashData.received) || 0;
      if (received < total) {
        toast.error("Valor recebido é menor que o total");
        setIsProcessing(false);
        return;
      }
    }

    // Simula processamento
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentComplete(true);
      toast.success("Pagamento processado com sucesso!");
    }, 2000);
  };

  if (paymentComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Pagamento Aprovado!
            </h2>
            <p className="text-muted-foreground mb-6">
              A venda foi registrada com sucesso
            </p>
            
            <div className="bg-muted/50 rounded-lg p-4 mb-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Método</span>
                <span className="font-medium">
                  {paymentMethod === "card" ? "Cartão de Crédito" : 
                   paymentMethod === "cash" ? "Dinheiro" : "PIX"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total</span>
                <span className="font-bold text-primary">R$ {total.toFixed(2)}</span>
              </div>
              {paymentMethod === "cash" && cashData.change > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Troco</span>
                  <span className="font-medium">R$ {cashData.change.toFixed(2)}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Button 
                className="w-full"
                onClick={() => navigate("/orders")}
              >
                Nova Venda
              </Button>
              <Button 
                variant="outline"
                className="w-full"
                onClick={() => navigate("/dashboard")}
              >
                Voltar ao Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/orders")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Pagamento</h1>
              <p className="text-xs text-muted-foreground">Processar Venda</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Method Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Forma de Pagamento</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={(value: any) => setPaymentMethod(value)}
                  className="grid grid-cols-3 gap-4"
                >
                  <div>
                    <RadioGroupItem
                      value="card"
                      id="card"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="card"
                      className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-background p-4 hover:bg-muted/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                    >
                      <CreditCard className="mb-2 h-6 w-6" />
                      <span className="text-sm font-medium">Cartão</span>
                    </Label>
                  </div>

                  <div>
                    <RadioGroupItem
                      value="cash"
                      id="cash"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="cash"
                      className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-background p-4 hover:bg-muted/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                    >
                      <Banknote className="mb-2 h-6 w-6" />
                      <span className="text-sm font-medium">Dinheiro</span>
                    </Label>
                  </div>

                  <div>
                    <RadioGroupItem
                      value="pix"
                      id="pix"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="pix"
                      className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-background p-4 hover:bg-muted/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                    >
                      <QrCode className="mb-2 h-6 w-6" />
                      <span className="text-sm font-medium">PIX</span>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Payment Details */}
            <Card>
              <CardHeader>
                <CardTitle>Detalhes do Pagamento</CardTitle>
              </CardHeader>
              <CardContent>
                {paymentMethod === "card" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Número do Cartão</Label>
                      <Input
                        id="cardNumber"
                        placeholder="0000 0000 0000 0000"
                        value={cardData.number}
                        onChange={(e) => setCardData({ 
                          ...cardData, 
                          number: formatCardNumber(e.target.value) 
                        })}
                        maxLength={19}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardName">Nome no Cartão</Label>
                      <Input
                        id="cardName"
                        placeholder="NOME COMPLETO"
                        value={cardData.name}
                        onChange={(e) => setCardData({ 
                          ...cardData, 
                          name: e.target.value.toUpperCase() 
                        })}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Validade</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/AA"
                          value={cardData.expiry}
                          onChange={(e) => setCardData({ 
                            ...cardData, 
                            expiry: formatExpiry(e.target.value) 
                          })}
                          maxLength={5}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          type="password"
                          placeholder="000"
                          value={cardData.cvv}
                          onChange={(e) => setCardData({ 
                            ...cardData, 
                            cvv: e.target.value.replace(/\D/g, "") 
                          })}
                          maxLength={4}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "cash" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="received">Valor Recebido (R$)</Label>
                      <Input
                        id="received"
                        type="number"
                        step="0.01"
                        placeholder="0,00"
                        value={cashData.received}
                        onChange={(e) => calculateChange(e.target.value)}
                      />
                    </div>

                    {cashData.change > 0 && (
                      <div className="p-4 bg-accent/20 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Troco</p>
                        <p className="text-2xl font-bold text-accent">
                          R$ {cashData.change.toFixed(2)}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {paymentMethod === "pix" && (
                  <div className="text-center py-6">
                    <div className="w-48 h-48 bg-muted rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <QrCode className="w-32 h-32 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Escaneie o QR Code para pagar
                    </p>
                    <p className="font-mono text-xs text-muted-foreground">
                      00020126360014BR.GOV.BCB.PIX0114+5519999999999
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {cart.map((item: any) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.quantity}x {item.name}
                      </span>
                      <span className="font-medium">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">R$ {total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full mt-4" 
                    size="lg"
                    onClick={handlePayment}
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processando..." : "Confirmar Pagamento"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Payment;
