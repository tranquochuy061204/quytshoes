let selectedSize = document.querySelector('.selected-size')

let selectedQuantity = document.querySelector('.selected-quantity')

console.log(selectedQuantity)


function removeItemFromCart(productCode, productSize) {
    cartData = cartData.filter(item => !(item.code == productCode && item.size == productSize));

    localStorage.setItem("cart", JSON.stringify(cartData));
    updateCartDisplay();
    updateProductCountDisplay();
    updateTotalPrice();
}

 const warning = document.querySelector('.warning')

function addItemToCart(productCode) {
    let product = productsCart.find(product => product.code == productCode);

    if (!product) {
        console.error("Product not found!");
        return;
    }

    if (selectedSize == null || selectedQuantity == null) {
        warning.style.display = 'block';
        return;
    }
    warning.style.display = 'none';

    let existingProduct = cartData.find(item => item.code == productCode && item.size == selectedSize.innerText);

    console.log(existingProduct)

    if (!existingProduct) {
        let newProduct = { ...product, size: selectedSize.innerText, quantity: parseInt(selectedQuantity.innerText) };
        cartData.push(newProduct);
    } else {
        existingProduct.quantity += parseInt(selectedQuantity.innerText);
    }

    localStorage.setItem("cart", JSON.stringify(cartData));
    updateCartDisplay();
    updateProductCountDisplay();
    updateTotalPrice ();
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
    updateTotalPrice ();
}
