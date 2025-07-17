'use client';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { ROUTES } from '@/config/routes';
import { CartIcon, UserIcon } from '../ui/icons';
import { useCart } from '@/contexts/CartContext';

const UserHeader = () => {
  const { countCartQuantity } = useCart();
  const quantity = countCartQuantity();
  const { user, logout } = useAuth();
  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <Link href={ROUTES.CART} className="relative">
        {quantity > 0 && (
          <span className="absolute left-3 bottom-4 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            <p className="text-[10px]">{quantity}</p>
          </span>
        )}
        <CartIcon className="w-10 h-6 cursor-pointer hover:scale-110" />
      </Link>
      {!user?.id ? (
        <>
          <Link href={ROUTES.LOGIN}>
            <UserIcon className="w-10 h-6 cursor-pointer hover:scale-110" />
          </Link>
        </>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="hidden md:flex">
              <UserIcon className="w-10 h-6 cursor-pointer hover:scale-110" />
            </div>
          </DropdownMenuTrigger>
          Hi, {user.firstName}
          <DropdownMenuContent className="w-56 mr-10" align="start">
            <DropdownMenuLabel>Hi, there!</DropdownMenuLabel>
            <DropdownMenuGroup className="flex-col">
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={ROUTES.PROFILE} className="pl-2 w-full">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="ml-2" onClick={handleLogout}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};
export default UserHeader;
