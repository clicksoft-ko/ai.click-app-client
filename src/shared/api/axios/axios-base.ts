import { envUtil } from "@/shared/utils/env";
import axios from "axios";

export const axiosBase = axios.create({
  baseURL: envUtil.BACKEND_URL, headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})