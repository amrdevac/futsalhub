export interface DataError {
  isError: boolean;
  msgError: string;
  dataError: any;
}

export interface SetError {
  setError: ({ col, val }: { col: string; val: string }) => void;
}

// Helper function untuk menginisialisasi `dataError` dan `setError`
export const AxiosErrorHandlerStore = (set: any) => ({
  dataError: {
    isError: false,
    msgError: "",
    dataError: null,
  } as DataError,

  setError: ({ col, val }: { col: string; val: string }) => {
    set((state: any) => ({
      dataError: {
        ...state.dataError,
        [col]: val,
      },
    }));
  },
});
