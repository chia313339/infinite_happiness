$(document).ready(function () {
    AOS.init({
        duration: 800
    });

    var swiperCards = new Swiper('.swiperCards', {
        spaceBetween: 20,
        speed: 800,
        autoplay: true,
        effect: 'fade',
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
    })
    $('.volume a').click(function (e) {
        e.preventDefault();
        $('.volume a').removeClass('hide');
        $(this).addClass('hide');
        if ($("video").prop('muted')) {
            $("video").prop('muted', false);
        } else {
            $("video").prop('muted', true);
        }
    });
});

$(window).scroll(function () {
    // 檢查元素是否存在再執行
    if ($('.hero .nav_link').length && $(window).scrollTop() - $('.hero .nav_link').offset().top >= 0) {
        $('.navbar').addClass('show')
    } else if ($('.navbar').length) {
        $('.navbar').removeClass('show')
    }
    
    // 直接根據滾動距離顯示返回頂部按鈕
    if ($(window).scrollTop() > 200) {
        $('.totop').addClass('show')
    } else {
        $('.totop').removeClass('show')
    }
});

(function () {
    'use strict'
    var forms = document.querySelectorAll('.needs-validation')
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})()

let submitted = false;

function showSuccessMessage() {
    Swal.fire({
        title: "表單送出成功！",
        text: "我們將由專人盡快與您聯繫",
        icon: "success",
        confirmButtonColor: "#28624d",
        confirmButtonText: '關閉',
    });
}

$('#sendMail').click(function (e) {
    e.preventDefault();
    if ($('#name').val() == '') {
        Swal.fire({
            title: '請輸入姓名',
            icon: 'warning',
            confirmButtonText: '繼續填寫',
            confirmButtonColor: "#28624d",
        });
    } else {
        let phone = $('#phone').val();
        let iphone = parseInt(phone);
        if (isNaN(iphone)) {
            Swal.fire({
                title: '請輸入正確的電話號碼',
                icon: 'warning',
                confirmButtonText: '繼續填寫',
                confirmButtonColor: "#28624d",
            });
        } else {
            if ($('#terms').is(':checked')) {
                let formData = {
                    "entry.1450433449": $('#name').val(),  // Google表單中“姓名”字段的name屬性值
                    "entry.1414706384": $('#phone').val(),  // Google表單中“手機”字段的name屬性值
                    "entry.503424714": $('#memo').val()  // Google表單中“備註訊息”字段的name屬性值
                };
                $.ajax({
                    url: 'https://docs.google.com/forms/d/e/1FAIpQLSfDGJkJsmdkwYwr-wlNlNf6wbN6k-yHUyE8AlMZU1i3IoY7pg/formResponse',
                    type: 'POST',
                    data: formData,
                    dataType: 'xml',
                    complete: function() {
                        Swal.fire({
                            title: "表單送出成功！",
                            text: "我們將由專人盡快與您聯繫",
                            icon: "success",
                            confirmButtonColor: "#28624d",
                            confirmButtonText: '關閉',
                        });
                    },
                    error: function() {
                        Swal.fire({
                            title: '送出失敗',
                            text: '請稍後再試',
                            icon: 'error',
                            confirmButtonText: '繼續填寫',
                            confirmButtonColor: "#28624d",
                        });
                    }
                });
            } else {
                Swal.fire({
                    title: '未勾選同意書',
                    text: '請閱讀並勾選「個資告知事項聲明」同意書',
                    icon: 'warning',
                    confirmButtonText: '繼續填寫',
                    confirmButtonColor: "#28624d",
                });
            }
        }
    }
});

