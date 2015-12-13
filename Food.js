
// Reading the Csv file

  var fs=require("fs");
  var csv = fs.readFileSync("mine.csv")

  function csvJSON(csv){
  //console.log(typeof csv);

  var lines=csv.split("\n");

   //var lines=csv.split('/');
   //var lines=csv.split("\r");

  var result = [];
  var year="Quantity";
  var headers=lines[0].split(",");

     for(var i=1;i<lines.length;i++)
     {
     var obj = {};
     lines[i]=lines[i].replace("Annual,","Annual");
     lines[i]=lines[i].replace("\"Annual Ending mar Of Each Year\"","Annual Ending mar Of Each Year");
     var currentline=lines[i].split(",");
     if((currentline[0].indexOf("Agricultural Production Foodgrains ")!=-1)&&
     (currentline[0].indexOf("Agricultural Production Foodgrains Rabi")!=0)&&
     (currentline[0].indexOf("Agricultural Production Foodgrains Kharif")!=0))
     {
      for(var j=0;j<headers.length;j++)
      {
      if(currentline[j].indexOf("NA")!=-1){
         currentline[j]=0;
      }
      if(j>2)
      currentline[j]=parseFloat(currentline[j]);
      }
		  obj[headers[0]] = currentline[0].substr(34,currentline[0].length);
      obj[year] = currentline[23];
      result.push(obj);
	  }
  }
      //  result.pop();result.pop();result.pop();
    //console.log(result);
    // return JSON.stringify(result);
    //fs = require('fs')

    // To produce the json file

   fs.writeFile('Foodgrains.json', JSON.stringify(result,null,4).replace(/\\n|\\/g, ''), function (err,data) {
   if (err) {
     return console.log(err);
   }
   });
   }
   var json=csvJSON(csv.toString());
   //var str = json.replace("/");
