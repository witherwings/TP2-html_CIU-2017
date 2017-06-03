$(document).ready(function () {
    toggle();
});

function toggle(){
	$("#menu-toggle").click(function(e) {
	e.preventDefault();
	$("#wrapper").toggleClass("active");
	});
}

function showId(e) {
	$(e).show("slow");
}

function hideId(e) {
	$(e).hide("slow"); 
}