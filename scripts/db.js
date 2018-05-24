

function getProducts() {
//get element with csv
  var txt = $('#inputProducts').val();
  //set config with comma delimeter and headers
  var config = buildConfig();
  //parse the csv
  var results = Papa.parse(txt, config);
  console.log("Synchronous parse results:", results.data);
  return results.data;
}

function getRecepies() {

  var txt = $('#inputRecepies').val();


  var config = buildConfig();


    var results = Papa.parse(txt, config);
    console.log("Synchronous parse results:", results);

    return results.data;
}

function getLk() {

  var txt = $('#inputlk').val();


  var config = buildConfig();


    var results = Papa.parse(txt, config);
    console.log("Synchronous parse results:", results);

    return results.data;
}

function buildConfig()
{
	return {
		delimiter: ",",
		newline: getLineEnding(),
		header: true
	};

  function getLineEnding()
	{
		if ($('#newline-n').is(':checked'))
			return "\n";
		else if ($('#newline-r').is(':checked'))
			return "\r";
		else if ($('#newline-rn').is(':checked'))
			return "\r\n";
		else
			return "";
	}
}
