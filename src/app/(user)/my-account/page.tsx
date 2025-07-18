'use client';
import { useAuth } from '@/contexts/AuthContext';
import ChangePasswordTab from '@/features/user/components/ChangePassword/ChangePasswordTab';
import OrderHistoryTab from '@/features/user/components/OrderHistory/OrderHistory';
import UpdateUserTab from '@/features/user/components/UpdateUser/UpdateUserTab';
import { useState } from 'react';
import { User, Lock, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const UserPage = () => {
  const [tab, setTab] = useState<'profile' | 'orderHistory' | 'changePassword'>(
    'profile'
  );
  const { user } = useAuth();
  return (
    <div className="md:mt-5">
      <p className="font-display text-xl underline md:pb-2">
        Hi, {user?.firstName} !
      </p>
      <div className="flex md:px-25 px-5 gap-8 text-[16px] text-gray-500 md:justify-between md:w-full mb-6">
        <div className="md:px-0 w-full flex justify-between border-b">
          <button
            className={`relative flex justify-center items-center py-3 md:w-full border-b transition-all duration-200 
    ${tab === 'profile' ? 'text-black font-bold border-black' : 'text-gray-500 border-transparent hover:text-black'} 
    after:absolute after:bottom-0 after:left-1/2 after:translate-x-[-50%] after:w-0 after:h-[2px] 
    after:bg-black after:transition-all after:duration-300 hover:after:w-full`}
            onClick={() => setTab('profile')}
          >
            <User />
            <p className="ml-2">Profile</p>
          </button>

          <button
            className={`relative flex justify-center items-center py-3 md:w-full border-b transition-all duration-200 
    ${tab === 'orderHistory' ? 'text-black font-bold border-black' : 'text-gray-500 border-transparent hover:text-black'} 
    after:absolute after:bottom-0 after:left-1/2 after:translate-x-[-50%] after:w-0 after:h-[2px] 
    after:bg-black after:transition-all after:duration-300 hover:after:w-full`}
            onClick={() => setTab('orderHistory')}
          >
            <ShoppingCart />
            <p className="ml-2">Order History</p>
          </button>
          <button
            className={`relative flex justify-center items-center py-3 md:w-full border-b transition-all duration-200 
    ${tab === 'changePassword' ? 'text-black font-bold border-black' : 'text-gray-500 border-transparent hover:text-black'} 
    after:absolute after:bottom-0 after:left-1/2 after:translate-x-[-50%] after:w-0 after:h-[2px] 
    after:bg-black after:transition-all after:duration-300 hover:after:w-full`}
            onClick={() => setTab('changePassword')}
          >
            <Lock />
            <p className="ml-2">Change Password</p>
          </button>
        </div>
      </div>
      <div className="min-h-[70vh]">
        <AnimatePresence mode="wait">
          {tab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <UpdateUserTab />
            </motion.div>
          )}
          {tab === 'orderHistory' && (
            <motion.div
              key="orderHistory"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <OrderHistoryTab />
            </motion.div>
          )}
          {tab === 'changePassword' && (
            <motion.div
              key="changePassword"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ChangePasswordTab />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
export default UserPage;
