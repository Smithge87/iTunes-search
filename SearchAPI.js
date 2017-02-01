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
var name = "anything";
      },
      error : function(results){console.log(results)}
  });

});
function parseResults(result){
  for (let i=0;i<result.results.length;i++){
    currentResults = formatRow(result["results"][(i.toString())]);
      if (i=0){
      $("#resultsTable").html(currentResults);
    }
    else{
      $("#resultsTable").append(currentResults);
    }
  }
}
function formatRow(object){
  cleanObject = "<tr> <td>"+object["artistName"]+"</td> <td>"+object["trackName"]+"</td> <td>"+object["collectionName"]+"</td> </tr>";
  return cleanObject;
}
