chrome.extension.onMessage.addListener(function(message, messageSender, sendResponse) {
	SetState(message);
});

chrome.runtime.sendMessage({}, function(response) {
  SetState(response);
});


function SetState(data)
{
	document.getElementById("openTimes").innerHTML = data.times;

	switch(data.state)
	{
		case "0" :
			document.getElementById("State").innerHTML = "Closed";
			document.getElementById("info").innerHTML = data.closedInfo;
			break;

		case "1" : 
			document.getElementById("State").innerHTML = "Open";
			document.getElementById("info").innerHTML = data.openInfo;
			break;
	}
}