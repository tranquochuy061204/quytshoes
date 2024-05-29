let selectedSize = document.querySelector('.selected-size')

let selectedQuantity = document.querySelector('.selected-quantity')

console.log(selectedQuantity)


function removeItemFromCart(productCode) {
    cartData = cartData.filter(item => item.code != productCode);
    localStorage.setItem("cart", JSON.stringify(cartData));
    updateCartDisplay();
    updateProductCountDisplay();
    updateTotalPrice ();
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

    let existingProduct = cartData.find(item => item.code == productCode);

    if (!existingProduct) {
        product.size = selectedSize.innerText;
        product.quantity = parseInt(selectedQuantity.innerText);
        
        cartData.push(product);
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
