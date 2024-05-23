let mockData = []

let loadMoreBtn = document.querySelector('#load-more')

let currentItem = 8;

let buttons = document.querySelectorAll('.btn-brand')

var products = document.querySelector('.products');

fetchData();

async function fetchData() {
    try {
      // Sử dụng fetch API để lấy dữ liệu từ file JSON
      const response = await fetch('data.json');
  
      // Kiểm tra nếu response.ok là true
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      // Chuyển đổi dữ liệu JSON thành JavaScript objects
      const data = await response.json();
  
      // Lưu trữ dữ liệu vào dataArray
      mockData = data;
  
      // In ra console để kiểm tra dữ liệu
      console.log(mockData);

      const listInitFunc = await listInit();

      const Init = pageInit();
        
    } catch (error) {
      // Xử lý lỗi (nếu có)
      console.error('Fetch error:', error);
    }
  }



  function listInit () {

    mockData.forEach( item => {
   
    var newProduct = document.createElement('div');
    newProduct.classList.add('product-item', 'col-md-3', item.brand);
    const priceString = item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    newProduct.innerHTML = 
            `<div class="pro-item">
        <div class="pro-top"><a class="pro-thumb" href="${item.link}"><img src="${item.image}" alt=""></a></div>
        </div>
        <div class="pro-top-hover"><a href="${item.link}"><img src="${item.imageHover}" alt=""></a></div>
        <p class="pro-name"><a class="pro-name-link" href="${item.link}">${item.name}</a></p>
        <p class="pro-price">${priceString}đ</p>`;

        products.appendChild(newProduct);

    }); 
}



     
    function pageInit()  {
    
        var products = document.querySelectorAll('.product-item');
       
        console.log(products)

        products.forEach(product => {
            product.classList.add('showed')

        })
        // Bắt đầu từ thẻ con thứ 8
        products.forEach(product => {
            product.classList.add('hide');
            product.classList.remove('showed')


        })
    
        filterBrand('Adidas')
        clickSearch();
    }

 


// Filter 
function filterBrand (value) {
    let buttons = document.querySelectorAll('.btn-brand') 

    buttons.forEach(btn => 
        {
            if (value.toUpperCase()  === btn.innerText.toUpperCase()) {
                btn.classList.add("active")
            } 
            else {
                btn.classList.remove("active")
            }
        }
    )
    
    let products = document.querySelectorAll('.product-item')

    products.forEach(product => {
        if (product.classList.contains(value))
            {
                product.classList.add('showed')
                product.classList.remove('hide')
            }
            
    
        else {
                product.classList.remove('showed')
                product.classList.add('hide')

        }
    })
        

}



function clickSearch () {
        let subloadMoreBtn = document.querySelector('#sub-load-more')
        loadMoreBtn.style.display ='none'
        subloadMoreBtn.style.display = 'none'

        let buttons = document.querySelectorAll('.btn-brand') 
      
        let txtSearch = searchInput.value.trim().toUpperCase();
       
        let listProducts = document.querySelectorAll('.product-item');
        
         let count = 0

        buttons.forEach (btn => {
            if (btn.classList.contains('active')) {
            listProducts.forEach(item => {
                item.classList.add('hide');
                if (item.innerText.toUpperCase().includes(txtSearch) && item.classList.contains(btn.innerText)) { 
                    
                        
                        item.classList.remove('hide');
                        item.classList.add('showed');
                        item.classList.add('searched-item')
                        count++
                    
                }
                else {
                    item.classList.remove('searched-item')
                    item.classList.add('hide');
                    item.classList.remove('showed');
                }
    
            })
            }
        })
        
            console.log(count)

        if (count > 8) {
           
            var showedItems = document.querySelectorAll('.showed');
            for (var i = 0; i < showedItems.length; i++){
                showedItems[i].classList.add('showed')
            }
            // Bắt đầu từ thẻ con thứ 8
            for (var i = 8; i < showedItems.length; i++) {
                showedItems[i].classList.add('hide');
                showedItems[i].classList.remove('showed')
            }

            
            let subcurrentItem = 8;
            

            subloadMoreBtn.style.display = 'block'

            subloadMoreBtn.onclick = () => {
                let products = [... document.querySelectorAll('.wrapper .products .searched-item')]
                
                for (var i = subcurrentItem; i < subcurrentItem + 8; i++){
                if(products[i] != undefined) 
                    {products[i].classList.remove('hide')
                        products[i].classList.add('showed')
                    }
                }
                subcurrentItem += 8 
                if (subcurrentItem > products.length) {
                    subcurrentItem = products.length
                }

                if (subcurrentItem >= products.length) {
                    subloadMoreBtn.style.display ='none';
                }
            } 
        } 

        buttons.forEach(btn => { 
            if (btn.classList.contains('active')) {
                mockData.forEach((data,index) => {
                    if (txtSearch===data.code && btn.innerText === data.brand) {
                    
                    var newProduct = document.createElement('div');
                    newProduct.classList.add('product-item', 'col-md-3');
                    const priceString = mockData[index].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    newProduct.innerHTML = 
                        `<div class=pro-item">
                    <div class="pro-top"><a class="pro-thumb" href="${mockData[index].link}"><img src="${mockData[index].image}" alt=""></a></div>
                    </div>
                    <div class="pro-top-hover"><a href="${mockData[index].link}"><img src="${mockData[index].imageHover}" alt=""></a></div>
                    <p class="pro-name"><a class="pro-name-link" href="${mockData[index].link}">${mockData[index].name}</a></p>
                    <p class="pro-price">${priceString}đ</p>`;
        
                    products.appendChild(newProduct);
                 
                        
                    } 
                })
            }
            
         })
       
}

