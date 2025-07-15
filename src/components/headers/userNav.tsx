'use client';
import Link from 'next/link';
import { Button } from '../ui/button';
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
import { UserIcon } from '../ui/icons';

const UserHeader = () => {
  const { user, logout } = useAuth();
  const handleLogout = () => {
    logout();
  };
  return (
    <>
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
          Hi, {user.username}
          <DropdownMenuContent className="w-56 mr-10" align="start">
            <DropdownMenuLabel>Hi, there!</DropdownMenuLabel>
            <DropdownMenuGroup className='flex-col'>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={ROUTES.PROFILE}></Link>Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='ml-2' onClick={handleLogout}>
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
