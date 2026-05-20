import { useState, useEffect, useRef } from "react";

function useKaTeX() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (window.katex) { setReady(true); return; }
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css";
    document.head.appendChild(link);
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js";
    script.onload = () => setReady(true);
    document.head.appendChild(script);
  }, []);
  return ready;
}

function Math({ tex, display = false }) {
  const ref = useRef();
  const ready = useKaTeX();
  useEffect(() => {
    if (ready && ref.current && window.katex) {
      try { window.katex.render(tex, ref.current, { displayMode: display, throwOnError: false }); } catch (e) {}
    }
  }, [ready, tex, display]);
  return <span ref={ref}>{tex}</span>;
}

function MixedText({ text }) {
  const parts = text.split(/(\\\(.*?\\\)|\\\[.*?\\\])/gs);
  return (
    <span>
      {parts.map((part, i) => {
        if (part.startsWith("\\(") && part.endsWith("\\)")) return <Math key={i} tex={part.slice(2, -2)} />;
        if (part.startsWith("\\[") && part.endsWith("\\]")) return <Math key={i} tex={part.slice(2, -2)} display />;
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}

const tasks = [
  {
    level: "easy", label: "Легкий", color: "#4ade80",
    items: [
      {
        id: 1, title: "Пряме обчислення",
        problem: "Знайдіть скалярний добуток векторів \\(\\vec{a} = (2,\\, -3,\\, 1)\\) та \\(\\vec{b} = (4,\\, 1,\\, -2)\\).",
        hint: "Скористайтеся формулою: \\(\\vec{a}\\cdot\\vec{b} = a_1b_1 + a_2b_2 + a_3b_3\\)",
        answer: "\\(2\\cdot4 + (-3)\\cdot1 + 1\\cdot(-2) = 8 - 3 - 2 = 3\\)"
      },
      {
        id: 2, title: "Кут між векторами",
        problem: "Знайдіть кут між векторами \\(\\vec{a} = (1,\\, 2,\\, -2)\\) та \\(\\vec{b} = (3,\\, 0,\\, 4)\\). Відповідь округліть до градуса.",
        hint: "\\(\\cos\\theta = \\dfrac{\\vec{a}\\cdot\\vec{b}}{|\\vec{a}|\\cdot|\\vec{b}|}\\). Обчисліть довжини обох векторів окремо.",
        answer: "\\(\\vec{a}\\cdot\\vec{b} = 3+0-8=-5\\); \\(|\\vec{a}|=\\sqrt{1+4+4}=3\\); \\(|\\vec{b}|=\\sqrt{9+0+16}=5\\); \\(\\cos\\theta = \\dfrac{-5}{15} = -\\dfrac{1}{3}\\); \\(\\theta = \\arccos\\!\\left(-\\tfrac{1}{3}\\right) \\approx 109°\\)"
      },
      {
        id: 3, title: "Перпендикулярність",
        problem: "Перевірте, чи є вектори \\(\\vec{a} = (3,\\, -2,\\, 1)\\) та \\(\\vec{b} = (2,\\, 2,\\, -2)\\) перпендикулярними.",
        hint: "Вектори перпендикулярні \\(\\Leftrightarrow\\) \\(\\vec{a}\\cdot\\vec{b} = 0\\)",
        answer: "\\(3\\cdot2 + (-2)\\cdot2 + 1\\cdot(-2) = 6 - 4 - 2 = 0\\) ✓ Так, перпендикулярні."
      },
    ]
  },
  {
    level: "medium", label: "Середній", color: "#facc15",
    items: [
      {
        id: 4, title: "Знайти параметр",
        problem: "При якому значенні \\(t\\) вектори \\(\\vec{a} = (t,\\, 2,\\, -1)\\) та \\(\\vec{b} = (3,\\, t,\\, 4)\\) перпендикулярні?",
        hint: "Прирівняйте скалярний добуток до нуля: \\(\\vec{a}\\cdot\\vec{b} = 0\\) і розв'яжіть рівняння.",
        answer: "\\(3t + 2t - 4 = 0 \\Rightarrow 5t = 4 \\Rightarrow t = \\dfrac{4}{5}\\)"
      },
      {
        id: 5, title: "Площа паралелограма",
        problem: "Дві сторони паралелограма задані векторами \\(\\vec{a} = (3,\\, 1,\\, -1)\\) та \\(\\vec{b} = (1,\\, -1,\\, 2)\\). Знайдіть площу паралелограма, якщо \\(S = \\sqrt{|\\vec{a}|^2|\\vec{b}|^2 - (\\vec{a}\\cdot\\vec{b})^2}\\).",
        hint: "Спочатку знайдіть \\(\\vec{a}\\cdot\\vec{b}\\), \\(|\\vec{a}|^2\\) та \\(|\\vec{b}|^2\\), потім підставте у формулу.",
        answer: "\\(\\vec{a}\\cdot\\vec{b} = 3-1-2=0\\); \\(|\\vec{a}|^2=11\\); \\(|\\vec{b}|^2=6\\); \\(S = \\sqrt{11\\cdot6 - 0} = \\sqrt{66} \\approx 8.12\\)"
      },
      {
        id: 6, title: "Кут трикутника",
        problem: "Дано трикутник з вершинами \\(A(1,0,-1)\\), \\(B(2,3,1)\\), \\(C(-1,1,2)\\). Знайдіть кут при вершині \\(A\\).",
        hint: "Побудуйте вектори \\(\\overrightarrow{AB}\\) і \\(\\overrightarrow{AC}\\), потім знайдіть кут між ними.",
        answer: "\\(\\overrightarrow{AB}=(1,3,2),\\;\\overrightarrow{AC}=(-2,1,3)\\); \\(\\overrightarrow{AB}\\cdot\\overrightarrow{AC} = -2+3+6=7\\); \\(|\\overrightarrow{AB}|=\\sqrt{14},\\;|\\overrightarrow{AC}|=\\sqrt{14}\\); \\(\\cos A = \\tfrac{7}{14} = \\tfrac{1}{2} \\Rightarrow A = 60°\\)"
      },
    ]
  },
  {
    level: "hard", label: "Складний", color: "#f87171",
    items: [
      {
        id: 7, title: "Знайти два параметри",
        problem: "Знайдіть значення \\(p\\) і \\(q\\), якщо вектор \\(\\vec{c} = (p,\\, 3,\\, q)\\) перпендикулярний до обох векторів \\(\\vec{a} = (1,\\, -1,\\, 2)\\) та \\(\\vec{b} = (2,\\, 1,\\, -1)\\).",
        hint: "Запишіть дві умови: \\(\\vec{c}\\cdot\\vec{a}=0\\) та \\(\\vec{c}\\cdot\\vec{b}=0\\). Отримаєте систему двох рівнянь.",
        answer: "answer7"
      },
    ]
  },
  {
    level: "applied", label: "Прикладні", color: "#818cf8",
    items: [
      {
        id: 10, title: "Фізика: робота сили",
        problem: "Тіло переміщується з точки \\(A(1, 2, 0)\\) у точку \\(B(4, -1, 3)\\) (у метрах) під дією сили \\(\\vec{F} = (3,\\, 2,\\, -1)\\) Н. Знайдіть роботу сили.",
        hint: "\\(A = \\vec{F} \\cdot \\vec{s}\\), де \\(\\vec{s} = \\overrightarrow{AB}\\) — вектор переміщення.",
        answer: "\\(\\vec{s} = (3,-3,3)\\); \\(A = 3\\cdot3 + 2\\cdot(-3) + (-1)\\cdot3 = 9-6-3 = 0\\) Дж. Робота дорівнює нулю — сила перпендикулярна до переміщення."
      },
      {
        id: 11, title: "3D-друк: кут нахилу опори",
        problem: "При 3D-друці опорна конструкція задається вектором \\(\\vec{s} = (2,\\, 1,\\, 4)\\) (одиниці — мм). Вісь \\(Z\\) — вертикаль принтера, тобто \\(\\vec{z} = (0,\\, 0,\\, 1)\\). Знайдіть кут між опорою та вертикаллю. Якщо кут перевищує \\(45°\\), потрібні додаткові підпори.",
        hint: "\\(\\cos\\theta = \\dfrac{\\vec{s}\\cdot\\vec{z}}{|\\vec{s}|\\cdot|\\vec{z}|}\\). Зверніть увагу: \\(\\vec{s}\\cdot\\vec{z}\\) — це просто третя координата \\(\\vec{s}\\).",
        answer: "\\(\\vec{s}\\cdot\\vec{z} = 4\\); \\(|\\vec{s}| = \\sqrt{4+1+16} = \\sqrt{21}\\); \\(\\cos\\theta = \\dfrac{4}{\\sqrt{21}} \\approx 0.873\\); \\(\\theta \\approx 29°\\). Кут менший за \\(45°\\) — додаткові підпори не потрібні."
      },
      {
        id: 12, title: "Фізика: кут між силами",
        problem: "На тіло діють дві сили: \\(\\vec{F}_1 = (3,\\, 4,\\, 0)\\) Н та \\(\\vec{F}_2 = (1,\\, -2,\\, 2)\\) Н. Знайдіть кут між силами та модуль рівнодійної сили.",
        hint: "Кут: \\(\\cos\\theta = \\dfrac{\\vec{F}_1\\cdot\\vec{F}_2}{|\\vec{F}_1|\\cdot|\\vec{F}_2|}\\). Рівнодійна: \\(\\vec{R} = \\vec{F}_1 + \\vec{F}_2\\).",
        answer: "\\(\\vec{F}_1\\cdot\\vec{F}_2=3-8+0=-5\\); \\(|\\vec{F}_1|=5,\\;|\\vec{F}_2|=3\\); \\(\\cos\\theta=\\tfrac{-5}{15}=-\\tfrac{1}{3}\\Rightarrow\\theta\\approx109°\\); \\(\\vec{R}=(4,2,2),\\;|\\vec{R}|=\\sqrt{16+4+4}=\\sqrt{24}=2\\sqrt{6}\\approx4.9\\) Н"
      },
    ]
  }
];

function Badge({ color, label }) {
  return (
    <span style={{
      background: color + "22", color, border: `1px solid ${color}55`,
      borderRadius: "6px", padding: "2px 10px", fontSize: "0.75rem",
      fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase",
      fontFamily: "'JetBrains Mono', monospace"
    }}>{label}</span>
  );
}

function TaskCard({ task, color, label }) {
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div style={{
      background: "#12131a", border: `1px solid ${color}33`,
      borderLeft: `4px solid ${color}`, borderRadius: "12px",
      padding: "22px 24px", marginBottom: "16px",
      boxShadow: showAnswer ? `0 0 24px ${color}22` : "none", transition: "box-shadow 0.2s"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
        <span style={{ color, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem", opacity: 0.7 }}>
          #{task.id.toString().padStart(2, "0")}
        </span>
        <Badge color={color} label={label} />
        <span style={{ color: "#e2e8f0", fontWeight: 700, fontSize: "1rem" }}>{task.title}</span>
      </div>

      <div style={{ color: "#cbd5e1", fontSize: "0.97rem", lineHeight: 1.8, marginBottom: "14px" }}>
        <MixedText text={task.problem} />
      </div>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <button onClick={() => setShowHint(h => !h)} style={{
          background: "transparent", border: `1px solid ${color}66`, color,
          borderRadius: "7px", padding: "5px 14px", fontSize: "0.82rem",
          cursor: "pointer", fontFamily: "'JetBrains Mono', monospace"
        }}>
          {showHint ? "Сховати підказку" : "💡 Підказка"}
        </button>
        <button onClick={() => setShowAnswer(a => !a)} style={{
          background: showAnswer ? color + "22" : "transparent", border: `1px solid ${color}`, color,
          borderRadius: "7px", padding: "5px 14px", fontSize: "0.82rem",
          cursor: "pointer", fontFamily: "'JetBrains Mono', monospace"
        }}>
          {showAnswer ? "Сховати відповідь" : "✓ Відповідь"}
        </button>
      </div>

      {showHint && (
        <div style={{
          marginTop: "12px", background: "#1e2030", border: `1px solid ${color}33`,
          borderRadius: "8px", padding: "10px 14px", color: "#94a3b8", fontSize: "0.9rem", lineHeight: 1.8
        }}>
          🔎 <MixedText text={task.hint} />
        </div>
      )}

      {showAnswer && (
        <div style={{
          marginTop: "12px", background: color + "11", border: `1px solid ${color}44`,
          borderRadius: "8px", padding: "10px 14px", color: "#e2e8f0",
          fontSize: "0.9rem", lineHeight: 1.8
        }}>
          <span style={{ color, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", marginRight: 8 }}>Розв'язок:</span>
          <MixedText text={task.answer} />
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [activeLevel, setActiveLevel] = useState("all");
  const filtered = activeLevel === "all" ? tasks : tasks.filter(g => g.level === activeLevel);

  return (
    <div style={{ minHeight: "100vh", background: "#0d0e17", fontFamily: "'Lora', serif", padding: "32px 16px 60px", color: "#e2e8f0" }}>
      <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />

      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ marginBottom: "36px", borderBottom: "1px solid #1e2030", paddingBottom: "24px" }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", color: "#818cf8", letterSpacing: "0.15em", marginBottom: "8px", textTransform: "uppercase" }}>
            Математика · Вектори у просторі
          </div>
          <h1 style={{ margin: 0, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 700, color: "#f1f5f9", lineHeight: 1.2 }}>
            Скалярний добуток векторів
          </h1>
          <p style={{ color: "#64748b", marginTop: "10px", fontSize: "0.95rem" }}>12 задач · від легких до складних + прикладні задачі</p>
        </div>

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "28px" }}>
          {[{ id: "all", label: "Всі", color: "#94a3b8" }, ...tasks.map(g => ({ id: g.level, label: g.label, color: g.color }))].map(tab => (
            <button key={tab.id} onClick={() => setActiveLevel(tab.id)} style={{
              background: activeLevel === tab.id ? tab.color + "22" : "transparent",
              border: `1px solid ${activeLevel === tab.id ? tab.color : "#1e2030"}`,
              color: activeLevel === tab.id ? tab.color : "#64748b",
              borderRadius: "8px", padding: "6px 16px", fontSize: "0.85rem",
              cursor: "pointer", fontFamily: "'JetBrains Mono', monospace",
              fontWeight: activeLevel === tab.id ? 700 : 400
            }}>{tab.label}</button>
          ))}
        </div>

        {filtered.map(group => (
          <div key={group.level} style={{ marginBottom: "36px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: group.color, display: "inline-block", boxShadow: `0 0 8px ${group.color}` }} />
              <h2 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700, color: group.color, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase" }}>
                {group.label} рівень
              </h2>
            </div>
            {group.items.map(task => (
              <TaskCard key={task.id} task={task} color={group.color} label={group.label} />
            ))}
          </div>
        ))}

        <div style={{ marginTop: "40px", borderTop: "1px solid #1e2030", paddingTop: "24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
          {[
            { label: "Скалярний добуток", formula: "\\vec{a}\\cdot\\vec{b} = a_1b_1 + a_2b_2 + a_3b_3" },
            { label: "Кут між векторами", formula: "\\cos\\theta = \\dfrac{\\vec{a}\\cdot\\vec{b}}{|\\vec{a}|\\cdot|\\vec{b}|}" },
            { label: "Довжина вектора", formula: "|\\vec{a}| = \\sqrt{a_1^2+a_2^2+a_3^2}" },
            { label: "Перпендикулярність", formula: "\\vec{a}\\perp\\vec{b}\\Leftrightarrow\\vec{a}\\cdot\\vec{b}=0" },
          ].map(f => (
            <div key={f.label} style={{ background: "#12131a", border: "1px solid #1e2030", borderRadius: "10px", padding: "14px 16px" }}>
              <div style={{ color: "#64748b", fontSize: "0.72rem", fontFamily: "'JetBrains Mono', monospace", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.08em" }}>{f.label}</div>
              <div style={{ color: "#818cf8" }}><Math tex={f.formula} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}