// 난이도별 단어 데이터
const wordData = {
    easy: [
        { word: 'apple', hint: '빨간 과일' },
        { word: 'book', hint: '읽는 것' },
        { word: 'cat', hint: '야옹하는 동물' },
        { word: 'dog', hint: '멍멍하는 동물' },
        { word: 'egg', hint: '닭이 낳는 것' },
        { word: 'fish', hint: '물에 사는 동물' },
        { word: 'girl', hint: '여자 아이' },
        { word: 'hand', hint: '손' },
        { word: 'ice', hint: '얼음' },
        { word: 'jump', hint: '뛰다' },
        { word: 'king', hint: '왕' },
        { word: 'love', hint: '사랑' },
        { word: 'moon', hint: '달' },
        { word: 'nose', hint: '코' },
        { word: 'open', hint: '열다' },
        { word: 'play', hint: '놀다' },
        { word: 'rain', hint: '비' },
        { word: 'sun', hint: '태양' },
        { word: 'tree', hint: '나무' },
        { word: 'water', hint: '물' },
        { word: 'zoo', hint: '동물원' },
        { word: 'bird', hint: '새' },
        { word: 'car', hint: '자동차' },
        { word: 'door', hint: '문' },
        { word: 'eye', hint: '눈' }
    ],
    medium: [
        { word: 'beautiful', hint: '아름다운' },
        { word: 'challenge', hint: '도전' },
        { word: 'discover', hint: '발견하다' },
        { word: 'education', hint: '교육' },
        { word: 'fantastic', hint: '환상적인' },
        { word: 'generous', hint: '관대한' },
        { word: 'hospital', hint: '병원' },
        { word: 'important', hint: '중요한' },
        { word: 'journey', hint: '여행' },
        { word: 'knowledge', hint: '지식' },
        { word: 'language', hint: '언어' },
        { word: 'mountain', hint: '산' },
        { word: 'necessary', hint: '필요한' },
        { word: 'opportunity', hint: '기회' },
        { word: 'perfect', hint: '완벽한' },
        { word: 'question', hint: '질문' },
        { word: 'remember', hint: '기억하다' },
        { word: 'scientist', hint: '과학자' },
        { word: 'together', hint: '함께' },
        { word: 'university', hint: '대학교' },
        { word: 'victory', hint: '승리' },
        { word: 'wonderful', hint: '훌륭한' },
        { word: 'exercise', hint: '운동' },
        { word: 'favorite', hint: '좋아하는' },
        { word: 'holiday', hint: '휴일' }
    ],
    hard: [
        { word: 'accomplish', hint: '성취하다' },
        { word: 'beneficial', hint: '유익한' },
        { word: 'complicated', hint: '복잡한' },
        { word: 'determination', hint: '결심' },
        { word: 'enthusiasm', hint: '열정' },
        { word: 'fundamental', hint: '기본적인' },
        { word: 'guarantee', hint: '보장하다' },
        { word: 'hypothesis', hint: '가설' },
        { word: 'illustrate', hint: '설명하다' },
        { word: 'justification', hint: '정당화' },
        { word: 'knowledgeable', hint: '박식한' },
        { word: 'laboratory', hint: '실험실' },
        { word: 'magnificent', hint: '웅장한' },
        { word: 'nevertheless', hint: '그럼에도 불구하고' },
        { word: 'opportunity', hint: '기회' },
        { word: 'philosophy', hint: '철학' },
        { word: 'qualification', hint: '자격' },
        { word: 'recommendation', hint: '추천' },
        { word: 'sophisticated', hint: '세련된' },
        { word: 'theoretical', hint: '이론적인' },
        { word: 'understanding', hint: '이해' },
        { word: 'vocabulary', hint: '어휘' },
        { word: 'widespread', hint: '광범위한' },
        { word: 'extraordinary', hint: '비범한' },
        { word: 'phenomenon', hint: '현상' }
    ]
};

// 게임 상태
let gameState = {
    currentLevel: null,
    currentWordIndex: 0,
    score: 0,
    correct: 0,
    wrong: 0,
    words: []
};

