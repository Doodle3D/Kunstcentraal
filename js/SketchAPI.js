/*
 * This file is part of the Doodle3D project (http://doodle3d.com).
 *
 * Copyright (c) 2013, Doodle3D
 * This software is licensed under the terms of the GNU GPL v2 or later.
 * See file LICENSE.txt or visit http://www.gnu.org/licenses/gpl.html for full license details.
 */

function SketchAPI() {
	
	var _apiPath = "/d3dapi";
	var _apiCGIPath = "/cgi-bin"+_apiPath;
	var _wifiboxURL;
	var _wifiboxCGIBinURL;
	
	var _timeoutTime 							= 3000;
	var _saveSketchTimeoutTime 		= 1500;
	
	var _self = this;

	this.init = function(wifiboxURL) {
		//console.log("ConfigAPI:init");
		
		_wifiboxURL = wifiboxURL+_apiPath;
		_wifiboxCGIBinURL = wifiboxURL+_apiCGIPath;
	}

	this.save = function(txt,completeHandler,failedHandler) {
		// console.log("ConfigAPI:save");		
		$.ajax({
			url: _wifiboxCGIBinURL + "/sketch",
			type: "POST",
			data: {"data":txt},
			dataType: 'json',
			timeout: _saveSketchTimeoutTime,
			success: function(response){
				// console.log("ConfigAPI:save response: ",response);
				if(response.status == "error" || response.status == "fail") {
					if(failedHandler) failedHandler(response);
					else console.log("SketchAPI/save:fail",response);
				} else {
					if (completeHandler) completeHandler(response.data);
					else console.log("SketchAPI/save:fail no complete handler defined");
				}
			}
		}).fail(function() {
			if(failedHandler) failedHandler();
			else console.log("fail");
		});
	};

	this.clear = function(txt,completeHandler,failedHandler) {
		// console.log("ConfigAPI:clear");		
		$.ajax({
			url: _wifiboxCGIBinURL + "/sketch/clear",
			type: "POST",
			data: {"data":txt},
			dataType: 'json',
			timeout: _saveSketchTimeoutTime,
			success: function(response){
				// console.log("ConfigAPI:clear response: ",response);
				if(response.status == "error" || response.status == "fail") {
					if(failedHandler) failedHandler(response);
					else console.log("SketchAPI/clear:fail",response);
				} else {
					if (completeHandler) completeHandler(response.data);
					else console.log("SketchAPI/clear:fail no complete handler defined");
				}
			}
		}).fail(function() {
			if(failedHandler) failedHandler();
			else console.log("fail");
		});
	};
}