pragma solidity ^0.4.16;

contract SafeMath{

  // math operations with safety checks that throw on error
  // small gas improvement

  function safeMul(uint256 a, uint256 b) internal returns (uint256){
    if (a == 0) {
      return 0;
    }
    uint256 c = a * b;
    assert(c / a == b);
    return c;
  }
  
  function safeDiv(uint256 a, uint256 b) internal returns (uint256){
    // assert(b > 0); // Solidity automatically throws when dividing by 0
    // uint256 c = a / b;
    // assert(a == b * c + a % b); // There is no case in which this doesn't hold
    return a / b;
  }
  
  function safeSub(uint256 a, uint256 b) internal returns (uint256){
    assert(b <= a);
    return a - b;
  }
  
  function safeAdd(uint256 a, uint256 b) internal returns (uint256){
    uint256 c = a + b;
    assert(c >= a);
    return c;
  }

  // mitigate short address attack
  // https://github.com/numerai/contract/blob/c182465f82e50ced8dacb3977ec374a892f5fa8c/contracts/Safe.sol#L30-L34
  modifier onlyPayloadSize(uint numWords){
     assert(msg.data.length >= numWords * 32 + 4);
     _;
  }

}


contract Token{ // ERC20 standard

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
    function balanceOf(address _owner) constant returns (uint256 balance);
    function transfer(address _to, uint256 _value) returns (bool success);
    function transferFrom(address _from, address _to, uint256 _value) returns (bool success);
    function approve(address _spender, uint256 _value) returns (bool success);
    function allowance(address _owner, address _spender) constant returns (uint256 remaining);

}


