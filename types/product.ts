export type Product = {
  _id: number;
  price: number;
  weight: string;
  analytics_title: string;
  unit: string;
  analytics_category_title: string;
  title: string;
  description: string;
  promotion_text: string;
  url: string;
  route: string;
  open_graph: string;
  count?: number | undefined;
  modifiers: any[];
  image: {
    large: string;
    medium: string;
    small: string;
  };
  tags: string[];
  options: boolean;
};