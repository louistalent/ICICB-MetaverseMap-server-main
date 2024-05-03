require("dotenv").config;
const { MapController } = require("../controllers/mapControl");

module.exports = {
    getMapData: async (req, res) => {
        try {
            const { message } = req.body;
            console.log(message);

            const getresult = await MapController.getAllData();

            if (getresult.length === 0) {
                throw new Error("Data Empty");
            }

            res.status(200).json({ cellInfos: getresult });
        } catch (err) {
            console.log(err);
            res.json({ success: false });
        }
    },
    createMapData: async (req, res) => {
        try {
            const { NFTID, price, desc, owner } = req.body;

            const addMapData = await MapController.createMapData({
                NFTID: NFTID,
                price: price,
                desc: desc,
                owner: owner,
            });

            if (addMapData.length === 0) {
                throw new Error("Data Empty");
            }

            res.status(200).json({ success: true, data: addMapData });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ success: false });
        }
    },
    updateMapData: async (req, res) => {
        try {
            const { ID, NFTID, owner } = req.body;

            const updateMapData = await MapController.updateMapData({
                ID: ID,
                NFTID: NFTID,
                owner: owner,
            });

            if (updateMapData.length === 0) {
                throw new Error("Data Empty");
            }

            res.status(200).json({ success: true, data: updateMapData });
        } catch (err) {
            console.log(err);
            res.status(500).json({ success: false });
        }
    },
};
