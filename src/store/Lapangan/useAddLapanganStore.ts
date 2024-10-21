import { create } from "zustand";
import {
  AxiosErrorHandlerStore,
  DataError,
} from "../ConfirmDialog/useBasicErrorConfirm";

interface form {
  nama: string; // Nama Lapangan
  jenis: string; // Jenis Lapangan
  ukuran: string; // Ukuran Lapangan (dari input mask)
  kapasitas_pemain: string; // Kapasitas Pemain
  fasilitas: string; // Fasilitas
  harga_sewa: string; // Harga Sewa per Jam
  ketersediaan: string; // Ketersediaan
  waktu_oprasional: string; // Waktu Operasional
  keterangan_tambahan?: string; // Keterangan Tambahan (optional)
}

interface useLapanganInterface {
  form: form;
  dataError: DataError;
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
    nama: "",
    jenis: "",
    ukuran: "",
    fasilitas: "",
    harga_sewa: "",
    ketersediaan: "tersedia",
    waktu_oprasional: "",
    kapasitas_pemain: "", 
    keterangan_tambahan: "",
  },
  ...AxiosErrorHandlerStore(set),
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