var searchInput = document.querySelector('.search-bar-wrapper input');


searchInput.addEventListener('keydown', function(e) {
    
    if (e.keyCode === 13) {

        loadMoreBtn.style.display ='none'
        
        let subloadMoreBtn = document.querySelector('#sub-load-more')

        subloadMoreBtn.style.display = 'none'

        let buttons = document.querySelectorAll('.btn-brand') 
      
        let txtSearch = searchInput.value.trim().toUpperCase();
       
        let listProducts = document.querySelectorAll('.product-item');
        
         let count = 0

        buttons.forEach (btn => {
            if (btn.classList.contains('active')) {
            listProducts.forEach(item => {
                item.classList.add('hide');
                if (item.innerText.toUpperCase().includes(txtSearch) && item.classList.contains(btn.innerText)) { 
                    
                        
                        item.classList.remove('hide');
                        item.classList.add('showed');
                        item.classList.add('searched-item')
                        count++
                    
                }
                else {
                    item.classList.remove('searched-item')
                    item.classList.add('hide');
                    item.classList.remove('showed');
                }
    
            })
            }
        })

            
        
        if (count > 8) {
            
            var showedItems = document.querySelectorAll('.showed');
            for (var i = 0; i < showedItems.length; i++){
                showedItems[i].classList.add('showed')
            }
            // Bắt đầu từ thẻ con thứ 8
            for (var i = 8; i < showedItems.length; i++) {
                showedItems[i].classList.add('hide');
                showedItems[i].classList.remove('showed')
            }

           
            let subcurrentItem = 8;
            
            subloadMoreBtn.style.display = 'block'

            subloadMoreBtn.onclick = () => {
                let products = [... document.querySelectorAll('.wrapper .products .searched-item')]
                console.log(products.length)
                for (var i = subcurrentItem; i < subcurrentItem + 8; i++){
                if(products[i] != undefined) 
                    {products[i].classList.remove('hide')
                        products[i].classList.add('showed')
                    }
                }
                subcurrentItem += 8 
                if (subcurrentItem > products.length) {
                    subcurrentItem = products.length
                }
                if (subcurrentItem >= products.length) {
                    subloadMoreBtn.style.display ='none';
                }
            } 
        }


        buttons.forEach(btn => { 
            if (btn.classList.contains('active')) {
                mockData.forEach((data,index) => {
                    if (txtSearch===data.code && btn.innerText === data.brand) {
                    
                    var newProduct = document.createElement('div');
                    newProduct.classList.add('product-item', 'col-md-3');
                    const priceString = mockData[index].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    newProduct.innerHTML = 
                        `<div class=pro-item">
                    <div class="pro-top"><a class="pro-thumb" href=""><img src="${mockData[index].image}" alt=""></a></div>
                    </div>
                    <div class="pro-top-hover"><a href="pro-thumb-hover"><img src="${mockData[index].imageHover}" alt=""></a></div>
                    <p class="pro-name"><a class="pro-name-link" href="">${mockData[index].name}</a></p>
                    <p class="pro-price">${priceString}đ</p>`;
        
                    products.appendChild(newProduct);
                 
                        
                    } 
                })
            }
            
         })
       
    } 
})



buttons.forEach(btn => {
    if (btn.classList.contains('active')) {
        loadMoreBtn.onclick = () => {     
            let products = [... document.querySelectorAll(`.wrapper .products .${btn.innerText}`)]
            
            

            for (var i = currentItem; i < currentItem + 8; i++){
              if(products[i] != undefined) 
                 {products[i].classList.remove('hide')
                     products[i].classList.add('showed')
                 }
                 
            }
            currentItem += 8 
            if (currentItem > products.length) {
                currentItem = products.length
            }
           
            if (currentItem >= products.length) {
                loadMoreBtn.style.display ='none';
                
            }
        } 
    }
    
})


// Show animation