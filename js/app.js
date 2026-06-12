const STORE='lawncare.v22.data';
const SETTINGS='lawncare.v22.settings';

let data={logs:[],comparisons:[],feedback:[]};
let settings={lang:'zh',large:false};

const $=id=>document.getElementById(id);
const $$=sel=>Array.from(document.querySelectorAll(sel));

const navItems=[
  ['home','🏠','home'],
  ['today','✅','today'],
  ['guide','🔍','guide'],
  ['log','📸','log'],
  ['compare','🖼️','compare'],
  ['report','📋','report'],
  ['feedback','💬','feedback'],
  ['versions','🧾','versions'],
  ['settings','⚙️','settings']
];

const zh={
  appTitle:'草坪护理助手',tagline:'今天该做什么、如何记录证据、怎么给 HOA 解释，一步一步来。',
  settings:'设置',largeText:'大字模式',home:'首页',today:'今日',guide:'查问题',log:'记录',compare:'对比',report:'报告',feedback:'反馈',versions:'版本记录',versionLog:'版本记录',
  v22:'V2.2 产品体验',v221:'V2.2.1 产品体验',homeTitle:'四个动作，让护理更简单',homeCopy:'这个版本继续保持非 AI 优先：先把今日任务、问题判断、HOA 记录和进度对比做好。',
  todayTask:'今天该做什么',todayDesc:'按月份显示重点任务',problemGuide:'查草坪问题',guideDesc:'手动症状清单',addRecord:'添加 HOA 记录',logDesc:'日期、操作、照片',
  beforeAfter:'前后对比',compareDesc:'证明进步最直观',hoaReport:'HOA 报告',reportDesc:'打印、复制、导出',settingsDesc:'语言和大字模式',versionLogDesc:'查看每次发布改进',latestReleaseTitle:'V2.2.1：更容易找到语言切换',latestReleaseCopy:'语言按钮已移动到首页，版本记录也新增为正式页面，方便追踪产品演进。',v221Item1:'首页新增中文 / English 语言切换。',v221Item2:'新增浏览器插件风格的版本记录页面。',v221Item3:'新增最新发布提示卡片。',v22Item1:'新增中文 / English 设置。',v22Item2:'新增前后对比工作流。',v22Item3:'改进 HOA 报告摘要与备份导出。',v21Item1:'大字模式改为开关样式。',v21Item2:'新增反馈页面。',v20Item1:'移除未启用的 AI 流程。',v20Item2:'建立非 AI 优先的 HOA 记录产品方向。',
  principlesTitle:'产品原则',principle1:'首页只保留少数高频动作，减少迷路。',principle2:'先提供稳定可用的非 AI 流程。',principle3:'每次护理都能沉淀为 HOA 证据。',
  todayTitle:'今天的重点任务',guideTitle:'手动草坪问题判断',chooseProblem:'选择你看到的问题',logTitle:'添加护理记录',
  date:'日期',type:'类型',actionTaken:'做了什么',area:'位置',notes:'备注',photoOptional:'照片证据（可选）',saveRecord:'保存记录',
  compareTitle:'前后对比',compareHelp:'上传同一区域的“之前”和“现在”照片，用来向 HOA 展示改善。',beforePhoto:'之前照片',afterPhoto:'现在照片',comparisonNote:'对比说明',saveComparison:'保存对比',
  reportTitle:'HOA 进度报告',records:'记录',photos:'照片',comparisons:'对比',summary:'摘要',copySummary:'复制摘要',printReport:'打印 / 保存 PDF',exportData:'导出备份',
  feedbackTitle:'反馈与改进建议',feedbackType:'反馈类型',difficulty:'使用难度',title:'标题',details:'详细说明',saveFeedback:'保存反馈',
  settingsTitle:'设置',language:'语言',accessibility:'辅助功能',about:'关于',aboutCopy:'V2.2 是非 AI 优先版本：先让护理、记录、对比和 HOA 报告稳定可用。'
};

