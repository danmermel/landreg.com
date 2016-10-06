     // address of the contract on testnet
      var addr = '0x7f3648e05f01a97160be67783571daeb834c68c1';
      
      //address of contract on live net
      //var addr ='';

      // abi definition
      var deedAbi =[{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"nextDeeds","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_child","type":"address"}],"name":"addChild","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"status","outputs":[{"name":"","type":"uint8"}],"type":"function"},{"constant":true,"inputs":[],"name":"provisional_time","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"commit","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_newDeed","type":"address"}],"name":"transferSingle","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"claim_hash","outputs":[{"name":"","type":"string"}],"type":"function"},{"constant":true,"inputs":[],"name":"numPreviousDeeds","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"expire","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"registry","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_url","type":"string"},{"name":"_hash","type":"string"}],"name":"configure_deed","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_parent","type":"address"}],"name":"addParent","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"numNextDeeds","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"previousDeeds","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"url_to_claim","outputs":[{"name":"","type":"string"}],"type":"function"},{"constant":true,"inputs":[],"name":"dead_time","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"live_time","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"inputs":[{"name":"_previousDeed","type":"address"},{"name":"_owner","type":"address"}],"type":"constructor"}]; 
      var abi = [{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"theRegister","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_url","type":"string"},{"name":"_hash","type":"string"}],"name":"createDeed","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"deedCount","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_existing_deedid","type":"address"},{"name":"_newowner","type":"address"}],"name":"transferSingle","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_existing_deedid1","type":"address"},{"name":"_existing_deedid2","type":"address"},{"name":"_url","type":"string"},{"name":"_hash","type":"string"}],"name":"join","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_existing_deedid","type":"address"},{"name":"_url1","type":"string"},{"name":"_url2","type":"string"},{"name":"_hash1","type":"string"},{"name":"_hash2","type":"string"}],"name":"split","outputs":[],"type":"function"},{"inputs":[],"type":"constructor"}];

      
      var lottereo = null;
      
      function reveal(){
      $('#play').removeClass('hide');
    }
      

      var init = function() {
        if (typeof web3 === 'undefined') {
          $('#livecontainer').hide();
          $('#deadcontainer').removeClass('hide');
          return;
        }
        
        landreg = web3.eth.contract(abi).at(addr);
        var deedid = window.location.search.replace(/^\?/,'');
        if (deedid == "") {
          landreg.theRegister(0,function(err,data) {
            render_deed(data);
            console.log(data);
          });
        }    //if
        else {
          reveal();
          render_deed(deedid);
        };
      }

      var render_deed = function (deedid) {
        var deed = web3.eth.contract(deedAbi).at(deedid);
        deed.owner(function(err,data){
          console.log ("owner", err,data.toString());
          var owner =data.toString();
          $('#owner').html(owner);
        });

        deed.url_to_claim(function (err,data){
          console.log("deed url", err, data.toString());
          var deedurl = data.toString();
          $('#url').html(deedurl);
        });

        /*
        draw.getPot(function(err,data){
          console.log("pot", err,data.toString());
          var wei = parseInt(data);
          var eth = web3.fromWei(wei, 'ether');
          $('#total').html(eth);
        });
        draw.entryFee(function(err,data){
          console.log("entry fee", err, data.toString());
          var wei = parseInt(data);
          var eth = web3.fromWei(wei,'ether');
          $('#entryFee').html(eth);
        });
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

      $( document ).ready(init);

