// Interactive Threaded Guestbook (留言板) Fullscreen Drawer / Modal View
(function () {
  'use strict';

  var TABLE_NAME = 'guestbook';
  var supabaseClient = null;
  var cachedMessages = [];
  var translationCache = {}; // Cache translated texts: msgId -> translatedText

  var LOCAL_STORAGE_KEY = 'shawn_guestbook_demo_cache';

  function initClient() {
    var config = window.SUPABASE_CONFIG || {};
    if (
      window.supabase &&
      config.url &&
      config.anonKey &&
      config.url !== 'YOUR_SUPABASE_URL' &&
      config.anonKey !== 'YOUR_SUPABASE_ANON_KEY'
    ) {
      try {
        // Strip trailing slash and accidental /rest/v1 if included in url
        var cleanUrl = config.url.replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
        supabaseClient = window.supabase.createClient(cleanUrl, config.anonKey);
      } catch (err) {
        console.warn('Supabase initialization failed, using local fallback:', err);
      }
    }
  }

  function getDemoMessages() {
    try {
      var saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {}

    var initial = [
      {
        id: 'msg-1',
        created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
        nickname: '星海漫游者 (Star Wanderer)',
        content: '非常精致的个人主页！尤其是黑暗模式下的赛博霓虹效果和中国风毛笔标题，令人印象深刻。',
        parent_id: null,
        avatar_seed: 'Felix'
      },
      {
        id: 'msg-2',
        created_at: new Date(Date.now() - 3600000 * 18).toISOString(),
        nickname: 'Shawn Wang',
        content: '谢谢漫游者的留言，欢迎常来交流！',
        parent_id: 'msg-1',
        avatar_seed: 'Shawn'
      },
      {
        id: 'msg-3',
        created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
        nickname: 'Frontend Hacker',
        content: 'Love the terminal boot sequence in the contact section! Super creative and smooth.',
        parent_id: null,
        avatar_seed: 'Callie'
      },
      {
        id: 'msg-4',
        created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
        nickname: '夜航员 (Night Pilot)',
        content: '志莽行书体的大标题很有气势，水手的排诗也很有意境。祝代码常青！',
        parent_id: null,
        avatar_seed: 'Aero'
      }
    ];
    saveDemoMessages(initial);
    return initial;
  }

  function saveDemoMessages(messages) {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
    } catch (e) {}
  }

  function escapeHTML(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatTime(isoString) {
    var d = new Date(isoString);
    if (isNaN(d.getTime())) return '';
    var now = new Date();
    var diffMs = now - d;
    var diffMins = Math.floor(diffMs / 60000);
    var diffHours = Math.floor(diffMins / 60);
    var diffDays = Math.floor(diffHours / 24);

    var isZh = document.documentElement.lang === 'zh-CN';

    if (diffMins < 1) return isZh ? '刚刚' : 'just now';
    if (diffMins < 60) return isZh ? diffMins + '分钟前' : diffMins + 'm ago';
    if (diffHours < 24) return isZh ? diffHours + '小时前' : diffHours + 'h ago';
    if (diffDays < 7) return isZh ? diffDays + '天前' : diffDays + 'd ago';

    var year = d.getFullYear();
    var month = (d.getMonth() + 1).toString().padStart(2, '0');
    var day = d.getDate().toString().padStart(2, '0');
    return year + '-' + month + '-' + day;
  }

  function getAvatarUrl(seed) {
    return 'https://api.dicebear.com/7.x/bottts/svg?seed=' + encodeURIComponent(seed || 'wanderer');
  }

  // Detect whether text is primarily Chinese
  function isChineseText(text) {
    var cnChars = (text || '').match(/[\u4e00-\u9fa5]/g) || [];
    return cnChars.length >= 2 || (cnChars.length > 0 && cnChars.length / (text.length || 1) > 0.15);
  }

  // Call Supabase Edge Function or Google Gemini API (or Free Fallback) to translate text
  async function translateWithGemini(text, targetLang) {
    var transConfig = window.TRANSLATION_CONFIG || {};
    var geminiConfig = transConfig.gemini || window.GEMINI_CONFIG || {};
    var targetLangName = targetLang === 'zh-CN' ? 'Simplified Chinese (简体中文)' : 'English';

    // 1. Try Supabase Edge Function first if enabled and Supabase is connected
    if (transConfig.useEdgeFunction && supabaseClient && supabaseClient.functions) {
      try {
        var functionName = transConfig.edgeFunctionName || 'translate';
        var { data, error } = await supabaseClient.functions.invoke(functionName, {
          body: {
            text: text,
            targetLang: targetLang,
            targetLangName: targetLangName
          }
        });

        if (error) {
          console.warn('Supabase Edge Function translation error, falling back:', error);
          if (error.context && typeof error.context.json === 'function') {
            error.context.json().then(function(detail) {
              console.error('Supabase Edge Function error details from server:', detail);
            }).catch(function(){});
          }
        } else if (data && (data.translatedText || data.translation || data.text)) {
          return (data.translatedText || data.translation || data.text).trim();
        }
      } catch (fnErr) {
        console.warn('Supabase Edge Function call failed:', fnErr);
      }
    }

    // 2. Direct Gemini API call if key is provided
    var apiKey = geminiConfig.apiKey;
    var model = geminiConfig.model || 'gemini-1.5-flash';

    if (apiKey && apiKey !== 'YOUR_GEMINI_API_KEY') {
      var endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/' + model + ':generateContent?key=' + apiKey;
      var prompt = 'You are a translation engine for a personal portfolio guestbook. Translate the following message into ' + targetLangName + '. Only output the direct, natural translation without explanations, conversational fillers, or quotes.\n\nMessage to translate:\n' + text;

      var response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 1000
          }
        })
      });

      if (!response.ok) {
        var errData = await response.json().catch(function () { return {}; });
        throw new Error(errData.error && errData.error.message ? errData.error.message : 'Gemini API Error ' + response.status);
      }

      var result = await response.json();
      var outputText = result.candidates && result.candidates[0] && result.candidates[0].content && result.candidates[0].content.parts && result.candidates[0].content.parts[0] && result.candidates[0].content.parts[0].text;

      if (!outputText) throw new Error('Empty response from Gemini');
      return outputText.trim();
    }

    // 3. Client-side free fallback endpoint (ensures it works out of the box)
    try {
      var tl = targetLang === 'zh-CN' ? 'zh-CN' : 'en';
      var fallbackUrl = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=' + tl + '&dt=t&q=' + encodeURIComponent(text);
      var resp = await fetch(fallbackUrl);
      var fbData = await resp.json();
      if (fbData && fbData[0]) {
        var translated = fbData[0].map(function (item) { return item[0]; }).join('');
        return translated;
      }
    } catch (fbErr) {
      console.warn('Fallback translate failed:', fbErr);
    }

    throw new Error('TRANSLATION_FAILED');
  }

  async function fetchMessages() {
    if (supabaseClient) {
      try {
        var res = await supabaseClient
          .from(TABLE_NAME)
          .select('*')
          .order('created_at', { ascending: false });

        if (res.error) throw res.error;
        cachedMessages = res.data || [];
      } catch (err) {
        console.error('Failed to fetch from Supabase:', err);
        cachedMessages = getDemoMessages();
      }
    } else {
      cachedMessages = getDemoMessages();
    }

    renderDrawerView(cachedMessages);
  }

  // =========================================================================
  // Full-height Drawer / Modal Window
  // =========================================================================
  function renderDrawerView(messages) {
    var stream = document.getElementById('gbDrawerStreamList');
    var drawerBadge = document.getElementById('gbDrawerCountBadge');
    var floatingBadge = document.getElementById('gbFloatingCountBadge');

    if (drawerBadge) drawerBadge.textContent = messages.length;
    if (floatingBadge) {
      floatingBadge.textContent = messages.length;
      floatingBadge.style.display = messages.length > 0 ? 'inline-flex' : 'none';
    }

    if (!stream) return;

    var isZh = document.documentElement.lang === 'zh-CN';

    var roots = [];
    var replyMap = {};

    messages.forEach(function (msg) {
      if (msg.parent_id) {
        if (!replyMap[msg.parent_id]) replyMap[msg.parent_id] = [];
        replyMap[msg.parent_id].push(msg);
      } else {
        roots.push(msg);
      }
    });

    // Ensure root messages are strictly sorted latest-first (newest on top)
    roots.sort(function (a, b) {
      return new Date(b.created_at) - new Date(a.created_at);
    });

    if (roots.length === 0) {
      stream.innerHTML =
        '<div style="text-align:center; padding: 40px 20px; color: #64748b;">' +
        '<i class="fa-regular fa-comment-dots" style="font-size: 32px; margin-bottom: 12px; display:inline-block; opacity: 0.6;"></i>' +
        '<p>' + (isZh ? '暂无留言，快来成为第一个留下足迹的人吧！' : 'No messages yet. Be the first to leave a footprint!') + '</p>' +
        '</div>';
      return;
    }

    var html = '';
    roots.forEach(function (root) {
      var replies = replyMap[root.id] || [];
      replies.sort(function (a, b) {
        return new Date(a.created_at) - new Date(b.created_at);
      });

      var timeStr = formatTime(root.created_at);
      var avatar = getAvatarUrl(root.avatar_seed || root.nickname);

      var isRootChinese = isChineseText(root.content);
      var defaultTargetLang = isZh ? (isRootChinese ? 'en' : 'zh-CN') : (isRootChinese ? 'en' : 'zh-CN');
      var translateBtnLabel = isZh ? (isRootChinese ? '翻译为英文' : '翻译为中文') : (isRootChinese ? 'Translate to EN' : 'Translate to ZH');

      html +=
        '<div class="gb-drawer-card-thread" id="drawer-msg-' + root.id + '">' +
          '<div class="gb-card">' +
            '<div class="gb-card-main">' +
              '<div class="gb-avatar-wrap"><img class="gb-avatar" src="' + avatar + '" alt="Avatar" loading="lazy" /></div>' +
              '<div class="gb-card-body">' +
                '<div class="gb-meta">' +
                  '<span class="gb-author">' + escapeHTML(root.nickname) + '</span>' +
                  '<span class="gb-time">' + timeStr + '</span>' +
                '</div>' +
                '<div class="gb-text" id="gb-text-' + root.id + '">' + escapeHTML(root.content) + '</div>' +
                '<div class="gb-translation-box" id="gb-trans-' + root.id + '" style="display: none;"></div>' +
              '</div>' +
            '</div>' +
            '<div class="gb-card-footer">' +
              '<div class="gb-actions">' +
                '<button type="button" class="gb-translate-btn" data-msg-id="' + root.id + '" data-target-lang="' + defaultTargetLang + '" title="' + translateBtnLabel + '">' +
                  '<i class="fa-solid fa-language"></i> <span class="gb-trans-text">' + (isZh ? '翻译' : 'Translate') + '</span>' +
                '</button>' +
                '<button type="button" class="gb-reply-btn" data-reply-to="' + root.id + '" data-author="' + escapeHTML(root.nickname) + '">' +
                  '<i class="fa-solid fa-reply"></i> ' + (isZh ? '回复' : 'Reply') +
                '</button>' +
              '</div>' +
              '<div class="gb-reply-form-slot" id="drawerReplySlot-' + root.id + '"></div>' +
            '</div>' +
          '</div>';

      if (replies.length > 0) {
        html += '<div class="gb-nested-thread">';
        replies.forEach(function (r) {
          var rTime = formatTime(r.created_at);
          var rAvatar = getAvatarUrl(r.avatar_seed || r.nickname);
          var isRChinese = isChineseText(r.content);
          var rTargetLang = isZh ? (isRChinese ? 'en' : 'zh-CN') : (isRChinese ? 'en' : 'zh-CN');
          var rBtnLabel = isZh ? (isRChinese ? '翻译为英文' : '翻译为中文') : (isRChinese ? 'Translate to EN' : 'Translate to ZH');

          html +=
            '<div class="gb-reply-item" id="drawer-reply-' + r.id + '">' +
              '<div class="gb-avatar-wrap gb-avatar-sm"><img class="gb-avatar" src="' + rAvatar + '" alt="Avatar" loading="lazy" /></div>' +
              '<div class="gb-card-body">' +
                '<div class="gb-meta"><span class="gb-author">' + escapeHTML(r.nickname) + '</span><span class="gb-time">' + rTime + '</span></div>' +
                '<div class="gb-text" id="gb-text-' + r.id + '">' + escapeHTML(r.content) + '</div>' +
                '<div class="gb-translation-box" id="gb-trans-' + r.id + '" style="display: none;"></div>' +
                '<div class="gb-reply-footer">' +
                  '<button type="button" class="gb-translate-btn gb-translate-btn-sm" data-msg-id="' + r.id + '" data-target-lang="' + rTargetLang + '" title="' + rBtnLabel + '">' +
                    '<i class="fa-solid fa-language"></i> <span class="gb-trans-text">' + (isZh ? '翻译' : 'Translate') + '</span>' +
                  '</button>' +
                '</div>' +
              '</div>' +
            '</div>';
        });
        html += '</div>';
      }

      html += '</div>';
    });

    stream.innerHTML = html;
    bindReplyTriggers();
  }

  function bindDrawerEvents() {
    var floatingBtn = document.getElementById('gbFloatingBtn');
    var drawer = document.getElementById('gbDrawerModal');
    var closeBtn = document.getElementById('gbDrawerCloseBtn');
    var backdrop = document.getElementById('gbDrawerBackdrop');

    function openDrawer(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      // Close 3D navigation menu if open
      var perspective = document.getElementById('perspective');
      if (perspective && perspective.classList.contains('animate')) {
        $('#perspective').removeClass('animate');
        setTimeout(function () {
          $('#perspective').removeClass('modalview');
        }, 300);
      }

      if (drawer) {
        drawer.classList.add('active');
        drawer.setAttribute('aria-hidden', 'false');
      }
    }

    function closeDrawer() {
      if (drawer) {
        if (closeBtn && document.activeElement === closeBtn) {
          closeBtn.blur();
        }
        drawer.classList.remove('active');
        drawer.setAttribute('aria-hidden', 'true');
      }
    }

    if (floatingBtn) floatingBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (backdrop) backdrop.addEventListener('click', closeDrawer);

    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeDrawer();
    });

    var dForm = document.getElementById('gbDrawerForm');
    var dDice = document.getElementById('gbDrawerDiceBtn');
    var dNick = document.getElementById('gbDrawerNicknameInput');
    var dAvatar = document.getElementById('gbDrawerAvatarPreview');
    var dText = document.getElementById('gbDrawerContentInput');

    function updateDAvatar() {
      var seed = (dNick && dNick.value.trim()) || 'wanderer-' + Math.floor(Math.random() * 1000);
      if (dAvatar) dAvatar.src = getAvatarUrl(seed);
    }

    if (dDice) {
      dDice.addEventListener('click', function () {
        var isZh = document.documentElement.lang === 'zh-CN';
        var adjectives = ['星河', '碧波', '孤帆', '清风', '夜巡', '拾光'];
        var nouns = ['水手', '旅者', '书蠹', '极客', '捕梦人'];
        if (isZh) {
          dNick.value = adjectives[Math.floor(Math.random() * adjectives.length)] + nouns[Math.floor(Math.random() * nouns.length)];
        } else {
          var enNames = ['Star Wanderer', 'Wave Rider', 'Night Owl', 'Cyber Poet', 'Lone Sailor'];
          dNick.value = enNames[Math.floor(Math.random() * enNames.length)];
        }
        updateDAvatar();
      });
    }

    if (dNick) dNick.addEventListener('input', updateDAvatar);

    if (dForm) {
      dForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var isZh = document.documentElement.lang === 'zh-CN';
        var nick = (dNick && dNick.value.trim()) || (isZh ? '匿名水手' : 'Anonymous Wanderer');
        var content = dText ? dText.value.trim() : '';
        if (!content) return;

        postComment(nick, content, null, function () {
          if (dText) dText.value = '';
          updateDAvatar();
        });
      });
    }
  }

  function bindTranslateTriggers() {
    var transButtons = document.querySelectorAll('.gb-translate-btn');
    var isZh = document.documentElement.lang === 'zh-CN';

    transButtons.forEach(function (btn) {
      btn.onclick = async function (e) {
        e.preventDefault();
        var msgId = btn.getAttribute('data-msg-id');
        var targetLang = btn.getAttribute('data-target-lang') || (isZh ? 'en' : 'zh-CN');
        var box = document.getElementById('gb-trans-' + msgId);
        var originalTextEl = document.getElementById('gb-text-' + msgId);
        var labelEl = btn.querySelector('.gb-trans-text');

        if (!box || !originalTextEl) return;

        // Toggle if already translated and visible
        if (box.style.display !== 'none' && !box.classList.contains('translating')) {
          box.style.display = 'none';
          if (labelEl) labelEl.textContent = isZh ? '翻译' : 'Translate';
          return;
        }

        // Show cached translation if available
        if (translationCache[msgId]) {
          box.innerHTML =
            '<div class="gb-trans-header">' +
              '<i class="fa-solid fa-wand-magic-sparkles"></i> <span>' + (targetLang === 'zh-CN' ? '中文翻译 (Gemini)' : 'English Translation (Gemini)') + '</span>' +
            '</div>' +
            '<div class="gb-trans-content">' + escapeHTML(translationCache[msgId]) + '</div>';
          box.style.display = 'block';
          if (labelEl) labelEl.textContent = isZh ? '收起' : 'Hide';
          return;
        }

        // Perform translation call
        var rawText = originalTextEl.textContent;
        box.classList.add('translating');
        box.innerHTML =
          '<div class="gb-trans-loading">' +
            '<i class="fa-solid fa-spinner fa-spin"></i> <span>' + (isZh ? 'AI 正在翻译中...' : 'Translating with AI...') + '</span>' +
          '</div>';
        box.style.display = 'block';
        if (labelEl) labelEl.textContent = isZh ? '翻译中' : 'Translating';

        try {
          var translatedResult = await translateWithGemini(rawText, targetLang);
          translationCache[msgId] = translatedResult;
          box.classList.remove('translating');
          box.innerHTML =
            '<div class="gb-trans-header">' +
              '<i class="fa-solid fa-wand-magic-sparkles"></i> <span>' + (targetLang === 'zh-CN' ? '中文翻译 (Gemini)' : 'English Translation (Gemini)') + '</span>' +
            '</div>' +
            '<div class="gb-trans-content">' + escapeHTML(translatedResult) + '</div>';
          if (labelEl) labelEl.textContent = isZh ? '收起' : 'Hide';
        } catch (err) {
          box.classList.remove('translating');
          console.error('Translation error:', err);
          var errMsg = isZh ? '翻译失败，请稍后重试' : 'Translation failed, please try again';
          if (err.message === 'NO_API_KEY') {
            errMsg = isZh ? '请在 js/guestbook-config.js 中配置 Gemini API Key' : 'Please configure Gemini API Key in guestbook-config.js';
          }
          box.innerHTML = '<div class="gb-trans-error"><i class="fa-solid fa-triangle-exclamation"></i> ' + escapeHTML(errMsg) + '</div>';
          if (labelEl) labelEl.textContent = isZh ? '重试' : 'Retry';
        }
      };
    });
  }

  function bindReplyTriggers() {
    bindTranslateTriggers();
    var buttons = document.querySelectorAll('.gb-reply-btn');
    var isZh = document.documentElement.lang === 'zh-CN';

    buttons.forEach(function (btn) {
      btn.onclick = function (e) {
        e.preventDefault();
        var parentId = btn.getAttribute('data-reply-to');
        var authorName = btn.getAttribute('data-author');

        var slot = document.getElementById('drawerReplySlot-' + parentId);
        if (!slot) return;

        if (slot.innerHTML.trim() !== '') {
          slot.innerHTML = '';
          return;
        }

        document.querySelectorAll('.gb-reply-form-slot').forEach(function (s) {
          s.innerHTML = '';
        });

        slot.innerHTML =
          '<form class="gb-inline-reply-form" data-parent-id="' + parentId + '">' +
            '<div class="gb-form-row">' +
              '<input type="text" class="gb-input gb-input-nick" placeholder="' + (isZh ? '昵称 (默认匿名)' : 'Nickname (optional)') + '" maxlength="30" />' +
            '</div>' +
            '<textarea class="gb-textarea" rows="2" placeholder="' + (isZh ? '回复 @' + authorName + '...' : 'Reply to @' + authorName + '...') + '" maxlength="1000" required></textarea>' +
            '<div class="gb-form-footer">' +
              '<button type="button" class="gb-cancel-btn">' + (isZh ? '取消' : 'Cancel') + '</button>' +
              '<button type="submit" class="gb-submit-btn">' +
                '<i class="fa-solid fa-paper-plane"></i> ' + (isZh ? '发送回复' : 'Send') +
              '</button>' +
            '</div>' +
          '</form>';

        var form = slot.querySelector('.gb-inline-reply-form');
        var cancelBtn = slot.querySelector('.gb-cancel-btn');
        var textarea = slot.querySelector('textarea');
        if (textarea) textarea.focus();

        if (cancelBtn) {
          cancelBtn.onclick = function () { slot.innerHTML = ''; };
        }

        if (form) {
          form.onsubmit = function (ev) {
            ev.preventDefault();
            var nickInput = form.querySelector('.gb-input-nick');
            var nick = nickInput.value.trim() || (isZh ? '匿名水手' : 'Anonymous Wanderer');
            var content = textarea.value.trim();
            if (!content) return;

            postComment(nick, content, parentId, function () {
              slot.innerHTML = '';
            });
          };
        }
      };
    });
  }

  async function postComment(nickname, content, parentId, onSuccess) {
    var isZh = document.documentElement.lang === 'zh-CN';

    var newMsg = {
      id: 'msg-' + Date.now() + '-' + Math.random().toString(36).substr(2, 6),
      created_at: new Date().toISOString(),
      nickname: nickname,
      content: content,
      parent_id: parentId || null,
      avatar_seed: nickname + '-' + Math.floor(Math.random() * 1000)
    };

    if (supabaseClient) {
      try {
        var res = await supabaseClient.from(TABLE_NAME).insert([
          {
            nickname: newMsg.nickname,
            content: newMsg.content,
            parent_id: newMsg.parent_id,
            avatar_seed: newMsg.avatar_seed
          }
        ]).select();

        if (res.error) throw res.error;
        if (res.data && res.data[0]) {
          newMsg = res.data[0];
        }
      } catch (err) {
        console.error('Supabase insert failed, saving to local demo cache:', err);
      }
    }

    cachedMessages.unshift(newMsg);
    saveDemoMessages(cachedMessages);
    renderDrawerView(cachedMessages);

    if (onSuccess) onSuccess();

    var statusEls = document.querySelectorAll('.gb-status-feedback');
    statusEls.forEach(function (el) {
      el.textContent = isZh ? '✓ 留言发表成功！' : '✓ Posted successfully!';
      el.style.opacity = '1';
      setTimeout(function () { el.style.opacity = '0'; }, 3500);
    });
  }

  function init() {
    initClient();
    bindDrawerEvents();
    fetchMessages();
  }

  window.updateGuestbookLanguage = function () {
    renderDrawerView(cachedMessages);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
