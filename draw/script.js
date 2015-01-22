var oopsTimer;
var dragging;
var path;
var svg;
var prefix;


$(window).ready(function() {
//alert('test');
	var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
	if (!is_chrome) alert("Doodle3D voor KunstCentraal werkt momenteel alleen in Google Chrome. Schakel aub over naar deze browser om te kunnen tekenen.");

	path = document.getElementById('path');
	svg = document.getElementById('svg');
	prefix = getParameterByName("prefix");
	
	enableDrawing();

	btnCloseMsgBox.addEventListener('click',closeDialog,false);
	document.body.addEventListener('touchmove',prevent,false);
	
	$("#btnOops").mousedown(function(){
	    oopsTimer = setInterval(oops, 1000/30);
	    return false;
	});

	$(document).mouseup(function(){
	    clearInterval(oopsTimer);
	    return false;
	});

});

function enableDrawing() {
	svg.addEventListener('mousedown',onMouseDown,false);
	svg.addEventListener('mousemove',onMouseMove,false);
	svg.addEventListener('mouseup',onMouseUp,false);
	svg.addEventListener('touchstart',onTouchDown,false);
	svg.addEventListener('touchmove',onTouchMove,false);
	btnNew.addEventListener('mousedown',clear,false);
	btnNew.addEventListener('touchstart',clear,false);
	// btnOops.addEventListener('touchstart',startOops,false);
	// btnOops.addEventListener('touchend',stopOops,false);
	// btnOops.addEventListener('mousedown',startOops,false);
	// btnOops.addEventListener('mouseup',stopOops,false);
	btnOk.addEventListener('mousedown',save,false);
	btnOk.addEventListener('touchstart',save,false);


}

function disableDrawing() {
	svg.removeEventListener('mousedown',onMouseDown,false);
	svg.removeEventListener('mousemove',onMouseMove,false);
	svg.removeEventListener('mouseup',onMouseUp,false);
	svg.removeEventListener('touchstart',onTouchDown,false);
	svg.removeEventListener('touchmove',onTouchMove,false);
	btnNew.removeEventListener('mousedown',clear,false);
	btnNew.removeEventListener('touchstart',clear,false);
	// btnOops.removeEventListener('touchstart',startOops,false);
	// btnOops.removeEventListener('touchend',stopOops,false);
	// btnOops.removeEventListener('mousedown',startOops,false);
	// btnOops.removeEventListener('mouseup',stopOops,false);
	btnOk.removeEventListener('mousedown',save,false);
	btnOk.removeEventListener('touchstart',save,false);
}

function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function prevent(e) {
	e.preventDefault();
}

function clear() {
	path.attributes.d.nodeValue = "M0 0";
}

// function startOops(e) {
// 	// e.preventDefault();
// 	// clearInterval(oopsTimer);
// 	oopsTimer = setInterval("oops()",1000/30);
// }

// function stopOops() {
// 	clearInterval(oopsTimer);
// }

function oops() {
	str = path.attributes.d.nodeValue;
	n = str.lastIndexOf(" L");
	path.attributes.d.nodeValue = str.substr(0,n);	
}

function moveTo(x,y) {
	if (path.attributes.d.nodeValue=="M0 0") {
		path.attributes.d.nodeValue = "M" + x + " " + y;
	} else {
		path.attributes.d.nodeValue += " M" + x + " " + y;
	}
}

function lineTo(x,y) {
	path.attributes.d.nodeValue += " L" + x + " " + y;
}

function onTouchDown(e) {
	var x = e.touches[0].pageX - e.touches[0].target.offsetLeft;
	var y = e.touches[0].pageY - e.touches[0].target.offsetTop;
	moveTo(x,y);	
}

function onTouchMove(e) {
	// stopOops();
	e.preventDefault();
	var x = e.touches[0].pageX - e.touches[0].target.offsetLeft;
	var y = e.touches[0].pageY - e.touches[0].target.offsetTop;
	lineTo(x,y);
}

function onMouseDown(e) {
	dragging = true;
	moveTo(e.offsetX,e.offsetY);
}

function onMouseMove(e) {
	// stopOops();
	if (!dragging) return;
	lineTo(e.offsetX,e.offsetY);
}

function onMouseUp(e) {
	dragging = false;
}

function save(e) {
	output = path.attributes.d.nodeValue;

	if (output=="M0 0") return;

	$.post("save.php", { prefix:prefix, data:output }, function(data) {
	 	$("#thanks").fadeIn(100);
//alert(data);
	 	disableDrawing();
	});
}

function closeDialog(e) {
	$("#thanks").fadeOut(100);
	enableDrawing();
}
