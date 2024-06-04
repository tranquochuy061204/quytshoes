document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput'); // Lấy thẻ input có id là 'searchInput'

    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') { // Nếu phím được nhấn là Enter
            const searchTerm = searchInput.value.trim(); // Lấy giá trị của ô input và loại bỏ khoảng trắng ở đầu và cuối chuỗi
            if (searchTerm !== '') { // Đảm bảo rằng giá trị của ô input không rỗng
                localStorage.setItem('selectedGender', '')
                window.location.href = `../../product-list.html?search=${searchTerm}`; // Chuyển hướng đến trang product-list.html với thông tin tìm kiếm được truyền qua URL
            }
        }
    });
});