
fst = {};

fst.MenuAttr = { omitDefaultItems: true };

fst.MenuModel = {
	visible: true,
	items: [
		{label: "About", command: 'do-myAbout'},
		{label: "Version", command: 'do-myVersion'}
	]
};

function StageAssistant() {
}
 
StageAssistant.prototype.handleCommand = function(event) {
    if(event.type == Mojo.Event.command) {
      switch(event.command) {
        case 'do-myVersion':
		  var currentScene = this.controller.activeScene();
          currentScene.showAlertDialog({
            onChoose: function(value) {},
            title: "Ireland Travel Guide",
            message: " 19 / F /2011",
            choices:[
              {label: "OK", value:""}
            ]
          });
        break;
        case 'do-myAbout':
			this.controller.pushScene("contact");
        break;
	  }
    }
};
 
StageAssistant.prototype.setup = function() { 
	this.controller.pushScene("menu");
	
}
