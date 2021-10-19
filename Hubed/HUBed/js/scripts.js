$(function () {
  $('#navbar-toggler').blur(function (event) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      $("#navbar-buttons").collapse("hide");
    }
  });
});

(function (global) {

  var dc = {};

  var htmlHomeURL = "snippets/maps_snippet.html";
  var mapsUrl = "files/map_data.json"

  // Insert innerHTML for selected
  var insertHtml = function (selector, html) {
    var targetElem = document.querySelector(selector);
    targetElem.innerHTML = html;
  };

  var insertProperty = function (string, propName, propValue) {
    var propToReplace = "{{" + propName + "}}";
    string = string.replace(new RegExp(propToReplace, "g"), propValue);
    return string;
  };
  
  // Returns the map name
  var getMapName = function (maps) { 
    var x = document.getElementById("map-searcher");
    var mapName = x.elements[0].value;
    var index = maps.findIndex(function(item, i){
      return item.name === mapName;
    });
    return maps[index];
  };

  // Shows loading icon
  var showLoadingIcon = function (selector) {
    var html = "<div class='text-center'>";
    html += '<img src=images/ajax-loader.gif></div>';
    insertHtml(selector, html);
  };

  document.addEventListener("DOMContentLoaded", function (event) {
    showLoadingIcon("#main-content");
    $ajaxUtils.sendGetRequest(
      mapsUrl,
      showMapsPage,
      true
    );
  });

  dc.loadMap = function() {
    showLoadingIcon("#main-content");
    $ajaxUtils.sendGetRequest(
      mapsUrl,
      showMapsPage);
  };

  function showMapsPage () {
    $ajaxUtils.sendGetRequest(
      htmlHomeURL,
      function (maps_Html) {
        document.querySelector("#main-content").innerHTML = homeHtml;
        var data = getMapName(mapsUrl)
        var label = data.label;
        var blocks = data.blc_need;
        var iron = data.iron_gen;
        var html = maps_Html;
        html +=
          insertProperty(html, "label", label);
        html +=
          insertProperty(html, "blocks", blocks);
        html += 
          insertProperty(html, "iron", iron);
        insertHtml("#main-content", html)
      },
      false);
  };

global.$dc = dc;

})(window);
