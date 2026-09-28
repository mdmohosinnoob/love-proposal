const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const question = document.getElementById('question');
const gif = document.getElementById('gif');
const btnGroup = document.querySelector('.btn-group');

const musicBefore = document.getElementById('bgMusicBefore');
const musicAfter = document.getElementById('bgMusicAfter');

// প্রথম টাচ/ক্লিকে ব্যাকগ্রাউন্ড মিউজিক প্লে করা
function startInitialMusic() {
    if (musicBefore && musicBefore.paused) {
        musicBefore.volume = 0.3;
        musicBefore.play().catch(err => console.log("Audio error:", err));
    }
}
window.addEventListener('click', startInitialMusic, { once: true });
window.addEventListener('touchstart', startInitialMusic, { once: true });

// ইনস্ট্যান্ট সুপার-ফাস্ট মুভমেন্ট ইভেন্ট
noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});
noBtn.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    moveNoButton();
});

function moveNoButton() {
    if (!btnGroup) return;

    const containerWidth = btnGroup.clientWidth;
    const containerHeight = btnGroup.clientHeight;

    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    // .btn-group এর সীমানার ভেতরেই র্যান্ডম পজিশন গণনা
    const maxX = Math.max(0, containerWidth - btnWidth);
    const maxY = Math.max(0, containerHeight - btnHeight);

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
}

// Yes Button Click Action
yesBtn.addEventListener('click', () => {
    question.innerHTML = 'I knew it! 🥰❤️';
    gif.src = './img/bear2.gif';

    if (musicBefore) {
        musicBefore.pause();
    }

    if (musicAfter) {
        musicAfter.currentTime = 0;
        musicAfter.volume = 1.0;
        musicAfter.play().catch(err => console.log("Main audio error:", err));
    }

    if (btnGroup) {
        btnGroup.style.display = 'none';
    }
});
// No button click/tap block
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton();
});
