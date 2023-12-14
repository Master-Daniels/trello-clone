import Image from "next/image";
import Link from "next/link";

import localFont from "next/font/local";
import { cn } from "@/lib/utils";

const headingFont = localFont({
    src: "../../public/fonts/font.woff2",
});

const Logo = () => {
    return (
        <Link href="/">
            <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
                <Image
                    src="/images/logo.svg"
                    alt="taskify"
                    height={30}
                    width={30}
                    className="h-[30px] w-[30px]"
                    priority
                />
                <p className={cn("text-lg text-neutral-700 pb-1 mt-1", headingFont.className)}>Taskify</p>
            </div>
        </Link>
    );
};

export { Logo };
