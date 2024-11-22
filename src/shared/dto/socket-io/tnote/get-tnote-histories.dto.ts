export type GetTnoteHistoriesDto = {
  chartNo: string;
};

export interface TnoteHistory {
  tnoteId: number;
  kind: string;
  ymd: string;
}

export type GetTnoteHistoriesResultDto = {
  histories: TnoteHistory[];
};
