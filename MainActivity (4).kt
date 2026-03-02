package com.DefaultCompany.Tahmin11

import android.content.Intent
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.util.Log
import android.webkit.JavascriptInterface
import android.webkit.WebChromeClient
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.FrameLayout
import androidx.activity.OnBackPressedCallback
import androidx.annotation.Keep
import androidx.appcompat.app.AppCompatActivity

// -------------------- REKLAM KÜTÜPHANELERİ --------------------
import com.yandex.mobile.ads.common.AdError
import com.yandex.mobile.ads.common.AdRequest
import com.yandex.mobile.ads.common.AdRequestConfiguration
import com.yandex.mobile.ads.common.AdRequestError
import com.yandex.mobile.ads.common.ImpressionData
import com.yandex.mobile.ads.common.MobileAds as YMobileAds
import com.yandex.mobile.ads.banner.BannerAdSize
import com.yandex.mobile.ads.banner.BannerAdView
import com.yandex.mobile.ads.interstitial.InterstitialAd
import com.yandex.mobile.ads.interstitial.InterstitialAdEventListener
import com.yandex.mobile.ads.interstitial.InterstitialAdLoadListener
import com.yandex.mobile.ads.interstitial.InterstitialAdLoader
import com.yandex.mobile.ads.rewarded.Reward
import com.yandex.mobile.ads.rewarded.RewardedAd
import com.yandex.mobile.ads.rewarded.RewardedAdEventListener
import com.yandex.mobile.ads.rewarded.RewardedAdLoadListener
import com.yandex.mobile.ads.rewarded.RewardedAdLoader

import com.google.android.gms.ads.AdRequest as GAdRequest
import com.google.android.gms.ads.LoadAdError as GLoadAdError
import com.google.android.gms.ads.MobileAds as GMobileAds
import com.google.android.gms.ads.FullScreenContentCallback
import com.google.android.gms.ads.AdError as GAdError
import com.google.android.gms.ads.interstitial.InterstitialAd as GInterstitialAd
import com.google.android.gms.ads.interstitial.InterstitialAdLoadCallback as GInterstitialAdLoadCallback
import com.google.android.gms.ads.rewarded.RewardedAd as GRewardedAd
import com.google.android.gms.ads.rewarded.RewardedAdLoadCallback as GRewardedAdLoadCallback
import com.google.android.gms.ads.AdSize as GAdSize
import com.google.android.gms.ads.AdView as GAdView
import com.google.android.gms.ads.rewardedinterstitial.RewardedInterstitialAd as GRewardedInterstitialAd
import com.google.android.gms.ads.rewardedinterstitial.RewardedInterstitialAdLoadCallback as GRewardedInterstitialAdLoadCallback

class MainActivity : AppCompatActivity() {

    private lateinit var myWebView: WebView
    private val TAG = "AdsMixSystem"

    // -------------------- REKLAM ID'LERİ --------------------
    // ADMOB
    private val ADMOB_BANNER_ID = "ca-app-pub-5879474591831999/2171448597"
    private val ADMOB_INTERSTITIAL_ID = "ca-app-pub-5879474591831999/8282395523"
    private val ADMOB_REWARDED_ID = "ca-app-pub-5879474591831999/6350366758"
    private val ADMOB_REWARDED_INTERSTITIAL_ID = "ca-app-pub-5879474591831999/3058677360"

    // YANDEX
    private val Y_BANNER_ID = "R-M-18543851-11"
    private val Y_INTERSTITIAL_ID = "R-M-18543851-10"
    private val Y_REWARDED_ID = "R-M-18543851-8"

    // Reklam Objeleri
    private var admobInterstitial: GInterstitialAd? = null
    private var admobRewarded: GRewardedAd? = null
    private var admobRewardedInterstitial: GRewardedInterstitialAd? = null

    private var yandexInterstitial: InterstitialAd? = null
    private var yandexRewarded: RewardedAd? = null
    private var yandexInterstitialLoader: InterstitialAdLoader? = null
    private var yandexRewardedLoader: RewardedAdLoader? = null

