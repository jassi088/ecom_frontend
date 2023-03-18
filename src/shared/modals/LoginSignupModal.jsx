import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginSignUpModalToggle } from '../../redux/slices/LayoutSlice';
import LoginComponent from '../components/LoginComponent';
import SignupComponent from '../components/SignupComponent';

const LoginSignupModal = () => {
    const [modalTitle, setModalTitle] = useState("Create an account");
    const [isLoginModal, setIsLoginModal] = useState(true);
    const disptach = useDispatch();
    const isLoginSignupModal = useSelector(state => state.layout.loginSignUpModal)
    const closeModal = () => {
        disptach(loginSignUpModalToggle(false));
    }

    const changeLoginSignup = () => {
        if (isLoginModal) {
            setIsLoginModal(false);
            setModalTitle("Login");
        } else {
            setIsLoginModal(true);
            setModalTitle("Create an account")
        }
    }
    return (
        ReactDOM.createPortal(
            <>
                {/* Back Overlay */}
                <div className={`${!isLoginSignupModal && "hidden"} fixed top-0 z-40 w-full h-screen bg-black opacity-50 cursor-pointer`} />

                {/* Signup Login Component Render */}
                <section className={`${!isLoginSignupModal && "hidden"} fixed z-40 inset-0 my-8 md:my-20 flex items-start justify-center overflow-auto`}>

                    <div style={{ maxHeight: '35rem', overflow: "auto" }} className="w-11/12 md:w-3/5 lg:w-2/4 relative space-y-4 bg-white p-6 md:px-12 md:py-6">

                        {/* Display Login or Signup Component */}
                        {isLoginModal ?
                            <LoginComponent /> :
                            <SignupComponent />
                        }


                        {/* ---------------------------------------------------------- */}

                        {/* After Component part */}
                        <div className="flex items-center space-x-4">
                            <span className='border-b border-gray-500 w-full' />
                            <span className='font-medium'>or</span>
                            <span className='border-b border-gray-500 w-full' />
                        </div>

                        <div className='px-4 py-2 font-medium text-center cursor-pointer'
                            style={{ color: '#303031', border: '1px solid #303031' }}
                            onClick={changeLoginSignup}
                        >
                            {modalTitle}
                        </div>

                        {/* ---------------------------------------------------------- */}

                        {/* Modal close button */}
                        <div className='absolute top-0 right-0 mx-4'
                            onClick={closeModal}>
                            <svg
                                className="w-6 h-6 cursor-pointer"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>

                        {/* ---------------------------------------------------------- */}

                    </div>
                </section>
            </>,
            document.getElementById('root')
        )
    )
}

export default LoginSignupModal;