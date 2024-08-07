export interface GetNursingRecordsDto {
  chartNo: string;
  startYmd: string;
  endYmd: string;

  searchString: string;
  page: number;
  count: number;
}

export type GetNursingRecordsResultDto = NursingRecord[];

export class NursingRecord {
  id!: string;
  writeDateFullText!: string;
  nurseName!: string;
  details!: NursingDetail[];
}

export class NursingDetail {
  title!: string;
  detail!: string;
}