function init()
{
    var w = 500;
    var h = 100;
    var barpadding = 1;
    function barChart(wombatSighting)
    {
    
    svg.selectAll("rect")
    .data(wombatSighting)
    .enter()
    .append("rect")
    .attr("x",function (d,i)
    {return i * (w/wombatSighting.length); }
    )
    .attr("y", function (d)
    {
        return h- (d.wombats*4);
    })
    .attr("width", (w/wombatSighting.length)-barpadding)
    .attr("height", function(d)
    {
        return d.wombats * 4;
    })
    .attr 
    .style("fill", function(d)
    {
        if (d.wombats >= 30)
        {
            return "red";
        }
        else 
        {
            return "blue"
        }
    })
    
    }
    var svg = d3.select ("#chart")
                .append ("svg")
                .attr ("width", w )
                .attr ("height", h);
    d3.csv("lab2.4.csv").then(function(data)
    {
        console.log(data);
        wombatSighting = data;
        barChart(wombatSighting);
    });
  
    
}
window.onload = init;