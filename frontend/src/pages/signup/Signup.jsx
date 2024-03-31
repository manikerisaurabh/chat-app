import React from 'react'
import GenderCheckbox from './GenderCheckbox'

const Signup = () => {
    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg  bg-opacity-0'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    Sign Up
                    <span className='text-blue-500'>ChatApp</span>
                </h1>

                <form>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text text-black font-semibold'>Full Name</span>
                        </label>
                        <input type="text" placeholder='Saurabh Manikeri' className='w-full input input-bordered h-10' />
                    </div>

                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text text-black font-semibold'>Username</span>
                        </label>
                        <input type="text" placeholder='manikerisaurabh' className='w-full input input-bordered h-10' />
                    </div>

                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text  text-black font-semibold'>Password</span>
                        </label>
                        <input type="password" placeholder='Enter password' className='w-full input input-bordered h-10' />
                    </div>


                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text  text-black font-semibold'>Confirm Password</span>
                        </label>
                        <input type="password" placeholder='Confirm password' className='w-full input input-bordered h-10' />
                    </div>

                    {/* gender checkbox */}
                    <GenderCheckbox />
                    <a href="#" className='text-sm text-black hover:underline hover:text-blue-600 mt-2 inline-block'>
                        Already have an account?
                    </a>

                    <div>
                        <button className='btn btn-block btn-sm mt-2 border border-slate-700 '>Sign Up</button>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default Signup