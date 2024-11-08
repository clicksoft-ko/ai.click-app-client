import { Patient } from "./get-patients.dto";

export interface GetPatientDto {
  chartNo: string;
}

export type GetPatientResultDto = Patient;