    // Güvenlik Zamanlayıcısı
    private val timeoutHandler = Handler(Looper.getMainLooper())
    private var timeoutRunnable: Runnable? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // SDK Başlatmaları
        GMobileAds.initialize(this) {
            loadAdMobInterstitial()
            loadAdMobRewarded()
            loadAdMobRewardedInterstitial()
            setupAdMobBanner() // İlk tercih AdMob Banner
        }

        YMobileAds.initialize(this) {
            setupYandexLoaders()
            loadYandexAds()
        }

        setupWebView()
    }

    private fun setupWebView() {
        myWebView = findViewById(R.id.webview)
        myWebView.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            mediaPlaybackRequiresUserGesture = false
        }
        myWebView.addJavascriptInterface(WebAppInterface(this), "Android")
        myWebView.webViewClient = WebViewClient()
        myWebView.webChromeClient = WebChromeClient()
        myWebView.loadUrl("file:///android_asset/index.html")

        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                if (myWebView.canGoBack()) myWebView.goBack() else finish()
            }
        })
    }

    // -------------------- KORUMA MEKANİZMASI --------------------
    private fun resumeGame() {
        runOnUiThread {
            cancelTimeout()
            myWebView.evaluateJavascript("if(window.onAdClosed) window.onAdClosed();", null)
            myWebView.evaluateJavascript("if(window.resumeGame) window.resumeGame();", null)
            Log.d(TAG, "Interface Unlocked - Game Resumed")
        }
    }

    private fun startTimeout(seconds: Long = 5) {
        cancelTimeout()
        timeoutRunnable = Runnable {
            Log.e(TAG, "AD TIMEOUT: Reklam yüklenemedi, oyun devam ettiriliyor.")
            resumeGame()
        }
        timeoutHandler.postDelayed(timeoutRunnable!!, seconds * 1000)
    }

    private fun cancelTimeout() {
        timeoutRunnable?.let { timeoutHandler.removeCallbacks(it) }
        timeoutRunnable = null
    }

    // -------------------- ADMOB BANNER --------------------
    private fun setupAdMobBanner() {
        val container = findViewById<FrameLayout>(R.id.adContainer) ?: return
        val adView = GAdView(this).apply {
            adUnitId = ADMOB_BANNER_ID
            setAdSize(GAdSize.BANNER)
        }
        adView.adListener = object : com.google.android.gms.ads.AdListener() {
            override fun onAdFailedToLoad(p0: GLoadAdError) {
                Log.e(TAG, "AdMob Banner Failed to Load. Error Code: ${p0.code}, Message: ${p0.message}")
                setupYandexBanner() // AdMob Banner başarısızsa Yandex Banner yükle
            }
        }
        container.removeAllViews()
        container.addView(adView)
        adView.loadAd(GAdRequest.Builder().build())
    }

    private fun setupYandexBanner() {
        val container = findViewById<FrameLayout>(R.id.adContainer) ?: return
        val yandexBanner = BannerAdView(this).apply {
            setAdUnitId(Y_BANNER_ID)
            setAdSize(BannerAdSize.stickySize(this@MainActivity, 320))
        }

        yandexBanner.setBannerAdEventListener(object : com.yandex.mobile.ads.banner.BannerAdEventListener {
            override fun onAdLoaded() {
                Log.d(TAG, "Yandex Banner Loaded Successfully")
                container.visibility = android.view.View.VISIBLE
            }
            override fun onAdFailedToLoad(error: AdRequestError) {
                Log.e(TAG, "Yandex Banner Failed to Load. Error Code: ${error.code}, Message: ${error.description}")
                container.visibility = android.view.View.GONE // İki reklam da başarısızsa alanı gizle
            }
            override fun onAdClicked() {}
            override fun onLeftApplication() {}
            override fun onReturnedToApplication() {}
            override fun onImpression(p0: ImpressionData?) {}
        })

        container.removeAllViews()
        container.addView(yandexBanner)
        yandexBanner.loadAd(AdRequest.Builder().build())
    }

    // -------------------- GEÇİŞ REKLAMLARI (INTERSTITIAL) --------------------
    fun showInterstitialFlow() {
        runOnUiThread {
            startTimeout(6) // 6 saniye içinde reklam açılmazsa oyuna dön

            // 1. ÖNCELİK: ADMOB
            if (admobInterstitial != null) {
                admobInterstitial?.fullScreenContentCallback = object : FullScreenContentCallback() {
                    override fun onAdDismissedFullScreenContent() {
                        Log.d(TAG, "AdMob Interstitial Closed")
                        loadAdMobInterstitial()
                        resumeGame()
                    }
                    override fun onAdFailedToShowFullScreenContent(p0: GAdError) {
                        Log.e(TAG, "AdMob Interstitial Failed to Show. Error Code: ${p0.code}, Message: ${p0.message}")
                        showYandexInterstitialInternal() // AdMob gösterilemezse Yandex'e geç
                    }
                    override fun onAdShowedFullScreenContent() {
                        Log.d(TAG, "AdMob Interstitial Showed Successfully")
                        cancelTimeout() // Reklam başarıyla gösterildiğinde timeout iptal edilir
                    }
                }
                admobInterstitial?.show(this)
            } else {
                Log.w(TAG, "AdMob Interstitial not loaded, trying Yandex fallback.")
                // 2. ÖNCELİK: YANDEX
                showYandexInterstitialInternal()
            }
        }
    }

    private fun showYandexInterstitialInternal() {
        if (yandexInterstitial != null) {
            yandexInterstitial?.setAdEventListener(object : InterstitialAdEventListener {
                override fun onAdDismissed() {
                    Log.d(TAG, "Yandex Interstitial Closed")
                    loadYandexAds()
                    resumeGame()
                }
                override fun onAdFailedToShow(p0: AdError) {
                    Log.e(TAG, "Yandex Interstitial Failed to Show. Error Code: ${p0.description}")
                    resumeGame()
                }
                override fun onAdShown() {
                    Log.d(TAG, "Yandex Interstitial Showed Successfully")
                    cancelTimeout()
                }
                override fun onAdClicked() {}
                override fun onAdImpression(p0: ImpressionData?) {}
            })
            yandexInterstitial?.show(this)
        } else {
            Log.e(TAG, "BOTH Interstitials failed to load. Resuming game immediately.")
            resumeGame() // İkisi de yoksa oyunu kurtar
        }
    }

    // -------------------- ÖDÜLLÜ REKLAMLAR (REWARDED) --------------------
    fun showRewardedFlow() {
        runOnUiThread {
            startTimeout(8)

            // 1. ÖNCELİK: ADMOB
            if (admobRewarded != null) {
                admobRewarded?.fullScreenContentCallback = object : FullScreenContentCallback() {
                    override fun onAdDismissedFullScreenContent() {
                        Log.d(TAG, "AdMob Rewarded Closed")
                        loadAdMobRewarded()
                        resumeGame()
                    }
                    override fun onAdFailedToShowFullScreenContent(p0: GAdError) {
                        Log.e(TAG, "AdMob Rewarded Failed to Show. Error Code: ${p0.code}, Message: ${p0.message}")
                        showYandexRewardedInternal()
                    }
                    override fun onAdShowedFullScreenContent() {
                        Log.d(TAG, "AdMob Rewarded Showed Successfully")
                        cancelTimeout() // Reklam başarıyla gösterildiğinde timeout iptal edilir
                    }
                }
                admobRewarded?.show(this) {
                    Log.d(TAG, "AdMob Reward Earned")
                    myWebView.evaluateJavascript("if(window.onReward) window.onReward();", null)
                }
            } else {
                Log.w(TAG, "AdMob Rewarded not loaded, trying Yandex fallback.")
                // 2. ÖNCELİK: YANDEX
                showYandexRewardedInternal()
            }
        }
    }

    private fun showYandexRewardedInternal() {
        if (yandexRewarded != null) {
            yandexRewarded?.setAdEventListener(object : RewardedAdEventListener {
                override fun onRewarded(p0: Reward) {
                    Log.d(TAG, "Yandex Reward Earned")
                    myWebView.evaluateJavascript("if(window.onReward) window.onReward();", null)
                }
                override fun onAdDismissed() {
                    Log.d(TAG, "Yandex Rewarded Closed")
                    loadYandexAds()
                    resumeGame()
                }
                override fun onAdFailedToShow(p0: AdError) {
                    Log.e(TAG, "Yandex Rewarded Failed to Show. Error Code: ${p0.description}")
                    resumeGame()
                }
                override fun onAdShown() {
                    Log.d(TAG, "Yandex Rewarded Showed Successfully")
                    cancelTimeout()
                }
                override fun onAdClicked() {}
                override fun onAdImpression(p0: ImpressionData?) {}
            })
            yandexRewarded?.show(this)
        } else {
            Log.e(TAG, "BOTH Rewarded ads failed to load. Resuming game immediately.")
            resumeGame()
        }
    }

    // -------------------- REKLAM YÜKLEME MANTIĞI --------------------
    private fun loadAdMobInterstitial() {
        GInterstitialAd.load(this, ADMOB_INTERSTITIAL_ID, GAdRequest.Builder().build(), object : GInterstitialAdLoadCallback() {
            override fun onAdLoaded(ad: GInterstitialAd) { admobInterstitial = ad }
            override fun onAdFailedToLoad(p0: GLoadAdError) {
                Log.e(TAG, "AdMob Interstitial Load Error: ${p0.code} - ${p0.message}")
                admobInterstitial = null
            }
        })
    }

    private fun loadAdMobRewarded() {
        GRewardedAd.load(this, ADMOB_REWARDED_ID, GAdRequest.Builder().build(), object : GRewardedAdLoadCallback() {
            override fun onAdLoaded(ad: GRewardedAd) { admobRewarded = ad }
            override fun onAdFailedToLoad(p0: GLoadAdError) {
                Log.e(TAG, "AdMob Rewarded Load Error: ${p0.code} - ${p0.message}")
                admobRewarded = null
            }
        })
    }

    private fun loadAdMobRewardedInterstitial() {
        GRewardedInterstitialAd.load(this, ADMOB_REWARDED_INTERSTITIAL_ID, GAdRequest.Builder().build(), object : GRewardedInterstitialAdLoadCallback() {
            override fun onAdLoaded(ad: GRewardedInterstitialAd) { admobRewardedInterstitial = ad }
            override fun onAdFailedToLoad(p0: GLoadAdError) {
                Log.e(TAG, "AdMob Rewarded Interstitial Load Error: ${p0.code} - ${p0.message}")
                admobRewardedInterstitial = null
            }
        })
    }

    private fun setupYandexLoaders() {
        yandexInterstitialLoader = InterstitialAdLoader(this).apply {
            setAdLoadListener(object : InterstitialAdLoadListener {
                override fun onAdLoaded(ad: InterstitialAd) { yandexInterstitial = ad }
                override fun onAdFailedToLoad(p0: AdRequestError) {
                    Log.e(TAG, "Yandex Interstitial Load Error: ${p0.code} - ${p0.description}")
                    yandexInterstitial = null
                }
            })
        }
        yandexRewardedLoader = RewardedAdLoader(this).apply {
            setAdLoadListener(object : RewardedAdLoadListener {
                override fun onAdLoaded(ad: RewardedAd) { yandexRewarded = ad }
                override fun onAdFailedToLoad(p0: AdRequestError) {
                    Log.e(TAG, "Yandex Rewarded Load Error: ${p0.code} - ${p0.description}")
                    yandexRewarded = null
                }
            })
        }
    }

    private fun loadYandexAds() {
        yandexInterstitialLoader?.loadAd(AdRequestConfiguration.Builder(Y_INTERSTITIAL_ID).build())
        yandexRewardedLoader?.loadAd(AdRequestConfiguration.Builder(Y_REWARDED_ID).build())
    }

    override fun onDestroy() {
        cancelTimeout()
        super.onDestroy()
    }
}

// -------------------- JS KÖPRÜSÜ (GÜNCELLENDİ) --------------------
@Keep
class WebAppInterface(private val mActivity: MainActivity) {
    @JavascriptInterface
    fun showInterstitial(id: String?) {
        mActivity.showInterstitialFlow()
    }

    @JavascriptInterface
    fun showRewardedAd(id: String?) {
        mActivity.showRewardedFlow()
    }

    @JavascriptInterface
    fun showAd(id: String?) {
        mActivity.showInterstitialFlow()
    }
}