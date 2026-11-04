/**
 * 최예준 소개 웹사이트 (Choi Ye-jun Portfolio & Introduction)
 * JavaScript Interactions & Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTyping();
  initMobileNav();
  initAccordion();
  initProjectTabs();
  initGuestbook();
  initCopyEmail();
  initEditMode();
  updateFooterYear();
});

/* ==========================================================================
   1. 테마 토글 (Dark / Light Theme)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const body = document.body;

  // 저장된 테마 불러오기 (기본값 dark)
  const savedTheme = localStorage.getItem('yejun_theme') || 'dark';
  body.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme, themeIcon);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('yejun_theme', newTheme);
    updateThemeIcon(newTheme, themeIcon);
    showToast(`${newTheme === 'dark' ? '다크' : '라이트'} 모드로 전환되었습니다.`);
  });
}

function updateThemeIcon(theme, iconEl) {
  if (theme === 'dark') {
    iconEl.className = 'fa-solid fa-sun';
    iconEl.style.color = '#f59e0b';
  } else {
    iconEl.className = 'fa-solid fa-moon';
    iconEl.style.color = '#6366f1';
  }
}

/* ==========================================================================
   2. 타이핑 애니메이션 (Hero Typing Effect)
   ========================================================================== */
function initTyping() {
  const typingTextEl = document.getElementById('typingText');
  if (!typingTextEl) return;

  const phrases = [
    '새로운 도전을 즐기는 사람입니다.',
    '따뜻한 소통을 소중히 여깁니다.',
    '호기심을 멈추지 않는 탐구자입니다.',
    '어제보다 더 나은 내일을 만듭니다.',
    '함께할 때 더 큰 가치를 믿습니다.'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 100;
  const deleteSpeed = 50;
  const delayBetweenPhrases = 1800;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typingTextEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingTextEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let nextSpeed = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentPhrase.length) {
      nextSpeed = delayBetweenPhrases;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      nextSpeed = 400;
    }

    setTimeout(type, nextSpeed);
  }

  type();
}

/* ==========================================================================
   3. 모바일 네비게이션 (Mobile Navigation Menu)
   ========================================================================== */
function initMobileNav() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navLinks = document.getElementById('navLinks');
  const links = navLinks.querySelectorAll('.nav-link');

  hamburgerBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}

/* ==========================================================================
   4. FAQ 아코디언 토글 (FAQ Accordion)
   ========================================================================== */
function initAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // 하나만 열리게 하고 싶다면 다른 아이템 닫기
      accordionItems.forEach(i => i.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   5. 관심사/프로젝트 탭 필터링 (Tab Filtering)
   ========================================================================== */
function initProjectTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const projectCards = document.querySelectorAll('.project-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetTab = btn.getAttribute('data-tab');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (targetTab === 'tab-all') {
          card.style.display = 'flex';
        } else if (targetTab === 'tab-tech' && category === 'tech') {
          card.style.display = 'flex';
        } else if (targetTab === 'tab-collab' && category === 'collab') {
          card.style.display = 'flex';
        } else if (targetTab === 'tab-growth' && category === 'growth') {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   6. 방명록 시스템 (Guestbook with LocalStorage)
   ========================================================================== */
const DEFAULT_NOTES = [
  {
    id: 1,
    name: '김하늘',
    emoji: '👋',
    message: '예준님 안녕하세요! 소개 페이지가 너무 정성스럽고 깔끔하네요. 좋은 영감 얻고 갑니다!',
    time: '2026. 10. 12'
  },
  {
    id: 2,
    name: '박민재',
    emoji: '✨',
    message: '긍정적인 마인드와 끈기가 돋보이는 소개 글 멋집니다. 항상 응원할게요!',
    time: '2026. 10. 13'
  },
  {
    id: 3,
    name: '이서연',
    emoji: '🔥',
    message: '취향 사전 보고 통하는 게 많아서 반가웠어요! 앞으로의 발걸음도 힘내세요!',
    time: '2026. 10. 14'
  }
];

function initGuestbook() {
  const form = document.getElementById('guestbookForm');
  const notesGrid = document.getElementById('notesGrid');
  const noteCount = document.getElementById('noteCount');

  // 로컬스토리지에서 방명록 가져오기
  let notes = JSON.parse(localStorage.getItem('yejun_guestbook'));
  if (!notes || notes.length === 0) {
    notes = DEFAULT_NOTES;
    localStorage.setItem('yejun_guestbook', JSON.stringify(notes));
  }

  function renderNotes() {
    notesGrid.innerHTML = '';
    noteCount.textContent = notes.length;

    notes.forEach(note => {
      const noteEl = document.createElement('div');
      noteEl.className = 'note-item';
      noteEl.innerHTML = `
        <button class="btn-delete-note" data-id="${note.id}" title="삭제">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <div class="note-header">
          <div class="note-author-wrap">
            <span class="note-emoji">${escapeHTML(note.emoji)}</span>
            <span class="note-name">${escapeHTML(note.name)}</span>
          </div>
          <span class="note-time">${escapeHTML(note.time)}</span>
        </div>
        <p class="note-body">${escapeHTML(note.message)}</p>
      `;
      notesGrid.appendChild(noteEl);
    });

    // 삭제 버튼 리스너 등록
    notesGrid.querySelectorAll('.btn-delete-note').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idToDelete = Number(btn.getAttribute('data-id'));
        notes = notes.filter(n => n.id !== idToDelete);
        localStorage.setItem('yejun_guestbook', JSON.stringify(notes));
        renderNotes();
        showToast('메시지가 삭제되었습니다.');
      });
    });
  }

  renderNotes();

  // 방명록 제출 핸들러
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('visitorName');
    const emojiInput = document.getElementById('visitorEmoji');
    const msgInput = document.getElementById('visitorMessage');

    const name = nameInput.value.trim();
    const emoji = emojiInput.value;
    const message = msgInput.value.trim();

    if (!name || !message) return;

    const now = new Date();
    const dateStr = `${now.getFullYear()}. ${String(now.getMonth() + 1).padStart(2, '0')}. ${String(now.getDate()).padStart(2, '0')}`;

    const newNote = {
      id: Date.now(),
      name,
      emoji,
      message,
      time: dateStr
    };

    notes.unshift(newNote);
    localStorage.setItem('yejun_guestbook', JSON.stringify(notes));
    renderNotes();

    // 폼 초기화
    nameInput.value = '';
    msgInput.value = '';
    showToast('소중한 메시지가 등록되었습니다! 감사합니다 ❤️');
  });
}

