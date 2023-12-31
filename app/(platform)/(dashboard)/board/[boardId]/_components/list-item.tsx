"use client";

import { ListWithCard } from "@/types";
import { ListHeader } from "./list-header";
import { useRef, useState } from "react";
import { CardForm } from "./card-form";
import { cn } from "@/lib/utils";
import { CardItem } from "./card-item";
import { Draggable, Droppable } from "@hello-pangea/dnd";

interface ListItemProps {
    index: number;
    data: ListWithCard;
}
const ListsItem = ({ index, data }: ListItemProps) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [isEditing, setIsEditing] = useState(false);

    const disableEditing = () => {
        setIsEditing(false);
    };

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            textAreaRef?.current?.focus();
        });
    };
    return (
        <Draggable draggableId={data.id} index={index}>
            {(provided) => (
                <li
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    className="shrink-0 h-full w-[272px] select-none"
                >
                    <div {...provided.dragHandleProps} className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
                        <ListHeader data={data} onAddCard={enableEditing} />
                        <Droppable droppableId={data.id} type="CARD">
                            {(provided) => (
                                <ol
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className={cn(
                                        "mx-1 px-1 py-0.5 flex flex-col gap-y-2",
                                        data.card.length ? "mt-2" : "mt-0"
                                    )}
                                >
                                    {data.card.map((card, index) => (
                                        <CardItem index={index} key={card.id} data={card} />
                                    ))}
                                    {provided.placeholder}
                                </ol>
                            )}
                        </Droppable>
                        <CardForm
                            {...{ listId: data.id, ref: textAreaRef, isEditing, enableEditing, disableEditing }}
                        />
                    </div>
                </li>
            )}
        </Draggable>
    );
};

export default ListsItem;
