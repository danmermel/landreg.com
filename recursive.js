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
