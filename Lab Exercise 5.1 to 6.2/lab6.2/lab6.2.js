var w = 500;
var h = 500;
var padding = 10;
var dataset = [6,75,24,34];
var xScale = d3.scaleBand()
                .domain (d3.range(dataset.length))
                .rangeRound([0,w])
                .paddingInner(0.05);
var yScale = d3.scaleBand()
            .domain (d3.range(0,d3.max(dataset)+1))
            .range([0,h])
            
              
var svg = d3.select ("body")
            .append ("svg")
            .attr ("width", w )
            .attr ("height", h);

svg.selectAll("rect")
.data(dataset)
.enter()
.append("rect")
.attr("x",function (d,i)
{return xScale(i) }
)
.attr("y", function (d)
{
    //return h- (yScale(d)*h)
    return h - yScale(d)
})
.attr("width", xScale.bandwidth())
.attr("height", function(d)
{
    return (yScale(d));
})
.style("fill","grey")
//.on("mouseover", function()
//{
   //d3.select(this)
   //.style("fill","red")

//})

//.on("mouseout", function()
//{
   // d3.select(this)
    //.style("fill","grey")
//})
//.append("title")
//.text(function(d)
//{
//    return "The value is " + d;
//})
.on("mouseover", function(event, d) //mouseover effect
{
    var xPosition = parseFloat(d3.select(this).attr("x"))
    var yPosition = parseFloat(d3.select(this).attr("y"))
    svg.append("text")
    .attr("id", "tooltip")
    .attr("x",xPosition + xScale.bandwidth()/2)
    .attr("y",yPosition + 25 )
    .text(d)
    .style("fill","white")
    d3.select(this)
    .style("fill","red")
})
.on("mouseout",function(d) //return to normal when mouse is not over
{
    d3.select("#tooltip").remove();
    d3.select(this)
    .style("fill","grey")
});
// This sort function in the tutorial did not work
//d3.select("#sort")
  //.on("click",function(){
    //sortBars();
 //});
//var sortBars = function(){
 //svg.selectAll("rect")
     //   .sort(function(a, b)
       // {
       //    return d3.ascending(a,b);
       // })
       // .attr("x", function(d,i)
        //{
       //     return xScale(i)
       // })
//};
var sortOrder = false 
function Sort() // I have to create function to sort and this function is run when I click the button
{
 sortOrder = !sortOrder

 svg.selectAll("rect")
        .sort(function(a, b)
        {
            if (sortOrder) {
           return d3.ascending(a,b);}
           else {return d3.descending(a, b)}
        })
        .transition()
        .duration(1000)
        .attr("x", function(d,i)
        {
            return xScale(i)
        })
      
};


// button add
function Add() {
var maxValue = 75;

    var newNumber = Math.floor(Math.random() * maxValue);
    dataset.push(newNumber);
    xScale.domain(d3.range(dataset.length));
    var bars = svg.selectAll("rect")
                .data(dataset)
               
    bars.enter()
        .append("rect")
        .merge(bars)
        .transition()
        .duration(500)
        .attr("x",function (d,i)
    {return xScale(i) }
    )
    .attr("y", function (d)
    {
    //return h- (yScale(d)*h)
    return h - yScale(d)
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function(d)
    {
        return (yScale(d));
    })
    .style("fill","grey")

   svg.selectAll("rect")
  // .on("mouseover", function()
//{
   //d3.select(this)
   //.style("fill","red")

//})

//.on("mouseout", function()
//{
   // d3.select(this)
  //  .style("fill","grey")
//})
//.append("title")
//.text(function(d)
//{
  //  return "The value is " + d;
//})
.on("mouseover", function(event, d) //mouse over for added element
{
    var xPosition = parseFloat(d3.select(this).attr("x"))
    var yPosition = parseFloat(d3.select(this).attr("y"))
    svg.append("text")
    .attr("id", "tooltip")
    .attr("x",xPosition + xScale.bandwidth()/2)
    .attr("y",yPosition + 25 )
    .text(d)
    .style("fill","white")
    d3.select(this)
    .style("fill","red")
})
.on("mouseout",function(d)
{
    d3.select("#tooltip").remove();
    d3.select(this)
    .style("fill","grey")
})

}
function Remove()
{
    dataset.shift();
    var bars = svg.selectAll("rect")
        .data(dataset)
    bars.exit()
    .transition()
    .duration(500)
    .attr("x",w)
    .remove()
    
}