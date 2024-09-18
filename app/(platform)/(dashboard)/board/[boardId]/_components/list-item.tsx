"use client";

import { ListWithCards } from "@/types";
import { ListHeader } from "./List-Header";

interface ListItemProps {
  data: ListWithCards;
  index: number;
}
export const ListItem = ({ data, index }: ListItemProps) => {
  return (
    <li className="shrink-0 h-full w-[272px] select-none">
      <div className="w-full rounded-md bg-[#d0cdd0] shadow-md pb-2">
        <ListHeader data={data} />
      </div>
    </li>
  );
};
