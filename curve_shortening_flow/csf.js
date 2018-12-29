var svg = document.getElementById('flowbox');

var polyline= document.getElementById('distflow');

var slider = document.getElementById('slider');

var flowcount = document.getElementById("flowcount");
var hold = false;

slider.setAttribute("max",curve_anim.length-1);

var plotme = [];

var maincurve = curve_anim.slice();
var sfactor = 0;

var moving = "n";
var name = "2301"
var stop = true;

var center = function (arr)
{
    var minX, maxX, minY, maxY;
    for (var i = 0; i < arr.length; i++)
    {
        minX = (arr[i][0] < minX || minX == null) ? arr[i][0] : minX;
        maxX = (arr[i][0] > maxX || maxX == null) ? arr[i][0] : maxX;
        minY = (arr[i][1] < minY || minY == null) ? arr[i][1] : minY;
        maxY = (arr[i][1] > maxY || maxY == null) ? arr[i][1] : maxY;
    }
    return [(minX + maxX) / 2, (minY + maxY) / 2];
}




function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}









var curstep = 0//maincurve.length-1;

function loadfile(fn){
var script = document.createElement('script');

script.onload = function () {
	maincurve = curve_anim.slice()
    console.log(maincurve.length)
    redraw();
};
script.src = "flow_shapes/" + fn + "_curve.js";

var old = document.getElementById("districtfn")
old.parentNode.removeChild(old);
 
script.id = "districtfn"
document.head.appendChild(script);

}







function redraw(){

	stop = true
	slider.setAttribute("max",maincurve.length-1);
	curstep = 0
	
	draw_step(curstep)

}


function draw_step(k){
	if (k>=maincurve.length || k<0){return;}
	slider.value = k;
	flowcount.innerHTML = "CSF Steps: " + maincurve[k][1] + " Perim: " + (1/Math.sqrt(maincurve[k][2])).toString().slice(0,6) + " Frame: " + k;

	polyline.points.clear()
	var centroid = center(maincurve[k][0]);

	for (var i=0;i<maincurve[k][0].length; i++){
		var c = maincurve[k][0][i]



	var point = svg.createSVGPoint();
	point.x = (c[0]) -centroid[0] + 200;
	point.y = (c[1]) - centroid[1] + 200;	



	polyline.points.appendItem(point);

}
}


draw_step(curstep);

function decrement(){
	stop = true
	if (curstep == 0){return;}
	curstep--;
	draw_step(curstep)
}

function increment(){
	stop = true

	if (curstep == maincurve.length){return;}
	curstep++;
	draw_step(curstep)
}


slider.oninput = function() { 
	stop = true
	curstep = this.value;
	draw_step(curstep);
}



async function fwd(){
	stop = false
  while (curstep < maincurve.length-1 && stop == false){
  	increment()
  	stop = false
  await sleep(30);
}
}

async function bwd(){
	stop = false
  while (curstep > 0 && stop == false){
  	decrement()
  	stop = false
  await sleep(30);
}
}



