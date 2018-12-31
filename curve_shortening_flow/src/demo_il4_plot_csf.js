

var demoil4compsvgshows = [document.getElementById('demoil4showcomp1'),document.getElementById('demoil4showcomp2'),document.getElementById('demoil4showcomp3')]
var demoil4comppolyshows = [document.getElementById('demoil4dshowc1'),document.getElementById('demoil4dshowc2'),document.getElementById('demoil4dshowc3')];
var demoil4comppolys = [document.getElementById('demoil4dflowc1'),document.getElementById('demoil4dflowc2'),document.getElementById('demoil4dflowc3')];
var demoil4compsvgs = [document.getElementById('demoil4flowcomp1'),document.getElementById('demoil4flowcomp2'),document.getElementById('demoil4flowcomp3')];

var demoil4plotsvg = document.getElementById('demoil4plotspace');
var demoil4plotlines = [document.getElementById('demoil4flowplot1'),document.getElementById('demoil4flowplot2'),document.getElementById('demoil4flowplot3')]
var demoil4compcurves = [il45,il420,il4500];
var demoil4vissteps = [0,0,0];
var demoil4maxsteps = [il45.length-1,il420.length-1,il4500.length-1];
var demoil4directions = [1,1,1];





console.log("PERIMETERS: ", il45[0][2], il420[0][2], il4500[0][2])


function demoil4compinit(){

	demoil4vissteps = [0,0,0];
if (demoil4compcurves[0] != -2){
	demoil4draw_init(0,1);

	demoil4animate_comps1();
}
if (demoil4compcurves[1] != -2){
	demoil4draw_init(0,2);

	demoil4animate_comps2();
}
if (demoil4compcurves[2] != -2){
	demoil4draw_init(0,3);

	demoil4animate_comps3();
}
}



function demoil4draw_init(k,ind){
	demoil4comppolys[ind-1].points.clear()
	demoil4comppolyshows[ind-1].points.clear()
	demoil4plotlines[ind-1].points.clear()

	var centroid = center(demoil4compcurves[ind-1][k][0]);

	for (var i=0;i<demoil4compcurves[ind-1][k][0].length; i++){
		var c = demoil4compcurves[ind-1][k][0][i]


	var point = demoil4compsvgs[ind-1].createSVGPoint();
	point.x = (c[0]*.45) -centroid[0]*.45 + 100;
	point.y = (c[1] * .45) - centroid[1] * .45 + 100;	


	demoil4comppolys[ind-1].points.appendItem(point);

	var point = demoil4compsvgshows[ind-1].createSVGPoint();
	point.x = (c[0]*.45) -centroid[0]*.45 + 100;
	point.y = (c[1] * .45) - centroid[1] * .45 + 100;	



	demoil4comppolyshows[ind-1].points.appendItem(point);


}

for (var i=0;i<demoil4compcurves[ind-1].length;i++){



	var point = demoil4plotspace.createSVGPoint();

	point.x = 12+demoil4compcurves[ind-1][i][1]/30;
	point.y = 600-(100*(1/Math.sqrt(demoil4compcurves[ind-1][i][2])));
	demoil4plotlines[ind-1].points.appendItem(point);





}
}


function demoil4drawcomp(k,ind){

	demoil4comppolys[ind-1].points.clear()
	var centroid = center(demoil4compcurves[ind-1][k][0]);

	for (var i=0;i<demoil4compcurves[ind-1][k][0].length; i++){
		var c = demoil4compcurves[ind-1][k][0][i]



	var point = demoil4compsvgs[ind-1].createSVGPoint();
	point.x = (c[0]*.45) -centroid[0]*.45 + 100;
	point.y = (c[1] * .45) - centroid[1] * .45 + 100;	

	demoil4comppolys[ind-1].points.appendItem(point);



}


 document.getElementById('demoil4track'+ind).setAttribute("cx",Math.min(500,12+demoil4compcurves[ind-1][k][1]/30 ));

 document.getElementById('demoil4track'+ind).setAttribute("cy",600-(100*(1/Math.sqrt(demoil4compcurves[ind-1][k][2]))));
   document.getElementById('demoil4track'+ind + "t").setAttribute("x",Math.min(500,7+demoil4compcurves[ind-1][k][1]/30 ));
  document.getElementById('demoil4track'+ind + "t").setAttribute("y",2+600-(100*(1/Math.sqrt(demoil4compcurves[ind-1][k][2]))));




}

async function demoil4animate_comps1(c){
	if (demoil4compcurves[0] == -2 ){return}
	while (true){

			if (demoil4vissteps[0] == 0){demoil4directions[0]=1}
			if (demoil4vissteps[0] == demoil4maxsteps[0]){demoil4directions[0]=-1}

			if (demoil4directions[0] ==1){
				

				 demoil4drawcomp(demoil4vissteps[0],1)
				demoil4vissteps[0]++;
				await sleep(50)
			}

			if (demoil4directions[0] ==-1){
				 demoil4drawcomp(demoil4vissteps[0],1)
				demoil4vissteps[0]--;
				await sleep(50)

			}


		
	}
	}
async function demoil4animate_comps2(c){
	if (demoil4compcurves[1] == -2 ){return}
	while (true){
			if (demoil4vissteps[1] == 0){demoil4directions[1]=1}
			if (demoil4vissteps[1] == demoil4maxsteps[1]){demoil4directions[1]=-1}

			if (demoil4directions[1] ==1){
				
				demoil4drawcomp(demoil4vissteps[1],2)
				demoil4vissteps[1]++;
				await sleep(50)
			}

			if (demoil4directions[1] ==-1){
				 demoil4drawcomp(demoil4vissteps[1],2)
				demoil4vissteps[1]--;
				await sleep(50)

			}


		
	}
	}
async function demoil4animate_comps3(c){
	if (demoil4compcurves[2] == -2 ){return}
	while (true){

			if (demoil4vissteps[2] == 0){demoil4directions[2]=1}
			if (demoil4vissteps[2] == demoil4maxsteps[2]){demoil4directions[2]=-1}

			if (demoil4directions[2] ==1){
				

				 demoil4drawcomp(demoil4vissteps[2],3)
				demoil4vissteps[2]++;
				await sleep(50)
			}

			if (demoil4directions[2] ==-1){
				 demoil4drawcomp(demoil4vissteps[2],3)
				demoil4vissteps[2]--;
				await sleep(50)

			}


		
	}
	}


demoil4compinit();