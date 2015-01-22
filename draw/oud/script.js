var oopsTimer;
var dragging;
var svg;
var path;
var vsvg;
var vpath;
var pIndex;
var savedPath;

$(window).ready(function() {
	document.body.addEventListener('touchmove',prevent,false);
	window.addEventListener('keydown', onKeyDown, false);
	window.addEventListener('keyup', onKeyUp, false);
	vpath = document.getElementById('vpath');
	vsvg = document.getElementById('vsvg');
	path = document.getElementById('path');
	svg = document.getElementById('svg');
	svg.addEventListener('mousedown',onMouseDown,false);
	svg.addEventListener('mousemove',onMouseMove,false);
	svg.addEventListener('mouseup',onMouseUp,false);
	svg.addEventListener('touchstart',onTouchDown,false);
	svg.addEventListener('touchmove',onTouchMove,false);
	vsvg.addEventListener('mousedown',onMouseDown,false);
	vsvg.addEventListener('mousemove',onMouseMove,false);
	vsvg.addEventListener('mouseup',onMouseUp,false);
	vsvg.addEventListener('touchstart',onTouchDown,false);
	vsvg.addEventListener('touchmove',onTouchMove,false);
	btnOops.addEventListener('touchstart',startOops,false);
	btnOops.addEventListener('touchend',stopOops,false);
	btnOops.addEventListener('mousedown',startOops,false);
	btnOops.addEventListener('mouseup',stopOops,false);
	btnPrint.addEventListener('click',onBtnPrintClick);
	btnNew.addEventListener('touchstart',onBtnNewClick);
	btnNew.addEventListener('mousedown',onBtnNewClick);
	btnStop.addEventListener('click',onBtnStopClick);
	btnSave.addEventListener('touchend',onBtnSaveClick);
	// btnSave.addEventListener('mouseup',onBtnSaveClick);
	btnShapes.addEventListener('mousemove',onBtnShapesMouseMove);
	btnShapes.addEventListener('touchmove',onBtnShapesTouchMove);
	btnZoomIn.addEventListener('click',onBtnZoomIn);
	btnZoomOut.addEventListener('click',onBtnZoomOut);
});

function onBtnZoomIn(e) {
	txt = path.attributes.d.nodeValue;
	txt = txt.split(" ");
	//txt = txt.split(" L").join("_");
	// txt = txt.split(" ").join(",");
	// txt = txt.split("_").join(" ");
	console.log(txt);
}

function onBtnZoomOut(e) {

}

function updateShape(index) {
	vpath.attributes.d.nodeValue = "M0 0";

	shape = getVerticalShape(index);
	cx = 175/2;
	w = 100;
	h = 300;
	offsetTop = 80;
	res = 7; //vres 1=highest

	moveTo(cx+shape[0]*w/2,res+offsetTop,vpath);
	for (i=res; i<shape.length; i+=res) {
		lineTo(cx+shape[i]*w/2,i+offsetTop,vpath);
	}
	for (i=shape.length-res; i>0; i-=res) {
		lineTo(cx-shape[i]*w/2,i+offsetTop,vpath);
	}
	lineTo(cx+shape[0]*w/2,res+offsetTop,vpath);
}

function onBtnShapesTouchMove(e) {
	var x = e.touches[0].pageX - e.touches[0].target.offsetLeft;
	var index = Math.floor(x / e.target.width * 9);
	var shapes = "#_&|/%^$\\";

	if (index!=pIndex) {
		pIndex = index;
		updateShape(shapes.charAt(index));
	}	
}

function onBtnShapesMouseMove(e) {
	var index = Math.floor(e.offsetX / e.target.width * 9);
	var shapes = "#_&|/%^$\\";

	if (index!=pIndex) {
		pIndex = index;
		updateShape(shapes.charAt(index));
	}	
}

function getVerticalShape(index) {
	var shape = [];
	var res = 300;
	for (i=0; i<res; i++) {
		shape[i] = getScaler(index,i/res);
	}
	return shape;
}

function map(value, inputMin, inputMax, outputMin, outputMax, clamp) {
	if (Math.abs(inputMin - inputMax) < .0000001){
		return outputMin;
	} else {
		var outVal = ((value - inputMin) / (inputMax - inputMin) * (outputMax - outputMin) + outputMin);
		if (clamp) {
			if (outputMax < outputMin){
				if (outVal < outputMax) outVal = outputMax;
				else if (outVal > outputMin) outVal = outputMin;
			} else {
				if (outVal > outputMax) outVal = outputMax;
				else if (outVal < outputMin) outVal = outputMin;
			}
		}
		return outVal;
	}
}

