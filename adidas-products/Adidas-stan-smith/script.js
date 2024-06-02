
$(document).ready(function(){
      $('.slider-nav').slick({
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite:true,
        arrows:true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
             
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      });

})


const mainImg = document.querySelector('.prd-detail-main-img')

const mainImage = document.getElementById('main-img')


const contentImg = document.querySelectorAll('.content-item img')


contentImg.forEach(image => {
    image.addEventListener("click", () => {
        var linkMainImg = image.getAttribute('src')
        mainImage.src = linkMainImg

    })
})


const sizeBtns = document.querySelectorAll('.prd-detail-size-item');



sizeBtns.forEach (btn => {
    btn.addEventListener('click', () => {
          var selectedBtn = document.querySelector('.selected-size')
          if (selectedBtn != undefined){  
            selectedBtn.classList.remove('selected-size')
          }
          btn.classList.add('selected-size')
          
          selectedSize = document.querySelector('.selected-size')
        
          
    })
})

const quantityBtns = document.querySelectorAll('.prd-detail-quantity-item')



quantityBtns.forEach (btn => {
  btn.addEventListener('click', () => {
        var selectedQuantityBtn = document.querySelector('.selected-quantity')
        if (selectedQuantityBtn != undefined){  
          selectedQuantityBtn.classList.remove('selected-quantity')
        }
        btn.classList.add('selected-quantity')
        
        selectedQuantity = document.querySelector('.selected-quantity')

        console.log(selectedQuantity)
      
  })
})
