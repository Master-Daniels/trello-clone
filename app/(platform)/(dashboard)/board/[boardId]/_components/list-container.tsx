"use client";

import { ListWithCard } from "@/types";
import { ListForm } from "./list-form";
import { useEffect, useState } from "react";
import ListsItem from "./list-item";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { createCard } from "@/actions/create-card";
import { useAction } from "@/hooks/use-action";
import { updateListOrder } from "@/actions/update-list-order";
import { toast } from "sonner";
import { updateCardOrder } from "@/actions/update-card-order";

interface ListContainerProps {
    boardId: string;
    data: ListWithCard[];
}

function reOrder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list);
    const removed = result.splice(startIndex, 1)[0];
    result.splice(endIndex, 0, removed);

    return result;
}

const ListContainer = ({ boardId, data }: ListContainerProps) => {
    const [orderedData, setOrderedData] = useState(data);

    useEffect(() => {
        setOrderedData(data);
    }, [data]);

    const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
        onSuccess() {
            toast.success("List re-ordered");
        },

        onError(error) {
            toast.error(error);
        },
    });
    const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
        onSuccess() {
            toast.success("Card re-ordered");
        },
        onError(error) {
            toast.error(error);
        },
    });

    const onDragEnd = (result: any) => {
        if (!result.destination || !result.source) {
            return;
        }
        // if dropped in the same destination
        if (
            result.destination.droppableId === result.source.droppableId &&
            result.destination.index === result.source.index
        ) {
            return;
        }
        // user moves a list
        if (result.type === "LIST") {
            const newLists = reOrder(data, result.source.index, result.destination.index).map((item, index) => ({
                ...item,
                order: index + 1,
            }));

            setOrderedData(newLists);
            // TODO:trigger server action
            executeUpdateListOrder({ items: orderedData, boardId });
        }

        // if user moves a card
        if (result.type === "CARD") {
            let newOrderdData = [...orderedData];

            // source and destination list
            const sourceList = newOrderdData.find((list) => list.id === result.source.droppableId);

            const destinationList = newOrderdData.find((list) => list.id === result.destination.droppableId);

            if (!sourceList || !destinationList) {
                return;
            }

            // check if cards exists on sourceList
            if (!sourceList?.card) {
                sourceList.card = [];
            }

            // check if cards exists on destinationList
            if (!destinationList?.card) {
                destinationList.card = [];
            }

            // if the user move card in the same list
            if (result.source.droppableId === result.destination.droppableId) {
                const reOrderedCard = reOrder(sourceList.card, result.source.index, result.destination.index);

                reOrderedCard.forEach((card, index) => {
                    card.order = index;
                });
                sourceList.card = reOrderedCard;

                setOrderedData(newOrderdData);
                // TODO:trigger server action
                executeUpdateCardOrder({ items: reOrderedCard, boardId });
            } else {
                // if user moves the card to another list
                const [movedCard] = sourceList.card.splice(result.source.index, 1);

                // assign the new listId to the moved card
                movedCard.listId = result.destination.droppableId;

                // add card to the destination list
                destinationList.card.splice(result.destination.index, 0, movedCard);

                sourceList.card.forEach((card, index) => {
                    card.order = index;
                });

                // update the order for each card in the destination list
                destinationList.card.forEach((card, index) => {
                    card.order = index;
                });
                setOrderedData(newOrderdData);
                executeUpdateCardOrder({ items: destinationList.card, boardId });
            }
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="lists" type="LIST" direction="horizontal">
                {(provided) => (
                    <ol {...provided.droppableProps} ref={provided.innerRef} className="flex  gap-x-3 h-full">
                        {orderedData.map((list, index) => (
                            <ListsItem key={list.id} index={index} data={list} />
                        ))}
                        {provided.placeholder}
                        <ListForm />
                        <li className="w-1 flex-shrink-0" />
                    </ol>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export { ListContainer };