const en={
  appTitle:'Lawn Care Assistant',tagline:'Know what to do today, keep proof, and explain progress to the HOA step by step.',
  settings:'Settings',largeText:'Large Text',home:'Home',today:'Today',guide:'Problems',log:'Records',compare:'Compare',report:'Report',feedback:'Feedback',versions:'Version Log',versionLog:'Version Log',
  v22:'V2.2 Product Experience',v221:'V2.2.1 Product Experience',homeTitle:'Four actions make lawn care simple',homeCopy:'This release remains non-AI first: daily tasks, manual problem checks, HOA records, and visible progress.',
  todayTask:"Today's Task",todayDesc:'Seasonal priority tasks',problemGuide:'Check Lawn Problem',guideDesc:'Manual symptom guide',addRecord:'Add HOA Record',logDesc:'Date, action, photo',
  beforeAfter:'Before / After',compareDesc:'Show progress clearly',hoaReport:'HOA Report',reportDesc:'Print, copy, export',settingsDesc:'Language and large text',versionLogDesc:'Review each product update',latestReleaseTitle:'V2.2.1: Language switching is easier to find',latestReleaseCopy:'Language controls moved to the home page, and a version log page now tracks product improvements.',v221Item1:'Added Chinese / English switch to the home page.',v221Item2:'Added a browser-plugin-style version log page.',v221Item3:'Added latest-release highlight card.',v22Item1:'Added Chinese / English settings.',v22Item2:'Added before / after comparison workflow.',v22Item3:'Improved HOA summary and backup export.',v21Item1:'Converted large text into a switch control.',v21Item2:'Added feedback page.',v20Item1:'Removed non-enabled AI flows.',v20Item2:'Established non-AI-first HOA record workflow.',
  principlesTitle:'Product Principles',principle1:'Keep only a few frequent actions on the home screen.',principle2:'Provide stable non-AI workflows first.',principle3:'Every care action becomes HOA evidence.',
  todayTitle:"Today's Priority Tasks",guideTitle:'Manual Lawn Problem Guide',chooseProblem:'Choose what you see',logTitle:'Add Care Record',
  date:'Date',type:'Type',actionTaken:'What did you do?',area:'Area',notes:'Notes',photoOptional:'Photo evidence optional',saveRecord:'Save Record',
  compareTitle:'Before / After Comparison',compareHelp:'Upload before and current photos from the same area to show progress to the HOA.',beforePhoto:'Before photo',afterPhoto:'Current photo',comparisonNote:'Comparison note',saveComparison:'Save Comparison',
  reportTitle:'HOA Progress Report',records:'Records',photos:'Photos',comparisons:'Comparisons',summary:'Summary',copySummary:'Copy Summary',printReport:'Print / Save PDF',exportData:'Export Backup',
  feedbackTitle:'Feedback and Improvements',feedbackType:'Feedback Type',difficulty:'Difficulty',title:'Title',details:'Details',saveFeedback:'Save Feedback',
  settingsTitle:'Settings',language:'Language',accessibility:'Accessibility',about:'About',aboutCopy:'V2.2 is non-AI first: care, records, comparisons, and HOA reports should work reliably first.'
};

const tasks={
  zh:[
    ['割草','保持 1–1.5 英寸，不要一次剪太多。'],
    ['浇水','早晨深浇，避免傍晚浇水。'],
    ['观察杂草','发现问题先拍照再处理。'],
    ['记录证据','每次护理后保存一条 HOA 记录。']
  ],
  en:[
    ['Mow','Keep Bermuda around 1–1.5 inches and avoid cutting too much at once.'],
    ['Water','Water deeply in the morning, not late evening.'],
    ['Check weeds','Take photos before treatment.'],
    ['Keep proof','Save an HOA record after each care action.']
  ]
};

