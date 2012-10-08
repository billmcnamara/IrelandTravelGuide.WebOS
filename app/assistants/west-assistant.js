function WestAssistant() { 
	listElementSelector: 'div[id^="line_"]';
}

WestAssistant.prototype.convertSceneHerName = function(sceneId) {
	return sceneId.gsub("_", "-");
};

function exampleHerCategory(modelItem) {
	return $L(modelItem.category);  
};

WestAssistant.prototype.setup = function() {

	this.controller.setupWidget(Mojo.Menu.appMenu, fst.MenuAttr, fst.MenuModel);
	var jHers;
    this.jHers = kWest;
	var sceneHerName;
    this.exampleHerModel = {listTitle: $L('herexamples'), items: this.jHers };
    this.examplesHerAttributes = {itemTemplate: 'west', dividerTemplate: 'divider', dividerFunction: exampleHerCategory, filterFunction: this.filterHerExamples.bind(this), renderLimit: 21 };
	//this.jHers.length = 21;
	this.controller.setupWidget( 'herexamples', this.examplesHerAttributes, this.exampleHerModel );
	this.controller.modelChanged(this.exampleHerModel, this); 
	this.controller.listen('herexamples', Mojo.Event.listTap, this.handleHerListTap.bindAsEventListener(this));

	//header
    this.imgheader = "<img src=\"images\\westheader.png\">";
	$('header').update(this.imgheader); 

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
    
    
    };

/*
WestAssistant.prototype.handlepressMe = function(event) {   
	Mojo.Event.stopListening(this.back1Me, Mojo.Event.tap,  this.handlepressMe);
	Mojo.Event.stopListening(this.back2Me, Mojo.Event.tap,  this.handlepressMe);
	Mojo.Controller.stageController.popScene();	
};
*/

WestAssistant.prototype.filterHerExamples = function(filterString, listHerWidget, offset, count) {  
	var matchingHer ;
	matchingHer = this.jHers;
	this.exampleHerModel.items = matchingHer;		
	listHerWidget.mojo.setLength(matchingHer.length);
	listHerWidget.mojo.setCount(count);
	listHerWidget.mojo.noticeUpdatedItems(0, matchingHer);
};

WestAssistant.prototype.handleHerListTap = function(listTapEvent) {
	var tapselect = listTapEvent.item;
	var sceneHerName = this.convertSceneHerName(tapselect.name);
	var title = tapselect.title;
	var description = tapselect.description1;
	var description2 = tapselect.description2; 
	var slatitude = tapselect.latitude;
	var slongitude = tapselect.longitude;
	var link = tapselect.link;     		
	var image = tapselect.image; 	
	var hisorhers = "west";
	this.showHerImg(title,image,hisorhers,slatitude,slongitude);  
	listTapEvent.stop(); 
};

WestAssistant.prototype.showHerImg  = function(title,image,hisorhers,slatitude,slongitude) { 
	Mojo.Controller.stageController.pushScene('detail',title,image,hisorhers,slatitude,slongitude);	
};

WestAssistant.prototype.activate = function(event) {
};

WestAssistant.prototype.deactivate = function(event) {
};

WestAssistant.prototype.cleanup = function(event) {
//	Mojo.Event.stopListening(this.back1Me, Mojo.Event.tap,  this.handlepressMe);
//	Mojo.Event.stopListening(this.back2Me, Mojo.Event.tap,  this.handlepressMe); 
};

