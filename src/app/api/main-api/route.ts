import { MainAPIRequest } from "@/utils/axios/axiosVariable";
import axios from "axios";

export async function POST(req: any) {
  let body;
  try {
    body = (await req.json()) as MainAPIRequest;
  } catch (error) {
    body = {};
  }
  try {
    const baseURL = process.env.NEXT_API_URL_BACKEND ?? "##";
    const axiosInstance = axios.create({
      baseURL: baseURL,
      method: body.method, 
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await axiosInstance(body.endpoint ?? "", {
      data: body.data,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return Response.json({
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers,
        });
      } else if (error.request) {
        console.error("No Response Received: ", error.request);
      } else {
        console.error("Error Setting Up Request: ", error.message);
      }
    }
    const instanceError = error as Error;
    return Response.json(
      { message: instanceError.message, status: false },
      { status: 500 }
    );
  }
  return Response.json({ data: body });
}
