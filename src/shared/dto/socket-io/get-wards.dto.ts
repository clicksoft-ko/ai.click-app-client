export interface GetWardsDto {
}

export interface WardPatient {
  chart: string;
  bed: string;
  name: string;
  gender: string;
  age: number;
}

export interface Ward {
  name: string;
  patients: WardPatient[];
}

export type GetWardsResultDto = Ward[];
