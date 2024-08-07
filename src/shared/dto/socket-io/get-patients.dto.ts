import { convertBirthToAge } from "@/shared/utils/converts";
import { formatYmdToShort } from "@/shared/utils/formats";

export enum Weib {
  전체 = 0,
  입원 = 1,
  외래 = 2
}

export class Patient {
  id!: string;
  chartNo!: string;
  suName!: string;
  yuhyungName!: string;
  sex!: string;
  birthday!: string;
  jinchalName!: string;
  ibYmd?: string;
  wardName?: string;
  get formatedBirthday(): string | undefined {
    return formatYmdToShort(this.birthday);
  }
  get age(): number {
    return convertBirthToAge(this.birthday);
  }
}

export interface GetPatientsDto {
  ymd: string;
  weib: Weib;

  searchString: string;
  page: number;
  count: number;
}

export type GetPatientsResultDto = Patient[];

