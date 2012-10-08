

function ContactAssistant() {
}

ContactAssistant.prototype.setup = function() {
	this.controller.setupWidget(Mojo.Menu.appMenu, fst.MenuAttr, fst.MenuModel);
  
       
    this.EbuttonAttributes = {};
    this.EbuttonModel = {
        buttonLabel : 'email',
        buttonClass : '',
        disabled : false
        };
    this.controller.setupWidget("EmailButton", this.EbuttonAttributes, this.EbuttonModel); 
    Mojo.Event.listen(this.controller.get('EmailButton'), Mojo.Event.tap, this.handleEmailPress.bind(this));
    
    this.WbuttonAttributes = {};
    this.WbuttonModel = {
        buttonLabel : 'www',
        buttonClass : '',
        disabled : false
        };
    this.controller.setupWidget("WebButton", this.WbuttonAttributes, this.WbuttonModel); 
    Mojo.Event.listen(this.controller.get('WebButton'), Mojo.Event.tap, this.handleWebPress.bind(this));

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

}

/*
ContactAssistant.prototype.handlepressMe = function(event) {  
	Mojo.Event.stopListening(this.back1Me, Mojo.Event.tap,  this.handlepressMe);
	Mojo.Event.stopListening(this.back2Me, Mojo.Event.tap,  this.handlepressMe);
	Mojo.Controller.stageController.popScene();	
};
*/

ContactAssistant.prototype.handleWebPress = function(event){
	this.controller.serviceRequest('palm://com.palm.applicationManager', {
	    method:'open',
	    parameters: {
	    	target: "http://www.mcnamara.fr"
	    }
	}); 
}

ContactAssistant.prototype.handleEmailPress = function(event){
	this.controller.serviceRequest('palm://com.palm.applicationManager', {
	    method:'open',
	    parameters: {
	    	target: "mailto:contact@mcnamara.fr"
	    }
	});
}

ContactAssistant.prototype.activate = function(event) {
}


ContactAssistant.prototype.deactivate = function(event) {
}

ContactAssistant.prototype.cleanup = function(event) {
  	this.controller.stopListening(this.controller.get('EmailButton'),Mojo.Event.tap, this.handleEmailPress.bind(this));
  	this.controller.stopListening(this.controller.get('WebButton'),  Mojo.Event.tap,   this.handleWebPress.bind(this));
  	
}
