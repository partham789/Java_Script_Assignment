
 var margin ={top:90, right:40, bottom:130, left:30},
 width=1300-margin.left - margin.right,
 height=600-margin.top-margin.bottom;

 var x = d3.scale.ordinal().rangeRoundBands([0, width], .5);
 var y = d3.scale.linear().range([height, 0]);
 var chart = d3.select("#chart")

   .append("svg")  //append svg element inside #chart
   .attr("width", width+(2*margin.left)+margin.right)    //set width
   .attr("height", height+margin.top+margin.bottom);  //set height

 var xAxis = d3.svg.axis()
   .scale(x)
   .orient("bottom");

 var yAxis = d3.svg.axis()
   .scale(y)
   .orient("left");

 d3.json("Comm.json", function(error, data){
// data.sort(function(a,b) {return (parseFloat(b.Total)-parseFloat(a.Total));});
// console.log(data);

 var pxAboveBar = 5;
 var ymax = d3.max(d3.values(data));
   x.domain(data.map(function(d){ return d.Year}));
   y.domain([0,460]);

//  var cmp = d3.comparator().order(d3.descending, function(d) { return d.Total; })


//console.log(parseFloat(b.Total));
//console.log(data);
//function cmp(b, a) { return d3.descending(b.Total, a.Total); }

 var bar = chart.selectAll("g")
   .data(data)
   .enter()
   .append("g")
   .attr("transform", function(d, i){
 return "translate("+x(d.Year)+", 0)";
});


 bar.append("rect")
   .attr("y", function(d) {
 return y(d.Total);
})
   .attr("x", function(d,i){
 return x.rangeBand();
})
   .attr("height", function(d) {
 return height - y(d.Total);
})
   .attr("width", x.rangeBand(10));


//Appending text value above the bar

 bar.append("text")
   .attr("x", x.rangeBand() + (x.rangeBand()/5.5) )
   .attr("y", function(d) { return y(d.Total) - pxAboveBar  ; })
   .attr("dy", ".10em")
   .text(function(d) { return d.Total; });


  chart.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate("+margin.left+","+ height+")")
    .call(xAxis)
    .selectAll("text")
    .attr("transform", "rotate(-40)")
    .attr("dx", "-.15em")
    .attr("dy", "-.20em")
    .style("text-anchor", "end");


  chart.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate("+margin.left+",0)")
    //.attr("transform", "translate("+margin.top+",0)")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".51em")
    .style("text-anchor", "end")
    .text("Commercial Crops");

});
