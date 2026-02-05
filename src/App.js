import React, { useState, useEffect, useRef } from 'react';
import { Activity, Send, RotateCcw, User, Bot, AlertCircle, CheckCircle, ArrowRight, Loader2 } from 'lucide-react';

// --- Configuration ---
// In the actual environment, the API key is injected automatically.
const apiKey = process.env.REACT_APP_GEMINI_API_KEY;

const SYSTEM_INSTRUCTION = `
You are "LifeStyleCheck", a smart, socially relevant lifestyle assessment assistant designed for workers, artisans, students, and individuals engaged in daily livelihood activities.

Your purpose is to understand how a person's nature of work and daily routine may influence their lifestyle patterns, comfort, energy levels, and overall well-being.

STRICT RULES:
1. Ask ONLY ONE short, clear question per response.
2. Do NOT give advice during the interview phase.
3. Start by understanding the user's NATURE OF WORK.
4. Then ask if they are experiencing any physical discomfort, fatigue, or lifestyle-related issues (non-medical).
5. Based on what they mention, explore lifestyle factors connected to it (sleep, activity, stress, screen time, posture, hydration, diet).
6. Adapt follow-up questions contextually, but stay within lifestyle domains.
7. Avoid medical terminology, diagnoses, or disease names.
8. Be respectful, supportive, and suitable for community or workforce settings.
9. When you have enough information to understand their lifestyle risks
   OR when 5–7 meaningful areas have been covered,
   end your response with the token: [[GENERATE_REPORT]]
10. Keep questions easy to answer in one sentence or less.

QUESTION FLOW GUIDANCE (DO NOT STATE EXPLICITLY):
- First: nature of work (type, hours, physical/desk-based, shifts)
- Second: any ongoing discomfort, tiredness, stress, or difficulty
- Then: analyze lifestyle factors contributing to those issues
- End once a clear lifestyle picture is formed

Do not mention that you are an AI or that this is an assessment.
Be friendly, efficient, and conversational.
`;

const REPORT_PROMPT = `
Based on the conversation history, generate a "Lifestyle Balance Report" for the user.
The user is likely a student, artisan, or industrial worker. Keep the language simple, encouraging, and practical.

**Format:** Markdown.
**Structure:**
1. **Overview**: A warm, short summary of their daily routine based on what they told you.
2. **What You're Doing Well**: Highlight positive habits (e.g., "Good job drinking enough water").
3. **Areas to Watch**: Gentle identification of risks (e.g., "Irregular sleep schedules", "High screen time").
4. **Simple Steps Forward**: 3-4 realistic, non-medical tips to improve well-being (e.g., "Try stretching for 5 mins", "Reduce phone use before bed").
5. **Disclaimer**: "This is a self-reflection tool, not a medical diagnosis. Please consult a doctor for health concerns."
`;

// --- API Helpers ---

const callGeminiChat = async (history) => {
  if (!apiKey) {
    // Fallback simulation for when API key is missing
    return new Promise(resolve => {
        setTimeout(() => {
            if (history.length > 20) return resolve("[[GENERATE_REPORT]]"); // Roughly 10 Q&A pairs
            resolve("Got it. Next, how many hours of sleep do you typically get in a night?");
        }, 1500);
    });
  }

  try {
    const contents = history.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: contents,
          systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
          generationConfig: {
            maxOutputTokens: 150, // Keep questions concise
          }
        })
      }
    );

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "I see. Let's move to the next topic. How is your water intake?";
  } catch (error) {
    console.error("API Error:", error);
    return "Connection interrupted. Could you please answer that again?";
  }
};

const generateFinalReport = async (history) => {
  if (!apiKey) {
    return `## Lifestyle Balance Report\n**Note:** API Key missing.\n\n### Overview\nSimulated overview of your habits.\n\n### What You're Doing Well\n- Consistent routine\n\n### Areas to Watch\n- High stress levels\n\n### Simple Steps Forward\n1. Take short breaks.\n2. Hydrate more often.`;
  }

  try {
    const conversationText = history.map(m => `${m.sender.toUpperCase()}: ${m.text}`).join('\n');
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `${REPORT_PROMPT}\n\nUSER RESPONSES LOG:\n${conversationText}` }] }]
        })
      }
    );

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Error generating report.";
  } catch (error) {
    return "Failed to generate report due to a connection error.";
  }
};

// --- Components ---

