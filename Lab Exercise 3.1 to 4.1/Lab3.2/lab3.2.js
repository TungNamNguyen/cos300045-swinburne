function init()
{
var dataset = [ 
    [5, 20], 
    [480, 90],  
    [250, 50],  
    [100, 33], 
    [330, 95], 
    [410, 12],  
    [475, 44],  
    [25, 67],  
    [85, 21],  
    [220, 88] 
]; 

var w = 500;
var h = 500;
var padding = 35;
var xScale = d3.scaleLinear()
    .domain([d3.min(dataset, function(d){
        return d[0];
    }),
    d3.max(dataset, function(d){
        return d[0];
    })])
    .range([padding, w - padding])

var yScale = d3.scaleLinear()
    .domain([d3.max(dataset, function(d){
        return d[1];
    }),
    d3.min(dataset, function(d){
        return d[1];
    })])
    .range([padding, h - padding])
var radius = 3;
var xAxis = d3.axisBottom()
            .ticks(10)
            .scale(xScale);
var yAxis = d3.axisLeft ()
    .ticks(10)
    .scale(yScale);

var svg = d3.select ("body")
.append ("svg")
.attr ("width", w )
.attr ("height", h);
svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", function(d, i){
        return xScale(d[0]);
    })
    .attr("cy", function(d){
        return yScale(d[1]);
    })
.attr("r", radius )
.style ("fill", "red");
svg.selectAll("text")
.data(dataset)
.enter()
.append("text")
.attr("x", function(d){
    return xScale(d[0]);
})
.attr("y", function(d){
    return  yScale(d[1]);
})
.text(function(d)
{
return d[0] + "," + d[1];
})
.style("fill","blue")
.style("font-size","12px")
.style("text-decoration","underline");
svg.append("g")
    .attr("transform", "translate(0, " + (h - padding) + ")")
    .call(xAxis);
svg.append("g")
.attr("transform", "translate("+ padding+ ","+(0) +")")
    .call(yAxis);
}
window.onload = init;