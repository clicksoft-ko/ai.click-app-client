import { ContentInfo } from ".";
import { OrderType } from "./order-type";

export interface GetPrescriptionsDto {
  chartNo: string;
  startYmd: string;
  endYmd: string;

  saup: string;
  page: number;
  count: number;
}

export type GetPrescriptionsResultDto = Prescription[]

export class Prescription {
  id!: string;
  isHanbang!: boolean;
  headers!: ContentInfo[];
  diagnosises?: Diagnosis[]
  orders?: RxOrder[];
  medicalNotes?: MedicalNote[];
}

export class MedicalNote {
  code!: string;
  name!: string;
}

export class Diagnosis {
  code!: string;
  name!: string;
}

export class RxOrder {
  code?: string;
  name!: string;

  /** 일투 */
  dailyDose!: number;
  /** 횟수 */
  frequency!: number;
  /** 총투 */
  day!: number;
  /** 용법 */
  yongbup!: string;

  /** 한방 */
  chim?: string;
  hyul1?: string;
  hyul2?: string;
  hyul3?: string;

  orderType?: OrderType;
}


