var margins={left:50,right:20,top:50,bottom:40}
var graph={
    width:screen.width-margins.left-margins.right,
    height:screen.height-margins.bottom-margins.top
}


//setting up lines
var drawLines1=function(promise,target,xScale,yScale,yScale1){
    var lineGenerator=d3.line()
    .x(function (temp,i){return xScale(i);})
    .y(function(temp){return yScale(temp)})
  var lineGenerator1=d3.line()
    .x(function (carbon,i){return xScale(i);})
    .y(function(carbon){return yScale1(carbon)})
    
    var lines=d3.select("#overall")
        .selectAll("g")
        .data(promise)
        .enter()
        .append("g")
        .classed("overall_lines",true)
        .attr("fill","none")
        .attr("transform","translate("+margins.left+","+margins.top+")");
    
    
//call temp data
    var tempdata=(promise[1])
    var grabanom=function(name){
        return name.Value
    }
    var anomtemp=tempdata.map(grabanom)
    console.log(anomtemp)
    
//call anomtemp line
    lines.append("path")
        .datum(anomtemp)
        .attr("d",lineGenerator)
        .attr("stroke","blue")
    
//call carbon data
   var carbdata=(promise[0])
    var co2grab=function(name){
        return name.Mean
    }
    var co2avg=carbdata.map(co2grab)
    
//call carbon line
    lines.append("path")
        .datum(co2avg)
        .attr("d",lineGenerator1)
        .attr("stroke","red")
    
}

//create axis
var createAxes2=function(margins,graph,xScale1,yScale,yScale1){
    var xAxis=d3.axisBottom(xScale1);
    var ylAxis=d3.axisLeft(yScale);
    var yrAxis=d3.axisRight(yScale1);
    
    var axes=d3.select("#overall")
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
//create labels
var createLabels2=function(margins,graph,screen){
    var labels=d3.select("#overall")
        .append("g")
    labels.append("text")
        .text("Global Carbon Concentration vs Temperature Anomaly")
        .classed("title",true)
        .attr("text-anchor","middle")
        .attr("x",margins.left+(graph.width/2))
        .attr("y",margins.top)
    
    labels.append("text")
        .text("Year (from 1980 to 2017)")
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
        .attr("transform","translate("+(margins.left+graph.width+45)+","+(margins.top+(graph.height/2))+")")
        .append("text")
        .text("Concentration of CO2 in the Atmosphere (parts per million)")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("transform","rotate(90)")
}



//setting up major stuff
var initgraph1=function(promise){
//size of screen
    var screen={width:800,height:600}
//space on sides
    var margins={left:50,right:70,top:50,bottom:40}
var graph={
    width:screen.width-margins.left-margins.right,
    height:screen.height-margins.bottom-margins.top
}
console.log(graph)
    
d3.select("#overall")
    .attr("width",screen.width)
    .attr("height",screen.height)
    
    var target=d3.select("#overall")
    .append("g")
    .classed("graph",true) .attr("transform","translate("+margins.left+","+margins.top+")");

    var xScale=d3.scaleLinear()
    .domain([0,37])
    .range([0,graph.width])
    var xScale1=d3.scaleLinear()
        .domain([1980,2017])
        .range([0,graph.width])
    var yScale=d3.scaleLinear()
    .domain([0,1.5])
    .range([graph.height,0])
    var yScale1=d3.scaleLinear()
        .domain([300,420])
        .range([graph.height,0])
    
    drawLines1(promise,target,xScale,yScale,yScale1);
    createAxes2(margins,graph,xScale1,yScale,yScale1);
    createLabels2(margins,graph,screen);
    
    
    
}


//Setting up promises
var gltemppromise=d3.csv("../data/gl_temp_data.csv");
var glcarbonpromise=d3.csv("../data/co2-annmean-gl_csv.csv")
var successFCN1=function(promise){
    console.log("global data collected", promise)
    initgraph1(promise);
    
}
var failFCN1=function(errorMSG){
    console.log("oops",errorMSG)
}
var promises=[glcarbonpromise,gltemppromise]
Promise.all(promises)
    .then(successFCN1,failFCN1)