import React, {useEffect, useState} from 'react';
import { createRoot } from 'react-dom/client';
import { Upload, Moon, Sun, Play, Download, Library, User, HelpCircle } from 'lucide-react';
import './style.css';

const API = 'http://localhost:8000';

function App(){
  const [page,setPage]=useState(localStorage.getItem('page') || 'login');
  const [dark,setDark]=useState(localStorage.getItem('theme') !== 'light');
  const [project,setProject]=useState(null);
  const [projects,setProjects]=useState([]);
  const [busy,setBusy]=useState(false);
  useEffect(()=>{document.documentElement.className=dark?'dark':'';localStorage.setItem('theme',dark?'dark':'light')},[dark]);
  useEffect(()=>{localStorage.setItem('page',page)},[page]);

  async function refreshProjects(){
    const res=await fetch(`${API}/api/projects`); setProjects(await res.json());
  }
  async function uploadVideo(file){
    setBusy(true);
    try{
      const fd=new FormData(); fd.append('file',file);
      const res=await fetch(`${API}/api/projects`,{method:'POST',body:fd});
      if(!res.ok) throw new Error((await res.json()).detail || 'Upload failed');
      const data=await res.json(); setProject(data); setPage('editor');
    }catch(e){alert(e.message)} finally{setBusy(false)}
  }
  async function processVideo(){
    if(!project) return;
    setBusy(true);
    try{
      const res=await fetch(`${API}/api/projects/${project.id}/process`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({source_language:'en',target_language:'ar'})});
      const data=await res.json(); setProject(data); setPage('export');
    }catch(e){alert('حدث خطأ أثناء المعالجة')} finally{setBusy(false)}
  }
  function shell(children){return <div className="app"><header><b>YAZ Translate AI</b><nav><button onClick={()=>setPage('studio')}><Library size={18}/> الاستوديو</button><button onClick={()=>setPage('profile')}><User size={18}/> الحساب</button><button onClick={()=>setPage('help')}><HelpCircle size={18}/> مساعدة</button><button onClick={()=>setDark(!dark)}>{dark?<Sun/>:<Moon/>}</button></nav></header>{children}<footer>NURI YAHMED 2026</footer></div>}
  if(page==='login') return <div className="login"><button className="theme" onClick={()=>setDark(!dark)}>{dark?<Sun/>:<Moon/>}</button><section><h1>Azul 👋</h1><h2>YAZ Translate AI</h2><p>ترجمة فيديو عربي/إنجليزي مع تحرير وتصدير.</p><input placeholder="البريد الإلكتروني"/><input placeholder="كلمة المرور" type="password"/><button className="primary" onClick={()=>setPage('upload')}>دخول تجريبي</button><small>NURI YAHMED 2026</small></section></div>
  if(page==='upload') return shell(<main className="card"><h1>رفع الفيديو</h1><p>اختر ملف فيديو للبدء. هذه أول خطوة في رحلة التطبيق.</p><label className="drop"><Upload size={42}/><span>{busy?'جاري الرفع...':'اضغط لاختيار فيديو'}</span><input type="file" accept="video/*" onChange={e=>e.target.files[0]&&uploadVideo(e.target.files[0])}/></label></main>)
  if(page==='editor') return shell(<main className="grid"><section className="card"><h1>محرر النصوص</h1><p>المشروع: {project?.title}</p><textarea dir="ltr" value={project?.transcript || 'سيظهر التفريغ الإنجليزي هنا بعد المعالجة'} readOnly/><textarea value={project?.translation || 'ستظهر الترجمة العربية هنا بعد المعالجة'} readOnly/><button className="primary" onClick={processVideo} disabled={busy}><Play size={18}/>{busy?'جاري المعالجة...':'ابدأ التفريغ والترجمة'}</button></section><aside className="card"><h2>تنسيق الترجمة</h2><label>حجم الخط <input type="range" min="18" max="48"/></label><label>لون النص <input type="color" defaultValue="#ffffff"/></label><label>ظل النص <input type="checkbox" defaultChecked/></label><p className="hint">هذه الإعدادات ستُربط لاحقًا مع FFmpeg عند حرق الترجمة على الفيديو.</p></aside></main>)
  if(page==='export') return shell(<main className="card"><h1>التصدير والمعاينة</h1><div className="preview">معاينة الفيديو</div><p>{project?.translation}</p><a className="primary link" href={`${API}/api/projects/${project?.id}/subtitle`}><Download size={18}/> تحميل SRT</a><button onClick={()=>setPage('upload')}>مشروع جديد</button></main>)
  if(page==='studio') return shell(<main className="card"><h1>الاستوديو</h1><button onClick={refreshProjects}>تحديث المشاريع</button>{projects.map(p=><div className="row" key={p.id}><span>{p.title}</span><b>{p.status}</b></div>)}</main>)
  if(page==='profile') return shell(<main className="card"><h1>الملف الشخصي</h1><p>الحساب التجريبي يعمل محليًا. لاحقًا نضيف تسجيل دخول حقيقي واشتراكات.</p></main>)
  if(page==='help') return shell(<main className="card"><h1>مركز المساعدة</h1><p>1) ارفع الفيديو. 2) اضغط معالجة. 3) حمّل ملف SRT. لاحقًا سنضيف تصدير فيديو كامل.</p></main>)
}

createRoot(document.getElementById('root')).render(<App/>);