// DOM 요소
const difficultyScreen = document.getElementById('difficulty-screen');
const gameScreen = document.getElementById('game-screen');
const difficultyButtons = document.querySelectorAll('.difficulty-btn');
const hintDisplay = document.getElementById('hint');
const wordInput = document.getElementById('word-input');
const submitBtn = document.getElementById('submit-btn');
const restartBtn = document.getElementById('restart-btn');
const changeDifficultyBtn = document.getElementById('change-difficulty-btn');
const scoreDisplay = document.getElementById('score');
const correctDisplay = document.getElementById('correct');
const wrongDisplay = document.getElementById('wrong');
const currentLevelDisplay = document.getElementById('current-level');
const feedbackDisplay = document.getElementById('feedback');

// 난이도별 한글 이름
const levelNames = {
    easy: '초딩',
    medium: '중딩',
    hard: '고딩'
};

// 난이도 선택 이벤트
difficultyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const level = btn.dataset.level;
        startGame(level);
    });
});

// 게임 시작
function startGame(level) {
    gameState.currentLevel = level;
    gameState.currentWordIndex = 0;
    gameState.score = 0;
    gameState.correct = 0;
    gameState.wrong = 0;
    
    // 단어 배열 섞기
    gameState.words = [...wordData[level]].sort(() => Math.random() - 0.5);
    
    // 화면 전환
    difficultyScreen.classList.remove('active');
    gameScreen.classList.add('active');
    
    // 레벨 표시 업데이트
    currentLevelDisplay.textContent = levelNames[level];
    
    // 첫 단어 표시
    showNextWord();
    
    // 입력 필드 포커스
    wordInput.focus();
    wordInput.value = '';
    feedbackDisplay.textContent = '';
    feedbackDisplay.className = 'feedback';
    
    updateScore();
}

// 다음 단어 표시
function showNextWord() {
    if (gameState.currentWordIndex >= gameState.words.length) {
        // 단어가 모두 끝나면 다시 섞기
        gameState.words = [...wordData[gameState.currentLevel]].sort(() => Math.random() - 0.5);
        gameState.currentWordIndex = 0;
    }
    
    const currentWord = gameState.words[gameState.currentWordIndex];
    hintDisplay.textContent = currentWord.hint;
    
    wordInput.value = '';
    wordInput.focus();
}

// 정답 확인
function checkAnswer() {
    const userAnswer = wordInput.value.trim().toLowerCase();
    const currentWord = gameState.words[gameState.currentWordIndex];
    const correctAnswer = currentWord.word.toLowerCase();
    
    if (userAnswer === correctAnswer) {
        // 정답
        gameState.score += 10;
        gameState.correct++;
        feedbackDisplay.textContent = '정답입니다! 🎉';
        feedbackDisplay.className = 'feedback correct';
        
        // 다음 단어로 이동
        setTimeout(() => {
            gameState.currentWordIndex++;
            showNextWord();
            feedbackDisplay.textContent = '';
            feedbackDisplay.className = 'feedback';
        }, 1000);
    } else {
        // 오답
        gameState.wrong++;
        feedbackDisplay.textContent = `틀렸습니다! 정답: ${correctAnswer}`;
        feedbackDisplay.className = 'feedback wrong';
        
        // 다음 단어로 이동
        setTimeout(() => {
            gameState.currentWordIndex++;
            showNextWord();
            feedbackDisplay.textContent = '';
            feedbackDisplay.className = 'feedback';
        }, 2000);
    }
    
    updateScore();
}

// 점수 업데이트
function updateScore() {
    scoreDisplay.textContent = gameState.score;
    correctDisplay.textContent = gameState.correct;
    wrongDisplay.textContent = gameState.wrong;
}

// 제출 버튼 클릭
submitBtn.addEventListener('click', checkAnswer);

// Enter 키 입력
wordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkAnswer();
    }
});

// 다시 시작 버튼
restartBtn.addEventListener('click', () => {
    if (gameState.currentLevel) {
        startGame(gameState.currentLevel);
    }
});

// 난이도 변경 버튼
changeDifficultyBtn.addEventListener('click', () => {
    gameScreen.classList.remove('active');
    difficultyScreen.classList.add('active');
});