function escapeHTML(str) {
  return String(str).replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

/* ==========================================================================
   7. 이메일 클립보드 복사 (Copy Email)
   ========================================================================== */
function initCopyEmail() {
  const copyItem = document.getElementById('copyEmailItem');
  if (!copyItem) return;

  copyItem.addEventListener('click', () => {
    const emailEl = copyItem.querySelector('.value');
    const emailText = emailEl.textContent.trim();

    navigator.clipboard.writeText(emailText).then(() => {
      showToast(`이메일 주소(${emailText})가 복사되었습니다! 📋`);
    }).catch(() => {
      // 대체 복사
      const textArea = document.createElement('textarea');
      textArea.value = emailText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      showToast(`이메일 주소(${emailText})가 복사되었습니다! 📋`);
    });
  });
}

/* ==========================================================================
   8. 화면 직접 텍스트 수정 모드 (Inline Edit Mode)
   ========================================================================== */
function initEditMode() {
  const editModeBtn = document.getElementById('editModeBtn');
  const editBanner = document.getElementById('editNoticeBanner');
  const saveBtn = document.getElementById('saveEditsBtn');
  const resetBtn = document.getElementById('resetEditsBtn');
  const editableElements = document.querySelectorAll('.editable');

  // 저장된 수정본 불러오기
  const savedEdits = JSON.parse(localStorage.getItem('yejun_edited_content') || '{}');
  editableElements.forEach(el => {
    const key = el.getAttribute('data-edit');
    if (key && savedEdits[key]) {
      el.innerHTML = savedEdits[key];
    }
  });

  let isEditing = false;

  editModeBtn.addEventListener('click', () => {
    isEditing = !isEditing;
    toggleEditing(isEditing);
  });

  saveBtn.addEventListener('click', () => {
    const editsToSave = {};
    editableElements.forEach(el => {
      const key = el.getAttribute('data-edit');
      if (key) {
        editsToSave[key] = el.innerHTML;
      }
    });

    localStorage.setItem('yejun_edited_content', JSON.stringify(editsToSave));
    showToast('수정한 내용이 안전하게 저장되었습니다! ✨');
    
    // 편집 모드 종료
    isEditing = false;
    toggleEditing(false);
  });

  resetBtn.addEventListener('click', () => {
    if (confirm('모든 수정한 내용을 원래 기본값으로 되돌리시겠습니까?')) {
      localStorage.removeItem('yejun_edited_content');
      location.reload();
    }
  });

  function toggleEditing(enable) {
    if (enable) {
      document.body.classList.add('is-editing');
      editBanner.classList.remove('hidden');
      editableElements.forEach(el => {
        el.setAttribute('contenteditable', 'true');
      });
      editModeBtn.innerHTML = '<i class="fa-solid fa-check"></i> <span class="btn-text">수정 완료</span>';
      editModeBtn.style.background = '#4f46e5';
      editModeBtn.style.color = '#fff';
      showToast('직접 수정 모드가 켜졌습니다. 글자를 클릭해 변경하세요!');
    } else {
      document.body.classList.remove('is-editing');
      editBanner.classList.add('hidden');
      editableElements.forEach(el => {
        el.removeAttribute('contenteditable');
      });
      editModeBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> <span class="btn-text">내용 수정</span>';
      editModeBtn.style.background = '';
      editModeBtn.style.color = '';
    }
  }
}

/* ==========================================================================
   9. 토스트 알림창 (Toast Notification)
   ========================================================================== */
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.remove('hidden');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.add('hidden');
  }, 2600);
}

/* ==========================================================================
   10. 푸터 연도 자동 갱신
   ========================================================================== */
function updateFooterYear() {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}