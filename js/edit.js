

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
