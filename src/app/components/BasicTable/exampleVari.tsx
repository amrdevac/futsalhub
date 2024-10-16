import { numbFormatRupiah } from "@/utils/NumberFormat";
import { MoreVert } from "@mui/icons-material";

interface Product {
  id: number; // ID produk, bertipe number
  title: string; // Judul produk, bertipe string
  price: number; // Harga produk, bertipe string (jika ingin menyimpan sebagai string)
  thumbnail: string; // Link thumbnail produk, bertipe string
}

export const data: Product[] = [
  {
    id: 1,
    title: "Produk A",
    price: 100000,
    thumbnail: "link_to_thumbnail_a.jpg",
  },
  {
    id: 2,
    title: "Produk B",
    price: 200000,
    thumbnail: "link_to_thumbnail_b.jpg",
  },
  {
    id: 3,
    title: "Produk C",
    price: 150000,
    thumbnail: "link_to_thumbnail_c.jpg",
  },
  {
    id: 4,
    title: "Produk D",
    price: 300000,
    thumbnail: "link_to_thumbnail_d.jpg",
  },
  {
    id: 5,
    title: "Produk E",
    price: 250000,
    thumbnail: "link_to_thumbnail_e.jpg",
  },
  {
    id: 5,
    title: "Produk E",
    price: 250000,
    thumbnail: "link_to_thumbnail_e.jpg",
  },
  {
    id: 5,
    title: "Produk E",
    price: 250000,
    thumbnail: "link_to_thumbnail_e.jpg",
  },
  {
    id: 5,
    title: "Produk E",
    price: 250000,
    thumbnail: "link_to_thumbnail_e.jpg",
  },
  {
    id: 5,
    title: "Produk E",
    price: 250000,
    thumbnail: "link_to_thumbnail_e.jpg",
  },
  {
    id: 5,
    title: "Produk E",
    price: 250000,
    thumbnail: "link_to_thumbnail_e.jpg",
  },
  // Tambahkan hingga 20 data atau lebih sesuai kebutuhan
];

export const frameData = {
  column: "arrData",
  data: [
    // { col: "ID", val: "id", type: "string", align: "center" },
    { col: "Title", val: "title", type: "string", align: "center" },
    {
      col: "Price",
      val: "price",
      type: "custom",
      align: "center",
      custom: (e: Product) => {
        return numbFormatRupiah(e.price);
      },
    },
    {
      col: "Thumbnail",
      val: "thumbnail",
      type: "link",
      align: "center",
      link_handler: (obj: any) => window.open(obj.thumbnail),
    },
  ],
  action: {
    th_name: <MoreVert />,
    list: [
      {
        name: "Edit",
        handler: (item: any) => console.log("Edit", item),
        icon: <i className="fas fa-edit text-green-500" />,
      },
      {
        name: "Delete",
        handler: (item: any) => console.log("Delete", item),
        icon: <i className="fas fa-trash text-red-500" />,
      },
    ],
  },
};
