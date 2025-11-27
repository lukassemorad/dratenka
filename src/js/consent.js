function initClarity() {
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "ualqeiasuu");
}

function hasConsent() {
    return localStorage.getItem('clarity-consent') === 'accepted';
}

function setConsent(accepted) {
    localStorage.setItem('clarity-consent', accepted ? 'accepted' : 'declined');
}

function showConsentBanner() {
    const banner = document.getElementById('consent-banner');
    if (banner) {
        if (window.applyTranslations) {
            window.applyTranslations();
        }
        banner.classList.remove('hidden');
        banner.classList.add('animate-slide-up');
    }
}

function hideConsentBanner() {
    const banner = document.getElementById('consent-banner');
    if (banner) {
        banner.classList.add('hidden');
        banner.classList.remove('animate-slide-up');
    }
}

function handleConsent(accepted) {
    setConsent(accepted);
    hideConsentBanner();
    
    if (accepted) {
        initClarity();
    }
}

function initConsent() {
    if (!hasConsent()) {
        setTimeout(() => {
            showConsentBanner();
        }, 500);
    } else if (hasConsent()) {
        initClarity();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const acceptBtn = document.getElementById('consent-accept');
    const declineBtn = document.getElementById('consent-decline');
    
    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => handleConsent(true));
    }
    
    if (declineBtn) {
        declineBtn.addEventListener('click', () => handleConsent(false));
    }
    
    initConsent();
});

window.handleConsent = handleConsent;

