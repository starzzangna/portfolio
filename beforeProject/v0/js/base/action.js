// $(function (t) {
//     "use strict";
//     t(window).scroll(function () {
//         t(this).scrollTop() > 100 ? t(".back-top").fadeIn() : t(".back-top").fadeOut()
//     }), t(".back-top").click(function () {
//         return t("html, body").animate({
//             scrollTop: 0
//         }, "fast"), !1
//     });
//     t.fn.categoryList = function (i) {
//         function e(i) {
//             var e = Math.min.apply(Math, i);
//             return t.inArray(e, i)
//         }

//         function n(t) {
//             for (var i = [], e = 0; e < t; e++) i.push(0);
//             return i
//         }

//         function a(i) {
//             var e = t(i).outerWidth(),
//                 n = s.width();
//             return {
//                 width: e,
//                 num: Math.floor(n / e) > 2 ? Math.floor(n / e) : 2
//             }
//         }

//         function o() {
//             var i = a(r[0]),
//                 o = i.width,
//                 u = n(i.num);
//             r.each(function (i) {
//                 if (t(this).is(":visible")) {
//                     var n = t(this).outerHeight(),
//                         a = e(u),
//                         s = {
//                             left: Math.round(a * o * 10) / 10,
//                             top: u[a] + "px"
//                         };
//                     t(this).css({
//                         position: "absolute"
//                     }), "true" === c ? t(this).css(s) : t(this).stop().animate(s), u[a] += n
//                 }
//             }), c = "false", s.css({
//                 height: Math.max.apply(Math, u) + "px"
//             })
//         }
//         var s = t(this),
//             r = t(".item"),
//             c = "true";
//         o(), t(window).resize(function () {
//             this.resizeTO && clearTimeout(this.resizeTO), this.resizeTO = setTimeout(function () {
//                 o()
//             }, 500)
//         }), t(".category-list a").click(function () {
//             var i = t(this).attr("id");
//             return t(".category-list a").removeClass("on"), t(this).addClass("on"), "all" === i ? r.show() : r.show().not(t("." + i)).hide(), o(), !1
//         })
//     }, t(".nav-list a").on("click", function () {
//         t(this).hasClass("working") && alert("준비중입니다.")
//     })
// });

var now = new Date();
var date = 12 * (now.getFullYear() - 2013) + (now.getMonth() + 1 - 12);
$(".experience-date").text("약 " + Math.floor(date / 12) + "년 " + date % 12 + "개월");

// 모바일 메뉴 클릭
$(".menu-button").on("click", function () {
	$(".nav-list").slideToggle();
});

// 준비중
$(".nav-list a").on("click", function () {
	$(this).hasClass("working") && alert("준비중입니다.")
})