export interface GetProgressNotesDto {
  chartNo: string;
  startYmd: string;
  endYmd: string;

  searchString: string;
  page: number;
  count: number;
}

export type GetProgressNotesResultDto = ProgressNote[];

export class ProgressNote {
  id!: string;
  /** 작성일자 */
  writeDateFullText!: string;

  /** 작성자 */
  writer!: string;

  /** 유형명칭 */
  typeName!: string;

  /** 내용 */
  detail!: string;

  /** 의사명 */
  doctorName!: string;
}
