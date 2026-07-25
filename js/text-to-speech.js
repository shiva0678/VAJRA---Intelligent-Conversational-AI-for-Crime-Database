// Text-to-Speech integration for VAJRA
// - Uses Web Speech API (SpeechSynthesis)
// - Adds a speaker button to each bot response (without renaming existing classes/functions)
// - Graceful fallback when SpeechSynthesis is not available

(function(){
  if(typeof window === 'undefined') return;

  const supports = 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined';
  const DEFAULT_RATE = 1;
  const DEFAULT_PITCH = 1;
  const DEFAULT_VOLUME = 1;

  let voices = [];
  let voicesReady = false;

  function initVoices(){
    if(!supports) return; 
    voices = window.speechSynthesis.getVoices();
    if(voices.length) voicesReady = true;
  }

  function whenVoicesReady(cb){
    if(!supports) return cb();
    if(voicesReady){ return cb(); }
    // Some browsers load voices asynchronously
    window.speechSynthesis.onvoiceschanged = ()=>{
      initVoices();
      try{ cb(); }catch(e){/* ignore */}
    };
    // Try once immediately
    initVoices();
    // Fallback: call after short delay
    setTimeout(()=>{ if(!voicesReady) { initVoices(); cb(); } }, 500);
  }

  function chooseVoiceForLang(lang){
    if(!supports) return null;
    // prefer exact tags first
    const preferred = voices.find(v=>v.lang.toLowerCase()===lang.toLowerCase());
    if(preferred) return preferred;
    // fallback logic: if request is kn-IN try to find kn or kn-IN
    if(lang.startsWith('kn')){
      const kn = voices.find(v=>v.lang.toLowerCase().startsWith('kn'));
      if(kn) return kn;
    }
    // if en-IN requested or en requested, prefer en-IN then en-US
    if(lang.startsWith('en')){
      const enIN = voices.find(v=>v.lang.toLowerCase()==='en-in');
      if(enIN) return enIN;
      const enUS = voices.find(v=>v.lang.toLowerCase()==='en-us');
      if(enUS) return enUS;
      // any en
      const anyEn = voices.find(v=>v.lang.toLowerCase().startsWith('en'));
      if(anyEn) return anyEn;
    }
    // last resort: return first voice
    return voices[0] || null;
  }

  function speakText(text, lang){
    if(!supports) return;
    // stop ongoing speech as required
    try{ window.speechSynthesis.cancel(); }catch(e){}
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = DEFAULT_RATE;
    utter.pitch = DEFAULT_PITCH;
    utter.volume = DEFAULT_VOLUME;
    // choose voice
    const langToUse = (lang==='kn' ? 'kn-IN' : (lang==='en' ? 'en-IN' : lang));
    const v = chooseVoiceForLang(langToUse) || chooseVoiceForLang(lang);
    if(v) utter.voice = v;
    // ensure the utterance uses the right lang tag if voice doesn't force it
    utter.lang = v && v.lang ? v.lang : (langToUse || 'en-IN');
    window.speechSynthesis.speak(utter);
  }

  function createSpeakerButton(messageElement, lang){
    const btn = document.createElement('button');
    btn.className = 'icon-btn tts-btn';
    btn.title = (lang==='kn' ? 'ಪುಟ ಓದಲು' : 'Read aloud');
    btn.style.marginLeft = '8px';
    btn.style.verticalAlign = 'middle';
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 3v18l14-9L5 3z"/><path d="M19 8v8" stroke-linecap="round" stroke-linejoin="round"/></svg>
    `;

    btn.addEventListener('click', ()=>{
      // find the bubble text for this message (preserve existing markup but speak textContent)
      const bubble = messageElement.querySelector('.bubble');
      if(!bubble) return;
      const text = bubble.textContent || bubble.innerText || '';
      whenVoicesReady(()=> speakText(text, lang));
    });

    return btn;
  }

  // Attach TTS button to a bot message element. This does not modify existing classes.
  function attachToBotMessage(msgEl){
    if(!msgEl || !msgEl.classList) return;
    if(!msgEl.classList.contains('bot')) return;
    // avoid duplicate button
    if(msgEl.querySelector('.tts-btn')) return;
    // detect language from currentLang global if available, fallback to document lang
    const lang = (typeof currentLang !== 'undefined') ? currentLang : (document.documentElement.lang || 'en');
    const btn = createSpeakerButton(msgEl, lang);
    // place button inside the bubble header area — append to bubble
    const bubble = msgEl.querySelector('.bubble');
    if(!bubble) return;
    // create a container to keep layout stable
    const ctrl = document.createElement('div');
    ctrl.style.display = 'flex';
    ctrl.style.alignItems = 'center';
    ctrl.style.marginTop = '8px';
    ctrl.appendChild(btn);
    bubble.appendChild(ctrl);
  }

  // Observe DOM mutations to attach buttons to new bot messages
  function observeMessages(){
    const container = document.getElementById('messages');
    if(!container) return;
    // attach to existing
    container.querySelectorAll('.msg.bot').forEach(attachToBotMessage);
    const obs = new MutationObserver(muts=>{
      for(const m of muts){
        for(const n of m.addedNodes){
          if(n.nodeType!==1) continue;
          if(n.classList && n.classList.contains('msg') && n.classList.contains('bot')){
            attachToBotMessage(n);
          } else {
            // if bubble added deeper
            const bots = n.querySelectorAll && n.querySelectorAll('.msg.bot');
            if(bots && bots.length){ bots.forEach(attachToBotMessage); }
          }
        }
      }
    });
    obs.observe(container, {childList:true, subtree:true});
  }

  // init
  function init(){
    if(!supports){
      // graceful: no-op but ensure no errors
      console.info('SpeechSynthesis not supported in this browser. TTS disabled.');
      return;
    }
    whenVoicesReady(()=>{});
    observeMessages();
  }

  // boot after DOM ready
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
