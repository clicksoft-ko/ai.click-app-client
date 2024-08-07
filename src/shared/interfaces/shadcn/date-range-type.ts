import dayjs from "dayjs";

export type DateRangeType = {
  from: Date | undefined;
  to: Date | undefined;
};

export class DateRange implements DateRangeType {
  from: Date | undefined;
  to: Date | undefined;
 
  constructor(from?: Date | undefined, to?: Date | undefined) {
    this.from = from ?? dayjs().toDate();
    this.to = (to || from) ?? dayjs().toDate();
  }

  get startYmd(): string {
    return dayjs(this.from).format("YYYYMMDD");
  }
  get endYmd(): string {
    return dayjs(this.to).format("YYYYMMDD");
  }
}