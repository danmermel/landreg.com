     // address of the contract on testnet
      var addr = '0xec1a21b4079ac5ede878c829ea0174b12e74166b';
      var landreg = null;
      var deedid = null;
      var owner = null;
      //address of contract on live net
      //var addr ='';

      // abi definition
      var deedAbi = [{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"nextDeeds","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_child","type":"address"}],"name":"addChild","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"status","outputs":[{"name":"","type":"uint8"}],"type":"function"},{"constant":true,"inputs":[],"name":"provisional_time","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"commit","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_newDeed","type":"address"}],"name":"transferSingle","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"claim_hash","outputs":[{"name":"","type":"bytes32"}],"type":"function"},{"constant":true,"inputs":[],"name":"numPreviousDeeds","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"expire","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"registry","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_url","type":"bytes32"},{"name":"_hash","type":"bytes32"}],"name":"configure_deed","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_parent","type":"address"}],"name":"addParent","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"numNextDeeds","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"previousDeeds","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"url_to_claim","outputs":[{"name":"","type":"bytes32"}],"type":"function"},{"constant":true,"inputs":[],"name":"dead_time","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"live_time","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"inputs":[{"name":"_previousDeed","type":"address"},{"name":"_owner","type":"address"}],"type":"constructor"}] ;
      var abi = [{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"theRegister","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"deedCount","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_existing_deedid","type":"address"},{"name":"_newowner","type":"address"}],"name":"transferSingle","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_existing_deedid","type":"address"},{"name":"_url1","type":"bytes32"},{"name":"_url2","type":"bytes32"},{"name":"_hash1","type":"bytes32"},{"name":"_hash2","type":"bytes32"}],"name":"split","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_existing_deedid1","type":"address"},{"name":"_existing_deedid2","type":"address"},{"name":"_url","type":"bytes32"},{"name":"_hash","type":"bytes32"}],"name":"join","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_url","type":"bytes32"},{"name":"_hash","type":"bytes32"}],"name":"createDeed","outputs":[],"type":"function"},{"inputs":[],"type":"constructor"}] ;


      
      var lottereo = null;
      
      function reveal(){
        $('#play').removeClass('hide');
      }
      
    function hex_to_ascii(str1) {  
      var hex  = str1.toString();  
      var str = '';  
      for (var n = 0; n < hex.length; n += 2) {  
          str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));  
      }  
      return str;  
   };

   var createDeed = function() {
     console.log("create deed");

     var url = $('#cd_url').val();
     var hash = $('#cd_hash').val();
     if (url.length == 0) {
       Materialize.toast('URL cannot be blank', 4000);
       return false;
     }
     if (url.length > 32) {
       Materialize.toast('URL length cannot exceed 31 characters', 4000);
       return false;
     }
     if (hash.length == 0) {
       Materialize.toast('Hash cannot be blank', 4000);
       return false;
     }
     if (hash.length > 32) {
       Materialize.toast('Hash length cannot exceed 31 characters', 4000);
       return false;
     }

     landreg.createDeed(url, hash, {from: web3.eth.accounts[0], gas: 3000000}, function(err, data) {
       if (err){
         Materialize.toast('Cannot create deed', 4000);
         return false;
       };

       console.log('createDeed callback', err, data);
     });
 
     return false;
   }


   var transferSingle = function() {
     console.log("transfer single");

     var newowner = $('#ts_new_owner').val();
     if (newowner.length == 0) {
       Materialize.toast('New owner cannot be blank', 4000);
       return false;
     }

     landreg.transferSingle(deedid, newowner, {from: owner, gas: 3000000}, function(err, data) {
       if (err){
         Materialize.toast('You cannot transfer this deed. It does not belong to you', 4000);
         return false;
       };

       console.log('transfer single callback', err, data);
     });
 
     return false;
   }

   var split = function() {
     console.log("Split");

     var new_url1 = $('#sp_new_url1').val();
     var new_url2 = $('#sp_new_url2').val();
     var new_hash1 = $('#sp_new_hash1').val();
     var new_hash2 = $('#sp_new_hash2').val();   

     if (new_url1.length == 0 || new_url2.length == 0 || new_hash1.length == 0 || new_hash2.length == 0) {
       Materialize.toast('Please ensure all values are entered', 4000);
       return false;
     }

     landreg.split(deedid, new_url1, new_url2, new_hash1, new_hash2, {from: owner, gas: 3000000}, function(err, data) {
       if (err){
         Materialize.toast('You cannot split this deed. It does not belong to you', 4000);
         return false;
       };
       console.log('Split callback', err, data);
     });
 
     return false;
   }

   var join = function() {
     console.log("Join");
     

     var deed1 = $('#jo_deed1').val();
     var deed2 = $('#jo_deed2').val();
     var new_url = $('#jo_new_url').val();
     var new_hash = $('#jo_new_hash').val();   

     if (deed1.length == 0 || deed2.length == 0 || new_url.length == 0 || new_hash.length == 0) {
       Materialize.toast('Please ensure all values are entered', 4000);
       return false;
     }

     landreg.join(deed1, deed2,  new_url, new_hash, {from: owner, gas: 3000000}, function(err, data) {
       if (err){
         Materialize.toast('You cannot join these deeds. You must own both to do this', 4000);
         return false;
       };
       console.log('Join callback', err, data);
     });
 
     return false;
   }

      var init = function() {
        if (typeof web3 === 'undefined') {
          $('#livecontainer').hide();
          $('#deadcontainer').removeClass('hide');
          return;
        }
        
        landreg = web3.eth.contract(abi).at(addr);
        deedid = window.location.search.replace(/^\?/,'');
        if (deedid == "") {
          landreg.theRegister(0,function(err,data) {
            deedid = data.toString();
            getDeed(deedid,0);
            render_deed(data);
            console.log(data);
            reveal();
          });
        }    //if
        else {
          reveal();
          render_deed(deedid);
          getDeed(deedid,0);
        };

         setTimeout(drawD3, 10000);
      }

      var render_deed = function (deedid) {
        var deed = web3.eth.contract(deedAbi).at(deedid);
        var nextdeeds = 0;
        $("#jo_deed1").val(deedid);

        deed.owner(function(err,data){
          console.log ("owner", err,data.toString());
          owner =data.toString();
          $('#owner').html(owner);
          $('a#ownerlink').attr('href', 'byowner.html?' + owner);
        });

        deed.url_to_claim(function (err,data){
          console.log("deed url", err, data.toString());
          var deedurl = hex_to_ascii(data.toString());
          console.log ("deed url =", deedurl);
          $('a#url').attr('href',deedurl.toString());
        });

        deed.claim_hash(function(err,data){
          console.log("hash", err,data.toString());
          var deedhash = hex_to_ascii(data.toString());
          $('#hash').html(deedhash);
        });


        deed.provisional_time(function(err,data){
          console.log("created_time", err, data.toString());
          var created_time = new Date(parseInt(data.toString())*1000);
          $('#provisional_time').html(created_time);
        });

        deed.live_time(function(err,data){
          console.log("live_time", err, data.toString());
          var live_time = new Date(parseInt(data.toString())*1000);
          if (live_time >0){
            $('#live_time').html(live_time);
          } else {
            $('#live_time').html("null");
          }
        });

        deed.dead_time(function(err,data){
          console.log("dead_time", err, data.toString());
          var dead_time = new Date(parseInt(data.toString())*1000);
          if (dead_time > 0) {
            $('#dead_time').html(dead_time);
          } else {
            $('#dead_time').html("null");
          }
        });

        deed.status(function(err,data){
          console.log("status", err,data.toString());
          var statuscode= data.toString();
          var status ="";
          switch(statuscode) {
            case "0":
              status="provisional";
              break;
            case "1":
              status = "live";
              break;
            case "2":
              status ="dead";
              break;
            default:
              status = "unknown"
          }

          $('#deed_status').html(status);
        });

        deed.numNextDeeds(function(err,data){
          console.log("number of next deeds", err,data.toString());
          var str_nextdeeds = data.toString();
          $('#next_deed').html(str_nextdeeds);
          nextdeeds = parseInt(str_nextdeeds);

          for (var i =0; i<nextdeeds; i++){
           deed.nextDeeds(i, function(err,data){
             console.log("next deed ",i, err, data.toString());
             var html = '<a class="waves-effect waves-light btn" href="?' + data.toString() +  '">Next Deed</a>';
             console.log(html);
             $('#nav-next').append(html);
           });
          }
        });


        deed.numPreviousDeeds(function(err,data){
          console.log("number of previous deeds", err,data.toString());
          var str_previousdeeds = data.toString();
          $('#previous_deed').html(str_previousdeeds);
          previousdeeds = parseInt(str_previousdeeds);


          for (var i =0; i<previousdeeds; i++){
           deed.previousDeeds(i, function(err,data){
             console.log("previous deed ",i, err, data.toString());
             var html = '<a class="waves-effect waves-light btn" href="?' + data.toString() +  '">Prev Deed</a>';
             console.log(html);
             $('#nav-previous').append(html);
           });
          }
        });

      }; 

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

      $( document ).ready(function() {
        setTimeout(init, 1000);
      });

