/** @format */

const MapController = {
    createMapData: async (props) => {
        try {
            const { NFTID, price, desc, owner } = props;

            let command =
                "INSERT INTO nft_owner (NFTID , price , description, owner) VALUES (?, ?, ?, ?)";
            const result = await global.sql.query(command, [
                NFTID,
                price,
                desc,
                owner,
            ]);
            return result;
        } catch (err) {
            console.log(err);
        }
    },
    updateMapData: async (props) => {
        try {
            const { ID, NFTID, owner } = props;

            let command =
                "UPDATE nft_owner SET NFTId=?, owner=? WHERE id=?";
            const result = await global.sql.query(command, [NFTID, owner, ID]);

            return result;
        } catch (err) {
            console.log(err);
        }
    },
    findOwner: async (props) => {
        try {
            const { param, flag } = props;
            let command;
            switch (flag) {
                case 1: //by NFTID search
                    command = "SELECT * FROM nft_owner WHERE NFTID = ?";
                    break;
                case 2: //by price search
                    command = "SELECT * FROM nft_owner WHERE price = ?";
                    break;
                case 3: //by owner search
                    command = "SELECT * FROM nft_owner WHERE owner = ?";
                    break;
            }
            const result = await global.sql.query(command, param);
            return result;
        } catch (err) {
            console.log(err);
        }
    },
    getAllData: async () => {
        try {
            let command = "SELECT * FROM nft_owner";
            const result = await global.sql.query(command);
            return result;
        } catch (err) {
            console.log(err);
        }
    },
};

module.exports = { MapController };
