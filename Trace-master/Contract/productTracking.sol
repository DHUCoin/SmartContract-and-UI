pragma solidity ^ 0.4.7;

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

    function () public {
        // If anyone wants to send Ether to this contract, the transaction gets rejected
        throw;
    }

   using strings for *;

   struct StudentInfoStruct{
       // description of the action.
        string description;
       // admin that adds a student's action
        address actionAdmin;
        // Reference to its database contract.
        address DATABASE_CONTRACT;
        // indicates the studentName of a product.
        string studentName;
        // Student number
        string studentId;
        // GPA
        string gpa;
        // Refence to its seminar
        address seminarAddress;
        // Instant of time when the StudentHistory is done.
        uint timestamp;
        // Block when the StudentHistory is done.
        uint blockNumber;
    }

    // holds the students info
    StudentInfoStruct[] public studentInfo;

    /////////////////
    // Constructor //
    /////////////////

    /* _studentName The studentName of the Student
       _additionalInformation Additional information about the Student
       _ownerProducts Addresses of the seminar of the Student.
       _DATABASE_CONTRACT Reference to its database contract
       _Admin Reference to its product factory */
    function Student(string _studentInfo, address seminarAddr, address databaseAddr) public {

        InsertStudentInfo(_studentInfo, seminarAddr, databaseAddr);

        Database database = Database(databaseAddr);
        database.storeStudentReference(this, seminarAddr, "", "", "");
    }

    // Insert or update student info
    function InsertStudentInfo(string _studentInfo, address seminarAddr, address databaseAddr){

        var s = _studentInfo.toSlice();
        var delim = ".".toSlice();
        var studentInfoSliced = new string[](s.count(delim) + 1);
        for(uint i = 0; i < studentInfoSliced.length; i++) {
            studentInfoSliced[i] = s.split(delim).toString();
        }

        // input must have four parameters
        if(studentInfoSliced.length != 4)throw;

        // make a new student object
        StudentInfoStruct memory newStudentInfo;

        newStudentInfo.description = studentInfoSliced[0]; //description
        newStudentInfo.actionAdmin = msg.sender;
        newStudentInfo.DATABASE_CONTRACT = databaseAddr; // database address
        newStudentInfo.studentName = studentInfoSliced[1]; // student name
        newStudentInfo.studentId = studentInfoSliced[2]; //student id
        newStudentInfo.gpa = studentInfoSliced[3]; // student gpa
        newStudentInfo.seminarAddress = seminarAddr; // seminar address
        newStudentInfo.timestamp = now; 
        newStudentInfo.blockNumber = block.number;

        studentInfo.push(newStudentInfo);
    }


    /* Function to add an StudentHistory to the product.
       _description The description of the StudentHistory.
       _newProductNames In case that this StudentHistory creates more students from
              this Student, the names of the new students should be provided here.
       _newProductsAdditionalInformation In case that this StudentHistory creates more students from
              this Student, the additional information of the new students should be provided here.
       _consumed True if the product becomes consumed after the action. */
      function updateStudentInfo(string newStudentInfo, address seminarAddr, address databaseAddr) {

        // throw if no student info is present prior to updating the student info
        if(studentInfo.length < 1)throw;
        InsertStudentInfo(newStudentInfo, seminarAddr, databaseAddr);
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
}