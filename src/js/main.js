var addPattern = function(id, imgurl) {
    var pattern = defs.append("pattern")
            .attr("id", id)
            .attr("height", 1)
            .attr("width", 1)
            .attr("x", "0")
            .attr("y", "0");

    pattern.append("image")
            .attr("x", 0)
            .attr("y", 0)
            .attr("height", 140)
            .attr("width", 140)
            .attr("xlink:href", imgurl)
};

var diameter = 1500,
        format = d3.format(",d");

var pack = d3.layout.pack()
        .size([diameter - 4, diameter - 4])
        .radius(70)
        .padding(50)

var svg = d3.select("body").append("svg")
        .attr("width", diameter)
        .attr("height", diameter)
        .append("g")
//            .attr("transform", "translate(2,2)");

var defs = svg.append("defs").attr("id", "imgdefs")

d3.json("../src/data/characters.json", function(root) {

    var node = svg.datum(root).selectAll(".node").data(pack.nodes);

    var nodeEnter = node.enter().append("g")
            .filter(function(d) { return !d.spacer })
            .filter(function(d) { addPattern(d.id, d.url); return d.name })
            .attr("class", function(d) {return d.children ? "node parent" : "leaf node"; })
            .attr("transform", function(d) {return "translate(" + d.x + "," + d.y + ")"; });

    nodeEnter.append("title")
            .text(function(d) { return d.name; });

    nodeEnter.append("circle")
            .attr("r", function(d) {return d.r; })
            .attr("fill", function(d) {return "url(#" + d.id + ")";});

    nodeEnter.filter(function(d) { return !d.children; }).append("text")
            .attr("dy", "90px")
            .style("text-anchor", "middle")
            .text(function(d) { return d.name.substring(0, d.r / 3); });


});

d3.select(self.frameElement).style("height", diameter + "px");
