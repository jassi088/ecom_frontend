export const qunatityFinder = (id) => {
    let product = 0;
    let cart = JSON.parse(localStorage.getItem('cart'));

    cart?.forEach(item => {
        if (item.id === id) {
            product = item.quantity;
        }
    })
    return product;
}