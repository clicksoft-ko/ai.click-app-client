import { TnoteItem } from "./tnote-item";
import { CanvasKind } from "@/shared/types";
export type GetTnoteItemsDto = GetTnoteItemsData | GetTnoteItemsId;
export type GetTnoteItemsResultDto = {
  tnoteId: number;
  items: TnoteItem[];
};
type GetTnoteItemsData = { chartNo: string; ymd: string; kind: CanvasKind; };
type GetTnoteItemsId = { tnoteId: number };

