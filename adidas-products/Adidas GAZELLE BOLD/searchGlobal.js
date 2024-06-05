document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');

    const searchInputMobile = document.getElementById('searchInputMobile')

    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') { 
            const searchTerm = searchInput.value.trim(); 
            if (searchTerm !== '') {
                localStorage.setItem('selectedGender', '')
                window.location.href = `../../product-list.html?search=${searchTerm}`; 
            }
        }
    });

    searchInputMobile.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') { 
            const searchTerm = searchInputMobile.value.trim(); 
            if (searchTerm !== '') {
                localStorage.setItem('selectedGender', '')
                window.location.href = `../../product-list.html?search=${searchTerm}`; 
            }
        }
    });
});