const problemData={
  buttonweed:['Virginia Buttonweed','Low spreading weed with small thick leaves and possible white flowers. Record photos and use a Bermuda-safe broadleaf product by label.'],
  crabgrass:['Crabgrass','Light green coarse grass, often in bare spots. Prevention with pre-emergent is usually key.'],
  nutsedge:['Nutsedge','Fast-growing yellow-green blades. Do not hand pull; use a nutsedge-specific product by label.'],
  brownpatch:['Brown Patch','Circular yellow or brown areas in humid weather. Adjust watering to morning and consider fungicide by label.'],
  drought:['Drought Stress','Gray color and footprints that do not rebound. Test irrigation coverage and deep water.'],
  thin:['Thin Lawn','Bare or sparse areas may need light, soil, drainage, or compaction improvements.']
};

const labels={mow:'Mow / 割草',water:'Water / 浇水',fertilize:'Fertilize / 施肥',weed:'Weed / 除草',disease:'Disease / 病害',photo:'Photo / 照片',general:'General / 其他'};

function tr(key){return (settings.lang==='en'?en:zh)[key] || key;}
function todayString(){const d=new Date();d.setMinutes(d.getMinutes()-d.getTimezoneOffset());return d.toISOString().slice(0,10);}
function escapeHtml(value){return String(value||'').replace(/[&<>]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[m]));}
function load(){try{data={...data,...JSON.parse(localStorage.getItem(STORE)||'{}')};}catch{}try{settings={...settings,...JSON.parse(localStorage.getItem(SETTINGS)||'{}')};}catch{}}
function save(){localStorage.setItem(STORE,JSON.stringify(data));localStorage.setItem(SETTINGS,JSON.stringify(settings));}
function readFile(input,callback){const file=input.files&&input.files[0];if(!file){callback('');return;}const reader=new FileReader();reader.onload=e=>callback(e.target.result);reader.readAsDataURL(file);}

function setupNav(){
  $('topNav').innerHTML=navItems.map(([id,icon,key])=>`<button data-go="${id}" type="button">${icon} ${tr(key)}</button>`).join('');
  $('bottomNav').innerHTML=navItems.slice(0,5).map(([id,icon,key])=>`<button data-go="${id}" type="button">${icon}<span>${tr(key)}</span></button>`).join('');
  setActiveNav('home');
}

function setActiveNav(id){$$('[data-go]').forEach(btn=>btn.classList.toggle('active',btn.dataset.go===id));}
function navigate(id){$$('.panel').forEach(panel=>panel.classList.remove('active'));$(id).classList.add('active');setActiveNav(id);window.scrollTo({top:0,behavior:'smooth'});}

function applyLanguage(){
  document.documentElement.lang=settings.lang==='en'?'en':'zh-CN';
  $$('[data-i18n]').forEach(el=>{el.textContent=tr(el.dataset.i18n);});
  setupNav();
  renderAll();
}

function updateLanguageButtons(){
  $$('.lang-btn,.segment').forEach(btn=>btn.classList.toggle('active-lang',btn.dataset.lang===settings.lang));
}

function updateSwitches(){
  document.body.classList.toggle('large',settings.large);
  ['largeTextToggle','largeTextToggleSettings'].forEach(id=>{
    const btn=$(id);
    if(!btn)return;
    btn.setAttribute('aria-checked',String(settings.large));
    const state=btn.querySelector('.switch-state');
    if(state)state.textContent=settings.large?'ON':'OFF';
  });
}

