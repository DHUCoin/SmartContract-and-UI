pragma solidity ^0.4.21;

contract SafeMath{

  // Math operations with safety checks that throw on error
  // Small gas improvement

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

  // Mitigate short address attack
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
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) onlyPayloadSize(3) returns (bool success){
        require(_to != address(0));
        require(balances[_from] >= _value && allowed[_from][msg.sender] >= _value && _value > 0);
        balances[_from] = safeSub(balances[_from], _value);
        balances[_to] = safeAdd(balances[_to], _value);
        allowed[_from][msg.sender] = safeSub(allowed[_from][msg.sender], _value);
        emit Transfer(_from, _to, _value);
        return true;
    }

    function balanceOf(address _owner) constant returns (uint256 balance){
        return balances[_owner];
    }
    
    //  https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
    function approve(address _spender, uint256 _value) onlyPayloadSize(2) returns (bool success){
        require((_value == 0) || (allowed[msg.sender][_spender] == 0));
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function changeApproval(address _spender, uint256 _oldValue, uint256 _newValue) onlyPayloadSize(3) returns (bool success){
        require(allowed[msg.sender][_spender] == _oldValue);
        allowed[msg.sender][_spender] = _newValue;
        emit Approval(msg.sender, _spender, _newValue);
        return true;
    }

    function allowance(address _owner, address _spender) constant returns (uint256 remaining){
        return allowed[_owner][_spender];
    }

    // This creates an array with all balances
    mapping (address => uint256) balances;
    mapping (address => mapping (address => uint256)) allowed;

}


