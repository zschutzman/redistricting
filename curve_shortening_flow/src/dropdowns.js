// populates the dropdowns for selecting
// districts to visualize

// eats an integer, returns its ordinal (i.e. ordinal(8) == "8th")
// converts 0 to "At-Large"
function ordinal(i) {
    if (i == 0){
    	return "At-Large";
    }
    var j = i % 10,
    k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

// looks at the chosen state and populates it with the correct districts
function populate_dist_dd(ind){

    var sel = document.getElementById("state_ddm"+ind).value;

    if (sel == 0){
       document.getElementById('dist_dd'+ind).innerHTML = "";
       return;
   }
   var distfiles = curvefiles.filter(cf => cf.slice(0,2) == sel);

   var options = distfiles.map(cf => [cf,ordinal(parseInt(cf.slice(2,4)))] );
   options.sort()
   console.log(options)

   var dist_dd_html = '<option value="0">Select a District</option>'

   for (var i=0;i<options.length;i++){
       dist_dd_html += '<option value="'+options[i][0]+'">'+ options[i][1] +'</option>';
   }
   document.getElementById('dist_dd'+ind).innerHTML = dist_dd_html;
}


// calls the drawing things for the chosen district
function set_dist(ind){
	if (document.getElementById("dist_dd"+ind).value == 0){return;}
	console.log("HERE",ind,document.getElementById("dist_dd"+ind).value);
	compdist(document.getElementById("dist_dd"+ind).value.slice(0,4),ind)
}