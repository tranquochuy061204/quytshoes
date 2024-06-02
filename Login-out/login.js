function login(e) {
    e.preventDefault();

    var username = document.getElementById('username').value.trim();
    var password = document.getElementById('password').value.trim();

    if (username === "" || password === "") {
        alert("Vui lòng điền đầy đủ thông tin.");
        return;
    }

    var user = localStorage.getItem(username);
    var data = JSON.parse(user);

    if (!data || username !== data.username || password !== data.password) {
        alert("Thông tin đăng nhập không chính xác.");
        return;
    }

    window.location.href = "../index.html";
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('login-form').addEventListener('submit', login);
});