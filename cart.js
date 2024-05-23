


  fetch('../../data.json')
            .then(response => response.json())
            .then(data => {
               
                localStorage.setItem("products", JSON.stringify(data))
                if(!localStorage.getItem("cart")){
                    localStorage.setItem("cart", "[]")
                }
                
               

            })
            .catch(error => {
                console.error("Error fetching data:", error);
                dataContainer.innerText = "Failed to load data.";
            });



let products = JSON.parse(localStorage.getItem("products"));

let cartData  = JSON.parse(localStorage.getItem("cart"));


let selectedSize = document.querySelector('.selected-size')

const warning = document.querySelector('.warning')

const warning1 = document.querySelector('.warning-1')

const countProducts = document.querySelectorAll('.countProducts')

var countPrd = 0

function countProductFunc() {
    cartData.forEach (item => {
    countPrd++
    countProducts.forEach(product => {
        product.innerText = parseInt(countPrd);
    })
})

}

countProductFunc()

function addItemToCart (productCode) {
    let product = products.find(product => {
        return product.code == productCode
    })

    if (selectedSize == undefined) {
       warning.style.display = 'block'
    }
    else {
    if (cartData.length == 0) {
        cartData.push(product)
        product.size = selectedSize.innerText
    } else {
        let res = cartData.find(element => element.code == productCode)
        if (res == undefined) {
            cartData.push(product)
            product.size = selectedSize.innerText
            
        } else {
            warning1.style.display = 'block'
            warning.style.display = 'none'
            return
        }
    }
    
    localStorage.setItem("cart", JSON.stringify(cartData))
    
    window.location.reload();
    }
}

function convertToNumberIfPossible(value) {
    if (typeof value === 'string') {
        // Kiểm tra nếu giá trị có thể chuyển đổi thành số
        let number = Number(value);
        if (!isNaN(number)) {
            return number;
        }
    }
    return value; // Trả về giá trị gốc nếu không thể chuyển đổi
}





function removeItemFromCart (productCode) {
    let temp = cartData.filter(item => 
        item.code != productCode
    )
    localStorage.setItem("cart", JSON.stringify(temp))
    window.location.reload();
}





function updateQuantity (productCode, quantity) {
    cartData.forEach(item => {
        if(item.code == productCode) 
            product.quantity = quantity
    })

    localStorage.setItem("cart", JSON.stringify(cartData))
}


const cartItems = document.querySelector('.cart-items')





cartData.forEach((item, index) => {
     
      
            var newCartItem = document.createElement('div');
            newCartItem.classList.add('cart-product-item')
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
            </div>
            `
            cartItems.appendChild(newCartItem)
        
      
})


const removeBtns = document.querySelectorAll('.removeItem')
removeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        removeItemFromCart(btn.innerText)

    })

})


// Giỏ hàng đóng mở Fixed

const fixedCart = document.querySelector('.fixedCart')

const cart = document.querySelector('.cart')

cart.classList.add('hide')

fixedCart.addEventListener('click', () => {
    
    if (cart.classList.contains('hide')) {
        cart.classList.remove('hide')

    } else cart.classList.add('hide')
})

cart.addEventListener ('click', () => {
    cart.classList.add('hide')

})