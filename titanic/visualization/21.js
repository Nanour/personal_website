var sliderAge = 0;
var radioSex = 0;

$(document).ready(function() {
    getvalue21(sliderAge, radioSex);
  // Get value Onchange radio function.
  $('input:radio').change(function(){
    radioSex = $("form input[type='radio']:checked").val();
    getvalue21(sliderAge, radioSex);
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
            getvalue21(sliderAge, radioSex);
      });
});

function getvalue21(Age, Sex){
  draw21(Age, Sex);
}

function draw21(Age, Sex){
  d3.select("#draw21").remove();
var width = 230,
    height = 230;

var fill1 = d3.scale.category10();

var svg1 = d3.select("#middle1").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("id", "draw21");

var force1 = d3.layout.force()
    .gravity(.04)
    .distance(20)
    .charge(-4.4)
    .size([width, height]);

d3.json("21.json", function(error, json) {

  force1
      .nodes(json.nodes)
      .links(json.links)
      .start();

  var link = svg1.selectAll(".link")
      .data(json.links)
    .enter().append("line")
      .attr("class", "link");

  var node = svg1.selectAll(".node")
      .data(json.nodes)
    .enter().append("g")
      .attr("class", "node")
      .call(force1.drag);

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
      .style("fill", function(d) { return fill1(d.group); });

  force1.on("tick", function() { 
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