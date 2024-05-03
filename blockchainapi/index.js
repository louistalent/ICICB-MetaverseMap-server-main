const { handleNFT } = require("./handler");

const blockchainHandle = async () => {
    handleNFT();
};
module.exports = { blockchainHandle };
