

isLogedIn = JSON.parse(localStorage.getItem('isLogedIn'))

console.log(isLogedIn)

const infor = document.querySelector('.infor')

const firstWrapper = document.querySelector('.wrapper')

const secondWrapper = document.querySelector('.second-wrapper')


function isLogedInCheck () {
    if (isLogedIn == false) {
        secondWrapper.style.display = 'none'
        firstWrapper.style.display = 'block'
    
    } else {
        secondWrapper.style.display = 'block'
        firstWrapper.style.display = 'none'
    
    }

}

isLogedInCheck ()

let nowUser = JSON.parse(localStorage.getItem(localStorage.getItem('currentUser')))



console.log (nowUser.username)

const username = document.querySelector('.username')

const email = document.querySelector('.email')

const phoneNum = document.querySelector('.phone')



username.innerText += '     ' + nowUser.username

email.innerText += '        ' + nowUser.email

phoneNum.innerText += '     ' + nowUser.phoneNumber

