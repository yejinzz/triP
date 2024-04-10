const crawlData = require("../croller/placeInfoCrawl");
const Place = require("../models/placeModel");
const axios = require("axios");

exports.crawlPlaceInfoByRegion = async (req, res) => {
  try {
    const data = await crawlData(req.query.regionCode, req.query.placeType);
    // const places = data.map((item) => ({
    //   regionCode: req.params.regionCode,
    //   contentType: req.params.contentType,
    //   placeInfo: {
    //     name: item.name,
    //     phoneNumber: item.phoneNumber,
    //     usageTime: item.usageTime,
    //     address: item.address,
    //     siteUrl: item.siteUrl,
    //     imgUrl: item.imgUrl,

    //   },
    // }));
    const places = data.map((item) => {
      const placeInfo = {
        name: item.name,
        phoneNumber: item.phoneNumber,
        usageTime: item.usageTime,
        address: item.address,
        siteUrl: item.siteUrl,
        imgUrl: item.imgUrl,
        coords: { lat: item.coords.lat, lng: item.coords.lng },
      };

      if (req.query.placeType === "restaurant") {
        placeInfo.bestMenu = item.bestMenu;
      }

      return {
        regionCode: req.query.regionCode,
        placeType: req.query.placeType,
        placeInfo,
      };
    });

    await Place.insertMany(places);

    // await Place.insertMany(place);
    res.status(200).json(places);
    console.log("Data saved to MongoDB");
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error("Error saving data to MongoDB:", error);
  }
};
const openApiURL = "https://apis.data.go.kr/B551011/KorService1";

exports.getPlaceInfoByRegion = async (req, res) => {
  try {
    const regionCode = req.query.regionCode;
    const placeType = req.query.placeType;

    // const places = await Place.find({ regionCode, placeType });

    const basedList = `${openApiURL}/areaBasedList1?serviceKey=${process.env.TOUR_API_KEY}&numOfRows=100&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=R&contentTypeId=${placeType}&areaCode=${regionCode}`;

    const response = await axios.get(basedList);
    const data = response.data.response.body.items.item; // 받아온 데이터
    // contentid
    //데이터가공
    console.log(data);
    res.status(200).send(data);

    // res.status(200);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPlaceDetails = async (req, res) => {
  try {
    const contentId = req.params.contentId;
    const placeType = req.query.placeType;

    const detailCommon = `${openApiURL}/detailCommon1?ServiceKey=${process.env.TOUR_API_KEY}&contentTypeId=${placeType}&contentId=${contentId}&MobileOS=ETC&MobileApp=AppTest&_type=json&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y`;
    const detailIntro = `${openApiURL}/detailIntro1?ServiceKey=${process.env.TOUR_API_KEY}&contentTypeId=${placeType}&contentId=${contentId}&MobileOS=ETC&MobileApp=AppTest&_type=json`;

    const response = await axios.get(detailIntro);
    const data = response.data; // 받아온 데이터

    res.status(200).send(data.response.body.items.item[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSearchPlace = async (req, res) => {
  try {
    const regionCode = req.query.regionCode;
    const placeType = req.query.placeType;
    const keyword = req.query.keyword;

    const searchKeywordUrl = `${openApiURL}/searchKeyword1?serviceKey=${process.env.TOUR_API_KEY}&contentTypeId=${placeType}}&areaCode=${regionCode}&MobileOS=ETC&MobileApp=AppTest&_type=json&numOfRows=100&pageNo=1&arrange=R&keyword=${keyword}`;

    const response = await axios.get(searchKeywordUrl);
    const data = response.data;

    res.status(200).send(data.response.body.items.item[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
