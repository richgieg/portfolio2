$(function() {
    var $el = $('.pj-content.active')
    setInterval(function() {
        $el.toggleClass('active');
    }, 3000);
});
