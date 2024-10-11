import { ContentInfo } from "./content-info";
import { Weib } from "./get-patients.dto";

export interface GetLabsDto {
  chartNo: string;
  startYmd: string;
  endYmd: string;
  page: number;
  count: number;
  searchString: string;
  weib: Weib;
}

export type GetLabsResultDto = Lab[];

export class Lab {
  id!: string;
  headers!: ContentInfo[];
  chamgo!: string;
  labDetails!: LabDetail[];
}

export class LabDetail {
  id!: string;
  code!: string;
  myung!: string;
  labMyung!: string;
  value!: string;
  danwi!: string;
  normalRange!: string;
  labYmd!: string;
  upDown!: number;
}