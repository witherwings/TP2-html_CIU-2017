$(document).ready(function () {
    toggle();
});

function toggle(){
	$("#menu-toggle").click(function(e) {
	e.preventDefault();
	$("#wrapper").toggleClass("active");
	});
}
