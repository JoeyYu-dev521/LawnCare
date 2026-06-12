const STORE='lawncare.v2.logs';
const SETTINGS='lawncare.v2.settings';
let logs=[];
let rating=0;
let photo='';
const $=id=>document.getElementById(id);
const labels={mow:'✂️ 割草',water:'💧 浇水',fertilize:'🌿 施肥',weed:'🌱 除草',disease:'🍄 病害',photo:'📸 照片',general:'📝 其他'};
const ratings={1:'😟 差',2:'😐 一般',3:'🙂 还好',4:'😊 良好',5:'🌟 很棒'};
const tasksByMonth={
0:['一月休眠期：少干扰，清理落叶，规划春季预防除草。',[['general','检查积水或长期阴湿区域','记录位置，春季再处理排水或土壤。'],['photo','拍一张休眠期照片','HOA 如有疑问，可以证明这是季节性休眠。']]],
1:['二月准备期：不要急着施肥，先准备春季计划。',[['general','检查喷灌系统和撒肥器','提前准备，避免三月手忙脚乱。'],['photo','记录冬末草坪状态','固定角度拍照，后面能看到返青过程。']]],
2:['三月启动期：重点是预防杂草，不要太早施高氮肥。',[['weed','考虑春季预防除草','按产品标签和土壤温度条件使用。'],['general','等待百慕大草自然返青','返青前不要过度施肥。']]],
3:['四月观察返青：先割草和观察，施肥不要过早。',[['mow','返青后恢复轻度割草','不要一次割掉太多草叶。'],['photo','拍照记录返青进度','对 HOA 说明季节变化很有帮助。']]],
4:['五月进入生长期：草坪绿起来后再开始加强。',[['fertilize','草坪大部分变绿后考虑第一次施肥','按产品标签用量，不要过量。'],['mow','建立固定割草节奏','百慕大草适合勤割、不要放太长。']]],
5:['六月旺盛生长期：重点是割草、浇水、杂草控制和记录。',[['mow','每 5–7 天割一次草','目标高度约 1–1.5 英寸，避免一次剪太多。'],['water','早晨深浇，避免傍晚浇水','傍晚湿度高，容易增加霉菌风险。'],['weed','检查 Virginia Buttonweed 等阔叶杂草','先确认症状，再按标签选择 Bermuda-safe 产品。'],['photo','拍一张前院整体照片','用于记录改善进度。']]],
6:['七月炎热潮湿：保持节奏，同时避免草坪承受过大压力。',[['mow','继续固定割草','刀片锋利，避免撕裂草叶。'],['disease','检查圆形黄斑或棕斑','发现后先记录照片，再考虑杀菌剂和浇水调整。'],['water','观察缺水信号','脚踩后不回弹、颜色发灰，说明可能需要深浇。']]],
7:['八月高温高湿：重点是防霉菌、少折腾、继续拍照。',[['disease','复查黄斑区域','看黄斑是否扩大，保存照片。'],['weed','复查已经处理过的杂草','不要频繁乱喷，按标签间隔处理。'],['photo','拍一组近照 + 远照','方便比较杂草是否减少。']]],
8:['九月收尾：停止高氮施肥，帮助草坪准备休眠。',[['fertilize','停止高氮肥','避免刺激晚季嫩长，影响过冬。'],['photo','整理本季照片记录','为 HOA 报告准备 before / after 证据。'],['general','减少浇水频率','根据天气和草坪状态调整。']]],
9:['十月准备休眠：草色变黄或变棕通常正常。',[['weed','考虑秋季预防除草','按标签使用，预防冬季杂草。'],['photo','记录开始休眠的变化','方便解释为什么草色变棕。']]],
10:['十一月休眠：减少浇水、施肥和割草。',[['general','清理落叶','避免落叶长期覆盖草坪。'],['photo','保留休眠期照片','HOA 如询问，可说明季节变化。']]],
11:['十二月休眠：保持整洁，不需要频繁护理。',[['general','检查裸土或冲刷区域','记录下来，春季再修复。'],['photo','拍一张冬季状态照片','证明草坪不是突然死亡，而是正常休眠。']]]
};
const problems={
buttonweed:['高优先级','Virginia Buttonweed / 弗吉尼亚纽扣草',['贴地爬行，容易形成一片','小而厚的对生叶','夏天可能出现小白花','手拔容易断根，后续继续长'],['先拍近照和远照','选择标签允许用于 Bermuda grass 的阔叶除草剂','通常需要多次复查','喷药前后按标签等待割草和浇水间隔'],'Bermuda-safe broadleaf weed killer；专业选项可研究 Celsius WG。以产品标签为准。'],
crabgrass:['预防优先','Crabgrass / 马唐草',['颜色较浅，叶片较粗','贴地或成簇扩散','夏季常见，裸土处更容易出现'],['先记录范围','重点放在春季和秋季 pre-emergent 预防','保持百慕大草密度，减少裸土'],'Pre-emergent 产品如 Scotts Halts 类；已长出的马唐需选择标签支持的 post-emergent。'],
nutsedge:['不要手拔','Nutsedge / 香附子、莎草类',['长得比周围草更快','颜色偏黄绿','茎可能呈三角形','割完很快又高出来'],['不要手拔','使用专门针对 nutsedge 的产品','记录 2 周后的变化'],'Nutsedge-specific 产品，如 SedgeHammer / Image 类。确认适合 Bermuda grass。'],
brownpatch:['湿热季节常见','Brown Patch / 霉菌黄斑',['圆形或不规则黄斑、棕斑','湿热天气后更明显','傍晚浇水或浇太频繁会加重'],['先调整浇水到清晨','不要傍晚浇水','拍照标记范围，看是否扩大','必要时使用草坪杀菌剂'],'Scotts DiseaseEx 或 BioAdvanced Fungus Control 类。按标签施用。'],
drought:['先浇水测试','缺水 / 干旱压力',['草色发灰或暗淡','脚踩后草叶不回弹','高处或坡地更明显'],['早晨深浇一次，观察 24–48 小时','用空罐测试浇水量是否均匀','记录喷灌覆盖不到的区域'],'通常不需要产品，先调整浇水覆盖和频率。'],
scalping:['割草调整','Scalping / 割草过低或地面不平',['刚割完后突然发黄','高低不平区域更明显','露出茎部或土面'],['下次不要一次剪太多','保持刀片锋利','地面不平区域后续考虑找平'],'通常不需要产品，先调整割草高度和频率。'],
thin:['找原因','稀疏 / 裸土 / 长不满',['局部露土','树荫下更明显','雨后积水或土壤硬'],['确认每天是否有足够直射阳光','检查土壤是否压实或排水差','先提升草坪密度，再处理杂草'],'可能需要土壤测试、堆肥、找平、草皮修补或改善光照；不要只靠施肥。'],
unknown:['先记录','不确定的问题',['症状不明显','可能同时有多个原因','照片和时间变化比单次判断更可靠'],['拍近照和远照','记录浇水、割草、施肥、天气','观察 7 天是否扩大'],'暂时不要乱用产品。先记录证据和变化。']
};
const calendar=[
['三月','春季启动',['撒春季预防除草剂','等返青后再恢复割草','检查喷灌系统']],
['四月至五月','返青和第一次加强',['草坪大部分返青后开始常规割草','五月可开始第一次生长季施肥','记录薄弱区域']],
['六月','旺盛生长期',['每 5–7 天割一次','早晨深浇，避免傍晚浇水','重点处理阔叶杂草','拍照记录前院变化']],
['七月至八月','高温维护',['观察黄斑和霉菌迹象','按标签间隔复查除草','避免草坪承受过大压力']],
['九月','收尾和过冬准备',['停止高氮施肥','逐渐减少浇水频率','整理 HOA 报告']],
['十月至二月','休眠期',['变棕属于正常休眠','减少干扰，不施氮肥','保留记录，等待春季返青']]
];
function esc(v){return String(v??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll(String.fromCharCode(39),'&#039;')}
function todayString(){const d=new Date();d.setMinutes(d.getMinutes()-d.getTimezoneOffset());return d.toISOString().slice(0,10)}
function fmt(d){if(!d)return '';const a=d.split('-');return `${a[0]}年${+a[1]}月${+a[2]}日`}
function load(){try{logs=JSON.parse(localStorage.getItem(STORE)||'[]')}catch{logs=[]}try{if(JSON.parse(localStorage.getItem(SETTINGS)||'{}').large)document.body.classList.add('large-text')}catch{}}
function save(){localStorage.setItem(STORE,JSON.stringify(logs))}
function nav(id){document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));$(id)?.classList.add('active');document.querySelectorAll('[data-nav]').forEach(b=>b.classList.toggle('active',b.dataset.nav===id));window.scrollTo({top:0,behavior:'smooth'})}
function renderToday(){const data=tasksByMonth[new Date().getMonth()]||tasksByMonth[5];$('seasonSummary').innerHTML=`<strong>本月提醒：</strong>${esc(data[0])}`;$('todayTasks').innerHTML=data[1].map((t,i)=>`<article class='task-item'><p class='task-item__meta'>${labels[t[0]]}</p><h3>${esc(t[1])}</h3><p>${esc(t[2])}</p><div class='task-actions'><button class='primary-btn' type='button' data-quick='${i}'>我已完成，保存记录</button><button class='secondary-btn' type='button' data-nav='log'>手动填写详情</button></div></article>`).join('')}
function renderGuide(){const key=$('problemSelect').value;const p=problems[key];$('problemResult').innerHTML=`<span class='badge'>${esc(p[0])}</span><h3>${esc(p[1])}</h3><div class='form-grid'><div><h4>怎么看</h4><ul class='check-list'>${p[2].map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div><div><h4>下一步怎么做</h4><ul class='check-list'>${p[3].map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div></div><p><strong>产品方向：</strong>${esc(p[4])}</p><div class='button-row'><button class='primary-btn' type='button' data-save-problem='1'>保存为 HOA 观察记录</button><button class='secondary-btn' type='button' data-nav='products'>查看产品指南</button></div>`}
function renderPlan(){if(!$('monthPlan'))return;$('monthPlan').innerHTML=calendar.map(p=>`<article class='month-card'><div class='month-card__head'>${esc(p[0])} — ${esc(p[1])}</div><div class='month-card__body'><ul class='check-list'>${p[2].map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div></article>`).join('')}
function addLog(item){logs.unshift(item);save();renderAll()}
function quickLog(i){const t=(tasksByMonth[new Date().getMonth()]||tasksByMonth[5])[1][i];addLog({id:Date.now(),date:todayString(),type:t[0],title:t[1],area:'',notes:t[2],rating:0,photo:''});nav('report')}
function saveProblem(){const key=$('problemSelect').value;const p=problems[key];addLog({id:Date.now(),date:todayString(),type:key==='brownpatch'?'disease':'weed',title:`观察：${p[1]}`,area:'',notes:`症状核对：${p[2].join('；')}。下一步：${p[3].join('；')}`,rating:0,photo:''});nav('log')}
function resetForm(){const f=$('logForm');if(f)f.reset();rating=0;photo='';document.querySelectorAll('.rating-btn').forEach(b=>b.classList.remove('selected'));if($('photoPreview')){$('photoPreview').style.display='none';$('photoPreview').removeAttribute('src')}$('logDate').value=todayString()}
function submitLog(e){e.preventDefault();const title=$('logTitle').value.trim();if(!title){alert('请填写操作内容。');return}addLog({id:Date.now(),date:$('logDate').value||todayString(),type:$('logType').value,title,area:$('logArea').value.trim(),notes:$('logNotes').value.trim(),rating,photo});resetForm();nav('report')}
function renderLogs(){const f=$('logFilter')?.value||'all';const arr=f==='all'?logs:logs.filter(x=>x.type===f);$('logEntries').innerHTML=arr.length?arr.map(x=>`<article class='log-entry'><button class='log-delete' type='button' data-delete='${x.id}'>🗑</button><div class='log-entry__top'><span class='log-entry__date'>📅 ${fmt(x.date)}</span><span class='log-entry__type'>${labels[x.type]||labels.general}</span></div><h3>${esc(x.title)}</h3>${x.area?`<p><strong>位置：</strong>${esc(x.area)}</p>`:''}${x.notes?`<p>${esc(x.notes)}</p>`:''}${x.rating?`<p><strong>状态：</strong>${ratings[x.rating]}</p>`:''}${x.photo?`<img src='${x.photo}' alt='草坪护理照片'>`:''}</article>`).join(''):`<div class='empty-state'><strong>还没有记录</strong><br>添加第一条护理记录后，这里会显示 HOA 证据链。</div>`}
function summary(){if(!logs.length)return '添加护理记录后，这里会自动生成一段简短说明。';const first=logs[logs.length-1];const last=logs[0];const days=new Set(logs.map(x=>x.date)).size;const photos=logs.filter(x=>x.photo).length;const c={};logs.forEach(x=>c[x.type]=(c[x.type]||0)+1);const actions=Object.entries(c).map(([k,v])=>`${labels[k]||k} ${v} 次`).join('、');return `我们从 ${fmt(first.date)} 到 ${fmt(last.date)} 持续记录草坪护理进度。目前共有 ${logs.length} 条记录，覆盖 ${days} 个护理日，其中包含 ${photos} 条照片证据。已记录的护理类型包括：${actions}。后续会继续按季节计划进行割草、浇水、杂草控制和照片记录。`}
function renderStats(){const days=new Set(logs.map(x=>x.date)).size;const photos=logs.filter(x=>x.photo).length;const latest=logs.find(x=>Number(x.rating)>0);$('statTotal').textContent=logs.length;$('statDays').textContent=days;$('statPhotos').textContent=photos;$('statScore').textContent=latest?`${latest.rating}/5`:'—';$('hoaSummaryText').textContent=summary()}
function renderAll(){renderToday();renderGuide();renderPlan();renderLogs();renderStats()}
document.addEventListener('DOMContentLoaded',()=>{load();$('logDate').value=todayString();$('todayDate').textContent=new Date().toLocaleDateString('zh-CN',{weekday:'long',year:'numeric',month:'long',day:'numeric'});document.body.addEventListener('click',e=>{const navBtn=e.target.closest('[data-nav]');if(navBtn)nav(navBtn.dataset.nav);const q=e.target.closest('[data-quick]');if(q)quickLog(Number(q.dataset.quick));if(e.target.closest('[data-save-problem]'))saveProblem();const del=e.target.closest('[data-delete]');if(del){logs=logs.filter(x=>x.id!==Number(del.dataset.delete));save();renderAll()}});$('largeTextToggle').addEventListener('click',()=>{document.body.classList.toggle('large-text');localStorage.setItem(SETTINGS,JSON.stringify({large:document.body.classList.contains('large-text')}))});$('problemSelect').addEventListener('change',renderGuide);$('logForm').addEventListener('submit',submitLog);$('logFilter').addEventListener('change',renderLogs);$('printReportBtn').addEventListener('click',()=>window.print());$('copySummaryBtn').addEventListener('click',()=>navigator.clipboard&&navigator.clipboard.writeText(summary()).then(()=>alert('已复制 HOA 说明。')));document.querySelectorAll('.rating-btn').forEach(b=>b.addEventListener('click',()=>{rating=Number(b.dataset.rating);document.querySelectorAll('.rating-btn').forEach(x=>x.classList.remove('selected'));b.classList.add('selected')}));$('logPhoto').addEventListener('change',e=>{const f=e.target.files[0];if(!f){photo='';return}const reader=new FileReader();reader.onload=ev=>{photo=ev.target.result;$('photoPreview').src=photo;$('photoPreview').style.display='block'};reader.readAsDataURL(f)});renderAll()});