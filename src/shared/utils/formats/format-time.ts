import dayjs from "dayjs";

export function formatTime(time: string | undefined | null) {
  if (!time) return;
  if (!/^([01]\d|2[0-3])([0-5]\d)$/.test(time)) return "";
  return dayjs(time, "HHmm").format("HH:mm");
}
