
$(document).ready(function(){
      $('.slider-nav').slick({
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite:true,
        arrows:true
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

