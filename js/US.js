var margins={left:50,right:50,top:50,bottom:40}
var graph={
    width:screen.width-margins.left-margins.right,
    height:screen.height-margins.bottom-margins.top
}
var drawLines=function(promise,target,xScale,yScale,yScale1){
  var lineGenerator=d3.line()
    .x(function (temp,i){return xScale(i);})
    .y(function(temp){return yScale(temp)})
  var lineGenerator1=d3.line()
    .x(function (carbon,i){return xScale(i);})
    .y(function(carbon){return yScale1(carbon)})

   var lines=d3.select("#US")
        .selectAll("g")
        .data(promise)
        .enter()
        .append("g")
        .classed("line",true)
        .attr("fill","none")
   .attr("transform","translate("+margins.left+","+margins.top+")");
    

   //call temp values 
  /* var tempdata=promise[0].data
   var values=[]
   for(item in tempdata)
   {values.push(tempdata[item].value)}
    console.log(values)*/
    var ustempdata=promise[0]
    var ustempgrab=function(name){
        return name.Anomaly
    }
    var values=ustempdata.map(ustempgrab)
    
    
//drawing tempdata line
    lines.append("path")
        .datum(values)
        .attr("d",lineGenerator)
        .attr("stroke","blue")
    
    
//calling carbon data
    console.log(promise[1])
    var carbondata=promise[1]
    var co2grab=function(name){
        return name.CO2
    }
    var co2data=carbondata.map(co2grab)
    console.log(co2data)
    
    
//drawing carbon data
    lines.append("path")
        .datum(co2data)
        .attr("d",lineGenerator1)
        .attr("stroke","red")
    

//calling years
    var yeargrab=function(name){
    return name.Year}
    var yeardata=carbondata.map(yeargrab)
    console.log(yeardata)
}

//creating axes
var createAxes=function(margins,graph,xScale1,yScale,yScale1){
    var xAxis=d3.axisBottom(xScale1);
    var ylAxis=d3.axisLeft(yScale);
    var yrAxis=d3.axisRight(yScale1);
    
    var axes=d3.select("#US")
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


//labels
var createLabels=function(margins,graph,screen){
    var labels=d3.select("#US")
        .append("g")
    labels.append("text")
        .text("U.S. Carbon Emissions vs Annual Average Temperature Over Time")
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
        .text("Temperature Anomaly (taken from data in Farenheit)")
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

//setting up major stuff
var initgraph=function(promise){
//size of screen
    var screen={width:800,height:600}
//space on sides
    var margins={left:50,right:75,top:50,bottom:40}
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
    
    var maxvalue=function(name){
        return d3.max(name)
    }
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
        .domain([0,6000000])
        .range([graph.height,0])
    
    drawLines(promise,target,xScale,yScale,yScale1);
    createAxes(margins,graph,xScale1,yScale,yScale1);
    createLabels(margins,graph,screen);
    
    
}

//calling up data

var ustemppromise= d3.csv("data/annual_ustemp.csv");
var uscarbonpromise=d3.csv("data/fixeddata.csv")

var successFCN=function(promise){
  // console.log("Data collected", promise)
  
    initgraph(promise);
    var tempdata=promise[0];
    var carbondata=promise[1];
    console.log(promise);
}
var failFCN=function(errorMSG){
    console.log("OOPS", errorMSG)
}
var promises=[ustemppromise,uscarbonpromise]
Promise.all(promises)
.then(successFCN,failFCN)