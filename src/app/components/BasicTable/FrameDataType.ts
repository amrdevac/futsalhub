interface Column {
  val: string; // Nama properti dalam item
  col: string; // Nama kolom yang ditampilkan
  type?: "string" | "number" | "text" | "link" | "custom"; // Tipe kolom
  align?: "left" | "center" | "right"; // Penjajaran teks
  substring?: number; // Panjang substring untuk pemotongan teks
  custom?: (item: any) => any; // Fungsi untuk render custom
  link_handler?: (item: any) => void; // Handler untuk link
}

export interface ActionItem {
  name: string; // Nama aksi
  icon: JSX.Element; // Ikon untuk aksi
  handler: (item: any) => void; // Fungsi yang dipanggil saat aksi di-trigger
}

export interface FrameData {
  data: Column[]; // Array kolom
  action?: {
    th_name?: any; // Nama header untuk kolom aksi
    list: ActionItem[]; // Daftar aksi
  };
}
