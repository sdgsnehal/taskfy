"use client";

import { ListWithCards } from "@/types";
import { ListHeader } from "./List-Header";
import { ElementRef, useRef, useState } from "react";
import { CardForm } from "./card-form";
import { cn } from "@/lib/utils";

interface ListItemProps {
  data: ListWithCards;
  index: number;
}
export const ListItem = ({ data, index }: ListItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<ElementRef<"textarea">>(null);
  const disableEditing = () => {
    setIsEditing(false);
  };
  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };
  console.log("sdgs", data);
  return (
    <li className="shrink-0 h-full w-[272px] select-none">
      <div className="w-full rounded-md bg-[#d0cdd0] shadow-md pb-2">
        <ListHeader data={data} onAddCard={enableEditing} />
        <ol className={cn("mx-1 px-1 py-0.5 flex flex-col gap-y-2")}></ol>
        <CardForm
          ref={textareaRef}
          isEditing={isEditing}
          enableEditing={enableEditing}
          disableEditing={disableEditing}
          listId={data.id}
        ></CardForm>
      </div>
    </li>
  );
};
