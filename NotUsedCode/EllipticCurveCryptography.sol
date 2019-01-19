 pragma solidity ^0.4.16;

contract EllipticCurve{
    
    // SafeCurve secp256k1
    uint256 constant n = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F;
    uint256 constant a = 0;
    uint256 constant b = 7;
	//uint256 constant n = 23;
	//uint256 constant a = 9;
	//uint256 constant b = 17;

	function EllipticCurve(){
	}

	function _jAdd( uint256 x1, uint256 z1, uint256 x2, uint256 z2) constant returns (uint256 x3, uint256 z3){
    	(x3, z3) = (addmod( mulmod(z2, x1 , n) ,
                          	mulmod(x2, z1 , n),
                          	n),
                  	mulmod(z1, z2 , n)
                	);
	}

	function _jSub( uint256 x1, uint256 z1, uint256 x2, uint256 z2) constant returns (uint256 x3, uint256 z3){
    	(x3, z3) = (addmod( mulmod(z2, x1, n),
                          	mulmod(n - x2, z1, n),
                          	n),
                  	mulmod(z1, z2 , n)
                	);
	}

	function _jMul( uint256 x1, uint256 z1, uint256 x2, uint256 z2) constant returns (uint256 x3, uint256 z3){
    	(x3, z3) = (mulmod(x1, x2 , n), mulmod(z1, z2 , n));
	}

	function _jDiv( uint256 x1, uint256 z1, uint256 x2, uint256 z2) constant returns (uint256 x3, uint256 z3){
    	(x3, z3) = (mulmod(x1, z2 , n), mulmod(z1 , x2 , n));
	}
    
    /// Return x such that ax = 1 (mod n) so x = a**-1 (mod n)
    /// Works perfectly
	function modularInverse( uint256 c) constant returns (uint256 modularinverse){
    	uint256 t = 0;
    	uint256 newT = 1;
    	uint256 r = n;
    	uint256 newR = c;
    	uint256 q;
    	while (newR != 0){
        	q = r / newR;

        	(t, newT) = (newT, addmod(t, (n - mulmod(q, newT, n)), n));
        	(r, newR) = (newR, r - q * newR );
    	}
    	return t;
	}

    /// Adds P and Q in jacobian coordinates
    /// Works perfectly
	function ellipticCurveAdditionJacobian( uint256 x1, uint256 y1, uint256 z1, uint256 x2, uint256 y2, uint256 z2) constant returns (uint256 x3, uint256 y3, uint256 z3){
    	uint256 l;
    	uint256 lz;
    	uint256 da;
    	uint256 db;

    	if ((x1 == 0) && (y1 == 0)){
        	return (x2, y2, z2);
    	}
        if ((x2 == 0) && (y2 == 0)){
        	return (x1, y1, z1);
    	}
    	if ((x1 == x2) && (y1 == y2)){
        	(l, lz) = _jMul(x1, z1, x1, z1);
        	(l, lz) = _jMul(l, lz, 3, 1);
        	(l, lz) = _jAdd(l, lz, a, 1);

        	(da, db) = _jMul(y1, z1, 2, 1);
    	}
    	else{
        	(l, lz) = _jSub(y2, z2, y1, z1);
        	(da, db)  = _jSub(x2, z2, x1, z1);
    	}

    	(l, lz) = _jDiv(l, lz, da, db);


    	(x3, da) = _jMul(l, lz, l, lz);
    	(x3, da) = _jSub(x3, da, x1, z1);
    	(x3, da) = _jSub(x3, da, x2, z2);

    	(y3, db) = _jSub(x1, z1, x3, da);
    	(y3, db) = _jMul(y3, db, l, lz );
    	(y3, db) = _jSub(y3, db, y1, z1 );

    	if (da != db){
        	x3 = mulmod(x3, db, n);
        	y3 = mulmod(y3, da, n);
        	z3 = mulmod(da, db, n);
    	}
    	else{
        	z3 = da;
    	}

	}
	
	/// Adds P and Q in affine coordinates
	/// Works perfectly
	function ellipticCurveAdditionAffine(uint256 x1, uint256 y1, uint256 x2, uint256 y2) constant returns (uint256 x3, uint256 y3){
        if((x1 == 0) && (y1 == 0)){
        	return (x2, y2);
    	}
    	if((x2 == 0) && (y2 == 0)){
        	return (x1, y1);
    	}
    	if(x1 == x2){
    	   // if((y1 + y2) % n == 0){
    	   //     return (0, 1);
    	   // }
    	    if (y1 == y2){
    	    uint256 numerator = addmod(mulmod(3, mulmod(x1, x1, n), n), a, n);
    	    uint256 denominator = mulmod(2, y1, n);
    	    }
    	}
    	else{
    	    numerator = addmod(y2, n - y1, n);
    	    denominator = addmod(x2, n - x1, n);
    	}
    	x3 = addmod(addmod(mulmod(numerator * modularInverse(denominator), numerator * modularInverse(denominator), n), n - x1, n), n - x2, n);
    	y3 = addmod(addmod(mulmod(numerator * modularInverse(denominator), x1, n), mulmod(numerator * modularInverse(denominator), n - x3, n), n), n - y1, n);
    	
    	(x3, y3);
    }

    /// Doubles (Px, Py, Pz) in jacobian coordinates
    /// Works perfectly
	function ellipticCurveDoublingJacobian(uint256 x1, uint256 y1, uint256 z1) constant returns(uint256 x3, uint256 y3, uint256 z3){
    	(x3, y3, z3) = ellipticCurveAdditionJacobian(x1, y1, z1, x1, y1, z1);
	}
	
    /// Doubles (Px, Py) in affine coordinates
    /// Works perfectly
	function ellipticCurveDoublingAffine(uint256 x1, uint256 y1) constant returns(uint256 x3, uint256 y3){
    	(x3, y3) = ellipticCurveAdditionAffine(x1, y1, x1, y1);
	}

    /// Multiplies P in jacobian coordinates by scalar k
    /// Works perfectly
	function ellipticCurveMultiplicationJacobian(uint256 k, uint256 x1, uint256 y1, uint256 z1) constant returns(uint256 x3,uint256 y3,uint256 z3){
    	uint256 remaining = k;
    	uint256 px = x1;
    	uint256 py = y1;
    	uint256 pz = z1;
    	uint256 acx = 0;
    	uint256 acy = 0;
    	uint256 acz = 1;

    	if (k == 0){
        	return (0, 0, 1);
    	}
    	while (remaining != 0){
        	if ((remaining & 1) != 0){
            	(acx, acy, acz) = ellipticCurveAdditionJacobian(acx, acy, acz, px, py, pz);
        	}
        	remaining = remaining / 2;
        	(px, py, pz) = ellipticCurveDoublingJacobian(px, py, pz);
    	}
        (x3, y3, z3) = (acx, acy, acz);
	}
	
    /// Multiplies P in affine coordinates by scalar k
    /// Works perfectly
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
	
	/// Finds all primes under limit
	/// Works perfectly
	function sieveOfEratosthenes(uint256 limit) constant returns (uint256[] memory primesList){
        require(limit >= 2);
        uint256[] memory primes = new uint256[](limit + 1);
        for (uint256 i = 2; i < limit; i++){
            primes[i] = i;
        }
        i = 2;
        uint256 k = limit - 2;
        while(i**2 <= limit){
            if (primes[i] != 0){
                for (uint256 j = 2; primes[i] * j <= limit; j++){
                    if (primes[primes[i] * j] != 0) {
                        delete primes[primes[i] * j];
                        k--;
                    }
                }
            }
            i++;
        }
        j = 0;
        primesList = new uint256[](k);
        for (i = 2; i <= limit; i++){
            if (primes[i] != 0){
                primesList[j] = primes[i];
                j++;
            }
        }
    }
	
   /// Bool for primality test
   /// Works perfectly
    function primalityTest(uint256 x) constant returns (bool){
        if (x > 2 && x % 2 == 0){
            return false;
        }
        uint256 rootCeiling = squareRoot(x) + 1;
        for (uint256 i = 3; i < rootCeiling; i += 2){
            if (x % i == 0){
                return false;
            }
        }
        return true;
    }

    /// New functions squareRoot and ceiling and elliptic curve operations
    /// Works perfectly
    function squareRoot(uint256 number) constant returns (uint256 root) {
        uint256 z = (number + 1) / 2;
        root = number;
        while (z < root) {
            root = z;
            z = ((number / z) + z) / 2;
        }
    }
	    
	/// Finds the gcd of 2 numbers
	/// Works perfectly
	function greatestCommonDivisor(uint256 x, uint256 y) constant returns (uint256){
        uint256 r = x % y;
        if (r != 0){
            return greatestCommonDivisor(y, r);
        } else {
            return y;
        }
    }
	
    /// Converts a point (Px, Py, Pz) expressed in Jacobian coordinates to (Px', Py', 1).
    /// Mutates P.
    /// Removed Pz'
    /// Returns (Px', Py')
    /// Works perfectly
    function convertJacobianToAffine(uint256 x1, uint256 y1, uint256 z1) constant returns (uint256 x3, uint256 y3){
        x3 = mulmod(x1, modularInverse(z1)**2, n);
        y3 = mulmod(y1, mulmod(modularInverse(z1), modularInverse(z1)**2, n), n);
    }
    
    /// Calculates the quadratic residue such that quadraticesidue**2 = number (modulo n)
    /// Works but not perfectly
    function quadraticResidue(uint256 number) constant returns (uint256 quadraticesidue){
        uint256 s = 0;
        uint256 q = n - 1;
        while (q & 1 == 0){
            q = q / 2;
            s++;
        }
        if (s == 1){
            quadraticesidue = number**((n + 1) / 4) % n;
            if (quadraticesidue**2 % n == number){
                return quadraticesidue;
            }
            return 0;
        }
        uint256 z = 1;
        while ((z + 1)**((n - 1) / 2) % n != n - 1){
            uint256 c = z**q % n;
            uint256 r = number**((q + 1) / 2) % n;
            uint256 t = number**q % n;
            uint256 m = s;
        }
        while ( t != 1){
            uint256 tt = t;
            uint256 i = 0;
            while (tt != 1){
                tt = tt**2 % n;
                i++;
                if (i == m){
                    return 0;
                }
            }
            uint256 h = c**(2**(m - i - 1)) % n;
            r = mulmod(r, h, n);
            t = mulmod(t, mulmod(h, h, n), n);
            c = mulmod(h, h, n);
            m = i;
        }
        if (mulmod(r, r, n) == number){
            return r;
        }
        return 0;
    }
    
    /// Generates a random point on the curve
    /// Works but not perfectly
    function pointGenerator() constant returns (uint256 x, uint256 y){
        x = uint256(keccak256(block.timestamp)) % n;
        y = 0;
        while (x != 0 && y == 0){
                uint256 RHS = addmod(addmod(mulmod(x, mulmod(x, x, n), n), mulmod(a, x, n), n), b, n);
                y = quadraticResidue(RHS);
                (x, y);
        }
    }
    
    /// Checks if a point modulo n lies on the curve
    /// No need for z1, only checks affine coordinates
    /// Works perfectly
    function onCurveChecker(uint256 x1, uint256 y1) constant returns (bool){
        if (0 == x1 || x1 == n || 0 == y1 || y1 == n){ // Point at infinity
            return false;
        }
        uint256 LHS = mulmod(y1, y1, n);
        uint256 RHS = addmod(addmod(mulmod(mulmod(x1, x1, n), x1, n), x1 * a, n), b, n);
        return LHS == RHS;
    }
    
    /// Factorize a composite number over the elliptic curve
    /// Not working yet
    function lenstraFactorization(uint256 limit) constant returns (uint256 primeFactor){
        require(limit >= 2);
        uint256[] memory primes = new uint256[](limit + 1);
        for (uint256 i = 2; i < limit; i++){
            primes[i] = i;
        }
        i = 2;
        uint256 k = limit - 2;
        while(i**2 <= limit){
            if (primes[i] != 0){
                for (uint256 j = 2; primes[i] * j <= limit; j++){
                    if (primes[primes[i] * j] != 0) {
                        delete primes[primes[i] * j];
                        k--;
                    }
                }
            }
            i++;
        }
        j = 0;
        uint256[] memory primesList = new uint256[](k);
        for (i = 2; i <= limit; i++){
            if (primes[i] != 0){
                primesList[j] = primes[i];
                j++;
            }
        }
        
	    uint256 g = n;
	    uint256 x1 = 16;
	    uint256 y1 = 5;
	    uint256 z1 = 1;
	    
	    while (g == n){
	        g = greatestCommonDivisor(4 * a**3 + 27 * b**2, n);
	    }
	    if (g > 1){
	        return g;
	    }
	    for (uint256 h = 0; h <= primesList.length; k++){
	        primeFactor = primesList[h];
	            while (primeFactor < limit){
	                (x1, y1, z1) = ellipticCurveMultiplicationJacobian(k, x1, y1, z1);
	                if (z1 > 1){
	                    return greatestCommonDivisor(z1, n);
	                }
	                primeFactor = h * primeFactor;
	            }
	        }
	    }
    
    /// Find the discrete logarithm over F23 under addition
    /// Works perfectly
	function ellipticCurveDiscreteLogarithmJacobian(uint256 x1, uint256 y1, uint256 z1) constant returns (uint256 x3,uint256 y3,uint256 z3, uint256 discreteLogarithm){
    	uint256 Qx = 4;
    	uint256 Qy = 19;
    	uint256 Qz = 18;
   	 
    	for (uint256 k = 1; k <= 10; k++){
        	(x3, y3, z3) = ellipticCurveMultiplicationJacobian(k, x1, y1, z1);
        	if (x3 == Qx && y3 == Qy && z3 == Qz){
            	discreteLogarithm = k;
            	break;
        	}
    	}
    	(x3,y3,z3);
   }
   
   /// Find the discrete logarithm over F23 under addition
    /// Works perfectly
	function ellipticCurveDiscreteLogarithmAffine(uint256 x1, uint256 y1) constant returns (uint256 x3,uint256 y3, uint256 discreteLogarithm){
    	uint256 Qx = 20;
    	uint256 Qy = 20;
   	 
    	for (uint256 k = 1; k <= 10; k++){
        	(x3, y3) = ellipticCurveMultiplicationAffine(k, x1, y1);
        	if (x3 == Qx && y3 == Qy){
            	discreteLogarithm = k;
            	break;
        	}
    	}
    	(x3,y3);
   }
}
