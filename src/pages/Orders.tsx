import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Minus, ShoppingCart, Trash2, CreditCard } from "lucide-react";
import { toast } from "sonner";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
}

const Orders = () => {
  const navigate = useNavigate();
  const [searchCode, setSearchCode] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);

  const availableProducts: Product[] = [
    { id: 1, name: "Vinho Tinto Reserva", price: 89.90 },
    { id: 2, name: "Vinho Branco Seco", price: 65.00 },
    { id: 3, name: "Espumante Brut", price: 125.00 },
    { id: 4, name: "Whisky Single Malt", price: 280.00 },
    { id: 5, name: "Vodka Premium", price: 95.00 },
    { id: 6, name: "Cerveja Artesanal IPA", price: 18.50 },
  ];

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    
    toast.success(`${product.name} adicionado ao carrinho`);
  };

  const updateQuantity = (id: number, change: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
    toast.success("Item removido do carrinho");
  };

  const getTotalItems = () => cart.reduce((sum, item) => sum + item.quantity, 0);
  const getTotalPrice = () => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Carrinho vazio", {
        description: "Adicione produtos antes de finalizar"
      });
      return;
    }
    navigate("/payment", { state: { cart, total: getTotalPrice() } });
  };

  const handleBarcodeScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchCode) {
      // Simula busca por código
      const product = availableProducts[Math.floor(Math.random() * availableProducts.length)];
      addToCart(product);
      setSearchCode("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/dashboard")}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Nova Venda</h1>
                <p className="text-xs text-muted-foreground">Registrar Pedido</p>
              </div>
            </div>
            
            <Badge variant="outline" className="text-lg px-4 py-2">
              {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'itens'}
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Products Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Barcode Scanner */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Código de Barras</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBarcodeScan} className="flex gap-2">
                  <Input
                    placeholder="Escaneie ou digite o código de barras..."
                    value={searchCode}
                    onChange={(e) => setSearchCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit">Buscar</Button>
                </form>
              </CardContent>
            </Card>

            {/* Products Grid */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">Produtos Disponíveis</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {availableProducts.map((product) => (
                  <Card 
                    key={product.id}
                    className="cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1"
                    onClick={() => addToCart(product)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-foreground">{product.name}</h3>
                        <Plus className="w-5 h-5 text-primary" />
                      </div>
                      <p className="text-xl font-bold text-primary">
                        R$ {product.price.toFixed(2)}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Cart Section */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Carrinho
                </CardTitle>
              </CardHeader>
              <CardContent>
                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">Carrinho vazio</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
                      {cart.map((item) => (
                        <div 
                          key={item.id}
                          className="p-3 rounded-lg bg-muted/50 space-y-2"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="font-medium text-sm">{item.name}</p>
                              <p className="text-sm text-muted-foreground">
                                R$ {item.price.toFixed(2)} un.
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, -1)}
                                className="h-8 w-8 p-0"
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span className="w-8 text-center font-semibold">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, 1)}
                                className="h-8 w-8 p-0"
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                            <p className="font-bold text-primary">
                              R$ {(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium">R$ {getTotalPrice().toFixed(2)}</span>
                      </div>
                      
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-primary">R$ {getTotalPrice().toFixed(2)}</span>
                      </div>

                      <Button 
                        className="w-full gap-2" 
                        size="lg"
                        onClick={handleCheckout}
                      >
                        <CreditCard className="w-5 h-5" />
                        Finalizar Venda
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Orders;
