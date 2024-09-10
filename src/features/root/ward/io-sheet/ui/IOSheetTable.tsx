import { Fragment, useState } from "react";
import styles from "./io-sheet-table.module.scss";
import {
  Cell,
  Row,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { cn } from "@/shared/utils";
import { ioSheetTableColumns } from "../lib";
import { IOSheet } from "@/shared/dto/socket-io";
import { ChildrenProps } from "@/shared/interfaces/props";
import { IOSheetColumnHeader } from "./IOSheetColumnHeader";
import { getCommonPinningStyles } from "../lib/get-common-pinning-styles";

interface Props {
  data: IOSheet[] | undefined;
}

export function IOSheetTable({ data }: Props) {
  const table = useReactTable({
    data: data ?? [],
    columns: ioSheetTableColumns,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
    defaultColumn: {
      size: 50,
      minSize: 50,
      maxSize: 500,
    },
  });
  const { getShowTotal, getSum, getRowTotalSum } = useTotalCalculate();

  return (
    <table
      className={cn(styles.table)}
      style={{ width: table.getTotalSize() }}
    >
      <thead>
        <IOSheetColumnHeader table={table} styles={styles} />
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row, index, array) => {
          const { showTotal } = getShowTotal(index, array);

          return (
            <Fragment key={row.id}>
              <BaseRow row={row} getRowTotalSum={getRowTotalSum} />
              {showTotal && (
                <TotalRow
                  getSum={(colId) => getSum(row, array, colId)}
                  row={row}
                />
              )}
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
}

interface BaseRowProps extends ChildrenProps {
  row: Row<IOSheet>;
  getRowTotalSum: (cell: Cell<IOSheet, unknown>) => GetRowTotalSumResult;
}

function BaseRow({ row, getRowTotalSum }: BaseRowProps) {
  return (
    <tr>
      {row.getVisibleCells().map((cell) => {
        const { isTotalCell, totalText } = getRowTotalSum(cell) || {};

        return (
          <CellTd key={cell.id} cell={cell} type="body">
            {isTotalCell
              ? totalText
              : flexRender(cell.column.columnDef.cell, cell.getContext())}
          </CellTd>
        );
      })}
    </tr>
  );
}

interface TotalRowProps extends ChildrenProps {
  row: Row<IOSheet>;
  getSum: (columnId: any) => number | undefined;
}

function TotalRow({ row, getSum }: TotalRowProps) {
  return (
    <tr className="font-semibold text-rose-500">
      {row.getVisibleCells().map((cell, index) => {
        const colId = cell.column.id;
        const sum = getSum(colId);

        return (
          <CellTd key={cell.id} cell={cell} type="sum">
            {index === 0 ? "합계" : sum?.toLocaleString()}
          </CellTd>
        );
      })}
    </tr>
  );
}

interface CellTdProps extends ChildrenProps {
  cell: Cell<IOSheet, unknown>;
  type: "body" | "sum";
}

function CellTd({ cell, children, type }: CellTdProps) {
  return (
    <td
      align={cell.column.columnDef.meta?.align ?? "center"}
      className={"border-primary-sm border-b border-r"}
      style={{ ...getCommonPinningStyles(cell.column, type) }}
    >
      {children}
    </td>
  );
}

const useTotalCalculate = () => {
  const [totalCols] = useState([
    "intake.total.cc",
    "intake.total.kcal",
    "outputs.total",
  ]);
  const [sumCols] = useState([
    "intake.diet.g",
    "intake.diet.kcal",
    "intake.water.cc",
    "intake.etc.cc",
    "intake.etc.kcal",
    "intake.fluid.cc",
    "intake.fluid.kcal",
    "outputs.urine.cc",
    "outputs.stool.cc",
    "outputs.vomit",
    "outputs.etc",
    ...totalCols,
  ]);

  function getShowTotal(index: number, array: Row<IOSheet>[]) {
    const curData = array[index];
    const nextData = array?.[index + 1];
    const showTotal =
      !nextData ||
      curData.original.shortDateText !== nextData.original.shortDateText;

    return {
      showTotal,
    };
  }

  function getSum(row: Row<IOSheet>, array: Row<IOSheet>[], columnId: string) {
    const filteredData = array.filter(
      (data) => data.original.shortDateText === row.original.shortDateText,
    );
    if (!sumCols.includes(columnId)) return undefined;
    const cols = columnId.split(".");
    if (!cols) return;

    const sum = filteredData.reduce((sum, acc) => {
      const value = getValue(acc.original, cols);
      const numValue = parseFloat(value);
      return sum + (isNaN(numValue) ? 0 : numValue);
    }, 0);

    return sum === 0 ? undefined : sum;
  }

  function getRowTotalSum(cell: Cell<IOSheet, unknown>): GetRowTotalSumResult {
    const colId = cell.column.id;
    if (!totalCols.includes(colId)) return { isTotalCell: false };
    const cols = colId.split(".");
    if (!cols) return { isTotalCell: false };

    const total = getValue(cell.row.original, cols) as number;
    const isTotalCell = total !== undefined;
    const totalText = total === 0 ? undefined : total?.toLocaleString();

    return {
      isTotalCell,
      totalText,
    };
  }

  function getValue(obj: { [key: string]: any }, keys: string[]): any {
    const currentKey = keys[0];

    if (keys.length === 1) {
      // 키 배열의 길이가 1이면 최종 값을 반환
      return obj[currentKey];
    } else {
      // 키 배열의 길이가 1보다 크면 재귀적으로 호출
      const nextObj = obj[currentKey];
      const remainingKeys = keys.slice(1);
      return nextObj ? getValue(nextObj, remainingKeys) : undefined;
    }
  }

  return {
    getShowTotal,
    getSum,
    getRowTotalSum,
  };
};

interface GetRowTotalSumResult {
  isTotalCell: boolean;
  totalText?: string;
}
