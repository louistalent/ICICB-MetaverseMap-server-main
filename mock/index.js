const axios = require("axios");

const randomData = async () => {
    try {
        let promiseArray = [];
        for (let i = 0; i < 144; i++) {
            let randomName = "unknown";
            let randomPrice = Math.ceil(Math.random() * 1000 + 50);
            let desc = "cosmos world land";

            promiseArray.push(
                axios.post("http://localhost:5000/api/add-map-data", {
                    NFTID: -1,
                    price: randomPrice,
                    desc: desc,
                    owner: randomName,
                })
            );
        }

        await Promise.all(promiseArray);
        console.log("complete");
    } catch (err) {
        console.log(err);
    }
};

randomData();
