// SPDX-License-Identifier: GPL-3.0

pragma solidity >0.8.0 <=0.8.19;

contract feedback_system{

struct Admin{
    string Name;
    address ID;
}

struct Teacher {
    string name;
    address ID;
    int votes;
    uint8 ratingSum;
    uint numRatings;
}


struct Student {
    string name;
    address rollno;
}

Admin public CheifAdmin;
Admin[] public Admins;
Teacher[] public T_Data;
Student[] public S_Data;

mapping(uint => Teacher) public AddTeacherID;
//key=>value
mapping(uint => Student) public AddStudentID;

mapping(uint => Admin) public AddAdminID;


constructor(string memory _name) {
    CheifAdmin=Admin(_name,msg.sender);
}

modifier onlyCheifAdmin{
    require(msg.sender == CheifAdmin.ID,"Only CheifAdmin have the access");
    _;
}

modifier onlyAdmin{
   
   bool isAdmin=false;
   
   for(uint i=0;i < Admins.length;i++)
   {
      if(msg.sender==Admins[i].ID)
      {
          isAdmin=true;
          break;
      }
     
     require(isAdmin,"Only Admin have the access ");
    _;
   }

}

modifier OnlyStudent{
    
    bool isStudent=false;

    for(uint i=0;i < S_Data.length;i++)
    {    
        if(msg.sender==S_Data[i].rollno)
        {
          isStudent=true;
          break;
        }

    }
    require(isStudent,"Only Bonafied Students can allow this");
    _;



}



function AddTeacher(uint electionID, string memory t_name, address _ID) onlyAdmin public {
    AddTeacherID[electionID] = Teacher(t_name, _ID, 0, 0, 0);

    Teacher memory NewTeacher = Teacher(t_name, _ID, 0, 0, 0);

    T_Data.push(NewTeacher);
}


function AddStudent(uint studentID,string memory s_name,address _rollno) onlyAdmin public
{
  AddStudentID[studentID]=Student(s_name,_rollno);

  Student memory NewStudent= Student(s_name,_rollno);

  S_Data.push(NewStudent);
    
}

function AddAdmin(uint AdminID,string memory A_name,address A_ID) public onlyCheifAdmin{

 AddAdminID[AdminID]= Admin(A_name,A_ID);

}




function RateTeacher(uint electionID, string memory t_name, address _ID, uint8 rating) OnlyStudent public {
    bool hasVoted = false;
    bytes memory namehash = abi.encodePacked(t_name);

    for (uint i = 0; i < T_Data.length; i++) {
        if ((electionID != 0 && electionID == i) || 
            (keccak256(namehash) == keccak256(bytes(T_Data[i].name))) || 
            (_ID != address(0) && _ID == T_Data[i].ID)) {
            
            require(!hasVoted, "You have already rated this teacher");

            T_Data[i].votes++;
            T_Data[i].ratingSum += rating;
            T_Data[i].numRatings++;
            hasVoted = true;
        }
    }

    require(hasVoted, "Teacher not found");
}






function Vote(uint electionID) OnlyStudent public
{
    bool hasVoted=false;

    for(uint i=0;i<T_Data.length;i++)
    {
        if(electionID == i)
        {
            require(!hasVoted,"You have already voted for this Teacher");

            T_Data[i].votes++;
          
            hasVoted=true;
    
    
        }

        require(hasVoted,"Teacher not found");
    }
    
}






function Vote( string memory _name) OnlyStudent public
{
   bytes memory namehash = abi.encodePacked(_name);
     

    bool hasVoted=false;

    for(uint i=0;i<T_Data.length;i++)
    {

        if(keccak256(namehash) == keccak256(bytes(T_Data[i].name)))
        {
            require(!hasVoted,"You have already voted for this Teacher");

            T_Data[i].votes++;
          
            hasVoted=true;
    
    
        }

        require(hasVoted,"Teacher not found");
    }
    
}


function Vote(address _ID) OnlyStudent public
{

    bool hasVoted=false;
     
            for(uint i=0;i<T_Data.length;i++)
           {
               if( keccak256(abi.encodePacked(_ID)) == keccak256(abi.encodePacked(T_Data[i].ID)))
                                               {
                require(!hasVoted,"You have already voted for this Teacher");

                T_Data[i].votes++;
          
                hasVoted=true;
    
                   }

        require(hasVoted,"Teacher not found");
    }
    
}


}