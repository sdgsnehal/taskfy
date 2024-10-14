"use client";

import { ListWithCards } from "@/types";
import { ListHeader } from "./List-Header";
import { ElementRef, useRef, useState } from "react";
import { CardForm } from "./card-form";

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
  return (
    <li className="shrink-0 h-full w-[272px] select-none">
      <div className="w-full rounded-md bg-[#d0cdd0] shadow-md pb-2">
        <ListHeader data={data} onAddCard={enableEditing} />
        <CardForm
          ref={textareaRef}
          isEditing={isEditing}
          enableEditing={enableEditing}
          disableEditing={disableEditing}
          lisId={data.id}
        ></CardForm>
      </div>
    </li>
  );
};
