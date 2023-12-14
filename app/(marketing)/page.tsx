import Link from "next/link";
import localfont from "next/font/local";
import { Poppins } from "next/font/google";

import { Medal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const headingFont = localfont({
    src: "../../public/fonts/font.woff2",
});

const textFont = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const MarketingPage = async () => {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className={cn("flex items-center justify-center flex-col", headingFont.className)}>
                <div className="text-sm md:text-base  mb-4 flex items-center border shadow-sm px-4 py-3 bg-amber-100 text-amber-700 rounded-full uppercase">
                    <Medal className="h-6 w-6 mr-2" />
                    <span className="mt-1 tracking-[0.01em]">No. 1 task management system</span>
                </div>

                <h1 className="text-3xl md:text-4xl text-neutral-800 flex flex-col items-center ">
                    Taskify helps teams move
                    <span className="bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md w-fit block mt-4 text-shadow">
                        work forward
                    </span>
                </h1>
            </div>
            <div className="text-center">
                <p
                    className={cn(
                        "text-sm md:text-base text-neutral-500 mt-4 max-s-xs md:max-w-2xl text-center mx-auto",
                        textFont.className
                    )}
                >
                    Collaborate, manage projects and reach new productivity peaks. From high rises to home offices, the
                    way your team works is unique - accomplish it all with Taskify
                </p>
                <Button className="mt-6" size="lg" asChild>
                    <Link href="/sign-up">Get Taskify for free</Link>
                </Button>
            </div>
        </div>
    );
};

export default MarketingPage;
