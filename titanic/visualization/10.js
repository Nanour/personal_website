var sliderAge = 0;
var radioSex = 0;

$(document).ready(function() {
    getvalue10(sliderAge, radioSex);
  // Get value Onchange radio function.
  $('input:radio').change(function(){
    radioSex = $("form input[type='radio']:checked").val();
    getvalue10(sliderAge, radioSex);
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
            getvalue10(sliderAge, radioSex);
      });
});

function getvalue10(Age, Sex){
  draw10(Age, Sex);
}

function draw10(Age, Sex){
  d3.select("#draw10").remove();

  var width = 230,
      height = 230;

var fill5 = d3.scale.category10();

var svg5 = d3.select("#upper0").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("id", "draw10");
    
var force5 = d3.layout.force()
    .gravity(.04)
    .distance(10)
    .charge(-5.7)
    .size([width, height]);

d3.json("10.json", function(error, json) {

  force5
      .nodes(json.nodes)
      .links(json.links)
      .start();

  var link = svg5.selectAll(".link")
      .data(json.links)
    .enter().append("line")
      .attr("class", "link");

  var node = svg5.selectAll(".node")
      .data(json.nodes)
    .enter().append("g")
      .attr("class", "node")
      .call(force5.drag);

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
      .style("fill", function(d) { return fill5(d.group); });

  force5.on("tick", function() { 
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