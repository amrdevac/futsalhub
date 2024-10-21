import { Interface } from "readline"; // Import Interface dari modul readline (sepertinya ini tidak digunakan di kode, bisa dihapus)
import { create, StoreApi, UseBoundStore } from "zustand"; // Import fungsi dan tipe dari Zustand untuk membuat state global
import useConfirmInfoStore from "./useConfirmInfoStore"; // Import custom store untuk confirm info
import useLoadingStore from "../LoadingStore/useLoadingStore"; // Import custom store untuk handling loading

// Definisikan tipe untuk DetailError

// Base interface untuk DetailError, mendefinisikan properti dasar typeError
export interface DetailErrorBase {
  typeError: "looping" | "text";
}

// Interface DetailError untuk jenis kesalahan tipe "text"
export interface DetailErrorText extends DetailErrorBase {
  colError: string; // Kolom yang mengalami error
  typeError: "text"; // TypeError "text" untuk error jenis text
  typeValue?: "objectArr" | "arr"; // typeValue opsional untuk mendeskripsikan jenis data yang error
  objError?: string; // objError opsional untuk mendeskripsikan objek yang error
}

// Interface DetailError untuk jenis kesalahan tipe "looping"
export interface DetailErrorLooping extends DetailErrorBase {
  colError: string; // Kolom yang mengalami error
  typeError: "looping"; // TypeError "looping" untuk error jenis looping
  typeValue: "objectArr" | "arr"; // typeValue wajib untuk jenis data yang error
  objColError: string; // objColError wajib untuk mendeskripsikan kolom objek yang error
}

// Gabungkan kedua interface di atas dalam satu tipe DetailError
export type DetailError = DetailErrorText | DetailErrorLooping;

// Definisikan state utama untuk store konfirmasi
interface ConfirmationState {
  dialogBtnResult: any | null; // Hasil dari tombol dialog, bisa null atau value apapun
  showFinishModal: boolean; // Apakah modal selesai (finish) akan ditampilkan
  showConfirm: boolean; // Apakah modal konfirmasi akan ditampilkan
  activity: any | null; // Menyimpan aktivitas yang sedang berlangsung
  onErrorStop: boolean; // Menghentikan proses jika ada error
  confirmText: string; // Menyimpan teks konfirmasi yang akan ditampilkan di dialog
  btnOk: string; // Teks untuk tombol Ok
  useStore: UseBoundStore<StoreApi<any>>; // Store yang digunakan untuk mendapatkan state yang diperlukan
  btnCancel: string; // Teks untuk tombol Batal
  showBtnCancel: boolean; // Apakah tombol batal akan ditampilkan
  isError: boolean; // Menandakan apakah ada error
  errorMatrix: DetailError; // Menyimpan detail dari error yang terjadi
  actionOk: {
    // Array dari action yang akan dijalankan jika tombol OK diklik
    run: () => void; // Fungsi yang akan dijalankan
    loadingText?: string; // Opsional teks loading
    detailError?: DetailError; // Opsional detail error yang terkait dengan action
  }[];
  isLoading: boolean; // Status loading
  withCustomLoading: boolean; // Apakah menggunakan custom loading
  finishText: string; // Teks yang ditampilkan saat proses selesai
  idModal: string; // ID modal untuk konfirmasi

  // Fungsi untuk memunculkan dialog konfirmasi
  confirmDialog: (payload: Partial<ConfirmationState>) => void;
  // Fungsi untuk menangani hasil dialog konfirmasi
  confirmDialogResult: (result: any) => void;
  // Fungsi untuk menangani hasil dialog konfirmasi secara lebih lanjut
  confirmDialogResultHandler: (result: any) => void;
  // Set apakah modal konfirmasi akan ditampilkan
  setShowConfirm: (show: boolean) => void;
  // Set apakah modal selesai akan ditampilkan
  setShowFinishModal: (show: boolean) => void;
  // Set status loading
  setLoading: (loading: boolean) => void;
}

// Objek untuk menyimpan teks aktivitas konfirmasi
const activity: { [key: string]: string } = {};
activity["save"] = "Apakah Anda yakin ingin menyimpan data?"; // Teks konfirmasi untuk aksi simpan
activity["delete"] = "Apakah Anda yakin ingin menghapus data?"; // Teks konfirmasi untuk aksi hapus
activity["update"] = "Apakah Anda yakin ingin memperbarui data?"; // Teks konfirmasi untuk aksi perbarui

