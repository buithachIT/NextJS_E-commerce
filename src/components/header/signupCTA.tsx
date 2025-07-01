import Link from 'next/link';
import { CloseIcon } from '../ui/icons';

const SignupCTA = () => {
  return (
    <>
      <div className="w-full h-[38px] items-center bg-black flex text-white text-sm justify-center">
        <p className="font-light">
          Sign up and get 20% off to your first order.{' '}
        </p>
        <Link href="/register" className="underline ml-1">
          Sign Up Now
        </Link>
        <span className="hidden md:block md:absolute right-20">
          <CloseIcon />
        </span>
      </div>
    </>
  );
};
export default SignupCTA;
