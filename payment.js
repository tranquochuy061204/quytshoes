cartData = JSON.parse(localStorage.getItem('cart'));

const payList = document.querySelector('.pay-list');

function payListInit() {

    payList.innerHTML = `<div class="title">
                                GIỎ HÀNG
                            </div>
                        </div>`

    cartData.forEach(item => {
        let newProduct = document.createElement('div');
        newProduct.classList.add('prd-list');

        const priceString = item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        var genderTranslate = item.gender;
        if (genderTranslate === 'male') {
            genderTranslate = 'nam';
        } else if (genderTranslate === 'female') {
            genderTranslate = 'nữ';
        }

        newProduct.innerHTML = `
            <div class="prd-image">
                <img src="${item.image}" alt="">
            </div>
            <div class="prd-detail">
                <h1 class="prd-name">${item.name}</h1>
                <p class="prd-price">Giá: <span class="price-value">${priceString}</span></p>
                <p class="prd-size">Size: <span class="size-value">${item.size}</span></p>
                <p class="prd-quantity">Số lượng: <span class="quantity-value">${item.quantity}</span></p>
                <button class="remove-btn" data-code="${item.code}" data-size="${item.size}">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        `;

        payList.appendChild(newProduct);
        payList.innerHTML += '<div class="line"></div>';
    });

    attachRemoveEventListeners(); // Attach event listeners to the remove buttons
}

function attachRemoveEventListeners() {
    let removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const productCode = btn.getAttribute('data-code');
            const productSize = btn.getAttribute('data-size');
            removeItemFromCart(productCode, productSize);
            
        });
    });
}

payListInit();