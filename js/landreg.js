 

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

