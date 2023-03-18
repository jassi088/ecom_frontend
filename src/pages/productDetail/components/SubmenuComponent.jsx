import { useNavigate } from 'react-router-dom';

const SubmenuComponent = ({ categoryId, cName, pName }) => {
    const navigate = useNavigate();
    return (
        <section className="mx-4 mt-24 md:mx-12 md:mt-32 lg:mt-24 pt-4">
            <div className="flex justify-between items-center">
                <div className="text-sm flex items-center space-x-2">
                    <span
                        className="hover:text-yellow-700 cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        Shop
                    </span>
                    <div>
                        <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 5l7 7-7 7M5 5l7 7-7 7"
                            />
                        </svg>
                    </div>
                    <span
                        className="hover:text-yellow-700 cursor-pointer"
                        onClick={() => navigate(`/products/category/${categoryId}`)}
                    >
                        {cName}
                    </span>
                    <div>
                        <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 5l7 7-7 7M5 5l7 7-7 7"
                            />
                        </svg>
                    </div>
                    <span className="text-yellow-700 cursor-default">{pName}</span>
                </div>

            </div>
        </section>
    )
}

export default SubmenuComponent;