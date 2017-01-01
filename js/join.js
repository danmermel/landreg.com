
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

    function hex_to_ascii(str1) {  
      var hex  = str1.toString();  
      var str = '';  
      for (var n = 0; n < hex.length; n += 2) {  
          str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));  
      }  
      return str;  
   };

  function string_to_array(str1) {
    var hex  = str1.toString().replace(/^0x/,'');
    var arr = '';
    for (var n = 0; n < hex.length; n += 2) {
      var decimal = parseInt(hex.substr(n, 2), 16);
      arr = arr + String.fromCharCode(decimal);
    }
    return arr;
  };
      var init = function() {
        var deedid = window.location.search.replace(/^\?/,'');
        $('#jo_deed1').val(deedid)
        if (typeof web3 === 'undefined') {
          $('#deadcontainer').removeClass('hide');
        } else {
          $('#livecontainer').removeClass('hide');
          landreg = web3.eth.contract(abi).at(addr);
          owner = web3.eth.accounts[0];
        };
      }


   var join = function() {
     console.log("Join");
     

     var deed1 = $('#jo_deed1').val();
     var deed2 = $('#jo_deed2').val();
     var new_name = $('#jo_new_name').val();
     var swarm_id = $('#jo_swarm_id').val();

     if (deed1.length == 0 || deed2.length == 0 || swarm_id.length !=64 || new_name.length ==0 ) {
       Materialize.toast('Please ensure all values are entered', 4000);
       return false;
     }
     console.log(deed1, deed2, swarm_id, new_name);
     swarm_id =  string_to_array(swarm_id);
     console.log('new swarmid', swarm_id);
     landreg.join(deed1, deed2,  swarm_id, new_name, {from: owner, gas: 3000000}, function(err, data) {
       if (err){
         Materialize.toast('You cannot join these deeds. You must own both to do this', 4000);
         return false;
       };
       $('#create_tx').html('Deed Join started! <a href="https://testnet.etherscan.io/tx/' + data + '">Click here to view transaction</a>');
       console.log('Join callback', err, data);
     });
 
     return false;
   }

$( document ).ready(function(){
   setTimeout(init,1000);
});

