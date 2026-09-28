const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const question = document.getElementById('question');
const gif = document.getElementById('gif');

const musicBefore = document.getElementById('bgMusicBefore');
const musicAfter = document.getElementById('bgMusicAfter');

window.addEventListener('DOMContentLoaded', () => {
    resetNoButtonPosition();
});

// ইনিশিয়াল পজিশন সেটআপ
function resetNoButtonPosition() {
    noBtn.style.position = 'absolute';
    noBtn.style.bottom = '15px';
    noBtn.style.right = '20px';
    noBtn.style.top = 'auto';
    noBtn.style.left = 'auto';
}

// প্রথম ক্লিকে মিউজিক শুরু
function startInitialMusic() {
    if (musicBefore && musicBefore.paused) {
        musicBefore.volume = 0.3;
        musicBefore.play().catch(err => console.log("Initial audio error:", err));
    }
}

window.addEventListener('click', startInitialMusic, { once: true });
window.addEventListener('touchstart', startInitialMusic, { once: true });

// No button hover / touch event
noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); // মোবাইলে স্ক্রোল হওয়া আটকায়
    moveNoButton();
});

function moveNoButton() {
    const card = document.querySelector('.card');
    const cardRect = card.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    // কার্ডের ভেতর বাটনটি নিরাপদে চলাফেরা করার সীমানা (Padding Safe Zone)
    const padding = 15;
    const maxX = cardRect.width - btnRect.width - (padding * 2);
    const maxY = cardRect.height - btnRect.height - (padding * 2);

    // নিরাপদ সীমানার মধ্যে র্যান্ডম পজিশন
    const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
    const randomY = Math.max(padding, Math.floor(Math.random() * maxY));

    noBtn.style.top = `${randomY}px`;
    noBtn.style.left = `${randomX}px`;
    noBtn.style.bottom = 'auto';
    noBtn.style.right = 'auto';
}

// Yes button click action
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

    document.querySelector('.btn-group').style.display = 'none';
});
