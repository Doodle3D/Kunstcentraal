var dropZone = new DropZone();
var sketchAPI = new SketchAPI();
var content;

dropZone.init(document.getElementById('dropzone'));

sketchAPI.init("http://192.168.5.1");

dropZone.onload = function(s) {
  content = convertSvg(s);

  $("#preview").html("<div>Uploading...</div>" + content);

  sketchAPI.save(content,onSketchSuccess,onSketchFail);
};

function convertSvg(svg) {
  //var re = /([a-zA-Z][0-9]{1,}) ([0-9]{1,})/g;
  var re = /([a-zA-Z])\s?([0-9]{1,}) ([0-9]{1,})/g;
  svg = svg.replace(re,"$1$2,$3");
  re = /<\/svg>/g;
  return svg.replace(re,"<!--<![CDATA[d3d-keys {\"height\":5,\"outlineShape\":\"none\",\"twist\":0}]]>-->\n</svg>");
}

function onSketchSuccess() {
  $("#preview").html("<div style='color:green'>Jeuj! Deze tekening staat nu op de Doodle3D WiFi-Box....</div>" + content);
  console.log(content);
}

function onSketchFail() {
  $("#preview").html("<div style='color:red'>Helaas, er is iets misgegaan. Heb je de WiFi-Box wel via de netwerkkabel aangesloten op je laptop?</div>" + content);
}