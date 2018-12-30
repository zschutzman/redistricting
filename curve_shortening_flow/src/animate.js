var anim_svg = document.getElementById('animbox');

var animline= document.getElementById('animflow');







var animstep = 0;








async function anim_step(k){
	if (k>=md3.length || k<0){return;}


	animline.points.clear()
	var centroid = center(md3[k][0]);

	for (var i=0;i<md3[k][0].length; i++){
		var c = md3[k][0][i]



	var point = anim_svg.createSVGPoint();
	point.x = (c[0]*.5) -centroid[0]*.5 + 100;
	point.y = (c[1]*.5) - centroid[1]*.5 + 100;	



	animline.points.appendItem(point);

}
}



async function animate_md3() {
	while (true){

	while (animstep < md3.length-1 ){
		await anim_step(animstep);
		animstep++;
		await sleep(25);
	}
	while (animstep >= 0){
		await anim_step(animstep);
		animstep--;
		await sleep(25);
	}
}
}



anim_step(animstep);

animate_md3();