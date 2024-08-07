import { GetFirstChartsDto, GetFirstChartsResultDto, GetNursingRecordsDto, GetNursingRecordsResultDto, GetPrescriptionsDto, GetPrescriptionsResultDto, GetProgressNotesDto, GetProgressNotesResultDto, WinAccountVerificationDto, WinAccountVerificationResultDto } from "@/shared/dto/socket-io";
import { GetPatientsDto, GetPatientsResultDto } from "@/shared/dto/socket-io/get-patients.dto";

export interface PathTypeMap {
  winAccountVerification: {
    dto: WinAccountVerificationDto;
    result: WinAccountVerificationResultDto;
  };
  getPatients: {
    dto: GetPatientsDto;
    result: GetPatientsResultDto;
  };
  getPrescriptions: {
    dto: GetPrescriptionsDto;
    result: GetPrescriptionsResultDto;
  };
  getFirstCharts: {
    dto: GetFirstChartsDto;
    result: GetFirstChartsResultDto;
  }
  getProgressNotes: {
    dto: GetProgressNotesDto;
    result: GetProgressNotesResultDto;
  }
  getNursingRecords: {
    dto: GetNursingRecordsDto;
    result: GetNursingRecordsResultDto;
  }
}

export type PathTypeKey = keyof PathTypeMap;