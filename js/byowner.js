     // address of the contract on testnet
      function reveal(){
        $('#play').removeClass('hide');
      }
      

      var init = function() {
    /*    if (typeof web3 === 'undefined') {
          $('#livecontainer').hide();
          $('#deadcontainer').removeClass('hide');
          return;
        }
    */    

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
             var a = '<a href="bydeed.html?'+ deedid+ '">'+deedid+'</a>';
             html += '<tr><td>' + data.rows[i].doc.deed.deed_name +'</td><td>' + a + '</td><td>' + data.rows[i].doc.deed.status +'</td></tr> \n'; 
           }
           $('#tbody').html(html);
           console.log("success", data);
         }).fail(function(err) {
           console.log("error", err);
         });
         

       };


      $( document ).ready(function() {
        setTimeout(init, 1000);
      });

