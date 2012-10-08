
function ListAssistant(data1,data2,data3,data4) { 
	listElementSelector: 'div[id^="line_"]';
	this.longitude= data1;
	this.latitude= data2; 
	this.altitude= data3;
	this.heading= data4; 
};

function exampleCategory(modelItem) {
	return $L(modelItem.category);  
};
 
function compareDistance(a, b) { 
	return a.distance - b.distance;
};

ListAssistant.prototype.setup = function() {
	
	this.controller.setupWidget(Mojo.Menu.appMenu, fst.MenuAttr, fst.MenuModel);
    var sceneName;
	var kExamples;
    this.kExamples = kNSEW;
    this.examplesModel = {listTitle: $L('examples'), items:this.kExamples};   	
	this.examplesAttributes = {	itemTemplate: 'locate', dividerTemplate: 'divider', dividerFunction: exampleCategory, filterFunction: this.filterExamples.bind(this), renderLimit: 20 };
	this.controller.setupWidget( 'examples', this.examplesAttributes, this.examplesModel );

    //header
    this.imgheader = "<img src=\"images\\listheader.png\">";
	$('lheader').update(this.imgheader); 

    
    // list elements
	for(var i = 0; i < this.kExamples.length; i++) {
	     var slongitude = this.kExamples[i].longitude;
         var slatitude = this.kExamples[i].latitude;
		 var distance = this.calcDistance( this.longitude, this.latitude, slongitude, slatitude);
		 var bearing = this.calcBearing( this.longitude, this.latitude,  slongitude, slatitude);
		 var heading = this.heading; 
		 Mojo.Log.info(" list-assistant.js | ***** heading: " +heading);
		 
		 this.kExamples[i].distance = parseFloat(distance);		 
		 this.kExamples[i].bearing  = parseFloat(bearing);
		 //Mojo.Log.info(" \ oo distance: " +this.kExamples[i].distance);		 
		 //Mojo.Log.info(" \ oo bearing: " +this.kExamples[i].bearing);
		 
		 var bimage = "north.png";		 
		        if (bearing > 338 && bearing < 22){		 bimage = "north.png";
		 } else if (bearing > 22 && bearing < 68){	     bimage = "northeast.png";
		 } else if (bearing > 68 && bearing < 112){	     bimage = "east.png";
		 } else if (bearing > 112 && bearing < 158){	 bimage = "southeast.png";
		 } else if (bearing > 158 && bearing < 202){	 bimage = "south.png";
		 } else if (bearing > 202 && bearing < 248){	 bimage = "southwest.png";
		 } else if (bearing > 248 && bearing < 292){	 bimage = "west.png";
		 } else if (bearing > 292 && bearing < 338){	 bimage = "northwest.png";
		 }
		 this.kExamples[i].bearing = bimage;
	}

	this.kExamples = this.kExamples.sort(compareDistance);
	this.kExamples.length = 20;
	this.controller.modelChanged(this.examplesModel, this);
 
	this.controller.listen('examples', Mojo.Event.listTap, this.handleListTap.bindAsEventListener(this));

};

ListAssistant.prototype.convertSceneName = function(sceneId) {
	return sceneId.gsub("_", "-");
};

ListAssistant.prototype.activate = function() {
	var sceneCookie = new Mojo.Model.Cookie("sceneCookie");
	sceneCookie.put(""); 
};

ListAssistant.prototype.filterExamples = function(filterString, listWidget, offset, count) {  
	var matching ;
    matching = this.kExamples;
	this.examplesModel.items = matching;					
	listWidget.mojo.setLength(matching.length);
	listWidget.mojo.setCount(matching.length);
	listWidget.mojo.noticeUpdatedItems(0, matching);
};


ListAssistant.prototype.handleListTap = function(listTapEvent) {
	var example = 			listTapEvent.item; 
	var title = "";			title = example.title;
	var category = "";		category = example.category;
	var advice = "";		advice = example.advice;  
	var image = "";			image = example.image;
	var description1 = "";	description1 = example.description1;
	var description2 = "";	description2 = example.description2;
	var extra1 = "";		extra1 = example.extra1;
	var slongitude = "";	slongitude = example.longitude; 
	var slatitude = "";		slatitude = example.latitude; 
	var gpslatitude = "";	gpslatitude = this.latitude;
	var gpslongitude = "";	gpslongitude = this.longitude;
	var bear = "";			bear = example.bearing ;
	var dist = "";			dist = example.distance ;
	this.showInfo("info",title,category,advice,image,description1,description2,extra1,slatitude,slongitude,bear,dist );
	listTapEvent.stop();
};
 
ListAssistant.prototype.calcDistance = function(lon1,lat1,lon2,lat2) {
	var R = 6371;
	var dLat = (lat2-lat1) * Math.PI / 180;
	var dLon = (lon2-lon1)* Math.PI / 180; 
	var la1 = lat1 * Math.PI / 180; 
	var la2 = lat2 * Math.PI / 180; 
	var lo1 = lon1 * Math.PI / 180; 
	var lo2 = lon2 * Math.PI / 180; 
	var lod2 = dLon / 2;
	var lat2 = dLat / 2;
	var a1 = Math.sin(lat2) * Math.sin(lat2);
	var a2 = Math.cos(la1) * Math.cos(la2);
	var a3 = Math.sin(lod2) * Math.sin(lod2); 
	var a4 = a2 * a3;
	var a = a1 + a4;
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	var d = R * c;
	var dd = Math.round(d*100)/100;
	//Mojo.Log.info(" ** lat1, lon1: " +lat1+","+lon1);
	//Mojo.Log.info(" ** lat2, lon2: " +lat2+","+lon2);
 	//Mojo.Log.info("  | oo dist: " +dd);	
	return dd;
};

ListAssistant.prototype.calcBearing = function(lon1,lat1,lon2,lat2) {
	var lo1 = lon1 * Math.PI / 180; 
	var la1 = lat1 * Math.PI / 180; 
	var lo2 = lon2 * Math.PI / 180; 
	var la2 = lat2 * Math.PI / 180; 
	var R = 6371;

	var dLat = (lat2-lat1) * Math.PI / 180;
	var dLon = (lon2-lon1)* Math.PI / 180; 

	var y = Math.sin(dLon) * Math.cos(la2);
	var x = Math.cos(la1)* Math.sin(la2) - Math.sin(la1)* Math.cos(la2) * Math.cos(dLon);
	var brng = Math.atan2(y, x);
	var brngDeg = brng * 180 / Math.PI;
	var bearng = (brngDeg + 360) % 360;
	var bbearng = Math.round(bearng*100)/100;
	//Mojo.Log.info(" oo lat1, lon1: " +lat1+","+lon1);
	//Mojo.Log.info(" oo lat2, lon2: " +lat2+","+lon2);
	//Mojo.Log.info(" | oo bearing: " +bbearng);	
	return bbearng;
}

ListAssistant.prototype.showInfo =   function(info,title,category,advice,image,description1,description2,extra1,slatitude,slongitude,bearing,distance ) {
	//Mojo.Log.info(" *** pushing  | "+title+" | "+ category +" | "+ advice +" | "+ image +" | "+ description1 +" | " + description2 + " | " + extra1 +" | "+ slatitude +" | "+ slongitude +" | "+ bearing +" | "+ distance);
	Mojo.Controller.stageController.pushScene("info",title,category,advice,image,description1,description2,extra1,slatitude,slongitude,bearing,distance );
};

