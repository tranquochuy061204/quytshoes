

// fetch('../../data.json')
// .then(response => response.json())
// .then(data => {
   
//     localStorage.setItem("products", JSON.stringify(data))
//     if(!localStorage.getItem("cart")){
//         localStorage.setItem("cart", "[]")
//     }
//     if(!localStorage.getItem("countReload")){
//         localStorage.setItem("countReload", 1)
//     }
    
// })
// .catch(error => {
//     console.error("Error fetching data:", error);
//     dataContainer.innerText = "Failed to load data.";
// });

// let countReload = parseInt(localStorage.getItem("countReload"))

// if ()

// let productsCart = JSON.parse(localStorage.getItem("products"));

// let cartData  = JSON.parse(localStorage.getItem("cart"));

// const countProducts = document.querySelectorAll('.countProducts')

// var countPrd = 0

// function countProductFunc() {
//     if (cartData != null && cartData.length != 0) {
//     cartData.forEach (item => {
//     countPrd++
//     countProducts.forEach(product => {
//         product.innerText = parseInt(countPrd);
//     })
// })
// } else {
//     countProducts.forEach(product => {
//         product.innerText = 0;
//     })
// }
// }

// countProductFunc()


// const cartItems = document.querySelector('.cart-items')

// console.log(cartItems)


// function removeItemFromCart (productCode) {
//     let temp = cartData.filter(item => 
//         item.code != productCode
//     )
//     localStorage.setItem("cart", JSON.stringify(temp))
    
// }


// cartData.forEach((item, index) => {
     
      
//             var newCartItem = document.createElement('div');
//             newCartItem.classList.add('cart-product-item')
//             const priceString = item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
//             newCartItem.innerHTML = `
//             <button class="removeItem"><img src="./images/x-lg.svg" alt="">${item.code}</button>
//             <div class="cart-media-thumb"><img src="../.${item.image}" alt=""></div>
//             <div class="cart-media-body">
//                 <h4 class="media-heading">${item.name}</h4>
//                 <h5><span class="medida-price">${priceString}đ</span></h5>
//                 <h5>
//                     <span class="media-size">Size:</span>
//                     <span class="value">${item.size}</span>
//                 </h5>
//                 <h5>
//                 <span class="media-quantity">Số lượng:</span>
//                 <span class="quantity-value">${item.quantity}</span>
//             </h5>
//             </div>
//             `
//             cartItems.appendChild(newCartItem)
        
      
// })

// const removeBtns = document.querySelectorAll('.removeItem')

// console.log (removeBtns)

// removeBtns.forEach(btn => {
//     btn.addEventListener('click', () => {
//         removeItemFromCart(btn.innerText)
//         window.location.reload();
//     })

// })



// // Giỏ hàng đóng mở Fixed

// const fixedCart = document.querySelector('.fixedCart')

// const cart = document.querySelector('.cart')

// cart.classList.add('hide')

// fixedCart.addEventListener('click', () => {
    
//     if (cart.classList.contains('hide')) {
//         cart.classList.remove('hide')

//     } else cart.classList.add('hide')
// })

// cart.addEventListener ('click', () => {
//     cart.classList.add('hide')

// })


fetch('../../data.json')
    .then(response => response.json())
    .then(data => {
        localStorage.setItem("products", JSON.stringify(data));
        if (!localStorage.getItem("cart")) {
            localStorage.setItem("cart", "[]");
        }
      
        initializeCart();
    })
    .catch(error => {
        console.error("Error fetching data:", error);
     
    });



let productsCart = JSON.parse(localStorage.getItem("products"));
let cartData = JSON.parse(localStorage.getItem("cart"));

const countProducts = document.querySelectorAll('.countProducts');
const cartItems = document.querySelector('.cart-items');

function initializeCart() {
    updateCartDisplay();
    updateProductCountDisplay();
}

function updateCartDisplay() {
    cartItems.innerHTML = ''; // Clear current cart items
    cartData.forEach(item => {
        var newCartItem = document.createElement('div');
        newCartItem.classList.add('cart-product-item');
        const priceString = item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        newCartItem.innerHTML = `
            <button class="removeItem"><img src="./images/x-lg.svg" alt="">${item.code}</button>
            <div class="cart-media-thumb"><img src="../.${item.image}" alt=""></div>
            <div class="cart-media-body">
                <h4 class="media-heading">${item.name}</h4>
                <h5><span class="medida-price">${priceString}đ</span></h5>
                <h5>
                    <span class="media-size">Size:</span>
                    <span class="value">${item.size}</span>
                </h5>
                <h5>
                <span class="media-quantity">Số lượng:</span>
                <span class="quantity-value">${item.quantity}</span>
            </h5>
            </div>
        `;
        cartItems.appendChild(newCartItem);
    });

    const removeBtns = document.querySelectorAll('.removeItem');
    removeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            removeItemFromCart(btn.innerText);
        });
    });
}

    function updateProductCountDisplay() {
        var countPrd = 0;
        if (cartData != null && cartData.length != 0) {
            cartData.forEach(item => {
                countPrd++;
            });
        }
        countProducts.forEach(product => {
            product.innerText = parseInt(countPrd);
        });
    }

    function removeItemFromCart(productCode) {
        cartData = cartData.filter(item => item.code != productCode);
        localStorage.setItem("cart", JSON.stringify(cartData));
        updateCartDisplay();
        updateProductCountDisplay();
    }

    const removeBtns = document.querySelectorAll('.removeItem');





// Giỏ hàng đóng mở Fixed
const fixedCart = document.querySelector('.fixedCart');
const cart = document.querySelector('.cart');
cart.classList.add('hide');

fixedCart.addEventListener('click', () => {
    fixedCart.classList.add('open')
    if (cart.classList.contains('hide')) {
        cart.classList.remove('hide');
        fixedCart.classList.add('open')
    } else {
        cart.classList.add('hide');
        fixedCart.classList.remove('open')
    }
});

cart.addEventListener('click', () => {
    cart.classList.add('hide');
});






initializeCart();    


