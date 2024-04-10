// // const axios = require("axios");

// // const cheerio = require("cheerio");

// // async function crawl() {
// //   try {
// //     // 1. 목록 수집
// //     const listUrl = "https://example.com/list";
// //     const listResponse = await axios.get(listUrl);
// //     const $ = cheerio.load(listResponse.data);

// //     // 각 항목에 대한 링크 추출
// //     const itemLinks = [];
// //     $("a.item-link").each((index, element) => {
// //       const itemLink = $(element).attr("href");
// //       itemLinks.push(itemLink);
// //     });

// //     // 2. 항목에 접속 및 3. 상세 정보 추출
// //     for (const itemLink of itemLinks) {
// //       const itemUrl = "https://example.com" + itemLink;
// //       const itemResponse = await axios.get(itemUrl);
// //       const itemHtml = itemResponse.data;
// //       const $$ = cheerio.load(itemHtml);

// //       // 필요한 정보 추출
// //       const detailInfo = $$(".detail-info").text();

// //       console.log(`Detail Info for ${itemLink}: ${detailInfo}`);
// //     }
// //   } catch (error) {
// //     console.error("Error:", error);
// //   }
// // }

// // crawl();
// const puppeteer = require("puppeteer");
// const cheerio = require("cheerio");

// async function crawlKakaoMap(searchQuery) {
//   const browser = await puppeteer.launch({
//     headless: false,
//   });
//   const page = await browser.newPage();

//   await page.goto("https://www.diningcode.com/list.dc");

//   // 검색어 입력란 찾기
//   const searchInput = await page.waitForSelector(
//     "div.Input__Wrap input.Search__Input",
//     {
//       visible: true,
//     }
//   );

//   // 검색어 입력
//   await searchInput.type(searchQuery);

//   // 엔터로 검색
//   await (await page.$("div.Input__Wrap button.search")).press("Enter");
//   //   await page.click("div#search form fieldset div.search_on button");

//   // // 검색 결과 기다리기
//   await page.waitForSelector(".Scroll__List__Section", { visible: true });

//   // // 검색 결과 가져오기
//   const searchResultsHtml = await page.content();
//   const $ = cheerio.load(searchResultsHtml);

//   const searchResults = [];
//   const placeLinks = $("div.Poi__List__Wrap > a.PoiBlock");
//   for (let i = 0; i < placeLinks.length; i++) {
//     const placeLink = placeLinks[i];
//     const itemUrl = "https://www.diningcode.com" + $(placeLink).attr("href");

//     // 링크된 페이지로 이동
//     await page.goto(itemUrl, { waitUntil: "domcontentloaded" });
//     await page.waitForSelector("#div_profile", { visible: true });

//     const detailPageHtml = await page.content();
//     const $$ = cheerio.load(detailPageHtml);

//     //   상세 내역 데이터 수집
//     $$("#div_profile").each((index, place) => {
//       const name = $$(place).find(".tit-point p.tit").text().trim();
//       const foodNames = $$(".btxt a.btxt")
//         .map((index, element) => $(element).text().trim())
//         .get()
//         .join(", ");
//       const img_url = $$(place).find("ul.store-pic li.bimg img").attr("src");
//       const biz_hours = $$(place)
//         .find(".busi-hours-today ul.list li p.r-txt")
//         .first()
//         .text()
//         .replace("영업시간: ", "")
//         .trim();
//       const tel = $$(place).find("ul.list li.tel").text().trim();
//       const address = $$(place)
//         .find("ul.list li.locat")
//         .text()
//         .replace(/\s*지도보기\s*$/, "")
//         .replace(/\s+/g, " ")
//         .trim();

//       searchResults.push({ name, foodNames, biz_hours, img_url, address, tel });
//     });
//   }

//   console.log("Search Results:", searchResults);
//   await browser.close();
// }

// crawlKakaoMap("서울");
// require("dotenv").config();
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const axios = require("axios");

async function crawlData(regionCode, placeType) {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  await page.goto(
    `https://korean.visitkorea.or.kr/curation/cr_place_list.do?hotPlaceType=Place&regionCode=${regionCode}`
  );
  // await page.waitForSelector("._sa_campaign-wrapper", { visible: true });
  // await page.click("._sa_bottom-group > button");

  // await page.click("div.hotplace_menu > a.on")
  // const selector =
  //   placeType === "restaurant"
  //     ? "div.hotplace_menu > a[data-type='Restaurant']"
  //     : "div.hotplace_menu > a[data-type='Place']";

  // await page.click(selector);
  // await page.waitForSelector("div.hotplace_menu", { visible: true });

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
}

// crawlData(1, "restaurant");

module.exports = crawlData;
