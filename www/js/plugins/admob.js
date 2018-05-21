var admobid = {};
    // select the right Ad Id according to platform
if( /(android)/i.test(navigator.userAgent) ) {
    admobid = { // for Android
        banner: 'ca-app-pub-3618836240338354/7150237428',
        interstitial: 'ca-app-pub-3618836240338354/8626970626'
    };
}


document.addEventListener("deviceready", function(){
    if(AdMob){
        AdMob.createBanner({
            adId: admobid.banner,
            position: AdMob.AD_POSITION.BOTTOM_CENTER,
            autoShow: true 
        });

        
        // prepare at beginning of a game level
        AdMob.prepareInterstitial({
            adId: admobid.interstitial,
            autoShow: true
        });
        
    }
}, false);