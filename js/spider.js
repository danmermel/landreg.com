var graph = {
  nodes: [],
  links: []
};

var deedExists = function(deedid) {
  for (var i in graph.nodes) {
    if (graph.nodes[i].id === deedid) {
      return true
    }
  }
  return false;
}

var getDeed = function(deedid, depth) {
  if (depth == 15) {
    return;
  }
  console.log('fetching deed id', deedid);

  if (!deedExists(deedid)) {
    graph.nodes.push({ id: deedid });
  } else {
    return;
  }

  var d = web3.eth.contract(deedAbi).at(deedid);
  d.numNextDeeds(function(err, data) {
    if (err) {
      return
    }
    
    var numNextDeeds = parseInt(data.toString());
    console.log(deedid, 'num next deeds', numNextDeeds);
    if (numNextDeeds > 0) {
      
      for (var i=0 ; i< numNextDeeds ; i++) {
        d.nextDeeds(i, function(err, data) {
          if (err) {
            console.log('error', err);
            return;
          }
          console.log(deedid, 'Found next deed', data.toString());
          if (data.toString() != '0x0000000000000000000000000000000000000000') {
            graph.links.push({ source: deedid, target: data.toString()});
            getDeed(data.toString(), depth+1);
          }
        });
      }

    }
  });

  d.numPreviousDeeds(function(err, data) {
    if (err) {
      return
    }
    var numPreviousDeeds = parseInt(data.toString());
    console.log(deedid, 'num previous deeds', numPreviousDeeds);
    if (numPreviousDeeds > 0) {
      for (var i=0 ; i< numPreviousDeeds ; i++) {
        d.previousDeeds(i, function(err, data) {
          if (err) {
            console.log('error', err);
            return;
          }
          console.log(deedid, 'Found previous deed', data.toString());
          if (data.toString() != '0x0000000000000000000000000000000000000000') {
            graph.links.push({ source: deedid, target: data.toString()});
            getDeed(data.toString(), depth+1);
          }
        });
      }
    }
  });
};

/* 
var drawD3 = function() {

var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");
 
var simulation = d3.forceSimulation()
    .force("charge", d3.forceManyBody().strength(-200))
    .force("link", d3.forceLink().id(function(d) { return d.id; }).distance(40))
    .force("x", d3.forceX(width / 2))
    .force("y", d3.forceY(height / 2))
    .on("tick", ticked);

var link = svg.selectAll(".link"),
    node = svg.selectAll(".node");
  
  simulation.nodes(graph.nodes);
  simulation.force("link").links(graph.links);
  link = link
    .data(graph.links)
    .enter().append("line")
      .attr("class", "link");
  node = node
    .data(graph.nodes)
      .enter().append("a")
      .attr("xlink:href", function(d){return "index.html?"+d.id})
      .append("text")
      .text(function(d){return d.id.substring(2,6)});
//      .append("circle")
//      .attr("class", "node")
//      .attr("r", 6)
//      .style("fill", function(d) { return d.id; });

function ticked() {
  link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });
  node.attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; });
}

}
*/
