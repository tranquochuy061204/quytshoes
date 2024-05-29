let mockData = []

let currentItem = 8;

let buttons = document.querySelectorAll('.btn-brand')

var products = document.querySelector('.products');

let selectedGender;

let selectedBrand = 'Adidas'

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

      selectGender()

      const listInitFunc = await listInit();

      const Init = pageInit();

      const filterInit = filterBrand(selectedBrand)
    
      clickSearch()
    } catch (error) {
      // Xử lý lỗi (nếu có)
      console.error('Fetch error:', error);
    }
  }



  function listInit () {
    selectedGender = localStorage.getItem('selectedGender');
    mockData.forEach( item => {
   
    var newProduct = document.createElement('div');
    newProduct.classList.add('product-item', 'col-md-3', item.brand);
    newProduct.setAttribute('data-gender', item.gender);

    const priceString = item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    var genderTranslate = item.gender;
    if (genderTranslate == 'male') {
        genderTranslate = 'nam'
    } else if (genderTranslate == 'female') {
        genderTranslate = 'nữ'
    }
    newProduct.innerHTML = 
            `<div class="pro-item">
        <div class="pro-top"><a class="pro-thumb" href="${item.link}"><img src="${item.image}" alt=""></a></div>
        </div>
        <div class="pro-top-hover"><a href="${item.link}"><img src="${item.imageHover}" alt=""></a></div>
        <p class="pro-name"><a class="pro-name-link" href="${item.link}">${item.name}</a></p>
        <p class="pro-gender">Giày ${genderTranslate}</p>
        <p class="pro-price">${priceString}đ</p>`;

        products.appendChild(newProduct);

    }); 
}



     
    function pageInit()  {
    
        var products = document.querySelectorAll('.product-item');
       

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
    let buttons = document.querySelectorAll('.btn-brand') ;

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
        let productGender = product.querySelector('.pro-gender').innerText.toLowerCase();
        if (product.classList.contains(value) && productGender.includes(selectedGender))
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

        let buttons = document.querySelectorAll('.btn-brand') 
      
        let txtSearch = searchInput.value.trim().toUpperCase();

            console.log(txtSearch)

        let listProducts = document.querySelectorAll('.product-item');
        
        let genderTranslator = selectedGender;
                if (genderTranslator == 'male') {
                    genderTranslator = 'nam'
                } else if (genderTranslator == 'female') {
                    genderTranslator = 'nữ'
                }

        buttons.forEach (btn => {
            
            if (btn.classList.contains('active')) {
            listProducts.forEach(item => {

                
                item.classList.add('hide');

                if (item.innerText.toUpperCase().includes(txtSearch) && item.classList.contains(btn.innerText) && item.innerText.toUpperCase().includes(genderTranslator.toUpperCase())) { 
                      
                        item.classList.remove('hide');
                        item.classList.add('showed');
                           
                    
                }
                else {
                    
                    item.classList.add('hide');
                    item.classList.remove('showed');
                }
    
            })
            }
        })
        

        buttons.forEach(btn => { 
            if (btn.classList.contains('active')) {
                mockData.forEach((data,index) => {

                    let genderTranslator = selectedGender;
                    if (genderTranslator == 'nam') {
                        genderTranslator = 'male'
                    } else if (genderTranslator == 'nữ') {
                        genderTranslator = 'female'
                    }

                    

                    if (txtSearch===data.code && btn.innerText === data.brand && data.gender === genderTranslator) {
                    
                    var newProduct = document.createElement('div');
                    newProduct.classList.add('product-item', 'col-md-3');
                    newProduct.setAttribute('data-gender', data.gender);
                    const priceString = mockData[index].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    var genderTranslate = mockData[index].gender;
                    if (genderTranslate == 'male') {
                        genderTranslate = 'nam'
                    } else if (genderTranslate == 'female') {
                        genderTranslate = 'nữ'
                    }
                    newProduct.innerHTML = 
                        `<div class=pro-item">
                    <div class="pro-top"><a class="pro-thumb" href="${mockData[index].link}"><img src="${mockData[index].image}" alt=""></a></div>
                    </div>
                    <div class="pro-top-hover"><a href="${mockData[index].link}"><img src="${mockData[index].imageHover}" alt=""></a></div>
                    <p class="pro-name"><a class="pro-name-link" href="${mockData[index].link}">${mockData[index].name}</a></p>
                    <p class="pro-gender">Giày ${genderTranslate}</p>
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

        let buttons = document.querySelectorAll('.btn-brand') 
      
        let txtSearch = searchInput.value.trim().toUpperCase();
       
        let listProducts = document.querySelectorAll('.product-item');
        
        let genderTranslator = selectedGender;
        if (genderTranslator == 'male') {
            genderTranslator = 'nam'
        } else if (genderTranslator == 'female') {
            genderTranslator = 'nữ'
        }

        buttons.forEach (btn => {
            if (btn.classList.contains('active')) {
            listProducts.forEach(item => {
                item.classList.add('hide');
                if (item.innerText.toUpperCase().includes(txtSearch) && item.classList.contains(btn.innerText) && item.innerText.toUpperCase().includes(genderTranslator.toUpperCase())) { 
                    
                        
                        item.classList.remove('hide');
                        item.classList.add('showed');
                        item.classList.add('searched-item')
                      
                    
                }
                else {
                    item.classList.remove('searched-item')
                    item.classList.add('hide');
                    item.classList.remove('showed');
                }
    
            })
            }
        })

            

        buttons.forEach(btn => { 
            if (btn.classList.contains('active')) {
                mockData.forEach((data,index) => {

                    let genderTranslator = selectedGender;
                    if (genderTranslator == 'nam') {
                        genderTranslator = 'male'
                    } else if (genderTranslator == 'nữ') {
                        genderTranslator = 'female'
                    }

                    if (txtSearch===data.code && btn.innerText === data.brand && data.gender === genderTranslator) {
                    
                    var newProduct = document.createElement('div');
                    newProduct.classList.add('product-item', 'col-md-3');
                    const priceString = mockData[index].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    var genderTranslate = mockData[index].gender;
                    if (genderTranslate == 'male') {
                        genderTranslate = 'nam'
                    } else if (genderTranslate == 'female') {
                        genderTranslate = 'nữ'
                    }
                    newProduct.innerHTML = 
                        `<div class=pro-item">
                    <div class="pro-top"><a class="pro-thumb" href="${mockData[index].link}"><img src="${mockData[index].image}" alt=""></a></div>
                    </div>
                    <div class="pro-top-hover"><a href="${mockData[index].link}"><img src="${mockData[index].imageHover}" alt=""></a></div>
                    <p class="pro-name"><a class="pro-name-link" href="${mockData[index].link}">${mockData[index].name}</a></p>
                    <p class="pro-gender">Giày ${genderTranslate}</p>
                    <p class="pro-price">${priceString}đ</p>`;
        
                    products.appendChild(newProduct);
                 
                        
                    } 
                })
            }
            
         })
       
    } 
})


document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search); // Lấy thông tin từ URL
    const searchTerm = urlParams.get('search'); // Lấy giá trị của tham số 'search' từ URL
    console.log(searchTerm)
    if (searchTerm) { // Kiểm tra xem có giá trị tìm kiếm không
        // Thực hiện tìm kiếm với giá trị được truyền từ URL
        searchInput.value = searchTerm;
    }
});

//Nam, Nữ tag
    function selectGender() {
    document.addEventListener('DOMContentLoaded', function() {
    selectedGender = localStorage.getItem('selectedGender')
  });}

  selectGender()





  


listInit ()

