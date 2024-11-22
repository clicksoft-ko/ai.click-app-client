import { CanvasKind } from "@/shared/types";

type DeleteTnoteId = {
  tnoteId?: number;
};

type DeleteTnoteCommon = {
  chartNo: string;
  ymd: string;
  kind: CanvasKind;
};

export type DeleteTnoteDto = DeleteTnoteId & DeleteTnoteCommon;

export type DeleteTnoteResultDto = {
  success: boolean;
  message?: string;
};