// Membuat store Zustand untuk konfirmasi
export const useConfirmationStore = create<ConfirmationState>((set, get) => ({
  dialogBtnResult: null, // Inisialisasi dialogBtnResult ke null
  showFinishModal: true, // Inisialisasi modal finish sebagai terlihat
  showConfirm: true, // Inisialisasi modal konfirmasi sebagai terlihat
  activity: null, // Inisialisasi activity ke null
  onErrorStop: true, // Menghentikan proses jika error
  confirmText: "", // Inisialisasi teks konfirmasi kosong
  btnOk: "Ok", // Default teks tombol OK
  useStore: create((set) => ({})), // Inisialisasi store yang kosong
  btnCancel: "Batal", // Default teks tombol Batal
  showBtnCancel: true, // Default tombol batal akan ditampilkan
  isError: false, // Inisialisasi tidak ada error
  errorMatrix: {
    // Inisialisasi error matrix kosong
    colError: "",
    objColError: "",
    typeError: "text",
  },
  actionOk: [], // Inisialisasi array kosong untuk action OK
  isLoading: false, // Tidak dalam status loading
  withCustomLoading: false, // Tidak menggunakan custom loading
  finishText: "Proses berhasil", // Default teks jika proses berhasil
  idModal: "modal_confirm", // Default ID modal konfirmasi

  // Fungsi untuk mengatur dan menampilkan dialog konfirmasi
  confirmDialog: (payload) => {
    set((state) => ({
      ...state,
      ...payload,
      confirmText: payload.activity
        ? activity[payload.activity]
        : payload.confirmText,
    }));
    if (get().idModal) {
      // Jika idModal ada, tampilkan modal
      const dialog = document.getElementById(
        get().idModal || "modal_confirm" // Ambil elemen modal dengan ID
      ) as HTMLDialogElement;
      if (dialog) {
        dialog.showModal(); // Tampilkan modal jika ditemukan
      }
    }
  },

  // Fungsi untuk menyimpan hasil dari dialog konfirmasi
  confirmDialogResult: (result) =>
    set((state) => ({ ...state, dialogBtnResult: result })), // Update hasil dialog ke state
  setShowConfirm: (show) => set({ showConfirm: show }), // Mengatur apakah modal konfirmasi akan ditampilkan
  setShowFinishModal: (show) => set({ showFinishModal: show }), // Mengatur apakah modal selesai akan ditampilkan
  setLoading: (loading) => set({ isLoading: loading }), // Mengatur status loading

  // Fungsi untuk menangani hasil dari dialog konfirmasi secara berurutan
  confirmDialogResultHandler: async (state) => {
    const { actionOk, onErrorStop, showFinishModal, useStore } = get(); // Ambil state yang diperlukan
    const loadingStore = useLoadingStore.getState(); // Ambil state dari loading store
    const confirmInfoStore = useConfirmInfoStore.getState(); // Ambil state dari confirm info store
    const confirmInfo = document.getElementById(
      "confirm-info"
    ) as HTMLDialogElement;

    const runFunctionsSequentially = async () => {
      for (const func of actionOk) {
        loadingStore.setShowLoading({ isLoading: true }); // Set loading store menjadi true
        loadingStore.setLoadingText(func.loadingText); // Set teks loading jika ada
        try {
          await func.run(); // Coba jalankan fungsi run
        } catch (error: unknown) {
          const objError = error as Error;
          confirmInfoStore.setDetailInfo({ msg: objError.message });

          const storeImpleneter = useStore.getState();
          console.log(storeImpleneter.dataError.msgError)
          if (storeImpleneter.dataError.isError && storeImpleneter.dataError) {
            set(() => ({ errorMatrix: func.detailError }));
            confirmInfoStore.setDetailInfo({
              msg: storeImpleneter.dataError.msgError,
              obj: storeImpleneter.dataError,
            });
          }

          if (onErrorStop) {
            confirmInfo.showModal();
            loadingStore.setShowLoading({ isLoading: false });
            return false;
          }
        }
      }

      set({
        isError: false, // Reset isError menjadi false
        isLoading: false, // Set loading menjadi false
        showConfirm: true, // Tampilkan modal konfirmasi lagi
      });
      loadingStore.setShowLoading({ isLoading: false });
      confirmInfoStore.setDetailInfo({ msg: get().finishText });
      if (showFinishModal) confirmInfo.showModal();
      set({ showFinishModal: true });
    };

    await runFunctionsSequentially(); // Jalankan fungsi actionOk secara berurutan
  },
}));
