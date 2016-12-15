     // address of the contract on testnet
      var addr = '0xf956c2ba203c6d9f1c22b7dff7f60c005849c465';
      var landreg = null;
      var deedid = null;
      var owner = null;
      //address of contract on live net
      //var addr ='';

      // abi definition
      var deedAbi =[{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"nextDeeds","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_child","type":"address"}],"name":"addChild","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"status","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"provisional_time","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"commit","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newDeed","type":"address"}],"name":"transferSingle","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"claim_hash","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"numPreviousDeeds","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"expire","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"registry","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_url","type":"bytes32"},{"name":"_hash","type":"bytes32"}],"name":"configure_deed","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_parent","type":"address"}],"name":"addParent","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"numNextDeeds","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"previousDeeds","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"url_to_claim","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"dead_time","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"deed_name","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"live_time","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"_previousDeed","type":"address"},{"name":"_owner","type":"address"},{"name":"_deed_name","type":"bytes32"}],"type":"constructor"}];
 
      var abi = [{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"theRegister","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_existing_deedid","type":"address"},{"name":"_url1","type":"bytes32"},{"name":"_url2","type":"bytes32"},{"name":"_hash1","type":"bytes32"},{"name":"_hash2","type":"bytes32"},{"name":"_deed_name1","type":"bytes32"},{"name":"_deed_name2","type":"bytes32"}],"name":"split","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"deedCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_existing_deedid","type":"address"},{"name":"_newowner","type":"address"}],"name":"transferSingle","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_existing_deedid1","type":"address"},{"name":"_existing_deedid2","type":"address"},{"name":"_url","type":"bytes32"},{"name":"_hash","type":"bytes32"},{"name":"_deed_name","type":"bytes32"}],"name":"join","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_url","type":"bytes32"},{"name":"_hash","type":"bytes32"},{"name":"_deed_name","type":"bytes32"}],"name":"createDeed","outputs":[],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_deedid","type":"address"}],"name":"Log_CreateDeed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_deedid","type":"address"}],"name":"Log_TransferSingle","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_deedid1","type":"address"},{"indexed":false,"name":"_deedid2","type":"address"}],"name":"Log_Split","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_deedid","type":"address"}],"name":"Log_Join","type":"event"}];

      
      var lottereo = null;
      
    function hex_to_ascii(str1) {  
      var hex  = str1.toString();  
      var str = '';  
      for (var n = 0; n < hex.length; n += 2) {  
          str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));  
      }  
      return str;  
   };

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
          });
        }    //if
        else {
          render_deed(deedid);
          getDeed(deedid,0);
        };

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
          $('#deedidval').html(deedid);
          $('a#deedid').attr('href', 'https://testnet.etherscan.io/address/' + deedid);  
          $('#owner').html(data.deed.owner);
          $('a#ownerlink').attr('href', 'byowner.html?' + data.deed.owner);
          $('a#url').attr('href',data.deed.url_to_claim);
          $('#urlval').html(data.deed.url_to_claim);
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
            var html = '<a class="waves-effect waves-light btn navigation" href="?' + nd +  '">Next Deed</a>';
            $('#nav-next').append(html);
          });
          $('#previous_deed').html(data.deed.numPreviousDeeds);
          data.deed.previousDeeds.forEach (function (pd) {
            var html = '<a class="waves-effect waves-light btn navigation" href="?' + pd +  '">Prev Deed</a>';
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



      $( document ).ready(function() {
        setTimeout(init, 1000);
      });

