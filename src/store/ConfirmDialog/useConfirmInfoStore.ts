import { create } from "zustand";
interface infoStruct {
  msg: string;
  obj: any;
}

interface useConfirmInfo {
  info: infoStruct;
  loadingText: string;
  setDetailInfo: (payload: Partial<infoStruct>) => void;
}
const useConfirmInfoStore = create<useConfirmInfo>((set, get) => ({
  loadingText: "Loading",
  info: {
    msg: "",
    detailErrorMsg: "",
    obj: "",
  },

  setDetailInfo: (payload) => {
    set({
      info: {
        msg: payload.msg ?? "",
        obj: payload.obj,
      },
    });
  }
}));

export default useConfirmInfoStore;
