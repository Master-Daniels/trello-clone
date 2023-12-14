import { Card, List } from "@prisma/client";

export type ListWithCard = List & {
    card: Card[];
};

export type CardWithList = Card & {
    list: List;
};
