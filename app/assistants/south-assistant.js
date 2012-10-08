
function SouthAssistant() { 
	listElementSelector: 'div[id^="line_"]';
};

function exampleCategory(modelItem) {
	return $L(modelItem.category);  
};
  
SouthAssistant.prototype.setup = function() {
	
	this.controller.setupWidget(Mojo.Menu.appMenu, fst.MenuAttr, fst.MenuModel);
    var sceneName;
    var kExamples;
    this.kExamples = kSouth;
    this.examplesModel = {listTitle: $L('examples'), items:this.kExamples};   	
	this.examplesAttributes = {	itemTemplate: 'south', dividerTemplate: 'divider', dividerFunction: exampleCategory, filterFunction: this.filterExamples.bind(this), renderLimit: 21 };
	this.controller.setupWidget( 'examples', this.examplesAttributes, this.examplesModel );
	this.controller.modelChanged(this.examplesModel, this);
    this.controller.listen('examples', Mojo.Event.listTap, this.handleListTap.bindAsEventListener(this));

    //header
    this.imgheader = "<img src=\"images\\southheader.png\">";
	//Mojo.Log.error(" ooo south-assistant: " + this.imgheader);
	$('sheader').update(this.imgheader); 
    
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
SouthAssistant.prototype.handlepressMe = function(event) {   
	Mojo.Event.stopListening(this.back1Me, Mojo.Event.tap,  this.handlepressMe);
	Mojo.Event.stopListening(this.back2Me, Mojo.Event.tap,  this.handlepressMe);
	Mojo.Controller.stageController.popScene();	
};
*/

SouthAssistant.prototype.convertSceneName = function(sceneId) {
	return sceneId.gsub("_", "-");
}; 

SouthAssistant.prototype.filterExamples = function(filterString, listWidget, offset, count) {  
	var matching ;
    matching = this.kExamples;
	this.examplesModel.items = matching;		
	listWidget.mojo.setLength(matching.length);
	listWidget.mojo.setCount(matching.length);
	listWidget.mojo.noticeUpdatedItems(0, matching);
};

SouthAssistant.prototype.handleListTap = function(listTapEvent) {
			var example = listTapEvent.item;
			var sceneName = this.convertSceneName(example.name);
			var title = example.title;
			var slatitude = example.latitude;
			var slongitude = example.longitude;
			var description = example.description1;
			var description2 = example.description2; 
			var link = example.link;     		
			var image = example.image; 	
			var hisorhers = "south";
			this.showImg(title,image,hisorhers,slatitude,slongitude);  
			listTapEvent.stop(); 
};

SouthAssistant.prototype.showImg = function(title,image,hisorhers,slatitude,slongitude) { 
	Mojo.Controller.stageController.pushScene('detail',title,image,hisorhers,slatitude,slongitude);
};
 
SouthAssistant.prototype.activate = function(event) {
};

SouthAssistant.prototype.deactivate = function(event) {
};

SouthAssistant.prototype.cleanup = function(event) {
//	Mojo.Event.stopListening(this.back1Me, Mojo.Event.tap,  this.handlepressMe);
//	Mojo.Event.stopListening(this.back2Me, Mojo.Event.tap,  this.handlepressMe); 
};