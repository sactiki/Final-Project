d3.select("#usbutton")
    .on("click",function(){
    d3.select("#americandata")
        .classed("americanhidden",false)
    d3.select("#aussiedata").classed("aussiehidden",true)
    d3.select("#overalldata").classed("overallhidden",true)
       d3.select("#finaldata").classed("finalhidden",true)
})

d3.select("#abutton")
    .on("click",function(){
    d3.select("#aussiedata").classed("aussiehidden",false)
    d3.select("#americandata").classed("americanhidden",true)
    d3.select("#overalldata").classed("overallhidden",true)
    d3.select("#finaldata").classed("finalhidden",true)
})

d3.select("#bothbutton")
    .on("click",function(){
    d3.select("#aussiedata").classed("aussiehidden",false)
    d3.select("#americandata").classed("americanhidden",false)
    d3.select("#overalldata").classed("overallhidden",true)
       d3.select("#finaldata").classed("finalhidden",false)
})

d3.select("#overallbutton")
    .on("click",function(){
    d3.select("#aussiedata").classed("aussiehidden",true)
    d3.select("#americandata").classed("americanhidden",true)
    d3.select("#overalldata").classed("overallhidden",false)
       d3.select("#finaldata").classed("finalhidden",true)
})
