import { SaveOrUpdateResultDto } from "../base/save-or-update-result.dto";
import { CanvasKind } from "@/shared/types";

export interface SaveTnoteDto {
  kind: CanvasKind;
  chartNo: string;
  ymd: string;
  data: {
    id: number;
    page: number;
    image: ArrayBuffer; // base64 encoded image
    isChanged: boolean;
  }[];
}

export interface SaveTnoteResultDto extends SaveOrUpdateResultDto {

}