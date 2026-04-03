// ==========================================
// 1. --- FIREBASE READY LOGIC (STRICTLY FIXED) ---
// ==========================================

const getRakshakFirebase = () => {
    return new Promise((resolve) => {
        const checkInterval = setInterval(() => {
            if (window.rakshakFirebase) {
                clearInterval(checkInterval);
                resolve(window.rakshakFirebase);
            }
        }, 100);
    });
};

const RAZORPAY_KEY = "rzp_test_SYbpfevfxtoawA"; // अपनी असली Razorpay Key यहाँ डालें
const myWhatsAppNumber = "8700730344"; 

// --- NEW STATE VARIABLES ---
let selectedPlan = 'lite'; // BY DEFAULT LITE (SIMPLE)
let isCouponApplied = false;

const langSwitcher = document.getElementById('lang-switcher');
const modal = document.getElementById('registration-modal');
const closeBtn = document.querySelector('.close-btn');

const payModal = document.getElementById('payment-modal');
const closePayment = document.querySelector('.close-payment');
const successModal = document.getElementById('success-modal');

window.closeModal = function() {
    const rakForm = document.getElementById('rakshak-form');
    const logForm = document.getElementById('login-form');
    if(rakForm) rakForm.reset();
    if(logForm) logForm.reset();

    const simplePrev = document.getElementById('simple-vnum-preview');
    const studioPrev = document.getElementById('studio-vnum-text');
    if(simplePrev) simplePrev.innerText = "MH 12 AB 1234";
    if(studioPrev) studioPrev.innerText = "MH 12 AB 1234";
    
    // Reset Coupon State
    isCouponApplied = false;
    const sBtn = document.getElementById('submit-btn');
    if(sBtn) { sBtn.disabled = true; sBtn.style.opacity = "0.5"; sBtn.innerText = "APPLY CODE FIRST"; }
    const cMsg = document.getElementById('coupon-msg');
    if(cMsg) cMsg.style.display = 'none';

    if(document.getElementById('mobile-error')) document.getElementById('mobile-error').style.display = 'none';
    if(document.getElementById('whatsapp-error')) document.getElementById('whatsapp-error').style.display = 'none';
    
    const allModals = [modal, payModal, successModal, document.getElementById('premium-studio-modal'), document.getElementById('login-modal'), document.getElementById('admin-login-modal'), document.getElementById('partner-login-modal'), document.getElementById('support-ticket-modal'), document.getElementById('benefits-slider-modal')];
    allModals.forEach(m => { if(m) m.style.display = 'none'; });
    
    document.body.style.overflow = 'auto';
};

// --- PLAN SELECTION LOGIC ---
window.selectPlan = function(plan) {
    selectedPlan = plan;
    const liteCard = document.getElementById('card-lite');
    const proCard = document.getElementById('card-pro');
    
    if(plan === 'lite') {
        liteCard.classList.add('highlighted-plan');
        proCard.classList.remove('highlighted-plan');
        liteCard.querySelector('.select-badge').innerText = "SELECTED";
        proCard.querySelector('.select-badge').innerText = "SELECT";
    } else {
        proCard.classList.add('highlighted-plan');
        liteCard.classList.remove('highlighted-plan');
        proCard.querySelector('.select-badge').innerText = "SELECTED";
        liteCard.querySelector('.select-badge').innerText = "SELECT";
    }
    updateSubmitButtonText();
};

// --- COUPON LOGIC (FIXED TWIST) ---
const applyBtn = document.getElementById('apply-coupon-btn');
if(applyBtn) {
    applyBtn.onclick = function() {
        const code = document.getElementById('coupon-code').value.trim().toUpperCase();
        const msg = document.getElementById('coupon-msg');
        const submitBtn = document.getElementById('submit-btn');
        const urlParams = new URLSearchParams(window.location.search);
        const isDealer = urlParams.get('ref');

        if(code === "WTRAK01") {
            isCouponApplied = true;
            msg.innerText = "🎉 Wow! Coupon Applied. Welcome to Rakshak Family!";
            msg.style.color = "#00FF00";
            msg.style.display = "block";
            submitBtn.disabled = false;
            submitBtn.style.opacity = "1";
            submitBtn.style.cursor = "pointer";
            updateSubmitButtonText();
        } else if(isDealer && code === isDealer.toUpperCase()) {
            isCouponApplied = true;
            msg.style.display = "none";
            submitBtn.disabled = false;
            submitBtn.style.opacity = "1";
            submitBtn.style.cursor = "pointer";
            updateSubmitButtonText();
        } else {
            isCouponApplied = false;
            msg.innerText = "❌ Invalid Code! Please enter valid Code.";
            msg.style.color = "#ff4d4d";
            msg.style.display = "block";
            submitBtn.disabled = true;
            submitBtn.style.opacity = "0.5";
        }
    };
}

