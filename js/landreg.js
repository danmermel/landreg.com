     // address of the contract on testnet
      var addr = '0xec1a21b4079ac5ede878c829ea0174b12e74166b';
      var landreg = null;
      var deedid = null;
      var owner = null;
      //address of contract on live net
      //var addr ='';

      // abi definition
      var deedAbi = [{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"nextDeeds","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_child","type":"address"}],"name":"addChild","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"status","outputs":[{"name":"","type":"uint8"}],"type":"function"},{"constant":true,"inputs":[],"name":"provisional_time","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"commit","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_newDeed","type":"address"}],"name":"transferSingle","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"claim_hash","outputs":[{"name":"","type":"bytes32"}],"type":"function"},{"constant":true,"inputs":[],"name":"numPreviousDeeds","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"expire","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"registry","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_url","type":"bytes32"},{"name":"_hash","type":"bytes32"}],"name":"configure_deed","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_parent","type":"address"}],"name":"addParent","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"numNextDeeds","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"previousDeeds","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"url_to_claim","outputs":[{"name":"","type":"bytes32"}],"type":"function"},{"constant":true,"inputs":[],"name":"dead_time","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"live_time","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"inputs":[{"name":"_previousDeed","type":"address"},{"name":"_owner","type":"address"}],"type":"constructor"}] ;
      var abi = [{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"theRegister","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"deedCount","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_existing_deedid","type":"address"},{"name":"_newowner","type":"address"}],"name":"transferSingle","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_existing_deedid","type":"address"},{"name":"_url1","type":"bytes32"},{"name":"_url2","type":"bytes32"},{"name":"_hash1","type":"bytes32"},{"name":"_hash2","type":"bytes32"}],"name":"split","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_existing_deedid1","type":"address"},{"name":"_existing_deedid2","type":"address"},{"name":"_url","type":"bytes32"},{"name":"_hash","type":"bytes32"}],"name":"join","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_url","type":"bytes32"},{"name":"_hash","type":"bytes32"}],"name":"createDeed","outputs":[],"type":"function"},{"inputs":[],"type":"constructor"}] ;


      
      var lottereo = null;
      
      function reveal(){
        $('#play').removeClass('hide');
      }
      
    function hex_to_ascii(str1) {  
      var hex  = str1.toString();  
      var str = '';  
      for (var n = 0; n < hex.length; n += 2) {  
          str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));  
      }  
      return str;  
   };

   var transferSingle = function() {
     console.log("transfer single");

     var newowner = $('#ts_new_owner').val();
     if (newowner.length == 0) {
       Materialize.toast('New owner cannot be blank', 4000);
       return false;
     }

     landreg.transferSingle(deedid, newowner, {from: owner, gas: 3000000}, function(err, data) {
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

     var new_url1 = $('#sp_new_url1').val();
     var new_url2 = $('#sp_new_url2').val();
     var new_hash1 = $('#sp_new_hash1').val();
     var new_hash2 = $('#sp_new_hash2').val();   

     if (new_url1.length == 0 || new_url2.length == 0 || new_hash1.length == 0 || new_hash2.length == 0) {
       Materialize.toast('Please ensure all values are entered', 4000);
       return false;
     }

     landreg.split(deedid, new_url1, new_url2, new_hash1, new_hash2, {from: owner, gas: 3000000}, function(err, data) {
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
     var new_url = $('#jo_new_url').val();
     var new_hash = $('#jo_new_hash').val();   

     if (deed1.length == 0 || deed2.length == 0 || new_url.length == 0 || new_hash.length == 0) {
       Materialize.toast('Please ensure all values are entered', 4000);
       return false;
     }

     landreg.join(deed1, deed2,  new_url, new_hash, {from: owner, gas: 3000000}, function(err, data) {
       if (err){
         Materialize.toast('You cannot join these deeds. You must own both to do this', 4000);
         return false;
       };
       console.log('Join callback', err, data);
     });
 
     return false;
   }

      var init = function() {
        if (typeof web3 === 'undefined') {
          $('#livecontainer').hide();
          $('#deadcontainer').removeClass('hide');
          return;
        }
        
        landreg = web3.eth.contract(abi).at(addr);
        deedid = window.location.search.replace(/^\?/,'');
        if (deedid == "") {
          landreg.theRegister(0,function(err,data) {
            deedid = data.toString();
            render_deed(data);
            console.log(data);
            reveal();
          });
        }    //if
        else {
          reveal();
          render_deed(deedid);
        };
      }

      var render_deed = function (deedid) {
        var deed = web3.eth.contract(deedAbi).at(deedid);
        var nextdeeds = 0;
        $("#jo_deed1").val(deedid);

        deed.owner(function(err,data){
          console.log ("owner", err,data.toString());
          owner =data.toString();
          $('#owner').html(owner);
        });

        deed.url_to_claim(function (err,data){
          console.log("deed url", err, data.toString());
          var deedurl = hex_to_ascii(data.toString());
          $('#url').html(deedurl);
        });

        deed.claim_hash(function(err,data){
          console.log("hash", err,data.toString());
          var deedhash = hex_to_ascii(data.toString());
          $('#hash').html(deedhash);
        });


        deed.provisional_time(function(err,data){
          console.log("created_time", err, data.toString());
          var created_time = new Date(parseInt(data.toString())*1000);
          $('#provisional_time').html(created_time);
        });

        deed.live_time(function(err,data){
          console.log("live_time", err, data.toString());
          var live_time = new Date(parseInt(data.toString())*1000);
          if (live_time >0){
            $('#live_time').html(live_time);
          } else {
            $('#live_time').html("null");
          }
        });

        deed.dead_time(function(err,data){
          console.log("dead_time", err, data.toString());
          var dead_time = new Date(parseInt(data.toString())*1000);
          if (dead_time > 0) {
            $('#dead_time').html(dead_time);
          } else {
            $('#dead_time').html("null");
          }
        });

        deed.status(function(err,data){
          console.log("status", err,data.toString());
          var statuscode= data.toString();
          var status ="";
          switch(statuscode) {
            case "0":
              status="provisional";
              break;
            case "1":
              status = "live";
              break;
            case "2":
              status ="dead";
              break;
            default:
              status = "unknown"
          }

          $('#deed_status').html(status);
        });

        deed.numNextDeeds(function(err,data){
          console.log("number of next deeds", err,data.toString());
          var str_nextdeeds = data.toString();
          $('#next_deed').html(str_nextdeeds);
          nextdeeds = parseInt(str_nextdeeds);

          for (var i =0; i<nextdeeds; i++){
           deed.nextDeeds(i, function(err,data){
             console.log("next deed ",i, err, data.toString());
             var html = '<a class="waves-effect waves-light btn" href="?' + data.toString() +  '">Next Deed</a>';
             console.log(html);
             $('#nav-next').append(html);
           });
          }
        });


        deed.numPreviousDeeds(function(err,data){
          console.log("number of previous deeds", err,data.toString());
          var str_previousdeeds = data.toString();
          $('#previous_deed').html(str_previousdeeds);
          previousdeeds = parseInt(str_previousdeeds);


          for (var i =0; i<previousdeeds; i++){
           deed.previousDeeds(i, function(err,data){
             console.log("previous deed ",i, err, data.toString());
             var html = '<a class="waves-effect waves-light btn" href="?' + data.toString() +  '">Prev Deed</a>';
             console.log(html);
             $('#nav-previous').append(html);
           });
          }
        });

        /*
        draw.drawn(function(err,data){
          console.log("drawn", err,data);
          var drawn = data;
          if (drawn) {
            $('#buy-form').hide();
            $('#not-drawn').hide();
          }
          else {
            $('#is-drawn').hide();
            var events = draw.allEvents();
            // watch for changes
            events.watch(function(error, event){
              if (!error) {
                Materialize.toast('Event detected! Refreshing...', 4000);
                render_draw(drawid);
                console.log(event);
              };  //if !error
            });  //events.watch
          }
        })

        draw.winningNumber(function(err,data){
          console.log("winning number", err,data.toString());
          var winningNumber = data.toString();
          $('#winning-number').html(winningNumber)
        })

        draw.actualDrawDate(function(err,data){
          console.log("actual draw date", err,data.toString());
          var actualDrawDate = new Date(parseInt(data.toString())*1000);
          $('#actualDrawDate').html(actualDrawDate)
        })

        draw.payout(function(err,data){
          console.log("payout", err,data.toString());
          var payout = data.toString();
          $('#payout').html(payout)
        })

        draw.winningaddresses(function(err,data){
          console.log("winning addresses", err,data);
          //var payout = data.toString();
          //$('#payout').html(payout)
        })

        draw.previousDrawAddress(function(err,data){
          console.log(err,data);
          var previousDrawAddress = data.toString();
          if (previousDrawAddress == "0x0000000000000000000000000000000000000000"){
            $('#nav-previous').hide();
          }
          else {
            var url = window.location.origin+window.location.pathname+'?'+previousDrawAddress;
            console.log("previous url = ", url);
            $('#previous-btn').attr('href', url)
          }
        });
        draw.nextDraw(function(err,data){
          console.log(err,data);
          var nextDraw = data.toString();
          if (nextDraw == "0x0000000000000000000000000000000000000000"){
            $('#nav-next').hide();
          }
          else {
            var url = window.location.origin+window.location.pathname+'?'+nextDraw;
            console.log("next url = ", url);
            $('#next-btn').attr('href', url)
          }
        })
*/
      }; 

      $( document ).ready(function() {
        setTimeout(init, 1000);
      });

