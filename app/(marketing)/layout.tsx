import { Navbar } from "./_components/navbar";
import { Footer } from "./_components/footer";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-screen bg-slate-100">
            <Navbar />
            <main className="pt-40 pb-20 bg-slate-100 px-5">{children}</main>
            <Footer />
        </div>
    );
};

export default MarketingLayout;
