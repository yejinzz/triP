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
npm run dev
```

Back-End

```bash
cd server
npm install
npm start
```

## 🛠️ Stack

### **Front**

<img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"><img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"><img src="https://img.shields.io/badge/Redux Toolkit-764ABC?style=for-the-badge&logo=Redux&logoColor=white"><img src="https://img.shields.io/badge/Styled Components-DB7093?style=for-the-badge&logo=Styled Components&logoColor=white"><img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white">

### **Back**

<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"><img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white"><img src="https://img.shields.io/badge/mongodb-47A248?style=for-the-badge&logo=mongodb&logoColor=white">

## 🔍 주요 기능

- 여행 일정 생성 ( 날짜 및 여행지, 일자별 여행 경로 설정 가능 )
- 카테고리별 검색 및 직접 검색을 통한 장소 정보 제공
- 총 여행 일자별로 일정 추가 가능
- 지도 마커 선택 시 오버레이를 통해 장소 정보 제공
- Polyline을 통한 일자별 여행 경로 표시
- 생성한 나의 여행 리스트 확인 가능
- 회원가입, 로그인, 로그아웃
- 회원 정보 조회/수정/탈퇴


## 🖥️ 구현 화면 및 상세 기능

### 메인 페이지
<table>
    <tbody>
        <tr></tr>
        <tr>
            <th>시연</th>
            <th>설명</th>
        </tr>
        <tr>
            <td><img width="600" src="https://github.com/yejinzz/triP/assets/124851544/48e71a82-3205-43df-8630-e285d33b5e52"
                    alt="메인페이지"></td>
            <td>
              <strong>메인 페이지</strong>
                 <br/>
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
            <td><img width="600" src="https://github.com/yejinzz/triP/assets/124851544/36852524-7151-40cc-b8e9-e95400e629cf"
                    alt="회원가입"></td>
            <td>
              <strong>회원가입</strong>
                 <br/>
                <ul>
                    <li>사용자의 정보를 입력받아 계정 생성. </li>
                    <li>유효성 검사를 진행하고, 오류 메시지를 전달.</li>
                    <li>* 계정 생성에 성공하면 다이얼로그 창으로 완료 메세지 전달 후 로그인 페이지로 이동.</li>
                </ul>
            </td>
        </tr>
        <tr></tr>
        <tr>
            <td><img width="600" src="https://github.com/yejinzz/triP/assets/124851544/7c635796-73e9-4516-8292-9f9940f574e0"
                    alt="로그인"></td>
            <td>
              <strong>로그인</strong>
                <br/>
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

### 일정 생성 페이지

<table>
    <tbody>
        <tr></tr>
        <tr>
            <th>시연</th>
            <th>설명</th>
        </tr>
        <tr>
            <td><img width="600" src="https://github.com/yejinzz/triP/assets/124851544/5642fb5f-66b9-4d6f-9e5c-f70b5f768cd0"
                    alt="일정생성모달"></td>
            <td>
              <strong>날짜 및 여행지 선택</strong>
                 <br/>
                <ul>
                    <li>여행 날짜와 여행지를 선택하여 일정 생성. </li>
                </ul>
            </td>
        </tr>
        <tr></tr>
        <tr>
            <td><img width="600" src="https://github.com/yejinzz/triP/assets/124851544/d40ed80e-4fe0-44c4-9482-2a0b677b7ba2"
                    alt="장소검색"></td>
            <td>
              <strong>장소 검색</strong>
                <br/>
                <ul>
                    <li>카테고리 또는 직접 검색을 통해 선택한 여행지의 플레이스 정보 제공.</li>
                    <li>전체 검색 결과 지도상 마커 표시</li>
                    <li>장소 카드 또는 마커 클릭시 모달 오버레이로 장소 세부 정보 제공.</li>
                </ul>
            </td>
        </tr>
        <tr></tr>
        <tr>
            <td><img width="600" src="https://github.com/yejinzz/triP/assets/124851544/08546987-309b-4df8-b467-a48a2566d89c"
                    alt="일정 추가"></td>
            <td>
              <strong>일정 추가</strong>
                <br/>
                <ul>
                    <li>모달 오버레이 또는 장소 카드를 통해 일정 추가.</li>
                    <li>여행 일자별 일정을 추가할 수 있음.</li>
                    <li>일정에 추가된 장소는 순서 마커 표시</li>
                    <li>폴리라인으로 경로 표시</li>
                </ul>
            </td>
        </tr>
        <tr></tr>
        <tr>
            <td><img width="600" src="https://github.com/yejinzz/triP/assets/124851544/29fee4a2-426a-4f6e-9880-becfd1d0fce5"
                    alt="일정 편집 및 저장"></td>
            <td>
              <strong>일정 편집 및 저장</strong>
                <br/>
                <ul>
                    <li>플래너 창에서 일정 편집하기 버튼 클릭시 일정 편집 가능. </li>
                    <li>일정은 드래그하여 편집.</li>
                    <li>저장이 완료되면 마이페이지 `나의 일정` 탭으로 이동</li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>

<br/>

### 마이 페이지

<table>
    <tbody>
        <tr></tr>
        <tr>
            <th>시연</th>
            <th>설명</th>
        </tr>
        <tr>
            <td><img width="600" src="https://github.com/yejinzz/triP/assets/124851544/fa02044b-810e-418f-a694-f11c1193ac0e"
                    alt="나의 일정"></td>
            <td>
              <strong>나의 일정</strong>
                 <br/>
                <ul>
                    <li>생성한 일정 리스트 확인</li>
                    <li>생성한 여행의 제목을 설정할 수 있음.</li>
                    <li>생성한 여행을 삭제할 수 있음</li>
                    <li>일정 보기 클릭 시 해당 여행 일정 확인 또는 수정 가능</li>
                </ul>
            </td>
        <tr></tr>
        <tr>
            <td><img width="600" src="https://github.com/yejinzz/triP/assets/124851544/36c2fd89-d8ba-4ec1-933e-71d3dc57b7ef"
                    alt="프로필 수정"></td>
            <td>
              <strong>프로필 수정"</strong>
                <br/>
                <ul>
                    <li>닉네임 유효성 검사 후 수정 가능.</li>
                    <li>비밀번호, 프로필 이미지 수정 모달.</li>
                    <li>회원 탈퇴</li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>

<br/>

### 모바일 화면

<table>
    <tbody>
        <tr></tr>
        <tr>
            <th>메인</th>
            <th>로그인</th>
            <th>회원가입</th>
        </tr>
        <tr>
            <td><img width="320" src="https://github.com/yejinzz/triP/assets/124851544/3af0b5b9-df18-46cf-adf5-dae7574e857d"
                    alt="main"></td>
            <td><img width="320" src="https://github.com/yejinzz/triP/assets/124851544/108cc97a-e82b-46c1-ac11-ff9e9acfee52"
                    alt="login"></td>
            <td><img width="320" src="https://github.com/yejinzz/triP/assets/124851544/96992f19-08eb-4ffd-8a67-cc5692d3aa3f"
                    alt="signup"></td>
        </tr>
        <tr></tr>
        <tr>
            <th>일정 생성 페이지-1</th>
            <th>일정 생성 페이지-2</th>
            <th>마이 페이지</th>
        </tr>
        <tr>
            <td><img width="320" src="https://github.com/yejinzz/triP/assets/124851544/fb758119-d28c-4f9a-aa36-8f33f17eaac6"
                    alt="일정 생성 페이지-1"></td>
            <td><img width="320" src="https://github.com/yejinzz/triP/assets/124851544/ded8809b-cc8c-4e85-b738-ce9370a93af7"
                    alt="일정 생성 페이지-2"></td>
            <td><img width="320" src="https://github.com/yejinzz/triP/assets/124851544/b85ab98d-cfba-47c7-87b0-f9e8f84ff9ab"
                    alt="마이 페이지"></td>
        </tr>
    </tbody>
</table>
<img src="https://github.com/yejinzz/triP/assets/124851544/7faf9926-bca5-42a7-9c1f-97558ee8cd56" alt="마이 페이지">

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
