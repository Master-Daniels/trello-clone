"use client";

import { useCardModal } from "@/hooks/use-card-modal";
import { Draggable } from "@hello-pangea/dnd";
import { Card } from "@prisma/client";

interface CardItemProps {
    data: Card;
    index: number;
}
function CardItem({ data, index }: CardItemProps) {
    const cardModal = useCardModal();
    return (
        <Draggable draggableId={data.id} index={index}>
            {(provided) => (
                <li
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    role="button"
                    className="truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-md"
                    onClick={() => cardModal.onOpen(data.id)}
                >
                    {data.title}
                </li>
            )}
        </Draggable>
    );
}

export { CardItem };
