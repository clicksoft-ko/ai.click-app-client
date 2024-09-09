import { imgPaths } from "@/shared/paths";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/widgets/ui";
import React from "react";
import { insulinPartLocation } from "../constants";
import { LottiePlayer } from "@/widgets/lotties";
import { cn } from "@/shared/utils";

interface Props {
  header: React.ReactNode;
  part: string | undefined;
  trigger: React.ReactNode;
}

export const InsulinPartDialog = ({ header, part, trigger }: Props) => {
  const partLocation = insulinPartLocation[part ?? -1];
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[90%] max-w-fit overflow-auto">
        <DialogHeader>{header}</DialogHeader>
        <div className="relative h-[550px] w-[373px]">
          <LottiePlayer
            className={cn("absolute h-12 w-12 text-red-500", partLocation)}
            data="redCheck"
          />
          <img
            className=""
            src={imgPaths.insulin}
            alt="인슐린"
            width={373}
            height={550}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
