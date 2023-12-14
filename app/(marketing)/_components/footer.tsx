import { Logo } from "@/components/custom/logo";
import { Button } from "@/components/ui/button";

const Footer = () => {
    return (
        <footer className="fixed bottom-0 w-full px-4 py-3 border-t-[2px] bg-slate-100">
            <div className="md:max-w-screen-2xl mx-auto flex w-full items-center justify-between">
                <Logo />
                <nav className="space-x-4 flex md:block md:w-auto w-full items-center justify-between">
                    <Button size="sm" variant="ghost">
                        Privacy Policy
                    </Button>
                    <Button size="sm" variant="ghost">
                        Terms of service
                    </Button>
                </nav>
            </div>
        </footer>
    );
};
export { Footer };
