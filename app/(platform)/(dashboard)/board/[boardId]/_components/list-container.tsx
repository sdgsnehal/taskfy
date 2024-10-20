"use client";
import { ListWithCards } from "@/types";
import { ListForm } from "./list-form";
import { useEffect, useState } from "react";
import { ListItem } from "./list-item";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { updateListOrder } from "@/actions/update-list-order";
import { updateCardOrder } from "@/actions/update-card-order";
import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";

interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
}
export const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const [orderData, setOrderedData] = useState(data);
  const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
    onSuccess: () => {
      toast.success("List reorder");
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const { execute: executeUpadateCardOrder } = useAction(updateCardOrder, {
    onSuccess: () => {
      toast.success("Card reorder");
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  useEffect(() => {
    setOrderedData(data);
  }, [data]);
  function reorder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  }
  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;
    if (!destination) {
      return;
    }
    //if drop in the same position
    if (
      destination.draggableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    // user move the list
    if (type === "list") {
      const items = reorder(orderData, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      );
      setOrderedData(items);
      //todo triger serveractions
      executeUpdateListOrder({ items: items, boardId });
    }
    //user move the card
    if (type === "card") {
      let newOrderData = [...orderData];
      const sourceList = newOrderData.find(
        (list) => list.id === source.droppableId
      );
      const desList = newOrderData.find(
        (list) => list.id === destination.droppableId
      );
      if (!sourceList || !desList) {
        return;
      }
      // check if cards exits on the source list
      if (!sourceList.cards) {
        sourceList.cards = [];
      }
      //check if cards exist on destination
      if (!desList.cards) {
        desList.cards = [];
      }
      // moving the card in the same list
      if (source.droppableId === destination.droppableId) {
        const reorderCards = reorder(
          sourceList?.cards,
          source.index,
          destination.index
        );
        reorderCards.forEach((card, idx) => {
          card.order = idx;
        });
        sourceList.cards = reorderCards;
        setOrderedData(newOrderData);
        executeUpadateCardOrder({ boardId: boardId, items: reorderCards });
        // user moves the card to another list
      } else {
        // remove card from the source list
        const [movedCard] = sourceList.cards.splice(source.index, 1);
        // assign the new list id the move card
        movedCard.listId = destination.droppableId;

        // add card to the destination list
        desList.cards.splice(destination.index, 0, movedCard);
        sourceList.cards.forEach((card, idx) => {
          card.order = idx;
        });
        // update the order for the each card in the destination list
        desList.cards.forEach((card, idx) => {
          card.order = idx;
        });
        setOrderedData(newOrderData);
        //todo triger server action
        executeUpadateCardOrder({ boardId: boardId, items: desList.cards });
      }
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full"
          >
            {orderData.map((list, index) => {
              return <ListItem key={list.id} index={index} data={list} />;
            })}
            {provided.placeholder}
            <ListForm />
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};
