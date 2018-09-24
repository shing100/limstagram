# REACT FRONTEND LIMSTAGRAM 

리엑트 프론트엔드 for Limstagram

## scss 추가하기

- yarn add node-sass sass-loader
- webpack.config.dev, pord 파일 수정
- 해당 로더는 아래에서부터 읽기 시작함
- 프로덕션은 모듈 형태가 아니고 플러그인 안에 있음 그래서 자바스크립트 그리고 css 파일을 생성함

## 백엔드 프론트엔드 연결
1) 프록시 요청 3000 에서 8000 포트로
2) django-cors-headers 설치
3) base.py 에 intsalled_app 에 corsheaders 추가
4) corsheaders.middleware.CorsMiddleware 추가 CommonMiddleware 전에
5) CORS_ORIGIN_ALLOW_ALL = True 세팅 추가
6) str(ROOT_DIR.path('frontend', 'build', 'static')) static files 에 추가
7) vies.py limstagram 폴더에 추가
8) ReactAppView 읽는 파일 추가
9) ReactAppView 에 URL 추가하기

## yarn add react-router-dom history 
- yarn add react-router-redux@next
- history 를 볼 수 있음

## React Component Patterns

- https://levelup.gitconnected.com/react-component-patterns-ab1f09be2c82

## 참고자료

> create-react-app

- https://github.com/facebook/create-react-app/

> eject

- https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-eject

> CSS 모듈의 필요성

- https://css-tricks.com/css-modules-part-1-need/

> Redux Store with Multiple Reducers

> yarn add redux-thunk

- 원할때 리덕스 스토어로 액션을 보낼 수 있게 해줌
- 액션 -> 변경 (API)

> Reactotron 사용x
- yarn add reactotron-react-js
- yarn add reactotron-redux
- https://github.com/infinitered/reactotron

> Redux-devtools
- 크롬 웹스토어
- yarn add redux-devtools-extension --dev

> internationalization
- yarn add redux-i18n

> reset-css
- yarn add reset-css

> ion icons

- yarn add react-ionicons
- zamarrowski.github.io/react-ionicons

> 번역
- "extract": "i18n_extract",
- "import": "i18n_import --encoding=utf-8"
- yarn run import