function renderToday(){
  $('dateLabel').textContent=new Date().toLocaleDateString(settings.lang==='en'?'en-US':'zh-CN',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
  $('seasonBox').innerHTML='<strong>'+(settings.lang==='en'?'Season note:':'本月提醒：')+'</strong> '+(settings.lang==='en'?'Keep a steady care rhythm and save photo proof for HOA progress.':'保持稳定护理节奏，并保存照片证据，用于 HOA 说明。');
  $('taskList').innerHTML=tasks[settings.lang].map((task,index)=>`
    <article class="item">
      <div class="item-meta">${index+1}</div>
      <h3>${escapeHtml(task[0])}</h3>
      <p>${escapeHtml(task[1])}</p>
      <button class="primary" type="button" data-task="${index}">${tr('saveRecord')}</button>
    </article>
  `).join('');
}

function renderProblem(){
  const problem=problemData[$('problem').value];
  $('problemOutput').innerHTML=`
    <h3>${escapeHtml(problem[0])}</h3>
    <p>${escapeHtml(problem[1])}</p>
    <button class="primary" id="saveProblem" type="button">${tr('saveRecord')}</button>
  `;
}

function renderLogs(){
  $('logList').innerHTML=data.logs.length?data.logs.map(entry=>`
    <article class="item">
      <div class="item-meta">${escapeHtml(entry.date)} · ${escapeHtml(labels[entry.type]||entry.type)}</div>
      <h3>${escapeHtml(entry.action)}</h3>
      ${entry.area?`<p><strong>${tr('area')}:</strong> ${escapeHtml(entry.area)}</p>`:''}
      ${entry.notes?`<p>${escapeHtml(entry.notes)}</p>`:''}
      ${entry.photo?`<img class="preview show" src="${entry.photo}" alt="">`:''}
    </article>
  `).join(''):`<div class="card">${settings.lang==='en'?'No records yet.':'暂无记录。'}</div>`;
}

function renderComparisons(){
  $('compareList').innerHTML=data.comparisons.length?data.comparisons.map(comp=>`
    <article class="item">
      <div class="item-meta">${escapeHtml(comp.date)}</div>
      <h3>${tr('compareTitle')}</h3>
      ${comp.note?`<p>${escapeHtml(comp.note)}</p>`:''}
      <div class="two">
        ${comp.before?`<img class="preview show" src="${comp.before}" alt="">`:''}
        ${comp.after?`<img class="preview show" src="${comp.after}" alt="">`:''}
      </div>
    </article>
  `).join(''):`<div class="card">${settings.lang==='en'?'No comparisons yet.':'暂无对比。'}</div>`;
}

function buildSummary(){
  if(!data.logs.length&&!data.comparisons.length)return settings.lang==='en'?'No care records yet.':'还没有护理记录。';
  return settings.lang==='en'
    ? `There are ${data.logs.length} care records, ${data.logs.filter(x=>x.photo).length} photo records, and ${data.comparisons.length} before/after comparisons documenting lawn-care progress.`
    : `目前共有 ${data.logs.length} 条护理记录、${data.logs.filter(x=>x.photo).length} 条照片记录、${data.comparisons.length} 组前后对比，用于说明草坪护理进展。`;
}

function renderReport(){
  $('statLogs').textContent=data.logs.length;
  $('statPhotos').textContent=data.logs.filter(entry=>entry.photo).length;
  $('statComparisons').textContent=data.comparisons.length;
  $('summaryText').textContent=buildSummary();
  const merged=[
    ...data.logs.map(x=>({...x,kind:'log'})),
    ...data.comparisons.map(x=>({...x,kind:'comparison',action:tr('compareTitle')}))
  ].sort((a,b)=>String(b.date).localeCompare(String(a.date)));
  $('reportTimeline').innerHTML=merged.length?merged.map(item=>`
    <article class="item">
      <div class="item-meta">${escapeHtml(item.date)} · ${escapeHtml(item.kind)}</div>
      <h3>${escapeHtml(item.action||tr('compareTitle'))}</h3>
      ${item.notes?`<p>${escapeHtml(item.notes)}</p>`:''}
      ${item.note?`<p>${escapeHtml(item.note)}</p>`:''}
    </article>
  `).join(''):'';
}

function renderFeedback(){
  $('feedbackList').innerHTML=data.feedback.length?data.feedback.map(item=>`
    <article class="item">
      <div class="item-meta">${escapeHtml(item.date)} · ${escapeHtml(item.type)} · ${escapeHtml(item.ease)}</div>
      <h3>${escapeHtml(item.title)}</h3>
      ${item.note?`<p>${escapeHtml(item.note)}</p>`:''}
    </article>
  `).join(''):`<div class="card">${settings.lang==='en'?'No feedback yet.':'暂无反馈。'}</div>`;
}

function renderAll(){
  renderToday();
  renderProblem();
  renderLogs();
  renderComparisons();
  renderReport();
  renderFeedback();
  updateSwitches();
  updateLanguageButtons();
}

function exportBackup(){
  const blob=new Blob([JSON.stringify({version:'2.2',exportedAt:new Date().toISOString(),data,settings},null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;
  a.download='lawncare-backup-'+todayString()+'.json';
  a.click();
  URL.revokeObjectURL(url);
}

document.addEventListener('DOMContentLoaded',()=>{
  load();
  setupNav();
  applyLanguage();
  $('logDate').value=todayString();

  document.body.addEventListener('click',event=>{
    const navButton=event.target.closest('[data-go]');
    if(navButton)navigate(navButton.dataset.go);

    const taskButton=event.target.closest('[data-task]');
    if(taskButton){
      const task=tasks[settings.lang][Number(taskButton.dataset.task)];
      data.logs.unshift({date:todayString(),type:'general',action:task[0],notes:task[1],area:'',photo:''});
      save();
      renderAll();
      navigate('report');
    }

    if(event.target.id==='saveProblem'){
      const problem=problemData[$('problem').value];
      data.logs.unshift({date:todayString(),type:$('problem').value==='brownpatch'?'disease':'weed',action:problem[0],notes:problem[1],area:'',photo:''});
      save();
      renderAll();
      navigate('log');
    }
  });

  ['largeTextToggle','largeTextToggleSettings'].forEach(id=>{
    $(id).addEventListener('click',()=>{
      settings.large=!settings.large;
      save();
      updateSwitches();
    });
  });

  $$('.lang-btn,.segment').forEach(btn=>btn.addEventListener('click',()=>{
    settings.lang=btn.dataset.lang;
    save();
    applyLanguage();
  }));

  $('problem').addEventListener('change',renderProblem);

  $('logPhoto').addEventListener('change',()=>readFile($('logPhoto'),value=>{
    $('photoPreview').src=value;
    $('photoPreview').classList.toggle('show',Boolean(value));
  }));

  $('logForm').addEventListener('submit',event=>{
    event.preventDefault();
    readFile($('logPhoto'),photo=>{
      data.logs.unshift({
        date:$('logDate').value||todayString(),
        type:$('logType').value,
        action:$('logAction').value.trim(),
        area:$('logArea').value.trim(),
        notes:$('logNotes').value.trim(),
        photo
      });
      save();
      $('logForm').reset();
      $('logDate').value=todayString();
      $('photoPreview').classList.remove('show');
      renderAll();
      navigate('report');
    });
  });

  $('beforePhoto').addEventListener('change',()=>readFile($('beforePhoto'),value=>{
    $('beforeImg').src=value;
    $('beforeImg').classList.toggle('show',Boolean(value));
  }));

  $('afterPhoto').addEventListener('change',()=>readFile($('afterPhoto'),value=>{
    $('afterImg').src=value;
    $('afterImg').classList.toggle('show',Boolean(value));
  }));

  $('saveCompare').addEventListener('click',()=>{
    data.comparisons.unshift({
      date:todayString(),
      before:$('beforeImg').src||'',
      after:$('afterImg').src||'',
      note:$('compareNote').value.trim()
    });
    save();
    $('compareNote').value='';
    renderAll();
    navigate('report');
  });

  $('feedbackForm').addEventListener('submit',event=>{
    event.preventDefault();
    data.feedback.unshift({
      date:todayString(),
      type:$('feedbackType').value,
      ease:$('feedbackEase').value,
      title:$('feedbackTitleInput').value.trim(),
      note:$('feedbackNote').value.trim()
    });
    save();
    $('feedbackForm').reset();
    renderFeedback();
  });

  $('copySummary').addEventListener('click',async()=>{
    try{
      await navigator.clipboard.writeText(buildSummary());
      alert(settings.lang==='en'?'Copied.':'已复制。');
    }catch{
      prompt(settings.lang==='en'?'Copy this summary:':'复制这段说明：',buildSummary());
    }
  });

  $('printReport').addEventListener('click',()=>window.print());
  $('exportData').addEventListener('click',exportBackup);
});
