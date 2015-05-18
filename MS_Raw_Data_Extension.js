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



	//Polls the raw data and converts it into a interger between 0 and 255
	function poll_ConvertData(channel){
   	 var c = .007874015748031482;
	 if(window.navigator.vendor=="Google Inc."){
   	 var gp = navigator.getGamepads()[0];
 	 }else{
 	 	var gp = navigator.getGamepads()[0];
 	 }
   	 var dataChannel= 0;
   	 //Sorts through individual Channels
   	 console.log("orbit Camera Called", "getGamepads" in navigator);
   	 if(channel=="Channel 0"){
   	 	dataChannel= 0;
   	 }if(channel=="Channel 1"){
   	 	dataChannel= 1;
   	 }if(channel=="Channel 2"){
   	 	dataChannel= 2;
   	 }if(channel=="Channel 3"){
   	 	dataChannel= 3;
   	 }if(channel=="Channel 4"){
   	 	dataChannel= 4;
   	 }if(channel=="Channel 5"){
   	 	dataChannel= 5;
   	 }
	 
   	 //retrieves and converts data
   	 var dataIn = gp.axes[dataChannel]; 
   	 if(dataIn!=0){
   		 dataIn = (127+(dataIn/c));
   		 console.log("Converted Data: ", dataIn);
   		 if(dataIn<.5){
   			 dataIn = 0;
   		 }if(dataIn>254){
   			 dataIn = 255;
   		 }
   	 }else{
   		 dataIn = 127;
   	 }
	 return Math.round(dataIn);
	}

	ext.pollaxisData = function(channel) {

	    return poll_ConvertData(channel);
	   };

	 //Checks to see a button has been pressed
	   ext.pollButtonData = function(channel){
	  	 if(window.navigator.vendor=="Google Inc."){
	     	 var gp = navigator.getGamepads()[0];
	   	 }else{
	   	 	var gp = navigator.getGamepads()[0];
	   	 }
		var dataChannel= 0;
		if(channel=="Channel 6"){
			dataChannel = 0;
		}if(channel=="Channel 7"){
			dataChannel = 1;
		}
		var dataIn = gp.buttons[dataChannel]; 
		console.log("Button Data: ", gp.buttons[dataChannel].pressed);
		return gp.buttons[dataChannel].value;
	   }

	   
	//Hat Block 
	   ext.rawDataHat = function(channel, equality, value) {
		   var data = poll_ConvertData(channel);
		   if(equality==">"){
			   if(data>value){
				   return true;
			   }else return false;
		   }else if(equality=="<"){
			   if(data<value){
				   return true;
			   }else return false;
		   }else if(equality=="=="){
			   if(data==value){
				   return true;
			   }else return false;
		   }else if(equality==">="){
			   if(data>=value){
				   return true;
			   }else return false;
		   }else if(equality=="<="){
			   if(data<=value){
				   return true;
			   }else return false;
		   }else if(equality=="!="){
			   if(data!=value){
				   return true;
			   }else return false;
		   }
	          return false;
	       };
		   
	//Button pressed Hat Block
		   ext.buttonHat = function(channel){
			 //Finds to see if the users is using fireFox or Chrome
		  	 if(window.navigator.vendor=="Google Inc."){
		     	 var gp = navigator.getGamepads()[0];
		   	 }else{
		   	 	var gp = navigator.getGamepads()[0];
		   	 }
	   		var dataChannel= 0;
	   		if(channel=="Channel 6"){
	   			dataChannel = 0;
	   		}if(channel=="Channel 7"){
	   			dataChannel = 1;
	   		}
	   		var dataIn = gp.buttons[dataChannel]; 
	   		console.log("Button Data: ", gp.buttons[dataChannel].pressed);
	   		var pressedValue = gp.buttons[dataChannel].value;
			if(pressedValue==1){
				return true;
			}else{
				return false;
			}
		   }
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            // Block type, block name, function name, param1 default value, param2 default value
            ['r', 'Get Analog Data %m.anaChannels', 'pollaxisData', "Channel 0"],
			['r', 'Button Pressed %m.boolChannels', 'pollButtonData', "Channel 6"],
			['h', 'if %m.anaChannels is %m.equalities %n', 'rawDataHat', "Channel 0", ">", 10],
			['h', 'if %m.boolChannels is pressed', 'buttonHat', "Channel 6"]
        ],
		
		menus: {
			anaChannels: ['Channel 0', 'Channel 1', 'Channel 2','Channel 3', 'Channel 4', 'Channel 5'],
			boolChannels: ['Channel 6', 'Channel 7'],
			equalities: ['>', '<','==','>=','<=','!=']
		}
    };

    // Register the extension
    ScratchExtensions.register('Make!Sense', descriptor, ext);
})({});
