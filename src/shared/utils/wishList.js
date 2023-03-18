export const isWishReq = (id, setWish) => {
    let list = localStorage.getItem('wishList')
        ? JSON.parse(localStorage.getItem('wishList'))
        : [];

    if (list.length > 0) {
        if (list.includes(id) !== true) {
            list.push(id);
            localStorage.setItem('wishList', JSON.stringify(list));
            setWish(list);
        }
    } else {
        list.push(id);
        localStorage.setItem('wishList', JSON.stringify(list));
        setWish(list);
    }
}




export const isWish = (id, wList) => {
    if (wList !== null && wList.includes(id) === true) {
        return true;
    } else {
        return false;
    }
}


export const unWishReq = (id, setWList) => {
    let list = localStorage.getItem('wishList')
        ? JSON.parse(localStorage.getItem('wishList'))
        : [];

    if (list.length > 0) {
        if (list.includes(id) === true) {
            list.splice(list.indexOf(id), 1);
            localStorage.setItem('wishList', JSON.stringify(list));
            if (setWList) {
                setWList(list);
            }
        }
    }
}