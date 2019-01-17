pragma solidity ^ 0.4 .7;

import "github.com/Arachnid/solidity-stringutils/strings.sol";

contract owned {

    address public admin;

    function owned() public {
        admin = msg.sender;
    }

    modifier onlyOwner {
        if (msg.sender != admin) throw;
        _;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        admin = newOwner;
    }
}

contract Database is owned {

    // addresses of the Products referenced in this database
    address[] public students;

    // sturuct to hold the students owned by a handler and the handler info 
    struct SeminarStudents {
        // Addresses of students owned by Handler
        address[] _studentsInSeminar;
        // seminar name
        string _seminarName;
        // Name of the seminar
        string _seminarTeacher;
        // Information about the seminar
        string _additionalSeminarInfo;
    }

    // Addresses  of all the seminars
    address[] public seminars;

    // Relates a handler address to the handler students and handler info
    mapping(address => SeminarStudents) studentsInSeminars;

    function Database() public {}

    function () public {
        // If anyone wants to send Ether to this contract, the transaction gets rejected
        throw;
    }    

    /* Function to add a product reference
     productAddress address of the product */
    function storeStudentReference(address _studentAddress, address _seminar, string _seminarName, string _seminarTeacher, string _seminarInfo) public {
        students.push(_studentAddress);

        if (seminars.length == 0) {
            seminars.push(_seminar);
            addStudentToSeminar(_seminar, _seminarName, _seminarTeacher, _seminarInfo, _studentAddress);
        } else {
            if (!isSeminarPresent(_seminar)) {
                seminars.push(_seminar);
                addStudentToSeminar(_seminar, _seminarName, _seminarTeacher, _seminarInfo, _studentAddress);
            } else {
                addStudentToSeminar(_seminar, _seminarName, _seminarTeacher, _seminarInfo, _studentAddress);
            }
        }
    }

    /* Function to check if the handler already
     exists in the database or not*/
    function isSeminarPresent(address seminarAddress) view private returns(bool) {
        for (uint i = 0; i < seminars.length; i++) {
            if (seminars[i] == seminarAddress) {
                return true;
            }
        }
    }

    /* Function to add a product and the product information */
    function addStudentToSeminar(address _seminarAddress, string _seminarName, string _seminarTeacher, string _seminarInfo, address _studentAddress) private {
        studentsInSeminars[_seminarAddress]._studentsInSeminar.push(_studentAddress);
        studentsInSeminars[_seminarAddress]._seminarName = _seminarName;
        studentsInSeminars[_seminarAddress]._seminarTeacher = _seminarTeacher;
        studentsInSeminars[_seminarAddress]._additionalSeminarInfo = _seminarInfo;
    }

    /* Function to list all the students present
     in the database*/
    function getAllStudents() view public returns(address[]) {
        return students;
    }
    
    function getAllSeminars() view public returns(address[]) {
        return seminars;
    }

    /* Function to list all the students owened 
       by a handler present in the database*/
    function getSeminar(address _address) view public returns(string, string, string, address[]) {
        return (studentsInSeminars[_address]._seminarName, studentsInSeminars[_address]._seminarTeacher, studentsInSeminars[_address]._additionalSeminarInfo, studentsInSeminars[_address]._studentsInSeminar);
    }
}


