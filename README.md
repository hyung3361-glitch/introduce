# 최예준 (Choi Ye-jun) 퍼스널 소개 웹사이트 ✨

나를 처음 만나는 사람들에게 나를 매력적이고 진솔하게 소개할 수 있는 반응형 웹사이트입니다.

---

## 🌟 주요 특징 및 기능

1. **세련된 모던 디자인 (Glassmorphism & Gradient)**
   - 최신 트렌드를 반영한 반응형 UI/UX
   - 부드러운 애니메이션 및 모바일 최적화 (스마트폰, 태블릿, PC 완벽 호환)
   - Pretendard 한글 웹폰트 적용

2. **다크 모드 & 라이트 모드 지원**
   - 우측 상단 해/달 아이콘 클릭으로 손쉽게 테마 변경 가능
   - 방문자의 브라우저 테마 설정을 기억 (`localStorage`)

3. **실시간 텍스트 직접 수정 모드 (Inline Edit Mode)**
   - 상단의 **[내용 수정]** 버튼을 누르면 웹 화면의 모든 텍스트(이름, 소개글, MBTI, 취미, 활동 등)를 직접 클릭해서 타이핑으로 바로 바꿀 수 있습니다.
   - 상단 **[저장하기]**를 누르면 브라우저에 즉시 저장되어 새로고침해도 유지됩니다.

4. **실시간 한 줄 방명록 (Guestbook)**
   - 사이트를 방문한 사람들이 닉네임과 이모지, 메시지를 남길 수 있습니다.
   - 메시지는 브라우저의 `localStorage`에 즉시 저장되고 삭제도 가능합니다.

5. **다채로운 섹션 구성**
   - **Hero**: 타이핑 애니메이션 인사말 & 프로필 카드
   - **About Me**: 최예준의 가치관과 주변에서 말하는 나의 모습
   - **Core Values**: 나를 지탱하는 3가지 핵심 키워드 (호기심, 진심과 배려, 실행과 끈기)
   - **Taste & TMI**: MBTI, 취미, 소울푸드, 몰입의 순간 등 친근한 취향 사전
   - **What I Care About**: 관심 분야 및 활동 (카테고리별 탭 필터링)
   - **Q&A (FAQ)**: 자주 묻는 질문 아코디언
   - **Contact**: 원클릭 이메일 주소 복사 & 소셜 미디어(Instagram, GitHub, OpenKakao 등) 링크

---

## 🚀 사이트 열어보는 방법

1. 폴더 안에 있는 `index.html` 파일을 더블 클릭하여 크롬(Chrome), 엣지(Edge) 등 브라우저로 엽니다.
2. 상단의 **[내용 수정]** 버튼을 눌러 본인의 실제 이야기(MBTI, 취향, 연락처 등)를 넣어보세요!

---

## 🖼️ 프로필 사진 넣는 법

기본으로 멋진 우주비행사 일러스트 아이콘이 설정되어 있습니다.  
본인의 실제 사진을 넣고 싶으시다면:

1. 넣고 싶은 사진 파일을 이 폴더에 `profile.jpg` 이름으로 저장합니다.
2. `index.html`의 119~121번째 줄:
   ```html
   <div class="profile-avatar-default" id="avatarPreview">
     <i class="fa-solid fa-user-astronaut"></i>
   </div>
   ```
   이 부분을 아래처럼 변경하시면 됩니다:
   ```html
   <div class="profile-avatar-default" id="avatarPreview" style="background: none; overflow: hidden;">
     <img src="profile.jpg" alt="최예준" style="width:100%; height:100%; object-fit:cover;" />
   </div>
   ```

---

## 🌐 무료 웹사이트 배포 추천 (다른 사람들에게 링크 공유하기)

- **GitHub Pages**: 이 폴더를 GitHub 저장소에 올리고 Settings -> Pages에서 배포 (무료)
- **Vercel / Netlify**: 폴더를 드래그 앤 드롭하는 것만으로 10초 만에 나만의 `.vercel.app` 또는 `.netlify.app` 주소가 생성됩니다.