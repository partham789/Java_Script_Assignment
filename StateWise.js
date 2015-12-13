     var fs=require("fs");
     var csv = fs.readFileSync("mine.csv")

     var state = ["Karnataka","Andhra Pradesh","Tamil Nadu","Kerala"];
     var final =[]; // Empty Array to store the final value

     // Creating function

    function StateWise(csv)
    {
      var lines=csv.split("\n");
      var lines=csv.split("\r");
      var headers=lines[0].split(",");
      var stateLine=[];
      var lineCount= lines.length;


    for(var i=1;i<lineCount;i++)
    {
      lines[i]=lines[i].replace("Annual,","Annual ");
	    var currentline=lines[i].split(",");
      var currentState = currentline[0].replace("Agricultural Production Foodgrains Rice Yield","").trim();
     //console.log(currentState);
    if(state.indexOf(currentState)> -1)
    {
      stateLine.push(currentline);
      }
    }

//console.log(stateLine);
       len= stateLine.length;
    //   console.log(len);

    for(var j=3;j<headers.length;j++)
     {
       cropObj ={};
       cropObj.Year= headers[j].substr(3,6);
      //cropObj[headers[j]. = currentline[j];

       for(k=0;k<len;k++){
         if(stateLine[k][j]== "NA"){
           stateLine[k][j]=0;
         }
         cropObj[stateLine[k][0].replace("Agricultural Production Foodgrains Rice Yield","").trim()]=stateLine[k][j];
        // console.log();

       }

       final.push(cropObj);
    }

  //  cropObj[headers[i].substr(3,6)]=0;
  }
   StateWise(csv.toString());
       fs.writeFile('Rice.json', JSON.stringify(final,null,4).replace(/[\\]/g, ''), function (err,data) {
          if (err) {
            return console.log(err);
          }
          console.log("Rice Production Json file created");
        });
