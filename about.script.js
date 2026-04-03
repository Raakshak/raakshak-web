// 1. AOS Animation Init
AOS.init({ duration: 1000, once: true });

// 2. Counter Animation (Fixed for smoothness)
const counters = document.querySelectorAll('.counter');
const runCounters = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const inc = target / 50; // Speed adjustment

        const updateCount = () => {
            if (count < target) {
                count += inc;
                counter.innerText = Math.ceil(count);
                setTimeout(updateCount, 30);
            } else {
                counter.innerText = target.toLocaleString() + "+";
            }
        };
        updateCount();
    });
};

// 3. Intersection Observer for Stats (Trigger only when seen)
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    let observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            runCounters();
            observer.disconnect();
        }
    }, { threshold: 0.5 });
    observer.observe(statsSection);
}

// 4. --- MODAL LOGIC (Fixed for Letter) ---
// Isse ye fayda hoga ki agar button load hone mein deri kare toh bhi error nahi aayega
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("letterModal");
    const openBtn = document.getElementById("openLetter");
    const closeBtn = document.getElementById("closeLetter");

    // Open Letter
    if (openBtn && modal) {
        openBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Kisi bhi default action ko rokne ke liye
            modal.style.display = "block";
            document.body.style.overflow = "hidden"; // Background scroll stop
        });
    }

    // Close Letter (Button se)
    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = "none";
            document.body.style.overflow = "auto"; // Scroll wapas on
        });
    }

    // Close Letter (Bahat click karne par)
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });
});