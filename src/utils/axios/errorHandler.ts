import axios from "axios";

const msgError = {
  unknown: "Terjadi kesalahan yang tidak diketahui.",
  responseNull: "Terjadi kesalahan, tidak ada respons dari server.",
};
export const axiosErrHandler = (error: unknown, request: any) => {
  let msg = msgError.unknown;
  let dataError = null;
  if (axios.isAxiosError(error)) {
    const nativeError = error.response?.data;
    msg = nativeError?.message || msgError.responseNull;
    dataError = nativeError || null;
  }

  
  request.errorStore.setError({ col: "isError", val: true });
  request.errorStore.setError({ col: "msgError", val: msg });

  if (dataError) {
    request.errorStore.setError({ col: "dataError", val: dataError });
  }

  throw error;
};
