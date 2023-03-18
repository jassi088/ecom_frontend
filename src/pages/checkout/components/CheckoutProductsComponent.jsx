import { useNavigate } from 'react-router-dom';
import { qunatityFinder } from '../../../shared/helpers/quantityFinder';
import { subTotal } from '../../../shared/helpers/subTotal';

const CheckoutProductsComponent = ({ products }) => {
    const navigate = useNavigate();
    return (
        <div className='grid grid-cols-2 md:grid-cols-1'>
            {
                products !== null && products?.length > 0
                    ?
                    (
                        products.map((prod) => {
                            return (
                                <div key={prod._id} className="col-span-1 m-2 md:py-6 md:border-t md:border-b md:my-2 md:mx-0 md:flex md:items-center md:justify-between">
                                    <div className="md:flex md:items-center md:space-x-4">

                                        {/* Product details */}
                                        <img
                                            onClick={e => navigate(`/products/${prod._id}`)}
                                            className="cursor-pointer md:h-20 md:w-20 object-cover object-center"
                                            src={prod.pImages[0]}
                                            alt={prod.pName}
                                        />
                                        <div className="text-lg md:ml-6 truncate">{prod.pName}</div>
                                        <div className="md:ml-6 font-semibold text-gray-600 text-sm">
                                            Price : ${prod.pPrice}.00{" "}
                                        </div>
                                        <div className="md:ml-6 font-semibold text-gray-600 text-sm">
                                            Quantitiy : {qunatityFinder(prod._id)}
                                        </div>
                                        <div className="font-semibold text-gray-600 text-sm">
                                            Subtotal : ${subTotal(prod._id, prod.pPrice)}.00
                                        </div>

                                    </div>
                                </div>
                            )
                        })
                    )
                    :
                    (
                        <div>No product found for checkout</div>
                    )
            }
        </div>
    )
}

export default CheckoutProductsComponent