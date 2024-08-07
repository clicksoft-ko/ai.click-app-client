import { ContentInfo } from "./content-info";

export interface GetFirstChartsDto {
  chartNo: string;
  startYmd: string;
  endYmd: string;

  // searchString: string;
  page: number;
  count: number;
}

export type GetFirstChartsResultDto = FirstChart[];

export class FirstChart {
  id!: string;
  writeDateFullText!: string;
  headers?: ContentInfo[];
  details!: ContentInfo[];
}

