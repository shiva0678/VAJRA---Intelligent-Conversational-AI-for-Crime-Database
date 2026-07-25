/* ================= VOICE INPUT ================= */
let recognition = null, listening = false;
function toggleMic(){
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const micBtn = document.getElementById('micBtn');
  if(!SR){
    addMessage('bot', currentLang==='en'
      ? `Voice input isn't supported in this browser. Try Chrome on desktop or Android for live speech-to-text (English &amp; Kannada).`
      : `ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಧ್ವನಿ ಇನ್‌ಪುಟ್ ಬೆಂಬಲಿತವಾಗಿಲ್ಲ.`);
    return;
  }
  if(listening){ recognition.stop(); return; }
  recognition = new SR();
  recognition.lang = currentLang==='en' ? 'en-IN' : 'kn-IN';
  recognition.interimResults = false;
  recognition.onstart = ()=>{ listening=true; micBtn.classList.add('listening'); };
  recognition.onend = ()=>{ listening=false; micBtn.classList.remove('listening'); };
  recognition.onerror = ()=>{ listening=false; micBtn.classList.remove('listening'); };
  recognition.onresult = (e)=>{
    const transcript = e.results[0][0].transcript;
    document.getElementById('chatInput').value = transcript;
    logAudit('Voice input captured', transcript.slice(0,60), 'info');
  };
  recognition.start();
}
