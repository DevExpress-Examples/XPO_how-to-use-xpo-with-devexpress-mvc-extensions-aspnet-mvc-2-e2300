// Callbacks
function CallbackComplete() {
    _aspxProcessScriptsAndLinks("", true);
}
// Code PageControl
function CorrectCodeRenderWidth(s,e) {
    var pageControl = s;
    var index = pageControl.GetActiveTabIndex();
    var contentElement = pageControl.GetContentElement(index);
    var divs = $("#" + contentElement.id + " div[class^='cr-div']");
    divs.each(function(){
        SetCorrectionWidth(this, 0);
        SetCorrectionWidth(this, pageControl.GetContentsCell().offsetWidth);
    });
}
function SetCorrectionWidth(element, newWidth) {
    var currentStyle = _aspxGetCurrentStyle(element);
    var newClientWidth = newWidth - _aspxPxToInt(currentStyle.paddingLeft) - _aspxPxToInt(currentStyle.paddingRight) -
        _aspxPxToInt(currentStyle.borderLeftWidth) - _aspxPxToInt(currentStyle.borderRightWidth) - 24;
    if (newClientWidth < 1) newClientWidth = 1;
    element.style.width = newClientWidth + "px";
}
function CodeRenderEndCallback() {
    InitRegions();
}
// Screenshorts
function ShowScreenshotWindow(evt, link){
    ShowScreenshot(link.href); 
    evt.cancelBubble = true; 
    return false;
}
function ShowScreenshot(src){
    var screenLeft = document.all && !document.opera ? window.screenLeft : window.screenX;
	var screenWidth = screen.availWidth;
	var screenHeight = screen.availHeight;
    var zeroX = Math.floor((screenLeft < 0 ? 0 : screenLeft) / screenWidth) * screenWidth;
    
	var windowWidth = 475;
	var windowHeight = 325;
	var windowX = parseInt((screenWidth - windowWidth) / 2);
	var windowY = parseInt((screenHeight - windowHeight) / 2);
	if(windowX + windowWidth > screenWidth)
		windowX = 0;
	if(windowY + windowHeight > screenHeight)
		windowY = 0;

    windowX += zeroX;

	var popupwnd = window.open(src,'_blank',"left=" + windowX + ",top=" + windowY + ",width=" + windowWidth + ",height=" + windowHeight + ", scrollbars=no, resizable=no", true);
	if (popupwnd != null && popupwnd.document != null && popupwnd.document.body != null) {
	    popupwnd.document.body.style.margin = "0px"; 
    }
}
// Regions Expand/Collapse
$(document).ready(InitRegions);
function InitRegions() {
    $(".cr-region-head img").each(function() {
        if (!this.regionInitialized) {
            $(this).attr("src", DXCodeRendererCollapsedButton)
                .attr("alt", "Expand").attr("title", "Expand");
            this.regionInitialized = true;
        }
    });
}
function ExpandCollapse(imageItemId) {
    var imageObj = $("#" + imageItemId);
	if (imageObj.attr("expanded"))
	{
		imageObj.attr("src", DXCodeRendererCollapsedButton)
		    .attr("alt", "Expand").attr("title", "Expand").removeAttr("expanded");
		imageObj.parents("h1").next().hide();
	}
	else
	{
		imageObj.attr("src", DXCodeRendererExpandedButton).
		    attr("alt", "Collapse").attr("title", "Collapse").attr("expanded", true);
		imageObj.parents("h1").next().show();
	}
}
function ExpandCollapse_CheckKey(evt, imageItemId) {
    if(_aspxGetKeyCode(evt) == 13)
        ExpandCollapse(imageItemId);
}
// Event Monitor
var changeMonitorTimeoutId = -1;
var changeMonitorParts = [];

function trace_event(sender, args, event_name, info) {
    if (!$("#cb" + event_name).attr("checked")) return;
    
    var name = sender.name;
    var text = ["<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\">",
	    get_trace_line("Sender", name, 100),
	    get_trace_line("EventType", event_name),
	    get_object_info("Arguments", args),
	    get_object_info("Information", info),
	    "</table><br />"].join('');
    changeMonitorParts.push(text);
    if (changeMonitorTimeoutId == -1)
        changeMonitorTimeoutId = _aspxSetTimeout("update_monitor_value();", 0);
}
function get_object_info(name, obj) {
    if (_aspxIsExists(obj)) {
        var text = [];
        for (var key in obj) {
            if (key != "inherit" && key != "constructor")
                text.push(key, " = ", obj[key], "<br />");
        }
        return get_trace_line(name, text.join(''));
    }
    return "";
}
function get_trace_line(name, text, width) {
    var parts = ["<tr><td valign=\"top\""];
    if (_aspxIsExists(width))
        parts.push(" style=\"width: ", width, "px;\"");
    parts.push(">", name, ":</td><td valign=\"top\">", text, "</td></tr>");
    return parts.join('');
}

function update_monitor_value() {
    if (changeMonitorParts.length > 0) {
        var part = changeMonitorParts.shift();
        $("#eventLog").scrollTop(0);
        $("#eventLog").prepend("<div style=\"display:none;\">" + $.trim(part) + "</div>");
        $("#eventLog div:first").slideDown("fast", update_monitor_value);
    }
    else {
        changeMonitorTimeoutId = -1;
        changeMonitorParts = [];
    }
}
function clear_monitor() {
    $("#eventLog").html("");
}
