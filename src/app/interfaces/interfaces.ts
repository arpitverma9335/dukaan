export interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  imageUrl: string;
  rating: number;
  existsInCart: boolean;
}

export interface Cart {
  userId: string;
  totalItems: number;
  items: {
    productId: {
      _id: string;
      name: string;
      price: number;
      category: string;
      description: string;
      imageUrl: string;
      rating: number;
      stock: number;
    };
    quantity: number;
    price: number;
    _id: string;
  }[];
  totalPrice: number;
}

export interface Address {
  userId: string;
  name: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zip: string;
}

export interface OrderDetails {
  _id: string;
  userId: string; 
  items: {
    productId: {
      _id: string;
      name: string;
      price: number;
      category: string;
      description: string;  
      imageUrl: string;
      rating: number;
    };  
    quantity: number;
    price: number;
  }[];
  totalPrice: number;
  shipping: Address;
  status: string;
  date: Date;
}

export interface OrderSummary {
  _id: string;
  items: {
    productId: {
      name: string;
      imageUrl: string;
    };  
    quantity: number;
  }[];
  totalPrice: number;
  status: string;
  date: Date;
}