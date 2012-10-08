function MenuAssistant() {
	/* tipperary, it's a long way.. */
	this.latitude  = "52.4749"; 
	this.longitude = "-8.1572";  
}

MenuAssistant.prototype.setup = function() { 
	/*
	 * 
	 * fullscreen entry
	 * 
	 */
	//this.controller.enableFullScreenMode( true );
	 //header
    this.imgheader = "<img src=\"images\\menu.png\">";
	$('header').update(this.imgheader); 
	
this.controller.setupWidget(Mojo.Menu.appMenu, fst.MenuAttr, fst.MenuModel);

this.gpsSpinnerModel = { spinning: true }
this.controller.setupWidget('gpsSpinner', this.attributes = { spinnerSize: 'small' }, this.gpsSpinnerModel );

this.button0Attributes = {};
this.button0Model = { buttonLabel : '', buttonClass : 'mainbutton', disabled : false };
this.controller.setupWidget("button0", this.button0Attributes, this.button0Model);
Mojo.Event.listen(this.controller.get('button0'), Mojo.Event.tap, this.handleButton0Press.bind(this));	

this.button1Attributes = {};
this.button1Model = { buttonLabel : '', buttonClass : 'menubutton', disabled : false };
this.controller.setupWidget("button1", this.button1Attributes, this.button1Model);
Mojo.Event.listen(this.controller.get('button1'), Mojo.Event.tap, this.handleButton1Press.bind(this));	

this.button5Attributes = {};
this.button5Model = { buttonLabel : '', buttonClass : 'locate', disabled : true };
this.controller.setupWidget("button5", this.button5Attributes, this.button5Model);
this.controller.get('button5').setStyle({
	display: 'none'
}); 
Mojo.Event.listen(this.controller.get('button5'), Mojo.Event.tap, this.handleButton5Press.bind(this));	
};

MenuAssistant.prototype.handleButton5Press = function(event){
	//Mojo.Log.info("tap down at x: " + event.down.x + " y: " + event.down.y); 
	Mojo.Controller.stageController.pushScene('list',this.longitude,this.latitude);
}

MenuAssistant.prototype.handleButton1Press = function(event){
	//Mojo.Log.info("tap down at x: " + event.down.x + " y: " + event.down.y);
	if        ( event.down.x > 0  && event.down.x < 80   && event.down.y < 64) {
	         Mojo.Controller.stageController.pushScene("north");
	} else if (event.down.x > 80  && event.down.x < 160  && event.down.y < 64) {
	     Mojo.Controller.stageController.pushScene("south");		
	} else if (event.down.x > 160 && event.down.x < 240  && event.down.y < 64 ) {
	     Mojo.Controller.stageController.pushScene("east");		
	} else if (event.down.x > 240 && event.down.x < 320  && event.down.y < 64 ) {
	     Mojo.Controller.stageController.pushScene("west");		
	}
}
MenuAssistant.prototype.handleButton0Press = function(event){
	Mojo.Log.info("menu-assistant: Do nothing");
	Mojo.Log.info("menu-assistant: tap down at x: " + event.down.x + " y: " + event.down.y);
/*
 	if ( event.down.x < 150 && event.down.y > 160 && event.down.y < 290) {
	         Mojo.Controller.stageController.pushScene("west");
	} else if (event.down.x > 150 && event.down.y > 160 && event.down.y < 290) {
	     Mojo.Controller.stageController.pushScene("east");		
	} else if (event.down.y > 80 && event.down.y < 160 ) {
	     Mojo.Controller.stageController.pushScene("north");		
	} else if (event.down.y > 290 ) {
	     Mojo.Controller.stageController.pushScene("south");		
	}
 */
}
 
MenuAssistant.prototype.activate = function(event) {
	//$('status').update("recherche gps ");   
	$('gpsSpinner').mojo.start();

	this.controller.serviceRequest('palm://com.palm.location', {
		method: "getCurrentPosition", parameters: { 
		accuracy: 3, maximumAge: 300,responseTime: 1 },
		onSuccess: this.handleServiceResponse.bind(this),
		onFailure: this.handleServiceResponseError.bind(this)
		}); 
		 
	this.controller.get('button5').setStyle({
		display: 'none'
		}); 
	
	this.button5Model.disabled=true; 
	this.controller.modelChanged(this.button5Model); 
};

MenuAssistant.prototype.deactivate = function(event) {
};

MenuAssistant.prototype.cleanup = function(event) {
	this.controller.stopListening(this.controller.get('button0'),Mojo.Event.tap, this.handleButton0Press.bind(this));
	this.controller.stopListening(this.controller.get('button5'),Mojo.Event.tap, this.handleButton5Press.bind(this));
};

MenuAssistant.prototype.handleServiceResponse = function(response) {	
	if (response.errorCode != 0) { 
		Mojo.Log.error("gps error: " + response.errorCode);
		//$('status').update("gps error: " + response.errorCode); 
    	} 
	else {  
		//$('status').update("");   
		this.longitude = response.longitude; 
		this.latitude = response.latitude; 
		this.heading = response.heading; 
		this.altitude = response.altitude; 
		
        $('gpsSpinner').mojo.stop();   
    }

	this.controller.get('button5').setStyle({
		display: 'block'
		}); 
	 
	this.button5Model.disabled=false; 
	this.controller.modelChanged(this.button5Model);  
}; 

MenuAssistant.prototype.handleServiceResponseError = function(event) {
	var lastErrorCode = Object.toJSON(event);
	var jsonErr = lastErrorCode.evalJSON();
	var ec = jsonErr.errorCode;
	/* to my mary, it's a long way.. */
	this.latitude  = "52.4749"; 
	this.longitude = "-8.1572";  
 
	if(ec == 6){ Mojo.Log.error("error: location services disabled."); } 
	else if(ec == 1) { Mojo.Log.error("gps timeout."); } 
	else if(ec == 5) { Mojo.Log.error("error: location services disabled."); } 
	else { Mojo.Log.error("error: "+ec+"."); }
	
    $('gpsSpinner').mojo.stop();    
	
    this.controller.get('button5').setStyle({
	display: 'block'
	});
    
	this.button5Model.disabled=false; 
	this.controller.modelChanged(this.button5Model); 
};
