import { Logo } from "@/components/custom/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Navbar = () => {
    return (
        <header className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center justify-between">
            <div className="md:max-w-screen-2xl mx-auto flex w-full items-center justify-between">
                <Logo />
                <nav className="space-x-4 flex md:block md:w-auto w-full items-center justify-between">
                    <Button size="sm" variant="outline" asChild>
                        <Link href="/sign-in">Login</Link>
                    </Button>
                    <Button size="sm" asChild>
                        <Link href="/sign-up">Get Taskify for free</Link>
                    </Button>
                </nav>
            </div>
        </header>
    );
};
export { Navbar };
