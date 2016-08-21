var lastData;

CheckOpen();
setInterval(CheckOpen, 1000 * 5);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	sendResponse(lastData);
});


function CheckOpen() {

	var url = "http://r-w.co/OpenHelpDesk/data.php?school=1";
	var request = new XMLHttpRequest();
	request.open('GET', url, true);

	request.onload = function() {
	  if (request.status >= 200 && request.status < 400) {

	  	var icon = "images/UnknownIcon.png";
	  	var stateMessage = "The help desk state is unknow";

	  	lastData = JSON.parse(request.responseText);

	    switch(lastData.state)
	    {
	    	case "0" :
	    		icon = "images/CloseIcon.png";
	    		stateMessage = "The help desk is closed";
	    		break;

	    	case "1" :
	    		icon = "images/OpenIcon.png";
	    		stateMessage = "The help desk is open";
	    		 break;
	    }

	    chrome.runtime.sendMessage(lastData);
	    chrome.browserAction.setIcon( { path : { "19": icon } });
	    chrome.browserAction.setTitle( { title : stateMessage });

	  }
	};

	request.send();
}