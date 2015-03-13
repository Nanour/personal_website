var sliderAge = 0;
var radioSex = 0;

$(document).ready(function() {
    getvalue11(sliderAge, radioSex);
  // Get value Onchange radio function.
  $('input:radio').change(function(){
    radioSex = $("form input[type='radio']:checked").val();
    getvalue11(sliderAge, radioSex);
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
            getvalue11(sliderAge, radioSex);
      });
});

function getvalue11(Age, Sex){
  draw11(Age, Sex);
}

function draw11(Age, Sex){

  d3.select("#draw11").remove();

var width = 230,
    height = 230;

var fill2 = d3.scale.category10();

var svg2 = d3.select("#upper1").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("id", "draw11");

var force2 = d3.layout.force()
    .gravity(.04)
    .distance(20)
    .charge(-3.2)
    .size([width, height]);

d3.json("11.json", function(error, json) {

  force2
      .nodes(json.nodes)
      .links(json.links)
      .start();

  var link = svg2.selectAll(".link")
      .data(json.links)
    .enter().append("line")
      .attr("class", "link");

  var node = svg2.selectAll(".node")
      .data(json.nodes)
    .enter().append("g")
      .attr("class", "node")
      .call(force2.drag);

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
      .style("fill", function(d) { return fill2(d.group); });

  force2.on("tick", function() { 
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