// controls the user-chosed district plots

var compsvgs = [document.getElementById('flowcomp1'),document.getElementById('flowcomp2'),document.getElementById('flowcomp3')];
var comppolys = [document.getElementById('dflowc1'),document.getElementById('dflowc2'),document.getElementById('dflowc3')];
var compsvgshows = [document.getElementById('flowcomp1'),document.getElementById('flowcomp2'),document.getElementById('flowcomp3')]
var comppolyshows = [document.getElementById('dshowc1'),document.getElementById('dshowc2'),document.getElementById('dshowc3')];
var plotspace = document.getElementById('plotspace');
var plotlines = [document.getElementById('flowplot1'),document.getElementById('flowplot2'),document.getElementById('flowplot3')]
var drawing;
var compcurves = [-2,-2,-2];
var vissteps = [0,0,0];
var maxsteps = [-1,-1,-1];
var directions = [1,1,1];


//sets up a plot of the district in fn at position ind = [1,2,3]
function compdist(fn,ind){
	drawing = true;
	var script = document.createElement('script');

	script.onload = function () {
		compcurves[ind-1] = curve_anim.slice();
		maxsteps[ind-1] = curve_anim.length-1

		document.getElementById('track'+ind + "t").innerHTML = fips_dict[fn.slice(0,2)].toUpperCase() + "-" + (parseInt(fn.slice(2,4)));//(fn.slice(2,4) == "00" ? "AL":fn.slice(2,4));
		document.getElementById('distlabel'+ind).innerHTML = fips_dict[fn.slice(0,2)].toUpperCase() + "-" + (fn.slice(2,4) == "00" ? "AL":fn.slice(2,4));
		document.getElementById("slider"+ind).setAttribute("max",curve_anim.length-1);
		document.getElementById("slider"+ind).value = 0;

		compinit();

		document.getElementById("slider"+ind).oninput = function() { 
			vissteps[ind-1] = this.value;
			drawcomp(vissteps[ind-1],ind);
		}
	}

	script.src = "flow_shapes/" + fn + "_curve.js";
	var old = document.getElementById("loadfn")
	old.parentNode.removeChild(old);
	script.id = "loadfn"
	document.head.appendChild(script);
}



// initializes the plotspaces
function compinit(){

	vissteps = [0,0,0];
	if (compcurves[0] != -2){
		draw_init(0,1);
	}
	if (compcurves[1] != -2){
		draw_init(0,2);
	}
	if (compcurves[2] != -2){
		draw_init(0,3);
	}
}


//initializes frame k of plot ind=[1,2,3]
function draw_init(k,ind){

	drawcomp(k,ind);

	comppolyshows[ind-1].points.clear()
	plotlines[ind-1].points.clear()

	var centroid = center(compcurves[ind-1][k][0]);

	for (var i=0;i<compcurves[ind-1][k][0].length; i++){
		var c = compcurves[ind-1][k][0][i]

		var point = compsvgshows[ind-1].createSVGPoint();
		point.x = (c[0]*.45) -centroid[0]*.45 + 100;
		point.y = (c[1] * .45) - centroid[1] * .45 + 100;	

		comppolyshows[ind-1].points.appendItem(point);

	}

	for (var i=0;i<compcurves[ind-1].length;i++){

		var point = plotspace.createSVGPoint();

		point.x = 12+compcurves[ind-1][i][1]/30;
		point.y = 599-(100*(1/Math.sqrt(compcurves[ind-1][i][2])));
		plotlines[ind-1].points.appendItem(point);
	}
}

//draws frame k of plot ind=[1,2,3]
function drawcomp(k,ind){

	document.getElementById("slider"+ind).value = k;

	comppolys[ind-1].points.clear()

	var centroid = center(compcurves[ind-1][k][0]);

	for (var i=0;i<compcurves[ind-1][k][0].length; i++){
		var c = compcurves[ind-1][k][0][i]

		var point = compsvgs[ind-1].createSVGPoint();
		point.x = (c[0]*.45) -centroid[0]*.45 + 100;
		point.y = (c[1] * .45) - centroid[1] * .45 + 100;	

		comppolys[ind-1].points.appendItem(point);
	}

	document.getElementById('track'+ind).setAttribute("cx",Math.min(500,12+compcurves[ind-1][k][1]/30 ));
	document.getElementById('track'+ind).setAttribute("cy",600-(100*(1/Math.sqrt(compcurves[ind-1][k][2]))));
	document.getElementById('track'+ind + "t").setAttribute("x",Math.min(500,7+compcurves[ind-1][k][1]/30 ));
	document.getElementById('track'+ind + "t").setAttribute("y",2+600-(100*(1/Math.sqrt(compcurves[ind-1][k][2]))));
}


