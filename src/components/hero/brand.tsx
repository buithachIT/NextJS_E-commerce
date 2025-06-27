import {
  VersaceBrand,
  ZaraBrand,
  GucciBrand,
  PradaBrand,
  CkBranda,
} from '../ui/icons';

const Brands = () => {
  return (
    <div className="bg-black h-[120px] px-5 w-full z-10 flex justify-center items-center">
      <div className="md:px-25 w-full flex flex-wrap pt-5 h-auto justify-between items-center align-middle gap-y-3">
        <VersaceBrand className="w-30 md:w-50 md:h-10" />
        <ZaraBrand className="w-15 md:w-50 md:h-10" />
        <GucciBrand className="w-30 md:w-50 md:h-10" />
        <PradaBrand className="w-30 md:w-50 md:h-10" />
        <CkBranda className="w-35 md:w-50 md:h-10" />
      </div>
    </div>
  );
};
export default Brands;
