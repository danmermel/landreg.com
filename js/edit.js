
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

      
      var lottereo = null;
      
    function hex_to_ascii(str1) {  
      var hex  = str1.toString();  
      var str = '';  
      for (var n = 0; n < hex.length; n += 2) {  
          str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));  
      }  
      return str;  
   };

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
     });
 
     return false;
   }


   var transferSingle = function() {
     console.log("transfer single");

     var newowner = $('#ts_new_owner').val();
     if (newowner.length == 0) {
       Materialize.toast('New owner cannot be blank', 4000);
       return false;
     }

     landreg.transferSingle("0x"+deedid, newowner, {from: owner, gas: 3000000}, function(err, data) {
       if (err){
         Materialize.toast('You cannot transfer this deed. It does not belong to you', 4000);
         return false;
       };

       console.log('transfer single callback', err, data);
     });
 
     return false;
   }

   var split = function() {
     console.log("Split");
     var new_name1 = $('#sp_new_name1').val();
     var new_name2 = $('#sp_new_name2').val();
     var new_url1 = $('#sp_new_url1').val();
     var new_url2 = $('#sp_new_url2').val();
     var new_hash1 = $('#sp_new_hash1').val();
     var new_hash2 = $('#sp_new_hash2').val();   

     if (new_name1.length ==0 || new_name2.length==0 ||new_url1.length == 0 || new_url2.length == 0 || new_hash1.length == 0 || new_hash2.length == 0) {
       Materialize.toast('Please ensure all values are entered', 4000);
       return false;
     }
     console.log(deedid, new_url1, new_url2, new_hash1, new_hash2,new_name1, new_name2);
     landreg.split("0x"+deedid, new_url1, new_url2, new_hash1, new_hash2,new_name1, new_name2, {from: owner, gas: 3000000}, function(err, data) {
       if (err){
         Materialize.toast('You cannot split this deed. It does not belong to you', 4000);
         return false;
       };
       console.log('Split callback', err, data);
     });
 
     return false;
   }

   var join = function() {
     console.log("Join");
     

     var deed1 = $('#jo_deed1').val();
     var deed2 = $('#jo_deed2').val();
     var new_name = $('#jo_new_name').val();
     var new_url = $('#jo_new_url').val();
     var new_hash = $('#jo_new_hash').val();   

     if (deed1.length == 0 || deed2.length == 0 || new_url.length == 0 || new_hash.length == 0|| new_name.length ==0 ) {
       Materialize.toast('Please ensure all values are entered', 4000);
       return false;
     }

     landreg.join("0x"+deed1, "0x"+deed2,  new_url, new_hash, new_name, {from: owner, gas: 3000000}, function(err, data) {
       if (err){
         Materialize.toast('You cannot join these deeds. You must own both to do this', 4000);
         return false;
       };
       console.log('Join callback', err, data);
     });
 
     return false;
   }