contract DHUCoin is StandardToken{

    // Public variables of the token

    string public name = "DHUCoin";
    string public symbol = "DHU";
    uint256 public decimals = 18;
    
    // Reachable if max amount raised
    //uint256 public maxSupply = 100000000e18;
    
    // TGE starting and ending blocks, can by changed as needed
    uint256 public tgeStartBlock;
    // tgeEndBlock = tgeStartBlock + n blocks
    uint256 public tgeEndBlock;

    // Set the wallets with different levels of authority
    address public mainWallet;
    address public secondaryWallet;
    
    // time to wait between secondaryWallet price updates, mainWallet can update without restrictions
    uint256 public priceUpdateWaitingTime = 1 hours;

    uint256 public previousUpdateTime = 0;
    
    // Struture of price
    PriceDHU public currentPrice;
    uint256 public minInvestment = 0.01 ether;
    
    // For tokens allocated to the team
    address public grantVestedDHUContract;
    bool private grantVestedDHUSet = false;
    
    // Halt the crowdsale should any suspicious behavior of a third-party be identified
    // Tokens will be locked for trading until they are listed on exchanges
    bool public haltTGE = false;
    bool public setTrading = false;
    
    // Count the number of registered students
    address[] public studentsAccounts;

    // Map previousUpdateTime to the next price
    mapping (uint256 => PriceDHU) public prices;
    // Map verified addresses
    mapping (address => bool) public verified;
    // Map all students
    mapping (address => Student) public students;
    mapping (address => bool) public applicableStudents;

    event Verification(address indexed participant, string id);
    event Authorization(address indexed student, string id);
    event Buy(address indexed participant, address indexed beneficiary, uint256 ethValue, uint256 amountTokens);
    event PriceDHUUpdate(uint256 topInteger, uint256 bottomInteger);
    event AirDrop(address indexed participant, uint256 amountTokens);
    event StudentInfo(address studentAddress, string studentID, string firstName, string lastName, uint gpa);

    
    // For price updates as a rational number
    struct PriceDHU{
        uint256 topInteger;
        uint256 bottomInteger;
    }
    
    // For students' info
    struct Student{
        string signature;
        string studentID;
        string firstName;
        string lastName;
        uint gpa;
    }
    
    // GrantVestedDHUContract and mainWallet can transfer to allow team allocations
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
        if (msg.sender == secondaryWallet)
        _;
    }
    
    modifier require_waited{
        require(safeSub(now, priceUpdateWaitingTime) >= previousUpdateTime);
        _;
    }
    
    modifier only_if_increase (uint256 newTopInteger){
        if (newTopInteger > currentPrice.topInteger) _;
    }
    
    modifier miningAllowed{
        require(block.number > tgeEndBlock);
        require(applicableStudents[msg.sender]);
        _;
    }
    
    address secondaryWalletInput = 0xa4923d031a412ddae42fa828676088fa496774f0; 
    uint256 priceTopIntegerInput = 2500000;
    uint256 startBlockInput = 3139600;
    uint256 endBlockInput = 3139700;

    function DHUCoin(){
        require(secondaryWalletInput != address(0));
        require(endBlockInput > startBlockInput);
        require(priceTopIntegerInput > 0);
        mainWallet = msg.sender;
        secondaryWallet = secondaryWalletInput;
        verified[mainWallet] = true;
        verified[secondaryWallet] = true;
        // priceTopIntegerInput = 2,500,000 for 1 ETH = 2500 DHU at 1 ETH = ３万円
        currentPrice = PriceDHU(priceTopIntegerInput, 1000);
        tgeStartBlock = startBlockInput;
        // tgeEndBlock = tgeStartBlock + n blocks
        tgeEndBlock = endBlockInput;
        //previousUpdateTime = now;
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
        emit PriceDHUUpdate(newTopInteger, currentPrice.bottomInteger);
    }

    function require_limited_change (uint256 newTopInteger) private only_if_secondaryWallet only_if_increase(newTopInteger){
        uint256 percentage_diff = 0;
        percentage_diff = safeDiv(safeMul(newTopInteger, 100), currentPrice.topInteger);
        percentage_diff = safeSub(percentage_diff, 100);
        // secondaryWallet can increase price by 20% maximum once every priceUpdateWaitingTime
        require(percentage_diff <= 20);
    }

    function updatePriceBottomInteger(uint256 newBottomInteger) external onlyMainWallet{
        require(block.number > tgeEndBlock);
        require(newBottomInteger > 0);
        currentPrice.bottomInteger = newBottomInteger;
        // maps time to new Price
        prices[previousUpdateTime] = currentPrice;
        previousUpdateTime = now;
        emit PriceDHUUpdate(currentPrice.topInteger, newBottomInteger);
    }

    function tokenAllocation(address participant, uint256 amountTokens) private{
        require(grantVestedDHUSet);
        // the 15% allocated to us
        uint256 theoJawadAllocation = safeDiv(safeMul(amountTokens, 1764705882352941), 10e15);
        uint256 newTokens = safeAdd(amountTokens, theoJawadAllocation);
        //require(safeAdd(totalSupply, newTokens) <= maxSupply);
        totalSupply = safeAdd(totalSupply, newTokens);
        balances[participant] = safeAdd(balances[participant], amountTokens);
        balances[grantVestedDHUContract] = safeAdd(balances[grantVestedDHUContract], theoJawadAllocation);
    }
    
    function airDropTokens(address participant, uint amountTokens, string id) external onlyMainWallet{
        require(block.number < tgeEndBlock);
        require(participant != address(0));
        verified[participant] = true;
        tokenAllocation(participant, amountTokens);
        emit Verification(participant, id);
        emit AirDrop(participant, amountTokens);
    }

    function verifyParticipant(address participant, string id) external onlyControllingWallets{
        verified[participant] = true;
        emit Verification(participant, id);
    }
    
    function removeVerifiedParticipant(address participant, string id) external onlyControllingWallets{
        verified[participant] = false;
        emit Verification(participant, id);
    }
    
    function authorizeStudent(address student, string id) external onlyControllingWallets{
        applicableStudents[student] = true;
        emit Authorization(student, id);
    }
    
    function removeAuthorizedStudent(address student, string id) external onlyControllingWallets{
        applicableStudents[student] = false;
        emit Authorization(student, id);
    }

    function buy() external payable{
        buyTo(msg.sender);
    }

    function buyTo(address participant) public payable onlyVerified{
        require(!haltTGE);
        require(participant != address(0));
        require(msg.value >= minInvestment);
        require(block.number >= tgeStartBlock && block.number < tgeEndBlock);
        uint256 tgeBottomInteger = tgeBottomIntegerPrice();
        uint256 tokensToBuy = safeDiv(safeMul(msg.value, currentPrice.topInteger), tgeBottomInteger);
        tokenAllocation(participant, tokensToBuy);
        // send ether to mainWallet
        mainWallet.transfer(msg.value);
        emit Buy(msg.sender, participant, msg.value, tokensToBuy);
    }

    // Bonus scheme during TGE
    function tgeBottomIntegerPrice() public constant returns (uint256){
        uint256 tgeDuration = safeSub(block.number, tgeStartBlock);
        uint256 bottomInteger;
        // tgeDuration < 115,200 blocks = 20 days
        if (tgeDuration < 100){
            return currentPrice.bottomInteger;
        }
        // tgeDuration < 230,400 blocks = 40 days
        else if (tgeDuration < 200 ){
            bottomInteger = safeDiv(safeMul(currentPrice.bottomInteger, 110), 1e2);
            return bottomInteger;
        }
        else{
            bottomInteger = safeDiv(safeMul(currentPrice.bottomInteger, 120), 1e2);
            return bottomInteger;
        }
    }
    
    function addStudent(string _signature, string _studentID, string _firstName, string _lastName, uint _gpa, string id) public {
        // Automatically whitelist student 
        verified[msg.sender] = true;      

        Student storage student = students[msg.sender];

        // Delete student from struct and mapping if already present
        for(uint i = 0; i < studentsAccounts.length; i ++){
            if(msg.sender == studentsAccounts[i]){  
                studentsAccounts[i] = studentsAccounts[studentsAccounts.length - 1];
                delete studentsAccounts[i];
                delete students[msg.sender];
                studentsAccounts.length --;
            }
        }
        
        // Add student info
        student.signature = _signature;
        student.studentID = _studentID;
        student.firstName = _firstName;
        student.lastName = _lastName;
        student.gpa = _gpa;
        studentsAccounts.push(msg.sender) - 1;
        
        //Make student applicable for mining if the gpa is above 3
        if (student.gpa >= 300 && student.gpa <= 400){
            applicableStudents[msg.sender] = true;
        }
        else {
            applicableStudents[msg.sender] = false;
        }

        emit Verification(msg.sender, id);
        emit Authorization(msg.sender, id);
        emit StudentInfo(msg.sender, _studentID, _firstName, _lastName, _gpa);
    }
    
    function removeStudent(address _studentAddress, string id) public onlyControllingWallets{
        verified[_studentAddress] = false;
        applicableStudents[_studentAddress] = false;

        // Delete student from struct and mapping
        for(uint i = 0; i < studentsAccounts.length; i ++){
            if(_studentAddress == studentsAccounts[i]){
                studentsAccounts[i] = studentsAccounts[studentsAccounts.length - 1];
                delete studentsAccounts[i];
                delete students[_studentAddress];
                studentsAccounts.length --;
            }
        }

        emit Verification(_studentAddress,id);
        emit Authorization(_studentAddress, id);
    }
    
    function getAllStudents() view public returns(address[]) {
        return studentsAccounts;
    }
    
    function getOneStudent(address _address) view public returns (string, string, string, string, uint) {
        return (students[_address].signature, students[_address].studentID, students[_address].firstName, students[_address].lastName, students[_address].gpa);
    }
    
    function studentsNumber() view public returns (uint) {
        return studentsAccounts.length;
    }
    
    // change TGE starting date if more time needed for preparation
    function changeTgeStartBlock(uint256 newTgeStartBlock) external onlyMainWallet{
        require(block.number < tgeStartBlock);
        require(block.number < newTgeStartBlock);
        tgeStartBlock = newTgeStartBlock;
    }

    function changeTgeEndBlock(uint256 newTgeEndBlock) external onlyMainWallet{
        require(block.number < tgeEndBlock);
        require(block.number < newTgeEndBlock);
        tgeEndBlock = newTgeEndBlock;
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
        require(block.number > tgeEndBlock);
        setTrading = true;
    }

    // Disable transfers and allow them once token is tradeable
    function transfer(address _to, uint256 _value) isSetTrading returns (bool success){
        return super.transfer(_to, _value);
    }
    
    function transferFrom(address _from, address _to, uint256 _value) isSetTrading returns (bool success){
        return super.transferFrom(_from, _to, _value);
    }
    
    function haltTGE() external onlyMainWallet{
        haltTGE = true;
    }
    
    function unhaltTGE() external onlyMainWallet{
        haltTGE = false;
    }
    
    // Fallback function
    function() payable{
        require(tx.origin == msg.sender);
        buyTo(msg.sender);
    }
    
    
    /************************************************/
    /*       CODES FOR COMPLETE PROOF OF WORK       */
    /************************************************/
    
    // Proof of Work, elliptic curve cryptography + discrete logarithm problem + random hash
    // Field order
    uint256 constant order = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141;
    // Base point
    uint256 constant gx = 0x79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798;
    uint256 constant gy = 0x483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8;
    // Prime field
    uint256 constant n = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F;
    // Curve generation
    uint256 constant a = 0;
    uint256 constant b = 7;
    uint256 constant scalarField = 5;

    function EllipticCurve()
    {
    }

    function _jAdd( uint256 x1,uint256 z1, uint256 x2,uint256 z2) constant returns(uint256 x3,uint256 z3)
    {
        (x3, z3) = (  addmod( mulmod(z2, x1 , n) ,
                              mulmod(x2, z1 , n),
                              n),
                      mulmod(z1, z2 , n)
                    );
    }

    function _jSub( uint256 x1,uint256 z1, uint256 x2,uint256 z2) constant returns(uint256 x3,uint256 z3)
    {
        (x3, z3) = (  addmod( mulmod(z2, x1, n),
                              mulmod(n - x2, z1, n),
                              n),
                      mulmod(z1, z2 , n)
                    );
    }

    function _jMul( uint256 x1,uint256 z1, uint256 x2,uint256 z2) constant returns(uint256 x3,uint256 z3)
    {
        (x3, z3) = (  mulmod(x1, x2 , n), mulmod(z1, z2 , n));
    }

    function _jDiv( uint256 x1,uint256 z1, uint256 x2,uint256 z2) constant returns(uint256 x3,uint256 z3)
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

    function _ecAdd( uint256 x1,uint256 y1,uint256 z1, uint256 x2,uint256 y2,uint256 z2) constant returns(uint256 x3,uint256 y3,uint256 z3)
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

    function _ecDouble(uint256 x1,uint256 y1,uint256 z1) constant returns(uint256 x3,uint256 y3,uint256 z3)
    {
        (x3,y3,z3) = _ecAdd(x1,y1,z1,x1,y1,z1);
    }

    function _ecMul(uint256 d, uint256 x1,uint256 y1,uint256 z1) constant returns(uint256 x3,uint256 y3,uint256 z3)
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

    function publicKey(uint256 privKey) constant returns(uint256 qx, uint256 qy)
    {
        uint256 x;
        uint256 y;
        uint256 z;
        (x,y,z) = _ecMul(privKey, gx, gy, 1);
        z = _inverse(z);
        qx = mulmod(x , z ,n);
        qy = mulmod(y , z ,n);
    }

    function deriveKey(uint256 privKey, uint256 pubX, uint256 pubY) constant returns(uint256 qx, uint256 qy)
    {
        uint256 x;
        uint256 y;
        uint256 z;
        (x,y,z) = _ecMul(privKey, pubX, pubY, 1);
        z = _inverse(z);
        qx = mulmod(x , z ,n);
        qy = mulmod(y , z ,n);
    }
    
    // Multiply P in affine coordinates by scalar k
	function ellipticCurveMultiplicationAffine(uint256 k, uint256 x1, uint256 y1) constant returns(uint256 x3,uint256 y3){
    	uint256 remaining = k;
    	uint256 px = x1;
    	uint256 py = y1;
    	uint256 acx = 0;
    	uint256 acy = 0;

    	if (k == 0){
        	return (0, 0);
    	}
    	while (remaining != 0){
        	if ((remaining & 1) != 0){
            	(acx, acy) = ellipticCurveAdditionAffine(acx, acy, px, py);
        	}
        	remaining = remaining / 2;
        	(px, py) = ellipticCurveDoublingAffine(px, py);
    	}
        (x3, y3) = (acx, acy);
	}
	
	// Add P and Q in affine coordinates
	function ellipticCurveAdditionAffine(uint256 x1, uint256 y1, uint256 x2, uint256 y2) constant returns (uint256 x3, uint256 y3){
        if((x1 == 0) && (y1 == 0)){
        	return (x2, y2);
    	}
    	if((x2 == 0) && (y2 == 0)){
        	return (x1, y1);
    	}
    	if(x1 == x2){
    	    if (y1 == y2){
    	    uint256 numerator = addmod(mulmod(3, mulmod(x1, x1, n), n), a, n);
    	    uint256 denominator = mulmod(2, y1, n);
    	    }
    	}
    	else{
    	    numerator = addmod(y2, n - y1, n);
    	    denominator = addmod(x2, n - x1, n);
    	}
    	x3 = addmod(addmod(mulmod(numerator * _inverse(denominator), numerator * _inverse(denominator), n), n - x1, n), n - x2, n);
    	y3 = addmod(addmod(mulmod(numerator * _inverse(denominator), x1, n), mulmod(numerator * _inverse(denominator), n - x3, n), n), n - y1, n);
    	
    	(x3, y3);
    }
	
	// Double (Px, Py) in affine coordinates
	function ellipticCurveDoublingAffine(uint256 x1, uint256 y1) constant returns(uint256 x3, uint256 y3){
    	(x3, y3) = ellipticCurveAdditionAffine(x1, y1, x1, y1);
	}
	
	// Check if a point modulo n lies on the curve
    // No need for z1, only checks affine coordinates
    function onCurveChecker(uint256 x1, uint256 y1) constant returns (bool){
        if (0 == x1 || x1 == n || 0 == y1 || y1 == n){ // Point at infinity
            return false;
        }
        uint256 LHS = mulmod(y1, y1, n);
        uint256 RHS = addmod(addmod(mulmod(mulmod(x1, x1, n), x1, n), x1 * a, n), b, n);
        return LHS == RHS;
    }
    
    // Find the discrete logarithm over prime field n under addition
	function ellipticCurveDiscreteLogarithmAffine(uint256 privKey) public {
   	    uint256 k = uint256(keccak256(block.timestamp)) % scalarField + 1;
   	    (uint256 qx, uint256 qy) = publicKey(privKey);
   	    (uint256 Qx, uint256 Qy) = ellipticCurveMultiplicationAffine(k, qx, qy);
   	    
   	    for (uint256 i = 1; i <= scalarField + 1; i++){
        	(uint256 x3, uint256 y3) = ellipticCurveMultiplicationAffine(i, qx, qy);
        	if (x3 == Qx && y3 == Qy){
            	uint256 discreteLogarithm = i;
        	}
    	}

    }
    
    // Find out if the student info is signed by the student himself
        function isSigned(bytes32 hash, uint8 v, bytes32 r, bytes32 s) constant returns(address) {
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedHash = keccak256(prefix, hash);
        return ecrecover(prefixedHash, v, r, s);
    }
    
    // Mining function for reward
    function proofOfWork(uint256 privKey) miningAllowed public {
        uint256 newTokens =  250 * 1e18; //Student reward
        
        ellipticCurveDiscreteLogarithmAffine(privKey);
        balances[msg.sender] += newTokens; 
        
        totalSupply = safeAdd(totalSupply, newTokens); //Add the newly created tokens to the total supply 
        
        applicableStudents[msg.sender] = false;
    }
}
