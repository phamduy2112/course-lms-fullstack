import React, { useEffect, useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import SearchForm from './component/SearchForm'
import { Button, buttonVariants } from '@/components/ui/button'
import { FaBars } from "react-icons/fa6";
import { IoSearchOutline } from 'react-icons/io5'
import Navbar from './component/nav-bar'
// import { Link } from '@tanstack/react-router';
import { useSelector } from 'react-redux';
import { getUserDetail, logoutDeviceThunk } from '@/store/thunks/user-thunks';
import { useAppDispatch } from '@/store/hooks';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LearnPopover } from './component/learn-popover';
import { NotificationPopover } from './component/notification-popover';
import { CartPopover } from './component/cart-popover';
import { AvatarPopover } from './component/user-popover';
import { Link } from 'react-router-dom';

const Header = () => {
     const dispatch = useAppDispatch();
      
        useEffect(() => {
          dispatch(getUserDetail());
        }, [dispatch]);
      const isLogin = useSelector((state) => state?.user?.loggedIn);




    return (
        <div>
            <div className='py-2 border-b '>
                <div className='container m-auto'>
                    <div className=' lg:flex justify-between hidden'>
                        <div className='flex gap-6 items-center'>
                            <div className='text-blue-700 font-bold text-xl'>
                                COURSERA
                            </div>
                            {/* <div className='flex gap-2 items-center'>
                                Khám phá
                                <FiChevronDown />
                            </div> */}
                            <Navbar/>
                            <div className=''>
                                <SearchForm />
                            </div>


                        </div>
                       {
                        isLogin?(
                           <div className='flex gap-3 justify-center items-center'>
                             <LearnPopover/>
                             <CartPopover/>
                             <NotificationPopover/>
                            <AvatarPopover></AvatarPopover>
         
                           </div>
                        ):(  <div className='flex gap-3 justify-center items-center'>
                            <Link to="/login" className={buttonVariants({ variant: "secondary" })}>Login</Link>
                            <Link to="/login" className={buttonVariants({
                                className:"text-white"
                            })}>Get Started</Link>
                        </div>)
                       }
                    </div>
                    <div className='lg:hidden flex items-center justify-between'>
                        <div className='flex items-center  gap-5'>
                            <FaBars />
                            <div className='text-blue-700 font-bold text-xl'>
                                COURSERA
                            </div>
                        </div>

{/* 
                        <div className='flex justify-center items-center md:gap-5'>
                            <Button
                                type="submit"
                                size="icon"
                                variant="default"
                                className=" !bg-white text-black hover:!bg-blue-100"
                            >
                                <IoSearchOutline size={16} />
                            </Button>
                            <div className=''>
                                <Link to="/login" className={buttonVariants()}>Get Started</Link>
                            </div>
                        </div> */}


                    </div>

                </div>
            </div>

        </div>
    )
}

export default Header