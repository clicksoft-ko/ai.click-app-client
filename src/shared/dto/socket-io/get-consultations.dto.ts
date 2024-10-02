import { ContentInfo } from ".";

export interface GetConsultationsDto {
  chartNo: string;
  startYmd: string;
  endYmd: string;
  page: number;
  count: number;
  searchString: string;
}

export type GetConsultationsResultDto = Consultation[];

export class Consultation {
  id!: string;
  title!: string;
  from!: ConsultationFrom;
  to!: ConsultationTo;
}

export class ConsultationFrom {
  headers!: ContentInfo[];
  request!: string;
}

export class ConsultationTo {
  headers!: ContentInfo[];
  response!: string;
}
