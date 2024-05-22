const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const axios = require("axios");

const crawlData = async (regionCode, placeType) => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  await page.goto(
    `https://korean.visitkorea.or.kr/curation/cr_place_list.do?hotPlaceType=Place&regionCode=${regionCode}`
  );

  if (placeType === "restaurant") {
    await page.click("div.hotplace_menu > a[data-type='Restaurant']");
  } else if (placeType === "place") {
    await page.click("div.hotplace_menu > a[data-type='Place']");
  }
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // await page.waitForSelector(".hotplace_list", { visible: true });

  for (let i = 0; i < 5; i++) {
    await page.click(
      "#contents > div > div.hotplace_sub > div.box_wrap > div.list.hotplace_list > div.more > button"
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  // // 검색 결과 가져오기
  const searchResultsHtml = await page.content();
  const $ = cheerio.load(searchResultsHtml);

  const searchResults = [];
  const placeLinks = $("div.mo > ul li > a ");
  for (let i = 0; i < placeLinks.length; i++) {
    const placeLink = placeLinks[i];
    const itemUrl = $(placeLink).attr("href");

    // 링크된 페이지로 이동
    await page.goto(itemUrl, { waitUntil: "domcontentloaded" });
    await page.waitForNavigation();
    await page.waitForSelector("#contents .swiper-lazy-loaded", {
      visible: true,
    });

    const detailPageHtml = await page.content();
    const $$ = cheerio.load(detailPageHtml);

    const name = $$("h2#topTitle").text().trim();
    const phoneNumber = $$('li strong:contains("문의 및 안내")')
      .next()
      .text()
      .trim();
    const usageTime = $$(
      "li strong:contains('이용시간'), li strong:contains('영업시간')"
    )
      .next()
      .text()
      .trim();
    const bestMenu = $$("li strong:contains('대표메뉴')").next().text().trim();
    const address = $$("li strong:contains('주소')").next().text().trim();
    const siteUrl = $$("li strong:contains('홈페이지') + span a").attr("href");
    const imgUrl = $$("div#pImgList .swiper-slide img").attr("src");

    // 주소를 이용하여 위도, 경도 구하기 (카카오맵 Geocoding API)
    const { data } = await axios.get(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${address}`,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`, // 본인의 Kakao REST API 키로 교체
        },
      }
    );

    const location = data.documents[0];
    console.log(location);
    let coords;
    if (location) {
      coords = { lat: location.y, lng: location.x };
      // 여기서 coords를 사용한 나머지 로직 수행
      // console.log(coords);
    } else {
      coords = { lat: 0, lng: 0 };
      // location이 undefined일 때의 처리 로직 추가
    }

    // const coords = { lat: location.y, lng: location.x };

    searchResults.push({
      name,
      phoneNumber,
      usageTime,
      address,
      siteUrl,
      imgUrl,
      bestMenu,
      coords,
    });
  }

  // console.log("Search Results:", searchResults);
  await browser.close();

  return searchResults;
};

// crawlData(1, "restaurant");

module.exports = crawlData;
