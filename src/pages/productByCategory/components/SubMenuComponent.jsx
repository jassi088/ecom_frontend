import { useNavigate } from 'react-router-dom';

const SubMenuComponent = ({category}) => {
    const navigate = useNavigate();
    return (
        <section className="mx-4 mt-24 md:mx-12 md:mt-32 lg:mt-24 pt-4">
            <div className="flex justify-between items-center">


                <div className="text-sm flex items-center space-x-3">

                    <span className="hover:text-yellow-700 cursor-pointer" onClick={() => navigate("/")}>Shop</span>

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

                    <span className="text-yellow-700 cursor-default">{category}</span>

                </div>

                
            </div>
        </section>
    )
}

export default SubMenuComponent;