function getScaler(c, ii) {
	console.log(c);
	var maxScale = 1;
	var minScale = .5;
	var TWO_PI = 2*Math.PI;

	switch (c) {
		case '|': return maxScale;
		case '\\': return map(ii, 0, 1, maxScale, minScale);
		case '/': return map(ii, 0, 1, minScale, maxScale);
		case '$': return map(-Math.sin(1*ii*TWO_PI),-1,1,minScale,maxScale);
		case '#': return map(-Math.sin(2*ii*TWO_PI),-1,1,minScale,maxScale);
		case '%': return map(-Math.sin(4*ii*TWO_PI),-1,1,minScale,maxScale);
		case '_': return map(-Math.sin(4*ii*TWO_PI),-1,1,minScale,maxScale);
		case '&': return map(-Math.sin(8*ii*TWO_PI),-1,1,maxScale-.2,maxScale);
		case '@': return map(ii*ii,0,1,minScale,maxScale);
		case '^': return map(Math.asin(Math.sin(3*ii*TWO_PI)),-Math.PI/2,Math.PI/2,minScale,maxScale);
		default: return maxScale;
	}
}

function onBtnPrintClick(e) {
	alert("print");
	//print();
}

function onBtnStopClick(e) {
	alert("stop");
}

function onBtnNewClick(e) {
	//alert("new");
	clear();
}

function prevent(e) {
	e.preventDefault();
}

function clear(p) {
	if (p==undefined) p = path;
	path.attributes.d.nodeValue = "M0 0";
}

function startOops() {
	oopsTimer = setInterval("oops()",1000/30);
}

function stopOops() {
	clearInterval(oopsTimer);
}

function oops() {
	str = path.attributes.d.nodeValue;
	n = str.lastIndexOf(" L");
	if (n>0) path.attributes.d.nodeValue = str.substr(0,n);	
}

function moveTo(x,y,p) {
	if (p==undefined) p = path;
	if (p.attributes.d.nodeValue=="M0 0") {
		p.attributes.d.nodeValue = "M" + x + " " + y;
	} else {
		p.attributes.d.nodeValue += " M" + x + " " + y;
	}
}

function lineTo(x,y,p) {
	if (p==undefined) p = path;
	p.attributes.d.nodeValue += " L" + x + " " + y;
}

function onTouchDown(e) {
	var x = e.touches[0].pageX - e.touches[0].target.offsetLeft;
	var y = e.touches[0].pageY - e.touches[0].target.offsetTop;
	if (e.target==vsvg) p=vpath;
	else if (e.target==svg) p=path;
	else return;
	moveTo(x,y,p);	
	// moveTo(e.offsetX,e.offsetY,p);
}

function onTouchMove(e) {
	e.preventDefault();
	var x = e.touches[0].pageX - e.touches[0].target.offsetLeft;
	var y = e.touches[0].pageY - e.touches[0].target.offsetTop;
	if (e.target==vsvg) p=vpath;
	else if (e.target==svg) p=path;
	else return;
	lineTo(x,y,p);
	// lineTo(e.offsetX,e.offsetY,p);
}

function onMouseDown(e) {
	dragging = true;
	if (e.target==vsvg) p=vpath;
	else if (e.target==svg) p=path;
	else return;
	moveTo(e.offsetX,e.offsetY,p);
}

function onMouseMove(e) {
	if (!dragging) return;
	if (e.target==vsvg) p=vpath;
	else if (e.target==svg) p=path;
	else return;
	lineTo(e.offsetX,e.offsetY,p);
}

function onMouseUp(e) {
	dragging = false;
}

function onKeyDown(e) {  

	//console.log("x");
	switch (e.which) {
		case 85: oops(); break; //'u'
	}
}

function onKeyUp(e) {  
	switch (e.which) {
		case 67: clear(); break; //'c'
		case 77: break; //'m'
		case 67: break; //'l'
		case 83: alert("save"); break; //'s'
		// case 85: stopOops(); break; //'u'
		//default: console.log(e.which);
	}
}

function print(e) {

	output = path.attributes.d.nodeValue;
	console.log(output);
	
	output = output.split("M").join("\n");
	output = output.split(" L").join("_");
	output = output.split(" ").join(",");
	output = output.split("_").join(" ");

	output = "\nBEGIN\n" + output + "\n\nEND\n";

	$.post("/doodle3d.of", { data:output }, function(data) {
	 	btnPrint.disabled = false;
	 	//alert(data);
	});
}


function onBtnSaveClick(e) {
	output = path.attributes.d.nodeValue;
	
	if (output=="M0 0") return;
	if (output==savedPath) return;

	savedPath = output;

	$.post("save.php", { data:output }, function(data) {
	 	alert("\n=-=-=-=-=-=-=-=-=-=-=-=-=-=\n\nThank you!\nYour drawing has been saved.\nYou can start a new one if you like.\n\n=-=-=-=-=-=-=-=-=-=-=-=-=-=\n");
	});
}