//moves plot i=[1,2,3] forward one step
function increment(i){
	if (compcurves[i-1]==-2){return;}
	if (vissteps[i-1] == maxsteps[i-1]){return;}
	vissteps[i-1]++;
	drawcomp(vissteps[i-1],i)
}

//moves plot i=[1,2,3] backward one step
function decrement(i){
	if (compcurves[i-1]==-2){return;}
	if (vissteps[i-1] == 0){return;}
	vissteps[i-1]--;
	drawcomp(vissteps[i-1],i)
}


// animates plot 1 -- unused currently
async function animate_comps1(c){
	if (compcurves[0] == -2 ){return;}
	while (drawing){

		if (vissteps[0] == 0){directions[0]=1}
		if (vissteps[0] == maxsteps[0]){directions[0]=-1}
		if (directions[0] ==1){

			drawcomp(vissteps[0],1)
			vissteps[0]++;
			await sleep(50)
		}

		if (directions[0] ==-1){
			drawcomp(vissteps[0],1)
			vissteps[0]--;
			await sleep(50)
		}
	}
}

// animates plot 2 -- unused currently
async function animate_comps2(c){
	if (compcurves[1] == -2 ){return;}
	while (drawing){

		if (vissteps[1] == 0){directions[1]=1}
		if (vissteps[1] == maxsteps[1]){directions[1]=-1}
		if (directions[1] ==1){

			drawcomp(vissteps[1],2)
			vissteps[1]++;
			await sleep(50)
		}

		if (directions[1] ==-1){
			drawcomp(vissteps[1],2)
			vissteps[1]--;
			await sleep(50)
		}
	}
}

// animates plot 3 -- unused currently
async function animate_comps3(c){
	if (compcurves[2] == -2 ){return;}
	while (drawing){

		if (vissteps[2] == 0){directions[2]=1}
		if (vissteps[2] == maxsteps[2]){directions[2]=-1}
		if (directions[2] ==1){

			drawcomp(vissteps[2],3)
			vissteps[2]++;
			await sleep(50)
		}

		if (directions[2] ==-1){
			drawcomp(vissteps[2],3)
			vissteps[2]--;
			await sleep(50)
		}
	}
}

//////////////////////////
// removes the stuff associated with drawing sel=[1,2,3]
function clearcomp(sel){
	for (var ind=1;ind<=3;ind++){
		if (ind!= sel){continue;}
		else {
			comppolyshows[ind-1].points.clear()
			var point = compsvgshows[ind-1].createSVGPoint();
			point.x =-100;
			point.y = -100;	
			comppolyshows[ind-1].points.appendItem(point);

			comppolys[ind-1].points.clear()
			var point = compsvgs[ind-1].createSVGPoint();
			point.x =-100;
			point.y = -100;	
			comppolys[ind-1].points.appendItem(point);

			plotlines[ind-1].points.clear()
			var point = plotspace.createSVGPoint();
			point.x =-100;
			point.y = -100;	
			plotlines[ind-1].points.appendItem(point);


			document.getElementById("slider"+ind).value = 0;
			document.getElementById("slider"+ind).oninput = null;


			document.getElementById('track'+(ind)).setAttribute("cx",-10);
			document.getElementById('track'+(ind)).setAttribute("cy",-10);


			document.getElementById('track'+ind + "t").innerHTML = "";
			document.getElementById('distlabel'+ind ).innerHTML = "";




			document.getElementById('state_ddm'+ind).getElementsByTagName('option')[0].selected = true;
			populate_dist_dd(ind);




		}

	}
	compcurves = [-2,-2,-2];
	vissteps = [0,0,0];
	maxsteps = [-1,-1,-1];
	directions = [1,1,1];
	drawing=false;
}


