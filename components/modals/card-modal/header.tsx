"use client";

import { FormInput } from "@/components/form/form-input";
import { Skeleton } from "@/components/ui/skeleton";
import { CardWithList } from "@/types";
import { Layout } from "lucide-react";
import { useState, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useAction } from "@/hooks/use-action";
import { updateCard } from "@/actions/update-card";
import { toast } from "sonner";

interface HeaderProps {
    data: CardWithList;
    close(): void;
}
const Header = ({ data, close }: HeaderProps) => {
    const [title, setTitle] = useState(data.title);

    const queryCient = useQueryClient();
    const params = useParams();

    const { execute } = useAction(updateCard, {
        onSuccess(data) {
            queryCient.invalidateQueries({
                queryKey: ["card", data.id],
            });
            queryCient.invalidateQueries({
                queryKey: ["card-logs", data.id],
            });
            toast.success(`Renamed to '${data.title}'`);
            setTitle(data.title);
            close();
        },
        onError(error) {
            toast.error(error);
        },
    });

    const inputRef = useRef<HTMLInputElement>(null);

    const onBlur = () => {
        inputRef?.current?.form?.requestSubmit();
    };

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        const boardId = params.boardId as string;
        execute({
            id: data.id,
            boardId,
            title,
        });
    };

    return (
        <div className="flex items-start gap-x-3 mb-6 w-full">
            <Layout className="h-5 w-5 mt-1 text-neutral-700" />
            <div className="w-full">
                <form action={onSubmit}>
                    <FormInput
                        id="title"
                        ref={inputRef}
                        onBlur={onBlur}
                        defaultValue={title}
                        onClick={() => {
                            inputRef?.current?.select();
                        }}
                        className="font-semibold text-xl px-1 border-transparent relative -left-1.5 w-[95%] focus-visible:bg-white focus-visible:border-input mb-0.5 truncate"
                    />
                </form>
                <p className="text-sm text-muted-foreground">
                    in list <span className="underline">{data.list.title}</span>
                </p>
            </div>
        </div>
    );
};

Header.Skeleton = function HeaderSkeleton() {
    return (
        <div className="flex items-start gap-x-3 mb-6">
            <Skeleton className="h-6 w-6 mt-1 bg-neutral-200" />
            <div>
                <Skeleton className="h-8 w-32 mb-1 bg-neutral-200" />
                <Skeleton className="h-5 w-14 bg-neutral-200" />
            </div>
        </div>
    );
};

export { Header };
