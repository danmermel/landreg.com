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
         var owner = web3.eth.accounts[0];
         reveal();
         var url = 'https://landreg.cloudant.com/deeds/_design/deeds/_view/byowner?key=%22' + owner + '%22&reduce=false&include_docs=true';
         $.ajax({
           url: url,
           json: true
         }).done(function(data) {
           var html = '';
           for(var i=0; i < data.rows; i++) {
             var deedid = data.rows[i].doc.deedid;
             console.log('deed', deedid);
             html += '<div><a href="index.html?' + deedid + '">' + deedid + '</a></div>'; 
           }
           $('#play').html(html);
           console.log("success", data);
         }).fail(function(err) {
           console.log("error", err);
         });
         

       };


      $( document ).ready(function() {
        setTimeout(init, 1000);
      });

