// Multilingual (English / Chinese) System for Shawn Wang's Portfolio
(function () {
  'use strict';
  var STORAGE_KEY = 'shawn_portfolio_lang';

  var i18nData = {
    // Hero View
    'hero.title': {
      en: 'Shawn XZ Wang',
      zh: '<span class="char-sm">敏而好</span><span class="char-lg">学</span><span class="char-comma">，</span><span class="char-lg">智</span><span class="char-sm">者不惑</span>'
    },

    // Nav Items
    'nav.home': { en: 'Home', zh: '主页' },
    'nav.portfolio': { en: 'Portfolio', zh: '作品集' },
    'nav.journey': { en: 'My Journey', zh: '职业生平' },
    'nav.blog': { en: 'My Blog', zh: '技术博客' },
    'nav.about': { en: 'About Me', zh: '关于我' },
    'nav.guestbook': { en: 'Guestbook', zh: '留言板' },
    'nav.contact': { en: 'Contact', zh: '联系我' },

    // Section Headings
    'heading.portfolio': { en: 'Portfolio', zh: '作品集' },
    'heading.journey': { en: 'My Journey', zh: '职业生平' },
    'heading.blog': { en: 'Blogs on Medium', zh: '技术博客' },
    'heading.about': { en: 'About Me', zh: '关于我' },
    'heading.guestbook': { en: 'Guestbook', zh: '留言板' },

    // Guestbook UI
    'guestbook.subtitle': {
      en: 'Leave an anonymous thought, a digital footprint, or reply to fellow wanderers.',
      zh: '雁过留痕，风过留声。欢迎留下匿名寄语，或与同行的旅者隔空对话。'
    },
    'guestbook.btn_post': { en: 'Post Message', zh: '发送留言' },
    'guestbook.stream_title': { en: 'Public Echoes', zh: '公共留言流' },
    'guestbook.nick_ph': { en: 'Anonymous Wanderer (Nickname)', zh: '匿名水手 (可自定义昵称)' },
    'guestbook.msg_ph': { en: 'Write a public message...', zh: '写下一句留言吧...' },
    'guestbook.open_drawer': { en: 'Open Drawer View (Option 3)', zh: '打开抽屉视图 (Option 3)' },
    'guestbook.drawer_title': { en: 'Guestbook · All Messages', zh: '留言板 · 完整列表' },
    'guestbook.compose_title': { en: 'Leave a Message', zh: '留下你的印记' },
    'guestbook.pill_label': { en: 'Guestbook', zh: '留言板' },
    'guestbook.teaser_text': { en: 'Say hi! Leave a message 💬', zh: '留个言呗 💬' },
    'guestbook.translate_btn': { en: 'Translate', zh: '翻译' },
    'guestbook.translating': { en: 'Translating...', zh: '翻译中...' },
    'guestbook.translate_hide': { en: 'Hide translation', zh: '收起翻译' },
    'guestbook.translate_failed': { en: 'Translation failed', zh: '翻译失败' },
    'guestbook.translate_need_key': { en: 'Gemini API Key required in config', zh: '请先在配置中填入 Gemini API Key' },

    // Hero Subtitle static text if needed
    'hero.static_role': { en: 'Software Developer / System Analyst', zh: '软件工程师 / 系统分析师' },

    // Portfolio Cards
    'portfolio.p1.title': { en: 'Digital Historical Maps of Southeast Asia', zh: '东南亚历史数字地图平台' },
    'portfolio.p1.desc': {
      en: "The Digital Historical Maps of Singapore and Southeast Asia project is funded by Singapore's Ministry of Education Social Science Research (SSR) Thematic Grant. The platform seeks to enhance public and scholarly access to and understanding of historic maps of Southeast Asia.",
      zh: '新加坡与东南亚历史数字地图项目，获新加坡教育部社科研究基金资助。致力于为公众与学者提供高品质历史地图的交互探索、数字人文检索与空间分析。'
    },
    'portfolio.p2.title': { en: 'PixPlot', zh: 'PixPlot 大规模图像三维聚类可视化' },
    'portfolio.p2.desc': {
      en: 'This page visualizes a large image collection within an interactive WebGL scene. Each image was processed with an Inception Convolutional Neural Network, trained on ImageNet 2012, and projected into a two-dimensional manifold with the UMAP algorithm such that similar images appear proximate to one another.',
      zh: '在三维交互式 WebGL 场景中对大规模图像集进行降维聚类展示。利用 Inception 卷积神经网络提取深度特征，并通过 UMAP 算法映射至二维流形空间，实现高维视觉相似度可视化。'
    },
    'portfolio.p3.title': { en: 'School Management System', zh: '智慧教务管理系统' },
    'portfolio.p3.desc': {
      en: 'A management system built with Java Spring Boot & MySQL.',
      zh: '基于 Java Spring Boot 与 MySQL 构建的全功能教务与学生综合信息管理系统。'
    },
    'portfolio.p4.title': { en: 'A Logistic System', zh: '智能云端物流仓储系统' },
    'portfolio.p4.desc': {
      en: 'A logistic system built with .Net Framework & MSSQL.',
      zh: '基于 .NET 框架与 MSSQL 企业级数据库构建的物流运输、仓储调配及跟踪管理系统。'
    },
    'portfolio.p5.title': { en: 'An E-commerce Shop', zh: '在线电商商城平台' },
    'portfolio.p5.desc': {
      en: 'An E-commerce Shop built with .Net Framework & MSSQL.',
      zh: '基于 .NET 架构与 MSSQL 实现的电商商城，涵盖商品目录、订单支付与后台库存联动。'
    },

    // Journey Cards
    'journey.j1.company': { en: 'Yale-NUS College', zh: '耶鲁-新加坡国大学院' },
    'journey.j1.title': { en: 'Software Developer', zh: '高级软件工程师' },
    'journey.j1.period': { en: 'Sep 2020 - Present', zh: '2020年9月 - 至今' },
    'journey.j1.desc': {
      en: 'As the main software developer, utilises the knowledge in Ruby on Rails, Solr, and the International Interoperability Image Framework (IIIF) in concert with his skills in JavaScript, Python to develop the <a href="https://historicalmaps.yale-nus.edu.sg" target="_blank">Digital Historical Maps</a> platform.',
      zh: '作为核心主导开发工程师，运用 Ruby on Rails、Apache Solr、国际图像互操作框架 (IIIF) 以及 JavaScript 与 Python，全栈设计并落地 <a href="https://historicalmaps.yale-nus.edu.sg" target="_blank">Digital Historical Maps</a> 数字人文平台。'
    },

    'journey.j2.company': { en: 'EON Reality', zh: '美国弈恩虚拟现实科技' },
    'journey.j2.title': { en: '.Net Developer Intern', zh: '.NET 开发实习工程师' },
    'journey.j2.period': { en: 'Mar 2020 - Jul 2020', zh: '2020年3月 - 2020年7月' },
    'journey.j2.desc': {
      en: 'Worked in an Agile team of .NET developers for the continuously evolving AVR Portal website.',
      zh: '深度参与敏捷开发团队，负责核心 AVR Portal 平台的 .NET 微服务功能迭代与代码演进。'
    },

    'journey.j3.name1': { en: 'National University', zh: '新加坡国立大学' },
    'journey.j3.name2': { en: 'of Singapore', zh: '（NUS）' },
    'journey.j3.title': { en: 'Full time student', zh: '硕士全日制学生' },
    'journey.j3.period': { en: 'Jul 2019 - Jul 2020', zh: '2019年7月 - 2020年7月' },
    'journey.j3.desc': {
      en: 'Graduate Diploma in System Analysis. Code, test and implement proposed solution in C#, ASP MVC, Java, Python and Android. Agile and CI/CD Practices. Systematically analyse and design feasible IT solutions.',
      zh: '系统分析专业研究生文凭。熟练掌握 C#、ASP MVC、Java、Python 及 Android 开发与测试，深入践行敏捷协作与 CI/CD 自动化构建，系统化设计落地的企业级 IT 解决方案。'
    },

    'journey.j4.company': { en: 'Lubrizol Management', zh: '路博润管理（Lubrizol）' },
    'journey.j4.title': { en: 'Market Development Manager', zh: '市场业务拓展经理' },
    'journey.j4.period': { en: 'Feb 2015 - Feb 2018', zh: '2015年2月 - 2018年2月' },
    'journey.j4.desc': {
      en: 'With excellent analysis skills, successfully identified and commercialized new business opportunity in automotive industry and furniture decorative industry. Outstanding Service Award in 2016.',
      zh: '凭借敏锐的数据洞察与商业分析能力，成功开拓汽车与家居装饰领域的关键新业务增长点，荣获 2016 年度卓越服务奖。'
    },

    'journey.j5.company': { en: 'Arkema Investment', zh: '阿科玛投资（Arkema）' },
    'journey.j5.title': { en: 'Sales Manager', zh: '大区销售经理' },
    'journey.j5.period': { en: 'Aug 2008 - Jan 2015', zh: '2008年8月 - 2015年1月' },
    'journey.j5.desc': {
      en: "Manage the glass coating business in China mainland. Organize and provide technical support to CVD project's installation and commissioning.Outstanding Service Award in 2012.",
      zh: '主管中国大陆区特种玻璃镀膜业务，统筹组织化学气相沉积 (CVD) 大型工程的安装实施与技术调试，荣获 2012 年度卓越服务奖。'
    },

    'journey.j6.company': { en: 'Connell Bros. Co.', zh: '美国科耐欧贸易（Connell Bros.）' },
    'journey.j6.title': { en: 'Sales Executive', zh: '业务拓展主管' },
    'journey.j6.period': { en: 'May 2006 - Aug 2008', zh: '2006年5月 - 2008年8月' },
    'journey.j6.desc': {
      en: 'Promote functional additives of coating, ink & adhesive in north China. Introduce high value added chemicals into market.',
      zh: '主导华北区涂料、油墨及胶粘剂功能性助剂的市场推广，将高附加值精细化工产品成功导入行业主流客户群。'
    },

    'journey.j7.company': { en: 'NCM Chemical Co.,Ltd', zh: '和氏璧化工' },
    'journey.j7.title': { en: 'Technical Sales Engineer', zh: '技术销售工程师' },
    'journey.j7.period': { en: 'Oct 2003 - Apr 2006', zh: '2003年10月 - 2006年4月' },
    'journey.j7.desc': {
      en: 'Promote functional additives of coating, ink & adhesive in north China.',
      zh: '负责华北地区工业功能性特种助剂的深度技术营销与客户解决方案定制。'
    },

    'journey.j8.company': { en: 'Sinopec Yanshan', zh: '中国石化北京燕山' },
    'journey.j8.title': { en: 'Research Specialist', zh: '材料研发工程师' },
    'journey.j8.period': { en: 'Jul 2001 - Sep 2003', zh: '2001年7月 - 2003年9月' },
    'journey.j8.desc': {
      en: 'Develop new rubber products, optimize formula and process. Familiar with high molecular lab instrument.',
      zh: '负责新型合成橡胶配方研发与工艺流程改良，精通高分子材料实验表征与性能测试。'
    },

    'journey.j9.company': { en: 'Chongqing University', zh: '重庆大学' },
    'journey.j9.title': { en: 'Full time student', zh: '理学全日制本科' },
    'journey.j9.period': { en: 'Sep 1997 - Jul 2001', zh: '1997年9月 - 2001年7月' },
    'journey.j9.desc': {
      en: 'Bachelor of Science in Chemistry',
      zh: '应用化学专业理学学士学位'
    },

    // About Me Cards
    'about.c1.title': { en: 'Software Developer', zh: '软件工程师' },
    'about.c1.p1': { en: 'Make it work,', zh: '实现功能，' },
    'about.c1.p2': { en: 'make it right,', zh: '确保优雅，' },
    'about.c1.p3': { en: 'make it fast.', zh: '追求卓越。' },

    'about.c2.title': { en: 'System Analyst', zh: '系统分析师' },
    'about.c2.p1': { en: 'Discovering simplicity', zh: '在纷繁复杂的' },
    'about.c2.p2': { en: 'in this', zh: '现实世界中' },
    'about.c2.p3': { en: 'complex world.', zh: '探寻纯粹与秩序。' },

    'about.c3.title': { en: 'Cyclist', zh: '追风者' },
    'about.c3.p1': { en: 'Keep moving', zh: '保持向前，' },
    'about.c3.p2': { en: 'to stay', zh: '方能时刻' },
    'about.c3.p3': { en: 'balanced.', zh: '稳健平衡。' },

    'about.c4.title': { en: 'Photographer', zh: '光影客' },
    'about.c4.p1': { en: 'The Earth is Art,', zh: '所在皆是艺术，' },
    'about.c4.p2': { en: 'The Photographer', zh: '摄影师只是' },
    'about.c4.p3': { en: 'is the Witness.', zh: '见证者。' },

    'about.c5.title': { en: 'Reader', zh: '阅读者' },
    'about.c5.p1': { en: 'Hoc est simplicissimus,', zh: '贤集风亭月榭之所' },
    'about.c5.p2': { en: 'porque estoy loco.', zh: '雅汇帘杏溪桃之乡，' },
    'about.c5.p3': { en: '', zh: '何当醉飞吟盏之时，' },
    'about.c5.p4': { en: '', zh: '试问，孰与' },
    'about.c5.p5': { en: '', zh: '执此‘狂狷朴愚’之杯' },

    'about.c6.title': { en: 'Sailor', zh: '水手' },
    'about.c6.p1': { en: 'Seeking gales as treasure,', zh: '脚下是比蓝天更清澈的碧波，' },
    'about.c6.p2': { en: 'As if the tempests give a rest.', zh: '头顶是金色的灿烂阳光，' },
    'about.c6.p3': { en: '', zh: '而他，不安的，在祈求风暴，' },
    'about.c6.p4': { en: '', zh: '仿佛在风暴中，' },
    'about.c6.p5': { en: '', zh: '才有着安详' },

    'about.c7.title': { en: 'Bard', zh: '游吟诗人' },
    'about.c7.p1': { en: 'In cruel Age,', zh: '我用竖琴' },
    'about.c7.p2': { en: 'I sang of Liberty and Justice', zh: '为弱者吁求同情,' },
    'about.c7.p3': { en: 'in her blindness.', zh: '在残酷的年代，' },
    'about.c7.p4': { en: '', zh: '歌颂自由，' },
    'about.c7.p5': { en: '', zh: '唤醒善良。' },

    // Terminal
    'terminal.title': {
      en: 'bash — shawn@station: ~/contact',
      zh: 'bash — shawn@station: ~/联系我'
    },
    'terminal.status': { en: 'ONLINE', zh: '在线' },
    'contact.btn': { en: "./contact", zh: "./联系" },
    'contact.btn_ready': { en: "Let's talk", zh: "开始沟通" }
  };

  // Chinese & English Words for Hero Typewriter
  var wordsEn = [
    'Software Developer',
    'Certified AWS DevOps',
    'Certified Kubernetes Administrator',
    'System Analyst',
    'Cyclist',
    'Photographer'
  ];

  var wordsZh = [
    '全栈软件工程师',
    'AWS 认证 DevOps 专家',
    'CKA 认证 Kubernetes 管理员',
    '系统架构分析师',
    '骑行者',
    '摄影师'
  ];

  // Terminal boot script lines in EN and ZH
  var terminalLinesEn = [
    { type: 'cmd', prompt: 'shawn@station:~$', text: 'systemctl boot contact-service.sh' },
    { type: 'info', prefix: '[ OK ]', text: 'Initiating quantum handshake protocol...' },
    { type: 'info', prefix: '[ OK ]', text: 'Secure communication channel established.' },
    { type: 'info', prefix: '[READY]', text: 'Looking for visionary collaborators & new ventures.' },
    { type: 'cmd', prompt: 'shawn@station:~$', text: './contact --execute' }
  ];

  var terminalLinesZh = [
    { type: 'cmd', prompt: 'shawn@station:~$', text: 'systemctl boot contact-service.sh' },
    { type: 'info', prefix: '[ 成功 ]', text: '正在初始化安全通信协议握手...' },
    { type: 'info', prefix: '[ 成功 ]', text: '高可靠加密信道连接已建立。' },
    { type: 'info', prefix: '[就绪]', text: '欢迎探索前瞻合作、技术架构探讨与全新机遇。' },
    { type: 'cmd', prompt: 'shawn@station:~$', text: './contact --execute' }
  ];

  function applyLanguage(lang) {
    var isZh = (lang === 'zh');

    // Update document element lang attribute
    document.documentElement.lang = isZh ? 'zh-CN' : 'en';

    // Apply translations on all elements with data-i18n
    var elements = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      var key = el.getAttribute('data-i18n');
      if (i18nData[key]) {
        var translation = isZh ? i18nData[key].zh : i18nData[key].en;
        // Use innerHTML to preserve hyperlinks, else textContent
        if (translation.indexOf('<') !== -1) {
          el.innerHTML = translation;
        } else {
          el.textContent = translation;
        }
      }
    }

    // Apply translations for placeholders with data-i18n-ph
    var phElements = document.querySelectorAll('[data-i18n-ph]');
    for (var j = 0; j < phElements.length; j++) {
      var pEl = phElements[j];
      var phKey = pEl.getAttribute('data-i18n-ph');
      if (i18nData[phKey]) {
        pEl.placeholder = isZh ? i18nData[phKey].zh : i18nData[phKey].en;
      }
    }

    if (window.updateGuestbookLanguage) {
      window.updateGuestbookLanguage();
    }

    // Update contact button text if not yet transformed or if ready
    var btn = document.getElementById('contactBootBtn');
    var btnText = document.getElementById('contactBtnText');
    if (btn && btnText) {
      if (btn.classList.contains('btn-ready')) {
        btnText.textContent = isZh ? i18nData['contact.btn_ready'].zh : i18nData['contact.btn_ready'].en;
      } else {
        btnText.textContent = isZh ? i18nData['contact.btn'].zh : i18nData['contact.btn'].en;
      }
    }

    // Update Language Toggle Pill UI State
    var langToggleBtn = document.getElementById('langToggleBtn');
    var langThumb = document.getElementById('langToggleThumb');
    var langIcon = document.getElementById('langToggleIcon');

    if (langThumb) {
      if (isZh) {
        langThumb.classList.add('lang-zh');
      } else {
        langThumb.classList.remove('lang-zh');
      }
    }

    if (langIcon) {
      // Toggle between English 'EN' / globe and Chinese character '中'
      langIcon.textContent = isZh ? '中' : 'EN';
    }

    if (langToggleBtn) {
      langToggleBtn.setAttribute('title', isZh ? '切换为英文 (Switch to English)' : '切换为中文 (Switch to Chinese)');
      langToggleBtn.setAttribute('aria-label', isZh ? '切换为英文' : 'Switch to Chinese');
    }

    // Update global variables for main.js dynamic typewriter and terminal
    window.currentLanguage = lang;
    if (window.updateTypewriterLanguage) {
      window.updateTypewriterLanguage(isZh ? wordsZh : wordsEn, isZh);
    }
  }

  // Expose helper to get localized terminal lines
  window.getTerminalScriptLines = function () {
    return (window.currentLanguage === 'zh') ? terminalLinesZh : terminalLinesEn;
  };
  window.getHeroTypewriterWords = function () {
    return (window.currentLanguage === 'zh') ? { words: wordsZh, isZh: true } : { words: wordsEn, isZh: false };
  };

  function initLang() {
    var savedLang = localStorage.getItem(STORAGE_KEY) || 'en';
    applyLanguage(savedLang);

    var langToggleBtn = document.getElementById('langToggleBtn');
    if (langToggleBtn) {
      langToggleBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var currentLang = (document.documentElement.lang === 'zh-CN') ? 'zh' : 'en';
        var nextLang = (currentLang === 'zh') ? 'en' : 'zh';
        try {
          localStorage.setItem(STORAGE_KEY, nextLang);
        } catch (err) {
          // Ignore storage quota
        }
        applyLanguage(nextLang);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLang);
  } else {
    initLang();
  }
})();