contract StandardToken is Token, SafeMath{

    uint256 public totalSupply;

    function transfer(address _to, uint256 _value) onlyPayloadSize(2) returns (bool success){
        require(_to != address(0));
        require(balances[msg.sender] >= _value && _value > 0);
        balances[msg.sender] = safeSub(balances[msg.sender], _value);
        balances[_to] = safeAdd(balances[_to], _value);
        Transfer(msg.sender, _to, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) onlyPayloadSize(3) returns (bool success){
        require(_to != address(0));
        require(balances[_from] >= _value && allowed[_from][msg.sender] >= _value && _value > 0);
        balances[_from] = safeSub(balances[_from], _value);
        balances[_to] = safeAdd(balances[_to], _value);
        allowed[_from][msg.sender] = safeSub(allowed[_from][msg.sender], _value);
        Transfer(_from, _to, _value);
        return true;
    }

    function balanceOf(address _owner) constant returns (uint256 balance){
        return balances[_owner];
    }
    
    //  https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
    function approve(address _spender, uint256 _value) onlyPayloadSize(2) returns (bool success){
        require((_value == 0) || (allowed[msg.sender][_spender] == 0));
        allowed[msg.sender][_spender] = _value;
        Approval(msg.sender, _spender, _value);
        return true;
    }

    function changeApproval(address _spender, uint256 _oldValue, uint256 _newValue) onlyPayloadSize(3) returns (bool success){
        require(allowed[msg.sender][_spender] == _oldValue);
        allowed[msg.sender][_spender] = _newValue;
        Approval(msg.sender, _spender, _newValue);
        return true;
    }

    function allowance(address _owner, address _spender) constant returns (uint256 remaining){
        return allowed[_owner][_spender];
    }

    // this creates an array with all balances
    mapping (address => uint256) balances;
    mapping (address => mapping (address => uint256)) allowed;

}


contract DHUCoin is StandardToken{

    // public variables of the token

    string public name = "DHUCoin";
    string public symbol = "DHU";
    uint256 public decimals = 18;
    
    // reachable if max amount raised
    //uint256 public maxSupply = 100000000e18;
    
    // ICO starting and ending blocks, can by changed as needed
    uint256 public icoStartBlock;
    // icoEndBlock = icoStartBlock + 345,600 blocks for 2 months ICO
    uint256 public icoEndBlock;

    // set the wallets with different levels of authority
    address public mainWallet;
    address public secondaryWallet;
    
    // time to wait between secondaryWallet price updates, mainWallet can update without restrictions
    uint256 public priceUpdateWaitingTime = 1 hours;

    uint256 public previousUpdateTime = 0;
    
    // strucure of price
    PriceDHU public currentPrice;
    uint256 public minInvestment = 0.01 ether;
    
    // for tokens allocated to the team
    address public grantVestedDHUContract;
    bool private grantVestedDHUSet = false;
    
    // halt the crowdsale should any suspicious behavior of a third-party be identified
    // tokens will be locked for trading until they are listed on exchanges
    bool public haltICO = false;
    bool public setTrading = false;
    
    // counts the number of registered students
    address[] public studentsAccounts;

    // maps previousUpdateTime to the next price
    mapping (uint256 => PriceDHU) public prices;
    // maps verified addresses
    mapping (address => bool) public verified;
    // maps all students
    mapping (address => Student) students;

    event Verification(address indexed investor);
    event Buy(address indexed investor, address indexed beneficiary, uint256 ethValue, uint256 amountTokens);
    event PriceDHUUpdate(uint256 topInteger, uint256 bottomInteger);
    event StudentInfo(address studentAddress, bytes16 firstName, bytes16 lastName);

    
    // for price updates as a rational number
    struct PriceDHU{
        uint256 topInteger;
        uint256 bottomInteger;
    }
    
    // for students' info
    struct Student {
        address studentAddress;
        bytes16 firstName;
        bytes16 lastName;
    }
    
    // grantVestedDHUContract and mainWallet can transfer to allow team allocations
    modifier isSetTrading{
        require(setTrading || msg.sender == mainWallet || msg.sender == grantVestedDHUContract);
        _;
    }

    modifier onlyVerified{
        require(verified[msg.sender]);
        _;
    }

    modifier onlyMainWallet{
        require(msg.sender == mainWallet);
        _;
    }

    modifier onlyControllingWallets{
        require(msg.sender == secondaryWallet || msg.sender == mainWallet);
        _;
    }

    modifier only_if_secondaryWallet{
        if (msg.sender == secondaryWallet) _;
    }
    modifier require_waited{
        require(safeSub(now, priceUpdateWaitingTime) >= previousUpdateTime);
        _;
    }
    modifier only_if_increase (uint256 newTopInteger){
        if (newTopInteger > currentPrice.topInteger) _;
    }

    function DHUCoin(address secondaryWalletInput, uint256 priceTopIntegerInput, uint256 startBlockInput, uint256 endBlockInput){
        require(secondaryWalletInput != address(0));
        require(endBlockInput > startBlockInput);
        require(priceTopIntegerInput > 0);
        mainWallet = msg.sender;
        secondaryWallet = secondaryWalletInput;
        verified[mainWallet] = true;
        verified[secondaryWallet] = true;
        // priceTopIntegerInput = 800,000 for 1 ETH = 800 DHU at 1 ETH = $400
        currentPrice = PriceDHU(priceTopIntegerInput, 1000);
        // icoStartBlock should be around block number 5,528,800 = May 1st 2018
        icoStartBlock = startBlockInput;
        // icoEndBlock = icoStartBlock + 345,600 blocks
        icoEndBlock = endBlockInput;
        previousUpdateTime = now;
    }

    function setGrantVestedDHUContract(address grantVestedDHUContractInput) external onlyMainWallet{
        require(grantVestedDHUContractInput != address(0));
        grantVestedDHUContract = grantVestedDHUContractInput;
        verified[grantVestedDHUContract] = true;
        grantVestedDHUSet = true;
    }

    function updatePriceDHU(uint256 newTopInteger) external onlyControllingWallets{
        require(newTopInteger > 0);
        require_limited_change(newTopInteger);
        currentPrice.topInteger = newTopInteger;
        // maps time to new PriceDHU
        prices[previousUpdateTime] = currentPrice;
        previousUpdateTime = now;
        PriceDHUUpdate(newTopInteger, currentPrice.bottomInteger);
    }

    function require_limited_change (uint256 newTopInteger) private only_if_secondaryWallet require_waited only_if_increase(newTopInteger){
        uint256 percentage_diff = 0;
        percentage_diff = safeDiv(safeMul(newTopInteger, 100), currentPrice.topInteger);
        percentage_diff = safeSub(percentage_diff, 100);
        // secondaryWallet can increase price by 20% maximum once every priceUpdateWaitingTime
        require(percentage_diff <= 20);
    }

    function updatePriceBottomInteger(uint256 newBottomInteger) external onlyMainWallet{
        require(block.number > icoEndBlock);
        require(newBottomInteger > 0);
        currentPrice.bottomInteger = newBottomInteger;
        // maps time to new Price
        prices[previousUpdateTime] = currentPrice;
        previousUpdateTime = now;
        PriceDHUUpdate(currentPrice.topInteger, newBottomInteger);
    }

    function tokenAllocation(address investor, uint256 amountTokens) private{
        require(grantVestedDHUSet);
        // the 15% allocated to us
        uint256 theoJawadAllocation = safeDiv(safeMul(amountTokens, 1764705882352941), 10e15);
        uint256 newTokens = safeAdd(amountTokens, theoJawadAllocation);
        //require(safeAdd(totalSupply, newTokens) <= maxSupply);
        totalSupply = safeAdd(totalSupply, newTokens);
        balances[investor] = safeAdd(balances[investor], amountTokens);
        balances[grantVestedDHUContract] = safeAdd(balances[grantVestedDHUContract], theoJawadAllocation);
    }

    function verifyInvestor(address investor) external onlyControllingWallets{
        verified[investor] = true;
        Verification(investor);
    }
    
    function removeVerifiedInvestor(address investor) external onlyControllingWallets{
        verified[investor] = false;
        Verification(investor);
    }

    function buy() external payable{
        buyTo(msg.sender);
    }

    function buyTo(address investor) public payable onlyVerified{
        require(!haltICO);
        require(investor != address(0));
        require(msg.value >= minInvestment);
        require(block.number >= icoStartBlock && block.number < icoEndBlock);
        uint256 icoBottomInteger = icoBottomIntegerPrice();
        uint256 tokensToBuy = safeDiv(safeMul(msg.value, currentPrice.topInteger), icoBottomInteger);
        tokenAllocation(investor, tokensToBuy);
        // send ether to mainWallet
        mainWallet.transfer(msg.value);
        Buy(msg.sender, investor, msg.value, tokensToBuy);
    }

    // bonus scheme during ICO, $0.5 for 1st 20 days, $0.55 for 2nd 20 days, $0.6 for 3rd 20 days
    function icoBottomIntegerPrice() public constant returns (uint256){
        uint256 icoDuration = safeSub(block.number, icoStartBlock);
        uint256 bottomInteger;
        // icoDuration < 115,200 blocks = 20 days
        if (icoDuration < 100){
            return currentPrice.bottomInteger;
        }
        // icoDuration < 230,400 blocks = 40 days
        else if (icoDuration < 200 ){
            bottomInteger = safeDiv(safeMul(currentPrice.bottomInteger, 110), 10e2);
            return bottomInteger;
        }
        else{
            bottomInteger = safeDiv(safeMul(currentPrice.bottomInteger, 120), 10e2);
            return bottomInteger;
        }
    }
    
    function addStudent(address _studentAddress, bytes16 _firstName, bytes16 _lastName) public {
        var student = students[msg.sender];
        
        student.studentAddress = _studentAddress;
        student.firstName = _firstName;
        student.lastName = _lastName;
        
        studentsAccounts.push(msg.sender) -1;
        emit StudentInfo(msg.sender, _firstName, _lastName);
    }
    
    function getAllStudents() view public returns(address[]) {
        return studentsAccounts;
    }
    
    function getOneStudent(address _address) view public returns (string, string) {
        return (bytes32ToString(students[_address].firstName), bytes32ToString(students[_address].lastName));
    }
    
    function studentsNumber() view public returns (uint) {
        return studentsAccounts.length;
    }
    
    function bytes32ToString(bytes32 x) private constant returns (string) {
        bytes memory bytesString = new bytes(32);
        uint charCount = 0;
        for (uint j = 0; j < 32; j++) {
            byte char = byte(bytes32(uint(x) * 2 ** (8 * j)));
            if (char != 0) {
                bytesString[charCount] = char;
                charCount++;
            }
        }
        bytes memory bytesStringTrimmed = new bytes(charCount);
        for (j = 0; j < charCount; j++) {
            bytesStringTrimmed[j] = bytesString[j];
        }
        return string(bytesStringTrimmed);
    }

    // change ICO starting date if more time needed for preparation
    function changeIcoStartBlock(uint256 newIcoStartBlock) external onlyMainWallet{
        require(block.number < icoStartBlock);
        require(block.number < newIcoStartBlock);
        icoStartBlock = newIcoStartBlock;
    }

    function changeIcoEndBlock(uint256 newIcoEndBlock) external onlyMainWallet{
        require(block.number < icoEndBlock);
        require(block.number < newIcoEndBlock);
        icoEndBlock = newIcoEndBlock;
    }

    function changePriceUpdateWaitingTime(uint256 newPriceUpdateWaitingTime) external onlyMainWallet{
        priceUpdateWaitingTime = newPriceUpdateWaitingTime;
    }

    function changeMainWallet(address newMainWallet) external onlyMainWallet{
        require(newMainWallet != address(0));
        mainWallet = newMainWallet;
    }

    function changeSecondaryWallet(address newSecondaryWallet) external onlyMainWallet{
        require(newSecondaryWallet != address(0));
        secondaryWallet = newSecondaryWallet;
    }

    function enableTrading() external onlyMainWallet{
        require(block.number > icoEndBlock);
        setTrading = true;
    }

    function claimDHU(address _token) external onlyMainWallet{
        require(_token != address(0));
        Token token = Token(_token);
        uint256 balance = token.balanceOf(this);
        token.transfer(mainWallet, balance);
     }

    // disable transfers and allow them once token is tradeable
    function transfer(address _to, uint256 _value) isSetTrading returns (bool success){
        return super.transfer(_to, _value);
    }
    function transferFrom(address _from, address _to, uint256 _value) isSetTrading returns (bool success){
        return super.transferFrom(_from, _to, _value);
    }

    function haltICO() external onlyMainWallet{
        haltICO = true;
    }
    
    function unhaltICO() external onlyMainWallet{
        haltICO = false;
    }
    
    // fallback function
    function() payable{
        require(tx.origin == msg.sender);
        buyTo(msg.sender);
    }
    
    
    /************************************************/
    /*            CODES FOR PROOF OF WORK           */
    /************************************************/
    
    /// Proof of Work, shor's algorithm + discrete logarithm problem + random hash
    bytes32 public currentChallenge;                         // The coin starts with a challenge
    uint public timeOfLastProof;                             // Variable to keep track of when rewards were given
    uint public difficulty = 10**32;                         // Difficulty starts reasonably low
    uint256 constant gx = 0x79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798;
    uint256 constant gy = 0x483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8;
    uint256 constant n = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F;
    uint256 constant a = 0;
    uint256 constant b = 7;

    function EllipticCurve()
    {
    }

    function _jAdd( uint256 x1,uint256 z1,
                    uint256 x2,uint256 z2) constant
        returns(uint256 x3,uint256 z3)
    {
        (x3, z3) = (  addmod( mulmod(z2, x1 , n) ,
                              mulmod(x2, z1 , n),
                              n),
                      mulmod(z1, z2 , n)
                    );
    }

    function _jSub( uint256 x1,uint256 z1,
                    uint256 x2,uint256 z2) constant
        returns(uint256 x3,uint256 z3)
    {
        (x3, z3) = (  addmod( mulmod(z2, x1, n),
                              mulmod(n - x2, z1, n),
                              n),
                      mulmod(z1, z2 , n)
                    );
    }

    function _jMul( uint256 x1,uint256 z1,
                    uint256 x2,uint256 z2) constant
        returns(uint256 x3,uint256 z3)
    {
        (x3, z3) = (  mulmod(x1, x2 , n), mulmod(z1, z2 , n));
    }

    function _jDiv( uint256 x1,uint256 z1,
                    uint256 x2,uint256 z2) constant
        returns(uint256 x3,uint256 z3)
    {
        (x3, z3) = (  mulmod(x1, z2 , n), mulmod(z1 , x2 , n));
    }

    function _inverse( uint256 x) constant
        returns(uint256 invA)
    {
        uint256 t=0;
        uint256 newT=1;
        uint256 r=n;
        uint256 newR=x;
        uint256 q;
        while (newR != 0) {
            q = r / newR;

            (t, newT) = (newT, addmod(t , (n - mulmod(q, newT,n)) , n));
            (r, newR) = (newR, r - q * newR );
        }

        return t;
    }

    function _ecAdd( uint256 x1,uint256 y1,uint256 z1,
                    uint256 x2,uint256 y2,uint256 z2) constant
        returns(uint256 x3,uint256 y3,uint256 z3)
    {
        uint256 l;
        uint256 lz;
        uint256 da;
        uint256 db;

        if ((x1==0)&&(y1==0)) {
            return (x2,y2,z2);
        }

        if ((x2==0)&&(y2==0)) {
            return (x1,y1,z1);
        }

        if ((x1==x2)&&(y1==y2)) {
            (l,lz) = _jMul(x1, z1, x1, z1);
            (l,lz) = _jMul(l, lz, 3, 1);
            (l,lz) = _jAdd(l, lz, a, 1);

            (da,db) = _jMul(y1, z1, 2, 1);
        } else {
            (l,lz) = _jSub(y2, z2, y1, z1);
            (da,db)  = _jSub(x2, z2, x1, z1);
        }

        (l, lz) = _jDiv(l, lz, da, db);


        (x3, da) = _jMul(l, lz, l, lz);
        (x3, da) = _jSub(x3, da, x1, z1);
        (x3, da) = _jSub(x3, da, x2, z2);

        (y3, db) = _jSub(x1, z1, x3, da);
        (y3, db) = _jMul(y3, db, l, lz );
        (y3, db) = _jSub(y3, db, y1, z1 );


        if (da != db) {
            x3 = mulmod(x3, db, n);
            y3 = mulmod(y3, da, n);
            z3 = mulmod(da, db, n);
        } else {
            z3 = da;
        }

    }

    function _ecDouble(uint256 x1,uint256 y1,uint256 z1) constant
        returns(uint256 x3,uint256 y3,uint256 z3)
    {
        (x3,y3,z3) = _ecAdd(x1,y1,z1,x1,y1,z1);
    }

    function _ecMul(uint256 d, uint256 x1,uint256 y1,uint256 z1) constant
        returns(uint256 x3,uint256 y3,uint256 z3)
    {
        uint256 remaining = d;
        uint256 px = x1;
        uint256 py = y1;
        uint256 pz = z1;
        uint256 acx = 0;
        uint256 acy = 0;
        uint256 acz = 1;

        if (d==0) {
            return (0,0,1);
        }

        while (remaining != 0) {
            if ((remaining & 1) != 0) {
                (acx,acy,acz) = _ecAdd(acx,acy,acz, px,py,pz);
            }
            remaining = remaining / 2;
            (px,py,pz) = _ecDouble(px,py,pz);
        }

        (x3,y3,z3) = (acx,acy,acz);
    }

    function publicKey(uint256 privKey) constant
        returns(uint256 qx, uint256 qy)
    {
        uint256 x;
        uint256 y;
        uint256 z;
        (x,y,z) = _ecMul(privKey, gx, gy, 1);
        z = _inverse(z);
        qx = mulmod(x , z ,n);
        qy = mulmod(y , z ,n);
    }

    function deriveKey(uint256 privKey, uint256 pubX, uint256 pubY) constant
        returns(uint256 qx, uint256 qy)
    {
        uint256 x;
        uint256 y;
        uint256 z;
        (x,y,z) = _ecMul(privKey, pubX, pubY, 1);
        z = _inverse(z);
        qx = mulmod(x , z ,n);
        qy = mulmod(y , z ,n);
    }
    
    uint256 qx;
    uint256 qy;
    uint256 dx;
    uint256 dy;
        
    function proofOfWorkOptimized(uint256 privKey) onlyVerified public {
        (qx, qy) = publicKey(privKey);
        (dx, dy) = deriveKey(privKey, qx, qy);
        
        uint256 determinant = addmod(mulmod(qx, dy, n), n - mulmod(qy, dx, n), n);

        uint256 x = mulmod(addmod(mulmod(250, dy, n), n - mulmod(qy, 250, n), n), _inverse(determinant), n);
        uint256 y = mulmod(addmod(mulmod(250, qx, n), n - mulmod(dx, 250, n), n), _inverse(determinant), n);
        
        uint256 mintAmount = addmod(mulmod(dx, x, n), mulmod(dy, y, n), n);
        
        bytes16 hashExp = bytes16(keccak256(privKey, currentChallenge));
        require(hashExp >= bytes16(difficulty));
        
        uint256 timeSinceLastProof = (now - timeOfLastProof);                          // Calculate time since last reward was given
        require(timeSinceLastProof >= 10 seconds);                                     // Rewards cannot be given too quickly
        balances[msg.sender] += mintAmount * 1e18;                  // The reward to the winner grows by the minute

        difficulty = difficulty * 10 minutes / timeSinceLastProof + 1;  // Adjusts the difficulty

        timeOfLastProof = now;                              // Reset the counter
        currentChallenge = keccak256(privKey, currentChallenge, block.blockhash(block.number - 1));  // Save a hash that will be used as the next proof
    }
}
