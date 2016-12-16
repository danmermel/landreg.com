
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

      var init = function() {
        if (typeof web3 === 'undefined') {
          $('#deadcontainer').removeClass('hide');
        } else {
          $('#livecontainer').removeClass('hide');
          landreg = web3.eth.contract(abi).at(addr);
        };
      }



   var createDeed = function() {
     console.log("create deed");
     
     var name =$('#cd_name').val();
     var url = $('#cd_url').val();
     var hash = $('#cd_hash').val();
     if (name.length == 0) {
       Materialize.toast('Deed Name cannot be blank', 4000);
       return false;
     }
     if (name.length >32) {
       Materialize.toast('Deed Name cannot exceed 32 characters', 4000);
       return false;
     }
     if (url.length == 0) {
       Materialize.toast('URL cannot be blank', 4000);
       return false;
     }
     if (url.length > 32) {
       Materialize.toast('URL length cannot exceed 32 characters', 4000);
       return false;
     }
     if (hash.length == 0) {
       Materialize.toast('Hash cannot be blank', 4000);
       return false;
     }
     if (hash.length > 32) {
       Materialize.toast('Hash length cannot exceed 32 characters', 4000);
       return false;
     }

     landreg.createDeed(url, hash,name, {from: web3.eth.accounts[0], gas: 3000000}, function(err, data) {
       if (err){
         Materialize.toast('Cannot create deed', 4000);
         return false;
       };

       console.log('createDeed callback', err, data);
       $('#create_tx').html('Deed creation started! <a href="https://testnet.etherscan.io/tx/' + data + '">Click here to view transaction on Etherscan</a>');
     });
 
     return false;
   }


$( document ).ready(function(){
   setTimeout(init,1000);
});

