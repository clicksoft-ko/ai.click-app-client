export interface GetIOSheetsDto {
  chartNo: string;
  startYmd: string;
  endYmd: string;

  // searchString: string;
  page: number;
  count: number;
}

export type GetIOSheetsResultDto = IOSheet[];

export class IOSheet {
  id!: string;
  shortDateText!: string;
  shift!: string;
  timeText!: string;
  writer!: string;

  intake?: IntakeInfo;
  outputs?: OutputsInfo;
}

export class IntakeInfo {
  diet?: DietInfo;
  water?: WaterInfo;
  etc?: EtcInfo;
  fluid?: FluidInfo;

  get total(): {
    cc: number;
    kcal: number;
  } {
    return {
      cc:
        +(this.diet?.g ?? 0) +
        +(this.water?.cc ?? 0) +
        +(this.etc?.cc ?? 0) +
        +(this.fluid?.cc ?? 0),
      kcal:
        +(this.diet?.kcal ?? 0) +
        +(this.etc?.kcal ?? 0) +
        +(this.fluid?.kcal ?? 0),
    };
  }
}

// Outputs 정보를 담는 인터페이스
export class OutputsInfo {
  urine?: UrineInfo;
  stool?: StoolInfo;
  vomit?: string;
  etc?: string;

  get total() {
    return (
      +(this.urine?.cc ?? 0) +
      +(this.stool?.cc ?? 0) +
      +(this.vomit ?? 0) +
      +(this.etc ?? 0)
    );
  }
}


// Diet 정보를 담는 인터페이스
interface DietInfo {
  kind?: string;
  g?: number;
  kcal?: number;
}

// Water 정보를 담는 인터페이스
interface WaterInfo {
  cc?: number;
}

// Etc 정보를 담는 인터페이스
interface EtcInfo {
  content?: string;
  cc?: number;
  kcal?: number;
}

// Fluid 정보를 담는 인터페이스
interface FluidInfo {
  kind?: string;
  cc?: number;
  kcal?: number;
}

// Urine 정보를 담는 인터페이스
interface UrineInfo {
  frequency?: number;
  cc?: number;
}

// Stool 정보를 담는 인터페이스
interface StoolInfo {
  frequency?: number;
  cc?: number;
}
