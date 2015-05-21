(function(ext) {
	var win = null;
	var canvas = null;
	var ctx = null;
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };    
	
	//Sets up the connection to the Three.js server 
	//Opens the window and 
	ext.initWorld = function(scene) {
		//Opens the three.js window
		win = window.open ("http://033ae09.netsolhost.com//gsd2014team5/Localhost/main.html", "", "width=window.width, height=window.height");
        setTimeout(function (){
			
			var message = "INIT_"+scene;
			win.postMessage(message, "http://033ae09.netsolhost.com//gsd2014team5/Localhost/main.html");	
        }, 1000);
	};

	// Block and block menu descriptions
    var descriptor = {
        blocks: [
            // Block type, block name, function name, param1 default value, param2 default value
            [' ', 'New 3D World %m.Scenes', 'initWorld', "Scene"]
        ],
		
		menus: {
		        Scenes: ['Grid', 'Blank']
		    }
    };

    // Register the extension
    ScratchExtensions.register('Scratch Three JS', descriptor, ext);
})({});