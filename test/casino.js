var Casino = artifacts.require("./Casino.sol");

contract('Casino', function(accounts){
    var johns_address = accounts[0];
    var vickys_address = accounts[1];
    var mikes_address = accounts[2];
    var inthras_address = accounts[3];
    var xs_address = accounts[4];
    var ys_address = accounts[5];

    it("should assert true", function(){
        var casino;

        return Casino.deployed().then(function(instance){
            casino = instance;

            casino.resetData();
            var betAmount = web3.toWei(1, 'ether');
            // 1st bet
            casino.bet(2, {gas: 300000, from: johns_address,value: betAmount });
            return casino.getTotalBet();
            
        }).then(function(result){
                 console.log("Total bet after 1st transaction: ", parseFloat(web3.fromWei(result.toNumber(), 'ether')));
                 assert.equal(parseFloat(web3.fromWei(result.toNumber(), 'ether')), 1, "Total bet not equal to 10!");
                // 2nd bet
                 casino.bet(3, {gas:300000, from: vickys_address, value: web3.toWei(2, 'ether')});

                 return casino.getTotalBet()
        }).then(function(result){
                console.log("Total Bet after 2nd transaction: ", parseFloat(web3.fromWei(result.toNumber(), 'ether')));
                assert.equal(parseFloat(web3.fromWei(result.toNumber(), 'ether')), 3, "Total bet not equal to 30 after 2nd transaction");
                // 3rd bet
                casino.bet(4, {gas:300000, from: mikes_address, value: web3.toWei(3, 'ether')});

                 return casino.getTotalBet()
        }).then(function(result){
                console.log("Total Bet after 3rd transaction: ", parseFloat(web3.fromWei(result.toNumber(), 'ether')));
                assert.equal(parseFloat(web3.fromWei(result.toNumber(), 'ether')), 6, "Total bet not equal to 30 after 2nd transaction");
                // 4th bet
                casino.bet(5, {gas:300000, from: inthras_address, value: web3.toWei(4, 'ether')});

                 return casino.getTotalBet()
        }).then(function(result){
                console.log("Total Bet after 4th transaction: ", parseFloat(web3.fromWei(result.toNumber(), 'ether')));
                assert.equal(parseFloat(web3.fromWei(result.toNumber(), 'ether')), 10, "Total bet not equal to 30 after 2nd transaction");
                //5th bet
                casino.bet(6, {gas:300000, from: xs_address, value: web3.toWei(5, 'ether')});

                 return casino.getTotalBet()
        }).then(function(result){
                console.log("Total Bet after 5th transaction: ", parseFloat(web3.fromWei(result.toNumber(), 'ether')));
                assert.equal(parseFloat(web3.fromWei(result.toNumber(), 'ether')), 15, "Total bet not equal to 30 after 2nd transaction");
                //6th bet
                casino.bet(7, {gas:300000, from: ys_address, value: web3.toWei(6, 'ether')});

                 return casino.getTotalBet()
        }).then(function(result){
                console.log("Total Bet after 6th transaction: ", parseFloat(web3.fromWei(result.toNumber(), 'ether')));
                assert.equal(parseFloat(web3.fromWei(result.toNumber(), 'ether')), 21, "Total bet not equal to 30 after 2nd transaction");

                casino.distributePrizes(5);   
        })   
    })
    
})
