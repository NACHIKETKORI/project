const DistributedVoting = artifacts.require('DistributedVoting');

module.exports = async function(deployer){
    await deployer.deploy(DistributedVoting)
};
