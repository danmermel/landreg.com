 

 var init = function() {
   deedid = window.location.search.replace(/^\?/,'');
   if (deedid == "") {
     Materialize.toast("No deed id found", 4000);
   }    //if
   else {
     render_deed(deedid);
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
          var manifest_url ='http://swarm-gateways.net/bzzr:/' + data.deed.swarm_id +'/';
          $('a#url').attr('href',manifest_url);
          $('#urlval').html(manifest_url);
          //$('#hash').html(data.deed.claim_hash);
          $('#longitude').html(data.deed.longitude);
          $('#latitude').html(data.deed.latitude);
          $('a#nearbyurl').attr('href','nearest.html?latitude=' + data.deed.latitude + '&longitude=' + data.deed.longitude);
          $('#provisional_time').html(render_time(data.deed.provisional_time));
          $('#live_time').html(render_time(data.deed.live_time));
          $('#dead_time').html(render_time(data.deed.dead_time));
          var statuscode= data.deed.status;
          var status_strings =["provisional","live","dead"];
          $('#deed_status').html(status_strings[statuscode]);
          if (status_strings[statuscode] == 'live') {
            $('.deed_action').removeClass('hide');
            $('#transfer_link').attr('href','transfer.html?'+deedid);
            $('#split_link').attr('href','split.html?'+deedid);
            $('#join_link').attr('href','join.html?'+deedid);

          };
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
      
          }

        }).fail(function(err) {
          console.log("error", err);
        });
        $("#jo_deed1").val(deedid);
      }; 



$( document ).ready(function() {
  init();
});

