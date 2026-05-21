import React from "react";
import "./style.css";

function App() {

  const [fileName, setFileName] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [progress, setProgress] = React.useState(0);

  const downloadSRT = () => {
    const content = `1
00:00:00,000 --> 00:00:03,000
مرحبا بك في YAZ Translate AI

2
00:00:03,000 --> 00:00:06,000
هذه ترجمة تجريبية
`;

    const blob = new Blob([content], {
      type: "text/plain"
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "subtitle.srt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    URL.revokeObjectURL(url);
    
  };

  return (
    <main className="card">
      <h1>مركز المساعدة</h1>

      <input
        type="file"
        accept="video/*"
        onChange={(e) => setFileName(e.target.files[0]?.name || "")}
      />

<button
  onClick={() => {
    setStatus("...جاري تجهيز الترجمة");
    setProgress(25);

    setTimeout(() => setProgress(60), 1000);

    setTimeout(() => {
      setProgress(100);
      setStatus("تم تجهيز الترجمة بنجاح");
    }, 2000);
  }}
>
  ابدأ المعالجة
</button>

<button onClick={downloadSRT}>
  تحميل ملف الترجمة
</button>

{progress > 0 && <p>نسبة المعالجة: %{progress}</p>}

{status && <p>{status}</p>}

{fileName && <p>الملف المختار: {fileName}</p>}  
    </main>
  );
}

export default App;
