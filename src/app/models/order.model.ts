export interface Order {
  id: string;
  userId: string;
  username: string;
  date: Date;
  status: 'pending' | 'accepted' | 'rejected';
  totalPrice: number;
  items:{
     productId: string;
    title: string;
    quantity: number;
    price: number;
  }[];}