
function isValidJson(jsonString) {
    try {
        JSON.parse(jsonString);
    } catch (e) {
        return false;
    }
    return true;
}

function signup(e) {
    e.preventDefault();

    var username = document.getElementById('username').value.trim();
    var email = document.getElementById('email').value.trim();
    var phoneNumber = document.getElementById('numberphone').value.trim();
    var password = document.getElementById('password').value.trim();
    var confirmPassword = document.getElementById('Confirmpassword').value.trim();

    // Kiểm tra nếu tất cả các trường đều bỏ trống
    if (!username && !email && !phoneNumber && !password && !confirmPassword) {
        alert("Vui lòng nhập thông tin.");
        return;
    }

    // Kiểm tra email
    var emailRegex = /^[a-zA-Z0-9._%+-]+@(?:gmail\.com|email\.com)$/; // Biểu thức chính quy kiểm tra định dạng email
    if (!emailRegex.test(email)) {
        alert("Email không hợp lệ. Gồm @email.com hoặc @gmail.com");
        return;
    }

    // Kiểm tra số điện thoại
    var phoneRegex = /^0\d{9}$/; // Biểu thức chính quy kiểm tra số điện thoại bắt đầu bằng 0 và có 10 chữ số
    if (!phoneRegex.test(phoneNumber)) {
        alert("Số điện thoại không hợp lệ. Tối đa 10 số và bắt đầu bằng 0.");
        return;
    }

    // Kiểm tra mật khẩu
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/; // Biểu thức chính quy kiểm tra mật khẩu
    if (!passwordRegex.test(password)) {
        alert("Mật khẩu không hợp lệ! Mật khẩu phải có một ký tự hoa, một ký tự thường, một ký tự số và một ký tự đặc biệt và ít nhất 6 ký tự.");
        return;
    }

    // Kiểm tra mật khẩu xác nhận
    if (password !== confirmPassword) {
        alert("Mật khẩu xác nhận không khớp.");
        return;
    }

    // Kiểm tra username đã tồn tại chưa
    if (localStorage.getItem(username) !== null) {
        alert("Tên người dùng đã được sử dụng. Vui lòng chọn tên người dùng khác.");
        return;
    }

    // Kiểm tra email đã tồn tại chưa
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var storedUser = localStorage.getItem(key);

        if (isValidJson(storedUser)) {
            storedUser = JSON.parse(storedUser);
            if (storedUser.email === email) {
                alert("Email đã được sử dụng. Vui lòng nhập email khác.");
                return;
            }
        }
    }

    // Kiểm tra số điện thoại đã tồn tại chưa
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var storedUser = localStorage.getItem(key);

        if (isValidJson(storedUser)) {
            storedUser = JSON.parse(storedUser);
            if (storedUser.phoneNumber === phoneNumber) {
                alert("Số điện thoại đã được sử dụng. Vui lòng nhập số điện thoại khác.");
                return;
            }
        }
    }

    // Lưu thông tin người dùng
    var user = {
        username: username,
        email: email,
        phoneNumber: phoneNumber,
        password: password
    };

    var json = JSON.stringify(user);
    localStorage.setItem(username, json);
    alert("Đăng ký thành công!");
    window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('signup-form').addEventListener('submit', signup);
});