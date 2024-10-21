import { create } from "zustand";

interface loadingVar {
  loadingTag: "basic" | "v2" | "v3";
  isLoading: boolean;
  loadingText: string;
}

interface useLoadingState extends loadingVar {
  setLoadingText: (payload?: string) => void;
  setShowLoading: (payload: Partial<loadingVar>) => void;
}

const useLoadingStore = create<useLoadingState>((set, get) => ({
  loadingTag: "basic",
  loadingText: "",
  isLoading: false,

  setShowLoading: async (payload) => {
    set((state) => ({
      isLoading: payload.isLoading,
    }));
  },
  setLoadingText: (payload) => {
    set(() => ({
      loadingText: payload,
    }));
  },
}));

export default useLoadingStore;
