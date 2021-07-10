function stepCustomGUI() {
$('.wizard li').click(function() {
    $(this).prevAll().addClass("completed");
        $(this).nextAll().removeClass("completed")
    
    });
// console.log("demo");
}