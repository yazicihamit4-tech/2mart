window.onerror = function (msg, url, line) {
        const el = document.getElementById('errorLog');
        if (el) el.innerText = "Hata: " + msg;
        console.error("Global Error:", msg, url, line);
    };

    // Alert Override to filter generic AdMob errors
    const _originalAlert = window.alert;
    window.alert = function (msg) {
        if (msg && typeof msg === "string" && (msg.toLowerCase().includes("google bu kullanıcıya reklam göndermedi") || msg.toLowerCase().includes("google bu kullanıcı için reklam göndermedi"))) return;
        if (_originalAlert) _originalAlert(msg);
    };
    let lastWidth = window.innerWidth;
    const fixH = () => {
        const newWidth = window.innerWidth;
        if (newWidth !== lastWidth) { lastWidth = newWidth; document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`); }
    };
    document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
    window.addEventListener('resize', fixH);

    const firebaseConfig = { apiKey: "AIzaSyD4Pe0CHilO9fEZd832vEK3-c5-MAZo3X8", authDomain: "oyuntahmin.firebaseapp.com", databaseURL: "https://oyuntahmin-default-rtdb.firebaseio.com", projectId: "oyuntahmin", storageBucket: "oyuntahmin.firebasestorage.app", messagingSenderId: "326852389532", appId: "1:326852389532:web:efd391392459a0c75a1b59", measurementId: "G-Q8JQJCTL62" };

    let db;
    let messaging; // Messaging servisi için değişken
    let user = { name: "", avatar: "😎", gold: 500, xp: 0, level: 1, wordLevel: 1, careerLevel: 1, careerWins: 0, clan: "", winStreak: 0, extraSpins: 0, inventory: [], totalMinutes: 0, lastVaultTime: 0, claimedCareerRewards: {}, items: { oracle: 0, freeze: 0, sabotage: 0 } }; let gamesPlayedCount = 0; // Reklam sayacı
    const ADMIN_NAMES = ["YazHamit", "Yazhamit"];
    const FORCE_AD_SIMULATOR = true; // Geliştirme aşamasında veya sorun olduğunda true yapın
    const VIP_NAMES = ["YazHamit", "Yazhamit"];
    const ADMIN_HASH = "OTc2NDkzLkh5"; // Base64 encoded
    const OKUEMEL_HASH = "RW1lbGfDtmthbHA="; // Base64 encoded
    let game = { active: false, mode: "", room: "", role: "", diff: 4, type: "classic", playStyle: "turn", turn: "p1", mySecret: "", rights: 15, duration: 3, timerInt: null, usedItems: [] };
    let globalMultiplier = 1;
    let activeQuest = null;
    let currentScreen = 'screen-login';
    let adminData = { users: {}, presence: {}, banned: {} };
    let adminListenersActive = false;
    let currentAdminTab = 'online';

    let pendingInviteRoom = null;
    let isChatBlocked = false;
    let playTimeInterval = null;
    let careerLevel = parseInt(localStorage.getItem("careerLevel")) || 1;


    // --- KELİME OYUNU VERİTABANI (TÜRKİYE & TARİH) ---

    // WORD_DATA and WORD_CAREER_LEVELS are now in word_data.js


    let wordGameState = { active: false, secret: "", guesses: [], maxGuesses: 6, currentGuess: "", level: 1 };
const THEMES = [
        { id: 'theme-tr', name: '🇹🇷 Türkiye', cost: 'AD', type: 'team' }, { id: 'theme-gs', name: '🦁 Galatasaray', cost: 'AD', type: 'team' }, { id: 'theme-fb', name: '🐦 Fenerbahçe', cost: 'AD', type: 'team' }, { id: 'theme-bjk', name: '🦅 Beşiktaş', cost: 'AD', type: 'team' }, { id: 'theme-ts', name: '🌀 Trabzonspor', cost: 'AD', type: 'team' }, { id: 'theme-goz', name: '🟡🔴 Göztepe', cost: 'AD', type: 'team' }, { id: 'theme-ksk', name: '🟢🔴 Karşıyaka', cost: 'AD', type: 'team' }, { id: 'theme-dark', name: '🌙 Gece', cost: 'AD', type: 'color' }, { id: 'theme-forest', name: '🌲 Orman', cost: 'AD', type: 'color' }, { id: 'theme-ocean', name: '🌊 Okyanus', cost: 'AD', type: 'color' }, { id: 'theme-love', name: '💖 Aşk', cost: 'AD', type: 'color' }, { id: 'bg-space', name: '🌌 Uzay', cost: 'AD', type: 'bg' }, { id: 'bg-matrix', name: '📟 Matrix', cost: 'AD', type: 'bg' }, { id: 'bg-hex', name: '🐝 Petek', cost: 'AD', type: 'bg' }, { id: 'bg-sky', name: '☁️ Gökyüzü', cost: 'AD', type: 'bg' }, { id: 'skin-gold', name: '👑 Altın', cost: 'AD', type: 'bg' }, { id: 'bg-neon-city', name: '🌃 Neon City', cost: 0, type: 'bg' }, { id: 'bg-mystic-purple', name: '🔮 Mistik Mor', cost: 0, type: 'bg' }, { id: 'bg-volcano', name: '🌋 Volkan', cost: 0, type: 'bg' }, { id: 'bg-deep-sea', name: '🦈 Derin Deniz', cost: 0, type: 'bg' }
    ];
    // --- KART VERİTABANI ---
    // --- TÜRKİYE KOLEKSİYON VERİTABANI ---




    const AdManager = {
        pendingCallback: null,

        // AdMob Configuration (Secondary)
        appId: "ca-app-pub-5879474591831999~1348513678",

        // AdMob Units
        admobBannerId: "ca-app-pub-5879474591831999/2171448597",
        admobInterstitialId: "ca-app-pub-5879474591831999/8282395523",
        admobNativeId: "ca-app-pub-5879474591831999/2306675386",
        admobRewardedId: "ca-app-pub-5879474591831999/6350366758",
        admobRewardedIntId: "ca-app-pub-5879474591831999/6350366758",

        // Yandex Units (Primary)
        yandexAppId: "18543851",
        yandexBannerId: "R-M-18543851-9",
        yandexInterstitialId: "R-M-18543851-10",
        yandexRewardedId: "R-M-18543851-8",

        isAndroid: function () { return (typeof window.Android !== "undefined" && window.Android !== null); },

        // Ad Request UI Blocker
        showAdLoading: function() {
            if (!document.getElementById('adBlocker')) {
                const blocker = document.createElement('div');
                blocker.id = 'adBlocker';
                blocker.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:10000;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:bold;font-size:1.2rem;';
                blocker.innerText = '⏳ Reklam Yükleniyor...';
                document.body.appendChild(blocker);
            }
        },
        hideAdLoading: function() {
            const blocker = document.getElementById('adBlocker');
            if (blocker) blocker.remove();
        },

        // Geçiş Reklamı (Interstitial) - Örn: Oyun sonlarında
        showInterstitialAd: function () {
            this.showAdLoading();
            if (this.isAndroid()) {
                // Yeni MainActivity'deki birleştirilmiş akışı çağırır
                window.Android.showInterstitial(null);
            } else {
                console.log("Web Mode: Interstitial Simulation");
                this.hideAdLoading();
                if(window.resumeGame) window.resumeGame();
            }
            // Timeout in case ad fails silently
            setTimeout(() => this.hideAdLoading(), 6500);
        },

        // Ödüllü Reklam (Rewarded) - Örn: İpucu veya Market için
        showRewardedAd: function (onSuccess) {
            this.showAdLoading();
            // Kotlin tarafı ödül verildiğinde window.onReward() fonksiyonunu tetikler
            window.onReward = () => {
                onSuccess();
                window.onReward = null; // Bellek temizliği
            };

            if (this.isAndroid()) {
                window.Android.showRewardedAd(null);
            } else {
                console.log("Web Mode: Rewarded Simulation");
                this.hideAdLoading();
                if(window.onReward) window.onReward();
                if(window.resumeGame) window.resumeGame();
            }
            // Timeout in case ad fails silently
            setTimeout(() => this.hideAdLoading(), 8500);
        },

        // Callback for Android to trigger reward (Mevcut olan korunuyor)
        onReward: function() {
            if (this.pendingCallback) {
                this.pendingCallback();
                this.pendingCallback = null;
            }
        },

        showNativeAd: function () {
            if (this.isAndroid()) {
                if (typeof window.Android.showNativeAd === 'function') {
                    // Yandex Native ID was not provided, using AdMob as fallback/primary for Native
                    window.Android.showNativeAd(this.admobNativeId);
                }
            }
        },

        showBannerAd: function () {
            if (this.isAndroid()) {
                if (typeof window.Android.showBannerAd === 'function') {
                    window.Android.showBannerAd(this.yandexBannerId);
                }
            }
        }
    };

    /* --- PET SİSTEMİ V2 (Hata Düzeltme & Restorasyon) --- */
    const PET_DB = {
        'cat': { name: 'Tekir', emoji: '🐱', image: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Cat%20Face.png', bonus: 'xp_boost', desc: 'Her oyunda %10 fazla XP kazandırır.', price: 0 },
        'dog': { name: 'Karabaş', emoji: '🐕', image: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Dog%20Face.png', bonus: 'hint_chance', desc: 'Kaybedince %20 şansla bedava ipucu verir.', price: 0 },
        'mouse': { name: 'Muki', emoji: '🐭', image: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Mouse%20Face.png', bonus: 'loss_protection', desc: 'Kaybedince %15 şansla XP düşmez.', price: 0 },
        'fox': { name: 'Kurnaz', emoji: '🦊', image: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Fox.png', bonus: 'gold_multiplier', desc: 'Kazanılan altını 2 katına çıkarma şansı (%10).', price: 0 },
        'owl': { name: 'Bilge', emoji: '🦉', image: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Owl.png', bonus: 'expert_eye', desc: 'Yanlış tahminde %25 şansla hakkın gitmez.', price: 0 },
        'fish': { name: 'Beta', emoji: '🐠', image: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Tropical%20Fish.png', bonus: 'time_freeze', desc: 'Süre bitince %10 şansla +10sn ekler.', price: 0 },
        'lion': { name: 'Aslan', emoji: '🦁', image: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Lion.png', bonus: 'gold_master', desc: 'Altın kazancını %5 artırır.', price: 0 },
        'eagle': { name: 'Kartal', emoji: '🦅', image: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Eagle.png', bonus: 'eagle_eye', desc: 'Oyun başı %50 şansla 1 rakamı kesin bilir (Oracle).', price: 0 },
        'turtle': { name: 'Tospik', emoji: '🐢', image: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Turtle.png', bonus: 'streak_shield', desc: 'Kaybetsen de %20 şansla serin bozulmaz.', price: 0 }
    };





    window.PetSystem = {
        initialized: false,
        init: function () {
            if (this.initialized) return;

            if (!user.pet) {
                user.pet = {
                    active: 'cat',
                    energy: 100,
                    lastFeed: Date.now(),
                    unlocked: ['cat']
                };
            }
            if (!user.pet.unlocked) user.pet.unlocked = ['cat'];
            if (!Array.isArray(user.pet.unlocked)) user.pet.unlocked = ['cat'];
            if (!user.pet.unlocked.includes('cat')) user.pet.unlocked.push('cat');
            if (!user.pet.active) user.pet.active = 'cat';
            if (!user.pet.lastFeed) user.pet.lastFeed = Date.now();
            if (user.pet.energy === undefined) user.pet.energy = 100;
            if (!PET_DB[user.pet.active]) user.pet.active = 'cat';

            this.calculateDecay();

            // Check energy decay every 10 minutes
            setInterval(() => {
                this.calculateDecay();
                this.updateUI();
            }, 600000);

            this.updateUI();
            this.initialized = true;
            console.log("Pet System Initialized (RESTORED)");
        },

        calculateDecay: function () {
            if (!user.pet) return;
            const now = Date.now();
            const elapsedMs = now - (user.pet.lastFeed || now);
            const durationMs = 2 * 60 * 60 * 1000; // 2 Saat (7,200,000 ms)

            // Yüzde hesabı: Geçen süre / Toplam Süre
            // 2 saat sonunda enerji 0 olmalı.
            const decay = Math.min(100, Math.floor((elapsedMs / durationMs) * 100));
            let newEnergy = 100 - decay;
            if (newEnergy < 0) newEnergy = 0;

            if (user.pet.energy !== newEnergy) {
                user.pet.energy = newEnergy;
                this.save();
                this.updateUI();
            }
        },

        save: function () {
            if (user.name) db.ref('users/' + user.name + '/pet').set(user.pet);
        },

        getBonus: function (type) {
            if (!user.pet || user.pet.energy < 20) return 0;
            const petInfo = PET_DB[user.pet.active];
            if (petInfo && petInfo.bonus === type) return true;
            return false;
        },



        updateUI: function () {
            if (!user.pet) return;
            const walker = document.getElementById('lobbyPetWalker');
            if (!walker) return;

            const p = PET_DB[user.pet.active];

            // Update Energy Badge
            const badge = document.getElementById('petEnergyBadge');
            if (badge) {
                badge.innerText = user.pet.energy + "%";
                if (user.pet.energy < 20) {
                    badge.style.background = "#e74c3c"; // Kritik (Kırmızı)
                } else if (user.pet.energy < 40) {
                    badge.style.background = "#e67e22"; // Üzgün Eşiği (Turuncu)
                } else if (user.pet.energy < 60) {
                    badge.style.background = "#f1c40f"; // Orta (Sarı)
                } else {
                    badge.style.background = "#2ecc71"; // İyi (Yeşil)
                }
            }

            // Update Lobby Feed Button (NEW)
            const lobbyBtn = document.getElementById('btnLobbyFeed');
            if (lobbyBtn) {
                if (user.pet.energy < 50) {
                    lobbyBtn.style.display = 'block';
                } else {
                    lobbyBtn.style.display = 'none';
                }
            }

            // Update Static Image
            const img = document.getElementById('petMainImage');
            if (img && p.image) {
                const targetSrc = p.image;
                if (!img.src.includes(targetSrc)) {
                    img.src = targetSrc;
                }
                img.style.display = 'block';

                // Üzgün Efekti (Energy < 40)
                if (user.pet.energy < 40) {
                    img.style.filter = "grayscale(0.8) sepia(0.2) drop-shadow(0 2px 5px rgba(0,0,0,0.5))";
                    img.style.opacity = "0.8";
                    // Titreme efekti ekleyebiliriz veya sabit üzgün duruş
                    img.style.animation = "pulse 2s infinite ease-in-out";
                } else {
                    img.style.filter = "drop-shadow(0 4px 8px rgba(0,0,0,0.3))";
                    img.style.opacity = "1";
                    img.style.animation = "none";
                }

                // Start Animation System
                if (typeof PetAnimationSystem !== 'undefined') {
                    PetAnimationSystem.start();
                }

            } else if (img) {
                img.style.display = 'none';
            }

            // Game Header
            const gameDisp = document.getElementById('gamePetDisplay');
            if (gameDisp) {
                gameDisp.innerHTML = `
                <div class="pet-game-header" style="opacity: ${user.pet.energy < 20 ? 0.5 : 1}; display:flex; align-items:center; gap:5px;">
                    <img src="${p.image}" style="width:25px; height:25px; filter:drop-shadow(0 2px 2px rgba(0,0,0,0.3));">
                    <div style="font-size:0.7rem; font-weight:bold; color:${user.pet.energy > 50 ? '#2ecc71' : '#e74c3c'}">${user.pet.energy}%</div>
                </div>`;
            }

            if (document.getElementById('modal-pet') && document.getElementById('modal-pet').style.display === 'flex') {
                this.renderPetList();
            }
        },
        renderPetList: function () {
            // Ana menüdeki pet listesini güncelle (varsa)
            const container = document.getElementById('petListContainer');
            if (container) this.renderContainer(container);

            // Profildeki pet listesini güncelle (varsa ve açıksa)
            const profileContainer = document.getElementById('profilePetListContainer');
            if (profileContainer && profileContainer.style.display !== 'none') {
                this.renderContainer(profileContainer);
            }

            // Feed Button Logic
            const feedBtn = document.getElementById('btnFeedPet');
            if (feedBtn) {
                // Cooldown: 2 saat
                // Eğer lastFeed yoksa 0 varsay
                const lf = user.pet.lastFeed || 0;
                const diff = Date.now() - lf;
                const waitTime = 2 * 60 * 60 * 1000; // 2 saat (ms)

                if (user.pet.energy >= 90) {
                    feedBtn.innerText = "TOK (%" + user.pet.energy + ")";
                    feedBtn.disabled = true;
                    feedBtn.className = "btn-grey";
                } else if (diff < waitTime) {
                    const remMin = Math.ceil((waitTime - diff) / 60000);
                    feedBtn.innerText = `⏳ ${remMin}dk Bekle`;
                    feedBtn.disabled = true;
                    feedBtn.className = "btn-grey";
                } else {
                    feedBtn.innerText = "🍖 BESLE (+%100) 📺";
                    feedBtn.disabled = false;
                    feedBtn.className = "btn-green";
                    feedBtn.onclick = () => this.feedPet();
                }
            }
        },

        renderContainer: function (container) {
            container.innerHTML = "";
            Object.keys(PET_DB).forEach(key => {
                const p = PET_DB[key];
                const isUnlocked = user.pet.unlocked.includes(key);
                const isActive = user.pet.active === key;

                const card = document.createElement('div');
                card.className = `pet-card ${isActive ? 'active' : ''} ${isUnlocked ? 'unlocked' : ''}`;
                // card.onclick = () => this.selectPet(key); // Removed to avoid double trigger
                card.style.padding = "5px";

                let btnHtml = "";
                if (isActive) {
                    btnHtml = `<span style="color:#27ae60; font-weight:bold; font-size:0.7rem;">SEÇİLİ</span>`;
                } else if (isUnlocked) {
                    btnHtml = `<button class="btn-sm" style="padding:2px 5px; font-size:0.65rem;" onclick="PetSystem.selectPet('${key}')">SEÇ</button>`;
                } else {
                    btnHtml = `<button class="btn-sm btn-ad" style="padding:2px 5px; font-size:0.65rem;" onclick="PetSystem.unlockPetWithAd('${key}')">📺 AÇ</button>`;
                }

                if (key === 'cat' && !isUnlocked) btnHtml = "ÜCRETSİZ";

                card.innerHTML = `
                    <div style="text-align:center;">
                        <img src="${p.image}" style="width:40px; height:40px; filter:drop-shadow(0 2px 2px rgba(0,0,0,0.2));">
                        <div style="font-weight:bold; font-size:0.75rem; margin-top:2px;">${p.name}</div>
                        <div style="font-size:0.6rem; color:#666; display:none;">${p.desc}</div>
                        <div style="margin-top:3px;">${btnHtml}</div>
                    </div>
                `;
                container.appendChild(card);
            });
        },

        selectPet: function (key) {
            console.log("selectPet called for:", key);
            if (!user.pet || !user.pet.unlocked) return;
            if (!user.pet.unlocked.includes(key)) {
                console.warn("Pet not unlocked:", key);
                showToast("Bu pet henüz açık değil! 🔒");
                return;
            }
            user.pet.active = key;
            this.save();
            this.updateUI();
            this.renderPetList(); // Hem ana hem profil listesini günceller
            showToast(`${PET_DB[key].name} seçildi!`);
        },

        unlockPetWithAd: function (key) {
            AdManager.showRewardedAd(() => {
                if (!user.pet.unlocked.includes(key)) {
                    user.pet.unlocked.push(key);
                    user.pet.active = key;
                    this.save();
                    this.updateUI();
                    this.renderPetList();
                    showToast("Yeni Pet Açıldı: " + PET_DB[key].name);

                    // İlk açılışta full enerji ver
                    user.pet.energy = 100;
                    user.pet.lastFeed = Date.now();
                    this.save();
                }
            });
        },

        feedPet: function () {
            AdManager.showRewardedAd(() => {
                user.pet.energy = 100;
                user.pet.lastFeed = Date.now();
                this.save();
                this.updateUI();
                this.renderPetList();
                showToast("Nom nom! Enerji fullendi! 🍖");

                // Show floating hearts
                showEmojiAnim('💖');
            });
        }
    };


    function safeOpenSetup() { try { updateDifficultyOptions(); showModal('modal-setup'); } catch (e) { console.error(e); showToast("Hata! Sayfayı yenile."); } }
    function showSection(id) { if (id === 'home') { closeModal('modal-market'); closeModal('modal-inventory'); } }
    function applyTheme(t, saveToDb = true) {
        // Mevcut utility sınıflarını koru
        const preserved = [];
        if (document.body.classList.contains('mobile-app')) preserved.push('mobile-app');

        // Temizle ve korunanları ekle
        document.body.className = preserved.join(" ");
        if (t) document.body.classList.add(t);

        user.activeTheme = t;
        localStorage.setItem("yh_active_theme", t);
        if (saveToDb && user.name) {
            db.ref('users/' + user.name).update({ activeTheme: t });
        }
    }
    function loadTheme() { const t = localStorage.getItem("yh_active_theme"); if (t) applyTheme(t, false); }
    function showToast(m) {
        if (m && typeof m === "string" && (m.toLowerCase().includes("google bu kullanıcıya reklam göndermedi") || m.toLowerCase().includes("google bu kullanıcı için reklam göndermedi"))) return;
        const t = document.getElementById("toast");
        t.innerText = m;
        t.className = "show";
        setTimeout(() => t.className = "", 3000);
    }
    function showModal(id) {
        document.getElementById(id).style.display = 'flex';
        if (id === 'modal-about') loadAboutText();
    }
    function closeModal(id) { document.getElementById(id).style.display = 'none'; }
    function generateNumber(l) { let n = []; while (n.length < l) { let r = Math.floor(Math.random() * 10); if (n.length === 0 && r === 0) continue; if (!n.includes(r)) n.push(r); } return n.join(""); }
    function changeScreen(id) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(id).classList.add('active');
        currentScreen = id;
        if (id === 'screen-admin') loadAdminDashboard();
        if (id === 'screen-lobby' && typeof AdManager !== 'undefined') {
            AdManager.showNativeAd();
            AdManager.showBannerAd();
        }
    }
    function attemptExit() {
        // Oyun aktifse veya oyun ekranlarındaysa uyarı göster
        if (game.active || currentScreen === 'screen-game' || currentScreen === 'screen-word-game' || currentScreen === 'screen-wait' || currentScreen === 'screen-word-lobby') {
            showModal('modal-exit-confirm');
        } else {
            // Oyun aktif değilse direkt çık
            leaveRoom();
        }
    }
    function confirmExitGame() {
        closeModal('modal-exit-confirm');
        // Oyun durumunu temizle
        game.active = false;
        stopTimer();
        stopWordTimer();
        // Odadan ayrıl
        leaveRoom();
    }
    function handleBackButton() {
        if (game.active || currentScreen === 'screen-wait' || currentScreen === 'screen-game' || currentScreen === 'screen-word-game' || currentScreen === 'screen-word-lobby') {
            attemptExit();
        } else if (currentScreen === 'screen-admin') {
            changeScreen('screen-lobby');
        } else {
            showModal('modal-exit-confirm');
        }
        document.querySelectorAll('.modal-overlay').forEach(m => m.style.display = 'none');
    }
    function toggleTimeSelect(ctx) { if (ctx === 'single') { document.getElementById('singleDuration').style.display = document.getElementById('singleMode').value === 'timed' ? 'block' : 'none'; } else { document.getElementById('timeSelectDiv').style.display = document.getElementById('createMode').value === 'timed' ? 'block' : 'none'; } }
    function confirmLogout() { if (confirm("Çıkış?")) { localStorage.clear(); location.reload(); } }

    function updateLobbyUI() {
        // PET SİSTEMİ BAŞLAT (Eğer başlamadıysa)
        if (typeof PetSystem !== 'undefined') PetSystem.init();

        // 1. VIP ve Level
        if (VIP_NAMES.includes(user.name)) { document.getElementById('userLevelDisplay').innerText = "VIP"; } else { document.getElementById('userLevelDisplay').innerText = user.level; }

        // 2. ROZETLERİ HESAPLA
        let badgesHTML = '<span class="badge-container">';

        // A. Zenginlik Rozetleri (Altın Miktarı)
        const g = user.gold || 0;
        if (g >= 1000000) badgesHTML += '<span class="badge-icon badge-king" title="Milyoner Kral">👑</span>';
        else if (g >= 500000) badgesHTML += '<span class="badge-icon badge-rich" title="Yarım Milyoner">💎</span>';
        else if (g >= 100000) badgesHTML += '<span class="badge-icon badge-rich" title="Holding Sahibi">🏦</span>';
        else if (g >= 10000) badgesHTML += '<span class="badge-icon badge-rich" title="Tüccar">💰</span>';

        // B. Reklam Canavarı Rozetleri (İzlenen Reklam)
        const ads = user.adsWatched || 0;
        if (ads >= 500) badgesHTML += '<span class="badge-icon badge-ad" title="Reklam İlahı (500+)">📡</span>';
        else if (ads >= 100) badgesHTML += '<span class="badge-icon badge-ad" title="TV Yıldızı (100+)">🌟</span>';
        else if (ads >= 50) badgesHTML += '<span class="badge-icon badge-ad" title="Yönetmen (50+)">🎬</span>';
        else if (ads >= 10) badgesHTML += '<span class="badge-icon badge-ad" title="İzleyici (10+)">📺</span>';

        badgesHTML += '</span>';

        // 3. Bilgileri Ekrana Bas
        // 3. Bilgileri Ekrana Bas
        document.getElementById('lobbyName').innerHTML = user.name + badgesHTML;

        // --- AVATAR GÖSTERİMİ (3D GÖRSEL DESTEĞİ) ---
        const lobbyAvatarBox = document.getElementById('lobbyAvatarDisplay');
        // Eğer avatar bir link içeriyorsa (http) resim olarak ekle
        if (user.avatar.includes('http')) {
            lobbyAvatarBox.innerHTML = `<img src="${user.avatar}" style="width:100%; height:100%; object-fit:contain; border-radius:50%; filter:drop-shadow(0 2px 4px rgba(0,0,0,0.2));">`;
        } else {
            // Değilse normal emoji (eski sistem) olarak yaz
            lobbyAvatarBox.innerText = user.avatar;
        }
        // ---------------------------------------------

        document.getElementById('lobbyGold').innerText = user.gold;
        document.getElementById('lobbyClanTag').innerText = user.clan ? "[" + user.clan + "]" : "";

        // 4. XP ve Diğerleri
        const xpNeeded = 500;
        document.getElementById('xpText').innerText = `${Math.floor(user.xp / 100)}/5 Galibiyet`;
        document.getElementById('xpBarFill').style.width = Math.min(100, (user.xp / xpNeeded) * 100) + "%";
        checkQuestProgress();
        try {
            document.getElementById('qty-oracle').innerText = user.items?.oracle || 0;
            document.getElementById('qty-freeze').innerText = user.items?.freeze || 0;
            document.getElementById('qty-sabotage').innerText = user.items?.sabotage || 0;
            updateDifficultyOptions();
        } catch (e) { }

        if(document.getElementById('qty-oracle-word')) document.getElementById('qty-oracle-word').innerText = user.items.oracle;
        if(document.getElementById('qty-freeze-word')) document.getElementById('qty-freeze-word').innerText = user.items.freeze;
}

    // --- GÜNLÜK SERİ (QUEST) SİSTEMİ (GÜNCELLENMİŞ STABİL VERSİYON) ---

    function checkQuestProgress() {
        const box = document.getElementById('dailyQuestBox');
        const btn = document.getElementById('btnClaimQuest');
        const text = document.getElementById('questText');
        const prog = document.getElementById('questProgress');
        const bar = document.getElementById('questBarFill');

        if (!box || !user.name) return;
        box.style.display = 'block';

        const target = 3;
        const today = getDayKey(); // YYYY-MM-DD

        // Veritabanından bugünkü durumu çek
        db.ref(`users/${user.name}/quests/${today}`).once('value').then(snap => {
            const data = snap.val() || {};
            const wins = data.wins || 0; // Bugün kaç kez kazandı?
            const claimed = data.claimed || false; // Ödülü aldı mı?

            // İlerleme çubuğunu güncelle
            const safeWins = Math.min(wins, target);
            prog.innerText = `${safeWins}/${target}`;
            bar.style.width = ((safeWins / target) * 100) + "%";

            if (claimed) {
                // Ödül zaten alınmış - KUTUYU TAMAMLANDI MODUNA AL
                btn.style.display = 'none';
                box.classList.add('completed');
                text.innerText = "✅ Tamamlandı!";
                text.style.color = "green";
                prog.innerText = "Yarın tekrar gel.";
                box.style.background = "#e8f5e9";
            } else if (wins >= target) {
                // Hedef tamamlanmış ama ödül alınmamış -> BUTONU GÖSTER VE AKTİF ET
                btn.style.display = 'block';
                btn.disabled = false;
                btn.innerHTML = "1000 💰 AL"; // Buton yazısını sıfırla
                btn.onclick = function () { claimQuestReward(); };

                box.classList.remove('completed');
                text.innerText = "🎉 Ödül Hazır!";
                text.style.color = "#d35400";
                box.style.background = "rgba(255,255,255,0.95)";
            } else {
                // Hedef henüz tamamlanmamış
                btn.style.display = 'none';
                box.classList.remove('completed');
                text.innerText = "Bugün 3 oyun kazan!";
                text.style.color = "#d35400";
                box.style.background = "rgba(255,255,255,0.9)";
            }
        });
    }

    function claimQuestReward() {
        const btn = document.getElementById('btnClaimQuest');

        // 1. ANINDA GERİ BİLDİRİM VER (Kullanıcı bastığını anlasın)
        if (btn) {
            btn.disabled = true; // Çift tıklamayı engelle
            btn.innerHTML = "⏳ Alınıyor..."; // Görsel değişim
            btn.style.opacity = "0.7";
        }

        const today = getDayKey();

        db.ref(`users/${user.name}/quests/${today}`).once('value').then(snap => {
            const data = snap.val() || {};
            const wins = data.wins || 0;
            const claimed = data.claimed || false;

            if (claimed) {
                showToast("Bugün ödülünü zaten aldın!");
                checkQuestProgress();
                return;
            }

            if (wins < 3) {
                showToast("Henüz 3 galibiyete ulaşmadın!");
                checkQuestProgress();
                return;
            }

            // Ödülü ver ve kaydet
            updateGold(1000);

            db.ref(`users/${user.name}/quests/${today}/claimed`).set(true).then(() => {
                showToast("1000 Altın Kazanıldı! 🎉");
                AudioEngine.win();
                safeConfetti();

                // 2. ARAYÜZÜ HEMEN GÜNCELLE
                if (btn) btn.style.display = 'none'; // Butonu hemen gizle
                checkQuestProgress(); // Kutunun tamamını yeşile çevir
            });
        });
    }
    function updateDifficultyOptions() {
        const sel1 = document.getElementById('createDiff');
        const sel2 = document.getElementById('singleDiffSelect');
        if (!sel1 || !sel2) return;
        const selects = [sel1, sel2];
        selects.forEach(sel => {
            sel.innerHTML = "";
            [{ v: 3, t: "3 Hane", l: 1 }, { v: 4, t: "4 Hane", l: 1 }, { v: 5, t: "5 Hane 🔒 Lv.2", l: 2 }, { v: 6, t: "6 Hane 🔒 Lv.5", l: 5 }, { v: 7, t: "7 Hane 🔒 Lv.10", l: 10 }].forEach(o => {
                const opt = document.createElement('option');
                opt.value = o.v;
                if (user.level < o.l && !VIP_NAMES.includes(user.name)) {
                    opt.disabled = true;
                    opt.innerText = o.t;
                } else {
                    opt.innerText = o.t.replace(/🔒 Lv\.\d+/, "");
                }
                sel.appendChild(opt);
            });
            if (sel.value === "" || sel.options[sel.selectedIndex].disabled) sel.value = 4;
        });
    }
    function openMarket() {
        try {
            if (!user || !user.name) { showToast("Lütfen önce giriş yapın."); return; }
            const container = document.getElementById('marketItems'); container.innerHTML = "";
            const inventory = (Array.isArray(user.inventory)) ? user.inventory : [];
            const itemsHeader = document.createElement('div'); itemsHeader.className = 'market-category'; itemsHeader.innerHTML = '⚡ Güçlendiriciler'; container.appendChild(itemsHeader);
            const itemsGrid = document.createElement('div'); itemsGrid.style.cssText = "display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:15px;";
            const consumables = [{ id: 'oracle', name: '🔮 Kahin Küresi', price: 200, desc: '1 Rakamın yerini söyler.' }, { id: 'freeze', name: '❄️ Zaman Dondurucu', price: 150, desc: '+10 Saniye ekler.' }, { id: 'sabotage', name: '😈 Sabotaj', price: 300, desc: '(Online) Rakibi kör et.' }];
            consumables.forEach(itm => { const card = document.createElement('div'); card.className = "card"; card.style.cssText = "margin:0; padding:10px; font-size:0.8rem;"; card.innerHTML = `<b>${itm.name}</b><br><span style="font-size:0.7rem;color:#ccc;">${itm.desc}</span><br><b style="color:gold;">${itm.price} 💰</b><div style="display:flex; gap:5px; margin-top:5px;"><button class="btn-purple" style="padding:5px; flex:1;" onclick="buyItemWithAd('${itm.id}')">📺 İZLE</button></div><div style="font-size:0.7rem;margin-top:3px;">Mevcut: ${user.items[itm.id] || 0}</div>`; itemsGrid.appendChild(card); }); container.appendChild(itemsGrid);
            const groups = { team: { title: '⚽ Takımlar (Premium)', icon: '🏆' }, bg: { title: '🖼️ Arkaplanlar', icon: '🎨' }, color: { title: '🎨 Renk Temaları', icon: '🌈' } };
            Object.keys(groups).forEach(key => { const header = document.createElement('div'); header.className = 'market-category'; header.innerHTML = `${groups[key].title}`; container.appendChild(header); const grid = document.createElement('div'); grid.style.cssText = "display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:15px;"; const items = THEMES.filter(t => t.type === key); items.forEach(theme => { const card = document.createElement('div'); card.className = "card"; card.style.cssText = "margin:0; padding:10px; display:flex; flex-direction:column; justify-content:space-between; height:100%;"; const isOwned = (theme.cost === 0) || inventory.includes(theme.id); const isActive = (user.activeTheme === theme.id); let btnHTML = ""; let btnClass = ""; let btnText = ""; let btnAction = ""; if (isActive) { btnClass = "btn-grey"; btnText = "AKTİF"; btnAction = ""; } else if (isOwned) { btnClass = "btn-green"; btnText = "KULLAN"; btnAction = `applyTheme('${theme.id}')`; } else { btnClass = "btn-purple"; btnText = `🎬 İZLE & AL`; btnAction = `buyTheme('${theme.id}')`; } const btnId = `btn-theme-${theme.id}`; card.innerHTML = `<div style="font-weight:bold; font-size:0.9rem; margin-bottom:5px;">${theme.name}</div><button id="${btnId}" class="${btnClass}" onclick="${btnAction}" style="padding:8px; margin-top:auto; font-size:0.8rem; width:100%;">${btnText}</button>`; grid.appendChild(card); }); container.appendChild(grid); });
            showModal('modal-market');
        } catch (err) { showToast("Market yüklenirken hata oluştu."); }
    }

    function buyItem(id, cost) { if (user.gold < cost) return showToast("Yetersiz Altın!"); updateGold(-cost); if (!user.items) user.items = { oracle: 0, freeze: 0, sabotage: 0 }; user.items[id] = (user.items[id] || 0) + 1; db.ref('users/' + user.name + '/items').set(user.items); showToast("Satın alındı!"); openMarket(); updateLobbyUI(); }
    function buyItemWithAd(id) { if (confirm("Reklam izleyerek bu eşyayı almak ister misin?")) { AdManager.showRewardedAd(() => { if (!user.items) user.items = { oracle: 0, freeze: 0, sabotage: 0 }; user.items[id] = (user.items[id] || 0) + 1; db.ref('users/' + user.name + '/items').set(user.items); showToast("Eşya kazanıldı! (Reklam)"); openMarket(); updateLobbyUI(); }); } }
    function useItem(type) {
        if (currentScreen === 'screen-word-game') {
            if (!wordGameState.active) return;
            if (!user.items || !user.items[type] || user.items[type] <= 0) return showToast("Eşya yok!");

            if (type === 'oracle') {
                if (wordGameState.usedItems && wordGameState.usedItems.includes('oracle')) {
                    return showToast("⚠️ İpucu her oyunda 1 kez kullanılabilir!");
                }
                if (!wordGameState.usedItems) wordGameState.usedItems = [];
                wordGameState.usedItems.push('oracle');

                // Reveal 1 letter (Green)
                // Find a letter in secret that hasn't been guessed correctly yet?
                // Or just reveal a random position?

                const secret = wordGameState.secret;
                let revealed = false;

                // Try to find unrevealed index
                for(let i=0; i<10; i++) {
                    const idx = Math.floor(Math.random() * secret.length);
                    // Check if we already know this (from board)?
                    // Simplified: Just tell the letter.
                    alert(`🔮 KAHİN: ${idx+1}. Harf: ${secret[idx]}`);
                    revealed = true;
                    break;
                }

                user.items[type]--;
                db.ref('users/' + user.name + '/items').set(user.items);
                updateLobbyUI();
                return;
            }
        }

        if (!game.active) return showToast("Oyun başlamadı!");
        if (!user.items || !user.items[type] || user.items[type] <= 0) return showToast("Eşya yok! Marketten al.");



        if (type === 'oracle') {
            // YENİ KAHİN KURALLARI
            if (game.diff === 3) return showToast("🚫 3 Haneli oyunlarda Kahin yasaktır!");
            if (game.usedItems && game.usedItems.includes('oracle')) return showToast("⚠️ Kahin özelliği her oyunda en fazla 1 kez kullanılabilir!");



            const secret = game.secret.toString();
            const randomIdx = Math.floor(Math.random() * secret.length);
            const digit = secret[randomIdx];
            alert(`🔮 KAHİN: ${randomIdx + 1}. sıradaki rakam KESİN OLARAK: ${digit}`);

            if (game.mode === 'career') game.oracleUsedCount++; // Kariyer sayacını artır
            game.usedItems.push('oracle');

        } else if (type === 'freeze') {
            game.startTime += 10000;
            showToast("❄️ Zaman Donduruldu! (+10sn)");
            AudioEngine.notification();
        } else if (type === 'sabotage') {
            if (game.mode !== 'online') return showToast("Sadece Online maçta!");
            db.ref(`rooms/${game.room}/active_effects`).push({ type: 'ink', sender: user.name, time: Date.now() });
            showToast("😈 Sabotaj Gönderildi!");
        }

        user.items[type]--;
        db.ref('users/' + user.name + '/items').set(user.items);
        updateLobbyUI();
    }
    function triggerSabotageEffect() { const layer = document.getElementById('sabotageLayer'); layer.style.display = 'block'; AudioEngine.error(); setTimeout(() => { layer.style.display = 'none'; }, 3000); }
    function buyTheme(themeId) { const theme = THEMES.find(t => t.id === themeId); if (!theme) return showToast("Hatalı ürün!"); if (confirm(`${theme.name} temasını reklam izleyerek açmak ister misin?`)) { AdManager.showRewardedAd(() => { if (!user.inventory) user.inventory = []; if (!user.inventory.includes(themeId)) { user.inventory.push(themeId); } if (db && user.name) { db.ref('users/' + user.name + '/inventory').set(user.inventory); } showToast(`🎉 Tebrikler! "${theme.name}" açıldı.`); AudioEngine.win(); const btn = document.getElementById(`btn-theme-${themeId}`); if (btn) { btn.className = "btn-green"; btn.innerHTML = "KULLAN"; btn.onclick = function () { applyTheme(themeId); }; btn.style.animation = "pulseBtn 0.5s ease"; } }); } }
    function openInventory() { const c = document.getElementById('inventoryList'); c.innerHTML = `<div class="list-item"><span>Varsayılan</span><button class="btn-green" style="width:auto;padding:5px;" onclick="applyTheme('')">SEÇ</button></div>`; const inventory = user.inventory || []; THEMES.forEach(t => { if (inventory.includes(t.id) || t.cost === 0) { c.innerHTML += `<div class="list-item"><span>${t.name}</span><button class="btn-blue" style="width:auto;padding:5px;" onclick="applyTheme('${t.id}')">SEÇ</button></div>`; } }); showModal('modal-inventory'); }

    // --- YENİLENMİŞ VE KORUMALI DAVET SİSTEMİ ---

    function inviteUser(targetName) {
        if (!user.name) return showToast("Önce giriş yapmalısın.");
        if (targetName === user.name) return showToast("Kendini davet edemezsin.");

        // DURUM 1: Zaten bir odadayım - Mevcut odaya çağır
        if (game.room) {
            if (game.role !== 'p1') {
                return showToast("Misafir oyuncular davet gönderemez!");
            }
            db.ref('rooms/' + game.room).once('value').then(snap => {
                const r = snap.val();
                if (!r) return;
                if (r.status === 'playing' || r.p2) {
                    return showToast("Oda dolu veya oyun başlamış!");
                }

                // Oyun türünü mevcut odadan anla
                const type = (game.mode === 'online_word' || (r.type === 'word')) ? 'word' : 'number';

                db.ref('invites/' + targetName).push({
                    from: user.name,
                    room: game.room,
                    type: type,
                    timestamp: Date.now()
                });
                showToast(`${targetName} odaya çağrıldı!`);
            });
            return;
        }

        // DURUM 2: Lobideyim - Seçim Modalı Aç
        window.pendingInviteTarget = targetName;
        showModal('modal-invite-selector');
    }

    function listenForInvites() {
        if (!user.name) return;

        const inviteRef = db.ref('invites/' + user.name);
        inviteRef.off(); // Önceki dinlemeyi kapat (Double listener önlemi)

        inviteRef.on('child_added', snapshot => {
            const invite = snapshot.val();
            const key = snapshot.key;

            // Daveti veritabanından hemen sil (Tek seferlik görünsün)
            db.ref('invites/' + user.name + '/' + key).remove();

            // Zaman aşımı kontrolü (2 dakikadan eski davetleri yoksay)
            if (Date.now() - invite.timestamp > 120000) return;

            // Eğer zaten oyun oynuyorsam daveti gösterme (Sadece Toast geç)
            if (game.active) {
                showToast(`📨 ${invite.from} seni davet etti (Oyundasın).`);
                return;
            }

            // Daveti ekrana bas
            pendingInviteRoom = invite.room;
            document.getElementById('inviterNameDisplay').innerText = invite.from;
            showModal('modal-invite-incoming');
            AudioEngine.notification();

            // Tarayıcı Bildirimi (İzin varsa)
            if ("Notification" in window && Notification.permission === "granted") {
                new Notification("TahminSon", { body: `${invite.from} seni oyuna davet etti!` });
            }
        });
    }

    function acceptInvite() {
        closeModal('modal-invite-incoming');
        if (pendingInviteRoom) {
            // Mevcut bir odada bekliyorsam oradan çıkmalıyım
            if (game.room && !game.active) {
                leaveRoom();
            }
            // Odaya katıl
            joinRoom(pendingInviteRoom);
            pendingInviteRoom = null;
        }
    }
    function updatePresence(isOnline) { if (!db) return; const ref = db.ref('presence/' + user.name); if (isOnline) { ref.set({ status: 'online', lastActive: Date.now() }); ref.onDisconnect().remove(); } else { ref.remove(); } }

    // Global bir sessiz mod değişkeni tanımlıyoruz
    let isMuted = false;

    const AudioEngine = {
        ctx: null,
        init: function () { try { if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { } },
        playTone: function (f, t, d) {
            // BURASI EKLENDİ: Sessiz moddaysa çalma!
            if (isMuted) return;

            try { if (!this.ctx) this.init(); if (!this.ctx) return; const o = this.ctx.createOscillator(), g = this.ctx.createGain(); o.type = t; o.frequency.setValueAtTime(f, this.ctx.currentTime); g.gain.setValueAtTime(0.1, this.ctx.currentTime); o.connect(g); g.connect(this.ctx.destination); o.start(); o.stop(this.ctx.currentTime + d); } catch (e) { }
        },
        click: function () { this.playTone(800, 'sine', 0.05); },
        success: function () { this.playTone(1200, 'square', 0.1); },
        error: function () { this.playTone(300, 'sawtooth', 0.2); },
        win: function () { this.playTone(500, 'triangle', 0.2); },
        notification: function () { this.playTone(800, 'sine', 0.1); setTimeout(() => this.playTone(1200, 'sine', 0.2), 150); },
        heartbeat: function () { this.playTone(150, 'sine', 0.1); setTimeout(() => this.playTone(150, 'sine', 0.1), 150); },
                coin: function () {
            if (isMuted) return;
            try {
                if (!this.ctx) this.init();
                const t = this.ctx.currentTime;
                const o = this.ctx.createOscillator();
                const g = this.ctx.createGain();

                o.type = "sine";
                o.frequency.setValueAtTime(987, t); // B5
                o.frequency.setValueAtTime(1318, t + 0.08); // E6

                g.gain.setValueAtTime(0.1, t);
                g.gain.linearRampToValueAtTime(0.1, t + 0.08);
                g.gain.exponentialRampToValueAtTime(0.001, t + 0.3);

                o.connect(g);
                g.connect(this.ctx.destination);
                o.start(t);
                o.stop(t + 0.3);
            } catch (e) { }
        }
    };


    // --- CONFETTI WRAPPER (THROTTLED + SINGLE CANVAS) ---
    // Fixes "screen shake / blinking" that can happen when canvas-confetti repeatedly creates canvases on some WebViews.
    let __confettiInstance = null;
    let __lastConfettiAt = 0;

    function safeConfetti(opts) {
        try {
            // Respect reduced motion
            if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

            const now = Date.now();
            // Throttle: prevent stacking multiple bursts in a short time (causes flicker)
            if (now - __lastConfettiAt < 1200) return;
            __lastConfettiAt = now;

            // Create / reuse a single canvas for confetti
            if (!__confettiInstance && typeof window.confetti === 'function') {
                const canvas = document.getElementById('confettiCanvas');
                if (canvas) {
                    __confettiInstance = window.confetti.create(canvas, { resize: true, useWorker: true });
                } else {
                    // Fallback: use default instance if canvas missing
                    __confettiInstance = window.confetti;
                }
            }

            if (typeof __confettiInstance !== 'function') return;

            const base = Object.assign({
                particleCount: 90,
                spread: 70,
                startVelocity: 35,
                origin: { y: 0.7 }
            }, (opts || {}));

            __confettiInstance(base);

            // Small follow-up burst (looks good, avoids long heavy animations)
            setTimeout(() => {
                if (typeof __confettiInstance === 'function') {
                    __confettiInstance(Object.assign({}, base, {
                        particleCount: Math.max(40, Math.floor((base.particleCount || 90) * 0.55)),
                        spread: Math.min(120, (base.spread || 70) + 20),
                        origin: { y: 0.55 }
                    }));
                }
            }, 180);
        } catch (e) {
            // Never let confetti break gameplay
        }
    }

// --- GOLD ANIMATION FUNCTION ---
    function animateGoldChange(amount) {
        const el = document.getElementById('lobbyGold');
        if (!el) return;

        const start = parseInt(el.innerText) || 0;
        const end = start + amount;
        const duration = 1500; // 1.5 seconds
        const startTime = Date.now();

        // Play first coin sound
        AudioEngine.coin();

        const timer = setInterval(() => {
            const now = Date.now();
            const progress = Math.min(1, (now - startTime) / duration);
            const current = Math.floor(start + (end - start) * progress);

            el.innerText = current;

            // Randomly play coin sounds during animation
            if (Math.random() > 0.8) AudioEngine.coin();

            if (progress >= 1) {
                clearInterval(timer);
                el.innerText = end;
                AudioEngine.coin(); // Final ding
            }
        }, 50);
    }

    // --- PIGGY BANK WIN ANIMATION FUNCTION ---
    function showPiggyWin(amount) {
        const overlay = document.getElementById('piggyWinOverlay');
        const amountEl = document.getElementById('piggyAmount');
        const fillBar = document.getElementById('piggyFillBar');
        const coinLayer = document.getElementById('coinDropLayer');
        const btns = document.getElementById('piggyButtons');

        if (!overlay) return;

        // Store original amount for potential doubling
        window.lastWinAmount = amount;
        window.isDoubleReward = false;

        // Reset
        coinLayer.innerHTML = '';
        amountEl.innerText = `+${amount} Altın`;
        fillBar.style.width = '0%';
        if(btns) btns.style.display = 'none'; // Hide buttons initially

        // Show (Fade In)
        overlay.style.display = 'flex';
        // Force reflow
        void overlay.offsetWidth;
        overlay.classList.add('show'); // Use class for transition

        // Animate Bar
        setTimeout(() => {
            const fillPercent = Math.min(100, (amount / 300) * 100);
            fillBar.style.transition = 'width 1.5s cubic-bezier(0.25, 1, 0.5, 1)';
            fillBar.style.width = fillPercent + '%';
        }, 300);

        // Sound Sequence
        let soundCount = 0;
        const maxSounds = 5;
        const soundInt = setInterval(() => {
            try { AudioEngine.coin(); } catch(e){}
            soundCount++;
            if (soundCount >= maxSounds) clearInterval(soundInt);
        }, 150);

        // Particle Effect
        for(let i=0; i<20; i++) {
            const coin = document.createElement('div');
            coin.className = 'coin-particle';
            coin.innerText = '💰';
            coin.style.left = (50 + (Math.random()*40 - 20)) + '%';
            coin.style.animationDuration = (0.5 + Math.random()) + 's';
            coin.style.animationDelay = (Math.random() * 0.5) + 's';
            coinLayer.appendChild(coin);
        }

        // Show Buttons and Double Reward Button after animation
        setTimeout(() => {
            if(btns) {
                // Add double reward button if not exists
                let doubleBtn = document.getElementById('btnDoubleReward');
                if (!doubleBtn && amount > 0) {
                    doubleBtn = document.createElement('button');
                    doubleBtn.id = 'btnDoubleReward';
                    doubleBtn.className = 'btn-gold';
                    doubleBtn.style.cssText = 'width:100%; margin-top:10px; padding:12px; font-size:1rem; background:linear-gradient(135deg, #f39c12, #e67e22); animation:pulse-active 1.5s infinite;';
                    doubleBtn.innerHTML = '📺 REKLAM İZLE - KAZANCI İKİYE KATLA!';
                    doubleBtn.onclick = watchAdForDoubleReward;
                    btns.appendChild(doubleBtn);
                }
                btns.style.display = 'flex';
                btns.style.animation = 'slideUp 0.5s ease';
            }
        }, 1500);
    }

    // Reklam izleyerek kazancı ikiye katlama
    function watchAdForDoubleReward() {
        const doubleBtn = document.getElementById('btnDoubleReward');
        if (doubleBtn) {
            doubleBtn.innerHTML = '⏳ Reklam Yükleniyor...';
            doubleBtn.disabled = true;
        }

        // Check if AdManager exists and ad is ready
        if (typeof AdManager !== 'undefined' && AdManager.showRewardedAd) {
            AdManager.showRewardedAd(() => {
                // Reklam başarıyla izlendi - kazancı ikiye katla
                const originalAmount = window.lastWinAmount || 0;
                const doubleAmount = originalAmount * 2;

                // Update gold
                updateGold(originalAmount); // Add the extra amount

                // Update UI
                const amountEl = document.getElementById('piggyAmount');
                if (amountEl) {
                    amountEl.innerHTML = `+${doubleAmount} Altın <span style="color:#f1c40f; font-size:0.7em;">(2x)</span>`;
                }

                window.isDoubleReward = true;

                // Show success message
                showToast('🎉 Tebrikler! Kazancın ikiye katlandı!');

                // Remove double button
                if (doubleBtn) {
                    doubleBtn.style.display = 'none';
                }

                // Trigger confetti
                safeConfetti();

                try { AudioEngine.win(); } catch(e){}
            });

            // Set timeout for ad load failure
            setTimeout(() => {
                if (doubleBtn && !doubleBtn.disabled && doubleBtn.innerHTML.includes('Yükleniyor')) {
                    doubleBtn.innerHTML = '📺 REKLAM İZLE - KAZANCI İKİYE KATLA!';
                    doubleBtn.disabled = false;
                    showToast('⚠️ Reklam yüklenemedi. Tekrar dene!');
                }
            }, 5000);
        } else {
            // AdManager not available
            if (doubleBtn) {
                doubleBtn.innerHTML = '📺 REKLAM İZLE - KAZANCI İKİYE KATLA!';
                doubleBtn.disabled = false;
            }
            showToast('⚠️ Reklam şu anda kullanılamıyor. Daha sonra tekrar dene!');
        }
    }


    // Piggy overlay kapatma ve tekrar oynama

    // Piggy overlay kapatma ve çıkış
    function closePiggyAndExit() {
        const overlay = document.getElementById('piggyWinOverlay');
        const coinLayer = document.getElementById('coinDropLayer');
        const fillBar = document.getElementById('piggyFillBar');
        const btns = document.getElementById('piggyButtons');

        if (overlay) overlay.style.display = 'none';
        if (coinLayer) coinLayer.innerHTML = '';
        if (fillBar) fillBar.style.width = '0%';
        if (btns) btns.style.display = 'none';

        // Lobiye dön
        leaveRoom();
    }

    // Sessiz Modu Açıp Kapatan Fonksiyon
    function toggleMute() {
        isMuted = !isMuted;
        localStorage.setItem("yh_muted", isMuted); // Tercihi kaydet
        updateMuteUI();
    }

    // Butonun ikonunu güncelleyen fonksiyon
    function updateMuteUI() {
        const btn = document.getElementById('btnMute');
        if (btn) {
            if (isMuted) {
                btn.innerText = "🔇";
                btn.style.opacity = "0.5";
            } else {
                btn.innerText = "🔊";
                btn.style.opacity = "1";
                // Açıldığında test sesi verelim (kullanıcı anlasın)
                AudioEngine.click();
            }
        }
    }
    function addXP(amount) { user.xp += amount; const xpNeeded = 500; if (user.xp >= xpNeeded) { user.xp = 0; user.level++; updateGold(200); document.getElementById('newLevelDisplay').innerText = user.level; showModal('modal-levelup'); safeConfetti(); } db.ref('users/' + user.name).update({ xp: user.xp, level: user.level }); updateLobbyUI(); }
    function attemptLogin() { let name = document.getElementById('usernameInput').value.trim(); let pass = document.getElementById('passwordInput').value.trim(); if (name.length < 3) return showToast("İsim kısa!"); if (ADMIN_NAMES.includes(name)) { if (btoa(pass) !== ADMIN_HASH) return alert("Hatalı Admin Şifresi!"); completeLogin(name); return; } if (name === "OkuEmel") { if (btoa(unescape(encodeURIComponent(pass))) !== OKUEMEL_HASH) return alert("Hatalı Şifre!"); completeLogin(name); return; } if (pass.length < 3) return showToast("Şifre en az 3 karakter olmalı."); db.ref('banned/' + name).once('value').then(snap => { if (snap.exists()) { alert("Yasaklı!"); return; } db.ref('users/' + name).once('value').then(s => { const val = s.val(); if (val) { if (val.password === pass) completeLogin(name); else alert("Yanlış Şifre!"); } else { db.ref('users/' + name).set({ password: pass, gold: 500, xp: 0, level: 1, inventory: [], joinDate: Date.now() }).then(() => completeLogin(name)); } }); }); }

    // --- MODAL UTILS ---
    function showModal(id) {
        const el = document.getElementById(id);
        if (!el) { console.warn("Modal not found:", id); return; }
        el.style.display = 'flex';
    }
    function closeModal(id) {
        const el = document.getElementById(id);
        if (!el) return;
        el.style.display = 'none';

        // Eğer bu bir 'modal chest reward' ise, confetti'yi de temizleyebiliriz (isteğe bağlı)
        if (id === 'modal-chest-reward') {
            // Confetti temizliği opsiyoneldir, kütüphane genelde kendi temizler
        }
    }

    function completeLogin(name) {
        user.name = name; db.ref('users/' + name).once('value').then(snap => {
            const val = snap.val() || {}; if (!val.joinDate) { db.ref('users/' + name).update({ joinDate: Date.now() }); }
            user.gold = val.gold !== undefined ? Number(val.gold) : 500;
            user.xp = val.xp !== undefined ? Number(val.xp) : 0;
            user.level = val.level !== undefined ? Number(val.level) : 1;

            // --- EKLENEN KISIM BAŞLANGIÇ ---
            // Bu satırlar veritabanından kariyer ilerlemesini çeker.
            user.careerLevel = val.careerLevel !== undefined ? Number(val.careerLevel) : 1;
            user.careerWins = val.careerWins !== undefined ? Number(val.careerWins) : 0;
            // --- EKLENEN KISIM BİTİŞ ---

            user.inventory = val.inventory || [];
            user.clan = val.clan || "";
            user.wordLevel = val.wordLevel || 1;
            user.wordCareerWins = val.wordCareerWins || 0;
            user.claimedWordRewards = val.claimedWordRewards || {};

            // RESET LOGIC V3
            if (!val.wordCareerResetV3) {
                console.log("Resetting Word Career to V3 Defaults");
                user.wordLevel = 1;
                user.wordCareerWins = 0;
                user.claimedWordRewards = {};
                user.wordCareerResetV3 = true;
                db.ref('users/' + name).update({
                    wordLevel: 1,
                    wordCareerWins: 0,
                    claimedWordRewards: {},
                    wordCareerResetV3: true
                });
            }
            user.winStreak = val.winStreak || 0;
            user.pet = val.pet || null; // Load pet data from DB
            user.totalMinutes = val.totalMinutes || 0; user.lastVaultTime = val.lastVaultTime || 0; user.items = val.items || { oracle: 0, freeze: 0, sabotage: 0 };
            user.adsWatched = val.adsWatched || 0;

            user.claimedCareerRewards = val.claimedCareerRewards || {}; // Load claimed career rewards

            const localAvatar = localStorage.getItem("yh_ava"); if (localAvatar && localAvatar !== "undefined") { user.avatar = localAvatar; if (val.avatar !== localAvatar) { db.ref('users/' + name).update({ avatar: localAvatar }); } } else { user.avatar = val.avatar || "😎"; localStorage.setItem("yh_ava", user.avatar); } user.activeTheme = val.activeTheme || ""; if (user.activeTheme) applyTheme(user.activeTheme, false); const freeThemes = ['bg-neon-city', 'bg-mystic-purple', 'bg-volcano', 'bg-deep-sea']; let invChanged = false; freeThemes.forEach(t => { if (!user.inventory.includes(t)) { user.inventory.push(t); invChanged = true; } }); if (invChanged) db.ref('users/' + name + '/inventory').set(user.inventory); listenForInvites();

            if (name === "OkuEmel" && !val.receivedBonus2000) {
                updateGold(650);
                db.ref(`daily_jackpot/${getDayKey()}/${name}`).set(650);
                db.ref(`weekly_rankings/${getWeekKey()}/${name}`).set(650);
                db.ref('users/' + name).update({ receivedBonus2000: true });
                setTimeout(() => showToast("🎉 OkuEmel Bonusu: +650 Altın!"), 1500);
            }
            saveUser(); if (ADMIN_NAMES.includes(name)) checkAdmin(); checkBannedAndLogin(); startTimeTracker();


        });
    }
    function checkSavedSession() {
        const r = sessionStorage.getItem('yh_game_room');
        const role = sessionStorage.getItem('yh_game_role');
        if (r && role) {
            console.log("Session restoring for room:", r);
            game.room = r;
            game.role = role;
            game.mode = "online";
            // listenRoom çağırınca otomatik screen-game'e geçer (game.active false iken)
            listenRoom(r);
            return true;
        }
        return false;
    }

    function checkBannedAndLogin() {
        db.ref('banned/' + user.name).once('value').then(snap => {
            if (snap.exists()) {
                alert("YASAKLANDIN!");
                localStorage.clear();
                location.reload();
            } else {
                updateLobbyUI();
                updatePresence(true);
                startSystemListeners();

                // Kaydedilmiş oyun oturumu var mı?
                if (!checkSavedSession()) {
                    changeScreen('screen-lobby');
                }
            }
        });
    }
    function startTimeTracker() {
        if (playTimeInterval) clearInterval(playTimeInterval);

        playTimeInterval = setInterval(() => {
            if (user.name) {
                // 1. Toplam süreyi artır
                user.totalMinutes = (user.totalMinutes || 0) + 1;

                // 2. Online durumunu yenile (HEARTBEAT) - Bu sayede listeden düşmezsin

                updatePresence(true);

                // Veritabanına kaydet
                db.ref('users/' + user.name).update({ totalMinutes: user.totalMinutes });
            }
        }, 60000); // Her 60 saniyede bir çalışır
    }

    /* --- CORRECTED START SYSTEM LISTENERS --- */
    function startSystemListeners() {
        if (!db) return;

        // --- SENİN EKLEDİĞİN ÖZELLİKLERİN ÇALIŞMASI İÇİN GEREKLİ LİSTE ---
        const difficulties = [3, 4, 5, 6, 7];

        // 0. MESAJ BİLDİRİM SİSTEMİ (Özelliklerin Korundu)
        db.ref('users/' + user.name + '/last_msg').off();
        db.ref('users/' + user.name + '/last_msg').on('value', snap => {
            const data = snap.val();
            const navBadge = document.getElementById('msgBadge');
            const floatBtn = document.getElementById('btnNewMsg');

            if (data && data.from && !data.seen && data.from !== user.name) {
                const isDmOpen = document.getElementById('modal-dm').style.display === 'flex';
                const isTalkingToSender = (typeof activeDMPartner !== 'undefined' && activeDMPartner === data.from);

                if (isDmOpen && isTalkingToSender) {
                    db.ref('users/' + user.name + '/last_msg/seen').set(true);
                    if (navBadge) navBadge.style.display = 'none';
                    if (floatBtn) floatBtn.style.display = 'none';
                } else {
                    // Senin eklediğin Pulse Animasyonu burada:
                    if (navBadge) { navBadge.style.display = 'block'; navBadge.classList.add('pulse-active'); }
                    if (floatBtn) { floatBtn.style.display = 'flex'; floatBtn.classList.add('pulse-active'); }
                    AudioEngine.notification();
                    showToast(`📩 ${data.from}: Yeni Mesaj!`);
                }
            } else {
                if (navBadge) { navBadge.style.display = 'none'; navBadge.classList.remove('pulse-active'); }
                if (floatBtn) { floatBtn.style.display = 'none'; floatBtn.classList.remove('pulse-active'); }
            }
        });

        // 1. ALTIN YAĞMURU
        db.ref('system/gold_multiplier').off();
        db.ref('system/gold_multiplier').on('value', s => {
            globalMultiplier = s.val() || 1;
            checkGoldRainStatus();
        });



        // 4. DUYURULAR
        db.ref('announcements').off();
        db.ref('announcements').on('value', s => {
            const d = s.val();
            if (d && (Date.now() - d.time < 60000)) {
                document.getElementById('broadcastMsg').innerText = d.text;
                showModal('modal-broadcast');
                AudioEngine.success();
            }
        });

        // 5. SPEEDRUN SİSTEMİ (GÜNLÜK - HAFTALIK - GLOBAL DÖNGÜSÜ)
        // Önce veri haznelerini oluşturuyoruz
        window.srData = { daily: {}, weekly: {}, global: {} };

        // Veritabanı dinleyicilerini kur
        difficulties.forEach(diff => {
            // GLOBAL (Tüm Zamanlar)
            db.ref(`system/speedrun/global/${diff}`).on('value', snap => {
                window.srData.global[diff] = snap.val();
                updateSpeedrunUI();
            });

            // GÜNLÜK
            const todayStr = getDayKey();
            db.ref(`system/speedrun/daily/${todayStr}/${diff}`).on('value', snap => {
                window.srData.daily[diff] = snap.val();
                updateSpeedrunUI();
            });

            // HAFTALIK (Burası eksikti, eklendi)
            const weekKey = getWeekKey();
            db.ref(`system/speedrun/weekly/${weekKey}/${diff}`).on('value', snap => {
                window.srData.weekly[diff] = snap.val();
                updateSpeedrunUI();
            });
        });

        // Döngü Değişkenleri
        window.currentDiffIndex = 1; // Başlangıç zorluğu (4 hane)
        window.srDisplayMode = 0; // 0: Günlük, 1: Haftalık, 2: Global

        if (window.srInterval) clearInterval(window.srInterval);

        // 3.5 Saniyede bir değişen döngü
        window.srInterval = setInterval(() => {
            // Modu değiştir (0 -> 1 -> 2 -> 0)
            window.srDisplayMode = (window.srDisplayMode + 1) % 3;

            // Eğer başa (Günlük) döndüyse, zorluğu değiştir (3 -> 4 -> 5...)
            if (window.srDisplayMode === 0) {
                window.currentDiffIndex = (window.currentDiffIndex + 1) % difficulties.length;
            }

            updateSpeedrunUI();
        }, 3500);

        // 6. GÜNLÜK KAZANAN (JACKPOT) - (Kazananı bulma mantığın korundu)
        const todayStr = getDayKey();
        db.ref('daily_jackpot/' + todayStr).on('value', s => {
            const userEl = document.getElementById('dwUser');
            const scoreEl = document.getElementById('dwScore');
            if (!userEl || !scoreEl) return;

            let maxGold = -1, winnerName = "";
            if (s.exists()) {
                s.forEach(child => {
                    let gold = parseInt(child.val());
                    if (gold > maxGold) { maxGold = gold; winnerName = child.key; }
                });
            }
            if (winnerName && maxGold > 0) {
                userEl.innerText = winnerName;
                scoreEl.innerText = `+${maxGold}`;
            } else {
                userEl.innerText = "Bekleniyor";
                scoreEl.innerText = "...";
            }
        });

        // 7. MARQUEE (KAYAN YAZI)
        try {
            const area = document.getElementById('marqueeArea');
            if (area) {
                db.ref('system/marquee').off();
                db.ref('system/marquee').on('value', snap => {
                    let text = snap.val();
                    // [FLAG FIX] Replace 'tr' with emoji
                    if (text) text = text.replace(/\btr\b/gi, '🇹🇷');
                    area.style.display = (!text || text.trim() === "") ? "none" : "block";
                    let marqueeEl = document.getElementById('dynamicMarquee');
                    if (!marqueeEl) {
                        area.innerHTML = `<marquee id="dynamicMarquee" scrollamount="5" style="width:100%;"></marquee>`;
                        marqueeEl = document.getElementById('dynamicMarquee');
                    }
                    if (marqueeEl.innerText !== text) { marqueeEl.innerText = text || ""; }
                });
            }
        } catch (err) { }

        // 8. ONLINE OYUNCULAR LİSTESİ (Senin eklediğin HTML yapısı korundu)
        const presenceRef = db.ref('presence');
        presenceRef.off();
        presenceRef.on('value', s => {
            const list = document.getElementById('activePlayersList');
            const inviteList = document.getElementById('inviteListWait');
            if (!list || !inviteList) return;

            list.innerHTML = "";
            inviteList.innerHTML = "";
            let hasData = false;

            s.forEach(c => {
                const pData = c.val();
                if (c.key !== user.name && pData.status === 'online') {
                    hasData = true;
                    const itemHTML = `
                <div class="list-item">
                    <span onclick="openUserProfile('${c.key}')" style="cursor:pointer; font-weight:bold; border-bottom:1px dashed #ccc;">
                        🟢 ${c.key}
                    </span>
                    <div style="display:flex; gap:5px;">
                        <button class="btn-gold" style="width:auto; padding:5px 10px; font-size:0.8rem;" onclick="openUserProfile('${c.key}')">👤</button>
                        <button class="btn-blue" style="width:auto; padding:5px 10px; font-size:0.8rem;" onclick="openDM('${c.key}')">💬</button>
                        <button class="btn-green" style="width:auto;padding:5px;" onclick="inviteUser('${c.key}')">DAVET</button>
                    </div>
                </div>`;
                    list.innerHTML += itemHTML;
                    inviteList.innerHTML += itemHTML;
                }
            });

            if (!hasData) {
                const noData = "<small>Kimse yok.</small>";
                list.innerHTML = noData;
                inviteList.innerHTML = noData;
            }
        });

        // 9. ADMIN PANELİ VERİLERİ (Yetki kontrolün korundu)
        if (ADMIN_NAMES.includes(user.name) || VIP_NAMES.includes(user.name)) {
            const updateAdmin = () => { if (currentScreen === 'screen-admin') renderAdminView(); };
            db.ref('users').on('value', snap => { adminData.users = snap.val() || {}; updateAdmin(); });
            db.ref('banned').on('value', snap => { adminData.banned = snap.val() || {}; updateAdmin(); });
            db.ref('presence').on('value', snap => { adminData.presence = snap.val() || {}; updateAdmin(); });
        }

        // 10. BOUNTY BUTONU (Senin sayacın korundu)
        const bountyBtn = document.getElementById('btnBountyLobby');
        if (bountyBtn) {
            db.ref('bounties').off();
            db.ref('bounties').on('value', snap => {
                if (window.bountyTextInterval) { clearInterval(window.bountyTextInterval); window.bountyTextInterval = null; }
                bountyBtn.classList.remove('pulse-active');
                let count = 0;
                if (snap.exists()) snap.forEach(c => { if (c.val().reward) count++; });
                if (count > 0) {
                    bountyBtn.innerHTML = `🤠 ÖDÜL AVCILARI <span style="font-size:0.8rem; background:rgba(255,255,255,0.3); padding:2px 8px; border-radius:10px; margin-left:5px;">${count}</span>`;
                } else {
                    bountyBtn.innerHTML = "🤠 ÖDÜL AVCILARI";
                }
            });
        }
    }

    function updateSpeedrunUI() {
        const srTitle = document.getElementById('srTitle');
        const srUser = document.getElementById('srUser');
        const srTime = document.getElementById('srTime');

        if (!srTitle || !window.srData) return;

        // Zorluk Listesi ve Seçimler
        const difficulties = [3, 4, 5, 6, 7];
        if (typeof window.currentDiffIndex === 'undefined') window.currentDiffIndex = 1;

        const diff = difficulties[window.currentDiffIndex];
        let data, titlePrefix;

        // Hangi moddayız? (0: Günlük, 1: Haftalık, 2: Global)
        switch (window.srDisplayMode) {
            case 0:
                data = window.srData.daily[diff];
                titlePrefix = "📅 GÜN";
                srUser.style.color = "#f1c40f"; // Günlük Sarı
                break;
            case 1:
                data = window.srData.weekly[diff];
                titlePrefix = "🗓️ HFT";
                srUser.style.color = "#2ecc71"; // Haftalık Yeşil
                break;
            case 2:
                data = window.srData.global[diff];
                titlePrefix = "⚡ GLB";
                srUser.style.color = "#00d2ff"; // Global Mavi
                break;
            default:
                data = null;
        }

        // Başlığı Güncelle (Örn: "📅 GÜN (4)")
        srTitle.innerText = `${titlePrefix} (${diff})`;

        // Veriyi Ekrana Bas
        if (data && data.user && data.time) {
            srUser.innerText = data.user;
            srTime.innerText = `${data.time}sn`;
        } else {
            srUser.innerText = "Yok";
            srTime.innerText = "";
            srUser.style.color = "#ccc";
        }
    }
    function checkSpeedRecord(elapsedSeconds, difficulty) { if (!user.name || elapsedSeconds <= 0) return; const recordData = { user: user.name, time: elapsedSeconds, timestamp: firebase.database.ServerValue.TIMESTAMP }; db.ref(`system/speedrun/global/${difficulty}`).transaction((currentData) => { if (currentData === null || elapsedSeconds < currentData.time) { return recordData; } return; }, (error, committed) => { if (committed) { showToast(`⚡ YENİ DÜNYA REKORU: ${elapsedSeconds}sn!`); safeConfetti(); AudioEngine.win(); } }); const todayKey = new Date().toISOString().split('T')[0]; db.ref(`system/speedrun/daily/${todayKey}/${difficulty}`).transaction((currentData) => { if (currentData === null || elapsedSeconds < currentData.time) { return recordData; } return; }); }

    // --- CHEST SYSTEM (ZAMAN AYARLI SANDIKLAR) ---




    // Slotları Render Et


    // 1. Kilit Açmayı Başlat


    // 2. Reklamla Hızlandırma


    // 3. Sandığı Aç ve Ödül Ver


    // Helper: Veritabanı Güncelleme


    // Helper: Milisaniyeyi Saate Çevir


    // Oyun Kazanıldığında Sandık Ver



    function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

    function startTimerLoop() {
        if (game.timerInt) clearInterval(game.timerInt);

        game.timerInt = setInterval(() => {
            if (!game.active) return;



            // Standart Mod (Single & Online)
            const now = Date.now();
            const elapsed = now - game.startTime;
            const totalMs = game.duration * 60 * 1000;
            const leftMs = totalMs - elapsed;



            if (leftMs <= 10000 && leftMs > 0) {
                const sec = Math.floor(leftMs / 1000);
                if ((leftMs % 1000) < 100) AudioEngine.heartbeat();
                document.getElementById('timerDisplay').style.color = (sec % 2 === 0) ? "red" : "white";
            } else {
                document.getElementById('timerDisplay').style.color = "var(--gold)";
            }

            // [PET HELP] 1 Dakika Kala Yardım
            checkPetHelpCondition(leftMs);

            // SÜRE BİTTİ
            if (leftMs <= 0) {
                document.getElementById('timerDisplay').innerText = "00:00";
                clearInterval(game.timerInt);

                // DÜZELTME: Kariyer modunu da buraya ekledik
                if (game.mode === 'single' || game.mode === 'career' || game.mode === 'bounty') {
                    endGameLocal('lose', 0);
                } else if (game.mode === 'online') {

                    // Çakışmayı önlemek için sadece P1 bitiş komutunu gönderir
                    if (game.role === 'p1') {
                        db.ref('rooms/' + game.room).update({ winner: 'draw', endReason: 'time_out' });
                    }
                }
                return;
            }

            const sec = Math.floor((leftMs / 1000) % 60);
            const min = Math.floor(leftMs / 1000 / 60);
            document.getElementById('timerDisplay').innerText = `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
        }, 1000);
    }
    function stopTimer() { if (game.timerInt) clearInterval(game.timerInt); }
    function getDifficultyReward(diff) { if (diff === 3) return 50; if (diff === 4) return 100; if (diff === 5) return 200; if (diff === 6) return 400; if (diff === 7) return 1000; return 50; }
    function getWeekKey() { const d = new Date(); const year = d.getFullYear(); const onejan = new Date(year, 0, 1); const week = Math.ceil((((d - onejan) / 86400000) + onejan.getDay() + 1) / 7); return `${year}-W${week}`; }
    function getDayKey() {
        // Yerel saate göre YYYY-MM-DD formatı (Türkiye saatiyle uyumlu çalışır)
        const d = new Date();
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    function useHint() {
        if (!game.active) return;

        AdManager.showRewardedAd(() => {
            // WebView'in kendine gelmesi için ufak bir gecikme şart
            setTimeout(() => {
                try {
                    // 1. CRASH ÖNLEYİCİ: Sayıyı zorla String'e çeviriyoruz.
                    // (Eğer veritabanından sayı olarak gelirse .split fonksiyonu kodu kırar)
                    const secretStr = game.secret.toString();

                    // 2. Rastgele rakam seç
                    const randomDigit = secretStr[Math.floor(Math.random() * secretStr.length)];

                    // 3. 'alert' yerine oyunun kendi duyuru penceresini (modal) kullanıyoruz.
                    // Çünkü mobil uygulamalarda 'alert' kutusu görünmeyebilir.
                    const msgBox = document.getElementById('broadcastMsg');
                    if (msgBox) {
                        msgBox.innerHTML = `
                        <div style="text-align:center;">
                            <div style="font-size:3rem; margin-bottom:10px;">💡</div>
                            <h3 style="color:#f1c40f; margin:0;">İPUCU</h3>
                            <br>
                            <p style="font-size:1.1rem; line-height:1.5;">
                                Gizli sayının içinde <br>
                                <b style="font-size:2rem; color:#2ecc71; border:2px dashed #2ecc71; padding:0 10px; border-radius:10px;">${randomDigit}</b><br>
                                rakamı kesinlikle var!
                            </p>
                        </div>
                    `;
                        showModal('modal-broadcast');
                    } else {
                        // Eğer modal bulunamazsa yedek olarak Toast mesajı göster
                        showToast(`💡 İPUCU: Gizli sayıda ${randomDigit} rakamı var!`);
                    }

                    AudioEngine.success();
                } catch (e) {
                    console.error("İpucu hatası:", e);
                    showToast("İpucu gösterilemedi.");
                }
            }, 500); // 500ms gecikme, reklam kapandıktan sonra ekranın odaklanmasını sağlar
        });
    }

    function checkPetHelpCondition(timeLeftMs) {
        if (game.petHelpUsed || !game.active || game.mode === 'online' || game.mode === 'online_word') return;
        if (!user || !user.pet || user.pet.energy < 30) return;

        let shouldShow = false;
        if (game.type === 'classic' && game.rights <= 3) shouldShow = true;
        if (game.type === 'timed' && timeLeftMs !== undefined && timeLeftMs <= 60000) shouldShow = true;

        const btn = document.getElementById('btnPetHelpOption');
        if (shouldShow && btn && btn.style.display === 'none') {
            btn.style.display = 'flex';
            AudioEngine.notification();
        }
    }

    function acceptPetHelp() {
        if (!user || !user.pet || user.pet.energy < 30) {
            showToast("Yetersiz enerji!");
            return;
        }

        user.pet.energy -= 30;
        game.petHelpUsed = true;

        const btn = document.getElementById('btnPetHelpOption');
        if (btn) btn.style.display = 'none';

        if (typeof PetSystem !== 'undefined') {
            PetSystem.updateUI();
            // Optional: Save energy immediately
            if (user.name) db.ref('users/' + user.name + '/pet').update({ energy: user.pet.energy });
        }

        if (game.type === 'classic') {
            game.rights += 3;
            const rd = document.getElementById('rightsDisplay');
            if (rd) rd.innerText = "Hak: " + game.rights;
            showToast("🐾 Evcil hayvanından +3 HAK!");
        } else {
            game.startTime += 60000;
            showToast("🐾 Evcil hayvanından +1 DAKİKA!");
        }

        AudioEngine.win();
        safeConfetti();
    }


    // Helper: Calculate + (Plus) and - (Minus) score
    function getScore(secretStr, guessStr) {
        let p = 0, m = 0;
        for (let i = 0; i < secretStr.length; i++) {
            if (guessStr[i] === secretStr[i]) p++;
            else if (secretStr.includes(guessStr[i])) m++;
        }
        return { p, m };
    }

    // AI Logic for PvC
    const CpuAI = {
        // Generate a random guess of length 'diff' with unique digits
        generateRandom: function(diff) {
            let digits = ['0','1','2','3','4','5','6','7','8','9'];
            let res = "";
            for(let i=0; i<diff; i++) {
                const idx = Math.floor(Math.random() * digits.length);
                res += digits[idx];
                digits.splice(idx, 1);
            }
            return res;
        },

        // Generate a guess consistent with history
        getGuess: function(diff, history) {
            // history: [{g: '1234', p: 1, m: 0}, ...]
            // Simple approach: Generate random valid guesses and check against history.
            // Limit iterations to avoid freeze.

            const maxTries = 2000;
            for(let k=0; k<maxTries; k++) {
                const candidate = this.generateRandom(diff);
                let consistent = true;

                for(let h of history) {
                    const score = getScore(candidate, h.g); // If candidate was secret, would h.g score match h.p/h.m?
                    // Symmetry: Score(A, B) == Score(B, A) for P/M logic?
                    // Logic: "If 'candidate' is the secret, then previous guess 'h.g' MUST yield {h.p, h.m}"
                    // Check: getScore(candidate, h.g) returns {p, m}.
                    // If this matches h.p and h.m, it's consistent.

                    if (score.p !== h.p || score.m !== h.m) {
                        consistent = false;
                        break;
                    }
                }

                if(consistent) return candidate;
            }

            // Fallback
            return this.generateRandom(diff);
        }
    };
function makeGuess() {
        if (!game.active) return;
        const v = document.getElementById('guessInput').value;
        const diff = parseInt(game.diff); // Garanti sayı

        // Hatalı giriş kontrolü
        if (v.length != diff || new Set(v).size !== v.length) {
            const card = document.getElementById('gameCard');
            card.classList.add('shake-anim');
            if (navigator.vibrate) navigator.vibrate(200);
            setTimeout(() => card.classList.remove('shake-anim'), 500);
            return showToast("Hatalı: Rakamlar farklı ve " + diff + " hane olmalı!");
        }

        let p = 0, m = 0;
        const secretStr = game.secret.toString(); // Garanti string

        // --- BOUNTY MODE ---
        if (game.mode === 'bounty') {
            for (let i = 0; i < diff; i++) {
                if (v[i] == secretStr[i]) p++;
                else if (secretStr.includes(v[i])) m++;
            }
            addHistory(v, p, m);

            if (p == diff) {
                const prize = game.bountyPrize;
                endGameLocal('win', prize);
                try {
                    updateGold(prize);
                    db.ref('bounties/' + game.bountyId).remove();
                    AudioEngine.win();
                    safeConfetti();
                } catch (e) { console.error(e); }
                setTimeout(() => changeScreen('screen-bounty'), 3000);
            } else {
                game.rights--;
                document.getElementById('rightsDisplay').innerText = "Hak: " + game.rights;
                if (game.rights <= 0) {
                    endGameLocal('lose', 0);
                    try {
                        const entryFee = Math.floor(game.bountyPrize * 0.1);
                        db.ref('users/' + game.bountyOwner + '/gold').transaction(g => (g || 0) + entryFee);
                        AudioEngine.error();
                    } catch (e) { }
                    setTimeout(() => changeScreen('screen-bounty'), 3000);
                } else {
                    try { AudioEngine.error(); } catch (e) { }
                    const card = document.getElementById('gameCard');
                    card.classList.add('shake-anim');
                    setTimeout(() => card.classList.remove('shake-anim'), 500);
                }
            }
            return;
        }
        // --- SINGLE PLAYER & CAREER MODE ---
        if (game.mode === 'single' || game.mode === 'career' || game.mode === 'bounty') {
            for (let i = 0; i < diff; i++) {
                if (v[i] == secretStr[i]) p++;
                else if (secretStr.includes(v[i])) m++;
            }

            if (game.currentMoves) { game.currentMoves.push({ g: v, p: p, m: m, t: Date.now() - game.startTime }); }
            addHistory(v, p, m);

            if (p == diff) {
                stopTimer();

                let reward = 0;
                if (game.mode === 'single' || game.mode === 'career') {
                    if (diff === 3) reward = 75;
                    else if (diff === 4) reward = 150;
                    else if (diff === 5) reward = 300;
                    else if (diff === 6) reward = 600;
                    else reward = 1000;
                }
                if(reward > 0) updateGold(reward); endGameLocal('win', reward);
                try {
                    AudioEngine.win();
                    const elapsed = (Date.now() - game.startTime) / 1000;
                    checkSpeedRecord(elapsed, diff);
                    const today = getDayKey();
                    if (user.name) {
                        db.ref(`users/${user.name}/quests/${today}/wins`).transaction(w => (w || 0) + 1);
                    }
                    checkQuestProgress();
                    handleWinStreak();
                }

 catch (err) { console.log("Veri kaydetme hatası:", err); }

            } else {
                if (game.type === 'classic') {
                    game.rights--;
                    document.getElementById('rightsDisplay').innerText = "Hak: " + game.rights;

                    // [PET HELP] 3 Hak Kala Yardım (Hak azaldıktan sonra)
                    checkPetHelpCondition();

                    if (game.rights <= 0) {
                        endGameLocal('lose', 0);

                        // [TURTLE BONUS] Streak Shield
                        let protected = false;
                        if (user && user.pet && user.pet.active === 'turtle' && typeof PetSystem !== 'undefined' && PetSystem.getBonus('streak_shield')) {
                            if (Math.random() < 0.20) {
                                protected = true;
                                showToast("🐢 Tospik serini korudu!");
                            }
                        }

                        if (!protected) {
                            user.winStreak = 0;
                            saveUser();
                        }
                    }
                }
                try { AudioEngine.error(); } catch (e) { }
                const card = document.getElementById('gameCard');
                card.classList.add('shake-anim');
                setTimeout(() => card.classList.remove('shake-anim'), 500);
            }
        }
        // --- ONLINE MODE ---
        else {
            for (let i = 0; i < diff; i++) {
                if (v[i] == secretStr[i]) p++;
                else if (secretStr.includes(v[i])) m++;
            }
            db.ref('rooms/' + game.room + '/moves').push({ u: game.role, g: v, p: p, m: m });

            if (p == diff) {
                db.ref('rooms/' + game.room).update({ winner: game.role });
                try {
                    AudioEngine.win();
                } catch (e) { }
            } else {
                let u = {};
                if (game.playStyle === 'turn') u.turn = (game.turn === 'p1') ? 'p2' : 'p1';
                if (game.type === 'classic') {
                    const myRightsKey = 'rights_' + game.role;
                    const currentRights = (game.rights || 15) - 1;
                    u[myRightsKey] = currentRights;
                    if (currentRights <= 0) {
                        const winner = (game.role === 'p1') ? 'p2' : 'p1';
                        db.ref('rooms/' + game.room).update({ winner: winner, endReason: 'rights_out' });
                        return;
                    }
                }
                db.ref('rooms/' + game.room).update(u);
                try { AudioEngine.error(); } catch (e) { }
                document.getElementById('guessInput').value = "";
            }
        }

if (game.isPvc && game.active) {
                // Disable button to prevent spam while CPU thinks
                document.getElementById('btnGuess').disabled = true;
                document.getElementById('p1Indicator').className = "turn-indicator turn-wait";
                document.getElementById('p2Indicator').className = "turn-indicator turn-active";

                setTimeout(playCpuTurn, 1500);
            }
}
    function openVaultModal() {
        showModal('modal-vault');

        // UI Sıfırla
        const container = document.getElementById('vaultContainer');
        const btn = document.getElementById('btnOpenVault');
        const timerText = document.getElementById('vaultTimerText');
        const light = document.getElementById('vaultLight');

        container.classList.remove('vault-open');
        light.style.background = "#c0392b"; // Kırmızı
        light.style.boxShadow = "0 0 5px #c0392b";
        document.getElementById('vaultRewardDisplay').innerText = "???";

        const now = Date.now();
        const lastTime = user.lastVaultTime || 0;
        const oneDay = 24 * 60 * 60 * 1000;

        // Süre kontrolü
        if (now - lastTime < oneDay) {
            // Kasa Kilitli
            const timeLeft = oneDay - (now - lastTime);
            const hrs = Math.floor(timeLeft / (1000 * 60 * 60));
            const mins = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

            btn.style.display = 'none';
            timerText.style.display = 'block';
            document.getElementById('vaultTimeLeft').innerText = `${hrs} sa ${mins} dk`;
        } else {
            // Kasa Açılmaya Hazır
            btn.style.display = 'block';
            btn.disabled = false;
            btn.innerHTML = "🔐 ŞİFREYİ GİR VE AÇ";
            timerText.style.display = 'none';
        }
    }

    function openVault() {
        const btn = document.getElementById('btnOpenVault');
        if (btn.disabled) return;

        // Çift tıklamayı hemen önle
        btn.disabled = true;
        btn.innerHTML = "⏳ Reklam Yükleniyor...";

        AdManager.showRewardedAd(() => {
            const container = document.getElementById('vaultContainer');
            const light = document.getElementById('vaultLight');

            btn.innerHTML = "⚙️ Şifre Çözülüyor...";

            // 1. Ses ve Kol Dönme Efekti
            AudioEngine.click();

            // CSS class ekleyerek animasyonu başlat (Kol döner)
            container.classList.add('vault-open'); // Bu sınıf CSS'te handle'ı döndürüyor

            // 2. Kapı Açılma Gecikmesi (0.8sn sonra kapı açılır)
            setTimeout(() => {
                AudioEngine.success(); // Kasa açılma sesi
                light.style.background = "#2ecc71"; // Yeşil Işık
                light.style.boxShadow = "0 0 15px #2ecc71";

                // 3. Ödülü Hesapla (Max 500 Altın Mantığı)
                // %60 Şans: 50 - 150
                // %30 Şans: 150 - 300
                // %10 Şans: 300 - 500
                const rand = Math.random() * 100;
                let reward = 0;

                if (rand > 90) {
                    // Efsane Ödül (300-500)
                    reward = Math.floor(Math.random() * (500 - 300 + 1)) + 300;
                } else if (rand > 60) {
                    // Büyük Ödül (150-300)
                    reward = Math.floor(Math.random() * (300 - 150 + 1)) + 150;
                } else {
                    // Standart Ödül (50-150)
                    reward = Math.floor(Math.random() * (150 - 50 + 1)) + 50;
                }

                // Ödülü Ekrana Yaz
                const rewardText = document.getElementById('vaultRewardDisplay');
                rewardText.innerText = reward;

                // Kullanıcıya Ver
                updateGold(reward);

                // Tarihi Kaydet
                const now = Date.now();
                user.lastVaultTime = now;
                db.ref('users/' + user.name).update({ lastVaultTime: now });

                // Efektler
                safeConfetti();
                showToast(`🎉 Kasa Açıldı: ${reward} Altın!`);

                // Butonu Gizle
                btn.style.display = 'none';

                // Bilgi Mesajı
                document.getElementById('vaultTimerText').style.display = 'block';
                document.getElementById('vaultTimeLeft').innerText = "24 saat";

            }, 800); // 0.8 saniye bekle (Kol dönme süresi)
        });
    }
    function toggleGameChat() {
        const c = document.getElementById('gameChatContainer');
        const badge = document.getElementById('gameChatBadge');

        if (c.style.display === 'none') {
            // Sohbeti AÇIYORUZ
            c.style.display = 'block';

            // Bildirimi temizle (Okundu say)
            if (badge) badge.style.display = 'none';

            // En alta kaydır (Kullanıcı son mesajı görsün)
            const box = document.getElementById('gameChatBox');
            if (box) box.scrollTop = box.scrollHeight;
        } else {
            // Sohbeti KAPATIYORUZ
            c.style.display = 'none';
        }
    }

    function toggleChatBlock() { isChatBlocked = !isChatBlocked; const btn = document.getElementById('btnBlockChat'); if (isChatBlocked) { btn.innerText = "✅ Engeli Kaldır"; btn.classList.replace('btn-dark', 'btn-green'); showToast("Sohbet Gizlendi"); document.getElementById('gameChatBox').innerHTML = ""; } else { btn.innerText = "🚫 Engelle"; btn.classList.replace('btn-green', 'btn-dark'); showToast("Sohbet Açık"); } }
    function sendGameChat() { const txt = document.getElementById('gameChatInput').value; if (txt && game.room) { db.ref('rooms/' + game.room + '/chat').push({ u: user.name, m: txt }); document.getElementById('gameChatInput').value = ""; } }
    function showLeaderboard() { showModal('modal-leaderboard'); loadLeaderboard('all'); }
    function loadLeaderboard(type) {
        const list = document.getElementById('lbContent');
        if (!list) return;

        // Aktif sekme vurgusu
        document.getElementById('lbBtnDaily').style.opacity = (type === 'daily') ? '1' : '0.6';
        document.getElementById('lbBtnWeekly').style.opacity = (type === 'weekly') ? '1' : '0.6';
        document.getElementById('lbBtnAll').style.opacity = (type === 'all') ? '1' : '0.6';

        list.innerHTML = "<div style='text-align:center; padding:20px; color:#666;'><div style='font-size:2rem; margin-bottom:10px;'>⏳</div>Yükleniyor...</div>";

        let ref;
        try {
            if (type === 'daily') {
                const dayKey = getDayKey();
                if(!dayKey) throw new Error("Tarih hatası");
                ref = db.ref('daily_jackpot/' + dayKey).orderByValue();
            } else if (type === 'weekly') {
                const weekKey = getWeekKey();
                if(!weekKey) throw new Error("Tarih hatası");
                ref = db.ref('weekly_rankings/' + weekKey).orderByValue();
            } else {
                ref = db.ref('users').orderByChild('gold');
            }

            ref.limitToLast(20).once('value')
                .then(snap => {
                    list.innerHTML = "";
                    let arr = [];

                    if (snap.exists()) {
                        snap.forEach(c => {
                            // VIP Kontrolü (Varsa filtrele)
                            if (typeof VIP_NAMES !== 'undefined' && VIP_NAMES.includes(c.key)) return;

                            let val = c.val();
                            let score = 0;

                            if (type === 'all') {
                                score = (val && val.gold !== undefined) ? parseInt(val.gold) : 0;
                            } else {
                                score = parseInt(val) || 0;
                            }

                            arr.push({ n: c.key, s: score });
                        });

                        // Firebase artan sıralar, ters çevir (En yüksek en üstte)
                        arr.sort((a, b) => b.s - a.s);
                    }

                    if (arr.length === 0) {
                        list.innerHTML = "<div style='text-align:center; padding:20px; color:#999;'><div style='font-size:2rem; margin-bottom:10px;'>📭</div>Henüz kayıt yok.</div>";
                    } else {
                        arr.forEach((p, i) => {
                            let rankColor = "#7f8c8d";
                            let icon = "•";
                            let bgStyle = "";
                            if(i===0) { rankColor="#f1c40f"; icon="🥇"; bgStyle="background: linear-gradient(90deg, rgba(241,196,15,0.1), transparent);"; }
                            if(i===1) { rankColor="#bdc3c7"; icon="🥈"; bgStyle="background: linear-gradient(90deg, rgba(189,195,199,0.1), transparent);"; }
                            if(i===2) { rankColor="#cd7f32"; icon="🥉"; bgStyle="background: linear-gradient(90deg, rgba(205,127,50,0.1), transparent);"; }

                            const suffix = (type === 'all') ? '💰' : '🏆';

                            list.innerHTML += `
                            <div class="list-item" style="border-left: 4px solid ${rankColor}; ${bgStyle} margin-bottom: 5px; border-radius: 8px;">
                                <div style="display:flex; align-items:center; gap:10px;">
                                    <span style="font-weight:bold; color:${rankColor}; width:30px; font-size:1.1rem;">${icon} ${i + 1}</span>
                                    <span style="font-weight:600;">${p.n}</span>
                                </div>
                                <b style="color:${rankColor};">${p.s.toLocaleString()} ${suffix}</b>
                            </div>`;
                        });
                    }
                })
                .catch(err => {
                    console.error(err);
                    list.innerHTML = "<div style='color:red; text-align:center; padding:20px;'><div style='font-size:2rem; margin-bottom:10px;'>⚠️</div>Veri alınamadı.</div>";
                });
        } catch(e) {
            console.error(e);
            list.innerHTML = "<div style='color:red; text-align:center; padding:20px;'><div style='font-size:2rem; margin-bottom:10px;'>⚠️</div>Hata oluştu.</div>";
        }
    }
    function updateTurnUI(t) {
        const p1 = document.getElementById('p1Indicator'),
            p2 = document.getElementById('p2Indicator'),
            btn = document.getElementById('btnGuess'),
            inp = document.getElementById('guessInput');

        inp.placeholder = "_".repeat(game.diff);

        // DÜZELTME BURADA YAPILDI: 'bounty' modu eklendi
        if (game.mode === 'single' || game.mode === 'career' || game.mode === 'bounty' || game.playStyle === 'simul') {
            p1.className = "turn-indicator turn-active";
            p2.className = "turn-indicator turn-active";
            btn.disabled = false;
            btn.className = "btn-green";
            inp.disabled = false;
            return;
        }

        // Burası sadece Klasik Online Mod için çalışır
        p1.className = "turn-indicator " + (t === 'p1' ? 'turn-active' : 'turn-wait');
        p2.className = "turn-indicator " + (t === 'p2' ? 'turn-active' : 'turn-wait');

        if (t === game.role) {
            btn.disabled = false;
            btn.className = "btn-green";
            inp.disabled = false;
        } else {
            btn.disabled = true;
            btn.className = "btn-grey";
            inp.disabled = true;
        }
    }
    function addHistory(v, p, m, u) {
        const li = document.createElement('li');

        // Kimin oynadığını tespit et
        let isMe = false;

        if (game.mode === 'single' || game.mode === 'career' || game.mode === 'bounty') {
            // Tek kişilikte oyuncu her zaman sağdadır
            isMe = true;
        } else if (game.mode === 'bounty') {
            // Bounty modunda P1 (Avcı) her zaman bendim
            isMe = true;
        } else {
            // Online modda: Gelen hamle sahibi (u) ile benim rolüm (game.role) aynı mı?
            isMe = (u === game.role);
        }

        // Sınıfı ata (Sağ veya Sol)
        li.className = isMe ? "his-me" : "his-other";

        // İçerik: [SAYI] ve [PUAN] yan yana
        // CSS flex-direction sayesinde "his-me" ise puan solda, "his-other" ise puan sağda görünür.

        const guessHTML = `<span class="his-badge">${v}</span>`;

        const scoreHTML = `
        <div class="his-score">
            <span style="color:#2ed573">+${p}</span>
            <span style="color:#ff4757">-${m}</span>
        </div>`;

        // İçeriği birleştir
        li.innerHTML = guessHTML + scoreHTML;

        // Listeye ekle (En üste)
        const historyList = document.getElementById('history');
        historyList.prepend(li);

        // Inputu temizle
        document.getElementById('guessInput').value = "";
    }
    // --- PROFESYONEL RÖVANŞ SİSTEMİ (V4.0 - SENKRONİZE) ---

    function endGameLocal(r, amount) {
        // 1. ÖNCE ARKA PLANI DURDUR
        game.active = false;
        stopTimer();

        // 2. WIN vs LOSE HANDLING
        if (r === 'win') {
            // === WIN PATH: Show Piggy Bank Animation (NO MODAL) ===
            safeConfetti(); // Trigger gold animation if amount > 0
            if (amount > 0) {
                animateGoldChange(amount);
            } else {
                // Klasik modda sandık kazanma şansı
            }

            // Show piggy bank overlay instead of modal
            showPiggyWin(amount || 0);

        } else {
            // === LOSE PATH: Keep Original Modal (UNCHANGED) ===
            document.getElementById('endButtons').style.display = 'flex';
            document.getElementById('endTitle').innerText = 'KAYBETTİN';
            document.getElementById('endTitle').style.color = "#e74c3c";

            // [BOUNTY FIX] Gizli sayıyı gösterme
            if (game.mode === 'bounty') {
                document.getElementById('endMsg').innerText = "Cevap: ??? (GİZLİ)";
            } else {

            if (game.mode === 'bounty') {
                document.getElementById('endMsg').innerText = "Cevap: ??? (GİZLİ)";
            } else {
                document.getElementById('endMsg').innerText = "Cevap: " + game.secret;
            }
            }

            if (document.getElementById('rematchSettings')) document.getElementById('rematchSettings').style.display = 'none';
            if (document.getElementById('incomingRematchArea')) document.getElementById('incomingRematchArea').style.display = 'none';
            document.getElementById('rematchStatus').innerText = "";

            showModal('modal-end');
        }

        // 3. KARİYER MODU İLERLEME MANTIĞI
        try {
            if (game.mode === 'career' && r === 'win') {
                // FIX: Tür uyuşmazlığını önlemek için sayıya çeviriyoruz
                const currentLvl = parseInt(user.careerLevel) || 1;
                const playedLvl = parseInt(game.careerLvlIdx);

                // Sadece bulunduğun seviyeyi oynarsan ilerleme kaydedilir
                if (playedLvl === currentLvl) {

                    let wins = parseInt(user.careerWins) || 0;
                    wins++;
                    user.careerWins = wins;

                    // HEDEF: 10 Galibiyet
                    if (wins >= 10) {
                        if (user.careerLevel < 5) {
                            user.careerLevel++;
                            user.careerWins = 0;

                            if (user.name) {
                                db.ref('users/' + user.name).update({
                                    careerLevel: user.careerLevel,
                                    careerWins: 0
                                });
                            }
                            localStorage.setItem("careerLevel", user.careerLevel);

                            showToast("🎉 TEBRİKLER! BİR SONRAKİ SEVİYE AÇILDI!");
                            safeConfetti();
                        } else {
                            showToast("🏆 KARİYER TAMAMLANDI! ARTIK ŞAMPİYONSUN!");
                        }
                    } else {
                        let left = 10 - wins;
                        if (user.name) {
                            db.ref('users/' + user.name).update({ careerWins: wins });
                        }
                        showToast(`✅ İlerleme Kaydedildi: ${wins}/10 (Sonraki seviye için ${left} kaldı)`);
                    }

                    updateLobbyUI();
                }
            }
        } catch (e) {
            console.error("Kariyer ilerleme hatası:", e);
        }

        // 4. REKLAM MANTIĞI - 3 OYUNDA BİR
        // endGameLocal fonksiyonu içindeki reklam kısmı
        try {
            gamesPlayedCount++;
            if (gamesPlayedCount % 3 === 0) {
                // Artık sadece bunu çağırmak yeterli, sistem önce AdMob sonra Yandex dener.
                AdManager.showInterstitialAd();
            }
        } catch (e) {
            console.error("Reklam hatası:", e);
        }
    }

    function updateGameInterface(mode) {
        const chatContainer = document.getElementById('gameChatContainer');
        const chatToggleBtn = document.getElementById('btnGameChatToggle');
        const sabotageBtn = document.getElementById('btnSabotage');
        const emojiBar = document.querySelector('.emoji-bar');

        // Default: Show Everything
        if(chatContainer) chatContainer.style.display = 'none'; // Initially collapsed but togglable
        if(chatToggleBtn) chatToggleBtn.style.display = 'flex';
        if(sabotageBtn) sabotageBtn.style.display = 'inline-block';
        if(emojiBar) emojiBar.style.display = 'flex';

        // Single Player Restrictions
        if (mode === 'single') {
            if(chatToggleBtn) chatToggleBtn.style.display = 'none';
            if(sabotageBtn) sabotageBtn.style.display = 'none';
            if(emojiBar) emojiBar.style.display = 'none';
            // Also hide chat box if open
            if(chatContainer) chatContainer.style.display = 'none';
        }
    }
function startSingle() {
        const dStr = document.getElementById('singleDiffSelect').value;
        const d = parseInt(dStr) || 4;
        const mode = document.getElementById('singleMode').value;
        const isPvc = document.getElementById('checkVsCpu').checked;
        let playerSecret = "";
        if (isPvc) {
            const inputSecret = document.getElementById('playerSecretInput').value.trim();
            // Validate input
            if (inputSecret) {
                if (inputSecret.length !== d || new Set(inputSecret).size !== d) {
                    return showToast(`Hatalı: Senin sayın ${d} haneli ve rakamları farklı olmalı!`);
                }
                playerSecret = inputSecret;
            } else {
                playerSecret = generateNumber(d);
                showToast("Senin için sayı tutuldu: " + playerSecret);
            }
        }


        game.active = true;
        game.mode = "single";
        game.diff = d;
        game.secret = generateNumber(d);
        game.isPvc = isPvc;
        if(isPvc) {
            game.playerSecret = playerSecret;
            game.aiHistory = [];
            game.cpuTurnCount = 0;
        }
        game.type = mode;
        game.currentMoves = [];
        game.startTime = Date.now();
        game.lifelineUsed = false;
        game.petHelpUsed = false;
        game.usedItems = [];

        resetUI();

        if (mode === 'classic') {
            let rights = 15;
            if (d === 5) rights = 20;
            if (d === 6) rights = 25;
            if (d === 7) rights = 30;
            game.rights = rights;
            document.getElementById('rightsDisplay').style.display = 'block';
            document.getElementById('rightsDisplay').innerText = "Hak: " + game.rights;
            document.getElementById('timerDisplay').style.display = 'none';
        } else {
            const durVal = document.getElementById('singleDuration').value;
            game.duration = parseInt(durVal) || 3;
            game.rights = 999;
            document.getElementById('rightsDisplay').style.display = 'none';
            document.getElementById('timerDisplay').style.display = 'block';
            startTimerLoop();
        }

        document.getElementById('p1Indicator').innerText = "Oyuncu";
        document.getElementById('p2Indicator').innerText = isPvc ? "Bilgisayar" : "Hedef";
        closeModal('modal-setup');
        changeScreen('screen-game');
        updateGameInterface('single');
        updateTurnUI('p1');
        updateLobbyUI();
    }

    function startTimerLoop() {
        stopTimer();
        game.timerInt = setInterval(() => {
            if (!game.active) { stopTimer(); return; }

            const now = Date.now();
            const elapsed = Math.floor((now - game.startTime) / 1000);
            const total = (game.duration || 3) * 60;
            const left = total - elapsed;

            if (left <= 0) {
                document.getElementById('timerDisplay').innerText = "00:00";
                stopTimer();
                if (!game.lifelineUsed) {
                    offerLifeline('time');
                } else {
                    endGameLocal('lose', 0);
                }
                return;
            }

            const m = Math.floor(left / 60);
            const s = left % 60;
            document.getElementById('timerDisplay').innerText =
                (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
        }, 1000);
    }

    function stopTimer() {
        if (game.timerInt) { clearInterval(game.timerInt); game.timerInt = null; }
    }

    // RÖVANŞ İSTEĞİ (Her iki taraf da bunu kullanır)
    function requestRematch() {
        // Tek kişilikse direkt başlat
        // Tek kişilikse direkt başlat

        // Word Game Replay
        if (currentScreen === 'screen-word-game') {
             // Restart with last config
             // We stored config in wordGameState?
             // wordGameState has length and mode.

             // Re-run setup logic manually or extract `restartWordGame`?
             // Let's modify `startWordGameCustom` to optionally take params?
             // Or just set the DOM elements and call it?
             // But DOM might have changed.

             // Better: define `restartWordGame()` that uses `wordGameState` params.
             restartWordGame();
             return;
        }

        if (game.mode === 'single') {
            const d = game.diff || 4; // Dropdowndan değil, mevcut oyundan al
            document.getElementById('singleDiffSelect').value = d;
            startSingle();
            closeModal('modal-end');
            return;
        }

        // Kariyer Moduysa direkt o seviyeyi tekrar başlat
        if (game.mode === 'career') {
            if (game.careerLvlIdx !== undefined) {
                selectedCareerLvl = game.careerLvlIdx;
            }
            launchCareerGame(); // Mevcut seviye bilgileriyle yeniden başlatır
            closeModal('modal-end');
            return;
        }

        // Bounty (Ödül Avcısı) Moduysa aynı avı tekrar başlatmayı teklif et
        if (game.mode === 'bounty') {
            if (typeof attemptBounty === 'function' && game.bountyOwner && game.secret && game.bountyPrize) {
                attemptBounty(game.bountyId, game.bountyOwner, game.secret, game.bountyPrize, game.diff);
            } else if (typeof openBountyScreen === 'function') {
                openBountyScreen();
            }
            closeModal('modal-end');
            return;
        }

        // Online Mod: Rövanş Teklif Modalını Aç
        openRematchModal();
    }

    // --- RÖVANŞ SİSTEMİ (STABİL v2) ---
    function openRematchModal() {
        if (!game.room) return;

        if (game.mode === 'online_word') {
            // Word Game online rematch bypasses the config modal and sends an offer with the same settings
            db.ref('rooms/' + game.room + '/rematch/offer').set({
                from: game.role,
                diff: wordGameState.length,
                playStyle: wordGameState.timeLimit > 0 ? 'timed' : 'turn',
                duration: wordGameState.timeLimit,
                timestamp: Date.now()
            });

            document.getElementById('endButtons').style.display = 'none';
            const statusEl = document.getElementById('rematchStatus');
            if(statusEl) {
                statusEl.innerText = "Teklif gönderildi, rakip bekleniyor...";
                statusEl.style.display = 'block';
            }
            return;
        }

        showModal('modal-rematch-offer');
    }

    function sendRematchOffer() {
        const d = parseInt(document.getElementById('rematchConfigDiff').value);
        const modeRadio = document.querySelector('input[name="rematchConfigMode"]:checked');
        const mode = modeRadio ? modeRadio.value : 'rights';
        let duration = 3;
        if (mode === 'timed') duration = parseInt(document.getElementById('rematchConfigDuration').value);

        closeModal('modal-rematch-offer');

        // Show waiting status in modal-end
        const statusEl = document.getElementById('rematchStatus');
        if(statusEl) {
            statusEl.innerText = "Teklif gönderildi, rakip bekleniyor...";
            statusEl.style.display = 'block';
        }

        // Hide buttons to prevent double click
        document.getElementById('endButtons').style.display = 'none';

        db.ref('rooms/' + game.room + '/rematch/offer').set({
            from: game.role,
            diff: d,
            playStyle: (mode==='timed'?'timed':'turn'),
            duration: duration,
            timestamp: Date.now()
        });

        // Clear previous response
        db.ref('rooms/' + game.room + '/rematch/response').remove();
    }

    function acceptRematch() {
        db.ref('rooms/' + game.room + '/rematch/response').set({
            from: game.role,
            accept: true
        });
        document.getElementById('incomingRematchArea').style.display = 'none';
        document.getElementById('rematchStatus').innerText = "Kabul edildi, oyun başlıyor...";
    }

    function rejectRematch() {
        db.ref('rooms/' + game.room + '/rematch/response').set({
            from: game.role,
            accept: false
        });
        document.getElementById('incomingRematchArea').style.display = 'none';
        // Show buttons again
        document.getElementById('endButtons').style.display = 'flex';
    }

    function respondToRematch(accepted) {
        closeModal('modal-rematch-accept');

        if (accepted) {
            showToast("Kabul ettin! Oyun hazırlaniyor...");
            db.ref('rooms/' + game.room + '/rematch/response').set('accepted');
        } else {
            showToast("Reddettin.");
            db.ref('rooms/' + game.room + '/rematch/response').set('rejected');
        }
    }

    // Bu fonksiyon listenRoom içinde çağrılacak
    function checkRematchUpdates(r) {
        if (!r.rematch) return;

    // 1. Teklif Kontrolü
        if (r.rematch.offer) {
            const offer = r.rematch.offer;
            // Eğer teklif BENDEN DEĞİLSE ve henüz yanıtlanmadıysa
            if (offer.from !== game.role && !r.rematch.response) {
                // Modalı sadece kapalıysa aç (sürekli açılmasın)
                if (document.getElementById('modal-rematch-accept').style.display !== 'flex') {
                    document.getElementById('rematchRequestText').innerText = `Rakip ${offer.diff} haneli oyun istiyor.`;
                    showModal('modal-rematch-accept');
                }
            }
        }

        // 2. Yanıt Kontrolü
        if (r.rematch.response) {
            const res = r.rematch.response;
            if (res === 'rejected') {
                showToast("Rövanş reddedildi. ❌");
                const statusEl = document.getElementById('rematchStatus');
                if (statusEl) statusEl.innerText = "Reddedildi.";

                // State'i temizle ki döngüye girmesin (Sadece Host yapsın veya 2sn sonra)
                if (game.role === 'p1') {
                    setTimeout(() => db.ref('rooms/' + game.room + '/rematch').remove(), 3000);
                }
            } else if (res === 'accepted') {
                const statusEl = document.getElementById('rematchStatus');
                if (statusEl) statusEl.innerText = "Oyun Başlıyor... 🚀";

                // HOST (P1) OYUNU BAŞLATIR
                if (game.role === 'p1') {
                    const newDiff = r.rematch.offer.diff || 4;
                    startNewGame(newDiff);
                }
            }
        }
    }

    function startNewGame(d) {
        // Hak hesapla
        let rights = 15;
        if (d === 5) rights = 20;
        if (d === 6) rights = 25;
        if (d === 7) rights = 30;

        const newSecret = generateNumber(d);

        // Odayı sıfırla ve başlat
        db.ref('rooms/' + game.room).update({
            winner: null,
            rematch: null, // Rematch state'ini temizle
            moves: null,
            status: 'playing',
            turn: 'p1',
            rights_p1: rights,
            rights_p2: rights,
            secret: newSecret,
            startTime: Date.now(),
            'config/diff': d
        });
    }

    // Eski fonksiyonları temizlemek için placeholder (çakışmasın)
    function acceptRematchLegacy() { }
    function rejectRematchLegacy() { }
    function resetUI() {
        document.getElementById('history').innerHTML = "";
        document.getElementById('guessInput').value = "";
        document.getElementById('gameChatBox').innerHTML = "";
        document.getElementById('endButtons').style.display = 'none';
        const helpBtn = document.getElementById('btnPetHelpOption');
        if (helpBtn) helpBtn.style.display = 'none';
        game.petHelpUsed = false;
    }
    function leaveRoom() {
        game.active = false;
        stopTimer();
        sessionStorage.removeItem('yh_game_room');
        sessionStorage.removeItem('yh_game_role');

        resetUI(); // <--- EKLEME: Çıkarken ekranı temizle
        closeModal('modal-end');
        closeModal('modal-disconnect');
        changeScreen('screen-lobby');

        if (game.room) {
            db.ref('rooms/' + game.room).off();
            db.ref('rooms/' + game.room + '/chat').off();
            db.ref('rooms/' + game.room + '/moves').off();
            db.ref('rooms/' + game.room).onDisconnect().cancel();
            if (game.role === 'p1') {
                db.ref('rooms/' + game.room).remove();
            }
            game.room = null;
        }
    }
    function levelUpCareer() {
        careerLevel++;
        localStorage.setItem("careerLevel", careerLevel);
        // careerLevel değişkenini güncelle (localstorage'dan okumana gerek yok, zaten artırdın)
        // Eğer UI güncellemesi gerekiyorsa ve öyle bir fonksiyonun yoksa, şimdilik boş geçiyoruz.
        // updateCareerUI(); // Bu fonksiyon tanımlı olmadığı için yorum satırına aldım, hata verdirir.

        // Kullanıcıya bilgi ver
        showToast("Tebrikler! Kariyer seviyesi arttı: " + careerLevel);
    }

    function closeAd() {
        const ad = document.getElementById("adModal");
        ad.style.display = "none";
        ad.style.pointerEvents = "none";
    }
    function saveUser() { localStorage.setItem("yh_name", user.name); localStorage.setItem("yh_ava", user.avatar); if (user.name) { db.ref('users/' + user.name).update({ avatar: user.avatar }); } }
    function isGoldRainTime() { const trTimeStr = new Date().toLocaleString("en-US", { timeZone: "Europe/Istanbul" }); const trDate = new Date(trTimeStr); const hour = trDate.getHours(); return (hour === 21); }
    function updateGold(amount) {
        let multiplier = 1;
        if (amount > 0) {
            if (globalMultiplier > 1) {
                multiplier = globalMultiplier;
            } else if (isGoldRainTime()) {
                multiplier = 2;
            }
        }
        const finalAmount = Math.floor(amount * multiplier);
        user.gold += finalAmount;
        document.getElementById('lobbyGold').innerText = user.gold;

        if (user.name) {
            db.ref('users/' + user.name).update({ gold: user.gold });

            // GÜNLÜK VE HAFTALIK SIRALAMA GÜNCELLEMESİ (Sadece Kazançta)
            if (finalAmount > 0) {
                const today = getDayKey();
                const week = getWeekKey();

                // Günlük Şampiyonluk
                db.ref(`daily_jackpot/${today}/${user.name}`).transaction(current => {
                    return (current || 0) + finalAmount;
                });

                // Haftalık Sıralama
                db.ref(`weekly_rankings/${week}/${user.name}`).transaction(current => {
                    return (current || 0) + finalAmount;
                });
            }
        }

        if (amount > 0 && multiplier > 1) {
            showToast(`🔥 ALTIN YAĞMURU! ${amount} yerine ${finalAmount} kazandın!`);
        }
    }
    function setGoldMultiplier(val) { if (confirm(`Oyun genelinde altın çarpanını x${val} yapmak istiyor musun?`)) { db.ref('system/gold_multiplier').set(val); showToast(`Çarpan x${val} olarak ayarlandı.`); } }
    function checkGoldRainStatus() { const badge = document.getElementById('goldRainBadge'); if (!badge) return; let isActive = false; let currentMult = 1; if (globalMultiplier > 1) { isActive = true; currentMult = globalMultiplier; } else if (isGoldRainTime()) { isActive = true; currentMult = 2; } if (isActive) { badge.style.display = 'block'; badge.innerText = `🌧️ ALTIN YAĞMURU AKTİF! (x${currentMult} KAZANÇ)`; } else { badge.style.display = 'none'; } }
    function checkAdmin() { document.getElementById('btnAdminPanel').style.display = 'block'; loadAdminDashboard(); db.ref('users').once('value').then(snap => { document.getElementById('totalUserCount').innerText = snap.numChildren(); }); }
    function toggleSystem(sys) {
        if (!sys) return;
        const key = 'system_status_' + sys;
        const current = localStorage.getItem(key) === 'false' ? false : true;
        const newState = !current;
        localStorage.setItem(key, newState);

        applySystemPreferences();

        showToast((sys === 'pet' ? 'Pet' : 'Sandık') + " sistemi " + (newState ? "açıldı" : "kapatıldı") + ".");
    }

    function applySystemPreferences() {
        const petStatus = localStorage.getItem('system_status_pet') !== 'false';

        // UI Elementlerini Güncelle
        const petEl = document.getElementById('lobbyPetWalker');
        if (petEl) petEl.style.display = petStatus ? 'flex' : 'none';

        const chestEl = document.getElementById('chestSlotsContainer');

        // Admin Panel Butonlarını Güncelle (Eğer o an açıksa)
        const btnPet = document.getElementById('btnTogglePet');
        if (btnPet) btnPet.innerText = '🐾 Pet: ' + (petStatus ? "AÇIK" : "KAPALI");

        const btnChest = document.getElementById('btnToggleChest');
    }

    // Sayfa yüklendiğinde tercihleri uygula
    window.addEventListener('DOMContentLoaded', applySystemPreferences);

    function resetDailyJackpot() { if (confirm("DİKKAT: Bugünkü tüm jackpot verileri silinecek. Emin misin?")) { db.ref(`daily_jackpot/${getDayKey()}`).remove().then(() => showToast("🗑️ Jackpot Sıfırlandı!")).catch(e => showToast("Hata oluştu")); } }
    function resetSpeedRuns() { if (confirm("DİKKAT: TÜM Speedrun rekorlarını silmek istiyor musun?")) { db.ref(`system/speedrun`).remove().then(() => showToast("🗑️ Speedrun Kayıtları Silindi!")).catch(e => showToast("Hata oluştu")); } }
    function sendAdminMessage() { const el = document.getElementById('adminMsgInput'); const msg = el.value.trim(); if (!msg) return showToast("Mesaj boş olamaz!"); db.ref('admin_messages').push({ user: user.name, text: msg, time: firebase.database.ServerValue.TIMESTAMP }, function (error) { if (error) { showToast("Hata oluştu: " + error); } else { showToast("Mesaj Yönetime İletildi!"); el.value = ""; closeModal('modal-contact'); } }); }
    window.deleteAdminMsg = function (key) { if (confirm('Mesaj silinsin mi?')) { db.ref('admin_messages/' + key).remove(); } }
    function loadAdminDashboard() { if (!ADMIN_NAMES.includes(user.name)) return; function listenAdminMessages() { const list = document.getElementById('adminMsgList'); if (!list) return; db.ref('admin_messages').off(); db.ref('admin_messages').limitToLast(20).on('value', function (snapshot) { let htmlContent = ""; if (!snapshot.exists()) { htmlContent = "<div style='padding:10px;text-align:center;color:#ccc;'>📭 Mesaj kutusu boş.</div>"; } else { let msgs = []; snapshot.forEach(function (child) { msgs.push({ key: child.key, val: child.val() }); }); msgs.reverse(); msgs.forEach(function (item) { const m = item.val; const dateStr = new Date(m.time).toLocaleString('tr-TR'); htmlContent += `<div class="list-item" style="flex-direction:column; align-items:flex-start; background:rgba(255,255,255,0.05); margin-bottom:5px; padding:8px; border-radius:5px;"><div style="display:flex; justify-content:space-between; width:100%; font-size:0.7rem; color:#aaa; margin-bottom:3px;"><span>👤 ${m.user}</span><span>🕒 ${dateStr}</span></div><div style="font-size:0.9rem; color:#fff; word-break:break-word; margin-bottom:5px;">${m.text}</div><button class="btn-red" style="width:100%; padding:4px; font-size:0.75rem;" onclick="deleteAdminMsg('${item.key}')">🗑️ Sil</button></div>`; }); } list.innerHTML = htmlContent; }); } listenAdminMessages(); if (!adminListenersActive) { db.ref('feedback_reports').limitToLast(20).on('value', snap => { const list = document.getElementById('adminReportList'); if (list) { list.innerHTML = ""; if (!snap.exists()) { list.innerHTML = "<small>Bildirim yok.</small>"; } else { snap.forEach(c => { const r = c.val(); const key = c.key; const time = new Date(r.time).toLocaleTimeString('tr-TR'); const html = `<div class="list-item" style="flex-direction:column; align-items:flex-start; gap:5px;"><div style="width:100%; display:flex; justify-content:space-between; font-size:0.75rem; color:#ccc;"><span>👤 ${r.user} | 🕒 ${time}</span><span>${r.context}</span></div><div style="width:100%; font-size:0.9rem;">${r.message}</div><button class="btn-red" style="width:100%; padding:5px; font-size:0.7rem;" onclick="db.ref('feedback_reports/${key}').remove()">🗑️ SİL / ÇÖZÜLDÜ</button></div>`; list.innerHTML = html + list.innerHTML; }); } } }); } if (adminListenersActive) { renderAdminView(); return; } const userList = document.getElementById('adminUserList'); userList.innerHTML = "Veriler alınıyor..."; db.ref('users').on('value', usersSnap => { adminData.users = usersSnap.val() || {}; renderAdminView(); }); db.ref('presence').on('value', presenceSnap => { adminData.presence = presenceSnap.val() || {}; renderAdminView(); }); db.ref('banned').on('value', bannedSnap => { adminData.banned = bannedSnap.val() || {}; renderAdminView(); }); adminListenersActive = true; }
    function renderAdminView() {
        const list = document.getElementById('adminUserList');
        if (!list) return;
        list.innerHTML = "";

        let allUsersArray = Object.keys(adminData.users).map(key => { return { key: key, val: adminData.users[key] }; });
        const onlineUsers = allUsersArray.filter(u => adminData.presence[u.key] && adminData.presence[u.key].status === 'online');
        const offlineUsers = allUsersArray.filter(u => !adminData.presence[u.key] || adminData.presence[u.key].status !== 'online');

        document.getElementById('btnFilterOnline').innerText = `🟢 Online (${onlineUsers.length})`;
        document.getElementById('btnFilterOffline').innerText = `⚫ Offline (${offlineUsers.length})`;
        document.getElementById('btnFilterNew').innerText = `🆕 Yeni`;

        document.getElementById('btnFilterOnline').style.opacity = currentAdminTab === 'online' ? '1' : '0.5';
        document.getElementById('btnFilterOffline').style.opacity = currentAdminTab === 'offline' ? '1' : '0.5';
        document.getElementById('btnFilterNew').style.opacity = currentAdminTab === 'new' ? '1' : '0.5';

        let filtered = [];
        if (currentAdminTab === 'online') filtered = onlineUsers;
        else if (currentAdminTab === 'offline') filtered = offlineUsers.sort((a, b) => b.val.gold - a.val.gold);
        else if (currentAdminTab === 'new') filtered = [...allUsersArray].sort((a, b) => { const dateA = a.val.joinDate || 0; const dateB = b.val.joinDate || 0; return dateB - dateA; });

        if (filtered.length === 0) { list.innerHTML = "<small>Kullanıcı yok.</small>"; return; }

        document.getElementById('statOnline').innerText = onlineUsers.length;
        document.getElementById('totalUserCount').innerText = allUsersArray.length;

        filtered.forEach(u => {
            const userName = u.key;
            const userData = u.val;
            const isOnline = adminData.presence[userName] && adminData.presence[userName].status === 'online';
            const isBanned = adminData.banned[userName];
            let league = "Çaylak";
            if (userData.xp >= 2000) league = "Efsane";
            else if (userData.xp >= 500) league = "Usta";
            const mins = userData.totalMinutes || 0;
            const hours = (mins / 60).toFixed(1);
            const joinDate = userData.joinDate ? new Date(userData.joinDate).toLocaleDateString('tr-TR') : "-";
            const joinTime = userData.joinDate ? new Date(userData.joinDate).toLocaleTimeString('tr-TR', {hour: '2-digit', minute:'2-digit'}) : "";

            const item = document.createElement('div');
            item.className = "list-item";
            item.style.flexWrap = "wrap";
            item.innerHTML = `
                <div style="flex:1;">
                    ${isOnline ? '🟢' : '⚫'} <b>${userName}</b> <small>(${userData.gold}💰)</small><br>
                    <small style="color:#666;">📅 ${joinDate} ${joinTime} | 🏆 ${league} | ⏱️ ${hours} Saat</small>
                    ${isBanned ? '<span style="color:red;font-weight:bold;"> [YASAKLI]</span>' : ''}
                </div>
                <div style="display:flex; gap:5px; margin-top:5px;">
                    <button class="btn-green" style="padding:2px 5px;width:auto;font-size:0.7rem;" onclick="adminModifyGold('${userName}', 100)">+100</button>
                    <button class="btn-red" style="padding:2px 5px;width:auto;font-size:0.7rem;" onclick="adminModifyGold('${userName}', -100)">-100</button>
                    <button class="${isBanned ? 'btn-blue' : 'btn-dark'}" style="padding:2px 5px;width:auto;font-size:0.7rem;" onclick="adminToggleBan('${userName}', ${!isBanned})">${isBanned ? 'AÇ' : 'BAN'}</button>
                    <button class="btn-red" style="padding:2px 5px;width:auto;font-size:0.7rem; border:1px solid darkred;" onclick="adminDeleteUser('${userName}')">🗑️ SİL</button>
                </div>`;
            list.appendChild(item);
        });
    }
    function filterAdminUsers(mode) { currentAdminTab = mode; renderAdminView(); }
    function updateMarquee() { const input = document.getElementById('marqueeInput'); const text = input.value; if (!text) return showToast("Boş yazı gönderilemez!"); db.ref('system/marquee').set(text, (error) => { if (error) { showToast("Hata: " + error.message); } else { showToast("Kayan Yazı Güncellendi! 📢"); input.value = ""; } }); }
    function adminModifyGold(target, amount) { db.ref('users/' + target + '/gold').transaction(current => (current || 0) + amount).then(() => showToast(`${target}: ${amount > 0 ? '+' : ''}${amount} Altın`)); }
    function adminToggleBan(target, ban) { if (ban) db.ref('banned/' + target).set(true); else db.ref('banned/' + target).remove(); showToast(`${target} ${ban ? 'yasaklandı' : 'yasağı kalktı'}.`); loadAdminDashboard(); }
    function adminDeleteUser(target) {
        if (!confirm(`⚠️ DİKKAT! ${target} kullanıcısını SİLMEK üzeresin.\n\nBu işlem geri alınamaz! Emin misin?`)) return;

        const check = prompt(`Onaylamak için "${target}" yazın:`);
        if (check !== target) return showToast("İptal edildi (İsim eşleşmedi).");

        showToast("Siliniyor... ⏳");
        const updates = {};
        updates['users/' + target] = null;
        updates['presence/' + target] = null;
        updates['banned/' + target] = null;
        updates['invites/' + target] = null;

        db.ref().update(updates).then(() => {
            showToast(`✅ ${target} başarıyla silindi.`);
        }).catch(err => showToast("Hata: " + err.message));
    }
    function sendBroadcast() { const t = document.getElementById('broadcastInput').value; if (t) { db.ref('announcements').set({ text: t, time: Date.now() }); showToast("Duyuru Yapıldı"); document.getElementById('broadcastInput').value = ""; } }
    function submitFeedback() { const t = document.getElementById('feedbackInput').value; if (!t) return showToast("Boş bırakma!"); const ctx = game.mode === 'online' ? "Room: " + game.room : "Single Player"; db.ref('feedback_reports').push({ user: user.name, message: t, context: ctx, time: Date.now() }); showToast("Gönderildi! Teşekkürler."); document.getElementById('feedbackInput').value = ""; closeModal('modal-feedback'); }
    // GÜNCELLENMİŞ CREATE ROOM (AYRI HAKLAR)
    function createRoom() {
        if (user.gold < 50) return showToast("50 Altın Gerek");
        const c = Math.floor(10000 + Math.random() * 90000).toString();
        const d = parseInt(document.getElementById('createDiff').value);

        // Hak sayısını zorluğa göre belirle
        let startRights = 15;
        if (d === 5) startRights = 20;
        if (d === 6) startRights = 25;
        if (d === 7) startRights = 30;

        updateGold(-50);
        const secret = generateNumber(d);

        db.ref('rooms/' + c).set({
            secret: secret,
            p1: { name: user.name, avatar: user.avatar },
            config: {
                diff: d,
                type: document.getElementById('createMode').value,
                playStyle: document.getElementById('createPlayStyle').value,
                duration: parseInt(document.getElementById('createDuration').value)
            },
            status: "waiting",
            turn: "p1",

            // --- DEĞİŞİKLİK BURADA: Hakları ayırdık ---
            rights_p1: startRights,
            rights_p2: startRights,
            // ------------------------------------------

            startTime: Date.now(),
            round: 1
        });

        db.ref('rooms/' + c).onDisconnect().remove();
        game.room = c;
        game.role = "p1";
        game.diff = d;
        game.rights = startRights; // Yerel değişkeni eşitle
        game.type = document.getElementById('createMode').value;
        game.mode = "online";
        game.playStyle = document.getElementById('createPlayStyle').value;
        game.duration = parseInt(document.getElementById('createDuration').value);
        closeModal('modal-setup');
        changeScreen('screen-wait');
        document.getElementById('roomCodeDisplay').innerText = c;
        document.getElementById('roomModeInfo').innerText = `${d}H`;
        listenRoom(c);
    }
    function joinRoom(c) { c = c.toString().trim(); if (c.length < 5) return showToast("Kod Hatalı"); if (user.gold < 50) return showToast("50 Altın Gerek"); db.ref('rooms/' + c).once('value').then(s => { const r = s.val(); if (!r) return showToast("Oda Yok"); if (r.status !== "waiting") return showToast("Oda Dolu"); updateGold(-50); game.room = c; game.role = "p2"; game.diff = r.config.diff; game.type = r.config.type; game.mode = "online"; game.playStyle = r.config.playStyle; game.duration = r.config.duration; game.secret = r.secret; db.ref('rooms/' + c).update({ p2: { name: user.name, avatar: user.avatar }, status: "playing", startTime: Date.now() }); db.ref('rooms/' + c).onDisconnect().update({ winner: 'p1', endReason: 'abandoned' }); closeModal('modal-setup'); listenRoom(c); }); }
    function saveScore(s) { db.ref('users/' + user.name + '/totalScore').transaction(c => (c || 0) + s); db.ref('scores').push({ user: user.name, score: s, timestamp: Date.now() }); }
    function sendEmoji(emoji) { if (!game.room) return; showEmojiAnim(emoji, true); db.ref('rooms/' + game.room + '/emojis').push({ e: emoji, t: Date.now() }); }
    function showEmojiAnim(emoji, isSelf) { const el = document.createElement('div'); el.className = 'floating-emoji'; el.innerText = emoji; el.style.left = (20 + Math.random() * 60) + '%'; document.getElementById('emojiLayer').appendChild(el); setTimeout(() => el.remove(), 3000); }
    function openAvatarChange() {
        const list = document.getElementById('changeAvatarList');
        list.innerHTML = ""; // Listeyi temizle

        // Avatar Resim Kaynakları (Uzantılar .png olarak düzeltildi)
        const baseUrl = "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/";
        const avatars = [
            "Smilies/Smiling%20Face%20with%20Sunglasses.png",
            "People/Man%20Technologist.png",
            "People/Woman%20Technologist.png",
            "People/Ninja.png",
            "Animals/Lion.png",
            "Animals/Wolf.png",
            "Animals/Panda.png",
            "Animals/Cat%20Face.png",

            "Smilies/Robot.png",
            "Smilies/Alien%20Monster.png",
            "Smilies/Clown%20Face.png"
        ];

        avatars.forEach(path => {
            const fullUrl = baseUrl + path;
            const div = document.createElement('div');
            div.className = "avatar-item";

            // Eğer bu resim benim şu anki avatarımsa, yeşil çerçeve ekle (Seçili göster)
            if (user.avatar === fullUrl) {
                div.classList.add('selected');
            }

            // Resmi ekle
            div.innerHTML = `<img src="${fullUrl}" style="pointer-events:none;">`;

            // Tıklama Olayı
            div.onclick = () => {
                // Diğerlerinin seçimini kaldır
                list.querySelectorAll('.avatar-item').forEach(x => x.classList.remove('selected'));
                div.classList.add('selected');

                // Yeni avatarı kaydet
                user.avatar = fullUrl;
                saveUser();
                updateLobbyUI();

                // Profil açıksa oradaki avatarı da güncelle
                const pAvatar = document.getElementById('pAvatar');
                if (pAvatar && document.getElementById('modal-profile-v2').style.display === 'flex') {
                    if (fullUrl.includes('http')) {
                        pAvatar.innerHTML = `<img src="${fullUrl}">`;
                    } else {
                        pAvatar.innerText = fullUrl;
                    }
                }

                showToast("Avatar Güncellendi! 😎");
                setTimeout(() => closeModal('modal-avatar-change'), 300); // Hafif gecikmeli kapat
            };

            list.appendChild(div);
        });

        showModal('modal-avatar-change');
    }















    window.addEventListener('DOMContentLoaded', () => {
        // 1. Yükleme Ekranını Gizle (Doğru ID: 'loading')
        setTimeout(() => {
            const l = document.getElementById('loading');
            if (l) l.style.display = 'none';
        }, 1500);

        // 2. Arkaplan Animasyonu
        const fakeCount = document.getElementById('fakeOnlineCount');
        if (fakeCount) fakeCount.innerText = Math.floor(Math.random() * (99 - 15 + 1) + 15);

        const bgAnimContainer = document.getElementById('bgAnim');
        if (bgAnimContainer) {
            bgAnimContainer.innerHTML = "";
            for (let i = 0; i < 15; i++) {
                const span = document.createElement('span');
                span.className = 'float-num';
                span.innerText = Math.floor(Math.random() * 10);
                span.style.left = Math.random() * 100 + '%';
                span.style.fontSize = (Math.random() * 40 + 20) + 'px';
                span.style.animationDuration = (Math.random() * 10 + 10) + 's';
                span.style.animationDelay = Math.random() * 5 + 's';
                bgAnimContainer.appendChild(span);
            }
        }

        // 3. Firebase Başlatma (KRİTİK - BU EKSİKTİ)
        try {
            if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
            db = firebase.database();
        } catch (e) {
            const errLog = document.getElementById('errorLog');
            if (errLog) errLog.innerText = "Hata: " + e.message;
        }

        // 4. Otomatik Giriş Kontrolü
        const savedName = localStorage.getItem("yh_name");
        if (savedName) {
            completeLogin(savedName);
        } else {
            changeScreen('screen-login');
        }

        // 5. Buton Dinleyicilerini Kur
        setupListeners();

        // 6. Ses Motoru Hazırlığı ve MUTE KONTROLÜ

        // Kayıtlı ayarı çek
        const savedMute = localStorage.getItem("yh_muted");
        if (savedMute === "true") isMuted = true;
        updateMuteUI(); // Butonu güncelle

        document.body.addEventListener('click', () => AudioEngine.init(), { once: true });
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') updatePresence(true);
        });
    });
    function setupListeners() {
        // AVATAR SEÇİM DİNLEYİCİSİ (GÜNCELLENDİ)
        document.querySelectorAll('.avatar-item').forEach(av => {
            av.onclick = () => {
                // Görsel seçimi güncelle
                document.querySelectorAll('.avatar-item').forEach(x => x.classList.remove('selected'));
                av.classList.add('selected');

                // İçindeki resim linkini al, yoksa metni al
                const imgTag = av.querySelector('img');
                if (imgTag) {
                    user.avatar = imgTag.src;
                } else {
                    user.avatar = av.innerText;
                }
                AudioEngine.click();
            };
        });

        document.getElementById('btnLogin').onclick = attemptLogin;

        // Mobil klavye fix
        window.addEventListener('resize', () => {
            if (document.activeElement.tagName === 'INPUT') {
                setTimeout(() => document.activeElement.scrollIntoView({ block: 'center' }), 100);
            }
        });
    }
    function listenRoom(c) {
        // 1. ODA DURUMUNU DİNLE (Ana Döngü)
        db.ref('rooms/' + c).on('value', s => {
            const r = s.val();
            if (!r) return;

            // Bağlantı kopma kontrolü
            if (game.active && r.status === 'playing' && (!r.p1 || !r.p2)) {
                game.active = false;
                showModal('modal-disconnect');
                AudioEngine.success();
                return;
            }

            // --- HAK GÜNCELLEMESİ (CANLI - AYRIŞTIRILMIŞ) ---
            // Oyun oynanırken kendi hakkım değişirse ekrana yansıt
            if (game.active && game.type === 'classic') {
                // Hangi rolü oynuyorsam o anahtara bak (rights_p1 veya rights_p2)
                const myKey = 'rights_' + game.role;

                // Eğer veritabanında bu değer varsa güncelle
                if (r[myKey] !== undefined) {
                    game.rights = r[myKey];
                    document.getElementById('rightsDisplay').innerText = "Hak: " + game.rights;
                }
            }

            // --- OYUN BAŞLANGICI / YENİDEN BAŞLAMA ---
            if (r.status === "playing" && !game.active) {
                game.diff = r.config.diff; // Zorluğu güncelle
                game.usedItems = []; game.active = true;
                game.turn = r.turn;
                game.rights = r.rights;
                game.secret = r.secret;
                game.startTime = r.startTime;

                closeModal('modal-setup');
                changeScreen('screen-game');
                updateGameInterface('online');
                resetUI(); // Ekranı ve geçmişi temizle
                updateTurnUI(r.turn);

                if (game.type === 'classic') {
                    document.getElementById('rightsDisplay').style.display = 'block';
                    document.getElementById('rightsDisplay').innerText = "Hak: " + game.rights;
                    document.getElementById('timerDisplay').style.display = 'none';
                } else {
                    document.getElementById('rightsDisplay').style.display = 'none';
                    document.getElementById('timerDisplay').style.display = 'block';
                    startTimerLoop(); // Sayacı başlat
                }
                showToast("OYUN BAŞLADI!");

                // OTURUM KAYDET (ROTATION FIX)
                sessionStorage.setItem('yh_game_room', game.room);
                sessionStorage.setItem('yh_game_role', game.role);

                // P1 ise, bağlantı koparsa oyunu bitirme sorumluluğunu al
                if (game.role === 'p1') {
                    db.ref('rooms/' + c).onDisconnect().update({ winner: 'p2', endReason: 'abandoned' });
                }
            }

            // Sıra değişimi
            if (game.active && r.turn !== game.turn) {
                game.turn = r.turn;
                updateTurnUI(r.turn);
            }

            // --- OYUN SONU VE RÖVANŞ YÖNETİMİ (FİXED) ---
            if (r.winner) {
                // Eğer modal zaten açıksa tekrar çalıştırma
                const modalEnd = document.getElementById('modal-end');
                if (modalEnd.style.display !== 'flex') {
                    // Fonksiyon ismini düzelttik: endGameLocal
                    endGameLocal(r.winner, r.endReason);
                }
            }

            // --- SENKRONİZE RÖVANŞ MANTIĞI (V5 - CRASH FIX) ---
            // --- YENİ RÖVANŞ MANTIĞI (Handshake) ---
            if (r.winner && r.rematch) {
                const offer = r.rematch.offer;
                const response = r.rematch.response;

                // 1. Teklif Varsa
                if (offer) {
                    // Eğer teklif BANA değilse (yani ben alıcıysam)
                    if (offer.from !== game.role) {
                        const area = document.getElementById('incomingRematchArea');
                        const text = document.getElementById('incomingRematchText');
                        const endBtns = document.getElementById('endButtons');

                        // Yanıt vermediysem göster
                        if (!response) {
                            if (area.style.display === 'none') {
                                area.style.display = 'block';
                                endBtns.style.display = 'none'; // Butonları gizle

                                const styleText = offer.playStyle === 'timed' ? `Süreli (${offer.duration}dk)` : 'Haklı';
                                text.innerHTML = `<b>Rakip Rövanş İstiyor!</b><br>${offer.diff} Hane, ${styleText}`;
                                AudioEngine.notification();
                            }
                        }
                    } else {
                        // Ben gönderdim, beklemedeyim
                        const status = document.getElementById('rematchStatus');
                        if (status && !response) status.innerText = "Rakip bekleniyor...";
                    }
                }

                // 2. Yanıt Varsa
                if (response) {
                    if (response.accept) {
                        // KABUL EDİLDİ -> BAŞLAT
                        document.getElementById('rematchStatus').innerText = "Oyun Başlatılıyor...";

                        // Sadece Host (P1) oyunu resetler
                        if (game.role === 'p1') {
                            const newDiff = offer.diff || 4;
                            const newStyle = offer.playStyle || 'turn';
                            const newDur = offer.duration || 3;

                            // Hak Hesaplama
                            let newRights = 15;
                            if (newStyle === 'timed') newRights = 999;
                            else if (newDiff === 5) newRights = 20;
                            else if (newDiff === 6) newRights = 25;
                            else if (newDiff === 7) newRights = 30;

                            const newSecret = generateNumber(newDiff);

                            setTimeout(() => {
                                db.ref('rooms/' + c).update({
                                    winner: null,
                                    rematch: null,
                                    moves: null,
                                    status: 'playing',
                                    turn: 'p1',
                                    rights: newRights,
                                    secret: newSecret,
                                    startTime: Date.now(),
                                    config: { diff: newDiff, type: 'classic', playStyle: newStyle, duration: newDur }
                                });
                            }, 1000);
                        }
                    } else {
                        // REDDEDİLDİ
                        showToast("Rövanş teklifi reddedildi.");
                        document.getElementById('incomingRematchArea').style.display = 'none';
                        document.getElementById('endButtons').style.display = 'flex';
                        document.getElementById('rematchStatus').innerText = "Reddedildi.";

                        // Teklifi temizle (P1 yapar veya her ikisi)
                        if (game.role === 'p1') {
                            setTimeout(() => db.ref('rooms/' + c + '/rematch').remove(), 2000);
                        }
                    }
                }
            }
        });
        // 2. HAMLELERİ DİNLE
        db.ref('rooms/' + c + '/moves').off();
        db.ref('rooms/' + c + '/moves').on('child_added', s => {
            const m = s.val();
            addHistory(m.g, m.p, m.m, m.u);
        });

        // 3. SOHBETİ DİNLE (Eksikti, buraya ekliyoruz)
        db.ref('rooms/' + c + '/chat').off();
        db.ref('rooms/' + c + '/chat').limitToLast(50).on('child_added', s => {
            if (isChatBlocked) return;
            const m = s.val();
            const box = document.getElementById('gameChatBox');
            const isMe = (m.u === user.name);
            const msgClass = isMe ? 'msg-me' : 'msg-other';

            // Mesajı ekrana yaz
            box.innerHTML += `<div class="game-chat-msg ${msgClass}"><b>${m.u}</b><br>${m.m}</div>`;

            // --- BİLDİRİM SİSTEMİ ---
            const container = document.getElementById('gameChatContainer');
            const badge = document.getElementById('gameChatBadge');

            // Eğer mesaj benden değilse VE sohbet penceresi kapalıysa -> Kırmızı Noktayı Yak
            if (!isMe && container.style.display === 'none' && badge) {
                badge.style.display = 'inline-block';
                AudioEngine.notification(); // Sesli uyarı
            }

            // Eğer sohbet açıksa otomatik aşağı kaydır
            if (container.style.display !== 'none') {
                box.scrollTop = box.scrollHeight;
            }
        });

        // 4. EMOJİ VE EFEKTLER
        db.ref('rooms/' + c + '/emojis').off();
        db.ref('rooms/' + c + '/emojis').limitToLast(1).on('child_added', s => {
            const d = s.val();
            if (Date.now() - d.t < 3000) { showEmojiAnim(d.e, false); }
        });
        db.ref('rooms/' + c + '/active_effects').off();
        db.ref('rooms/' + c + '/active_effects').limitToLast(1).on('child_added', s => {
            const eff = s.val();
            if (eff.type === 'ink' && eff.sender !== user.name && (Date.now() - eff.time < 3000)) {
                triggerSabotageEffect();
            }
        });
    }
    window.addEventListener('popstate', e => { history.pushState(null, null, location.href); const m = document.querySelectorAll('.modal-overlay'); let c = false; m.forEach(x => { if (x.style.display === 'flex') { x.style.display = 'none'; c = true; } }); if (c) return; if (game.active || currentScreen === 'screen-wait' || currentScreen === 'screen-game') { attemptExit(); } else if (currentScreen === 'screen-admin') { changeScreen('screen-lobby'); } else { showModal('modal-exit-confirm'); } }); history.pushState(null, null, location.href);
    // --- YENİ KOLEKSİYON & SOHBET MANTIĞI ---








    // --- GÜNCELLENMİŞ PAKET ALMA FONKSİYONLARI ---



    // AŞAĞIDAKİ EKSİK FONKSİYON BAŞLIĞINI EKLE:


    // --- EKSİK OLAN ANİMASYON FONKSİYONU ---

    // --- KOLEKSİYON SOHBETİ ---
    let colChatListener = false;





    // --- TAKAS (TRADE) SİSTEMİ ---





    // 1. İlan Verme Ekranını Hazırla


    // 2. İlan Yayınla


    // 3. İlanları Listele


    // 4. İlan İptal (Kartı Geri Al)


    // 5. Takas Kabul Et



    /* --- GELİŞMİŞ PROFİL VE DM SİSTEMİ JS --- */

    let currentProfileUser = null; // Şu an kimin profiline bakıyoruz?

    function openUserProfile(targetUsername) {
        if (!targetUsername) return;
        currentProfileUser = targetUsername;

        // Modal'ı aç ve yükleniyor göster
        showModal('modal-profile-v2');
        document.getElementById('pName').innerText = targetUsername;

        // Görünümü Sıfırla (Düzenleme modu açıksa kapat)
        document.getElementById('pViewMode').style.display = 'block';
        document.getElementById('pEditMode').style.display = 'none';
        document.getElementById('pBioText').innerText = "Yükleniyor...";

        // Veritabanından Verileri Çek
        db.ref('users/' + targetUsername).once('value').then(snap => {
            const data = snap.val() || {};

            // 1. Temel Bilgiler (Resim Desteği Eklendi)
            const avatar = data.avatar || "😎";
            const avatarBox = document.getElementById('pAvatar');

            if (avatar.includes('http')) {
                // Link ise resim etiketi oluştur
                avatarBox.innerHTML = `<img src="${avatar}">`;
            } else {
                // Emoji ise düz yazı olarak bas
                avatarBox.innerText = avatar;
            }

            document.getElementById('pLevel').innerText = data.level || 1;
            document.getElementById('pGold').innerText = data.gold || 0;

            // 2. İstatistikler
            let totalWins = 0;
            if (data.quests) {
                Object.values(data.quests).forEach(q => { totalWins += (q.wins || 0); });
            }
            document.getElementById('pWins').innerText = totalWins;

            // 3. Rozetler
            let badges = "";
            if (data.gold >= 500000) badges += "👑 ";
            if (data.adsWatched >= 100) badges += "📺 ";
            if (data.level >= 10) badges += "⭐ ";
            if (ADMIN_NAMES.includes(targetUsername)) badges += "🛡️ YÖNETİCİ";
            document.getElementById('pBadges').innerText = badges;

            // 4. Biyografi ve Kişisel Bilgiler (YENİ KISIM)
            document.getElementById('pBioText').innerText = data.bio || "Henüz bir şey yazmamış...";
            document.getElementById('pCityDisplay').innerText = data.city || "-";
            document.getElementById('pJobDisplay').innerText = data.job || "-";
            document.getElementById('pHobbyDisplay').innerText = data.hobbies || "-";
            document.getElementById('pGenderDisplay').innerText = data.gender || "-";

            // Yaş Hesaplama
            if (data.birthYear) {
                const age = new Date().getFullYear() - parseInt(data.birthYear);
                document.getElementById('pAgeDisplay').innerText = age;
            } else {
                document.getElementById('pAgeDisplay').innerText = "-";
            }

            // 5. Kendi Profilim mi?
            const isMe = (user.name === targetUsername);
            document.getElementById('btnEditBio').style.display = isMe ? 'block' : 'none';
            document.getElementById('btnProfileDM').style.display = isMe ? 'none' : 'block';
            const btnDelete = document.getElementById('btnDeleteProfile');
            if (btnDelete) btnDelete.style.display = isMe ? 'block' : 'none';

            // Avatar Değiştirme Butonu
            const btnAvatar = document.getElementById('btnChangeAvatarProfile');
            if (btnAvatar) btnAvatar.style.display = isMe ? 'flex' : 'none';

            // Pet Bölümü Yönetimi
            const petSection = document.getElementById('profilePetSection');
            if (petSection) {
                petSection.style.display = isMe ? 'block' : 'none';
                // Her açılışta listeyi gizli başlat
                const pList = document.getElementById('profilePetListContainer');
                const pBtn = document.getElementById('btnTogglePetList');
                if (pList) pList.style.display = 'none';
                if (pBtn) pBtn.innerText = "GÖSTER ▼";
            }

            // Eğer kendimsem, inputları mevcut verilerle doldur
            if (isMe) {
                document.getElementById('pBioInput').value = data.bio || "";
                document.getElementById('pCityInput').value = data.city || "";
                document.getElementById('pJobInput').value = data.job || "";
                document.getElementById('pHobbyInput').value = data.hobbies || "";
                document.getElementById('pBirthInput').value = data.birthYear || "";
                document.getElementById('pGenderInput').value = data.gender || "";
            }
        });

        // 6. Online Durumu
        db.ref('presence/' + targetUsername).once('value').then(snap => {
            const pStatus = document.getElementById('pOnlineStatus');
            pStatus.className = (snap.exists() && snap.val().status === 'online')
                ? "profile-online-badge status-online"
                : "profile-online-badge status-offline";
        });
    }

    function toggleProfilePetList() {
        const list = document.getElementById('profilePetListContainer');
        const btn = document.getElementById('btnTogglePetList');
        if (list && list.style.display === 'none') {
            list.style.display = 'grid';
            if (btn) btn.innerText = "GİZLE ▲";
            if (typeof PetSystem !== 'undefined') {
                PetSystem.renderPetList();
            }
        } else {
            if (list) list.style.display = 'none';
            if (btn) btn.innerText = "GÖSTER ▼";
        }
    }

    function enableBioEdit() {
        // Görünüm modunu gizle, düzenleme modunu aç
        document.getElementById('pViewMode').style.display = 'none';
        document.getElementById('pEditMode').style.display = 'block';
        document.getElementById('btnEditBio').style.display = 'none';
    }

    function saveBio() {
        const newBio = document.getElementById('pBioInput').value.trim();
        const city = document.getElementById('pCityInput').value.trim();
        const job = document.getElementById('pJobInput').value.trim();
        const hobbies = document.getElementById('pHobbyInput').value.trim();
        const birthYear = document.getElementById('pBirthInput').value;
        const gender = document.getElementById('pGenderInput').value;

        if (newBio.length > 50) return showToast("Biyografi çok uzun!");

        // Firebase'e Tüm Bilgileri Kaydet
        db.ref('users/' + user.name).update({
            bio: newBio,
            city: city,
            job: job,
            hobbies: hobbies,
            birthYear: birthYear,
            gender: gender
        }).then(() => {
            showToast("Profil Güncellendi! ✅");
            // Sayfayı yenilemeden verileri güncellemek için profili tekrar yükle
            openUserProfile(user.name);
        });
    }

    // PROFİL SİLME (Kullanıcı kaydını tamamen kaldırır)
    function deleteMyProfile() {
        try {
            if (!user.name) return showToast("Önce giriş yapmalısın.");

            // Oda/oyun içindeyken temiz çıkış
            try {
                if (game && game.room) {
                    if (typeof leaveRoom === 'function') leaveRoom();
                }
            } catch (e) { }

            const ok = confirm("⚠️ DİKKAT! Profilin ve tüm ilerlemen kalıcı olarak silinecek.\n\nDevam etmek istiyor musun?");
            if (!ok) return;

            const typed = prompt("Onay için SIL yaz ve Tamam'a bas (büyük harf).\nBu işlem geri alınamaz!");
            if (typed !== "SIL") return showToast("İptal edildi.");

            const uname = user.name;

            // Listener'ları kapat (güvenli)
            try { db.ref('invites/' + uname).off(); } catch (e) { }
            try { db.ref('users/' + uname + '/last_msg').off(); } catch (e) { }
            try { db.ref('presence/' + uname).off(); } catch (e) { }

            showToast("Siliniyor... ⏳");

            const updates = {};
            // Ana profil + ilgili düğümler
            updates['users/' + uname] = null;
            updates['presence/' + uname] = null;
            updates['invites/' + uname] = null;

            // (Opsiyonel) Günlük/haftalık listelerde görünen kayıtlar (varsa)
            try { updates['daily_jackpot/' + getDayKey() + '/' + uname] = null; } catch (e) { }
            try { updates['weekly_rankings/' + getWeekKey() + '/' + uname] = null; } catch (e) { }

            db.ref().update(updates).then(() => {
                // Yerel kayıtları temizle
                try {
                    localStorage.removeItem('yh_name');
                    localStorage.removeItem('yh_ava');
                } catch (e) { }
                try {
                    sessionStorage.removeItem('yh_game_room');
                    sessionStorage.removeItem('yh_game_role');
                } catch (e) { }

                // RAM'deki user objesini sıfırla
                try {
                    user.name = "";
                    user.avatar = "😎";
                } catch (e) { }

                try { closeModal('modal-profile-v2'); } catch (e) { }

                alert("Profilin silindi. Giriş ekranına yönlendiriliyorsun.");
                location.reload();
            }).catch(err => {
                console.error("Profile delete failed:", err);
                showToast("Silme başarısız: " + (err && err.message ? err.message : err));
            });
        } catch (err) {
            console.error(err);
            showToast("Silme sırasında hata oluştu.");
        }
    }


    function openAvatarChangeFromProfile() {
        // Profili kapatmamıza gerek yok, üstüne açılır (z-index)
        if (typeof openAvatarChange === 'function') {
            openAvatarChange();
        } else {
            showToast("Hata: Avatar sistemi yüklenemedi.");
        }
    }

    // Profil Üzerinden Mesajlaşma Başlat
    function startDMFromProfile() {
        if (currentProfileUser) {
            closeModal('modal-profile-v2'); // Profili kapat
            openDM(currentProfileUser);     // Mevcut DM sistemini aç
        }
    }
    // --- EKSİK OLAN DM SİSTEMİ FONKSİYONLARI ---
    let activeDMPartner = null;

    // --- SİLME ÖZELLİKLİ DM FONKSİYONU ---
    function openDM(targetUser) {
        if (!targetUser || targetUser === user.name) return;
        activeDMPartner = targetUser;

        document.getElementById('dmTitle').innerText = "Mesajlaşma: " + targetUser;
        const msgBox = document.getElementById('dmMessages');
        msgBox.innerHTML = "Yükleniyor...";
        showModal('modal-dm');

        db.ref('chats/private').off();

        const chatID = [user.name, targetUser].sort().join('_');

        db.ref('chats/private/' + chatID).limitToLast(50).on('value', snap => {
            msgBox.innerHTML = "";

            if (!snap.exists()) {
                msgBox.innerHTML = "<small style='color:#999; display:block; text-align:center; margin-top:20px;'>Henüz mesaj yok. İlk merhaba diyen sen ol! 👋</small>";
                return;
            }

            snap.forEach(c => {
                const m = c.val();
                const msgKey = c.key; // Mesajın ID'si
                const isMe = m.from === user.name;

                const bubbleStyle = isMe
                    ? "background:#dcf8c6; color:#000; align-self:flex-end; border-radius:15px 15px 0 15px;"
                    : "background:#fff; color:#000; align-self:flex-start; border-radius:15px 15px 15px 0;";

                const alignStyle = isMe ? "justify-content:flex-end;" : "justify-content:flex-start;";

                // Sadece kendi mesajına silme butonu koy
                const deleteBtn = isMe ? `<span onclick="deleteDMMessage('${chatID}', '${msgKey}')" style="cursor:pointer; font-size:0.7rem; margin-left:5px; opacity:0.6;">🗑️</span>` : '';

                const html = `
                <div style="display:flex; ${alignStyle} margin-bottom:5px; align-items:center;">
                    <div style="${bubbleStyle} padding:8px 12px; max-width:80%; font-size:0.9rem; box-shadow:0 1px 2px rgba(0,0,0,0.1); display:flex; align-items:center;">
                        <span>${m.text}</span>
                        ${deleteBtn}
                    </div>
                </div>`;
                msgBox.innerHTML += html;
            });

            msgBox.scrollTop = msgBox.scrollHeight;
        });
    }
    function sendDM() {
        const input = document.getElementById('dmInput');
        const text = input.value.trim();

        // Kontroller
        if (!text) return;
        if (!activeDMPartner) return showToast("Bir hata oluştu, pencereyi kapatıp açın.");

        const chatID = [user.name, activeDMPartner].sort().join('_');

        // 1. Mesajı Sohbet Geçmişine Kaydet
        db.ref('chats/private/' + chatID).push({
            from: user.name,
            text: text,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });

        // 2. Karşı Tarafa BİLDİRİM GÖNDER (Kritik Nokta)
        // 'seen: false' olduğu için karşı tarafın Listener'ı tetiklenecek ve kırmızı nokta yanacak.
        db.ref('users/' + activeDMPartner + '/last_msg').set({
            from: user.name,
            text: text,
            seen: false, // <--- BU ÇOK ÖNEMLİ
            time: firebase.database.ServerValue.TIMESTAMP
        });

        input.value = "";

        // Sohbeti aşağı kaydır (Kendi ekranın için)
        setTimeout(() => {
            const box = document.getElementById('dmMessages');
            if (box) box.scrollTop = box.scrollHeight;
        }, 200);
    }
    // --- MESAJ SİLME FONKSİYONU ---
    function deleteDMMessage(chatID, msgKey) {
        if (confirm("Bu mesajı silmek istiyor musun?")) {
            db.ref('chats/private/' + chatID + '/' + msgKey).remove()
                .then(() => {
                    showToast("Mesaj silindi.");
                })
                .catch((err) => {
                    showToast("Hata: " + err.message);
                });
        }
    }
    // En son gelen mesajı açan fonksiyon
    function openLastMessage() {
        db.ref('users/' + user.name + '/last_msg').once('value').then(snap => {
            const data = snap.val();
            if (data && data.from) {
                // Mesajı "görüldü" olarak işaretle
                db.ref('users/' + user.name + '/last_msg/seen').set(true);

                // Butonu gizle
                document.getElementById('btnNewMsg').style.display = 'none';

                // O kişinin DM kutusunu aç
                openDM(data.from);
            } else {
                showToast("Okunmamış mesaj yok.");
                document.getElementById('btnNewMsg').style.display = 'none';
            }
        });
    }
    // --- GELEN KUTUSU (INBOX) SİSTEMİ ---

    // --- DÜZELTİLMİŞ GELEN KUTUSU (INBOX) FONKSİYONU ---
    // --- SİLME BUTONLU GELEN KUTUSU (INBOX) ---
    function openInboxModal() {
        showModal('modal-inbox');
        const list = document.getElementById('inboxList');
        list.innerHTML = "<div style='text-align:center;'>Sohbetler taranıyor...</div>";

        db.ref('users/' + user.name + '/last_msg').once('value').then(snap => {
            const lastMsg = snap.val();
            list.innerHTML = "";

            // 1. Son gelen mesaj varsa (En üstte göster)
            if (lastMsg && lastMsg.from) {
                const isUnread = !lastMsg.seen && lastMsg.from !== user.name;
                const badgeHtml = isUnread ? '<span style="color:red; font-weight:bold;">(1)</span>' : '';
                const bgColor = isUnread ? '#fff3cd' : '#fff';

                // Silme butonu eklendi (onclick event.stopPropagation önemli!)
                list.innerHTML += `
                <div class="list-item" style="background:${bgColor}; cursor:pointer;" onclick="closeModal('modal-inbox'); openDM('${lastMsg.from}')">
                    <div style="display:flex; align-items:center; gap:10px;">
                        <div style="font-size:1.5rem;">👤</div>
                        <div>
                            <div style="font-weight:bold;">${lastMsg.from} ${badgeHtml}</div>
                            <div style="font-size:0.7rem; color:#666;">Son mesaj...</div>
                        </div>
                    </div>
                    <div style="display:flex; gap:5px;">
                        <button class="btn-blue" style="width:auto; padding:5px;">AÇ</button>
                        <button class="btn-red" style="width:auto; padding:5px 8px;" onclick="event.stopPropagation(); deleteConversation('${lastMsg.from}')">🗑️</button>
                    </div>
                </div>`;
            }

            // 2. Diğer sohbet geçmişi
            db.ref('chats/private').once('value').then(chatSnap => {
                let hasChat = false;

                if (chatSnap.exists()) {
                    chatSnap.forEach(c => {
                        const key = c.key;
                        if (key.includes(user.name)) {
                            const parts = key.split('_');
                            const partner = parts[0] === user.name ? parts[1] : parts[0];

                            // Eğer zaten yukarıda (lastMsg) gösterdiysek tekrar ekleme
                            if (lastMsg && lastMsg.from === partner) return;

                            hasChat = true;

                            list.innerHTML += `
                            <div class="list-item" onclick="closeModal('modal-inbox'); openDM('${partner}')" style="cursor:pointer;">
                                <div style="display:flex; align-items:center; gap:10px;">
                                    <div style="font-size:1.5rem;">👤</div>
                                    <div>
                                        <div style="font-weight:bold;">${partner}</div>
                                        <div style="font-size:0.7rem; color:#666;">Geçmiş sohbet</div>
                                    </div>
                                </div>
                                <div style="display:flex; gap:5px;">
                                    <button class="btn-grey" style="width:auto; padding:5px;">AÇ</button>
                                    <button class="btn-red" style="width:auto; padding:5px 8px;" onclick="event.stopPropagation(); deleteConversation('${partner}')">🗑️</button>
                                </div>
                            </div>`;
                        }
                    });
                }

                if (!hasChat && (!lastMsg || !lastMsg.from)) {
                    list.innerHTML = "<div style='text-align:center; padding:20px; color:#999;'>Henüz sohbet yok.</div>";
                }
            });
        });
    }

    function openNewChatPrompt() {
        const target = prompt("Mesaj göndermek istediğin kullanıcının adı:");
        if (target && target.trim() !== "") {
            // Kullanıcı var mı kontrol et (Opsiyonel ama iyi olur)
            db.ref('users/' + target).once('value').then(s => {
                if (s.exists()) {
                    closeModal('modal-inbox');
                    openDM(target);
                } else {
                    showToast("Böyle bir kullanıcı bulunamadı!");
                }
            });
        }
    }
    function deleteConversation(partner) {
        if (!confirm(partner + " ile olan tüm sohbet geçmişini silmek istiyor musun?")) return;

        // Sohbet ID'sini bul
        const chatID = [user.name, partner].sort().join('_');

        // 1. Veritabanından sohbeti sil
        db.ref('chats/private/' + chatID).remove().then(() => {

            // 2. Eğer bu kişi 'son mesaj' (last_msg) kısmındaysa, orayı da temizle
            db.ref('users/' + user.name + '/last_msg').once('value', snap => {
                const data = snap.val();
                if (data && data.from === partner) {
                    db.ref('users/' + user.name + '/last_msg').remove();
                }
            });

            showToast("Sohbet silindi.");
            // Listeyi yenilemek için gelen kutusunu tekrar yükle
            openInboxModal();

        }).catch(err => {
            showToast("Hata: " + err.message);
        });
    }
    // --- ADMIN MESAJ TAKİP (SPY) SİSTEMİ ---

    function loadAdminSpy(type) {
        const list = document.getElementById('adminSpyList');
        list.innerHTML = "<div style='padding:10px; text-align:center;'>Veriler taranıyor...</div>";

        // 1. KOLEKSİYON (GLOBAL) SOHBETİ
        if (type === 'global') {
            db.ref('chats/collection_global').limitToLast(50).once('value').then(snap => {
                list.innerHTML = "";
                if (!snap.exists()) {
                    list.innerHTML = "<small style='padding:10px;'>Mesaj yok.</small>";
                    return;
                }

                // Mesajları ters çevirip göster (En yeni en üstte)
                let msgs = [];
                snap.forEach(c => msgs.push({ key: c.key, ...c.val() }));
                msgs.reverse();

                msgs.forEach(m => {
                    const date = new Date(m.t).toLocaleTimeString('tr-TR');
                    list.innerHTML += `
                    <div style="padding:8px; border-bottom:1px solid #eee; display:flex; justify-content:space-between; align-items:center;">
                        <div>
                            <b style="color:#2980b9;">${m.u}</b> <span style="font-size:0.7rem; color:#999;">(${date})</span><br>
                            <span style="color:#333;">${m.m}</span>
                        </div>
                        <button class="btn-red" style="width:auto; padding:2px 8px; font-size:0.7rem;" onclick="adminDeleteMsg('chats/collection_global/${m.key}', 'global')">🗑️</button>
                    </div>`;
                });
            });
        }

        // 2. ÖZEL MESAJLAR (DM)
        else if (type === 'private') {
            // Özel mesajlar "KullanıcıA_KullanıcıB" şeklinde tutulur. Önce sohbet başlıklarını listeleriz.
            db.ref('chats/private').limitToLast(50).once('value').then(snap => {
                list.innerHTML = "";
                if (!snap.exists()) {
                    list.innerHTML = "<small style='padding:10px;'>DM geçmişi yok.</small>";
                    return;
                }

                snap.forEach(c => {
                    const pair = c.key.replace('_', ' ↔️ '); // İsimleri ayır
                    list.innerHTML += `
                    <div style="padding:10px; border-bottom:1px solid #eee; display:flex; justify-content:space-between; align-items:center; background:#f9f9f9; margin-bottom:5px;">
                        <span style="font-weight:bold; color:#d35400;">${pair}</span>
                        <button class="btn-blue" style="width:auto; padding:4px 10px; font-size:0.75rem;" onclick="adminReadDM('${c.key}')">👀 OKU</button>
                    </div>`;
                });
            });
        }

        // 3. ODA SOHBETLERİ (Sadece Aktif Odalar)
        else if (type === 'rooms') {
            db.ref('rooms').once('value').then(snap => {
                list.innerHTML = "";
                let hasChat = false;

                snap.forEach(room => {
                    const rData = room.val();
                    // Eğer odada chat verisi varsa
                    if (rData.chat) {
                        hasChat = true;
                        // Odanın içindeki mesajları diziye çevir
                        const chatKeys = Object.keys(rData.chat);
                        const lastMsgKey = chatKeys[chatKeys.length - 1];
                        const lastMsg = rData.chat[lastMsgKey];

                        list.innerHTML += `
                        <div style="padding:8px; border-bottom:1px solid #eee; background:#f0f8ff; margin-bottom:5px;">
                            <div style="font-size:0.8rem; font-weight:bold; color:#2c3e50;">
                                Oda: ${room.key} (Son Mesaj)
                            </div>
                            <div style="font-size:0.85rem; margin-top:3px;">
                                <b>${lastMsg.u}:</b> ${lastMsg.m}
                            </div>
                            <button class="btn-purple" style="width:100%; margin-top:5px; padding:2px; font-size:0.7rem;" onclick="adminReadRoomChat('${room.key}')">TÜMÜNÜ GÖR</button>
                        </div>`;
                    }
                });

                if (!hasChat) list.innerHTML = "<small style='padding:10px;'>Aktif oda sohbeti yok.</small>";
            });
        }
    }

    // DM İÇERİĞİNİ GÖRÜNTÜLEME
    function adminReadDM(chatID) {
        const list = document.getElementById('adminSpyList');
        list.innerHTML = `<div style='padding:10px;'><button class="btn-grey" onclick="loadAdminSpy('private')">⬅ Geri Dön</button><h4 style="margin:5px 0;">Sohbet Detayı</h4></div>`;

        db.ref('chats/private/' + chatID).limitToLast(20).once('value').then(snap => {
            snap.forEach(c => {
                const m = c.val();
                list.innerHTML += `
                <div style="padding:5px 10px; border-bottom:1px solid #eee; font-size:0.85rem;">
                    <b>${m.from}:</b> ${m.text}
                    <button style="float:right; background:none; border:none; cursor:pointer;" onclick="adminDeleteMsg('chats/private/${chatID}/${c.key}', 'private', '${chatID}')">🗑️</button>
                </div>`;
            });
        });
    }

    // ODA SOHBETİNİ GÖRÜNTÜLEME
    function adminReadRoomChat(roomID) {
        const list = document.getElementById('adminSpyList');
        list.innerHTML = `<div style='padding:10px;'><button class="btn-grey" onclick="loadAdminSpy('rooms')">⬅ Geri Dön</button><h4 style="margin:5px 0;">Oda: ${roomID}</h4></div>`;

        db.ref('rooms/' + roomID + '/chat').limitToLast(20).once('value').then(snap => {
            snap.forEach(c => {
                const m = c.val();
                list.innerHTML += `
                <div style="padding:5px 10px; border-bottom:1px solid #eee; font-size:0.85rem;">
                    <b>${m.u}:</b> ${m.m}
                    <button style="float:right; background:none; border:none; cursor:pointer;" onclick="adminDeleteMsg('rooms/${roomID}/chat/${c.key}', 'rooms', '${roomID}')">🗑️</button>
                </div>`;
            });
        });
    }

    // MESAJ SİLME
    function adminDeleteMsg(path, returnType, extraID) {
        if (confirm("Bu mesaj kalıcı olarak silinsin mi?")) {
            db.ref(path).remove().then(() => {
                showToast("Mesaj silindi.");
                // Listeyi yenile
                if (returnType === 'global') loadAdminSpy('global');
                if (returnType === 'private') adminReadDM(extraID);
                if (returnType === 'rooms') adminReadRoomChat(extraID);
            });
        }
    }
    /* --- KARİYER (SAGA) SİSTEMİ - TAMİR EDİLMİŞ VERSİYON --- */



    // 1. SEVİYE AYARLARI
    const CAREER_LEVELS = {
        1: { diff: 3, rights: 15, times: [1, 3, 5], oracleLimit: 99, desc: "Başlangıç: 3 Hane", icon: "🌱", reward: 500 },
        2: { diff: 4, rights: 15, times: [1, 3, 5], oracleLimit: 99, desc: "Isınma: 4 Hane", icon: "🔥", reward: 1000 },
        3: { diff: 5, rights: 20, times: [3, 5, 6], oracleLimit: 1, desc: "Zorlu: 5 Hane (Kahin x1)", icon: "⚔️", reward: 1500 },
        4: { diff: 6, rights: 20, times: [5, 7, 8], oracleLimit: 1, desc: "Uzman: 6 Hane (Kahin x1)", icon: "🧠", reward: 2000 },
        5: { diff: 7, rights: 25, times: [10], oracleLimit: 1, desc: "FİNAL: 7 Hane (Kahin x1)", icon: "🏆", reward: 5000 }
    };

    let selectedCareerLvl = 1;

    // 2. HARİTAYI AÇAN FONKSİYON (10 GALİBİYET GÖSTERGELİ)
    function openCareerMap() {
        showModal('modal-career');
        const container = document.getElementById('careerMapContent');

        // Yükleniyor ekranı
        container.innerHTML = `<div style="text-align:center; padding:50px; color:#666;">Harita Yükleniyor...<br><small>Veriler alınıyor</small></div>`;
        container.className = "career-container";

        // Veritabanı okuması
        db.ref('users').once('value')
            .then(snapshot => {
                drawMapWithUsers(container, snapshot.val() || {});
            })
            .catch(error => {
                console.error("Harita verisi alınamadı:", error);
                drawMapWithUsers(container, {});
            });
    }

    function drawMapWithUsers(container, allUsers) {
        // Kullanıcıları seviyelerine göre grupla
        const levelsData = { 1: [], 2: [], 3: [], 4: [], 5: [] };

        if (allUsers) {
            Object.keys(allUsers).forEach(username => {
                const uData = allUsers[username];
                const lvl = uData.careerLevel || 1;
                if (levelsData[lvl]) {
                    levelsData[lvl].push(username);
                }
            });
        }

        container.innerHTML = `<div class="career-bg-decoration"></div>`;
        const currentLvl = user.careerLevel || 1;
        const currentWins = user.careerWins || 0; // Mevcut galibiyet sayısı

        for (let i = 1; i <= 5; i++) {
            const config = CAREER_LEVELS[i];
            let statusClass = "locked";
            let content = `<span style="font-size:1.5rem;">🔒</span>`;
            let clickAction = "";
            let progressBadge = ""; // İlerleme rozeti

            // DURUM BELİRLEME
            if (i < currentLvl) {
                statusClass = "completed";
                content = config.icon;
                clickAction = `openCareerLevelSetup(${i})`;
            } else if (i === currentLvl) {
                statusClass = "current";
                // Aktif seviyede Avatar ve İlerleme Durumu (Örn: 3/10)
                content = `<div style="width:40px; height:40px; border-radius:50%; overflow:hidden; border:2px solid white; box-shadow:0 2px 5px rgba(0,0,0,0.5);">
                        ${user.avatar.includes('http') ? `<img src="${user.avatar}" style="width:100%;">` : user.avatar}
                       </div>`;


                // Buraya ilerleme durumunu ekliyoruz
                progressBadge = `<div style="position:absolute; bottom:-12px; background:#fff; color:#d35400; font-size:0.65rem; padding:2px 8px; border-radius:10px; border:1px solid #e67e22; font-weight:bold; white-space:nowrap; box-shadow:0 2px 4px rgba(0,0,0,0.1);">${currentWins}/10</div>`;

                clickAction = `openCareerLevelSetup(${i})`;
            } else {
                content = `<span style="opacity:0.5; font-size:1.5rem;">${config.icon}</span>`;
            }

            // KONUMLANDIRMA (Zikzak)
            let positionStyle = "";
            let rivalsClass = "rivals-right";

            if (i === 2) { positionStyle = "transform: translateX(-60px);"; rivalsClass = "rivals-right"; }
            else if (i === 4) { positionStyle = "transform: translateX(60px);"; rivalsClass = "rivals-left"; }

            // YOL ÇİZGİSİ
            let pathSVG = "";
            if (i < 5) {
                const dashColor = (i < currentLvl) ? "#fff" : "rgba(0,0,0,0.2)";
                let pathD = "M 50 100 Q 50 50 50 0";
                let svgStyle = `position:absolute; bottom:50px; left:50%; transform:translateX(-50%); width:100px; height:100px; z-index:-1; pointer-events:none;`;

                if (i === 1) { pathD = "M 50 90 Q 50 50 20 10"; svgStyle += "transform: translateX(-80%) scaleX(1);"; }
                else if (i === 2) { pathD = "M 20 90 Q 50 50 50 10"; svgStyle += "transform: translateX(-20%) scaleX(1);"; }
                else if (i === 3) { pathD = "M 50 90 Q 50 50 80 10"; svgStyle += "transform: translateX(-20%) scaleX(1);"; }
                else if (i === 4) { pathD = "M 80 90 Q 50 50 50 10"; svgStyle += "transform: translateX(-80%) scaleX(1);"; }

                pathSVG = `<svg style="${svgStyle}" viewBox="0 0 100 100" fill="none"><path d="${pathD}" stroke="${dashColor}" stroke-width="6" stroke-dasharray="8 8" stroke-linecap="round" /></svg>`;
            }

            // RAKİP LİSTESİ
            let playersHTML = "";
            const playersHere = levelsData[i] || [];
            const filteredPlayers = playersHere.filter(p => p !== user.name);

            if (filteredPlayers.length > 0) {
                const showLimit = 3;
                const visibleNames = filteredPlayers.slice(0, showLimit).join('<br>');
                const remaining = filteredPlayers.length - showLimit;
                let extraText = remaining > 0 ? `<span style="color:#999;">+${remaining} kişi</span>` : "";

                playersHTML = `
            <div class="career-rivals ${rivalsClass}">
                <b>Buradakiler</b>
                ${visibleNames}
                ${extraText}
            </div>`;
            }

            // ÖDÜL SANDIĞI MANTIĞI
            const claimedRewards = user.claimedCareerRewards || {};
            const isClaimed = claimedRewards[i] === true;
            const canClaim = (i < currentLvl) || (i === currentLvl && currentWins >= 10);

            let chestHtml = "";
            if (config.reward) {
                let chestClass = "career-chest";
                if (isClaimed) chestClass += " claimed";
                else if (canClaim) chestClass += " claimable";

                chestHtml = `
                    <div class="${chestClass}" onclick="event.stopPropagation(); claimCareerReward(${i})">
                        🎁
                        <div class="chest-reward-badge">${config.reward} 💰</div>
                    </div>
                `;
            }

            const html = `
        <div class="career-step" style="${positionStyle}">
            ${pathSVG}
            <div class="career-node ${statusClass}" onclick="${clickAction}">
                ${content}
                ${progressBadge}
                <div class="career-label">${config.diff} Hane</div>
                ${chestHtml}
            </div>
            ${playersHTML}
        </div>`;

            container.innerHTML += html;
        }
    }

    // 3. SEVİYE DETAY PENCERESİ
    function openCareerLevelSetup(lvl) {
        selectedCareerLvl = lvl;
        const config = CAREER_LEVELS[lvl];

        showModal('careerLevelSetupModal');
        document.getElementById('careerLevelTitle').innerText = "SEVİYE " + lvl;
        document.getElementById('careerLevelDesc').innerText = config.desc;

        if (config.oracleLimit === 1) {
            document.getElementById('careerRestrictionText').innerText = "⚠️ DİKKAT: Kahin Sadece 1 Kez Kullanılabilir!";
        } else {
            document.getElementById('careerRestrictionText').innerText = "✅ Kısıtlama Yok";
        }

        const timeSelect = document.getElementById('careerTimeSelect');
        timeSelect.innerHTML = "";
        config.times.forEach(t => {
            const opt = document.createElement('option');
            opt.value = t;
            opt.innerText = t + " Dakika";
            timeSelect.appendChild(opt);
        });

        document.getElementById('careerModeSelect').value = "classic";
        toggleCareerTimeSelect();
    }

    // 4. MOD SEÇİMİ
    function toggleCareerTimeSelect() {
        const mode = document.getElementById('careerModeSelect').value;
        document.getElementById('careerTimeDiv').style.display = (mode === 'timed') ? 'block' : 'none';
    }

    // --- KARİYER ÖDÜL TOPLAMA ---
    function claimCareerReward(lvl) {
        if (!user || !user.name) return;

        const config = CAREER_LEVELS[lvl];
        if (!config || !config.reward) return;

        const currentLvl = user.careerLevel || 1;
        const currentWins = user.careerWins || 0;
        const claimedRewards = user.claimedCareerRewards || {};

        // 1. Zaten alınmış mı?
        if (claimedRewards[lvl]) {
            return showToast("Bu ödülü zaten aldın!");
        }

        // 2. Almaya hak kazanmış mı?
        const canClaim = (lvl < currentLvl) || (lvl === currentLvl && currentWins >= 10);
        if (!canClaim) {
            return showToast("Ödülü almak için bu seviyeyi tamamlamalısın!");
        }

        // 3. Ödülü Ver
        if (!confirm(`Tebrikler! ${config.reward} Altın ödülünü almak istiyor musun?`)) return;

        AdManager.showRewardedAd(() => {
            claimedRewards[lvl] = true;
            user.claimedCareerRewards = claimedRewards;

            // Veritabanını Güncelle
            db.ref('users/' + user.name).update({
                claimedCareerRewards: claimedRewards
            }).then(() => {
                updateGold(config.reward);
                showToast(`🎁 ${config.reward} Altın Hesabına Eklendi!`);
                AudioEngine.win();
                safeConfetti();

                // Haritayı Yenile
                openCareerMap();
            });
        });
    }

    // 5. OYUNU BAŞLATAN ANA FONKSİYON
    function launchCareerGame() {
        const lvl = selectedCareerLvl;
        const config = CAREER_LEVELS[lvl];
        const modeType = document.getElementById('careerModeSelect').value;

        game.active = true;
        game.mode = "career";
        game.careerLvlIdx = lvl;
        game.diff = config.diff;
        game.secret = generateNumber(game.diff);
        game.type = modeType;
        game.oracleUsedCount = 0;
        game.oracleMax = config.oracleLimit;
        game.currentMoves = [];
        game.startTime = Date.now();
        game.usedItems = [];

        if (modeType === 'classic') {
            game.rights = config.rights;
            document.getElementById('rightsDisplay').style.display = 'block';
            document.getElementById('rightsDisplay').innerText = "Hak: " + game.rights;
            document.getElementById('timerDisplay').style.display = 'none';
        } else {
            game.duration = parseInt(document.getElementById('careerTimeSelect').value);
            game.rights = 999;
            document.getElementById('rightsDisplay').style.display = 'none';
            document.getElementById('timerDisplay').style.display = 'block';
            startTimerLoop();
        }

        document.getElementById('p1Indicator').innerText = "Kariyer";
        document.getElementById('p2Indicator').innerText = "Hedef";
        resetUI();
        closeModal('careerLevelSetupModal');
        closeModal('modal-career');
        changeScreen('screen-game');
        updateTurnUI('p1');
        updateLobbyUI();
    }
    /* --- KARİYER SİSTEMİ SONU --- */
    // --- TÜM KULLANICILARIN KARİYERİNİ SIFIRLA (ADMİN) ---
    function adminResetAllCareer() {
        // 1. Güvenlik Onayı
        const onay = prompt("Tüm kullanıcıların kariyerini SIFIRLAMAK üzeresin.\nBu işlem geri alınamaz!\n\nOnaylamak için 'SIFIRLA' yaz:");
        if (onay !== "SIFIRLA") return showToast("İşlem iptal edildi.");

        showToast("Sıfırlama işlemi başladı... Lütfen bekleyin.");

        db.ref('users').once('value').then(snapshot => {
            if (!snapshot.exists()) {
                showToast("Veritabanında kullanıcı bulunamadı.");
                return;
            }

            const updates = {};
            let count = 0;

            snapshot.forEach(child => {
                const userKey = child.key;

                // Her kullanıcı için sıfırlama komutunu hazırlıyoruz
                updates['users/' + userKey + '/careerLevel'] = 1;
                updates['users/' + userKey + '/careerWins'] = 0;

                count++;
            });

            // Veritabanına tek seferde gönder
            db.ref().update(updates)
                .then(() => {
                    // BAŞARILI
                    showToast(`✅ İŞLEM TAMAM: ${count} Kullanıcı Sıfırlandı!`);
                    AudioEngine.success();

                    // 2. Kendi ekranını hemen güncelle (F5 atmaya gerek kalmasın)
                    user.careerLevel = 1;
                    user.careerWins = 0;

                    // 3. Tarayıcı hafızasını da temizle (Eski veri kalmasın)
                    localStorage.setItem("careerLevel", 1);

                    updateLobbyUI();
                })
                .catch(error => {
                    // HATA DURUMU              console.error("Sıfırlama Hatası:", error);
                    alert("Hata oluştu: " + error.message);
                });
        });
    }

    function adminResetWordCareer() {
        if (!confirm("⚠️ TÜM Kelime Kariyer ilerlemelerini SIFIRLAMAK üzeresin. Onaylıyor musun?")) return;

        showToast("Sıfırlanıyor...");
        db.ref('users').once('value').then(snap => {
            const updates = {};
            snap.forEach(c => {
                const k = c.key;
                updates['users/' + k + '/wordLevel'] = 1;
                updates['users/' + k + '/wordCareerWins'] = 0;
                updates['users/' + k + '/claimedWordRewards'] = null; // Clear rewards too
            });

            db.ref().update(updates).then(() => {
                showToast("✅ Kelime Kariyeri Sıfırlandı!");
                user.wordLevel = 1;
                user.wordCareerWins = 0;
                user.claimedWordRewards = {};
                updateLobbyUI();
            });
        });
    }



    // --- OYUN HAKKINDA METNİ YÖNETİMİ ---


    function loadAboutText() {
        // İstemci tarafı: Metni çek ve göster
        db.ref('settings/aboutText').once('value').then(snap => {
            const txt = snap.val();
            const container = document.getElementById('aboutContent');
            if (container) {
                container.innerHTML = txt || "Henüz bir açıklama metni girilmemiş.";
            }

            // Eğer Admin panelindeysek inputu da doldur
            const input = document.getElementById('adminAboutInput');
            if (input && input.offsetParent !== null) { // Görünürse
                input.value = txt || "";
            }
        });
    }

    // --- ANDROID UYGULAMA İÇİN EKRAN YÖNÜ KİLİTLEME ---
    window.addEventListener('load', () => {
        // 1. Mobil cihaz tespiti: Sadece mobilde dikey zorlamayı aktif et
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (isMobile) {
            document.body.classList.add('mobile-app');
        }

        // BEYAZ EKRAN ÇÖZÜMÜ: Yükleme bitince hidden sınıfını kaldır
        document.body.classList.remove('hidden');

        // 2. Ekran Kilitleme API'si (Varsa)
        try {
            if (screen.orientation && screen.orientation.lock) {
                screen.orientation.lock("portrait").catch(e => {
                    console.log("Orientation lock info: ", e);
                });
            }
        } catch (e) {
            console.log("Orientation lock error: ", e);
        }
    });

    // --- PET SYSTEM ENTRY (SAFE) ---
    // Some builds may not include the full Pet system. This prevents UI buttons from crashing the game.
    function openPetModalSafe() {
        // Redirect to Profile V2 (with user's own profile)
        if (!user || !user.name) {
            // Fallback if user not loaded
            if (typeof window.showModal === 'function' && document.getElementById('modal-pet')) {
                window.showModal('modal-pet');
            } else {
                alert('Profil yüklenemedi.');
            }
            return;
        }

        if (typeof openUserProfile === 'function') {
            openUserProfile(user.name);

            // Auto-expand pet section after a short delay to ensure modal is open
            setTimeout(() => {
                const petSection = document.getElementById('profilePetSection');
                const list = document.getElementById('profilePetListContainer');
                const btn = document.getElementById('btnTogglePetList');

                if (petSection) petSection.scrollIntoView({ behavior: 'smooth' });
                if (list && list.style.display === 'none') {
                    list.style.display = 'grid';
                    if (btn) btn.innerText = 'GİZLE ▲';
                    if (typeof PetSystem !== 'undefined') PetSystem.renderPetList();
                }
            }, 300);
        } else {
            // Fallback if function missing
            if (typeof window.showModal === 'function' && document.getElementById('modal-pet')) {
                window.showModal('modal-pet');
            }
        }
    }
    window.openPetModalSafe = openPetModalSafe;


    // --- LIFELINE & WIN STREAK IMPLEMENTATION ---
    function offerLifeline(type) {
        if (game.lifelineUsed) return;

        // Setup Modal
        const msg = document.getElementById('lifelineMsg');
        const title = document.getElementById('lifelineTitle');
        if (document.getElementById('lifelineEmoji')) document.getElementById('lifelineEmoji').innerText = "ğŸ¦„";
        if (title) title.innerText = "SON ÅANS!";

        if (type === 'time') {
            msg.innerText = "SÃ¼re bitti! Reklam izleyerek +30 saniye kazanmak ister misin?";
        } else {
            msg.innerText = "HaklarÄ±n bitti! Reklam izleyerek +4 hak kazanmak ister misin?";
        }

        window.currentLifelineAction = function () {
            // NativeAdManager might not be defined if ad system is missing, check it
            if (typeof AdManager !== 'undefined') {
                AdManager.showRewardedAd(() => {
                    game.lifelineUsed = true;
                    closeModal('modal-lifeline');
                    if (type === 'time') {
                        game.startTime += 30000;
                        startTimerLoop();
                        showToast("+30 Saniye Eklendi!");
                    } else {
                        game.rights += 4;
                        document.getElementById('rightsDisplay').innerText = "Hak: " + game.rights;
                        updateTurnUI('p1');
                        showToast("+4 Hak Eklendi!");
                    }
                });
            } else {
                // Mock for web testing if needed
                // alert("Reklam (Mock): +Ã–dÃ¼l verildi.");
                game.lifelineUsed = true;
                closeModal('modal-lifeline');
                if (type === 'time') { game.startTime += 30000; startTimerLoop(); }
                else { game.rights += 4; updateTurnUI('p1'); }
                showToast("Mock Ad Success");
            }
        };
        showModal('modal-lifeline');
    }

    function handleWinStreak() {
        user.winStreak = (user.winStreak || 0) + 1;
        // Save to DB
        if (user.name && typeof db !== 'undefined') {
            db.ref('users/' + user.name).update({ winStreak: user.winStreak });
        }

        // 3 consecutive wins check
        if (user.winStreak > 0 && user.winStreak % 3 === 0) {
            updateGold(1000);
            showToast("ğŸ”¥ 3 SERÄ° GALÄ°BÄ°YET: +1000 ALTIN KAZANDIN!");
            safeConfetti(); try { if (typeof AudioEngine !== 'undefined') AudioEngine.win(); } catch (e) { }
        }
    }

    function openBountyScreen() {
        changeScreen('screen-bounty');
        switchBountyTab('list');
        loadBounties();
    }

    function switchBountyTab(tab) {
        const listArea = document.getElementById('bountyListArea');
        const createArea = document.getElementById('bountyCreateArea');
        const btnList = document.getElementById('tabBountyList');
        const btnCreate = document.getElementById('tabBountyCreate');

        if (tab === 'list') {
            listArea.style.display = 'block';
            createArea.style.display = 'none';
            btnList.className = 'btn-blue';
            btnCreate.className = 'btn-grey';
            loadBounties();
        } else {
            listArea.style.display = 'none';
            createArea.style.display = 'block';
            btnList.className = 'btn-grey';
            btnCreate.className = 'btn-blue';
        }
    }

    function updateBountyInputRules(val) {
        const input = document.getElementById('bountySecretInput');
        input.maxLength = val;
        input.placeholder = val + " Rakam";
        input.value = "";
    }

    function postBounty() {
        const diff = parseInt(document.getElementById('bountyDiffSelect').value);
        const secret = document.getElementById('bountySecretInput').value.trim();
        const reward = parseInt(document.getElementById('bountyRewardInput').value);

        if (!secret.match(/^[0-9]+$/)) return showToast("Sadece rakam girmelisin!");
        if (secret.length !== diff) return showToast(`Sayı tam ${diff} haneli olmalı!`);
        if (new Set(secret).size !== diff) return showToast("Rakamlar birbirinden farklı olmalı!");

        let minReward = 100;
        if (diff === 5) minReward = 250;
        if (diff === 6) minReward = 500;
        if (diff === 7) minReward = 1000;

        if (!reward || reward < minReward) return showToast(`Bu zorluk için en az ${minReward} Altın koymalısın!`);
        if (user.gold < reward) return showToast("Yetersiz Altın!");

        if (!confirm(`${reward} Altın ödüllü ilan yayınlanacak. Onaylıyor musun?`)) return;

        updateGold(-reward);

        db.ref('bounties').push({
            owner: user.name,
            secret: secret,
            reward: reward,
            diff: diff,
            avatar: user.avatar,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        }, (error) => {
            if (!error) {
                showToast("İlan Başarıyla Yayınlandı! 🤠");
                document.getElementById('bountySecretInput').value = "";
                document.getElementById('bountyRewardInput').value = "";
                switchBountyTab('list');
                AudioEngine.success();
            } else {
                showToast("Hata oluştu: " + error.message);
                updateGold(reward);
            }
        });
    }

    function loadBounties() {
        const container = document.getElementById('bountyListContainer');
        container.innerHTML = "<div style='text-align:center; padding:20px;'>Veriler çekiliyor...</div>";

        db.ref('bounties').off();
        db.ref('bounties').on('value', snap => {
            container.innerHTML = "";
            if (!snap.exists()) {
                container.innerHTML = `
                <div style='padding:30px; text-align:center; opacity:0.7;'>
                    <div style='font-size:3rem;'>🌵</div>
                    <p>Henüz açık bir ilan yok.<br>İlk ilanı sen ver!</p>
                </div>`;
                return;
            }

            const bounties = [];
            snap.forEach(child => {
                bounties.push({ key: child.key, ...child.val() });
            });
            bounties.sort((a, b) => b.reward - a.reward);

            bounties.forEach(b => {
                const isMine = b.owner === user.name;
                const entryFee = Math.floor(b.reward * 0.1);
                const difficulty = b.diff || 4;
                let ownerAvatarContent = b.avatar || "👤";
                if (ownerAvatarContent.includes('http')) {
                    ownerAvatarContent = `<img src="${ownerAvatarContent}" style="width:100%; height:100%; object-fit:cover; border-radius:50%;">`;
                }
                let stars = "⭐".repeat(difficulty - 3);

                let actionBtn = "";
                if (isMine) {
                    actionBtn = `<button class="btn-red" style="width:auto; padding:8px 12px; font-size:0.75rem; border-radius:8px;" onclick="cancelBounty('${b.key}', ${b.reward})">İPTAL ET</button>`;
                } else {
                    actionBtn = `<button class="btn-green" style="width:auto; padding:8px 12px; font-size:0.8rem; border-radius:8px; box-shadow:0 4px 0 #218c74;" onclick="attemptBounty('${b.key}', '${b.owner}', '${b.secret}', ${b.reward}, ${difficulty})">AVLA (${entryFee}💰)</button>`;
                }

                const html = `
            <div class="card" style="margin:8px 0; padding:12px; display:flex; justify-content:space-between; align-items:center; border-left:5px solid #d35400; background:#fff;">
                <div style="display:flex; align-items:center; gap:10px;">
                    <div style="font-size:1.5rem; background:#eee; width:45px; height:45px; min-width:45px; display:flex; align-items:center; justify-content:center; border-radius:50%; overflow:hidden; border:2px solid #ddd;">
                        ${ownerAvatarContent}
                    </div>
                    <div>
                        <div style="font-weight:bold; color:#d35400; font-size:1rem;">🤠 ${b.reward} Altın</div>
                        <div style="font-size:0.75rem; color:#444; font-weight:bold;">${b.owner} <span style="color:#999; font-weight:normal;">arıyor...</span></div>
                        <div style="font-size:0.7rem; color:#666; margin-top:2px;">Zorluk: ${difficulty} Hane ${stars}</div>
                    </div>
                </div>
                <div style="text-align:right;">
                    ${actionBtn}
                </div>
            </div> `;
                container.innerHTML += html;
            });
        });
    }

    function cancelBounty(key, reward) {
        if (confirm("İlanı kaldırmak istiyor musun? Altının iade edilecek.")) {
            db.ref('bounties/' + key).remove();
            updateGold(reward);
            showToast("İlan kaldırıldı ve altın iade edildi.");
        }
    }

    function attemptBounty(key, owner, secret, reward, diff) {
        const entryFee = Math.floor(reward * 0.1);

        if (user.gold < entryFee) return showToast(`Giriş ücreti (${entryFee} Altın) için paran yetersiz!`);

        if (confirm(`${entryFee} Altın giriş ücreti ödeyip bu avı başlatmak istiyor musun?\n\nÖdül: ${reward} Altın\nZorluk: ${diff} Hane`)) {
            updateGold(-entryFee);

            game.active = true;
            game.mode = "bounty";
            game.bountyId = key;
            game.bountyOwner = owner;
            game.bountyPrize = reward;
            game.secret = secret.toString();
            game.diff = parseInt(diff);

            if (game.diff === 4) game.rights = 10;
            else if (game.diff === 5) game.rights = 15;
            else if (game.diff === 6) game.rights = 20;
            else game.rights = 25;

            game.startTime = Date.now();
            game.usedItems = [];

            resetUI();
            changeScreen('screen-game');

            document.getElementById('p1Indicator').innerText = "AVCI";
            document.getElementById('p2Indicator').innerText = "HEDEF";
            document.getElementById('p2Indicator').className = "turn-indicator turn-wait";

            document.getElementById('rightsDisplay').style.display = 'block';
            document.getElementById('rightsDisplay').innerText = "Hak: " + game.rights;
            document.getElementById('timerDisplay').style.display = 'none';

            updateTurnUI('p1');
            showToast("🤠 AV BAŞLADI! İYİ ŞANSLAR...");
            AudioEngine.notification();
        }
    }

    function closePiggyAndReplay() {
        const overlay = document.getElementById('piggyWinOverlay');
        if(overlay) {
            overlay.classList.remove('show');
            setTimeout(() => { overlay.style.display = 'none'; }, 500);
        }

        // 1. Word Game Check
        if (typeof currentScreen !== 'undefined' && currentScreen === 'screen-word-game') {
             if (typeof restartWordGame === 'function') restartWordGame();
             return;
        }

        // 2. Safe Mode Check
        const mode = (typeof game !== 'undefined' && game.mode) ? game.mode : '';

        if (mode === 'single') {
            if (typeof startSingle === 'function') startSingle();
            return;
        }
        if (mode === 'bounty') {
            if (typeof openBountyScreen === 'function') openBountyScreen();
            return;
        }
        if (mode === 'career') {
            if (typeof openCareerMap === 'function') openCareerMap();
            return;
        }

        // 3. Online Modes
        if (mode === 'online' || mode === 'online_word') {
             if (typeof requestRematch === 'function') requestRematch();
             else changeScreen('screen-lobby');
             return;
        }

        // 4. FALLBACKS (If mode is lost)
        if (typeof game !== 'undefined' && game.room) {
             if (typeof requestRematch === 'function') requestRematch();
             else changeScreen('screen-lobby');
             return;
        }

        if (typeof game !== 'undefined' && game.careerLvlIdx !== undefined) {
            if (typeof openCareerMap === 'function') openCareerMap();
            return;
        }

        if (typeof game !== 'undefined' && game.bountyId) {
            if (typeof attemptBounty === 'function' && game.bountyOwner && game.secret && game.bountyPrize) {
                attemptBounty(game.bountyId, game.bountyOwner, game.secret, game.bountyPrize, game.diff);
            } else if (typeof openBountyScreen === 'function') {
                openBountyScreen();
            }
            return;
        }

        // Default to Single Player if we are on the game screen
        if (typeof currentScreen !== 'undefined' && currentScreen === 'screen-game') {
            if (typeof startSingle === 'function') startSingle();
            return;
        }

        // Last resort
        if (typeof changeScreen === 'function') changeScreen('screen-lobby');
    }

    function closePiggyAndExit() {
        const overlay = document.getElementById('piggyWinOverlay');
        if(overlay) {
            overlay.classList.remove('show');
            setTimeout(() => { overlay.style.display = 'none'; }, 500);
        }
        changeScreen('screen-lobby');
    }

    function playCpuTurn() {
        if (!game.active) return;

        const diff = game.diff;
        const history = game.aiHistory || [];

        // AI Guess
        const guess = CpuAI.getGuess(diff, history);

        // Score against Player Secret
        const score = getScore(game.playerSecret, guess);

        // Add to history (UI)
        // Add to history list manually or use addHistory?
        // addHistory uses 'his-me' / 'his-other' based on logic.
        // I need to update addHistory to handle AI?
        // Or just force it.

        // Let's create a custom list item for AI to ensure it's on the left.
        const li = document.createElement('li');
        li.className = "his-other"; // AI is "other"
        li.innerHTML = `<span class="his-badge">${guess}</span>
        <div class="his-score">
            <span style="color:#2ed573">+${score.p}</span>
            <span style="color:#ff4757">-${score.m}</span>
        </div>`;
        document.getElementById('history').prepend(li);

        // Save to AI history for next turn logic
        game.aiHistory.push({ g: guess, p: score.p, m: score.m });

        // Check Win
        if (score.p === diff) {
            game.active = false;
            stopTimer();
            showToast("💻 Bilgisayar Kazandı! Sayısı: " + game.secret);
            endGameLocal('lose', 0); // Player lost
        } else {
            // Turn back to Player
            document.getElementById('btnGuess').disabled = false;
            document.getElementById('p1Indicator').className = "turn-indicator turn-active";
            document.getElementById('p2Indicator').className = "turn-indicator turn-wait";
            document.getElementById('guessInput').focus();
        }
    }

    // --- KELİME OYUNU MANTIĞI ---
    function startWordGame() {
        // Load user level
        const lvl = user.wordLevel || 1;
        const config = WORD_DATA[lvl] || WORD_DATA[Object.keys(WORD_DATA).length]; // Fallback to max

        // Pick random word
        const pool = config.words;
        const secret = pool[Math.floor(Math.random() * pool.length)];

        wordGameState = {
            active: true,
            secret: secret,
            length: config.length,
            guesses: [],
            maxGuesses: 6,
            currentGuess: "",
            level: lvl
        };

        changeScreen('screen-word-game');
        renderWordBoard();
        updateWordKeyboard();

        document.getElementById('wordLevelDisplay').innerText = `Seviye ${lvl} - ${config.length} Harf`;
    }

    function handleWordKey(key) {
        if (!wordGameState.active) return;

        if (key === 'ENTER') {
            submitWordGuess();
        } else if (key === 'DEL') {
            wordGameState.currentGuess = wordGameState.currentGuess.slice(0, -1);
            renderWordBoard();
        } else {
            if (wordGameState.currentGuess.length < wordGameState.length) {
                wordGameState.currentGuess += key;
                renderWordBoard();
                AudioEngine.click();
            }
        }
    }

    function submitWordGuess() {
        const guess = wordGameState.currentGuess;
        if (guess.length !== wordGameState.length) {
            return showToast(`Eksik harf! Kelime ${wordGameState.length} harfli olmalı.`);
        }

        wordGameState.guesses.push(guess);
        wordGameState.currentGuess = "";

        renderWordBoard();
        updateWordKeyboard();
        AudioEngine.notification();

        // Check Win
        if (guess === wordGameState.secret) {
            wordGameState.active = false;
            setTimeout(() => {
                handleWordGameWin();
            }, 500);
        } else if (wordGameState.guesses.length >= wordGameState.maxGuesses) {
            wordGameState.active = false;
            AudioEngine.error();
            setTimeout(() => {
                document.getElementById('endButtons').style.display = 'flex';
                document.getElementById('endTitle').innerText = 'KAYBETTİN';
                document.getElementById('endTitle').style.color = "#e74c3c";
                document.getElementById('endMsg').innerText = "Kelime: " + wordGameState.secret;
                showModal('modal-end');
                checkWordGameAd();
            }, 500);
        }

        // PvC & Online Logic (Preserved)
        if (wordGameState.mode === 'pvc' && wordGameState.active) {
            setTimeout(() => {
                if(!wordGameState.active) return;
                const lvl = wordGameState.level;
                const data = WORD_DATA[lvl] || WORD_DATA[1];
                const pool = data.words;
                const aiGuess = pool[Math.floor(Math.random() * pool.length)];

                wordGameState.aiGuesses.push(aiGuess);

                if (aiGuess === wordGameState.secret) {
                    wordGameState.active = false;
                    AudioEngine.error();
                    showToast("💻 Bilgisayar Kelimeyi Buldu: " + wordGameState.secret);
                    setTimeout(() => {
                        document.getElementById('endButtons').style.display = 'flex';
                        document.getElementById('endTitle').innerText = 'KAYBETTİN';
                        document.getElementById('endTitle').style.color = "#e74c3c";
                        document.getElementById('endMsg').innerText = "Kelime: " + wordGameState.secret;
                        showModal('modal-end');
                        checkWordGameAd();
                    }, 1000);
                } else {
                    showToast(`🤖 Bilgisayar Tahmini: ${aiGuess}`);
                }
            }, 1500);
        }
    }

    function renderWordHintBar() {
        const hintBar = document.getElementById('wordHintBar');
        if (!hintBar) return;

        hintBar.innerHTML = "";

        // Find confirmed green letters across all guesses
        const knownLetters = new Array(wordGameState.length).fill('');

        wordGameState.guesses.forEach(guess => {
            for (let i = 0; i < wordGameState.length; i++) {
                if (guess[i] === wordGameState.secret[i]) {
                    knownLetters[i] = guess[i];
                }
            }
        });

        for (let i = 0; i < wordGameState.length; i++) {
            const char = knownLetters[i];
            const cell = document.createElement('div');
            // Give them a style similar to keyboard keys or small word cells
            cell.style.cssText = "width:35px; height:35px; display:flex; align-items:center; justify-content:center; font-weight:bold; border-radius:8px; font-size:1.1rem; box-shadow: 0 2px 4px rgba(0,0,0,0.2);";

            if (char) {
                cell.innerText = char;
                cell.style.background = "linear-gradient(180deg, #27ae60 0%, #1e8449 50%, #145a32 100%)";
                cell.style.color = "#fff";
                cell.style.border = "1px solid #0b3d1f";
            } else {
                cell.innerText = "";
                cell.style.background = "rgba(0,0,0,0.1)";
                cell.style.border = "1px dashed rgba(0,0,0,0.2)";
            }
            hintBar.appendChild(cell);
        }
    }

    function renderWordBoard() {
        const board = document.getElementById('wordGameBoard');
        board.innerHTML = "";
        board.style.gridTemplateColumns = `repeat(${wordGameState.length}, 1fr)`;

        renderWordHintBar();

        // Render past guesses
        wordGameState.guesses.forEach(guess => {
            for (let i = 0; i < guess.length; i++) {
                const letter = guess[i];
                const secret = wordGameState.secret;
                let status = 'absent'; // grey

                if (letter === secret[i]) status = 'correct'; // green
                else if (secret.includes(letter)) status = 'present'; // yellow

                const cell = document.createElement('div');
                cell.className = `word-cell ${status}`;
                cell.innerText = letter;
                board.appendChild(cell);
            }
        });

        // Render current guess (active row)
        if (wordGameState.active) {
            const current = wordGameState.currentGuess.padEnd(wordGameState.length, ' ');
            for (let i = 0; i < current.length; i++) {
                const letter = current[i];
                const cell = document.createElement('div');
                cell.className = "word-cell active";
                if(letter !== ' ') cell.classList.add('filled');
                cell.innerText = letter;
                board.appendChild(cell);
            }

            // Render empty rows
            const remaining = 0; // Hiding future rows per user request
            for (let r = 0; r < remaining; r++) {
                for (let c = 0; c < wordGameState.length; c++) {
                    const cell = document.createElement('div');
                    cell.className = "word-cell empty";
                    board.appendChild(cell);
                }


           }
        }

        setTimeout(() => { const c = document.getElementById('wordGameBoardContainer'); if(c) c.scrollTop = c.scrollHeight; }, 50);
    }

    function updateWordKeyboard() {
        // Update keyboard colors based on guesses
        // Map: Letter -> Status (priority: correct > present > absent)

        const statusMap = {};

        wordGameState.guesses.forEach(guess => {
            for (let i = 0; i < guess.length; i++) {
                const letter = guess[i];
                const secret = wordGameState.secret;
                let status = 'absent';
                if (letter === secret[i]) status = 'correct';
                else if (secret.includes(letter)) status = 'present';

                // Update map if status is higher priority
                const current = statusMap[letter];
                if (!current) statusMap[letter] = status;
                else if (current === 'absent' && (status === 'present' || status === 'correct')) statusMap[letter] = status;
                else if (current === 'present' && status === 'correct') statusMap[letter] = status;
            }
        });

        // Apply to DOM
        document.querySelectorAll('.key-btn').forEach(btn => {
            const key = btn.getAttribute('data-key');
            btn.classList.remove('correct', 'present', 'absent');
            if (statusMap[key]) {
                btn.classList.remove('correct', 'present', 'absent');
                btn.classList.add(statusMap[key]);
            }
        });
    }

    function safeOpenWordSetup() {
        showModal('modal-word-setup');
    }

    function openGameSelector() {
        showModal('modal-game-selector');
    }

    function joinWordRoom(c) {
        c = c.toString().trim();
        db.ref('rooms/' + c).once('value').then(s => {
            const r = s.val();
            if (!r || r.type !== 'word') return showToast("Oda Yok/Hatalı");
            if (r.status !== "waiting") return showToast("Dolu");

            updateGold(-50);
            game.room = c;
            game.role = "p2";

            db.ref('rooms/' + c).update({
                p2: { name: user.name, avatar: user.avatar },
                status: "playing",
                startTime: Date.now()
            });

            closeModal('modal-word-setup');
            listenWordRoom(c);
        });
    }


    function openWordCareer() {
        showModal('modal-word-career');
        const container = document.getElementById('wordCareerContent');
        container.innerHTML = `<div style="text-align:center; padding:50px; color:#666;">Harita Yükleniyor...<br><small>Veriler alınıyor</small></div>`;
        container.className = "career-container"; // Reuse styles

        db.ref('users').once('value')
            .then(snapshot => {
                drawWordMapWithUsers(container, snapshot.val() || {});
            })
            .catch(error => {
                console.error("Kelime Harita Hatası:", error);
                drawWordMapWithUsers(container, {});
            });
    }



    let wordTimerInt = null;
    function startWordTimer(minutes) {
        stopWordTimer();
        const display = document.getElementById('wordTimerDisplay');
        display.style.display = 'block';

        const duration = minutes * 60;
        const end = Date.now() + duration * 1000;

        wordTimerInt = setInterval(() => {
            if (!wordGameState.active) { stopWordTimer(); return; }

            const left = end - Date.now();
            if (left <= 0) {
                stopWordTimer();
                display.innerText = "00:00";
                wordGameState.active = false;
                AudioEngine.error();
                alert("SÜRE BİTTİ! ⌛\nKelime: " + wordGameState.secret);
                changeScreen('screen-lobby');
                return;
            }

            const m = Math.floor(left / 60000);
            const s = Math.floor((left % 60000) / 1000);
            display.innerText = `${m}:${s < 10 ? '0'+s : s}`;
        }, 1000);
    }

    function stopWordTimer() {
        if (wordTimerInt) clearInterval(wordTimerInt);
    }

