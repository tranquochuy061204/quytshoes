let mockData = []

let currentItem = 8;

let buttons = document.querySelectorAll('.btn-brand')

var products = document.querySelector('.products');

let selectedGender; 

let selectedBrand = localStorage.getItem('selectedBrand')

const searchFor = document.querySelector('.searchFor')

const searchForP = document.querySelector('.searchFor p')

const searchBarMobile = document.querySelector('.search-bar-moblie')


let i = 0

for(i ; i < 1; i++) {
    window.location.reload
}

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
      
      defaultGender ()

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
        <p class="pro-price">${priceString}<span class="vnd fs-1">₫</span></p>`;

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
    
       
        clickSearch();
    }

 


// Filter 
function filterBrand (value) {
    let buttons = document.querySelectorAll('.btn-brand') ;

    buttons.forEach(btn => 
        {
            if (value.toUpperCase()  === btn.innerText.toUpperCase()) {
                btn.classList.add("active")
                selectedBrand = btn.innerText
                localStorage.setItem('selectedBrand', selectedBrand)
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

        bannerChanger ()

        let buttons = document.querySelectorAll('.btn-brand') 
      
        let txtSearch = searchInputMobile.value.trim().toUpperCase();

        if(!txtSearch) 
            {txtSearch = searchInput.value.trim().toUpperCase(); }
        

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
                    <p class="pro-price">${priceString}<span class="vnd">₫</span></p>`;
        
                    products.appendChild(newProduct);
                 
                        
                    } 
                })
            }
            
         })
       
}

var searchInput = document.querySelector('.search-bar-wrapper input');

var searchInputMobile = document.getElementById('searchInputMobile')

searchInput.addEventListener('keydown', function(e) {
    
    if (e.key === 'Enter') {

        searchFor.style.display = 'block'

        let buttons = document.querySelectorAll('.btn-brand') 
      
        let txtSearch = searchInput.value.trim().toUpperCase();

        searchForP.innerText = 'Tìm kiếm cho:'

        searchForP.innerText += ' ' + searchInput.value.trim()
       
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
                    <p class="pro-price">${priceString}<span class="vnd fs-1">₫</span></p>`;
        
                    products.appendChild(newProduct);
                 
                        
                    } 
                })
            }
            
         })
       
    } 
})



searchInputMobile.addEventListener('keydown', function(e) {
    
    if (e.key === 'Enter') {

       
        
        searchFor.style.display = 'block'



       searchBarMobile.style.display =  'none'

        let buttons = document.querySelectorAll('.btn-brand') 
      
        let txtSearch = searchInputMobile.value.trim().toUpperCase();

        searchForP.innerText = 'Tìm kiếm cho:'

        searchForP.innerText += ' ' + searchInputMobile.value.trim()
       
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
                    <p class="pro-price">${priceString}<span class="vnd fs-1">₫</span></p>`;
        
                    products.appendChild(newProduct);
                 
                        
                    } 
                })
            }
            
         })
       
    } 
})


let prdListBanner = document.querySelector('.product-list-banner-img')

function bannerChanger () {
    selectedBrand = localStorage.getItem('selectedBrand')

if (selectedBrand == 'Adidas') {
    prdListBanner.src = './images/adidas-products-list-banner.jpeg'
} else if (selectedBrand == 'Nike')
 {
    prdListBanner.src = './images/nike-products-list-banner.jpeg'
 } else {
    prdListBanner.src = './images/converse-products-list-banner.jpg'
 }

}

bannerChanger ()






document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search); // Lấy thông tin từ URL
    const searchTerm = urlParams.get('search'); // Lấy giá trị của tham số 'search' từ URL
    console.log(searchTerm)
    if (searchTerm) { // Kiểm tra xem có giá trị tìm kiếm không
        // Thực hiện tìm kiếm với giá trị được truyền từ URL
        searchInput.value = searchTerm;
        searchInputMobile.value = searchTerm;
        searchFor.innerText += searchTerm
    }
});


const genderBtns = document.querySelectorAll('.btn-gender')

function defaultGender() {
    genderBtns.forEach(btn => {
        if (btn.innerText.toLowerCase() === selectedGender) {
            btn.classList.add('active');
            updateGenderDescription();
        }
    });
}

function filterGender(value) {
    let buttons = document.querySelectorAll('.btn-gender');

    buttons.forEach(btn => {
        if (value.toUpperCase() === btn.innerText.toUpperCase()) {
            btn.classList.add("active");
            selectedGender = btn.innerText.toLowerCase();
            if (selectedGender === 'all') {
                selectedGender = ''; 
            }
            localStorage.setItem('selectedGender', selectedGender);
        } else {
            btn.classList.remove("active");
        }
    });

    filterBrand(selectedBrand); 
    clickSearch(); 
}
const genderDescription = document.querySelector('.genderDes');


function updateGenderDescription() {
    let genderSelected = document.querySelector('.btn-gender.active');
    if (genderSelected) {
        if (genderSelected.innerText.toLowerCase() === 'all') {
            genderDescription.innerText = 'Tất cả';
        } else {
            genderDescription.innerText = `Giày ${genderSelected.innerText}`;
        }
    }
}


genderBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        genderBtns.forEach(button => button.classList.remove('active')); 
        btn.classList.add('active'); 
        selectedGender = btn.innerText.toLowerCase(); 
        if (selectedGender === 'all') {
            selectedGender = ''; 
        }
        localStorage.setItem('selectedGender', selectedGender); 
        updateGenderDescription();
        filterGender(btn.innerText.toLowerCase()); 
    });
});


updateGenderDescription();

//Nam, Nữ tag
    function selectGender() {
    document.addEventListener('DOMContentLoaded', function() {
        selectedGender = localStorage.getItem('selectedGender') || 'all';
        selectedBrand = localStorage.getItem('selectedBrand')
        defaultGender();
  });}

  selectGender()





  


listInit ()



