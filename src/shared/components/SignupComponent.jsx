import React, { useState } from 'react';
import { signupReq } from '../apiCall/authRequest';

const SignupComponent = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        cPassword: '',
        error: false,
        loading: false,
        success: false
    });

    const alert = (msg, type) => {

        return <div className={`text-end text-sm text-${type}-500`}>{msg}</div>

    }

    const onSubmit = async () => {
        setData({ ...data, loading: true });
        if (data.password !== data.cPassword) {
            return setData({
                ...data,
                error: {
                    password: "Passwords do not match",
                    cPassword: "Passwords do not match",
                }
            });
        };

        try {
            let { data: responseData } = await signupReq({
                name: data.name,
                email: data.email,
                password: data.password,
                cPassword: data.cPassword,
            });

            if (responseData.error) {
                setData({
                    ...data,
                    loading: false,
                    error: responseData.error,
                    password: '',
                    cPassword: '',
                });
            } else if (responseData.success) {
                setData({
                    ...data,
                    name: '',
                    email: '',
                    password: '',
                    cPassword: '',
                    error: false,
                    loading: false,
                    success: responseData.success,
                })
            }
        } catch (error) { }
    }

    return (
        <>
            <h3 className='text-center text-2xl mb-6'>Register</h3>
            <form className='space-y-4'>

                {
                    data?.success && alert(data.success, "green")
                }

                <div className="flex items-center justify-between mb-4">
                    <label htmlFor="name" className='text-lg'>
                        Name
                    </label>
                    <input
                        type='text'
                        id='name'
                        className={`w-2/4 sm:w-4/6 px-4 py-2 focus:outline-none border`}
                        value={data.name}
                        onChange={e => setData({
                            ...data,
                            success: false,
                            error: {},
                            name: e.target.value
                        })}
                    />
                </div>
                {
                    data?.error?.name && alert(data?.error?.name, "red")
                }

                <div className="flex items-center justify-between mb-4">
                    <label htmlFor="email" className='text-lg'>
                        Email
                    </label>
                    <input
                        type='email'
                        id='email'
                        className={`w-2/4 sm:w-4/6 px-4 py-2 focus:outline-none border`}
                        value={data.email}
                        onChange={e => setData({
                            ...data,
                            success: false,
                            error: {},
                            email: e.target.value
                        })}
                    />
                </div>
                {
                    data.error.email && alert(data.error.email, "red")
                }

                <div className={`flex items-center justify-between ${data?.error?.password ? "" : "mb-4"}`}>
                    <label htmlFor="password" className='text-lg'>
                        Password
                    </label>
                    <input
                        type='password'
                        id='password'
                        className={`w-2/4 sm:w-4/6 px-4 py-2 focus:outline-none border`}
                        value={data.password}
                        onChange={e => setData({
                            ...data,
                            success: false,
                            error: {},
                            password: e.target.value
                        })}
                    />
                </div>
                {
                    data.error.password && alert(data.error.password, "red")
                }


                <div className={`flex items-center justify-between ${data?.error?.cPassword ? "" : "mb-4"}`}>
                    <label htmlFor="cpassword" className='text-lg'>
                        Confirm Password
                    </label>
                    <input
                        type='password'
                        id='cpassword'
                        className={`w-2/4 sm:w-4/6 px-4 py-2 focus:outline-none border`}
                        value={data.cPassword}
                        onChange={e => setData({
                            ...data,
                            success: false,
                            error: {},
                            cPassword: e.target.value
                        })}
                    />
                </div>
                {
                    data.error.cPassword && alert(data.error.cPassword, "red")
                }


                <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:items-center">
                    <div>
                        <input
                            type='checkbox'
                            id='rememberMe'
                            className={`px-4 py-2 focus:outline-none border`}
                        />
                        <label htmlFor="rememberMe">
                            Remember me
                            <span className='text-sm text-gray-600 ml-1'>*</span>
                        </label>
                    </div>
                    <a className='block textx-gray-600' href='/'>Lost your password?</a>
                </div>

                <div style={{ background: "#303031" }}
                    className="px-4 py-2 text-white text-center cursor-pointer font-medium"
                    onClick={onSubmit}>
                    {data.loading ? "Loading..." : "Create an account"}
                </div>

            </form>


        </>
    )
}

export default SignupComponent;