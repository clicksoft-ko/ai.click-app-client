export class WinAccountVerificationDto {
  userId!: string;
  password!: string;
}

export class WinAccountVerificationResultDto {
  name!: string;
  bu!: string;
  part!: string;
  hanbangSaups!: HanbangSaup[];
}

export interface HanbangSaup {
  saup: string;
  isHanbang: boolean;
}