contract Student {
   using strings for *;
   struct StudentStruct{
        // Reference to its database contract.
        address DATABASE_CONTRACT;
        // indicates the studentName of a product.
        string studentName;
        // Student number
        string studentId;
        // GPA
        uint gpa;
        // Additional information about the Student, generally as a JSON object
        string additionalInformation;
        // Refence to its seminar
        address seminar;
        // Handler's studentName
        string seminarName;
        // Handler's studentName
        string seminarTeacher;
        // Handler's info
        string seminarInfo;
    }

    // holds the students info
    StudentStruct public student;

    // Reference to its product category.
    address public Admin;

    // addresses of the students which are built by this Student.
    address[] public childProducts;

    // This struct represents an action realized by a handler on the product.
    struct StudentHistory {
        // description of the action.
        string description;
        // address of the product's seminar
        address seminar;
        // Instant of time when the StudentHistory is done.
        uint timestamp;
        // Block when the StudentHistory is done.
        uint blockNumber;
        //old gpa
        uint oldGpa;
    }

    // all the actions which have been applied to the Student.
    StudentHistory[] public actions;

    /////////////////
    // Constructor //
    /////////////////

    /* _studentName The studentName of the Student
       _additionalInformation Additional information about the Student
       _ownerProducts Addresses of the seminar of the Student.
       _DATABASE_CONTRACT Reference to its database contract
       _Admin Reference to its product factory */
    function Student(string _studentInfo, address _seminarAddress, address _DATABASE_CONTRACT, uint _gpa) public {

        var s = _studentInfo.toSlice();
        var delim = ".".toSlice();
        var studentInfoSliced = new string[](s.count(delim) + 1);
        for(uint i = 0; i < studentInfoSliced.length; i++) {
            studentInfoSliced[i] = s.split(delim).toString();
        }

        StudentStruct memory newStudent;
        newStudent.studentId = studentInfoSliced[0];
        newStudent.studentName = studentInfoSliced[1];
        newStudent.additionalInformation = studentInfoSliced[2];
        newStudent.seminarName = studentInfoSliced[3];
        newStudent.seminarTeacher = studentInfoSliced[4];
        newStudent.seminarInfo = studentInfoSliced[5];
        newStudent.seminar = _seminarAddress;
        newStudent.DATABASE_CONTRACT = _DATABASE_CONTRACT;
        newStudent.gpa = _gpa;

        student = newStudent;

        Admin = msg.sender;

        StudentHistory memory creation;
        creation.description = "Student creation";
        creation.seminar = _seminarAddress;
        creation.timestamp = now;
        creation.blockNumber = block.number;
        creation.oldGpa = _gpa;

        actions.push(creation);

        Database database = Database(_DATABASE_CONTRACT);
        database.storeStudentReference(this, _seminarAddress, studentInfoSliced[3], studentInfoSliced[4], studentInfoSliced[5]);
    }

    function () public {
        // If anyone wants to send Ether to this contract, the transaction gets rejected
        throw;
    }

    /* Function to add an StudentHistory to the product.
       _description The description of the StudentHistory.
       _newProductNames In case that this StudentHistory creates more students from
              this Student, the names of the new students should be provided here.
       _newProductsAdditionalInformation In case that this StudentHistory creates more students from
              this Student, the additional information of the new students should be provided here.
       _consumed True if the product becomes consumed after the action. */
    //   function addAction(bytes32 description, bytes32[] newProductsNames, bytes32[] newProductsAdditionalInformation, bool _consumed) {
    //     if (newProductsNames.length != newProductsAdditionalInformation.length) throw;

    //     StudentHistory memory action;
    //     action.handler = msg.sender;
    //     action.description = description;
    //     action.timestamp = now;
    //     action.blockNumber = block.number;

    //     actions.push(action);

    //     Seminar productFactory = Seminar(Admin);

    //     for (uint i = 0; i < newProductsNames.length; ++i) {
    //       address[] memory ownerProducts = new address[](1);
    //       ownerProducts[0] = this;
    //       productFactory.createStudent(newProductsNames[i], newProductsAdditionalInformation[i], ownerProducts, DATABASE_CONTRACT);
    //     }

    //     isConsumed = _consumed;
    //   }

    /* Function to merge some students to build a new one.
       otherProducts addresses of the other students to be merged.
       newProductsName Name of the new product resulting of the merge.
       newProductAdditionalInformation Additional information of the new product resulting of the merge.*/
    //   function merge(address[] otherProducts, bytes32 newProductName, bytes32 newProductAdditionalInformation) {
    //     Seminar productFactory = Seminar(Admin)
    //     address newProduct = productFactory.createStudent(newProductName, newProductAdditionalInformation, otherProducts, DATABASE_CONTRACT);

    //     this.collaborateInMerge(newProduct);
    //     for (uint i = 0; i < otherProducts.length; ++i) {
    //       Student prod = Student(otherProducts[i]);
    //       prod.collaborateInMerge(newProduct);
    //     }
    //   }

    /* Function to collaborate in a merge with some students to build a new one.
       newProductsAddress Address of the new product resulting of the merge. */
    function collaborateInMerge(address newStudentAddress, uint gpa) public {
        childProducts.push(newStudentAddress);

        StudentHistory memory action;
        action.seminar = this;
        action.description = "Collaborate in merge";
        action.timestamp = now;
        action.blockNumber = block.number;
        action.oldGpa = gpa;

        actions.push(action);
    }
}


contract Seminar {

    /////////////////
    // Constructor //
    /////////////////

    function Seminar() public {}

    function () public {
        // If anyone wants to send Ether to this contract, the transaction gets rejected
        throw;
    }

    /* Function to create a Student
       _studentName The studentName of the Student
       _additionalInformation Additional information about the Student
       _ownerProducts Addresses of the seminar of the Student.
       _DATABASE_CONTRACT Reference to its database contract */
    function createStudent(string _studentInfo, address DATABASE_CONTRACT, uint _gpa) public returns(address) {
        return new Student(_studentInfo, this, DATABASE_CONTRACT, _gpa);
    }
}
