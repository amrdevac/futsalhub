import axios from "axios";
import { axiosErrHandler } from "./errorHandler";

export interface MainAPIRequest {
  endpoint: string,
  method: string,
  data: any,
  errorStore?: any,
}

const mainAPI = async (request: MainAPIRequest) => {
  try {
    return await axios.post("/api/main-api", request);
  } catch (error: any) {
    return axiosErrHandler(error, request); 
  }
};

export default mainAPI;
