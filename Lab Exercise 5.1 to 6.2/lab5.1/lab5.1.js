function init()   {   
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
            .style("fill", function(d){
                return "rgb("+ Math.round(d * 10) + ",0," + Math.round(d * 10) + ")"; //Change the color of the bar depending on the value
            });

            // button
            d3.select("button")
            .on("click", function() {
            var maxValue = 75;
            var numValues = dataset.length;
            
            while (dataset.length > 0) { 
                dataset.pop();
            }
            for (var i = 0; i < numValues;i++)
            {
                var newNumber = Math.floor(Math.random() * maxValue);
                dataset.push(newNumber);

            }
            svg.selectAll("rect")
            .data(dataset)
            .transition()
            .duration(3000)
            .attr("y", function(d){return h - yScale(d);})
            .attr("height", function(d){return yScale(d);})
            .attr("fill", function(d) {
                return "rgb("+ Math.round(d * 10) + ",0," + Math.round(d * 10) + ")"; });
           
            svg.selectAll("text")
                .data(dataset)
                .transition()
                .duration(3000)
                .attr("x", function (d,i) {return xScale(i) + xScale.bandwidth()/2 }
                )
                .attr("y", function (d) {return h - yScale(d) + 20})
                .text(function(d){return d})
                .style("fill", "red")
            });

            svg.selectAll("text")
            .data(dataset)
            .enter()
            .append("text")
            .attr("x", function (d,i) {return xScale(i) + xScale.bandwidth()/2 }
            )
            .attr("y", function (d) {return h - yScale(d) + 20})
            .text(function(d){return d})
            .style("fill", "red")
            
            

        }
window.onload = init           
            