const IntroScreen = ({ onStart }) => (
  <div className="fixed inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-gray-950 via-gray-900 to-black animate-fadeIn z-50">
    <div className="mb-8 p-8 bg-teal-500/10 rounded-full border border-teal-500/20 shadow-[0_0_50px_rgba(20,184,166,0.1)]">
      <Activity size={80} className="text-teal-400" />
    </div>
    <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
      LifeStyleCheck
    </h1>
    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed font-light">
      A smart self-assessment tool for artisans, workers, and students.
      Answer <strong className="text-teal-400 font-bold">10 simple questions</strong> to reflect on your daily habits and receive a personalized well-being report.
    </p>
    
    <button 
      onClick={onStart}
      className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white transition-all duration-300 bg-teal-600 rounded-full hover:bg-teal-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-gray-950"
    >
      <span className="text-lg">Start Assessment</span>
      <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
    </button>

    <div className="absolute bottom-8 text-gray-600 text-sm font-medium tracking-widest uppercase">
      Simple • Private • Non-Medical
    </div>
  </div>
);

const ChatMessage = ({ msg }) => {
  const isBot = msg.sender === 'bot';
  
  return (
    <div className={`flex w-full mb-6 ${isBot ? 'justify-start' : 'justify-end'} animate-slideUp`}>
      <div className={`flex max-w-[85%] md:max-w-[75%] ${isBot ? 'flex-row' : 'flex-row-reverse'} items-end gap-3`}>
        <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center shadow-md ${isBot ? 'bg-gray-800 text-teal-400 border border-gray-700' : 'bg-teal-600 text-white'}`}>
          {isBot ? <Bot size={18} /> : <User size={18} />}
        </div>

        <div className={`relative px-6 py-4 rounded-2xl text-base leading-relaxed ${
          isBot 
            ? 'bg-gray-800 text-gray-100 rounded-bl-none border border-gray-700 shadow-sm' 
            : 'bg-teal-600 text-white rounded-br-none shadow-lg'
        }`}>
          {msg.text}
        </div>
      </div>
    </div>
  );
};

const ReportCard = ({ reportMarkdown, onRestart }) => {
  const sections = reportMarkdown.split('\n');

  return (
    <div className="fixed inset-0 bg-gray-950 z-50 overflow-y-auto animate-fadeIn scrollbar-thin scrollbar-thumb-gray-800">
      <div className="max-w-3xl mx-auto p-6 md:p-12 space-y-10 pb-24">
        
        <div className="text-center space-y-3 border-b border-gray-800 pb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-500/10 rounded-full mb-4">
            <CheckCircle size={40} className="text-teal-500" />
          </div>
          <h2 className="text-4xl font-bold text-white tracking-tight">Lifestyle Balance Report</h2>
          <p className="text-gray-400 text-lg">A reflection on your daily habits and routines</p>
        </div>

        <div className="prose prose-invert prose-teal max-w-none">
          {sections.map((line, idx) => {
            if (line.startsWith('## ') || line.startsWith('### ')) {
              return <h3 key={idx} className="text-2xl font-bold text-teal-400 mt-10 mb-4">{line.replace(/#/g, '')}</h3>;
            } else if (line.startsWith('**') && line.includes(':')) {
               return <p key={idx} className="text-gray-200 mt-4 mb-2"><strong className="text-white text-lg">{line.replace(/\*\*/g, '')}</strong></p>;
            } else if (line.trim().startsWith('- ')) {
              return (
                <div key={idx} className="flex gap-4 items-start mt-3 bg-gray-900/40 p-4 rounded-xl border border-gray-800/50">
                  <div className="mt-2 w-2 h-2 rounded-full bg-teal-500 flex-shrink-0" />
                  <p className="text-gray-300 leading-relaxed text-lg">{line.replace('- ', '')}</p>
                </div>
              );
            } else if (line.trim().length > 0) {
              return <p key={idx} className="text-gray-400 leading-relaxed mt-4 text-lg">{line}</p>;
            }
            return null;
          })}
        </div>

        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 flex items-start gap-5 shadow-inner">
            <AlertCircle className="text-yellow-500 flex-shrink-0 mt-1" size={24} />
            <p className="text-sm text-gray-400 italic leading-relaxed">
                <strong>Disclaimer:</strong> This tool uses AI to provide general lifestyle guidance. It does not offer medical advice, diagnosis, or treatment. Prioritize professional medical consultation for health issues.
            </p>
        </div>

        <div className="flex justify-center pt-6">
          <button 
            onClick={onRestart}
            className="flex items-center gap-3 px-10 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-full transition-all font-bold border border-gray-700 shadow-xl active:scale-95"
          >
            <RotateCcw size={20} />
            <span>New Assessment</span>
          </button>
        </div>

      </div>
    </div>
  );
};

const LoadingIndicator = ({ text }) => (
    <div className="fixed inset-0 flex flex-col items-center justify-center space-y-6 bg-gray-950 z-50 animate-fadeIn">
        <div className="relative">
            <div className="w-20 h-20 border-4 border-teal-500/20 rounded-full"></div>
            <div className="w-20 h-20 border-4 border-t-teal-500 rounded-full animate-spin absolute top-0 left-0"></div>
        </div>
        <p className="text-gray-300 animate-pulse text-xl font-medium tracking-wide">{text}</p>
    </div>
);

// --- Main App Component ---

const App = () => {
  const [screen, setScreen] = useState('intro'); // intro, chat, generating, report
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [reportData, setReportData] = useState('');
  
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (screen === 'chat') {
      scrollToBottom();
    }
  }, [messages, isBotTyping, screen]);

  const startChat = () => {
    setScreen('chat');
    // Simplified starting message to kick off the 10 questions immediately
    setMessages([{
      sender: 'bot',
      text: 
        "To begin, what best describes your main work or daily activity?\n\n" +
        "• Desk-based work (computer/office/study)\n" +
        "• Physical work (standing, walking, manual labor)\n" +
        "• Mixed work (both desk and physical)\n" +
        "• Student\n" +
        "• Shift-based or irregular hours\n" +
        "• Other (briefly mention)"
    }]);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsgText = inputText;
    setInputText('');
    
    const updatedMessages = [...messages, { sender: 'user', text: userMsgText }];
    setMessages(updatedMessages);
    setIsBotTyping(true);

    const botResponseText = await callGeminiChat(updatedMessages);
    setIsBotTyping(false);

    if (botResponseText.includes('[[GENERATE_REPORT]]')) {
        setScreen('generating');
        const finalReport = await generateFinalReport(updatedMessages);
        setReportData(finalReport);
        setScreen('report');
    } else {
        setMessages(prev => [...prev, { sender: 'bot', text: botResponseText }]);
    }
  };

  const handleRestart = () => {
    setMessages([]);
    setReportData('');
    setInputText('');
    setScreen('intro');
  };

  if (screen === 'intro') return <IntroScreen onStart={startChat} />;
  if (screen === 'generating') return <LoadingIndicator text="Analyzing your lifestyle habits..." />;
  if (screen === 'report') return <ReportCard reportMarkdown={reportData} onRestart={handleRestart} />;

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-gray-100 font-sans overflow-hidden">
      
      {/* Header */}
      <div className="flex-none bg-gray-900/90 backdrop-blur-xl border-b border-gray-800/50 p-5 z-10 shadow-lg">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-teal-500/15 rounded-xl border border-teal-500/20">
              <Activity size={24} className="text-teal-400" />
            </div>
            <div>
                <span className="font-black text-xl tracking-tight block leading-none">LifeStyleCheck</span>
                <span className="text-[10px] text-teal-500 font-bold uppercase tracking-widest mt-1 block">Smart Assessment Tool</span>
            </div>
          </div>
          <button 
            onClick={handleRestart} 
            className="px-4 py-2 rounded-lg text-xs font-bold text-gray-500 hover:text-white hover:bg-gray-800 transition-all uppercase tracking-tighter"
          >
            Quit
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-grow overflow-y-auto p-4 md:p-10 bg-gray-950 scrollbar-thin scrollbar-thumb-gray-800">
        <div className="max-w-4xl mx-auto flex flex-col justify-end min-h-full pb-6"> 
          
          {messages.map((msg, index) => (
            <ChatMessage key={index} msg={msg} />
          ))}

          {isBotTyping && (
             <div className="flex w-full mb-6 justify-start animate-slideUp">
               <div className="flex items-end gap-3">
                 <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gray-800 text-teal-400 flex items-center justify-center border border-gray-700">
                    <Bot size={18} />
                 </div>
                 <div className="bg-gray-800 rounded-2xl rounded-bl-none p-5 flex gap-1.5 items-center border border-gray-700 shadow-sm">
                   <div className="w-2.5 h-2.5 bg-teal-500/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                   <div className="w-2.5 h-2.5 bg-teal-500/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                   <div className="w-2.5 h-2.5 bg-teal-500/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                 </div>
               </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="flex-none bg-gray-900/50 backdrop-blur-md border-t border-gray-800/50 p-6 md:p-8 z-20">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSendMessage} className="relative flex items-center gap-4">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your answer..."
              className="w-full bg-gray-800/80 text-white placeholder-gray-500 rounded-2xl py-5 pl-8 pr-16 focus:outline-none focus:ring-2 focus:ring-teal-500/40 border border-gray-700/50 transition-all shadow-2xl text-lg"
              autoFocus
              disabled={isBotTyping}
            />
            <button 
              type="submit"
              disabled={!inputText.trim() || isBotTyping}
              className="absolute right-3 p-3 bg-teal-600 text-white rounded-xl hover:bg-teal-500 disabled:opacity-30 disabled:hover:bg-teal-600 transition-all shadow-lg hover:scale-105 active:scale-95"
            >
              <Send size={24} />
            </button>
          </form>
          <div className="flex items-center justify-center gap-2 mt-4 text-gray-600">
            <div className="w-1 h-1 rounded-full bg-gray-700"></div>
            <p className="text-[10px] font-bold uppercase tracking-widest">
              Private & Secure • Self-Reflection Only
            </p>
            <div className="w-1 h-1 rounded-full bg-gray-700"></div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default App;