import { BStar, SStar } from '@/components/ui/icons';
import RegisterForm from '@/features/auth/components/RegisterForm/RegisterForm';
import Image from 'next/image';
const RegisterPage = () => {
  return (
    <div className="w-full min-h-[calc(100vh-64px)] p-0 m-0 flex flex-col md:flex-row">
      <div className="hidden bg-[#f3f0f1] md:justify-center w-4/6 md:flex">
        <Image
          src="/assets/images/herosection.jpg"
          width={500}
          height={800}
          alt="image"
        />
        <span className="absolute bottom-72 md:top-[200px] right-[700px] md:-translate-x-1/2 z-10 ">
          <BStar className="md:w-35 md:h-auto hover:animate-spin transition-transform duration-7000" />
        </span>
        <span className="absolute left-[250px] bottom-2/6 z-10">
          <SStar />
        </span>
      </div>
      <div className="md:w-2/5 w-full md:pt-0 animate-fade-in-up transition-opacity delay-200 duration-700 ease-out">
        <RegisterForm />
      </div>
    </div>
  );
};
export default RegisterPage;
