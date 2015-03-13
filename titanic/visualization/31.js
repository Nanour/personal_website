var sliderAge = 0;
var radioSex = 0;

$(document).ready(function() {
    getvalue31(sliderAge, radioSex);
  // Get value Onchange radio function.
  $('input:radio').change(function(){
    radioSex = $("form input[type='radio']:checked").val();
    getvalue31(sliderAge, radioSex);
  });

  $("[data-slider]")
      .each(function () {
        var input = $(this);
        $("<span>")
          .addClass("output")
          .insertAfter($(this));
      })
      .bind("slider:ready slider:changed", function (event, data) {
        $(this)
          .nextAll(".output:first")
            .html(data.value.toFixed(0));
            sliderAge = data.value;
            getvalue31(sliderAge, radioSex);
      });
});

function getvalue31(Age, Sex){
  draw31(Age, Sex);
}

function draw31(Age, Sex){
  d3.select("#draw31").remove();

var width = 225,
    height = 225;

var fill = d3.scale.category10();

var svg = d3.select("#lower1").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("id", "draw31");

var force = d3.layout.force()
    .gravity(.04)
    .distance(20)
    .charge(-4.4)
    .size([width, height]);

d3.json("31.json", function(error, json) {

  force
      .nodes(json.nodes)
      .links(json.links)
      .start();

  var link = svg.selectAll(".link")
      .data(json.links)
    .enter().append("line")
      .attr("class", "link");

  var node = svg.selectAll(".node")
      .data(json.nodes)
    .enter().append("g")
      .attr("class", "node")
      .call(force.drag);

  node.append("circle")
      .attr("class", "node")
      .attr("r", function(d) {

      if(Sex == 0){
        if(d.value > Age)
        return (Math.sqrt(d.value)+2)/2;
      else
        return 0;
      }
      else{
        if(d.value > Age && d.group == Sex)
          return (Math.sqrt(d.value)+2)/2;
        else
          return 0;
      }
      })
      .style("fill", function(d) { return fill(d.group); });

  force.on("tick", function() { 
    link.attr("x1", function(d) { 

        return d.source.x; 
         })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; })
        .attr('stroke-width',function(d) {

                return (Math.log(d.value)+1)/2;

        });

    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  });
});
}