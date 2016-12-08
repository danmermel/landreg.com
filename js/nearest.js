     // address of the contract on testnet
      function reveal(){
        $('#play').removeClass('hide');
      }
      
      var getCentre = function(callback) {
        var params = window.location.search.replace(/^\?/,'');
        if (params) {
          // latitude=123&longitude=567
          params = params.split('&');
          var centre = {};
          params.forEach(function(p) {
            // latitude=123
            p = p.split('=');
            // ['latitude','123'];
            console.log(p);
            centre[p[0]] =  parseFloat(p[1]);
          });
          //  { latitude: 123, longitude:456}
          console.log(centre);
          callback(null, centre);
        } else {
          if ("geolocation" in navigator) {
            /* geolocation is available */
            navigator.geolocation.getCurrentPosition(function(position) {
              console.log(position.coords.latitude, position.coords.longitude);
              callback(null, { latitude: position.coords.latitude, longitude:  position.coords.longitude});
            });
          } else {
            callback(null, { latitude:0, longitude:0});
          }
        }

      };
 

      var init = function() {
        reveal();
        getCentre( function(err, centre) {
            console.log('getCentre', err, centre);
            var latitude = centre.latitude; //4.870879806490355;
            var longitude = centre.longitude; //-74.03478886932135;
            var lat1 = latitude - 0.1;
            var lat2  =latitude + 0.1;
            var lon1 = longitude  - 0.1;
            var lon2  = longitude + 0.1;

            var query ='latitude:['+lat1+' TO '+ lat2 +'] AND status:1 AND longitude:[' + lon1 + ' TO '+ lon2 +']';
            query = encodeURIComponent(query);
            var url = 'https://landreg.cloudant.com/deeds/_design/deeds/_search/nearest?q=' + query +'&include_docs=true';
            console.log("query is ", url);  
            $.ajax({
              url: url,
              json: true
            }).done(function(data) {
              var map;
              var bounds = new google.maps.LatLngBounds();
              map = new google.maps.Map(document.getElementById('map'), {
                zoom: 4,
                center: {lat: latitude, lng: longitude}
              });
              for(var i=0; i < data.rows.length; i++) {
                console.log("iterator is",i);
                map.data.addGeoJson(data.rows[i].doc);
                var deed = data.rows[i].doc.deed;
                var sw = new google.maps.LatLng(deed.bounding_box[1], deed.bounding_box[0]);
                var ne = new google.maps.LatLng(deed.bounding_box[3], deed.bounding_box[2]);
                bounds.extend(sw);
                bounds.extend(ne);
              }
              map.fitBounds(bounds);
              map.setCenter(bounds.getCenter());
              console.log("success", data);
            }).fail(function(err) { 
              console.log("error", err);
            });
/*


             var sw = new google.maps.LatLng(data.deed.bounding_box[1], data.deed.bounding_box[0]);
             var ne = new google.maps.LatLng(data.deed.bounding_box[3], data.deed.bounding_box[2]);
             var bounds = new google.maps.LatLngBounds(sw,ne);
             map.fitBounds(bounds);
*/
          
        }); 
 

    /*    if (typeof web3 === 'undefined') {
          $('#livecontainer').hide();
          $('#deadcontainer').removeClass('hide');
          return;
        }
    */    
/*
         var owner = window.location.search.replace(/^\?/,'');
         if (!owner) {
           owner = web3.eth.accounts[0];
         }
         reveal();
         var url = 'https://landreg.cloudant.com/deeds/_design/deeds/_view/byowner?startkey=[%22' + owner + '%22]&endkey=[%22' + owner +  'z%22]&reduce=false&include_docs=true';
         $.ajax({
           url: url,
           json: true
         }).done(function(data) {
           var html = '';
           for(var i=0; i < data.rows.length; i++) {
             var deedid = data.rows[i].doc.deed.deedid;
             console.log('deed', deedid);
             html += '<div><a href="index.html?' + deedid + '">' + deedid + '</a> - ' + data.rows[i].doc.deed.status +'   ' + data.rows[i].doc.deed.deed_name + '</div>'; 
           }
           $('#play').html(html);
           console.log("success", data);
         }).fail(function(err) {
           console.log("error", err);
         });
*/         



       };


      $( document ).ready(function() {
        setTimeout(init, 1000);
      });

