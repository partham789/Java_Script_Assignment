var fs=require("fs");
var csv = fs.readFileSync("../mine.csv");

yearObj ={"year1993":"year","year1994":"year","year1995":"year","year1996":"year","year1997":"year",
"year1998":"year","year1999":"year","year2000":"year","year2001":"year","year2002":"year","year2003":"year",
"year2004":"year","year2005":"year","year2006":"year","year2007":"year","year2008":"year","year2009":"year",
"year2010":"year","year2011":"year","year2012":"year","year2013":"year","year2014":"year"}

finalObj ={};

function csvJSON(csv){

  var lines=csv.split("\n");
  var headers=lines[0].split(",");
  for(var i=1;i<lines.length;i++){
    lines[i]=lines[i].replace("Annual,","Annual ");

     currentline=lines[i].split(",");
     var state ={"Karnataka":0,"Andhra Pradesh":0,"Tamil Nadu":0,"Kerala":0};

    var currentState = currentline[0].replace("Agricultural Production Foodgrains Rice Yield","").trim();
    //console.log(currentState);
    // data ={};
    // data.TamilNadu =0;
    // data.Kerala =0;
    // data.Karnataka =0;
    // data.AndhraPradesh =0;
    for(var j=3;j<headers.length;j++)
    {
    if(currentline[j].indexOf("NA")!=-1){
       currentline[j]=0;
    }
    if(currentState in state){
      if(finalObj[yearObj[j]] == undefined){
        state.TamilNadu = parseFloat(currentline[i]);
        state.Karnataka = parseFloat(currentline[i]);
        state.Kerala = parseFloat(currentline[i]);
        state.AndhraPradesh = parseFloat(currentline[i]);
        finalObj[yearObj[j]] =state;
      }else{
        finalObj[yearObj[j]].TamilNadu += parseFloat(currentline[i]);
        finalObj[yearObj[j]].Karnataka += parseFloat(currentline[i]);
        finalObj[yearObj[j]].Kerala += parseFloat(currentline[i]);
        finalObj[yearObj[j]].AndhraPradesh += parseFloat(currentline[i]);

      }
      //console.log("hello");
      console.log(finalObj);
     }
    }
 }
}
csvJSON(csv.toString());

csvJSON(csv.toString());
    fs.writeFile('agri.json', JSON.stringify(finalObj,null,4).replace(/[\\]/g, ''), function (err,data) {
       if (err) {
         return console.log(err);
       }
       console.log("Rice Production Json file created");
     });
