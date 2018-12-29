

var democompsvgshows = [document.getElementById('demoshowcomp1'),document.getElementById('demoshowcomp2'),document.getElementById('demoshowcomp3')]
var democomppolyshows = [document.getElementById('demodshowc1'),document.getElementById('demodshowc2'),document.getElementById('demodshowc3')];
var democomppolys = [document.getElementById('demodflowc1'),document.getElementById('demodflowc2'),document.getElementById('demodflowc3')];
var democompsvgs = [document.getElementById('demoflowcomp1'),document.getElementById('demoflowcomp2'),document.getElementById('demoflowcomp3')];

var demoplotsvg = document.getElementById('demoplotspace');
var demoplotlines = [document.getElementById('demoflowplot1'),document.getElementById('demoflowplot2'),document.getElementById('demoflowplot3')]
var democompcurves = [md3,md3,md3];
var demovissteps = [0,0,0];
var demomaxsteps = [md3.length-1,md3.length-1,md3.length-1];
var demodirections = [1,1,1];








function democompinit(){

	demovissteps = [0,0,0];
if (democompcurves[0] != -2){
	demodraw_init(0,1);

	demoanimate_comps1();
}
if (democompcurves[1] != -2){
	demodraw_init(0,2);

	demoanimate_comps2();
}
if (democompcurves[2] != -2){
	demodraw_init(0,3);

	demoanimate_comps3();
}
}



function demodraw_init(k,ind){
	democomppolys[ind-1].points.clear()
	democomppolyshows[ind-1].points.clear()
	demoplotlines[ind-1].points.clear()

	var centroid = center(democompcurves[ind-1][k][0]);

	for (var i=0;i<democompcurves[ind-1][k][0].length; i++){
		var c = democompcurves[ind-1][k][0][i]


	var point = democompsvgs[ind-1].createSVGPoint();
	point.x = (c[0]*.45) -centroid[0]*.45 + 100;
	point.y = (c[1] * .45) - centroid[1] * .45 + 100;	


	democomppolys[ind-1].points.appendItem(point);

	var point = democompsvgshows[ind-1].createSVGPoint();
	point.x = (c[0]*.45) -centroid[0]*.45 + 100;
	point.y = (c[1] * .45) - centroid[1] * .45 + 100;	



	democomppolyshows[ind-1].points.appendItem(point);


}

for (var i=0;i<democompcurves[ind-1].length;i++){



	var point = demoplotspace.createSVGPoint();

	point.x = democompcurves[ind-1][i][1]/30;
	point.y = 600-(100*(1/Math.sqrt(democompcurves[ind-1][i][2])));
	demoplotlines[ind-1].points.appendItem(point);





}
}


function demodrawcomp(k,ind){

	democomppolys[ind-1].points.clear()
	console.log(democompcurves[ind-1][k])
	var centroid = center(democompcurves[ind-1][k][0]);

	for (var i=0;i<democompcurves[ind-1][k][0].length; i++){
		var c = democompcurves[ind-1][k][0][i]



	var point = democompsvgs[ind-1].createSVGPoint();
	point.x = (c[0]*.45) -centroid[0]*.45 + 100;
	point.y = (c[1] * .45) - centroid[1] * .45 + 100;	

	democomppolys[ind-1].points.appendItem(point);



}


 document.getElementById('demotrack'+ind).setAttribute("cx",Math.min(500,democompcurves[ind-1][k][1]/30 ));
 document.getElementById('demotrack'+ind).setAttribute("cy",600-(100*(1/Math.sqrt(democompcurves[ind-1][k][2]))));



}

async function demoanimate_comps1(c){
	if (democompcurves[0] == -2 ){return}
	while (true){

			if (demovissteps[0] == 0){demodirections[0]=1}
			if (demovissteps[0] == demomaxsteps[0]){demodirections[0]=-1}

			if (demodirections[0] ==1){
				

				 demodrawcomp(demovissteps[0],1)
				demovissteps[0]++;
				await sleep(50)
			}

			if (demodirections[0] ==-1){
				 demodrawcomp(demovissteps[0],1)
				demovissteps[0]--;
				await sleep(50)

			}


		
	}
	}
async function demoanimate_comps2(c){
	if (democompcurves[1] == -2 ){return}
	while (true){
			if (demovissteps[1] == 0){demodirections[1]=1}
			if (demovissteps[1] == demomaxsteps[1]){demodirections[1]=-1}

			if (demodirections[1] ==1){
				
				demodrawcomp(demovissteps[1],2)
				demovissteps[1]++;
				await sleep(50)
			}

			if (demodirections[1] ==-1){
				 demodrawcomp(demovissteps[1],2)
				demovissteps[1]--;
				await sleep(50)

			}


		
	}
	}
async function demoanimate_comps3(c){
	if (democompcurves[2] == -2 ){return}
	while (true){

			if (demovissteps[2] == 0){demodirections[2]=1}
			if (demovissteps[2] == demomaxsteps[2]){demodirections[2]=-1}

			if (demodirections[2] ==1){
				

				 demodrawcomp(demovissteps[2],3)
				demovissteps[2]++;
				await sleep(150)
			}

			if (demodirections[2] ==-1){
				 demodrawcomp(demovissteps[2],3)
				demovissteps[2]--;
				await sleep(150)

			}


		
	}
	}


democompinit();