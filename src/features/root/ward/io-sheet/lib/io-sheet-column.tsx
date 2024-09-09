import { IOSheet } from "@/shared/dto/socket-io";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<IOSheet>();

export const ioSheetTableColumns: any = [
  columnHelper.accessor("shortDateText", {
    id: "ymd",
    header: () => "일자",
    meta: {
      align: "center",
    },
    minSize: 100,
    enableGrouping: true,
  }),
  columnHelper.accessor("shift", {
    header: () => "구분",
  }),
  columnHelper.accessor("timeText", {
    header: () => "시간",
  }),
  columnHelper.accessor("writer", {
    header: () => "작성자",
  }),

  columnHelper.group({
    id: "intake",
    header: () => <span>Intake</span>,
    columns: [
      columnHelper.accessor((row) => row.intake?.diet?.kind, {
        id: "intake.diet.kind",
        header: () => "종류",
        cell: (props) => props.getValue(),
      }),
      columnHelper.group({
        id: "intake.diet",
        header: () => <span>Diet</span>,
        columns: [
          columnHelper.accessor((row) => row.intake?.diet?.g, {
            id: "intake.diet.g",
            header: () => "g",
            meta: {
              align: "right",
            },
          }),
          columnHelper.accessor((row) => row.intake?.diet?.kcal, {
            id: "intake.diet.kcal",
            header: () => "kcal",
            meta: {
              align: "right",
            },
          }),
        ],
      }),
      columnHelper.group({
        id: "intake.water",
        header: () => <span>Water</span>,
        columns: [
          columnHelper.accessor((row) => row.intake?.water?.cc, {
            id: "intake.water.cc",
            header: () => "cc",
            meta: {
              align: "right",
            },
          }),
        ],
      }),
      columnHelper.group({
        id: "intake.etc",
        header: () => <span>Etc</span>,
        columns: [
          columnHelper.accessor((row) => row.intake?.etc?.content, {
            id: "intake.etc.content",
            header: () => "내용",
          }),
          columnHelper.accessor((row) => row.intake?.etc?.cc, {
            id: "intake.etc.cc",
            header: () => "cc",
            meta: {
              align: "right",
            },
          }),
          columnHelper.accessor((row) => row.intake?.etc?.kcal, {
            id: "intake.etc.kcal",
            header: () => "kcal",
            meta: {
              align: "right",
            },
          }),
        ],
      }),
      columnHelper.group({
        id: "intake.fluid",
        header: () => <span>Fluid</span>,
        columns: [
          columnHelper.accessor((row) => row.intake?.fluid?.kind, {
            id: "intake.fluid.kind",
            header: () => "종류",
          }),
          columnHelper.accessor((row) => row.intake?.fluid?.cc, {
            id: "intake.fluid.cc",
            header: () => "cc",
            meta: {
              align: "right",
            },
          }),
          columnHelper.accessor("intake.fluid.kcal", {
            header: () => "kcal",
            meta: {
              align: "right",
            },
          }),
        ],
      }),
      columnHelper.group({
        id: "intake.total",
        header: () => "Total",
        columns: [
          columnHelper.display({
            id: "intake.total.cc",
            header: () => "cc",
            meta: {
              align: "right",
            },
          }),
          columnHelper.display({
            id: "intake.total.kcal",
            header: () => "kcal",
            meta: {
              align: "right",
            },
          }),
        ],
      }),
    ],
  }),
  columnHelper.group({
    id: "output",
    header: () => <span>Output</span>,
    columns: [
      columnHelper.group({
        id: "output.urine",
        header: () => "Urine",
        columns: [
          columnHelper.accessor((row) => row.outputs?.urine?.frequency, {
            id: "outputs.urine.frequency",
            header: () => "횟수",
            meta: {
              align: "right",
            },
          }),
          columnHelper.accessor((row) => row.outputs?.urine?.cc, {
            id: "outputs.urine.cc",
            header: () => "cc",
            meta: {
              align: "right",
            },
          }),
        ],
      }),
      columnHelper.group({
        id: "output.stool",
        header: () => "Stool",
        columns: [
          columnHelper.accessor((row) => row.outputs?.stool?.frequency, {
            id: "outputs.stool.frequency",
            header: () => "횟수",
            meta: {
              align: "right",
            },
          }),
          columnHelper.accessor((row) => row.outputs?.stool?.cc, {
            id: "outputs.stool.cc",
            header: () => "cc",
            meta: {
              align: "right",
            },
          }),
        ],
      }),
      columnHelper.accessor((row) => row.outputs?.vomit, {
        id: "outputs.vomit",
        header: () => "Vomit",
      }),
      columnHelper.accessor((row) => row.outputs?.etc, {
        id: "outputs.etc",
        header: () => "Etc.",
        meta: {
          align: "right",
        },
      }),
      columnHelper.accessor((row) => row.outputs?.total, {
        id: "outputs.total",
        header: () => "Total",
        meta: {
          align: "right",
        },
      }),
    ],
  }),
];
