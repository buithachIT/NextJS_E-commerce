import { VersaceBrand, ZaraBrand, GucciBrand, PradaBrand, CkBranda } from "../ui/icons";

const Brands = () => {
    return (
        <div className="bg-black h-[120px] w-full z-10 flex items-center">
            <div className="mx-auto max-w-[1140px] w-full flex flex-wrap pt-5 h-auto justify-evenly items-center align-middle gap-x-2 gap-y-3">
                <VersaceBrand className="w-30 md:w-50 md:h-10" />
                <ZaraBrand className="w-15 md:w-50 md:h-10" />
                <GucciBrand className="w-30 md:w-50 md:h-10" />
                <PradaBrand className="w-30 md:w-50 md:h-10" />
                <CkBranda className="w-35 md:w-50 md:h-10" />
            </div>
        </div>
    )
}
export default Brands;