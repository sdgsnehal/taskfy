"use client";
import { List } from "@prisma/client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, X } from "lucide-react";
import { FormSubmit } from "@/components/form/form-submit";
import { Separator } from "@/components/ui/separator";
import { deleteList } from "@/actions/delete-list";
import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";
import { copyList } from "@/actions/copy-list";

interface ListOptionsProps {
  data: List;
  onAddCard: () => void;
}
export const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
  const { execute: executeDeleteList } = useAction(deleteList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" deleted`);
    },
    onError: () => {
      toast.error("Unable to delete the list");
    },
  });
  const { execute: executeCopyList } = useAction(copyList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" copy created`);
    },
    onError: () => {
      toast.error("Unable to copy the list");
    },
  });
  const onDeleteList = () => {
    executeDeleteList({ id: data.id, boardId: data.boardId });
  };
  const onCopyList = () => {
    executeCopyList({ id: data.id, boardId: data.boardId });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          List actions
        </div>
        <PopoverClose>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          onClick={onAddCard}
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          variant="ghost"
        >
          Add Card...
        </Button>
        <form action={onCopyList}>
          <input hidden name="id" id="id" value={data.id}></input>
          <input
            hidden
            name="boardId"
            id="boardId"
            value={data.boardId}
          ></input>
          <FormSubmit
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
            variant="ghost"
          >
            Copy List...
          </FormSubmit>
        </form>
        <Separator />
        <form action={onDeleteList}>
          <input hidden name="id" id="id" value={data.id}></input>
          <input
            hidden
            name="boardId"
            id="boardId"
            value={data.boardId}
          ></input>
          <FormSubmit
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
            variant="ghost"
          >
            Delete this List
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
