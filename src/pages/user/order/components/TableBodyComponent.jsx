import moment from "moment";

const TableBodyComponent = ({ order }) => {
    return (
        <tr className="border-b">

            {/* Products */}
            <td className="w-48 hover:bg-gray-200 p-2 flex flex-col space-y-1">
                {
                    order?.allProduct?.map((prod, i) => {
                        return (
                            <span className="block flex items-center justify-center space-x-2" key={i}>
                                <img className="w-8 h-8 object-cover object-center" src={prod?.id?.pImages[0]} alt={prod?.id?.pName} />
                                <span>{prod?.id?.pName}</span>
                            </span>
                        )
                    })
                }
            </td>


            {/* Status */}
            <td className="hover:bg-gray-200 p-2 text-center cursor-default">
                {order.status === "Not processed" && (
                    <span className="block text-red-600 rounded-full text-center text-xs px-2 font-semibold">
                        {order.status}
                    </span>
                )}
                {order.status === "Processing" && (
                    <span className="block text-yellow-600 rounded-full text-center text-xs px-2 font-semibold">
                        {order.status}
                    </span>
                )}
                {order.status === "Shipped" && (
                    <span className="block text-blue-600 rounded-full text-center text-xs px-2 font-semibold">
                        {order.status}
                    </span>
                )}
                {order.status === "Delivered" && (
                    <span className="block text-green-600 rounded-full text-center text-xs px-2 font-semibold">
                        {order.status}
                    </span>
                )}
                {order.status === "Cancelled" && (
                    <span className="block text-red-600 rounded-full text-center text-xs px-2 font-semibold">
                        {order.status}
                    </span>
                )}
            </td>


            {/* Total */}
            <td className="hover:bg-gray-200 p-2 text-center">${order.amount}.00</td>

            {/* Phone */}
            <td className="hover:bg-gray-200 p-2 text-center">{order.phone}</td>

            {/* Address */}
            <td className="hover:bg-gray-200 p-2 text-center">{order.address}</td>

            {/* Transaction Id */}
            <td className="hover:bg-gray-200 p-2 text-center">
                {order.transactionId}
            </td>

            {/* Created at order time */}
            <td className="hover:bg-gray-200 p-2 text-center">
                {moment(order.createdAt).format("lll")}
            </td>

            {/* Order updated at */}
            <td className="hover:bg-gray-200 p-2 text-center">
                {moment(order.updatedAt).format("lll")}
            </td>


        </tr >
    )
}

export default TableBodyComponent;