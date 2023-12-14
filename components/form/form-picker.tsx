"use client";

import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import Link from "next/link";

import { unsplash } from "@/lib/unsplash";
import { cn } from "@/lib/utils";
import { CheckIcon, Loader2Icon } from "lucide-react";
import { defaultImages } from "@/constants/images";
import { FormErrors } from "./form-errors";

interface FormPickerProps {
    id: string;
    errors?: Record<string, string[]>;
}

const FormPicker = ({ id, errors }: FormPickerProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedImageId, setSelectedImageId] = useState(null);
    const [images, setImages] = useState<Array<Record<string, any>>>([]);

    const { pending } = useFormStatus();

    useEffect(() => {
        const fetchImages = async () => {
            try {
                setIsLoading(true);
                const result = await unsplash.photos.getRandom({
                    collectionIds: ["317099"],
                    count: 9,
                });
                if (result && result.response) {
                    const imagesArray = result.response as Array<Record<string, any>>;
                    

                    setImages(imagesArray);
                    setIsLoading(false);
                } else {
                    console.error("Failed to get images from unsplash");
                }
            } catch (error) {
                console.error(error);
                setImages([]);
            } finally {
                setIsLoading(false);
            }
        };

        setImages(defaultImages);
    }, []);

    if (isLoading) {
        return (
            <div className="p-6 flex justify-center items-center">
                <Loader2Icon className="h-6 w-6 text-sky-700 animate-spin" />
            </div>
        );
    }
    return (
        <div className="relative">
            <div className="grid grid-cols-3 gap-2 mb-2">
                {images.map((image) => (
                    <div
                        key={image.id}
                        className={cn(
                            "cursor-pointer relative aspect-video group hover:opacity-80 transition bg-muted",
                            pending && "opacity-50 hover:opacity-50 cursor-auto"
                        )}
                        onClick={() => {
                            if (pending) return;
                            setSelectedImageId(image.id);
                        }}
                    >
                        <input
                            type="radio"
                            name={id}
                            id={id}
                            className="hidden"
                            checked={selectedImageId === image.id}
                            readOnly
                            disabled={pending}
                            value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
                        />
                        {selectedImageId === image.id && (
                            <div className="absolute z-50 top-0 bottom-0 h-full w-full bg-black/40 flex items-center justify-center">
                                <CheckIcon className="h-4 w-4 text-white" />
                            </div>
                        )}
                        <Image fill src={image.urls.thumb} className="object-cover rounded-sm" alt="unsplash image" />
                        <Link
                            href={image.links.html}
                            target="_blank"
                            className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50"
                        >
                            {image.user.name}
                        </Link>
                    </div>
                ))}
            </div>
            <FormErrors id="image" errors={errors} />
        </div>
    );
};
export { FormPicker };
