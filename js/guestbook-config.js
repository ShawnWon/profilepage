// Supabase Guestbook (留言板) Configuration
// Replace the values below with your project credentials from your Supabase Dashboard:
// Project Settings -> API -> Project URL & Project API Keys (anon / public)

window.SUPABASE_CONFIG = {
  url: 'https://xmeaqderrsqeorpdavbg.supabase.co',       
  anonKey: 'sb_publishable_eoxLW51VIGq-JykKYVtGGQ_jq6O2Ocq' 
};

// Translation Configuration:
// Option A (Recommended): Call via Supabase Edge Function (Keeps your Gemini API key safe on server/Supabase secrets!)
//   1. Deploy a Supabase Edge Function named 'translate' (instructions provided in docs/chat)
//   2. Set enableEdgeFunction: true
// Option B: Direct Gemini Client Call (Requires API key and HTTP referrer restriction in Google Cloud Console)
// Option C: Free fallback (Works automatically when neither is configured)
window.TRANSLATION_CONFIG = {
  // If true, calls supabaseClient.functions.invoke('translate', { body: { text, targetLang } })
  useEdgeFunction: true,
  edgeFunctionName: 'super-api',

  // Fallback direct Gemini config (if not using Edge Function)
  gemini: {
    apiKey: '', // e.g. 'AIzaSy...'
    model: 'gemini-1.5-flash'
  }
};

