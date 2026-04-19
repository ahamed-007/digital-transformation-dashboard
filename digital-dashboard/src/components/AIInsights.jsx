import { useState } from "react";
import { INSIGHTS } from "../data";

export default function AIInsights({ dept, apiData }) {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [lastOptimized, setLastOptimized] = useState(new Date().toLocaleTimeString());
  const insights = apiData?.insights || INSIGHTS[dept] || INSIGHTS["All"];

  const handleOptimize = () => {
    setIsOptimizing(true);
    // Simulate complex AI calculation
    setTimeout(() => {
      setIsOptimizing(false);
      setLastOptimized(new Date().toLocaleTimeString());
    }, 2000);
  };

  return (
    <div className={`bottom-card ai-insights-card ${isOptimizing ? "ai-scanning" : ""}`}>
      <div className="chart-header">
        <p className="chart-title">
          <span className="ai-sparkle">✨</span> AI Insights & Recommendations
        </p>
        <span className="ai-badge">Premium AI</span>
      </div>
      
      <div className="insights-list">
        {isOptimizing ? (
          <div className="ai-loader-container">
            <div className="ai-spinner" />
            <p>Scanning {dept} metrics for strategic optimizations...</p>
          </div>
        ) : (
          insights.map((insight, idx) => (
            <div key={idx} className="insight-item">
              <div className="insight-bullet">AI</div>
              <p className="insight-text">{insight}</p>
            </div>
          ))
        )}
      </div>

      <div className="ai-footer">
        <p>
          {isOptimizing 
            ? "Recalculating..." 
            : `Last optimized at ${lastOptimized}. Strategy is current.`
          }
        </p>
        <button 
          className={`regenerate-btn ${isOptimizing ? "loading" : ""}`}
          onClick={handleOptimize}
          disabled={isOptimizing}
        >
          {isOptimizing ? "Optimizing..." : "Optimize Strategy"}
        </button>
      </div>
    </div>
  );
}
