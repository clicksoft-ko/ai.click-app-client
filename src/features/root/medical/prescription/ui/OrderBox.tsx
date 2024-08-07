import { OrderType, RxOrder } from "@/shared/dto/socket-io";
import { cn } from "@/shared/utils";
import { ObGrid, ObGridBody, ObGridHead } from "@/widgets/ob-grid";
import { TitleGroup } from "@/widgets/title-group";
import { Fragment } from "react";

interface Props {
  orders: RxOrder[] | undefined;
}
// const OrderType: any = {};
export function OrderBox({ orders }: Props) {
  if (!orders || orders.length === 0) return <></>;

  return (
    <TitleGroup title="처방내역">
      <ObGrid gridType="rx-order">
        <ObGridHead>코드</ObGridHead>
        <ObGridHead>명칭</ObGridHead>
        <ObGridHead>일투</ObGridHead>
        <ObGridHead>횟수</ObGridHead>
        <ObGridHead>총투</ObGridHead>
        <ObGridHead>용법</ObGridHead>
        {orders?.map((order, i) => {
          const isInstructions = order.orderType === OrderType.instructions;
          const bgStyleObj: { [key: string]: string } = {
            [OrderType.group]: "bg-orange-200",
            [OrderType.subItem]: "bg-orange-50",
          };
          const textStyles = isInstructions ? "text-green-700 font-bold" : "";
          const bgStyles = bgStyleObj[order.orderType?.toString() ?? ""];
          return (
            <Fragment key={i}>
              <ObGridBody className={cn(bgStyles, "flex items-center")}>
                {isInstructions ? "" : order.code}
              </ObGridBody>
              <ObGridBody className={cn(bgStyles, textStyles, "text-left")}>
                {order.name}
              </ObGridBody>
              <ObGridBody className={cn(bgStyles, "text-right")}>
                {isInstructions ? "" : order.dailyDose}
              </ObGridBody>
              <ObGridBody className={cn(bgStyles, "text-right")}>
                {isInstructions ? "" : order.frequency}
              </ObGridBody>
              <ObGridBody className={cn(bgStyles, "text-right")}>
                {isInstructions ? "" : order.day}
              </ObGridBody>
              <ObGridBody className={cn(bgStyles, "text-left")}>
                {isInstructions ? "" : order.yongbup}
              </ObGridBody>
            </Fragment>
          );
        })}
      </ObGrid>
    </TitleGroup>
  );
}
