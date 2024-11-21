import { SaveOrUpdateResultDto } from ".";
import { Vs } from "./get-vss-of-day.dto";

export interface SaveVssOfDayDto {
  chartNo: string;
  ymd: string;
  vss: Vs[];
}

export interface SaveVssOfDayResultDto extends SaveOrUpdateResultDto {

}