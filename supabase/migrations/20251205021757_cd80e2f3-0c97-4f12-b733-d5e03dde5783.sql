
-- Enum para métodos de pagamento
CREATE TYPE public.payment_method AS ENUM ('cash', 'credit_card', 'debit_card', 'pix');

-- Enum para status de venda
CREATE TYPE public.sale_status AS ENUM ('pending', 'completed', 'cancelled');

-- Enum para status de pagamento
CREATE TYPE public.payment_status AS ENUM ('pending', 'approved', 'rejected', 'refunded');

-- Tabela de perfis de usuários (vendedores)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  cpf TEXT UNIQUE,
  role TEXT DEFAULT 'seller',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Tabela de clientes
CREATE TABLE public.customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  cpf TEXT UNIQUE,
  email TEXT,
  phone TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Tabela de produtos
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  sku TEXT UNIQUE,
  barcode TEXT UNIQUE,
  price DECIMAL(10,2) NOT NULL,
  cost_price DECIMAL(10,2),
  stock_quantity INTEGER DEFAULT 0 NOT NULL,
  min_stock INTEGER DEFAULT 5,
  category TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Tabela de vendas
CREATE TABLE public.sales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID REFERENCES public.profiles(id) NOT NULL,
  customer_id UUID REFERENCES public.customers(id),
  status public.sale_status DEFAULT 'pending' NOT NULL,
  subtotal DECIMAL(10,2) DEFAULT 0 NOT NULL,
  discount DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) DEFAULT 0 NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Tabela de itens de venda
CREATE TABLE public.sale_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sale_id UUID REFERENCES public.sales(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Tabela de pagamentos
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sale_id UUID REFERENCES public.sales(id) ON DELETE CASCADE NOT NULL,
  method public.payment_method NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  status public.payment_status DEFAULT 'pending' NOT NULL,
  transaction_id TEXT,
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS em todas as tabelas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sale_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- RLS Policies para profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies para customers (todos usuários autenticados podem gerenciar)
CREATE POLICY "Authenticated users can view customers" ON public.customers
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert customers" ON public.customers
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update customers" ON public.customers
  FOR UPDATE TO authenticated USING (true);

-- RLS Policies para products (todos usuários autenticados podem gerenciar)
CREATE POLICY "Authenticated users can view products" ON public.products
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert products" ON public.products
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update products" ON public.products
  FOR UPDATE TO authenticated USING (true);

-- RLS Policies para sales
CREATE POLICY "Authenticated users can view sales" ON public.sales
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert sales" ON public.sales
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update sales" ON public.sales
  FOR UPDATE TO authenticated USING (true);

-- RLS Policies para sale_items
CREATE POLICY "Authenticated users can view sale items" ON public.sale_items
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert sale items" ON public.sale_items
  FOR INSERT TO authenticated WITH CHECK (true);

-- RLS Policies para payments
CREATE POLICY "Authenticated users can view payments" ON public.payments
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert payments" ON public.payments
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update payments" ON public.payments
  FOR UPDATE TO authenticated USING (true);

-- Trigger para criar perfil automaticamente ao criar usuário
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (new.id, COALESCE(new.raw_user_meta_data ->> 'full_name', 'Usuário'));
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON public.customers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_sales_updated_at BEFORE UPDATE ON public.sales
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
