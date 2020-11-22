var margins={left:50,right:20,top:50,bottom:40}
var graph={
    width:screen.width-margins.left-margins.right,
    height:screen.height-margins.bottom-margins.top}
var drawLines2=function(promise,target,xScale,yScale,yScale1){
    var lineGenerator=d3.line()
    .x(function (temp,i){return xScale(i);})
    .y(function(temp){return yScale(temp)})
  var lineGenerator1=d3.line()
    .x(function (carbon,i){return xScale(i);})
    .y(function(carbon){return yScale1(carbon)})

   var lines=d3.select("#aussie")
        .selectAll("g")
        .data(promise)
        .enter()
        .append("g")
        .classed("line",true)
        .attr("fill","none")
   .attr("transform","translate("+margins.left+","+margins.top+")");
    
//call aussie tempdata
    var atempdata=promise[1]
    var atempgrab=function(name){
        return name.anom
    }
    var aussieanom=atempdata.map(atempgrab)
    
//draw aussie anom line
    lines.append("path")
        .datum(aussieanom)
        .attr("d",lineGenerator)
        .attr("stroke","blue")

//call aussie carbon data
    var acarbdata=promise[0]
    var acarbgrab=function(name){
        return name.co2data
    }
    var aco2data=acarbdata.map(acarbgrab)
//draw aussie carbon line
    lines.append("path")
        .datum(aco2data)
        .attr("d",lineGenerator1)
        .attr("stroke","red")
    
}


//create axis
var createAxes1=function(margins,graph,xScale1,yScale,yScale1){
    var xAxis=d3.axisBottom(xScale1);
    var ylAxis=d3.axisLeft(yScale);
    var yrAxis=d3.axisRight(yScale1);
    
    var axes=d3.select("#aussie")
        .append("g")
    axes.append("g")
        .attr("transform","translate("+margins.left+","+(margins.top+graph.height)+")")
        .call(xAxis)
    axes.append("g")
        .attr("transform","translate("+margins.left+","+(margins.top)+")")
        .call(ylAxis)
    axes.append("g")
        .attr("transform","translate("+(margins.left+graph.width)+","+(margins.top)+")")
        .call(yrAxis)
    
    
}

//create labels
var createLabels1=function(margins,graph,screen){
    var labels=d3.select("#aussie")
        .append("g")
    labels.append("text")
        .text("Australian Carbon Emissions vs Annual Average Temperature Over Time")
        .classed("title",true)
        .attr("text-anchor","middle")
        .attr("x",margins.left+(graph.width/2))
        .attr("y",margins.top)
    
    labels.append("text")
        .text("Year (from 1960 to 2016)")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("x",margins.left+(graph.width/2))
        .attr("y",screen.height)
    labels.append("g")
        .attr("transform","translate(20,"+(margins.top+(graph.height/2))+")")
        .append("text")
        .text("Temperature Anomaly (taken from data in Celsius)")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("transform","rotate(270)")
    labels.append("g")
        .attr("transform","translate("+(margins.left+graph.width+60)+","+(margins.top+(graph.height/2))+")")
        .append("text")
        .text("CO2 Emissions in kilotonnes")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("transform","rotate(90)")
}


var initgraph2=function(promise){
//size of screen
    var screen={width:800,height:600}
//space on sides
    var margins={left:50,right:75,top:50,bottom:40}
var graph={
    width:screen.width-margins.left-margins.right,
    height:screen.height-margins.bottom-margins.top
}
console.log(graph)
    
d3.select("#aussie")
    .attr("width",screen.width)
    .attr("height",screen.height)
    
    var target=d3.select("#aussie")
    .append("g")
    .classed("graph",true) .attr("transform","translate("+margins.left+","+margins.top+")");

    var xScale=d3.scaleLinear()
    .domain([0,57])
    .range([0,graph.width])
    var xScale1=d3.scaleLinear()
        .domain([1960,2016])
        .range([0,graph.width])
    var yScale=d3.scaleLinear()
    .domain([-1,3])
    .range([graph.height,0])
    var yScale1=d3.scaleLinear()
        .domain([0,600000])
        .range([graph.height,0])
    
    drawLines2(promise,target,xScale,yScale,yScale1);
    createAxes1(margins,graph,xScale1,yScale,yScale1);
    createLabels1(margins,graph,screen);
    
    
}


//Promises
var aussietemppromise=d3.csv("../data/aussietemp.csv")
var aussiecarbpromise=d3.csv("../data/aussiecarbondata.csv")
var successFCN2=function(promise){
    console.log("yay aussies", promise)
    initgraph2(promise)
}
var failFCN2=function(errorMSG){
    console.log("sorry aussie", errorMSG)
}
var promises=[aussiecarbpromise,aussietemppromise]
Promise.all(promises)
    .then(successFCN2,successFCN2)