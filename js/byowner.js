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
         alert(owner);
       };


      $( document ).ready(function() {
        setTimeout(init, 1000);
      });

