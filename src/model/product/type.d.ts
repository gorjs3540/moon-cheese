interface BaseProduct {
  id: number;
  name: string;
  stock: number;
  price: number;
  description: string;
  detailDescription: string;
  images: string[];
  rating: number;
}

interface CheeseProduct extends BaseProduct {
  category: 'CHEESE';
}

interface CrackerProduct extends BaseProduct {
  category: 'CRACKER';
  isGlutenFree?: boolean;
}

interface TeaProduct extends BaseProduct {
  category: 'TEA';
  isCaffeineFree?: boolean;
}

type Product = CheeseProduct | CrackerProduct | TeaProduct;

interface RecentProduct {
  id: number;
  thumbnail: string;
  name: string;
  price: number;
}