// ==========================================
// 🚀 NEW SECURE PAYMENT & MAIN SUBMISSION
// (No Manual Verification, Zero Data Leak Logic)
// ==========================================

const rakForm = document.getElementById('rakshak-form');
if(rakForm) {
    rakForm.onsubmit = async function(e) {
        e.preventDefault();
        
        if(!isCouponApplied) {
            alert("Bhai, pehle Coupon Code (WTRAK01) / Dealer ID apply karo!");
            return false;
        }

        const ownerName = document.getElementById('owner-name').value;
        const vehicleNum = document.getElementById('vehicle-num').value.toUpperCase();
        const mobValue = document.getElementById('mobile-num').value;
        const waValue = document.getElementById('whatsapp-num').value;
        const couponCode = document.getElementById('coupon-code').value.trim().toUpperCase(); 
        
        let hasError = false;
        if(mobValue.length !== 10) { document.getElementById('mobile-error').style.display = 'block'; hasError = true; } 
        if(waValue.length !== 10) { document.getElementById('whatsapp-error').style.display = 'block'; hasError = true; } 
        if(hasError) return false;

        const isCustom = document.getElementById('btn-custom-qr-studio') ? document.getElementById('btn-custom-qr-studio').classList.contains('active-qr') : false;
        let activePrice = isCustom ? 299 : 199;
        const amountInPaise = activePrice * 100;

        const submitBtn = document.getElementById('submit-btn');
        if(submitBtn) { submitBtn.innerText = "Opening Secure Gateway..."; submitBtn.disabled = true; }

        const options = {
            "key": RAZORPAY_KEY,
            "amount": amountInPaise,
            "currency": "INR",
            "name": "Project Rakshak",
            "description": "Secure Registration for " + vehicleNum,
            "image": "https://i.postimg.cc/yYyX0Mt7/Chat-GPT-Image-Feb-27-2026-11-52-07-PM.png",
            "handler": async function (response) {
                try {
                    const { db, ref, push, set, get, update, query, orderByChild, equalTo } = await getRakshakFirebase();
                    const { increment } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js");

                    const customersRef = ref(db, 'customers');
                    const generatedID = "RKSK" + Math.floor(1000 + Math.random() * 9000);
                    const newCustomerRef = push(customersRef);

                    const formData = { 
                        generatedId: generatedID,
                        name: ownerName.toUpperCase(), 
                        vehicle: vehicleNum, 
                        mobile: mobValue, 
                        whatsapp: waValue, 
                        plan: isCustom ? "Premium Studio" : (selectedPlan === 'pro' ? "Pro Plan" : "Lite Plan"), 
                        amount: activePrice,
                        paymentId: response.razorpay_payment_id, // SECURE TXN ID
                        coupon: couponCode,
                        status: "Paid",
                        timestamp: new Date().toISOString()
                    };

                    await set(newCustomerRef, formData);

                    // --- PARTNER STATS AUTO-UPDATE ---
                    const partnersRef = ref(db, 'partners');
                    const partnerQuery = query(partnersRef, orderByChild('code'), equalTo(couponCode));
                    const partnerSnap = await get(partnerQuery);

                    if (partnerSnap.exists()) {
                        const partnerKey = Object.keys(partnerSnap.val())[0];
                        const partnerData = Object.values(partnerSnap.val())[0];
                        const partnerComm = parseFloat(partnerData.comm) || 0;
                        await update(ref(db, `partners/${partnerKey}`), {
                            totalSales: increment(1),
                            totalRevenue: increment(activePrice),
                            pendingComm: increment(partnerComm)
                        });
                    }

                    // --- UI SUCCESS REVEAL ---
                    document.getElementById('generated-user-id').value = generatedID;
                    document.getElementById('display-user-id').innerText = generatedID;
                    document.getElementById('final-vnum-display').innerText = vehicleNum;
                    
                    const finalQRData = window.location.href.split('index.html')[0] + "receiver.html?id=" + generatedID;
                    const qrApi = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(finalQRData)}`;
                    if(document.getElementById('dynamic-qr-img')) document.getElementById('dynamic-qr-img').src = qrApi;
                    if(document.getElementById('studio-qr-img')) document.getElementById('studio-qr-img').src = qrApi;
                    if(document.getElementById('final-universal-qr')) document.getElementById('final-universal-qr').src = qrApi;

                    if(modal) modal.style.display = 'none';
                    if(successModal) { successModal.style.display = 'block'; document.body.style.overflow = 'hidden'; }

                } catch (err) {
                    alert("Database Connection Error! But Payment Successful. ID: " + response.razorpay_payment_id);
                }
            },
            "prefill": { "name": ownerName, "contact": mobValue },
            "theme": { "color": "#F28C38" },
            "modal": { "ondismiss": function() { if(submitBtn) { submitBtn.disabled = false; updateSubmitButtonText(); } } }
        };

        const rzp1 = new Razorpay(options);
        rzp1.open();
    };
}

// ==========================================
// 🎨 --- STUDIO & UI TRANSFORMS (STRICTLY KEPT) ---
// ==========================================

let currentScale = 1;
let currentX = 0;
let currentY = 0;

function updateImgTransform() {
    const img = document.getElementById('studio-preview-img');
    if(img) { img.style.transform = `scale(${currentScale}) translate(${currentX}px, ${currentY}px)`; }
}

window.moveImg = function(direction) {
    const step = 10; 
    if(direction === 'up') currentY -= step;
    if(direction === 'down') currentY += step;
    if(direction === 'left') currentX -= step;
    if(direction === 'right') currentX += step;
    updateImgTransform();
};

const studioModal = document.getElementById('premium-studio-modal');
const closeStudioBtn = document.querySelector('.close-studio-btn');
const btnCustomStudio = document.getElementById('btn-custom-qr-studio');
const btnDoneStudio = document.getElementById('btn-done-studio');

if(btnCustomStudio) {
    btnCustomStudio.onclick = function() {
        const vNumInput = document.getElementById('vehicle-num').value;
        const studioVnumText = document.getElementById('studio-vnum-text');
        if(studioVnumText) studioVnumText.innerText = vNumInput || "MH 12 AB 1234";
        btnSimple.classList.remove('active-qr');
        btnCustomStudio.classList.add('active-qr');
        if(document.getElementById('simple-plan-info')) document.getElementById('simple-plan-info').style.display = 'none';
        if(document.getElementById('comparison-container')) document.getElementById('comparison-container').style.display = 'none';
        if(studioModal) { studioModal.style.display = 'block'; document.body.style.overflow = 'hidden'; }
        updateSubmitButtonText();
    };
}

if(closeStudioBtn) { closeStudioBtn.onclick = () => { studioModal.style.display = 'none'; document.body.style.overflow = 'auto'; }; }
if(btnDoneStudio) { btnDoneStudio.onclick = () => { studioModal.style.display = 'none'; document.body.style.overflow = 'auto'; }; }

const zoomSlider = document.getElementById('zoom-slider');
if(zoomSlider) { zoomSlider.oninput = function() { currentScale = this.value; updateImgTransform(); }; }

const studioPhotoUpload = document.getElementById('studio-photo-upload');
if(studioPhotoUpload) {
    studioPhotoUpload.onchange = function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const previewImg = document.getElementById('studio-preview-img');
                const placeholderText = document.getElementById('studio-placeholder-text');
                const imageControls = document.getElementById('image-controls');
                if(previewImg) {
                    previewImg.src = e.target.result;
                    previewImg.style.display = 'block';
                    currentScale = 1; currentX = 0; currentY = 0;
                    if(zoomSlider) zoomSlider.value = 1;
                    updateImgTransform();
                }
                if(placeholderText) placeholderText.style.display = 'none';
                if(imageControls) imageControls.style.display = 'block';
            }
            reader.readAsDataURL(file);
        }
    };
}

// ==========================================
// 🌍 --- TRANSLATIONS LOGIC (STRICTLY KEPT) ---
// ==========================================

const translations = {
    'en': { 
        hTitle: "Protect Your Vehicle's Privacy", hTag: "HAR GAADI KA GUARDIAN", reg: "REGISTER YOUR VEHICLE", counter: "● 2,484 VEHICLES PROTECTED TODAY",
        whyT: "Why You'll <span class='highlight'>Love Rakshak Tag</span>",
        whyS: "A SMARTER, SAFER WAY TO HANDLE EVERYDAY PARKING SITUATIONS",
        fTitle: "Register Your Vehicle", fTag: "HAR GAADI KA GUARDIAN", fOwner: "Owner Name", fVnum: "Vehicle Number", fMobile: "Mobile Number", fWa: "WhatsApp Number", fCustom: "🎨 PREMIUM STUDIO", fSimple: "SIMPLE QR ⬛", fScanAlert: "SCAN TO INFORM", fPayBtn: "PAY ₹{price} & GENERATE QR",
        hubBtn: "PARTNER ZONE ▼"
    },
    'hi': { 
        hTitle: "अपनी गाड़ी की प्राइवेसी सुरक्षित करें", hTag: "हर गाड़ी का गार्डियन", reg: "अपनी गाड़ी रजिस्टर करें", counter: "● आज 2,484 वाहनों को सुरक्षित किया गया",
        whyT: "रक्षक टैग आपको <span class='highlight'>क्यों पसंद आएगा</span>",
        whyS: "हर दिन की पार्किंग समस्याओं का स्मार्ट और सुरक्षित समाधान",
        fTitle: "अपनी गाड़ी रजिस्टर करें", fTag: "हर गाड़ी का गार्डियन", fOwner: "मालिक का नाम", fVnum: "गाड़ी का नंबर", fMobile: "मोबाइल नंबर", fWa: "व्हाट्सएप नंबर", fCustom: "🎨 PREMIUM STUDIO", fSimple: "सिंपल QR ⬛", fScanAlert: "सूचित करें", fPayBtn: "₹{price} पे करें",
        hubBtn: "पार्टनर जोन ▼"
    }
};

if(langSwitcher) {
    langSwitcher.addEventListener('change', (e) => {
        const lang = e.target.value;
        const data = translations[lang];
        if (data) {
            document.getElementById('txt-hero-title').innerText = data.hTitle;
            document.getElementById('txt-hero-tagline').innerText = data.hTag;
            document.getElementById('txt-reg-btn').innerText = data.reg;
            document.getElementById('txt-counter').innerHTML = `<span class="blinking-dot">●</span> ${data.counter.replace('●', '').trim()}`;
            const whySection = document.getElementById('txt-why-title');
            if(whySection) {
                const h2 = whySection.querySelector('h2');
                const subP = whySection.querySelector('.sub-text');
                if(h2) h2.innerHTML = data.whyT;
                if(subP) subP.innerText = data.whyS;
            }
            document.getElementById('f-title').innerText = data.fTitle;
            document.getElementById('f-tag').innerText = data.fTag;
            document.getElementById('f-owner').innerText = data.fOwner;
            document.getElementById('f-vnum').innerText = data.fVnum;
            document.getElementById('f-mobile').innerText = data.fMobile;
            document.getElementById('f-wa').innerText = data.fWa;
            if(document.getElementById('btn-custom-qr-studio')) document.getElementById('btn-custom-qr-studio').innerText = data.fCustom;
            document.getElementById('btn-simple-qr').innerText = data.fSimple;
            updateSubmitButtonText();
        }
    });
}

function updateSubmitButtonText() {
    const lang = langSwitcher ? langSwitcher.value : 'en';
    const data = translations[lang] || translations['en'];
    const submitBtn = document.getElementById('submit-btn');
    const priceDisplay = document.getElementById('display-price');
    
    if (submitBtn) {
        let price = "199"; 
        if(btnCustomStudio && btnCustomStudio.classList.contains('active-qr')) { price = "299"; }
        if(isCouponApplied) { submitBtn.innerText = data.fPayBtn.replace('{price}', price); } 
        else { submitBtn.innerText = "APPLY CODE FIRST"; }
        if(priceDisplay) priceDisplay.innerText = `₹${price} FOR ${selectedPlan.toUpperCase()} PLAN`;
    }
}

const vehicleInput = document.getElementById('vehicle-num');
if(vehicleInput) {
    vehicleInput.oninput = function() {
        this.value = this.value.toUpperCase(); 
        const val = this.value || "MH 12 AB 1234";
        const simplePrev = document.getElementById('simple-vnum-preview');
        const studioPrev = document.getElementById('studio-vnum-text');
        if(simplePrev) simplePrev.innerText = val;
        if(studioPrev) studioPrev.innerText = val;
    };
}

const allRegButtons = [document.getElementById('txt-reg-btn')]; 
allRegButtons.forEach(btn => { if(btn) btn.onclick = () => { 
    window.closeModal(); 
    if(modal) { modal.style.display = 'block'; document.body.style.overflow = 'hidden'; if(btnSimple) btnSimple.click(); }
}; });

if(closeBtn) closeBtn.onclick = () => { window.closeModal(); };

const btnSimple = document.getElementById('btn-simple-qr');
const simplePlanInfo = document.getElementById('simple-plan-info');

if(btnSimple) {
    btnSimple.onclick = () => {
        if(btnCustomStudio) btnCustomStudio.classList.remove('active-qr');
        btnSimple.classList.add('active-qr');
        if(simplePlanInfo) simplePlanInfo.style.display = 'block';
        if(document.getElementById('comparison-container')) document.getElementById('comparison-container').style.display = 'block';
        updateSubmitButtonText();
    };
}

// ==========================================
// 🔐 --- LOGIN & ACCESS LOGIC (STRICTLY KEPT) ---
// ==========================================

const loginModal = document.getElementById('login-modal');
const btnLoginOpen = document.getElementById('btn-login-open');
if(btnLoginOpen) { btnLoginOpen.onclick = function() { if(loginModal) { const logInp = document.getElementById('login-mobile'); if(logInp) logInp.value = ""; loginModal.style.display = 'block'; document.body.style.overflow = 'hidden'; } }; }
const closeLoginBtn = document.querySelector('.close-login-btn');
if(closeLoginBtn) { closeLoginBtn.onclick = () => { window.closeModal(); }; }

const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.onsubmit = async function(e) {
        e.preventDefault();
        const mobileInput = document.getElementById('login-mobile').value;
        const loginBtn = e.target.querySelector('button');
        if (mobileInput.length !== 10 || isNaN(mobileInput)) { alert("Bhai, sahi se 10 digit ka mobile number toh dalo!"); return; }
        loginBtn.innerText = "Verifying..."; loginBtn.disabled = true; 
        try {
            const { db, ref, get, query, orderByChild, equalTo } = await getRakshakFirebase();
            const customersRef = ref(db, 'customers');
            const loginQuery = query(customersRef, orderByChild('mobile'), equalTo(mobileInput));
            const snapshot = await get(loginQuery);
            if (snapshot.exists()) { localStorage.setItem('userMobile', mobileInput); window.location.href = "dashboard.html"; } 
            else { alert("Bhai, ye number Rakshak ke saath registered nahi hai!"); loginBtn.innerText = "SIGN IN TO DASHBOARD ➔"; loginBtn.disabled = false; }
        } catch (err) { alert("Database error!"); loginBtn.innerText = "SIGN IN TO DASHBOARD ➔"; loginBtn.disabled = false; }
    };
}

const adminForm = document.getElementById('admin-login-form');
if(adminForm) {
    adminForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const empId = document.getElementById('admin-emp-id').value;
        const pass = document.getElementById('admin-pass').value;
        try {
            const { db, ref, get } = await getRakshakFirebase();
            const adminRef = ref(db, 'admins/' + empId);
            const snapshot = await get(adminRef);
            if (snapshot.exists() && snapshot.val().password === pass) { alert("✅ Welcome Admin!"); window.location.href = "admin-dashboard.html"; } 
            else { alert("❌ Galat ID ya Password!"); }
        } catch (err) { alert("Firebase Connection Error!"); }
    });
}

const partnerForm = document.getElementById('partner-login-form');
if(partnerForm) {
    partnerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const pId = partnerForm.querySelector('input[type="text"]').value;
        const pPass = partnerForm.querySelector('input[type="password"]').value;
        try {
            const { db, ref, get } = await getRakshakFirebase();
            const pRef = ref(db, 'partners/' + pId);
            const snapshot = await get(pRef);
            if (snapshot.exists() && snapshot.val().password === pPass) { alert("🚀 Partner Access Granted!"); window.location.href = "partner-dashboard.html"; } 
            else { alert("❌ Invalid Partner ID!"); }
        } catch (err) { alert("Error connecting to Firebase!"); }
    });
}

// ==========================================
// 📱 --- SLIDER & SERVICES LOGIC (STRICTLY KEPT) ---
// ==========================================

const sliderData = {
    love: [
        { title: "No Parking Drama", desc: "Get polite alerts if you've parked wrongly—no heated arguments, no awkward sticky notes.", img: "https://i.postimg.cc/4NdLFgCG/Whats-App-Image-2026-03-27-at-7-37-41-AM.jpg", color: "#1a3a6c" },
        { title: "Privacy First", desc: "Communicate safely without ever revealing your phone number.", img: "https://i.postimg.cc/3wFdVdzS/6491945-jpg.jpg", color: "#1e4a8a" },
        { title: "Emergency Profiles", desc: "Scan to see blood group or contact family instantly.", img: "https://i.postimg.cc/J4fHSwYf/Doctors-analyzing-patients-disease-history.jpg", color: "#2c3e50" },
        { title: "Instant Updates", desc: "Change your phone number anytime from your dashboard.", img: "https://i.postimg.cc/Y0yq6FZJ/11138.jpg", color: "#1a3a6c" },
        { title: "No App Needed", desc: "Scan using just your smartphone camera.", img: "https://i.postimg.cc/y6tYfmk3/6139b09a-6272-4f25-ae43-a8231c248fc9-jpg.jpg", color: "#1e4a8a" },
        { title: "Works for All", desc: "Perfect for cars, bikes, trucks, or fleets.", img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800", color: "#2c3e50" },
        { title: "Tough & Reflective", desc: "Weather-proof tags designed for rain and sun.", img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800", color: "#1a3a6c" },
        { title: "Built for India", desc: "Designed for our busy roads and narrow lanes.", img: "https://i.postimg.cc/MZVKFcRG/vecteezy-make-in-india-logo-vector-make-in-india-icon-free-vector-20190685.jpg", color: "#1e4a8a" }
    ],
    needs: [
        { title: "460+ Daily Deaths", desc: "Inform family within Golden Hour.", img: "https://images.unsplash.com/photo-1518130028744-97d3a28c3925?q=80&w=800", color: "#8b0000" },
        { title: "30% Parking Disputes", desc: "Avoid violence during parking disputes.", img: "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?q=80&w=800", color: "#1a3a6c" },
        { title: "20 Lakh+ Fines", desc: "Get alerts before police towing.", img: "https://images.unsplash.com/photo-1574621100236-d25b64cfd647?q=80&w=800", color: "#2c3e50" }
    ]
};

let currentSlideIndex = 0;
let currentCategory = 'love';

window.openBenefitSlider = function(index, category) {
    currentSlideIndex = index; currentCategory = category; updateSliderUI();
    const sliderModal = document.getElementById('benefits-slider-modal');
    if(sliderModal) { sliderModal.style.display = 'flex'; document.body.style.overflow = 'hidden'; }
};

function updateSliderUI() {
    const data = sliderData[currentCategory][currentSlideIndex];
    if(document.getElementById('benefit-title')) document.getElementById('benefit-title').innerText = data.title;
    if(document.getElementById('benefit-desc')) document.getElementById('benefit-desc').innerText = data.desc;
    if(document.getElementById('benefit-image')) document.getElementById('benefit-image').src = data.img;
}

window.nextSlide = function() { currentSlideIndex = (currentSlideIndex + 1) % sliderData[currentCategory].length; updateSliderUI(); };
window.prevSlide = function() { currentSlideIndex = (currentSlideIndex - 1 + sliderData[currentCategory].length) % sliderData[currentCategory].length; updateSliderUI(); };

window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const dealerCode = urlParams.get('ref');
    if (dealerCode) {
        const couponInp = document.getElementById('coupon-code');
        if(couponInp) { couponInp.value = dealerCode.toUpperCase(); couponInp.readOnly = true; couponInp.style.background = "rgba(255,255,255,0.05)"; }
        isCouponApplied = true;
        const sBtn = document.getElementById('submit-btn');
        if(sBtn) { sBtn.disabled = false; sBtn.style.opacity = "1"; sBtn.style.cursor = "pointer"; }
        updateSubmitButtonText();
    }
    if (urlParams.get('action') === 'openRegister') { window.scrollTo(0, 0); setTimeout(() => { window.openModal('registration-modal'); }, 300); }
};

// ==========================================
// 🚀 --- RAKSHAK EXTRA SERVICES (STRICTLY KEPT) ---
// ==========================================

window.closeServiceModal = function() {
    const modal = document.getElementById('service-inquiry-modal');
    const form = document.getElementById('service-inquiry-form');
    if(modal) { modal.style.display = 'none'; document.body.style.overflow = 'auto'; if(form) form.reset(); }
};

const serviceForm = document.getElementById('service-inquiry-form');
if(serviceForm) {
    serviceForm.onsubmit = async function(e) {
        e.preventDefault();
        const serviceType = document.getElementById('selected-service-type').value;
        const submitBtn = document.getElementById('service-submit-btn');
        if(submitBtn) { submitBtn.innerText = "Processing..."; submitBtn.disabled = true; }
        try {
            const { db, ref, push, set } = await getRakshakFirebase();
            const baseData = {
                serviceType: serviceType,
                name: document.getElementById('applicant-name').value.toUpperCase(),
                mobile: document.getElementById('applicant-number').value,
                timestamp: new Date().toISOString(),
                status: "Pending"
            };
            const targetNode = serviceType.includes('fastag') ? 'fastag_orders' : 'ev_inquiries';
            await set(push(ref(db, targetNode)), baseData);
            window.closeServiceModal();
            alert("Thank you! Rakshak team will contact you soon.");
        } catch (error) { alert("Error! Check internet."); } finally { if(submitBtn) { submitBtn.innerText = "SUBMIT REQUEST"; submitBtn.disabled = false; } }
    };
}
// ==========================================
// 🚀 RAKSHAK FINAL MASTER NAVIGATION (STRICTLY FIXED)
// ==========================================

// 1. Global Function (HTML onclick ke liye - Isko hamesha bahar rakho)
window.toggleRakshakMenu = function(e) {
    if(e) e.stopPropagation();
    const drawer = document.getElementById('side-drawer');
    if (drawer) {
        drawer.classList.toggle('active');
        console.log("Drawer Status: ", drawer.classList.contains('active'));
        
        if (drawer.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    } else {
        alert("Malik, HTML mein 'side-drawer' ID nahi mil rahi!");
    }
};

// 2. Baki ke Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    const icon = document.getElementById('mobile-menu-icon');
    const drawer = document.getElementById('side-drawer');
    const partnerBtn = document.getElementById('partner-zone-btn');

    // Partner Zone Toggle
    if (partnerBtn) {
        partnerBtn.onclick = function(e) {
            e.stopPropagation();
            const dropMenu = this.nextElementSibling;
            if (dropMenu) {
                dropMenu.classList.toggle('active-dropdown');
            }
        };
    }

    // Screen pe bahar click karne par band ho jaye
    document.addEventListener('click', function(e) {
        if (drawer && drawer.classList.contains('active')) {
            if (!drawer.contains(e.target) && (icon && !icon.contains(e.target))) {
                drawer.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });

    // Link click hone par menu band ho jaye
    const allLinks = document.querySelectorAll('.nav-bar a, .mobile-only-link');
    allLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (drawer && window.innerWidth <= 1100) {
                drawer.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });
}); // <--- Bas ek baar band hoga ye!
// --- SABSE LAST MEIN YE ---
window.toggleRakshakMenu = function(e) {
    if(e) e.stopPropagation();
    const drawer = document.getElementById('side-drawer');
    if (drawer) {
        drawer.classList.toggle('active');
        console.log("Drawer Status: ", drawer.classList.contains('active'));
        
        if (drawer.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    } else {
        alert("Malik, HTML mein 'side-drawer' ID nahi mil rahi!");
    }
};