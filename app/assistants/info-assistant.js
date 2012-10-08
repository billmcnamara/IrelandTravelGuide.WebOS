function InfoAssistant(title,category,advice,image,description1,description2,extra1,slatitude,slongitude,bearing,dist ) {

//	this.info 		  = info;
	this.title 		  = title;
	this.category 	  = category;
	this.advice 	  = advice;  
	this.image 		  =	image;
	this.description1 = description1;
	this.description2 = description2;
	this.extra1 	  = extra1; 
	this.slongitude   = slongitude; 
	this.slatitude 	  = slatitude; 
	this.bearing 	  = bearing;
	this.distance 	  = dist ;  
	
	//Mojo.Log.info(" *** received | "+title+" | "+category+" | "+ advice+" | "+image+" | "+ description1+" | "+ description2+" | "+extra1+" | "+slatitude+" | "+slongitude+" | "+bearing+" | "+ dist );

}

InfoAssistant.prototype.setup = function() { 
	this.controller.setupWidget(Mojo.Menu.appMenu, fst.MenuAttr, fst.MenuModel);

	//Mojo.Log.info(" *** received | "+this.title+" | "+ this.category +" | "+ this.advice+" | "+this.image+" | "+ this.description1+" | "+ this.description2+" | "+this.extra1+" | "+this.slatitude+" | "+this.slongitude+" | "+this.bearing+" | "+this.distance);
	this.imgdir = "images/"+this.category+"/"+this.image;  
    this.bearingimgdir = "images/"+this.bearing;  
    this.bearingimgsrc = "<img src=\""+this.bearingimgdir+"\">";
    this.imgsrc = "<img src=\""+this.imgdir+"\">";

    var titletmp = this.image;
    var titlet = titletmp.replace(".jpg","_t.png");
    this.imgtdir = "images/"+this.category+"/"+titlet;  
    this.imgtsrc = "<img src=\""+this.imgtdir+"\">";

    var image1 = this.image;
    var image2 = image1.replace(".jpg","_2.jpg");
    this.img2dir = "images/"+this.category+"/zoom/"+image2;  
    this.img2src = "<img src=\""+this.img2dir+"\">";
    
    var imagetmp = this.image;
    var imagemap = imagetmp.replace(".jpg","_map.jpg");
    this.imgmapdir = "images/"+this.category+"/zoom/"+imagemap;  
    this.imgmapsrc = "<img src=\""+this.imgmapdir+"\">";
    
    //Mojo.Log.error(" *** received | title         : "+this.title  );
	//Mojo.Log.error(" *** received | advice        : "+this.advice );
	//Mojo.Log.error(" *** received | bearingimgsrc : "+this.bearingimgsrc );
	//Mojo.Log.error(" *** received | imgsrc        : "+this.imgsrc );
	//Mojo.Log.error(" *** received | img2src       : "+this.img2src );
	//Mojo.Log.error(" *** received | imgmapsrc     : "+this.imgmapsrc );
	//Mojo.Log.error(" *** received | imgtsrc       : "+this.imgtsrc );
	//Mojo.Log.error(" *** received | distance      : "+this.distance     );
	//Mojo.Log.error(" *** received | description1  : "+this.description1 );
	//Mojo.Log.error(" *** received | description2  : "+this.description2 );
	//Mojo.Log.error(" *** received | extra1        : "+this.extra1       );

    $('iheader').update(this.imgtsrc);  
	//$('advice').update(this.advice);
	$('aimg').update(this.imgsrc); 
	$('bimg').update(this.img2src);
	$('bearimg').update(this.bearingimgsrc);
    $('imgmap').update(this.imgmapsrc);
	
	$('distance').update(this.distance); 
    
    $('description1').update(this.description1);  
    $('description2').update(this.description2);    
    $('extra1').update(this.extra1);
    
    /* back button
    this.backtop    = "images/backtop.png";  
    this.backbottom = "images/back.png";  
    this.img3src = "<img src=\""+this.backtop+"\">";
    this.img4src = "<img src=\""+this.backbottom+"\">";
	$('backtop').update(this.img3src); 
	$('backbottom').update(this.img4src); 
	this.back1Me = this.controller.get('backtop'); 
	this.back2Me = this.controller.get('backbottom'); 
    Mojo.Event.listen(this.back1Me, Mojo.Event.tap,  this.handlepressMe.bind(this));
    Mojo.Event.listen(this.back2Me, Mojo.Event.tap,  this.handlepressMe.bind(this));
    */
     

    // googlemap button
    this.googlemap    = "images/googlemap.png";  
    this.img5src = "<img src=\""+this.googlemap+"\">";
 	$('openingooglemaps').update(this.img5src); 
	this.googlemapMe = this.controller.get('openingooglemaps'); 
	//Mojo.Log.info(" |oo info-assistant.js | call googleme with : "+ this.title,this.slatitude,this.slongitude);
    Mojo.Event.listen(this.googlemapMe, Mojo.Event.tap,  this.googleMapCall.bind(this));
};

InfoAssistant.prototype.googleMapCall = function(event) {  
	Mojo.Event.stopListening(this.googlemapMe, Mojo.Event.tap, this.googleMapCall);
	//Mojo.Log.info(" +oo info-assistant.js | googleme sending   : "+this.slatitude+","+this.slongitude+"+("+this.title+")");
	this.googleMap(this.title, this.slatitude, this.slongitude); 
};
 
InfoAssistant.prototype.activate = function(event) {  
};

InfoAssistant.prototype.deactivate = function(event) {
};

InfoAssistant.prototype.cleanup = function(event) {
};

InfoAssistant.prototype.googleMap = function(title,slatitude,slongitude) { 

	var store =  "http://maps.google.com?q="+slatitude+","+slongitude+"+("+title+")";
	Mojo.Log.info(" *** googleurl : " +store);	
    this.controller.serviceRequest("palm://com.palm.applicationManager", {
        method:"open",
        parameters: {
            id: "com.palm.app.maps",
            params: {
            	target: store
            }
        }
    });
};