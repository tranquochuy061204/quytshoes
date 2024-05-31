document.addEventListener('DOMContentLoaded', function() {
    $(document).ready(function() {
        $('.eye').click(function() {
            $(this).children('i').toggleClass('open fa-eye-slash fa-eye');
            if ($(this).children('i').hasClass('open')) {
                $(this).siblings('input').attr('type', 'text');
            } else {
                $(this).siblings('input').attr('type', 'password');
            }
        });
    });
});
