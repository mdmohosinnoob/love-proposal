const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const question = document.getElementById('question');
const gif = document.getElementById('gif');

// অডিও ট্যাগ দুটি সিলেক্ট করা
const musicBefore = document.getElementById('bgMusicBefore');
const musicAfter = document.getElementById('bgMusicAfter');

window.addEventListener('DOMContentLoaded', () => {
    noBtn.style.left = '180px';
});

// পেজে প্রথম স্পর্শ বা ইন্টারঅ্যাকশনে ১ম গানটি প্লে হবে (অটো-প্লে পলিসির জন্য)
function startInitialMusic() {
    if (musicBefore && musicBefore.paused) {
        musicBefore.volume = 0.3; // হালকা ভলিউমে বাজবে
        musicBefore.play().catch(err => console.log("Initial audio error:", err));
    }
}

// ইউজার ব্রাউজারে যেকোনো জায়গায় প্রথম ক্লিক বা টাচ করলে গান শুরু হবে
window.addEventListener('click', startInitialMusic, { once: true });
window.addEventListener('touchstart', startInitialMusic, { once: true });

// No button hover / touch effect (পজিশন চেঞ্জ)
noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', moveNoButton);

function moveNoButton() {
    const card = document.querySelector('.card');
    const cardRect = card.getBoundingClientRect();

    const maxX = cardRect.width - noBtn.offsetWidth - 30;
    const maxY = cardRect.height - noBtn.offsetHeight - 30;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
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

    // বাটন গ্রুপ হাইড করে দেওয়া
    document.querySelector('.btn-group').style.display = 'none';
});
