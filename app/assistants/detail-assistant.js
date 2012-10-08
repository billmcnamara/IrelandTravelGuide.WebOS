function DetailAssistant(data1,data2,data3,data4,data5) {
	this.title = data1;
	this.image = data2;
	this.category = data3;
	this.slatitude = data4;
	this.slongitude = data5;
}

DetailAssistant.prototype.setup = function() { 
	this.controller.setupWidget(Mojo.Menu.appMenu, fst.MenuAttr, fst.MenuModel);

	this.img1dir = "images/"+this.category+"/"+this.image;  
    this.img1src = "<img src=\""+this.img1dir+"\">";

    var image2 = this.image;
    var imagetmp = this.image;

    var titletmp = this.image;
    var titlet = titletmp.replace(".jpg","_t.png");
    this.imgtdir = "images/"+this.category+"/"+titlet;  
    this.imgtsrc = "<img src=\""+this.imgtdir+"\">";

    var image2 = image2.replace(".jpg","_2.jpg");
    this.img2dir = "images/"+this.category+"/zoom/"+image2;  
    this.img2src = "<img src=\""+this.img2dir+"\">";
    
    var imagemap = imagetmp.replace(".jpg","_map.jpg");
    this.imgmapdir = "images/"+this.category+"/zoom/"+imagemap;  
    this.imgmapsrc = "<img src=\""+this.imgmapdir+"\">";

	//Mojo.Log.error(" *** detail-assistant.js | titlet : "+this.imgtsrc );
    //Mojo.Log.error(" *** detail-assistant.js | image1 : "+this.img1src );
    //Mojo.Log.error(" *** detail-assistant.js | mapimg : "+this.imgmapsrc );
	//Mojo.Log.error(" *** detail-assistant.js | image2 : "+this.img2src );

	/* back button
    this.backtop    = "images/back.png";  
    this.backbottom = "images/back.png";  
    this.img3src = "<img src=\""+this.backtop+"\">";
    this.img4src = "<img src=\""+this.backbottom+"\">";
    this.controller.get('backtop').update(this.img3src); 
    this.controller.get('backbottom').update(this.img4src); 
	this.back1Me = this.controller.get('backtop'); 
	this.back2Me = this.controller.get('backbottom'); 
    Mojo.Event.listen(this.back1Me, Mojo.Event.tap,  this.handlepressMe.bind(this));
    Mojo.Event.listen(this.back2Me, Mojo.Event.tap,  this.handlepressMe.bind(this));
	*/
    
	this.controller.get('header').update(this.imgtsrc);  
	this.controller.get('mapimg').update(this.imgmapsrc); 
	this.controller.get('bimg').update(this.img2src); 
	this.controller.get('aimg').update(this.img1src); 

	// googlemap button
    this.googlemap    = "images/googlemap.png";  
    this.img5src = "<img src=\""+this.googlemap+"\">";
 	$('openingooglemaps').update(this.img5src); 
	this.googlemapMe = this.controller.get('openingooglemaps'); 
	//Mojo.Log.info(" |oo detail-assistant.js | call googlemapcall : "+ this.title,this.slatitude,this.slongitude);
    Mojo.Event.listen(this.googlemapMe, Mojo.Event.tap,  this.googleMapCall.bind(this));
   //Mojo.Log.info( Mojo.Log.propertiesAsString( event, true ));
    

};

/*
DetailAssistant.prototype.handlepressMe = function(event) {  
	Mojo.Event.stopListening(this.back1Me, Mojo.Event.tap,  this.handlepressMe);
	Mojo.Event.stopListening(this.back2Me, Mojo.Event.tap,  this.handlepressMe);
	Mojo.Controller.stageController.popScene();	
};
*/

DetailAssistant.prototype.googleMapCall = function(event) {  
	Mojo.Event.stopListening(this.googlemapMe, Mojo.Event.tap, this.googleMapCall);
	//Mojo.Log.info(" +oo detail-assistant.js | googleme sending   : "+this.slatitude+","+this.slongitude+"+("+this.title+")");
	this.googleMap(this.title, this.slatitude, this.slongitude); 
};

DetailAssistant.prototype.activate = function(event) {  
};

DetailAssistant.prototype.deactivate = function(event) {
};

DetailAssistant.prototype.cleanup = function(event) {
};

DetailAssistant.prototype.googleMap = function(title,slatitude,slongitude) {
	//Mojo.Log.info(" \oo detail-assistant.js | googleme received  : "+slatitude+","+slongitude+"+("+title+")");
	//Mojo.Log.error( Mojo.Log.propertiesAsString( event, true ));

	var store =  "http://maps.google.com?q="+slatitude+","+slongitude+"+("+title+")";
	//Mojo.Log.error(" detail-assistant.js | *** googleurl : " +store);	
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