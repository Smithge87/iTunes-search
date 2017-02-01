// html5 audiotag



function cleanTerms(term){
  var cleanTerm = "";
  if(term != ""){
  return cleanTerm = (term.replace(/ /g,"+")+"+");
  }
  return cleanTerm;
}
function parseForm(data){
  var artist = cleanTerms(data[0]["artist"]);
  var song = cleanTerms(data[0]["song"]);

  var address = ("https://itunes.apple.com/search?term="+artist+song);
  return address;

}

$('form').submit(function(event) {
  event.preventDefault();
  $("#resultsTable tr").remove();
  var formData = [{
    			"artist":$("#artistName").val(),
    			"song": $("#songName").val(),
  }];
  var url = parseForm(formData);

  $.ajax({
			type 		: "GET",
			url 		: url,
			dataType 	: "jsonp",
      success : function(results){
        parseResults(results);
    }
  });
});



function parseResults(result){
  for (let i=0;i<result.results.length;i++){
    if ((result["results"][(i.toString())]["kind"])=="song"){
    currentResults = formatRow(result["results"][(i.toString())]);
      $("#resultsTable").append(currentResults);
    }
  }
}
function formatRow(object){
  cleanObject =
  "<tr><td><img src="+object["artworkUrl100"]+
  " </td> <td>"+object["artistName"]+
  "</td>  <td>"+object["trackName"]+
  "</td> <td>"+object["collectionName"]+
  "</td> <td><audio controls> <source src="+object["previewUrl"]+"></audio>"+
  "</td> </tr>";
  return cleanObject;
}
