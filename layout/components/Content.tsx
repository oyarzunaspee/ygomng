import ScrollTop from "../../components/ScrollTop";

const Content = ({ children }: { children: React.ReactNode }) => {

    return (
        <>
            <div className="flex flex-col mb-15 md:mb-0 flex-1">
                {children}
            </div>
            <ScrollTop />
        </>

    );
}

export default Content;