
var drawLines=function(promise,target,xScale,yScale){
  var lineGenerator=d3.line()
    .x(function (temp,i){return xScale(i);})
    .y(function(temp){return yScale(temp)})
  
    var lines=d3.select(target)
        .select(".graph")
        .selectAll("g")
        .data(promise)
        .enter()
        .append("g")
        .classed("line",true)
        .attr("fill",none)
    lines.append("path")
        .datum(function(promise){
        return promise[0].data.value })
        .attr("d",lineGenerator)
    

    
    
}


//setting up major stuff
var initgraph=function(promise){
//size of screen
    var screen={width:800,height:600}
//space on sides
    var margins={left:50,right:20,top:50,bottom:40}
var graph={
    width:screen.width-margins.left-margins.right,
    height:screen.height-margins.bottom-margins.top
}
console.log(graph)
    
d3.select("#US")
    .attr("width",screen.width)
    .attr("height",screen.height)
    
var target=d3.select("#US")
    .append("g")
    .classed("graph",true) .attr("transform","translate("+margins.left+","+margins.top+")");
    

var xScale=d3.scaleLinear()
    .domain([0,70])
    .range([0,graph.width])
var yScale=d3.scaleLinear()
    .domain([0,60])
    .range([graph.height,0])
    
    drawLines(promise,target,xScale,yScale);
    
    
    
    
}

//calling up data

var ustemppromise= d3.json("https://www.ncdc.noaa.gov/cag/national/time-series/110-tavg-1-10-1960-2016.json?base_prd=true&begbaseyear=1901&endbaseyear=2000");
var uscarbonpromsie=d3.csv("../data/fixeddata.csv")

var successFCN=function(promise){
  // console.log("Data collected", promise)
  
    initgraph(promise);
    var tempdata=promise[0];
    var carbondata=promise[1];
    console.table(tempdata);
}
var failFCN=function(errormMSG){
    console.log("OOPS", errorMSG)
}
var promises=[ustemppromise,uscarbonpromsie]
Promise.all(promises)
.then(successFCN,failFCN)