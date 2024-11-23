// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract DistributedVoting {
    constructor() {
        admins[msg.sender] = true;
    }

    // Variable
    struct Voter {
        address voterAddress;
        string voterName;
        int256 voterAge;
        bool voterExists;
        bool registered;
        bool voted;
    }

    struct Candidate {
        string candidateName;
        bool exists;
        int256 voteCount;
    }

    enum State {
        NotStarted,
        Running,
        Ended
    }

    State public state;

    // Lists
    Candidate[] public candidateList;
    Voter[] public voterList;

    // Mappings
    mapping(address => bool) admins;
    mapping(string => Candidate) candidates;
    mapping(address => Voter) voters;

    // Modifiers
    modifier onlyAdmin() {
        require(admins[msg.sender] == true, "Not Admin");
        _;
    }

    modifier isVoter(address _address) {
        require(voters[_address].registered == true, "Not Registered");
        _;
    }

    modifier candidateExists(string memory name) {
        require(candidates[name].exists == true, "Candidate does not exist");
        _;
    }

    modifier notStarted() {
        require(state == State.NotStarted, "Election already started");
        _;
    }

    modifier running() {
        require(state == State.Running, "Election has Ended");
        _;
    }

    modifier ended() {
        require(state == State.Ended, "Election Running or not started");
        _;
    }

    modifier notVoted() {
        require(voters[msg.sender].voted == false, "Already voted");
        _;
    }
    modifier isVerified() {
        require(voters[msg.sender].registered == true, "you are not verified");
        _;
    }

    modifier notAdmin() {
        require(admins[msg.sender] == false, "Admin cannot Vote");
        _;
    }

    modifier candidateNotExists(string memory name) {
        require(candidates[name].exists == false, "Candidate already exists");
        _;
    }

    modifier voterNotExists(address _address) {
        require(voters[_address].voterExists == false, "Already Registered");
        _;
    }

    // Functions
    function checkAdmin() public view returns (bool) {
        return admins[msg.sender];
    }

    function getState() public view returns (State) {
        return state;
    }

    function addCandidate(string memory name)
        public
        onlyAdmin
        candidateNotExists(name)
        notStarted
    {
        candidates[name] = Candidate({
            candidateName: name,
            exists: true,
            voteCount: 0
        });
        candidateList.push(candidates[name]);
    }

    function getCandidate(string memory name)
        public
        view
        candidateExists(name)
        returns (Candidate memory candidate)
    {
        candidate = candidates[name];
        return (candidate);
    }

    function getAllCandidates() public view returns (Candidate[] memory) {
        return candidateList;
    }

    function startElection() public onlyAdmin notStarted {
        state = State.Running;
    }

    function endElection() public onlyAdmin running {
        state = State.Ended;
    }

    function resetElection() public onlyAdmin {
        state = State.NotStarted;
    }

    function registerVoter(string memory name, int256 age)
        public
        notAdmin
        notStarted
        voterNotExists(msg.sender)
    {
        require(age >= 18, "Underage cannot vote");
        voters[msg.sender] = Voter({
            voterAddress: msg.sender,
            voterName: name,
            voterAge: age,
            voterExists: true,
            registered: false,
            voted: false
        });
        voterList.push(voters[msg.sender]);
    }

    function indexOf(Voter storage searchedVoter)
        private
        view
        returns (uint256)
    {
        for (uint256 i = 0; i < voterList.length; i++) {
            if (voterList[i].voterAddress == searchedVoter.voterAddress) {
                return i;
            }
        }
        return voterList.length + 1;
    }

    function verifyVoter(address voter) public onlyAdmin notStarted {
        require(voters[voter].voterExists == true, "Voter does not exist");
        voters[voter].registered = true;

        uint256 _index = indexOf(voters[voter]);
        voterList[_index].registered = true;
    }

    function getAllVoters() public view onlyAdmin returns (Voter[] memory) {
        return voterList;
    }

    function castVote(string memory name)
        public
        candidateExists(name)
        notAdmin
        running
        isVerified
        notVoted
    {
        candidates[name].voteCount++;
        voters[msg.sender].voted = true;

        uint256 _index = indexOf(voters[msg.sender]);
        voterList[_index].voted = true;
        for (uint256 i = 0; i < candidateList.length; i++) {
            if (
                keccak256(bytes(candidateList[i].candidateName)) ==
                keccak256(bytes(name))
            ) {
                candidateList[i].voteCount++;
            }
        }
    }
}
