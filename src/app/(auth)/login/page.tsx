import { BStar, SStar } from '@/components/ui/icons';
import SigninForm from '@/features/auth/components/LoginForm/LoginForm';
import Image from 'next/image';
const LoginPage = () => {
  return (
    <div className="w-full min-h-[calc(100vh-64px)] mx-auto justify-between from-primary flex md:grid-cols-[1fr_600px]">
      <div className="hidden bg-[#f3f0f1] md:justify-center w-full md:flex">
        <Image
          src="/assets/images/herosection.jpg"
          width={500}
          height={800}
          alt="image"
        />
        <span className="absolute bottom-72 md:top-[200px] right-[500px] md:-translate-x-1/2 z-10 ">
          <BStar className="md:w-35 md:h-auto hover:animate-spin transition-transform duration-7000" />
        </span>
        <span className="absolute left-[150px] bottom-2/6 z-10">
          <SStar />
        </span>
      </div>
      <div className="">
        <SigninForm />
      </div>
    </div>
  );
};
export default LoginPage;
