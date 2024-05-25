





// let selectedSize = document.querySelector('.selected-size')

// const warning = document.querySelector('.warning')

// const warning1 = document.querySelector('.warning-1')


// function addItemToCart (productCode) {
//     let product = productsCart.find(product => {
//         return product.code == productCode
//     })

//     if (selectedSize == undefined) {
//        warning.style.display = 'block'
//     }
//     else {
//     if (cartData.length == 0) {
//         product.quantity = 1
//         cartData.push(product)
//         product.size = selectedSize.innerText
//     } else {
//         let res = cartData.find(element => element.code == productCode)
//         console.log (res)
//         if (res == undefined) {
//             cartData.push(product)
//             product.size = selectedSize.innerText
            
//         } else {
//             if (res.quantity != undefined) {
//                 console.log(productCode)
//                 let quantityTemp = res.quantity
//                 console.log(res.quantity)
//                 removeItemFromCart(product.code)
//                 updateQuantity(res.code, quantityTemp + 1)
//             }
//             else {
//                 console.log(productCode)
//                 removeItemFromCart(product.code)
//                 updateQuantity(res.code, 1)
//             }
//             localStorage.setItem("cart", JSON.stringify(cartData))
//             window.location.reload();
//             return
//         }
//     }
    
//     localStorage.setItem("cart", JSON.stringify(cartData))
    
//     window.location.reload();
//     }
// }

// function convertToNumberIfPossible(value) {
//     if (typeof value === 'string') {
//         // Kiểm tra nếu giá trị có thể chuyển đổi thành số
//         let number = Number(value);
//         if (!isNaN(number)) {
//             return number;
//         }
//     }
//     return value; // Trả về giá trị gốc nếu không thể chuyển đổi
// }









// function updateQuantity (productCode, quantity) {
//     cartData.forEach(item => {
//         if(item.code == productCode) 
//             item.quantity = quantity
//     })

//     localStorage.setItem("cart", JSON.stringify(cartData))
// }





function removeItemFromCart(productCode) {
    cartData = cartData.filter(item => item.code != productCode);
    localStorage.setItem("cart", JSON.stringify(cartData));
    updateCartDisplay();
    updateProductCountDisplay();
}

function addItemToCart(productCode) {
    let product = productsCart.find(product => product.code == productCode);

    if (!product) {
        console.error("Product not found!");
        return;
    }

    if (selectedSize == undefined) {
        warning.style.display = 'block';
        return;
    }

    let existingProduct = cartData.find(item => item.code == productCode);

    if (!existingProduct) {
        product.quantity = 1;
        product.size = selectedSize.innerText;
        cartData.push(product);
    } else {
        existingProduct.quantity += 1;
    }

    localStorage.setItem("cart", JSON.stringify(cartData));
    updateCartDisplay();
    updateProductCountDisplay();
    cart.classList.remove('hide');
}

function updateQuantity(productCode, quantity) {
    cartData.forEach(item => {
        if (item.code == productCode) {
            item.quantity = quantity;
        }
    });

    localStorage.setItem("cart", JSON.stringify(cartData));
    updateCartDisplay();
    updateProductCountDisplay();
}
