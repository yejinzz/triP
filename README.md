# triP

![trip-banner](https://github.com/yejinzz/triP/assets/124851544/93d1ba49-41ff-4a5d-9c58-b7ae6d9ee8ee)

## 🚩 Overview

<main align="center">
    <h3 align="center"> 국내 여행 플래너, triP </h3> 
</main>

> Kakao Map API와 한국관광공사에서 제공하는 Tour API를 활용해 여행지 정보를 제공합니다. </br>
> 여행 일정을 계획 / 관리할 수 있는 국내 여행 플래너입니다.

- **작업 기간 :** 24.03 - 24.04
- **배포 링크 :** [triP](https://web-trip-client-85phb42blv09cyua.sel5.cloudtype.app/)
- **Figma 구상도 :** [디자인 시안](https://www.figma.com/file/Ei8MzFwlP1gqOBDT4GP9ic/Trip?type=design&node-id=0%3A1&mode=design&t=iapYZT420ZsSFWsF-1)

## 🏃🏻‍♂️ Install & Run

Front-End

```bash
cd client
npm install
npm start
```

Back-End

```bash
cd server
npm install
npm start
```

## 🛠️ Stack

### **Front**

<img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">
<img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB">
<img src="https://img.shields.io/badge/Redux Toolkit-764ABC?style=for-the-badge&logo=Redux&logoColor=white">
<img src="https://img.shields.io/badge/Styled Components-DB7093?style=for-the-badge&logo=Styled Components&logoColor=white">
<img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white">

### **Back**

<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
<img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
<img src="https://img.shields.io/badge/mongodb-47A248?style=for-the-badge&logo=mongodb&logoColor=white">

## 🔍 주요 기능

- 여행 일정 생성 ( 날짜 및 여행지, 일자별 여행 경로 설정 가능 )
- 카테고리별 검색 및 직접 검색을 통한 장소 정보 제공
- 총 여행 일자별로 일정 추가 가능
- 지도 마커 선택 시 오버레이를 통해 장소 정보 제공
- Polyline을 통한 일자별 여행 경로 표시
- 생성한 나의 여행 리스트 확인 가능
- 회원가입, 로그인, 로그아웃
- 회원 정보 조회/수정/탈퇴


## 🖥️ 작업 화면

### 메인 페이지

<table>
    <tbody>
        <tr></tr>
        <tr>
            <th>시연</th>
            <th>설명</th>
        </tr>
        <tr>
            <td><img width="100%" height="100%" src="https://github.com/yejinzz/triP/assets/124851544/9ca4759f-5a9d-4cc6-822d-92a8742ce666"
                    alt="메인페이지"></td>
            <td>
              <strong>홈/스플래쉬</strong>
                <ul>
                    <li>일정 생성하기 버튼 클릭시 로그인 여부에 따라 페이지 이동.</li>
                    <li>로그인: 일정 생성 페이지로 이동</li>
                    <li>비로그인: 로그인화면으로 이동</li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>
    
<br/>
    
### 회원가입 / 로그인

<table>
    <tbody>
        <tr></tr>
        <tr>
            <th>시연</th>
            <th>설명</th>
        </tr>
        <tr>
            <td><img width="100%" height="100%" src="https://github.com/yejinzz/triP/assets/124851544/c905fbbb-9665-487f-b7fa-e412e9dc0710"
                    alt="회원가입"></td>
            <td>
              <strong>회원가입</strong>
                <ul>
                    <li>사용자의 정보를 입력받아 계정 생성. </li>
                    <li>유효성 검사를 진행하고, 오류 메시지를 전달.</li>
                    <li>* 계정 생성에 성공하면 다이얼로그 창으로 완료 메세지 전달 후 로그인 페이지로 이동.</li>
                </ul>
            </td>
        </tr>
        <tr></tr>
        <tr>
            <td><img width="100%" height="100%" src="https://github.com/yejinzz/triP/assets/124851544/76dcbf64-42cd-4cec-898b-222fda77da00"
                    alt="로그인"></td>
            <td>
              <strong>로그인</strong>
                <ul>
                    <li>로그인 정보 입력받아 계정 인증을 진행.</li>
                    <li>이메일 또는 비밀번호 오류 시, 다이얼로그 창으로 오류 메세지 전달.</li>
                    <li>로그인 인증이 완료되면 메인 페이지로 이동.</li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>

<br/>

## 💫 Trouble Shooting

- **문제점**

  리로드 시 로그인 상태를 유지하기 위한 토큰 재발급 작업 중 발생하였습니다.

  우선, `Access Token`을 브라우저 상에 저장하지 않고 메모리상에 저장하고 싶었기 때문에 로그인 성공 후 모든 요청 헤더에 엑세스 토큰을 자동으로 추가하도록 Axios Default Header 설정해주었습니다.

  하지만 리로드 시 해당 설정이 초기화되어 요청 헤더에 토큰이 담기지 않았고, 모든 요청마다 `Access Token` 재발급 요청이 이루어 지고 있었습니다.

<br />

- **문제 해결**

  우선, 요청 헤더에 토큰이 없을 시 미들웨어를 종료하는 로직을 삭제해주어 요청 헤더에 토큰이 입력되지 않았을 경우에도 에러를 처리할 수 있도록 하였습니다.

  ```javascript
  exports.verifyAccessToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    // 삭제 부분
    {
      /* if (!token)
       return res.status(401).send({ msg: "엑세스 토큰을 입력해 주세요." }); */
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        req.expired = true;
        console.error(err.name, ":", err.message);
      }
      req.user = user;
      next();
    });
  };
  ```

  그리고 프론트단에서는 Axios interceptors를 활용하여 해결해주었습니다.

  응답 헤더에 토큰이 담겨올 경우,디폴트 헤더를 재설정하도록 하였고 이를 통해 불필요한 토큰 재발급 문제를 해결할 수 있었습니다.

  ```jsx
  instance.interceptors.response.use(
    (response) => {
      if (response.headers.authorization) {
        const newAccessToken = response?.headers?.authorization;

        instance.defaults.headers.common["authorization"] = newAccessToken;
      }

      return response;
    },

    (error) => {
      if (error.response.status === 403) {
        localStorage.clear();

        alert("토큰이 만료되었습니다.다시 로그인 해주세요!");

        location.replace("/login");
      }

      return Promise.reject(error);
    }
  );
  ```
