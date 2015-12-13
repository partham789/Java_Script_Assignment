    var fs=require("fs");
    var csv = fs.readFileSync("mine.csv") //Reading the csv file

    function csvJSON(csv)
    {
      var lines=csv.split("\n");
     //var lines=csv.split('/');
     //var lines=csv.split("\r");
      var result = [];                   //Creating Empty Array
      var headers=lines[0].split(",");


    for(var i=1;i<lines.length-1;i++)
    {
      var obj = {};
      var year="Quntity";

	    var currentline=lines[i].split(",");


     if(currentline[0].indexOf("Agricultural Production Oilseeds ") !=-1 && currentline[0].indexOf("Agricultural Production Oilseeds Kharif")
        && currentline[0].indexOf("Agricultural Production Oilseeds Rabi") !=0 )
     {
        obj[headers[0]]= currentline[0].replace("Agricultural Production Oilseeds", "").trim();
        obj[year.trim()]= currentline[23].trim();
        if(currentline[23] === "NA"){
        obj[year.trim()] = 0;
       }
         lines[i]=lines[i].replace("Annual,","Annual ");
  	      result.push(obj);
      }
    // console.log(result);
   }

     fs.writeFile('agriculture.json', JSON.stringify(result,null,4).replace(/[\\]/g, ''), function (err,data) {
      if (err)
      {
        return console.log(err);
      }
     console.log("Agriculture Json file created");
    });
  }
    var json=csvJSON(csv.toString());
