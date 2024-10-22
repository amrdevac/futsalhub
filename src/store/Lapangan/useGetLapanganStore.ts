import { create } from "zustand";
import {
  AxiosErrorHandlerStore,
  DataError,
} from "../ConfirmDialog/useBasicErrorConfirm";

interface useLapanganInterface {
  dataError: DataError;
}

const useGetLapanganStore = create<useLapanganInterface>((set) => ({
  ...AxiosErrorHandlerStore(set),
}));

export default useGetLapanganStore;
