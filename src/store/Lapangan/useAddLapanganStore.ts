import { create } from "zustand";

interface form {
  nama_lapangan: string; // Nama Lapangan
  jenis_lapangan: string; // Jenis Lapangan
  ukuran_lapangan: string; // Ukuran Lapangan (dari input mask)
  kapasitas_pemain: string; // Kapasitas Pemain
  fasilitas: string; // Fasilitas
  harga_sewa: string; // Harga Sewa per Jam
  ketersediaan: string; // Ketersediaan
  waktu_operasional: string; // Waktu Operasional
  keterangan_tambahan?: string; // Keterangan Tambahan (optional)
}

interface useLapanganInterface {
  form: form;
  setForm: <HASIL_EXTENDS extends keyof form>({
    col,
    val,
  }: {
    col: HASIL_EXTENDS;
    val: form[HASIL_EXTENDS];
  }) => void;
}
const useAddLapanganStore = create<useLapanganInterface>((set) => ({
  form: {
    nama_lapangan: "",
    jenis_lapangan: "",
    ukuran_lapangan: "",
    kapasitas_pemain: "",
    fasilitas: "", // Inisialisasi dengan tipe number
    harga_sewa: "",
    ketersediaan: "tersedia",
    waktu_operasional: "",
    keterangan_tambahan: "",
  },
  setForm: ({ col, val }) => {
    set((state) => ({
      form: {
        ...state.form,
        [col]: val,
      },
    }));
  },
}));

export default useAddLapanganStore;
