
    // address of the contract on testnet
      var addr = '0xe43e0b03407b54c4d3d65d828bd4f61454c70bc6';
      var landreg = null;
      var deedid = null;
      var owner = null;
      //address of contract on live net
      //var addr ='';

      // abi definition
      var deedAbi =[{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"nextDeeds","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_child","type":"address"}],"name":"addChild","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"status","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"provisional_time","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"commit","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newDeed","type":"address"}],"name":"transferSingle","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"claim_hash","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"numPreviousDeeds","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"expire","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"registry","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_url","type":"bytes32"},{"name":"_hash","type":"bytes32"}],"name":"configure_deed","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_parent","type":"address"}],"name":"addParent","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"numNextDeeds","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"previousDeeds","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"url_to_claim","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"dead_time","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"deed_name","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"live_time","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"_previousDeed","type":"address"},{"name":"_owner","type":"address"},{"name":"_deed_name","type":"bytes32"}],"type":"constructor"}];
 
      var abi = [{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"theRegister","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_deedid","type":"address"}],"name":"kill_deed","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"deedCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_existing_deedid","type":"address"},{"name":"_newowner","type":"address"}],"name":"transferSingle","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_existing_deedid","type":"address"},{"name":"_swarm_id1","type":"bytes32"},{"name":"_swarm_id2","type":"bytes32"},{"name":"_deed_name1","type":"bytes32"},{"name":"_deed_name2","type":"bytes32"}],"name":"split","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_existing_deedid1","type":"address"},{"name":"_existing_deedid2","type":"address"},{"name":"_swarm_id","type":"bytes32"},{"name":"_deed_name","type":"bytes32"}],"name":"join","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_swarm_id","type":"bytes32"},{"name":"_deed_name","type":"bytes32"}],"name":"createDeed","outputs":[],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_deedid","type":"address"}],"name":"Log_CreateDeed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_deedid","type":"address"}],"name":"Log_TransferSingle","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_deedid1","type":"address"},{"indexed":false,"name":"_deedid2","type":"address"}],"name":"Log_Split","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_deedid","type":"address"}],"name":"Log_Join","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_deedid","type":"address"}],"name":"Log_Kill","type":"event"}];

    function hex_to_ascii(str1) {  
      var hex  = str1.toString();  
      var str = '';  
      for (var n = 0; n < hex.length; n += 2) {  
          str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));  
      }  
      return str;  
   };

      var init = function() {
        var deedid = window.location.search.replace(/^\?/,'');
        $('#sp_deed_id').val(deedid)
        if (typeof web3 === 'undefined') {
          $('#deadcontainer').removeClass('hide');
        } else {
          $('#livecontainer').removeClass('hide');
          landreg = web3.eth.contract(abi).at(addr);
          owner = web3.eth.accounts[0];
        };
      }


   var split = function() {
     console.log("Split");
     var new_name1 = $('#sp_new_name1').val();
     var new_name2 = $('#sp_new_name2').val();
     var new_swarmid1 = $('#sp_new_swarmid1').val();
     var new_swarmid2 = $('#sp_new_swarmid2').val();
     deedid = $('#sp_deed_id').val();   

     if (new_name1.length ==0 || new_name2.length==0 new_swarmid1.length == 0 || new_swarmid2.length == 0) {
       Materialize.toast('Please ensure all values are entered', 4000);
       return false;
     }
     if (new_swarmid1.length !=64 || new_swarmid2.length != 64) {
       Materialize.toast('Swarm IDs must be 64 characters long', 4000);
       return false;
     }
     console.log(deedid, new_swarmid1, new_swarmid2, new_name1, new_name2);
     landreg.split(deedid, new_swarmid1, new_swarmid2, new_name1, new_name2, {from: owner, gas: 3000000}, function(err, data) {
       if (err){
         Materialize.toast('You cannot split this deed. It does not belong to you', 4000);
         return false;
       };
       console.log('Split callback', err, data);
       $('#create_tx').html('Deed Split started! <a href="https://testnet.etherscan.io/tx/' + data + '">Click here to view transaction</a>');

     });
 
     return false;
   }


$( document ).ready(function(){
   setTimeout(init,1000);
});

