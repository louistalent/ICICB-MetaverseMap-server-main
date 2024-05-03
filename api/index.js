const express = require("express");
const manage = require("./api_manage");

module.exports = (router) => {
    // MAP API
    router.post("/get-map-data", manage.getMapData);
    router.post("/add-map-data", manage.createMapData);
    router.post("/update-map-data", manage.updateMapData);
};
