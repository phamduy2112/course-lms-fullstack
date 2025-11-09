import React from 'react'
import { FiChevronDown } from 'react-icons/fi'
import SearchForm from './component/SearchForm'
import { Button, buttonVariants } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { FaBars } from "react-icons/fa6";
import { IoSearchOutline } from 'react-icons/io5'

const Header = () => {
    return (
        <div>
            <div className='py-2 border-b '>
                <div className='container m-auto'>
                    <div className=' lg:flex justify-between hidden'>
                        <div className='flex gap-6 items-center'>
                            <div className='text-blue-700 font-bold text-xl'>
                                COURSERA
                            </div>
                            <div className='flex gap-2 items-center'>
                                Khám phá
                                <FiChevronDown />
                            </div>
                            <div className=''>
                                <SearchForm />
                            </div>


                        </div>
                        <div className='flex gap-3'>
                            <Link to="/login" className={buttonVariants({ variant: "secondary" })}>Login</Link>
                            <Link to="/login" className={buttonVariants()}>Get Started</Link>
                        </div>
                    </div>
                    <div className='lg:hidden flex items-center justify-between'>
                        <div className='flex items-center  gap-5'>
                            <FaBars />
                            <div className='text-blue-700 font-bold text-xl'>
                                COURSERA
                            </div>
                        </div>


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
                        </div>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default Header