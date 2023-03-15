## 사용 기술 및 라이브러리
- React
- Next.js
- Typescript
- Axios
- Styled-Components
- React-toastify
- Redux-Toolkit
- Redux-persist
- Mock Service Worker

## 폴더 구조

```bash

┌── actions             : Redux-Toolkit actions
├── common              : 공통 모듈
├── components          : 컴포넌트 관리
├── mocks               : Mock Service Worker 관련 파일
├── pages               : page 단위의 component 폴더
├── public              : Mock Service Worker 관련 파일
├── package.json        : 설치된 라이브러리/패키지 정보
├── reducers            : Redux-Toolkit reducers
├── store               : Redux-Toolkit store
├── styles              : 공통 css 
├    └── font           : font 폴더
└── types               : 공통 types 선언 파일
```

## 사용설명

1. url 추가 버튼과 이미지 추가 버튼을 통해 리소스를 추가할 수 있습니다. input blur 시와 enter키 입력 시 추가됩니다.
2. 추가된 리소스는 아래 리스트 영역에 추가됩니다.
3. url 추가의 경우 "https://" 가 기본으로 설정되어있으며 다음의 경우에 유효성검사에서 걸러집니다.
  - url이 빈 값일 경우
  - url이 "https://" 나 "http://"로 시작하지 않을 경우
  - url이 "https://" 나 "http://"일 경우
4. youtube url의 경우 replace 기능이 있습니다.
5. 이미지 추가의 경우 jpg, png 파일만 추가 가능합니다.
6. 여러파일을 한꺼번에 추가 가능합니다. 이때 각각의 유효성검사를 진행하여 jpg, png파일이 아닌 다른파일이 있다면 추가가 취소됩니다.
7. 리스트에서 수정 버튼을 클릭하여 리소스의 이름을 수정할 수 있습니다.
8. 리스트에서 삭제 버튼을 클릭하여 리소스를 삭제할 수 있습니다.
9. 추가된 리소스를 클릭 시 오른쪽 뷰어가 활성화 됩니다.
10. 뷰어의 x버튼으로 뷰어를 비활성화 할 수 있습니다.
11. 뷰어가 활성화된 리소스의 이름을 변경하면 뷰어의 이름도 변경됩니다.
12. 뷰어가 활성화된 리소스를 삭제하면 뷰어가 비활성화됩니다.
13. 리소스의 추가, 수정, 삭제 모두 toast가 구현되어있습니다.

## Mock Service Work (msw)
1. 과제 개발환경을 실무와 최대한 똑같이 구현하고자 msw를 사용하였습니다.
2. localstorage를 db로 사용 하였습니다.
3. 리소스 등록 api 요청 시 80%의 확률로 등록되며, 응답까지 300ms~1000ms의 랜덤 딜레이가 적용됩니다.
