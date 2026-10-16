import React from 'react';

export function FloatingSymbols() {
  const symbols = [
    { text: "V = ⅓πr²h", top: "10%", left: "6%", size: "32px" },
    { text: "A = 4πr²", top: "20%", left: "84%", size: "34px" },
    { text: "l² = r² + h²", top: "74%", left: "8%", size: "30px" },
    { text: "V = ⅔πr³", top: "82%", left: "78%", size: "32px" },
    { text: "1 L = 1000 cm³", top: "42%", left: "91%", size: "26px" },
    { text: "C.S.A = πrl", top: "16%", left: "46%", size: "28px" },
    { text: "T.S.A = 3πr²", top: "66%", left: "52%", size: "28px" },
    { text: "V = ⅓ × Base × h", top: "88%", left: "34%", size: "28px" }
  ];

  return (
    <div className="floating-bg-container">
      {symbols.map((s, idx) => (
        <span
          key={idx}
          className="floating-bg-item"
          style={{
            top: s.top,
            left: s.left,
            fontSize: s.size,
            animationDelay: `${idx * 2.2}s`
          }}
        >
          {s.text}
        </span>
      ))}
    </div>
  );
}
