import { useState } from "react";
import logo from '../../../assets/8-removebg-preview.png'
import { Link } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";
import { MdPassword } from "react-icons/md";
import { Helmet } from "react-helmet-async";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";


const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const queryClient = useQueryClient();

    const { mutate:loginMutation, isError, isPending, error } = useMutation({
        mutationFn: async ({ email, password }) => {
            try {
                const res = await fetch("/api/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({  email, password }),
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Failed to create account");
				console.log(data);
				return data;
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        onSuccess: () => {
			toast.success("Log in successfully");
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
		},
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        loginMutation(formData);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className='max-w-screen-xl mx-auto flex h-screen'>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <div className='flex-1 hidden lg:flex items-center  justify-center'>
                <img src={logo} alt="" />
            </div>
            <div className='flex-1 flex flex-col justify-center items-center'>
                <img src={logo} alt="" className="block lg:hidden mt-28 md:mt-44" />
                <form className='w-[270px] md:w-10/12  mx-auto md:mx-20 flex gap-4 flex-col -mt-12 md:-mt-32 lg:mt-0' onSubmit={handleSubmit}>
                    <h1 className='text-4xl font-extrabold text-white'>{"Let's"} go.</h1>
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
                    <button className='btn rounded-full btn-primary text-white'>
                    {isPending ? "Loading..." : "Log in"}
                    </button>
                    {isError && <p className='text-red-500'>{error.message}</p>}
                </form>
                <div className='flex flex-col w-[270px] md:w-10/12 gap-2 mt-4'>
                    <p className='text-white text-lg'>{"Don't"} have an account?</p>
                    <Link to='/signUp'>
                        <button className=' btn rounded-full btn-primary text-white btn-outline w-full'>Sign up</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;