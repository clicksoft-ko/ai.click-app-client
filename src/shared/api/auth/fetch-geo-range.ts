import { apiPaths } from "@/shared/paths";
import { axiosAuth } from "../axios/axios-ins";


interface GeoRange {
  distance: number;
  allowedDistance: number;
  message: string;  
}

export const fetchGeoRange = async (lat: number, lng: number): Promise<GeoRange> => {
  const response = await axiosAuth.get(apiPaths.auth.geoRange(lat, lng));
  return response.data;
}