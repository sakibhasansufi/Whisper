import { useState } from "react";
import logo from '../../../assets/8-removebg-preview.png'
import { Link } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { Helmet } from "react-helmet-async";


const SignUp = () => {
    const [formData, setFormData] = useState({
        email: "",
        userName: "",
        fullName: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const isError = false;
    return (
        <div className="max-w-screen-xl mx-auto flex h-screen px-10 font-roboto">
            <Helmet>
                <title>Sign Up</title>
            </Helmet>
            <div className='flex-1 hidden lg:flex items-center  justify-center'>
                <img src={logo} alt="" />

            </div>
            <div className='flex-1 flex flex-col justify-center items-center'>
                <img src={logo} alt="" className="block lg:hidden mt-28 md:mt-44" />
                <form className='lg:w-2/3  mx-auto md:mx-20 flex gap-4 flex-col -mt-12 md:-mt-32 lg:mt-0' onSubmit={handleSubmit}>

                    <h1 className='text-4xl font-extrabold text-white'>Join Now</h1>
                    <label className='input input-bordered rounded flex items-center gap-2'>
                        <MdOutlineMail />
                        <input
                            type='email'
                            className='grow'
                            placeholder='Email'
                            name='email'
                            onChange={handleInputChange}
                            value={formData.email}
                        />
                    </label>
                    <div className='flex gap-4 flex-wrap'>
                        <label className='input input-bordered rounded flex items-center gap-2 flex-1'>
                            <FaUser />
                            <input
                                type='text'
                                className='grow '
                                placeholder='Username'
                                name='userName'
                                onChange={handleInputChange}
                                value={formData.userName}
                            />
                        </label>
                        <label className='input input-bordered rounded flex items-center gap-2 flex-1'>
                            <MdDriveFileRenameOutline />
                            <input
                                type='text'
                                className='grow'
                                placeholder='Full Name'
                                name='fullName'
                                onChange={handleInputChange}
                                value={formData.fullName}
                            />
                        </label>
                    </div>
                    <label className='input input-bordered rounded flex items-center gap-2'>
                        <MdPassword />
                        <input
                            type='password'
                            className='grow'
                            placeholder='Password'
                            name='password'
                            onChange={handleInputChange}
                            value={formData.password}
                        />
                    </label>
                    <button className='btn rounded-full btn-primary text-white'>Sign up</button>
                    {isError && <p className='text-red-500'>Something went wrong</p>}
                </form>
                <div className='flex flex-col  w-full md:w-[470px] lg:w-2/3 gap-2 mt-4'>
                    <p className='text-white text-lg'>Already have an account?</p>
                    <Link to='/login'>
                        <button className='btn rounded-full btn-primary text-white btn-outline w-full'>Sign in</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignUp;