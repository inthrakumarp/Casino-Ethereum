pragma solidity ^0.4.4;

contract Casino {
    address public owner;
    uint256 public minimumBet;
    uint256 public totalBet;
    uint256 public numberOfBets;
    uint256 public maxAmountOfBets = 100;
    uint256 public winningNumber;
    address[] public players;

    struct Player {
        uint256 amountBet;
        uint256 numberSelected;
    }

    // The address of the player and => the player Info 
    // sender's address is the key, for each address the variables in the Player struct can be stored.
    mapping(address => Player) public playerInfo;

    function Casino(uint256 _minimumBet) public { 
        owner = msg.sender;
        if (_minimumBet != 0 ) minimumBet = _minimumBet;
    }

    function kill() public {
        if (msg.sender == owner) selfdestruct(owner);
    }

    function checkPlayerExists(address player) public constant returns(bool) {
        for (uint256 i=0; i < players.length; i++) {
            if (players[i] == player) return true;
        }
        return false;
    }

    // To bet for number between 1 and 10, both inclusive
    // payable modifier used to enable this function to receive ethers when executed
    function bet(uint256 numberSelected) public payable {
        require(!checkPlayerExists(msg.sender));
        require(numberSelected >= 1 && numberSelected <= 10);
        require(msg.value >= minimumBet);

        playerInfo[msg.sender].amountBet = msg.value;
        playerInfo[msg.sender].numberSelected = numberSelected;
        numberOfBets++;
        players.push(msg.sender);
        totalBet += msg.value;
    }

    // Generate a number between 1 to 10 that will be the winner
    function generateNumberWinner() public {
        uint256 numberGenerated = block.number % 10 + 1; // this isn't a secure way of generating random number

        distributePrizes(numberGenerated);
    }

    //
    function distributePrizes(uint256 numberWinner) public {
        address[100] memory winners; // create a temproary in memory array with fixed size
        uint256 count = 0; // to count the number of players in the winners array
        winningNumber = numberWinner;
        for (uint256 i=0; i < players.length; i++) {
            address playerAddress = players[i];
            if (playerInfo[playerAddress].numberSelected == numberWinner) {
                winners[count] = playerAddress;
                count++;
            }

            delete playerInfo[playerAddress]; //Delete all the players

            players.length = 0;

            uint256 winnerEtherAmount = totalBet / winners.length; // how much each winner gets?

            for (uint256 j = 0; j < winners.length; j++) {
                if (winners[j] != address(0)) { // check that the address in the fixed array is not empty
                    winners[j].transfer(winnerEtherAmount);
                }
            }
        }

        resetData();

    }

    function getTotalBet() constant returns (uint){
        return totalBet;
    }

    function resetData() {
        players.length = 0;
        totalBet = 0;
        numberOfBets = 0;

    }

    // Fallback function in case someone sends ether to the contract so it doesn't get lost and to increase the treasury of this contract that will be distributed in each game
   function() public payable {}
}