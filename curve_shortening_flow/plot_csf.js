var compsvgs = [document.getElementById('flowcomp1'),document.getElementById('flowcomp2'),document.getElementById('flowcomp3')];

var comppolys = [document.getElementById('dflowc1'),document.getElementById('dflowc2'),document.getElementById('dflowc3')];



var compsvgshows = [document.getElementById('showcomp1'),document.getElementById('showcomp2'),document.getElementById('showcomp3')]
var comppolyshows = [document.getElementById('dshowc1'),document.getElementById('dshowc2'),document.getElementById('dshowc3')];

var plotsvg = document.getElementById('plotspace');
var plotlines = [document.getElementById('flowplot1'),document.getElementById('flowplot2'),document.getElementById('flowplot3')]








var compcurves = [-2,-2,-2];
var vissteps = [0,0,0];
var maxsteps = [-1,-1,-1];
var directions = [1,1,1];








function compdist(fn,ind){
var script = document.createElement('script');

script.onload = function () {
    compcurves[ind-1] = curve_anim.slice();
    maxsteps[ind-1] = curve_anim.length-1
    compinit();


};
script.src = "flow_shapes/" + fn + "_curve.js";

var old = document.getElementById("loadfn")
old.parentNode.removeChild(old);
 
script.id = "loadfn"
document.head.appendChild(script);

}

function compinit(){

	vissteps = [0,0,0];
if (compcurves[0] != -2){
	draw_init(0,1);

	animate_comps1();
}
if (compcurves[1] != -2){
	draw_init(0,2);

	animate_comps2();
}
if (compcurves[2] != -2){
	draw_init(0,3);

	animate_comps3();
}
}



function draw_init(k,ind){
	comppolys[ind-1].points.clear()
	comppolyshows[ind-1].points.clear()
	plotlines[ind-1].points.clear()

	var centroid = center(compcurves[ind-1][k][0]);

	for (var i=0;i<compcurves[ind-1][k][0].length; i++){
		var c = compcurves[ind-1][k][0][i]


	var point = compsvgs[ind-1].createSVGPoint();
	point.x = (c[0]*.45) -centroid[0]*.45 + 100;
	point.y = (c[1] * .45) - centroid[1] * .45 + 100;	


	comppolys[ind-1].points.appendItem(point);

	var point = compsvgshows[ind-1].createSVGPoint();
	point.x = (c[0]*.45) -centroid[0]*.45 + 100;
	point.y = (c[1] * .45) - centroid[1] * .45 + 100;	



	comppolyshows[ind-1].points.appendItem(point);


}

for (var i=0;i<compcurves[ind-1].length;i++){



	var point = plotspace.createSVGPoint();

	point.x = compcurves[ind-1][i][1]/20;
	point.y = 600-(100*(1/Math.sqrt(compcurves[ind-1][i][2])));
	plotlines[ind-1].points.appendItem(point);





}
}


function drawcomp(k,ind){

	comppolys[ind-1].points.clear()

	var centroid = center(compcurves[ind-1][k][0]);

	for (var i=0;i<compcurves[ind-1][k][0].length; i++){
		var c = compcurves[ind-1][k][0][i]



	var point = compsvgs[ind-1].createSVGPoint();
	point.x = (c[0]*.45) -centroid[0]*.45 + 100;
	point.y = (c[1] * .45) - centroid[1] * .45 + 100;	

	comppolys[ind-1].points.appendItem(point);



}
}

async function animate_comps1(c){
	if (compcurves[0] == -2 ){return}
	while (true){

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
async function animate_comps2(c){
	if (compcurves[1] == -2 ){return}
	while (true){

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
async function animate_comps3(c){
	if (compcurves[2] == -2 ){return}
	while (true){

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



