const axios = require("axios");
const cron = require("node-cron");

const addresses = require("../contracts/contracts/addresses.json");
const { multicallProvider, getNFTContract_m } = require("../contracts");
const { fromBigNum } = require("../utils");
const { manageNFTs } = require("../controllers/blockchain");

const handleNFT = () => {
    const handleGetNFTs = async () => {
        try {
            const totalSupplyArray = [];
            let metadataArray = {};
            let promiseArray = [];

            /* Get TotalSupply per NFT */
            multicallProvider.init();
            for (let x in addresses.NFT) {
                const NFTcontract_m = getNFTContract_m(addresses.NFT[x]);
                promiseArray.push(NFTcontract_m.totalSupply());
            }

            const bigNumResultArray = await multicallProvider.all(promiseArray);
            bigNumResultArray.map((item) => {
                totalSupplyArray.push(fromBigNum(item, 0));
            });

            /* Get TotalNFTToken per NFT */
            multicallProvider.init();
            let count = 1;
            for (let x in addresses.NFT) {
                promiseArray = [];
                const NFTcontract_m = getNFTContract_m(addresses.NFT[x]);
                for (let i = 0; i < Number(totalSupplyArray[count - 1]); i++) {
                    promiseArray.push(NFTcontract_m.tokenURI(i));
                }
                const resultArray = await multicallProvider.all(promiseArray);

                promiseArray = [];
                for (let i = 0; i < resultArray.length; i++) {
                    promiseArray.push(axios.get(resultArray[i]));
                }
                let hashbump = await Promise.all(promiseArray);
                let jsonbump = [];
                hashbump.map((item) => {
                    jsonbump.push(item.data);
                });

                /* All NFTs metadata */
                metadataArray = {
                    ...metadataArray,
                    ["nft" + count]: jsonbump,
                };
                count++;
            }

            /** Get NFTs Owners */
            let ownerArray = {};
            count = 1;
            multicallProvider.init();
            for (let x in addresses.NFT) {
                promiseArray = [];
                const NFTcontract_m = getNFTContract_m(addresses.NFT[x]);
                for (let i = 0; i < totalSupplyArray[count - 1]; i++) {
                    promiseArray.push(NFTcontract_m.ownerOf(i));
                }
                let bump = await multicallProvider.all(promiseArray);
                ownerArray = {
                    ...ownerArray,
                    ["nft" + count]: bump,
                };
                count++;
            }

            manageNFTs.updateAllNFTs({
                dataArray: metadataArray,
                addressArray: ownerArray,
                totalSupplyArray: totalSupplyArray,
            });
        } catch (err) {
            console.log(err);
        }
    };

    cron.schedule("*/15 * * * * *", () => {
        handleGetNFTs();
    });
};

module.exports = { handleNFT };
