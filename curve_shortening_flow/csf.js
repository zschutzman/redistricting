var svg = document.getElementById('flowbox');

var polyline= document.getElementById('distflow');

var slider = document.getElementById('slider');

var flowcount = document.getElementById("flowcount");

slider.setAttribute("max",curve_anim.length-1);


var moving = "n";

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





var curstep = 10//curve_anim.length-1;




function draw_step(k){
	if (k>=curve_anim.length || k<0){return;}
	console.log(curve_anim[k])
	slider.setAttribute("value",k);
	flowcount.innerHTML = curve_anim[k][1];
	console.log(slider)

	polyline.points.clear()
	var centroid = center(curve_anim[k][0]);
	centroid[0] = centroid[0]*30;
	centroid[1] = 140-centroid[1]*30
	for (var i=0;i<curve_anim[k][0].length; i++){
		var c = curve_anim[k][0][i]



	var point = svg.createSVGPoint();
	point.x = (c[0]*30) -centroid[0] + 200;
	point.y = (140-c[1]*30) - centroid[1] + 200;	



	polyline.points.appendItem(point);
	}


}



draw_step(curstep);

function decrement(){
	console.log("decrementing")
	stop = true
	if (curstep == 0){return;}
	curstep--;
	draw_step(curstep)
}

function increment(){
	stop = true
		console.log("incrementing", curstep)

	if (curstep == curve_anim.length){return;}
	curstep++;
	draw_step(curstep)
}


slider.oninput = function() { 
	stop = true
	console.log(this.value)
	curstep = this.value;
	draw_step(curstep);
}



async function fwd(){
	stop = false
  while (curstep < curve_anim.length-1 && stop == false){
  	curstep++;
  	increment()
  	stop = false
  await sleep(200);
}
}

async function bwd(){
	stop = false
  while (curstep > 0 && stop == false){
  	curstep--;
  	decrement()
  	stop = false
  await sleep(150);
}
}