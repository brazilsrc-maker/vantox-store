export type Product = {
  id: string;
  slug: string | null;
  name: string;
  supplier_price: number | null;
  sale_price: number;
  supplier_url: string | null;
  description: string | null;
  video_url: string | null;
};
