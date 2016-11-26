     // address of the contract on testnet
      var addr = '0x6922112cd0e3aad4e29e92944b82c1876db1ce34';
      var landreg = null;
      var deedid = null;
      var owner = null;
      //address of contract on live net
      //var addr ='';

      // abi definition
      var deedAbi =[{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"nextDeeds","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_child","type":"address"}],"name":"addChild","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"status","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"provisional_time","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"commit","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newDeed","type":"address"}],"name":"transferSingle","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"claim_hash","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"numPreviousDeeds","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"expire","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"registry","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_url","type":"bytes32"},{"name":"_hash","type":"bytes32"}],"name":"configure_deed","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_parent","type":"address"}],"name":"addParent","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"numNextDeeds","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"previousDeeds","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"url_to_claim","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"dead_time","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"deed_name","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"live_time","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"_previousDeed","type":"address"},{"name":"_owner","type":"address"},{"name":"_deed_name","type":"bytes32"}],"type":"constructor"}];
 
      var abi = [{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"theRegister","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_existing_deedid","type":"address"},{"name":"_url1","type":"bytes32"},{"name":"_url2","type":"bytes32"},{"name":"_hash1","type":"bytes32"},{"name":"_hash2","type":"bytes32"},{"name":"_deed_name1","type":"bytes32"},{"name":"_deed_name2","type":"bytes32"}],"name":"split","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"deedCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_existing_deedid","type":"address"},{"name":"_newowner","type":"address"}],"name":"transferSingle","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_existing_deedid1","type":"address"},{"name":"_existing_deedid2","type":"address"},{"name":"_url","type":"bytes32"},{"name":"_hash","type":"bytes32"},{"name":"_deed_name","type":"bytes32"}],"name":"join","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_url","type":"bytes32"},{"name":"_hash","type":"bytes32"},{"name":"_deed_name","type":"bytes32"}],"name":"createDeed","outputs":[],"payable":false,"type":"function"},{"inputs":[],"type":"constructor"}];


      
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
     
     var name =$('#cd_name').val();
     var url = $('#cd_url').val();
     var hash = $('#cd_hash').val();
     if (name.length == 0) {
       Materialize.toast('Deed Name cannot be blank', 4000);
       return false;
     }
     if (name.length >32) {
       Materialize.toast('Deed Name cannot exceed 32 characters', 4000);
       return false;
     }
     if (url.length == 0) {
       Materialize.toast('URL cannot be blank', 4000);
       return false;
     }
     if (url.length > 32) {
       Materialize.toast('URL length cannot exceed 32 characters', 4000);
       return false;
     }
     if (hash.length == 0) {
       Materialize.toast('Hash cannot be blank', 4000);
       return false;
     }
     if (hash.length > 32) {
       Materialize.toast('Hash length cannot exceed 32 characters', 4000);
       return false;
     }

     landreg.createDeed(url, hash,name, {from: web3.eth.accounts[0], gas: 3000000}, function(err, data) {
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
     var new_name1 = $('#sp_new_name1').val();
     var new_name2 = $('#sp_new_name2').val();
     var new_url1 = $('#sp_new_url1').val();
     var new_url2 = $('#sp_new_url2').val();
     var new_hash1 = $('#sp_new_hash1').val();
     var new_hash2 = $('#sp_new_hash2').val();   

     if (new_name1.length ==0 || new_name2.length==0 ||new_url1.length == 0 || new_url2.length == 0 || new_hash1.length == 0 || new_hash2.length == 0) {
       Materialize.toast('Please ensure all values are entered', 4000);
       return false;
     }
     console.log(deedid, new_url1, new_url2, new_hash1, new_hash2,new_name1, new_name2);
     landreg.split(deedid, new_url1, new_url2, new_hash1, new_hash2,new_name1, new_name2, {from: owner, gas: 3000000}, function(err, data) {
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

      var render_time = function (time){
        if (time ==0){
          return '';
        }
        var d = new Date(time*1000);
        return d.toString();
        

      }

      var render_deed = function (deedid) {
        var url = 'https://landreg.cloudant.com/deeds/' + deedid.replace(/^0x/,'');
        $.ajax({
          url: url,
          json: true
        }).done(function(data) {
          $('#owner').html(data.deed.owner);
          $('a#ownerlink').attr('href', 'byowner.html?' + data.deed.owner);
          $('a#url').attr('href',data.deed.url_to_claim);
          $('#hash').html(data.deed.claim_hash);
          $('#provisional_time').html(render_time(data.deed.provisional_time));
          $('#live_time').html(render_time(data.deed.live_time));
          $('#dead_time').html(render_time(data.deed.dead_time));
          var statuscode= data.deed.status;
          var status_strings =["provisional","live","dead"];
          $('#deed_status').html(status_strings[statuscode]);
          $('#next_deed').html(data.deed.numNextDeeds);
          $('#deed_name').html(data.deed.deed_name);
          data.deed.nextDeeds.forEach (function (nd) {
            var html = '<a class="waves-effect waves-light btn" href="?' + nd +  '">Next Deed</a>';
            $('#nav-next').append(html);
          });
          $('#previous_deed').html(data.deed.numPreviousDeeds);
          data.deed.previousDeeds.forEach (function (pd) {
            var html = '<a class="waves-effect waves-light btn" href="?' + pd +  '">Prev Deed</a>';
            $('#nav-previous').append(html);
          });
          if (data.deed.valid_url) {    //render map!
              var map;
              map = new google.maps.Map(document.getElementById('map'), {
                zoom: 4,
                center: {lat: data.deed.latitude, lng: data.deed.longitude}
              });
              map.data.addGeoJson(data);
             var sw = new google.maps.LatLng(data.deed.bounding_box[1], data.deed.bounding_box[0]);
             var ne = new google.maps.LatLng(data.deed.bounding_box[3], data.deed.bounding_box[2]);
             var bounds = new google.maps.LatLngBounds(sw,ne);
             map.fitBounds(bounds);
      
        // NOTE: This uses cross-domain XHR, and may not work on older browsers.
      //  map.data.loadGeoJson(
      //      'https://storage.googleapis.com/mapsdevsite/json/google.json');
      //         }

          }
        /*  var x1 = data.deed.bounding_box[1];
          var x2 = data.deed.bounding_box[3];
          var y1 = data.deed.bounding_box[0];
          var y2 = data.deed.bounding_box[2];

          var polygon = L.polygon([
            [x1,y1] ,[x1,y2,], [x2,y2], [x2,y1]
          ]).addTo(mymap);
*/

          

        }).fail(function(err) {
          console.log("error", err);
        });
        $("#jo_deed1").val(deedid);
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

