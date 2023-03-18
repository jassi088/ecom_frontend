
const totalCost = () => {
    let totalCost = 0;
    let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

    cart.forEach(item => {
        totalCost += item.quantity * item.price;
    })

    return totalCost;

}

export default totalCost;