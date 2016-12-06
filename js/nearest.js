     // address of the contract on testnet
      function reveal(){
        $('#play').removeClass('hide');
      }
      

      var init = function() {
        if ("geolocation" in navigator) {
           /* geolocation is available */
          navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position.coords.latitude, position.coords.longitude);
            // now frig to be in Colombia for now
            var latitude = 4.870879806490355;
            var longitude =-74.03478886932135;
            var lat1 = latitude - 0.1;
            var lat2  =latitude + 0.1;
            var lon1 = longitude  - 0.1;
            var lon2  = longitude + 0.1;

            var query ='latitude:['+lat1+' TO '+ lat2 +'] AND status:1 AND longitude:[' + lon1 + ' TO '+ lon2 +']';
            query = encodeURIComponent(query);
            var url = 'https://landreg.cloudant.com/deeds/_design/deeds/_search/nearest?q=' + query +'&include_docs=true';
           console.log("query is ", url);  
          });
        } else {
            /* geolocation IS NOT available */
        }
 

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

