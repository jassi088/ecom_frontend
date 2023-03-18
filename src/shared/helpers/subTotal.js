export const subTotal = (id, price) => {
    let subTotalCost = 0;
    let cart = JSON.parse(localStorage.getItem('cart'));

    cart.forEach(item => {
        if (item.id === id) {
            subTotalCost = item.quantity * price;
        }
    });
    return subTotalCost;
}