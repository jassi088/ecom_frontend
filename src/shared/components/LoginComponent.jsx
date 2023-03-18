import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authUserAction } from 'src/redux/slices/AuthSlice';
import { loginSignUpModalToggle } from 'src/redux/slices/LayoutSlice';
import { loginReq } from '../apiCall/authRequest';


const LoginComponent = () => {

    const dispatch = useDispatch();

    const [data, setData] = useState({
        email: '',
        password: '',
        error: false,
        loading: false,
    });

    const alert = (msg, type) => {
        return <div className={`text-end text-sm text-${type}-500`}>{msg}</div>
    }


    const onSubmit = async () => {
        try {
            setData({
                ...data,
                loading: true,
            });

            let { data: responseData } = await loginReq({
                email: data.email,
                password: data.password,
            });
            // console.log(responseData);
            if (responseData.error) {
                setData({
                    ...data,
                    loading: false,
                    error: responseData.error,
                })
            } else if (responseData.token) {
                setData({
                    email: '',
                    password: '',
                    error: false,
                    loading: false,
                });
                localStorage.setItem('jwt', JSON.stringify(responseData));
                dispatch(authUserAction(responseData));
                dispatch(loginSignUpModalToggle(false));
            }
        }
        catch (error) { }

    }



    return (
        <>
            <div className="text-center text-2xl mb-6">Login</div>

            <form className="space-y-4">

                <div className="flex items-center justify-between mb-4">
                    <label htmlFor="name" className='text-lg'>
                        Name or email
                    </label>
                    <input
                        type='text'
                        id='name'
                        className={`w-2/4 sm:w-4/6 px-4 py-2 focus:outline-none border`}
                        value={data.email}
                        onChange={e => setData({
                            ...data,
                            email: e.target.value,
                            error: false
                        })}
                    />
                </div>




                <div className="flex items-center justify-between mb-4">
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
                            password: e.target.value,
                            error: false
                        })}
                    />
                </div>

                {
                    data?.error && alert(data?.error, "red")
                }

                <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:items-center">
                    <div>
                        <input
                            type="checkbox"
                            id="rememberMe"
                            className="px-4 py-2 focus:outline-none border mr-1"
                        />
                        <label htmlFor="rememberMe">
                            Remember me<span className="text-sm text-gray-600">*</span>
                        </label>
                    </div>
                    <a className="block text-gray-600" href="/">
                        Lost your password?
                    </a>
                </div>
                <div
                    style={{ background: "#303031" }}
                    className="font-medium px-4 py-2 text-white text-center cursor-pointer"
                    onClick={onSubmit}
                >
                    {
                        data.loading ? "Loading" : "Login"
                    }
                </div>
            </form>
        </>
    )
}

export default LoginComponent;