function restartWordGame() {
        const diff = wordGameState.length;
        const isPvC = (wordGameState.mode === 'pvc');
        const prevMode = wordGameState.mode;
        const prevTimeLimit = wordGameState.timeLimit;
        const prevMaxGuesses = wordGameState.maxGuesses;

        const lvl = diff - 2;
        const data = WORD_DATA[lvl] || WORD_DATA[1];
        const pool = data.words;
        const secret = pool[Math.floor(Math.random() * pool.length)];

        wordGameState = {
            active: true,
            mode: prevMode,
            secret: secret,
            length: diff,
            guesses: [],
            maxGuesses: prevMaxGuesses || 6,
            currentGuess: "",
            level: lvl,
            startTime: Date.now(),
            timeLimit: prevTimeLimit
        };

        if(isPvC) wordGameState.aiGuesses = [];

        renderWordBoard();
        updateWordKeyboard();

        if (prevTimeLimit > 0) {
            startWordTimer(prevTimeLimit);
        }

        closeModal('modal-end'); // Just in case
    }

    function drawWordMapWithUsers(container, allUsers) {
        // Group users by wordLevel
        const levelsData = {};
        for(let i=1; i<=8; i++) levelsData[i] = [];

        if (allUsers) {
            Object.keys(allUsers).forEach(username => {
                const uData = allUsers[username];
                const lvl = uData.wordLevel || 1;
                if (levelsData[lvl]) levelsData[lvl].push(username);
            });
        }

        container.innerHTML = `<div class="career-bg-decoration"></div>`;
        const currentLvl = user.wordLevel || 1;
        // Need to track word wins for current level?
        // User asked: "her 10 oyunda bir seviye atlansın".
        // I need to track `user.wordCareerWins`.
        // Assuming I'll add this property.

        const currentWins = user.wordCareerWins || 0;

        for (let i = 1; i <= 8; i++) {
            const config = WORD_CAREER_LEVELS[i];
            let statusClass = "locked";
            let content = `<span style="font-size:1.5rem;">🔒</span>`;
            let clickAction = "";
            let progressBadge = "";

            if (i < currentLvl) {
                statusClass = "completed";
                content = config.icon;
                clickAction = `startWordCareerLevel(${i})`; // Can replay? Yes.
            } else if (i === currentLvl) {
                statusClass = "current";
                content = `<div style="width:40px; height:40px; border-radius:50%; overflow:hidden; border:2px solid white; box-shadow:0 2px 5px rgba(0,0,0,0.5);">
                        ${user.avatar.includes('http') ? `<img src="${user.avatar}" style="width:100%;">` : user.avatar}
                       </div>`;
                progressBadge = `<div style="position:absolute; bottom:-12px; background:#fff; color:#8e44ad; font-size:0.65rem; padding:2px 8px; border-radius:10px; border:1px solid #9b59b6; font-weight:bold; white-space:nowrap; box-shadow:0 2px 4px rgba(0,0,0,0.1);">${currentWins}/10</div>`;
                clickAction = `startWordCareerLevel(${i})`;
            } else {
                content = `<span style="opacity:0.5; font-size:1.5rem;">${config.icon}</span>`;
            }

            // Zigzag logic
            let positionStyle = "";
            let rivalsClass = "rivals-right";
            // Simple alternating for 8 levels
            if (i % 2 === 0) { positionStyle = "transform: translateX(-50px);"; rivalsClass = "rivals-right"; }
            else { positionStyle = "transform: translateX(50px);"; rivalsClass = "rivals-left"; }

            // Path SVG
            let pathSVG = "";
            if (i < 8) {
                const dashColor = (i < currentLvl) ? "#fff" : "rgba(0,0,0,0.2)";
                // Dynamic path based on zigzag
                // Start (50, 100) -> End (50, 0) relative? No, container stacking.
                // Just use the same style as Number Career but adapted?
                // Number Career hardcoded paths for 5 levels.
                // For 8 levels, generic S-curve might be better or just simple lines.
                // Let's use simple vertical dashed line if zigzag is complex to SVG.
                // Or reuse the logic:
                // i -> i+1.
                // Left -> Right, Right -> Left.

                // Simplified Path:
                let pathD = "M 50 100 L 50 0"; // Straight line if centered
                // Since I use translateX on parent div, relative SVG drawing is tricky.
                // Let's just use the vertical line for now to ensure stability,
                // or rely on the CSS connecting them visually (margin-bottom).
                // The Number Career SVG logic was specific to 5 items.

                // Let's create a simple SVG line connecting nodes.
                // Since nodes are centered but offset, a straight line in the center of the viewport (ignoring offset)
                // works if we draw it in the background of the container? No.

                // Let's omit complex SVG paths for this iteration to ensure no layout break,
                // or use a simple vertical dotted line.

                pathSVG = `<div style="position:absolute; bottom:-50px; left:50%; width:2px; height:50px; background:repeating-linear-gradient(to bottom, ${dashColor} 0, ${dashColor} 5px, transparent 5px, transparent 10px); z-index:-1;"></div>`;
            }

            // Rivals
            let playersHTML = "";
            const playersHere = levelsData[i] || [];
            const filteredPlayers = playersHere.filter(p => p !== user.name);
            if (filteredPlayers.length > 0) {
                const showLimit = 3;
                const visibleNames = filteredPlayers.slice(0, showLimit).join('<br>');
                const remaining = filteredPlayers.length - showLimit;
                let extraText = remaining > 0 ? `<span style="color:#999;">+${remaining} kişi</span>` : "";
                playersHTML = `<div class="career-rivals ${rivalsClass}"><b>Buradakiler</b>${visibleNames}${extraText}</div>`;
            }

            // Reward Chest
            const claimedRewards = user.claimedWordRewards || {};
            const isClaimed = claimedRewards[i] === true;
            const canClaim = (i < currentLvl) || (i === currentLvl && currentWins >= 10);

            let chestHtml = "";
            if (config.reward) {
                let chestClass = "career-chest";
                if (isClaimed) chestClass += " claimed";
                else if (canClaim) chestClass += " claimable";
                chestHtml = `
                    <div class="${chestClass}" onclick="event.stopPropagation(); claimWordCareerReward(${i})">
                        🎁
                        <div class="chest-reward-badge">${config.reward} 💰</div>
                    </div>`;
            }

            const html = `
            <div class="career-step" style="${positionStyle}; margin-bottom: 60px;">
                ${pathSVG}
                <div class="career-node ${statusClass}" onclick="${clickAction}" style="border-bottom-color:#8e44ad; background:${statusClass==='current'?'linear-gradient(135deg, #9b59b6, #8e44ad)': (statusClass==='completed'?'#2ecc71':'#bdc3c7')};">
                    ${content}
                    ${progressBadge}
                    <div class="career-label" style="background:#8e44ad;">${config.length} Harf</div>
                    ${chestHtml}
                </div>
                ${playersHTML}
            </div>`;

            container.innerHTML += html;
        }
    }

    function claimWordCareerReward(lvl) {
        if (!user || !user.name) return;
        const config = WORD_CAREER_LEVELS[lvl];
        if (!config) return;

        const currentLvl = user.wordLevel || 1;
        const currentWins = user.wordCareerWins || 0;
        const claimedRewards = user.claimedWordRewards || {};

        if (claimedRewards[lvl]) return showToast("Bu ödülü zaten aldın!");
        const canClaim = (lvl < currentLvl) || (lvl === currentLvl && currentWins >= 10);
        if (!canClaim) return showToast("Ödülü almak için bu seviyeyi tamamlamalısın!");

        if (!confirm(`Tebrikler! ${config.reward} Altın ödülünü almak istiyor musun?`)) return;

        AdManager.showRewardedAd(() => {
            if (!user.claimedWordRewards) user.claimedWordRewards = {};
            user.claimedWordRewards[lvl] = true;

            db.ref('users/' + user.name).update({
                claimedWordRewards: user.claimedWordRewards
            }).then(() => {
                updateGold(config.reward);
                showToast(`🎁 ${config.reward} Altın Hesabına Eklendi!`);
                AudioEngine.win();
                safeConfetti();
                openWordCareer(); // Refresh
            });
        });
    }

    function startWordCareerLevel(lvl) {
        if(user.wordLevel < lvl) return showToast("Önceki seviyeyi tamamla!");

        const config = WORD_CAREER_LEVELS[lvl];
        // Ensure data exists for this length
        // WORD_DATA is 1-based level.
        // But WORD_DATA level 1 is length 3.
        // WORD_CAREER_LEVELS level 1 is length 3.
        // So they match 1:1.

        const data = WORD_DATA[lvl];
        if(!data) return showToast("Veri eksik!");

        const pool = data.words;
        const secret = pool[Math.floor(Math.random() * pool.length)];

        wordGameState = {
            active: true,
            mode: 'career',
            secret: secret,
            length: config.length,
            guesses: [],
            maxGuesses: 6, // Standard
            currentGuess: "",
            level: lvl,
            startTime: Date.now()
        };

        // Setup Ads? "4 oyunda bir geçiş reklamı"
        handleWordGameAd();

        closeModal('modal-word-career');
        closeModal('modal-word-setup');
        changeScreen('screen-word-game');
        renderWordBoard();
        updateWordKeyboard();

        document.getElementById('wordLevelDisplay').innerText = `Kariyer Seviye ${lvl} - ${currentWinsInfo()}`;
    }

    function currentWinsInfo() {
        return (user.wordCareerWins || 0) + "/10";
    }

    // Global Ad Counter for Word Game
    let wordGameAdCounter = 0;
    function handleWordGameAd() {
        // Disabled here, handled strictly in checkWordGameAd at game end
    }

    function handleWordGameWin() {
        AudioEngine.win();
        safeConfetti();
        const baseGold = wordGameState.length * 20; // 5 chars = 100 gold
        updateGold(baseGold);
        showPiggyWin(baseGold);

        // Career Progression
        if (wordGameState.mode === 'career') {
            if (wordGameState.level === user.wordLevel && user.wordLevel <= 8) {
                user.wordCareerWins = (user.wordCareerWins || 0) + 1;

                if (user.wordCareerWins >= 10) {
                    if (user.wordLevel < 8) {
                        user.wordLevel++;
                        user.wordCareerWins = 0;
                        showToast(`🎉 SEVİYE ATLADIN! Yeni Seviye: ${user.wordLevel}`);
                    } else {
                        showToast("🏆 KARİYER TAMAMLANDI! EFSANESİN!");
                    }
                } else {
                    showToast(`✅ İlerleme: ${user.wordCareerWins}/10`);
                }

                // Save
                if(user.name) {
                    db.ref('users/'+user.name).update({
                        wordLevel: user.wordLevel,
                        wordCareerWins: user.wordCareerWins
                    });
                }
            }
        }

        checkWordGameAd();
    }

    function checkWordGameAd() {
        wordGameAdCounter++;
        // 3 oyunda bir (exactly every 3 games)
        if (wordGameAdCounter % 3 === 0) {
            AdManager.showInterstitialAd();
        }
    }


    // --- NEW WORD GAME LOGIC ---

    function toggleWordMode(context, type) {
        if (context === 'single') {
            const timeOpts = document.getElementById('singleTimeOptions');
            const moveOpts = document.getElementById('singleMoveOptions');
            if (type === 'time') {
                timeOpts.style.display = 'block';
                moveOpts.style.display = 'none';
            } else {
                timeOpts.style.display = 'none';
                moveOpts.style.display = 'block';
            }
        }
        // Online toggles are just radios, no UI change needed unless we want to show details.
        // But for clarity, we can add labels or just rely on the radio text.
    }

    function renderWordActivePlayers() {
        const list = document.getElementById('wordActivePlayersList');
        if (!list) return;

        // Use existing adminData.presence or fetch from DB
        // We can reuse the logic from `updateActivePlayersList` but filtered
        // Or just fetch `presence` again.

        db.ref('presence').once('value').then(snapshot => {
            const data = snapshot.val() || {};
            list.innerHTML = "";
            let count = 0;

            Object.keys(data).forEach(key => {
                if (key === user.name) return; // Don't list self
                const p = data[key];
                if (Date.now() - p.lastSeen > 120000) return; // Offline

                count++;
                const item = document.createElement('div');
                item.className = "list-item";
                item.style.display = "flex";
                item.style.justifyContent = "space-between";
                item.style.alignItems = "center";
                item.innerHTML = `
                    <div style="display:flex; align-items:center; gap:5px;">
                        <span>${p.avatar || '👤'}</span>
                        <span style="font-weight:bold; font-size:0.8rem;">${key}</span>
                    </div>
                    <button class="btn-green" style="padding:2px 8px; font-size:0.7rem;" onclick="sendWordInvite('${key}')">DAVET</button>
                `;
                list.appendChild(item);
            });

            if (count === 0) {
                list.innerHTML = `<div style="padding:10px; text-align:center; color:#999; font-size:0.8rem;">Kimse yok.</div>`;
            }
        });
    }

    function sendWordInvite(targetUser) {
        if (user.gold < 50) return showToast("50 Altın Gerek (Oda Kurmak İçin)");

        // Read config from UI
        const diff = parseInt(document.getElementById('createWordDiff').value);
        const isTime = document.getElementById('radioOnlineTime').checked;
        const timeLimit = isTime ? 5 : 0; // Fixed 5 mins for online time mode per UI? Or add dropdown? UI says "5dk"
        const maxGuesses = isTime ? 1000 : 15; // 15 moves if 'moves' mode

        // Create Room First
        const c = Math.floor(10000 + Math.random() * 90000).toString();

        // Deduct Gold? Or only on join?
        // createWordRoom deducts. Here we are inviting, which implies creating.
        updateGold(-50);

        const lvl = diff - 2;
        const data = WORD_DATA[lvl] || WORD_DATA[1];
        const secret = data.words[Math.floor(Math.random() * data.words.length)];

        db.ref('rooms/' + c).set({
            type: 'word',
            secret: secret,
            p1: { name: user.name, avatar: user.avatar },
            config: { length: diff, timeLimit: timeLimit, maxGuesses: maxGuesses },
            status: "waiting",
            startTime: Date.now()
        });
        db.ref('rooms/' + c).onDisconnect().remove();
        game.room = c;
        game.role = "p1";
        game.mode = "online_word"; // Custom tag

        // Send Invite
        db.ref('invites/' + targetUser).push({
            from: user.name,
            room: c,
            type: 'word', // TAG IT
            timestamp: Date.now()
        });

        closeModal('modal-word-setup');
        showToast(`📨 ${targetUser} davet edildi!`);

        // Enter Lobby Wait
        // Use existing lobby or custom?
        // We can reuse `listenWordRoom`.
        document.getElementById('roomCodeDisplay').innerText = c;
        document.getElementById('roomModeInfo').innerText = `Kelime (${diff})`;
        changeScreen('screen-word-lobby');
        listenWordRoom(c);
    }

    function startWordGameCustom() {
        const diff = parseInt(document.getElementById('wordDiffSelect').value);
        const isPvC = document.getElementById('checkWordVsCpu').checked;

        // Determine Mode (Time vs Moves)
        const isTimeMode = document.getElementById('radioSingleTime').checked;

        let timeLimit = 0;
        let moveLimit = 15; // Standard for Moves mode

        if (isTimeMode) {
            timeLimit = parseInt(document.getElementById('wordTimeSelect').value);
            moveLimit = 1000; // Effectively infinite for timed mode
        } else {
            timeLimit = 0;
            moveLimit = 15; // Fixed 15 hak
        }

        // Correct Mapping: Length 3 -> Level 1
        const lvl = diff - 2;
        const data = WORD_DATA[lvl] || WORD_DATA[1];

        if (!data) return showToast("Veri yok!");

        const pool = data.words;
        const secret = pool[Math.floor(Math.random() * pool.length)];

        wordGameState = {
            active: true,
            mode: isPvC ? 'pvc' : 'single',
            secret: secret,
            length: diff,
            guesses: [],
            maxGuesses: moveLimit,
            currentGuess: "",
            level: lvl,
            startTime: Date.now(),
            timeLimit: timeLimit
        };

        if(isPvC) wordGameState.aiGuesses = [];

        closeModal('modal-word-setup');
        changeScreen('screen-word-game');
        renderWordBoard();
        updateWordKeyboard();

        if (timeLimit > 0) {
            startWordTimer(timeLimit);
        } else {
            stopWordTimer();
            document.getElementById('wordTimerDisplay').style.display = 'none';
        }

        const modeText = isPvC ? '🆚 Bilgisayar' : 'Tek Kişilik';
        const limitText = timeLimit > 0 ? `${timeLimit} Dk` : `${moveLimit} Hak`;
        document.getElementById('wordLevelDisplay').innerText = `${diff} Harf - ${limitText} - ${modeText}`;
    }

    function createWordRoom() {
        if (user.gold < 50) return showToast("50 Altın Gerek");

        const diff = parseInt(document.getElementById('createWordDiff').value);

        // Mode logic
        const isTime = document.getElementById('radioOnlineTime').checked;
        const timeLimit = isTime ? 5 : 0; // 5 min default for online time
        const maxGuesses = isTime ? 1000 : 15;

        updateGold(-50);

        const c = Math.floor(10000 + Math.random() * 90000).toString();
        const lvl = diff - 2;
        const data = WORD_DATA[lvl] || WORD_DATA[1];
        const secret = data.words[Math.floor(Math.random() * data.words.length)];

        db.ref('rooms/' + c).set({
            type: 'word',
            secret: secret,
            p1: { name: user.name, avatar: user.avatar },
            config: { length: diff, timeLimit: timeLimit, maxGuesses: maxGuesses },
            status: "waiting",
            startTime: Date.now()
        });

        db.ref('rooms/' + c).onDisconnect().remove();
        game.room = c;
        game.role = "p1";
        game.mode = "online_word";

        closeModal('modal-word-setup');
        document.getElementById('roomCodeDisplay').innerText = c;
        document.getElementById('roomModeInfo').innerText = `Kelime (${diff})`;
        changeScreen('screen-word-lobby');
        listenWordRoom(c);
    }

    function joinWordRoom(c) {
        c = c.toString().trim();
        db.ref('rooms/' + c).once('value').then(s => {
            const r = s.val();
            if (!r || r.type !== 'word') return showToast("Oda Yok/Hatalı");
            if (r.status !== "waiting") return showToast("Dolu");

            updateGold(-50);
            game.room = c;
            game.role = "p2";
            game.mode = "online_word";

            db.ref('rooms/' + c).update({
                p2: { name: user.name, avatar: user.avatar },
                status: "playing",
                startTime: Date.now()
            });

            closeModal('modal-word-setup');
            listenWordRoom(c);
        });
    }

    function listenWordRoom(c) {
        db.ref('rooms/' + c).on('value', s => {
            const r = s.val();
            if (!r) return;

            if (r.status === 'playing' && currentScreen !== 'screen-word-game') {
                // Apply Config
                const conf = r.config || { length: 5, timeLimit: 0, maxGuesses: 6 };

                wordGameState = {
                    active: true,
                    mode: 'online',
                    secret: r.secret,
                    length: conf.length,
                    guesses: [],
                    maxGuesses: conf.maxGuesses || 15,
                    currentGuess: "",
                    level: 1,
                    startTime: r.startTime,
                    timeLimit: conf.timeLimit || 0
                };

                changeScreen('screen-word-game');
                renderWordBoard();
                updateWordKeyboard();

                if (wordGameState.timeLimit > 0) {
                    startWordTimer(wordGameState.timeLimit);
                } else {
                    stopWordTimer();
                    document.getElementById('wordTimerDisplay').style.display = 'none';
                }

                const limitText = wordGameState.timeLimit > 0 ? `${wordGameState.timeLimit} Dk` : `${wordGameState.maxGuesses} Hak`;
                document.getElementById('wordLevelDisplay').innerText = `ONLINE - ${wordGameState.length} Harf - ${limitText}`;

                // Listen for opponent moves
                db.ref('rooms/' + c + '/word_moves').off();
                db.ref('rooms/' + c + '/word_moves').on('child_added', s => {
                   // Logic for moves display... (Simplified)
                });
            }

            // Winner Logic
            if (r.winner) {
               if(wordGameState.active) {
                   wordGameState.active = false;
                   if (r.winner === user.name) {
                       AudioEngine.win();
                       handleWordGameWin();
                   } else {
                       AudioEngine.error();
                       document.getElementById('endButtons').style.display = 'flex';
                       document.getElementById('endTitle').innerText = 'KAYBETTİN';
                       document.getElementById('endTitle').style.color = "#e74c3c";
                       document.getElementById('endMsg').innerText = "Kelime: " + wordGameState.secret;
                       showModal('modal-end');
                       checkWordGameAd();
                   }
               }
            }

            // --- YENİ RÖVANŞ MANTIĞI (Word Game) ---
            if (r.winner && r.rematch) {
                const offer = r.rematch.offer;
                const response = r.rematch.response;

                if (offer) {
                    if (offer.from !== game.role) {
                        const area = document.getElementById('incomingRematchArea');
                        const text = document.getElementById('incomingRematchText');
                        const endBtns = document.getElementById('endButtons');
                        const piggy = document.getElementById('piggyWinOverlay');

                        if (!response) {
                            if (piggy && piggy.style.display === 'flex') {
                                piggy.classList.remove('show');
                                piggy.style.display = 'none';
                                document.getElementById('endTitle').innerText = 'KAZANDIN';
                                document.getElementById('endTitle').style.color = "#2ed573";
                                document.getElementById('endMsg').innerText = "Rakip rövanş istiyor!";
                                showModal('modal-end');
                            }

                            if (area.style.display === 'none') {
                                area.style.display = 'block';
                                endBtns.style.display = 'none';

                                const styleText = offer.playStyle === 'timed' ? `Süreli (${offer.duration}dk)` : 'Haklı';
                                text.innerHTML = `<b>Rakip Rövanş İstiyor!</b><br>Kelime Düellosu, ${styleText}`;
                                AudioEngine.notification();
                            }
                        }
                    } else {
                        const status = document.getElementById('rematchStatus');
                        if (status && !response) status.innerText = "Rakip bekleniyor...";
                    }
                }

                if (response) {
                    if (response.accept) {
                        const statusEl = document.getElementById('rematchStatus');
                        if (statusEl) statusEl.innerText = "Oyun Başlatılıyor...";

                        if (game.role === 'p1') {
                            const newLength = offer.diff || 5;
                            const newStyle = offer.playStyle || 'turn';
                            const newDur = offer.duration || 0;
                            const newMaxGuesses = newStyle === 'timed' ? 1000 : 6;

                            const lvl = newLength - 2;
                            const data = WORD_DATA[lvl] || WORD_DATA[1];
                            const newSecret = data.words[Math.floor(Math.random() * data.words.length)];

                            setTimeout(() => {
                                db.ref('rooms/' + c).update({
                                    winner: null,
                                    rematch: null,
                                    word_moves: null,
                                    status: 'playing',
                                    secret: newSecret,
                                    startTime: Date.now(),
                                    config: { length: newLength, timeLimit: newDur, maxGuesses: newMaxGuesses }
                                });
                            }, 1000);
                        }
                    } else {
                        showToast("Rövanş teklifi reddedildi.");
                        document.getElementById('incomingRematchArea').style.display = 'none';
                        document.getElementById('endButtons').style.display = 'flex';
                        const statusEl = document.getElementById('rematchStatus');
                        if (statusEl) statusEl.innerText = "Reddedildi.";

                        if (game.role === 'p1') {
                            setTimeout(() => db.ref('rooms/' + c + '/rematch').remove(), 2000);
                        }
                    }
                }
            }

            // Wait Logic (P2 Joined)
            if (r.status === 'playing' && currentScreen === 'screen-word-lobby') {
                // Logic handled above (changeScreen)
            }
        });
    }

    function safeOpenWordSetup() {
        showModal('modal-word-setup');
        renderWordActivePlayers(); // Populate list
    }

    function listenForInvites() {
        if (!user.name) return;
        const inviteRef = db.ref('invites/' + user.name);
        inviteRef.off();

        inviteRef.on('child_added', snapshot => {
            const invite = snapshot.val();
            const key = snapshot.key;
            db.ref('invites/' + user.name + '/' + key).remove();

            if (Date.now() - invite.timestamp > 120000) return;
            if (game.active || wordGameState.active) {
                showToast(`📨 ${invite.from} seni davet etti (Oyundasın).`);
                return;
            }

            pendingInviteRoom = invite.room;
            pendingInviteType = invite.type || 'normal'; // Capture Type

            document.getElementById('inviterNameDisplay').innerText = invite.from;
            const typeText = (invite.type === 'word') ? "KELİME DÜELLOSU" : "Sayı Tahmin";
            document.querySelector('#modal-invite-incoming h3').innerText = `📨 DAVET VAR! (${typeText})`;

            showModal('modal-invite-incoming');
            AudioEngine.notification();
        });
    }

    // We also need to update acceptInvite to use pendingInviteType
    function acceptInvite() {
        closeModal('modal-invite-incoming');
        if (pendingInviteRoom) {
            if (typeof pendingInviteType !== 'undefined' && pendingInviteType === 'word') {
                joinWordRoom(pendingInviteRoom);
            } else {
                if (game.room && !game.active) leaveRoom();
                joinRoom(pendingInviteRoom);
            }
        }
    }



    // --- INVITE SYSTEM JS (NEW) ---
    window.pendingInviteTarget = null;

    function openInviteSetupNumber() {
        closeModal('modal-invite-selector');
        showModal('modal-invite-setup-number');
    }

    function openInviteSetupWord() {
        closeModal('modal-invite-selector');
        showModal('modal-invite-setup-word');
    }

    function sendInviteNumber() {
        if (!window.pendingInviteTarget) return;
        const target = window.pendingInviteTarget;

        const diff = parseInt(document.getElementById('inviteNumDiff').value);
        const modeRadio = document.querySelector('input[name="inviteNumMode"]:checked');
        const mode = modeRadio ? modeRadio.value : 'rights';

        let duration = 3;
        if (mode === 'timed') duration = parseInt(document.getElementById('inviteNumDuration').value);

        if (user.gold < 50) return showToast("Oda kurmak için 50 Altın gerekli!");
        updateGold(-50);

        const newRoomCode = Math.floor(10000 + Math.random() * 90000).toString();

        db.ref('rooms/' + newRoomCode).set({
            secret: generateNumber(diff),
            p1: { name: user.name, avatar: user.avatar },
            config: { diff: diff, type: "classic", playStyle: (mode==='timed'?'timed':'turn'), duration: duration },
            status: "waiting",
            turn: "p1",
            rights: (mode==='timed' ? 999 : (diff===5?20:(diff===6?25:(diff===7?30:15)))),
            startTime: Date.now(),
            round: 1
        });

        db.ref('rooms/' + newRoomCode).onDisconnect().remove();

        game.room = newRoomCode;
        game.role = "p1";
        game.diff = diff;
        game.type = "classic";
        game.mode = "online";
        game.playStyle = (mode==='timed'?'timed':'turn');
        game.duration = duration;

        closeModal('modal-invite-setup-number');
        changeScreen('screen-wait');
        document.getElementById('roomCodeDisplay').innerText = newRoomCode;
        document.getElementById('roomModeInfo').innerText = diff + " Haneli (Davet)";
        listenRoom(newRoomCode);

        db.ref('invites/' + target).push({
            from: user.name,
            room: newRoomCode,
            type: 'number',
            timestamp: Date.now()
        });
        showToast(`Oda kuruldu ve ${target} davet edildi!`);
    }

    function sendInviteWord() {
        if (!window.pendingInviteTarget) return;
        const target = window.pendingInviteTarget;

        const len = parseInt(document.getElementById('inviteWordLen').value);
        const modeRadio = document.querySelector('input[name="inviteWordMode"]:checked');
        const mode = modeRadio ? modeRadio.value : 'rights';

        let duration = 3;
        if (mode === 'timed') duration = parseInt(document.getElementById('inviteWordDuration').value);

        if (user.gold < 50) return showToast("Oda kurmak için 50 Altın gerekli!");
        updateGold(-50);

        const newRoomCode = Math.floor(10000 + Math.random() * 90000).toString();

        const lvl = len - 2;
        // Ensure WORD_DATA exists
        const data = (typeof WORD_DATA !== 'undefined' && WORD_DATA[lvl]) ? WORD_DATA[lvl] : (typeof WORD_DATA !== 'undefined' ? WORD_DATA[1] : {words:['ELMA']});
        const secret = data.words[Math.floor(Math.random() * data.words.length)];

        db.ref('rooms/' + newRoomCode).set({
            type: 'word',
            secret: secret,
            p1: { name: user.name, avatar: user.avatar },
            config: { length: len, timeLimit: (mode==='timed'?duration:0), maxGuesses: (mode==='timed'?1000:6) },
            status: "waiting",
            startTime: Date.now()
        });

        db.ref('rooms/' + newRoomCode).onDisconnect().remove();

        game.room = newRoomCode;
        game.role = "p1";
        game.mode = "online_word";

        closeModal('modal-invite-setup-word');
        changeScreen('screen-wait');
        document.getElementById('roomCodeDisplay').innerText = newRoomCode;
        document.getElementById('roomModeInfo').innerText = "Kelime (" + len + ")";

        if (typeof listenWordRoom === 'function') listenWordRoom(newRoomCode);

        db.ref('invites/' + target).push({
            from: user.name,
            room: newRoomCode,
            type: 'word',
            timestamp: Date.now()
        });
        showToast(`Kelime odası kuruldu ve ${target} davet edildi!`);
    }