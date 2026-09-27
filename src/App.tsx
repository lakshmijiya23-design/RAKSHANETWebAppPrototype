import { useEffect, useMemo, useRef, useState } from "react";

type NavKey = "command" | "detect" | "assets" | "network" | "system";
type FlowStep = "detect" | "analysis" | "repair" | "restored" | "report";
type DemoPhase = "monitoring" | "threat" | "analysis" | "repair" | "restored" | "resolution" | "complete";
type IconName =
  | "grid"
  | "scan"
  | "satellite"
  | "network"
  | "activity"
  | "shield"
  | "drone"
  | "station"
  | "alert"
  | "check"
  | "clock"
  | "arrow"
  | "cpu"
  | "globe"
  | "volume";

type SoundName = "boot" | "click" | "navigation" | "scan" | "warning" | "analysis" | "repair" | "repairStage" | "success" | "resolved" | "alert";

const earthImage =
  "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1600";

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    scan: <><path d="M4 7V4h3M17 4h3v3M20 17v3h-3M7 20H4v-3"/><circle cx="12" cy="12" r="4"/><path d="M2 12h20"/></>,
    satellite: <><path d="m13 7 4 4-6 6-4-4z"/><path d="m4 3 5 5-3 3-5-5zM20 13l3 3-5 5-3-3zM14 4l6-3M4 20l6-3"/><circle cx="12" cy="12" r="1"/></>,
    network: <><circle cx="5" cy="12" r="3"/><circle cx="19" cy="5" r="3"/><circle cx="19" cy="19" r="3"/><path d="m8 11 8-4M8 13l8 4"/></>,
    activity: <><path d="M3 12h4l2.5-7 5 14 2.5-7h4"/></>,
    shield: <><path d="M12 2 4.5 5v6c0 5 3.1 9 7.5 11 4.4-2 7.5-6 7.5-11V5z"/><path d="m8.5 12 2.2 2.2 4.8-5"/></>,
    drone: <><circle cx="12" cy="12" r="2.5"/><path d="M9.5 10 6 7M14.5 10 18 7M9.5 14 6 17M14.5 14l3.5 3"/><circle cx="5" cy="6" r="2.5"/><circle cx="19" cy="6" r="2.5"/><circle cx="5" cy="18" r="2.5"/><circle cx="19" cy="18" r="2.5"/></>,
    station: <><path d="M6 21h12M9 21l3-11 3 11M8 14h8"/><path d="M7 9a7 7 0 0 1 10 0M4 6a11 11 0 0 1 16 0"/></>,
    alert: <><path d="M12 3 2.5 20h19z"/><path d="M12 9v4M12 17h.01"/></>,
    check: <><circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    arrow: <><path d="M5 12h14M14 7l5 5-5 5"/></>,
    cpu: <><rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M18 9h4M2 15h4M18 15h4"/><rect x="9" y="9" width="6" height="6" rx="1"/></>,
    globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></>,
    volume: <><path d="M5 9H2v6h3l5 4V5z"/><path d="M14 9a4 4 0 0 1 0 6M17 6a8 8 0 0 1 0 12"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`brand-mark ${compact ? "compact" : ""}`} aria-label="Raksha Net shield and satellite network logo">
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <defs>
          <linearGradient id="shieldMetal" x1="8" y1="5" x2="54" y2="58" gradientUnits="userSpaceOnUse">
            <stop stopColor="#BEEBFA" stopOpacity=".38"/>
            <stop offset=".42" stopColor="#167FB4" stopOpacity=".18"/>
            <stop offset="1" stopColor="#061426" stopOpacity=".6"/>
          </linearGradient>
          <linearGradient id="satMetal" x1="18" y1="21" x2="45" y2="39" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E8F8FC"/>
            <stop offset=".45" stopColor="#39D3FF"/>
            <stop offset="1" stopColor="#1674A6"/>
          </linearGradient>
        </defs>
        <path className="logo-shield" d="M32 4 55 13v18c0 14-9.2 24.5-23 29C18.2 55.5 9 45 9 31V13z"/>
        <path className="logo-shield-inner" d="M32 9.5 49.5 16v14.5c0 10.4-6.3 19-17.5 23.5-11.2-4.5-17.5-13.1-17.5-23.5V16z"/>
        <ellipse className="logo-orbit" cx="32" cy="30" rx="21" ry="8" transform="rotate(-18 32 30)"/>
        <path className="logo-sat" d="m28 26 6 2-2 7-6-2zM20 21l8 4-2 5-9-3zM34 30l10 3-2 6-10-4z"/>
        <circle className="logo-node" cx="48" cy="21" r="2.5"/>
        <circle className="logo-node secondary" cx="16" cy="40" r="1.7"/>
      </svg>
    </div>
  );
}

function HoloAsset({ type = "satellite", active = false }: { type?: "satellite" | "drone"; active?: boolean }) {
  return (
    <div className={`holo-asset ${type} ${active ? "active" : ""}`} aria-label={`Holographic ${type} model`}>
      <div className="holo-axis axis-x"/>
      <div className="holo-axis axis-y"/>
      <div className="holo-shadow"/>
      <svg viewBox="0 0 240 150" aria-hidden="true">
        <defs>
          <linearGradient id={`body-${type}`} x1="60" y1="30" x2="170" y2="125" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D8F5FC"/>
            <stop offset=".28" stopColor="#6397AF"/>
            <stop offset=".55" stopColor="#193D58"/>
            <stop offset="1" stopColor="#071827"/>
          </linearGradient>
          <linearGradient id={`panel-${type}`} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#42D6F5"/>
            <stop offset=".4" stopColor="#175D89"/>
            <stop offset="1" stopColor="#0A2039"/>
          </linearGradient>
        </defs>
        {type === "satellite" ? (
          <g className="model-float">
            <path className="model-panel" fill={`url(#panel-${type})`} d="m15 51 70 15-8 40-69-19z"/>
            <path className="panel-grid" d="m28 55-8 36m24-32-8 37m24-34-8 38m24-35-8 38M13 69l68 17M10 80l69 17"/>
            <path className="model-panel" fill={`url(#panel-${type})`} d="m155 47 72-18 7 38-72 21z"/>
            <path className="panel-grid" d="m168 44 7 40m10-44 6 39m11-43 5 39m11-43 4 39m-63-8 72-17m-70 29 72-18"/>
            <path className="model-body" fill={`url(#body-${type})`} d="m86 47 42-16 35 25-7 58-44 18-37-27z"/>
            <path className="model-edge" d="m86 47 36 25 41-16M122 72l-10 60M75 105l37 27 44-18"/>
            <ellipse className="dish" cx="126" cy="48" rx="24" ry="9" transform="rotate(-15 126 48)"/>
            <path className="model-edge" d="m124 48 5 25M99 88h61"/>
            <circle className="model-light" cx="145" cy="78" r="4"/>
          </g>
        ) : (
          <g className="model-float">
            <path className="model-body" fill={`url(#body-${type})`} d="m74 68 46-30 47 30-17 37-30 14-31-14z"/>
            <path className="model-edge" d="m74 68 46 20 47-20M120 88v31"/>
            <path className="model-panel" fill={`url(#panel-${type})`} d="m76 68-45-20-20 11 55 35zM164 68l45-20 20 11-55 35z"/>
            <path className="model-edge" d="M47 56 21 70m173-14 25 14M88 105l-34 25m98-25 34 25"/>
            <ellipse className="rotor" cx="49" cy="43" rx="34" ry="7"/>
            <ellipse className="rotor" cx="192" cy="43" rx="34" ry="7"/>
            <circle className="model-light" cx="120" cy="80" r="5"/>
          </g>
        )}
      </svg>
      <div className="holo-base"><i/><span/></div>
    </div>
  );
}

function StatusDot({ status = "online" }: { status?: "online" | "warning" | "offline" }) {
  return <span className={`status-dot ${status}`} />;
}

function Button({
  children,
  variant = "primary",
  onClick,
  disabled = false,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  onClick?: () => void;
  disabled?: boolean;
}) {
  return <button className={`btn ${variant}`} onClick={onClick} disabled={disabled}>{children}</button>;
}

function useSystemAudio() {
  const [enabled, setEnabled] = useState(() => typeof window !== "undefined" && window.sessionStorage.getItem("raksha-audio") === "on");
  const enabledRef = useRef(enabled);
  const contextRef = useRef<AudioContext | null>(null);
  const ambienceSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const ambienceGainRef = useRef<GainNode | null>(null);
  const ambienceLoadingRef = useRef(false);
  const activeAudiosRef = useRef<Set<HTMLAudioElement>>(new Set());
  const restoreTimerRef = useRef<number | null>(null);
  const repairPulseRef = useRef(0);
  const sources: Omit<Record<SoundName, string>, "repairStage"> = {
    boot: "/audio/boot.wav",
    click: "/audio/click.wav",
    navigation: "/audio/navigation.wav",
    scan: "/audio/scan.wav",
    warning: "/audio/warning.wav",
    analysis: "/audio/analysis.wav",
    repair: "/audio/repair.wav",
    success: "/audio/success.wav",
    resolved: "/audio/resolved.wav",
    alert: "/audio/alert.wav",
  };

  const getContext = () => {
    if (!contextRef.current) {
      const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) contextRef.current = new AudioContextClass();
    }
    return contextRef.current;
  };

  const startAmbience = async () => {
    if (!enabledRef.current || ambienceSourceRef.current || ambienceLoadingRef.current) return;
    const context = getContext();
    if (!context) return;
    ambienceLoadingRef.current = true;
    if (context.state === "suspended") await context.resume().catch(() => undefined);
    try {
      const response = await fetch("/audio/ambience.wav");
      const buffer = await context.decodeAudioData(await response.arrayBuffer());
      if (!enabledRef.current || ambienceSourceRef.current) return;
      const source = context.createBufferSource();
      const gain = context.createGain();
      source.buffer = buffer;
      source.loop = true;
      gain.gain.setValueAtTime(.12, context.currentTime);
      source.connect(gain);
      gain.connect(context.destination);
      source.start();
      ambienceSourceRef.current = source;
      ambienceGainRef.current = gain;
    } catch {
      // The visible audio control remains available if decoding is unsupported.
    } finally {
      ambienceLoadingRef.current = false;
    }
  };

  const duckAmbience = (name: SoundName) => {
    const settings: Partial<Record<SoundName, [number, number]>> = {
      scan: [.055, 700],
      warning: [.022, 1350],
      analysis: [.05, 1150],
      repair: [.035, 1200],
      repairStage: [.075, 680],
      success: [.018, 1700],
      resolved: [.03, 1300],
      alert: [.065, 420],
    };
    const setting = settings[name];
    const context = contextRef.current;
    const gain = ambienceGainRef.current;
    if (!setting || !context || !gain) return;
    gain.gain.cancelScheduledValues(context.currentTime);
    gain.gain.linearRampToValueAtTime(setting[0], context.currentTime + .08);
    if (restoreTimerRef.current) window.clearTimeout(restoreTimerRef.current);
    restoreTimerRef.current = window.setTimeout(() => {
      if (!enabledRef.current || !ambienceGainRef.current || !contextRef.current) return;
      const currentContext = contextRef.current;
      ambienceGainRef.current.gain.cancelScheduledValues(currentContext.currentTime);
      ambienceGainRef.current.gain.linearRampToValueAtTime(.12, currentContext.currentTime + .55);
    }, setting[1]);
  };

  const playFile = (name: SoundName) => {
    const source = name === "repairStage"
      ? `/audio/repair-progress-${(repairPulseRef.current++ % 3) + 1}.wav`
      : sources[name];
    const audio = new Audio(source);
    const volumes: Partial<Record<SoundName, number>> = {
      click: .18, navigation: .22, scan: .3, warning: .46, analysis: .3,
      repair: .38, repairStage: .19, success: .43, resolved: .34, alert: .28, boot: .3,
    };
    audio.volume = volumes[name] ?? .28;
    audio.preload = "auto";
    activeAudiosRef.current.add(audio);
    const release = () => activeAudiosRef.current.delete(audio);
    audio.addEventListener("ended", release, { once: true });
    audio.addEventListener("error", release, { once: true });
    duckAmbience(name);
    void audio.play().catch(() => {
      // Playback remains consent-based; rejected autoplay is intentionally ignored.
      release();
    });
  };

  const play = (name: SoundName) => {
    if (!enabledRef.current) return;
    void startAmbience();
    playFile(name);
  };

  const stopAllAudio = () => {
    if (restoreTimerRef.current) window.clearTimeout(restoreTimerRef.current);
    restoreTimerRef.current = null;
    activeAudiosRef.current.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
    activeAudiosRef.current.clear();
    if (ambienceSourceRef.current) {
      try { ambienceSourceRef.current.stop(); } catch { /* Source may already be stopped. */ }
      ambienceSourceRef.current.disconnect();
    }
    ambienceGainRef.current?.disconnect();
    ambienceSourceRef.current = null;
    ambienceGainRef.current = null;
  };

  const toggle = () => {
    const next = !enabled;
    enabledRef.current = next;
    setEnabled(next);
    window.sessionStorage.setItem("raksha-audio", next ? "on" : "off");
    if (next) {
      void startAmbience();
      playFile("boot");
    } else {
      stopAllAudio();
    }
  };

  useEffect(() => {
    enabledRef.current = enabled;
    [...Object.values(sources), "/audio/repair-progress-1.wav", "/audio/repair-progress-2.wav", "/audio/repair-progress-3.wav"].forEach((source) => {
      const audio = new Audio(source);
      audio.preload = "auto";
    });
    return () => stopAllAudio();
  }, []);

  return { enabled, toggle, play };
}

type ChatRoute = "diagnostics" | "assets" | "recovery" | "detect" | "network" | "command";
type ChatMessage = {
  id: number;
  role: "assistant" | "user";
  text: string;
  actions?: { label: string; route: ChatRoute }[];
};

function RakshaChat({
  recoveryComplete,
  activeAnomalies,
  repairedSystems,
  demoActive,
  playSound,
  onRoute,
}: {
  recoveryComplete: boolean;
  activeAnomalies: number;
  repairedSystems: number;
  demoActive: boolean;
  playSound: (name: SoundName) => void;
  onRoute: (route: ChatRoute) => void;
}) {
  const initialMessage = (): ChatMessage => ({
    id: Date.now(),
    role: "assistant",
    text: recoveryComplete
      ? "RAKSHA AI online. Satellite-07 is operational and the defense network is secure. How can I assist?"
      : "RAKSHA AI online. I am monitoring 60 protected assets. Satellite-07 currently has an isolated communication anomaly.",
  });
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage()]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const previousRecovery = useRef(recoveryComplete);
  const suggestions = ["System status", "Active anomalies", "Explain self-repair", "Check Satellite-07", "Check drone fleet", "Network health"];

  useEffect(() => {
    if (!previousRecovery.current && recoveryComplete) {
      setMessages((current) => [...current, {
        id: Date.now(),
        role: "assistant",
        text: "Recovery update: Satellite-07 has been repaired and independently verified. Current status: OPERATIONAL. Active anomalies: 02.",
      }]);
    }
    previousRecovery.current = recoveryComplete;
  }, [recoveryComplete]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const answer = (question: string): Omit<ChatMessage, "id" | "role"> => {
    const value = question.toLowerCase();
    if (value.includes("drone-03") || (value.includes("drone") && value.includes("telemetry"))) {
      return {
        text: "Drone-03 is currently operational with 91% health and stable telemetry. If telemetry is lost, verify the secure link first, then run system diagnostics before initiating recovery.",
        actions: [{ label: "RUN DIAGNOSTICS", route: "diagnostics" }, { label: "VIEW ASSET", route: "assets" }],
      };
    }
    if (value.includes("active anomal") || value.includes("show anomal")) {
      return {
        text: recoveryComplete
          ? `There are ${String(activeAnomalies).padStart(2, "0")} unresolved anomalies: Aero-System-04 telemetry synchronization drift, Ground-08 elevated packet latency${demoActive ? ", and one simulated Drone-12 checksum variance" : ""}. Satellite-07 is resolved and excluded.`
          : `There are ${String(activeAnomalies).padStart(2, "0")} unresolved anomalies, including the Satellite-07 communication module anomaly, Aero-System-04 telemetry drift, Ground-08 elevated packet latency${demoActive ? ", and a simulated Drone-12 checksum variance" : ""}.`,
        actions: [{ label: "VIEW ANOMALIES", route: "diagnostics" }, { label: "VIEW NETWORK", route: "network" }],
      };
    }
    if (value.includes("satellite-07") || value.includes("sat-07") || value.includes("still faulty") || value.includes("been repaired")) {
      return recoveryComplete
        ? { text: "No. Satellite-07 was successfully repaired and verified. Status: OPERATIONAL. Health: 100%. Communication module anomaly: NONE.", actions: [{ label: "VIEW ASSET", route: "assets" }] }
        : { text: "Satellite-07 has a simulated communication module anomaly. Its link is degraded, but the fault is isolated from critical operations. AI confidence is 94%.", actions: [{ label: "RUN DIAGNOSTICS", route: "diagnostics" }, { label: "VIEW ASSET", route: "assets" }, { label: "START RECOVERY", route: "recovery" }] };
    }
    if (value.includes("why") && value.includes("anomal") || value.includes("what anomaly")) {
      return {
        text: recoveryComplete
          ? "The detected issue was unexpected behavior in Satellite-07's communication module. It was isolated, autonomously repaired, and verified."
          : "Unexpected communication behavior was detected in Satellite-07's communication module. The recommended action is to isolate the module and initiate autonomous recovery.",
        actions: recoveryComplete ? [{ label: "VIEW ASSET", route: "assets" }] : [{ label: "ANALYZE THREAT", route: "detect" }, { label: "START RECOVERY", route: "recovery" }],
      };
    }
    if (value.includes("self-repair") || value.includes("autonomous recovery") || value.includes("recovery work")) {
      return {
        text: "Autonomous recovery follows five verified stages: Detect, Diagnose, Isolate, Repair, and Verify. If the operator does not respond within two minutes, the safety protocol can begin recovery automatically.",
        actions: recoveryComplete ? [{ label: "VIEW ASSET", route: "assets" }] : [{ label: "START RECOVERY", route: "recovery" }],
      };
    }
    if (value.includes("network health")) {
      return { text: `Network health is 98.7% with 1,249 encrypted data links and 56 active assets. ${recoveryComplete ? "Satellite-07 is restored and stable." : "Satellite-07 remains in protected degraded mode."}`, actions: [{ label: "VIEW NETWORK", route: "network" }] };
    }
    if (value.includes("operational") && value.includes("satellite")) {
      return { text: `Priority orbital assets Satellite-01, Satellite-12, and Satellite-18 are operational. Satellite-07 is ${recoveryComplete ? "also operational at 100% health" : "currently in warning state with an isolated communication anomaly"}.`, actions: [{ label: "VIEW ASSETS", route: "assets" }] };
    }
    if (value.includes("drone fleet") || value.includes("drones")) {
      return { text: "The drone fleet has 24 monitored assets. Drone-01, Drone-03, Drone-07, and Drone-12 are operational with stable encrypted telemetry.", actions: [{ label: "VIEW ASSETS", route: "assets" }] };
    }
    if (value.includes("repair history") || value.includes("repaired systems")) {
      return { text: recoveryComplete ? `${repairedSystems} systems have been repaired. The latest recovery was Satellite-07's communication module under protocol RP-7741.` : `${repairedSystems} systems have been repaired. Satellite-07 recovery is currently available but not yet completed.` };
    }
    if (value.includes("ground") || value.includes("aerospace")) {
      return { text: "RAKSHA NET monitors 8 aerospace systems and 16 ground systems. Aero-System-04 and Ground-08 are the only unresolved conditions in those domains.", actions: [{ label: "VIEW ASSETS", route: "assets" }] };
    }
    return {
      text: `The defense network is SECURE at 98.7% health. 60 assets are monitored, 56 are active, and ${String(activeAnomalies).padStart(2, "0")} anomalies remain unresolved. Satellite-07 is ${recoveryComplete ? "operational" : "in attention-required state"}.`,
      actions: [{ label: "ANALYZE NETWORK", route: "diagnostics" }, { label: "VIEW NETWORK", route: "network" }],
    };
  };

  const sendMessage = (text: string) => {
    const clean = text.trim();
    if (!clean || typing) return;
    playSound("click");
    setMessages((current) => [...current, { id: Date.now(), role: "user", text: clean }]);
    setInput("");
    setTyping(true);
    window.setTimeout(() => {
      const response = answer(clean);
      setMessages((current) => [...current, { id: Date.now() + 1, role: "assistant", ...response }]);
      setTyping(false);
      playSound("analysis");
    }, 620);
  };

  return (
    <>
      <button className={`ai-chat-launcher ${open ? "open" : ""}`} onClick={() => { setOpen((current) => !current); playSound("analysis"); }} aria-label={open ? "Close Raksha AI" : "Open Raksha AI"}>
        <span className="chat-orb"><i/><b/><Icon name="cpu" size={22}/></span>
        <span><strong>RAKSHA AI</strong><small>INTELLIGENCE ONLINE</small></span>
        <i className="launcher-status"/>
      </button>
      {open && <aside className="ai-chat-panel">
        <header className="chat-header">
          <div className="chat-avatar"><span/><Icon name="cpu" size={21}/></div>
          <div><span>RAKSHA AI</span><strong>System Intelligence Online</strong><small><i/> ONLINE</small></div>
          <button onClick={() => setMessages([initialMessage()])} aria-label="Clear chat"><Icon name="activity" size={15}/><span>CLEAR</span></button>
          <button onClick={() => setOpen(false)} aria-label="Close chat"><span className="close-lines">×</span></button>
        </header>
        <div className="chat-context-bar"><Icon name="shield" size={12}/><span>CONNECTED TO LIVE RAKSHA NET STATE</span><strong>{String(activeAnomalies).padStart(2, "0")} ACTIVE ALERTS</strong></div>
        <div className="chat-messages">
          {messages.map((message) => <div className={`chat-message ${message.role}`} key={message.id}>
            {message.role === "assistant" && <span className="message-avatar"><Icon name="cpu" size={12}/></span>}
            <div><p>{message.text}</p>{message.actions && <section>{message.actions.map((action) => <button key={action.label} onClick={() => { onRoute(action.route); playSound("navigation"); setOpen(false); }}>{action.label}</button>)}</section>}<time>{message.role === "assistant" ? "RAKSHA AI" : "OPERATOR"}</time></div>
          </div>)}
          {typing && <div className="chat-message assistant"><span className="message-avatar"><Icon name="cpu" size={12}/></span><div className="typing-indicator"><i/><i/><i/><span>Analyzing system context</span></div></div>}
          <div ref={messageEndRef}/>
        </div>
        <div className="chat-suggestions"><span>SUGGESTED</span><div>{suggestions.map((suggestion) => <button key={suggestion} onClick={() => sendMessage(suggestion)}>{suggestion}</button>)}</div></div>
        <div className="chat-input">
          <input value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") sendMessage(input); }} placeholder="Ask RAKSHA AI about the network…" aria-label="Message Raksha AI"/>
          <button onClick={() => sendMessage(input)} disabled={!input.trim() || typing} aria-label="Send message"><Icon name="arrow" size={17}/></button>
        </div>
      </aside>}
    </>
  );
}

const navItems: { key: NavKey; label: string; icon: IconName }[] = [
  { key: "command", label: "Command Center", icon: "grid" },
  { key: "detect", label: "Detect", icon: "scan" },
  { key: "assets", label: "Assets", icon: "satellite" },
  { key: "network", label: "Network", icon: "network" },
  { key: "system", label: "System", icon: "activity" },
];

function PageHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <div className="page-heading">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        <p>{copy}</p>
      </div>
      <div className="live-badge"><span /> LIVE NETWORK</div>
    </div>
  );
}

function Metric({ label, value, detail, tone = "blue" }: { label: string; value: string; detail: string; tone?: "blue" | "green" | "amber" | "purple" }) {
  return (
    <div className="metric-card">
      <div className={`metric-accent ${tone}`} />
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </div>
  );
}

function EarthVisual({ large = false, satelliteRestored = false }: { large?: boolean; satelliteRestored?: boolean }) {
  return (
    <div className={`earth-visual ${large ? "large" : ""}`}>
      <div className="star-depth depth-one"/>
      <div className="star-depth depth-two"/>
      <div className="globe-stage">
        <div className="globe-aura"/>
        <div className="globe">
          <img src={earthImage} alt="Earth viewed from orbit" />
          <div className="earth-shade" />
          <div className="earth-atmosphere"/>
        </div>
        <div className="orbit orbit-one"><span className="orbit-satellite sat-one"><i/><b/></span></div>
        <div className="orbit orbit-two"><span className="orbit-satellite sat-two"><i/><b/></span></div>
        <div className="orbit orbit-three"><span className="orbit-satellite sat-three"><i/><b/></span></div>
        <div className="holo-latitude lat-one"/>
        <div className="holo-latitude lat-two"/>
      </div>
      <span className={`map-node node-1 ${satelliteRestored ? "operational" : "warning"}`}><i /> SATELLITE-07 {satelliteRestored ? "OPERATIONAL" : "WARNING"}</span>
      {!satelliteRestored && <span className="map-node node-2 warning"><i /> ANOMALY</span>}
      <span className="map-node node-3"><i /> GS-DEL 01</span>
      {!large && <>
        <div className="floating-stat float-one"><span>ORBITAL ASSETS</span><strong>145</strong><i>98% READY</i></div>
        <div className="floating-stat float-two"><span>SECURE LINKS</span><strong>1,249</strong><i>LIVE MESH</i></div>
      </>}
      <div className="map-readout">
        <span>ORBITAL GRID</span>
        <strong>42° N · 78° E</strong>
      </div>
    </div>
  );
}

function AssetMiniCard({ icon, title, count, status, statusType = "online" }: { icon: IconName; title: string; count: string; status: string; statusType?: "online" | "warning" | "offline" }) {
  return (
    <div className="asset-mini">
      <div className="icon-tile"><Icon name={icon} /></div>
      <div><span>{title}</span><strong>{count}</strong></div>
      <small><StatusDot status={statusType} />{status}</small>
    </div>
  );
}

function CommandCenter({
  onDetect,
  satelliteOperational,
  activeAnomalies,
  repairedSystems,
  demoActive,
  demoComplete,
  onDemoToggle,
}: {
  onDetect: () => void;
  satelliteOperational: boolean;
  activeAnomalies: number;
  repairedSystems: number;
  demoActive: boolean;
  demoComplete: boolean;
  onDemoToggle: () => void;
}) {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <div className="hero-brand"><BrandMark /><span>AI AUTONOMOUS DEFENSE NETWORK</span></div>
          <h1>RAKSHA <em>NET</em></h1>
          <p>One intelligent defense layer protecting every critical aerospace asset—from orbit to ground.</p>
          <div className="hero-status">
            <span className="pulse-ring"><Icon name="shield" size={22}/></span>
            <div><small>OVERALL NETWORK STATUS</small><strong className={satelliteOperational ? "" : "amber-text"}>{satelliteOperational ? "ALL SYSTEMS OPERATIONAL" : "ATTENTION REQUIRED"}</strong></div>
          </div>
          <div className="hero-actions">
            <Button onClick={onDetect}><Icon name="scan" /> SCAN &amp; DETECT <Icon name="arrow" /></Button>
            <Button variant="secondary" onClick={onDemoToggle}><Icon name={demoActive ? "activity" : "cpu"} /> {demoActive ? "EXIT DEMO MODE" : "DEMO MODE"}</Button>
          </div>
        </div>
        <div className="hero-map">
          <EarthVisual satelliteRestored={satelliteOperational} />
          <div className="coverage-ring"><strong>98.7%</strong><span>GLOBAL COVERAGE</span></div>
        </div>
      </section>

      <section className="metrics">
        <Metric label="TOTAL ASSETS" value="1,284" detail="+12 this cycle" />
        <Metric label="ACTIVE ASSETS" value="1,249" detail="97.3% availability" tone="green" />
        <Metric label="ACTIVE ANOMALIES" value={String(activeAnomalies).padStart(2, "0")} detail={satelliteOperational ? "All under observation" : "1 medium priority"} tone="amber" />
        <Metric label="REPAIRED SYSTEMS" value={String(repairedSystems)} detail={satelliteOperational && repairedSystems >= 18 ? "SATELLITE-07 verified" : "100% recovery rate"} tone="purple" />
      </section>

      <section className="dashboard-grid">
        <div className="panel asset-overview">
          <div className="panel-head"><div><span className="eyebrow">FLEET READINESS</span><h3>Asset Status</h3></div><button className="text-button">VIEW ALL <Icon name="arrow" size={14}/></button></div>
          <div className="asset-grid">
            <AssetMiniCard icon="satellite" title="SATELLITES" count="142 / 145" status={satelliteOperational ? "SATELLITE-07 Operational" : "SATELLITE-07 Attention Required"} statusType={satelliteOperational ? "online" : "warning"} />
            <AssetMiniCard icon="drone" title="DRONE FLEET" count="628 / 640" status="Operational" />
            <AssetMiniCard icon="cpu" title="AEROSPACE" count="86 / 89" status="2 warnings" statusType="warning" />
            <AssetMiniCard icon="station" title="GROUND SYSTEMS" count="393 / 410" status="Operational" />
          </div>
        </div>
        <div className={`panel anomaly-panel ${satelliteOperational ? "recovery-record" : ""}`}>
          <div className="panel-head"><div><span className={`eyebrow ${satelliteOperational ? "green-text" : "amber-text"}`}>{satelliteOperational ? "SYSTEM BASELINE" : "PRIORITY SIGNAL"}</span><h3>{satelliteOperational ? "Satellite-07 Status" : "Active Anomaly"}</h3></div><span className={satelliteOperational ? "verified-chip" : "severity high"}>{satelliteOperational ? "OPERATIONAL" : "MEDIUM"}</span></div>
          <div className="anomaly-target">
            <div className={`target-radar ${satelliteOperational ? "restored" : ""}`}><span />{satelliteOperational ? <Icon name="check" size={28}/> : <Icon name="satellite" size={28}/>}</div>
            <div><small>{satelliteOperational ? "MONITORED ASSET" : "AFFECTED ASSET"}</small><strong>SATELLITE-07</strong><span>{satelliteOperational ? "Communication module · Operational" : "Communication module anomaly"}</span></div>
          </div>
          <div className="confidence"><span>{satelliteOperational ? "SYSTEM INTEGRITY" : "AI CONFIDENCE"}</span><strong>{satelliteOperational ? "100%" : "94%"}</strong><div><i style={{width: satelliteOperational ? "100%" : "94%"}} /></div></div>
          <button className={`text-button ${satelliteOperational ? "green-text" : "amber-text"}`} onClick={onDetect}>{satelliteOperational ? "RUN NEW SCAN" : "REVIEW THREAT"} <Icon name="arrow" size={14}/></button>
        </div>
      </section>
      {demoComplete && <div className="demo-resolution-message"><Icon name="check" size={18}/><div><strong>SIMULATED INCIDENT RESOLVED</strong><span>RAKSHA NET AUTONOMOUS RESPONSE SUCCESSFUL</span></div><small>DEMO DATA · NO REAL-WORLD SYSTEMS</small></div>}
    </>
  );
}

function DetectionScreen({ onAnalyze, recoveryComplete, onAnomalyDetected, onSound }: { onAnalyze: () => void; recoveryComplete: boolean; onAnomalyDetected: () => void; onSound: (name: SoundName) => void }) {
  const [assetType, setAssetType] = useState("Satellite");
  const [scanning, setScanning] = useState(false);
  const [detected, setDetected] = useState(false);
  const [scanStep, setScanStep] = useState(-1);

  useEffect(() => {
    if (!scanning) return;
    setDetected(false);
    setScanStep(0);
    const timer = window.setInterval(() => {
      setScanStep((current) => {
        if (current >= 3) {
          window.clearInterval(timer);
          window.setTimeout(() => {
            setScanning(false);
            setDetected(true);
            onAnomalyDetected();
            onSound("warning");
          }, 450);
          return 3;
        }
        return current + 1;
      });
    }, 720);
    return () => window.clearInterval(timer);
  }, [scanning]);

  const assets = [
    ["Satellite", "satellite"], ["Drone", "drone"], ["Aerospace System", "cpu"],
    ["Communication System", "network"], ["Ground Station", "station"],
  ] as [string, IconName][];
  const assetDetails: Record<string, { id: string; location: string; health: string; diagnostic: string }> = {
    Satellite: { id: "SATELLITE-07", location: "LEO · 42°N 78°E", health: "91.2%", diagnostic: "18 Jun · 11:38 IST" },
    Drone: { id: "VAJRA-DR-218", location: "Sector Delta · 9,400 m", health: "94.8%", diagnostic: "18 Jun · 11:35 IST" },
    "Aerospace System": { id: "GARUDA-AE-12", location: "Airspace West", health: "82.6%", diagnostic: "18 Jun · 11:31 IST" },
    "Communication System": { id: "COM-NODE-44", location: "Orbital Relay 04", health: "96.1%", diagnostic: "18 Jun · 11:29 IST" },
    "Ground Station": { id: "GS-DEL-01", location: "New Delhi · India", health: "98.4%", diagnostic: "18 Jun · 11:26 IST" },
  };
  const selected = assetType === "Satellite" && recoveryComplete && !detected
    ? { ...assetDetails[assetType], health: "100%", diagnostic: "Recovery verified · 11:44 IST" }
    : assetDetails[assetType];
  const scanLabels = ["SCANNING...", "ANALYZING TELEMETRY...", "CHECKING COMMUNICATION...", "CHECKING SYSTEM HEALTH..."];

  return (
    <>
      <div className="threat-heading">
        <div>
          <span className="eyebrow">RAKSHA NET</span>
          <h2>THREAT DETECTION <em>SYSTEM</em></h2>
          <p>Multi-domain telemetry analysis and autonomous anomaly isolation.</p>
        </div>
        <div className="monitoring-badge"><span/><div><strong>LIVE MONITORING</strong><small>1,249 secure asset links</small></div></div>
      </div>
      <div className="threat-layout">
        <section className="panel asset-selector">
          <div className="section-label"><span>01</span><div><strong>ASSET SELECTION</strong><small>Choose target class</small></div></div>
          <div className="selector-list">
            {assets.map(([label, icon]) => (
              <button key={label} className={assetType === label ? "selected" : ""} onClick={() => { setAssetType(label); setScanning(false); setDetected(false); setScanStep(-1); }}>
                <span className="icon-tile"><Icon name={icon} /></span><span>{label}<small>{label === "Satellite" ? "145 linked assets" : "Network connected"}</small></span>
                {assetType === label && <Icon name="check" />}
              </button>
            ))}
          </div>
          <div className="selected-asset">
            <div className="selected-asset-head"><span>SELECTED ASSET</span><StatusDot/></div>
            <dl>
              <div><dt>ASSET ID</dt><dd>{selected.id}</dd></div>
              <div><dt>LOCATION</dt><dd>{selected.location}</dd></div>
              <div><dt>CONNECTION</dt><dd className="green-text">SECURE / ACTIVE</dd></div>
              <div><dt>HEALTH</dt><dd>{selected.health}</dd></div>
              <div><dt>LAST DIAGNOSTIC</dt><dd>{selected.diagnostic}</dd></div>
            </dl>
          </div>
          <Button onClick={() => { setScanning(true); onSound("scan"); }} disabled={scanning}><Icon name="scan"/>{scanning ? "SCAN IN PROGRESS" : "RUN FULL SCAN"}</Button>
        </section>

        <section className={`orbital-scan panel ${scanning ? "is-scanning" : ""}`}>
          <div className="scan-header"><span className="eyebrow">{scanning ? "MULTI-SPECTRUM SCAN ACTIVE" : detected ? "SCAN COMPLETE · ANOMALY ISOLATED" : "GLOBAL ASSET MONITOR"}</span><span>GRID SR-0912 · LIVE</span></div>
          <div className="detection-earth">
            <EarthVisual large satelliteRestored={recoveryComplete && !detected}/>
            <div className="comm-lines"><i/><i/><i/></div>
            <span className="domain-indicator drone-domain"><Icon name="drone" size={12}/> DR-218</span>
            <span className="domain-indicator air-domain"><Icon name="cpu" size={12}/> AE-12</span>
            <span className="domain-indicator comm-domain"><Icon name="network" size={12}/> COM-44</span>
            <div className="radar-rings"><i/><i/><i/></div>
            {scanning && <div className="global-scan-line"/>}
            {detected && <span className="earth-anomaly"><i/><Icon name="alert" size={12}/> SIGNAL VARIANCE</span>}
          </div>
          <div className="scan-sequence">
            {scanLabels.map((label, index) => (
              <div key={label} className={`${scanStep >= index ? "active" : ""} ${scanStep > index || detected ? "complete" : ""}`}>
                <span>{scanStep > index || detected ? <Icon name="check" size={12}/> : index + 1}</span>
                <strong>{label}</strong>
              </div>
            ))}
          </div>
          <div className="scan-progress"><div><span>{scanning ? scanLabels[Math.max(scanStep, 0)] : detected ? "ANOMALY SIGNATURE ISOLATED" : "READY FOR FULL SPECTRUM SCAN"}</span><strong>{scanning ? `${(scanStep + 1) * 25}%` : detected ? "100%" : "STANDBY"}</strong></div><div><i style={{width: scanning ? `${(scanStep + 1) * 25}%` : detected ? "100%" : "0%"}}/></div></div>
        </section>

        <aside className="threat-side">
          <section className={`panel detection-result ${detected ? "revealed anomaly-found" : ""}`}>
          <div className="panel-head"><div><span className="eyebrow">DETECTION RESULT</span><h3>{detected ? "Anomaly Detected" : scanning ? "Scan in progress" : "System ready"}</h3></div>{detected && <span className="warning-symbol"><Icon name="alert"/></span>}</div>
          {detected ? <>
            <dl>
              <div><dt>ASSET</dt><dd>SATELLITE-07</dd></div>
              <div><dt>ISSUE</dt><dd>Communication Module Anomaly</dd></div>
              <div><dt>SEVERITY</dt><dd className="amber-text">MEDIUM</dd></div>
              <div><dt>AI CONFIDENCE</dt><dd>94%</dd></div>
            </dl>
            <div className="anomaly-wave"><svg viewBox="0 0 260 54" preserveAspectRatio="none"><path d="M0 36 18 35 27 31 38 36 58 35 68 17 78 45 91 35 112 34 124 28 136 39 149 34 168 33 179 8 190 50 201 33 221 32 233 27 244 37 260 33"/></svg><span>COMM SIGNAL / CH-04</span></div>
            <Button onClick={onAnalyze}>ANALYZE THREAT <Icon name="arrow"/></Button>
          </> : <div className="result-empty"><Icon name={scanning ? "cpu" : "scan"} size={30}/><span>{scanning ? `Raksha AI is analyzing ${assetType.toLowerCase()} telemetry across all secure channels.` : "Run a full scan to detect telemetry, communication and system-health anomalies."}</span></div>}
          </section>
          <section className="panel live-activity">
            <div className="panel-head"><div><span className="eyebrow">LIVE SYSTEM ACTIVITY</span><h3>Event Stream</h3></div><span className="stream-live"><i/> LIVE</span></div>
            {[
              ["Telemetry received", "11:42:06", 0],
              ["Asset connected", "11:42:07", 1],
              ["Diagnostic initiated", "11:42:08", 2],
              ["Anomaly detected", "11:42:11", 3],
            ].map(([label, time, required]) => {
              const visible = scanStep >= Number(required) || detected;
              return <div className={`activity-row ${visible ? "visible" : ""} ${Number(required) === 3 && detected ? "warning" : ""}`} key={String(label)}><span>{visible ? <Icon name={Number(required) === 3 && detected ? "alert" : "check"} size={12}/> : <i/>}</span><strong>{label}</strong><time>{visible ? time : "--:--:--"}</time></div>;
            })}
          </section>
        </aside>
      </div>
    </>
  );
}

function AnalysisScreen({ onRepair, onSound }: { onRepair: () => void; onSound: (name: SoundName) => void }) {
  const [showDetails, setShowDetails] = useState(false);
  useEffect(() => { onSound("analysis"); }, []);
  return (
    <>
      <div className="threat-heading analysis-heading">
        <div>
          <span className="eyebrow">RAKSHA NET</span>
          <h2>AI THREAT <em>ANALYSIS</em></h2>
          <p>Autonomous diagnosis generated from secure multi-domain telemetry.</p>
        </div>
        <div className="diagnostics-badge"><Icon name="cpu"/><div><strong>AUTONOMOUS DIAGNOSTICS</strong><small>Raksha AI core · secure inference</small></div></div>
      </div>

      <div className="ai-analysis-layout">
        <section className="panel threat-information">
          <div className="analysis-alert-title">
            <span className="warning-symbol"><Icon name="alert"/></span>
            <div><span className="eyebrow amber-text">ANOMALY DETECTED</span><h3>Communication Signal Variance</h3></div>
          </div>
          <div className="threat-data">
            <div><span>ASSET</span><strong>SATELLITE-07</strong></div>
            <div><span>SYSTEM</span><strong>Communication Module</strong></div>
            <div><span>STATUS</span><strong className="amber-text"><StatusDot status="warning"/> DEGRADED</strong></div>
            <div><span>SEVERITY</span><strong className="amber-text">MEDIUM</strong></div>
          </div>
          <div className="analysis-confidence">
            <div className="confidence-dial"><svg viewBox="0 0 76 76"><circle cx="38" cy="38" r="32"/><circle className="dial-value" cx="38" cy="38" r="32"/></svg><strong>94%</strong></div>
            <div><span>AI CONFIDENCE</span><strong>High correlation</strong><small>Compared against 4.8M validated signatures</small></div>
          </div>
          <div className="diagnostic-copy">
            <div><span>DETECTED BEHAVIOUR</span><strong>Unexpected communication behaviour</strong></div>
            <div><span>POSSIBLE CAUSE</span><strong>Communication subsystem anomaly</strong></div>
            <div className="recommended"><span>RECOMMENDED ACTION</span><strong>Isolate affected module and initiate autonomous recovery.</strong></div>
          </div>
        </section>

        <section className="panel satellite-diagnostic">
          <div className="diagnostic-stage-head"><span className="eyebrow">LIVE ASSET DIAGNOSTIC</span><span><StatusDot status="warning"/> LINK DEGRADED</span></div>
          <div className="satellite-stage">
            <div className="satellite-orbit o-one"/><div className="satellite-orbit o-two"/><div className="satellite-orbit o-three"/>
            <div className="diagnostic-axis axis-a"/><div className="diagnostic-axis axis-b"/>
            <HoloAsset active/>
            <span className="module-fault"><i/><Icon name="alert" size={12}/><span>COMM MODULE<br/><strong>FAULT ISOLATED</strong></span></span>
            <span className="telemetry-tag telemetry-a"><i/> SIGNAL / CH-04 <strong>-18.2 dB</strong></span>
            <span className="telemetry-tag telemetry-b"><i/> PACKET INTEGRITY <strong>71.4%</strong></span>
            <span className="telemetry-tag telemetry-c"><i/> SECURE LINK <strong>ACTIVE</strong></span>
            <div className="asset-ground"><i/><span/></div>
          </div>
          <div className="satellite-readout">
            <div><span>ORBIT</span><strong>LEO · 487 KM</strong></div>
            <div><span>VELOCITY</span><strong>7.66 KM/S</strong></div>
            <div><span>NETWORK LINK</span><strong className="amber-text">DEGRADED</strong></div>
            <div><span>MISSION STATUS</span><strong>ACTIVE</strong></div>
          </div>
          {showDetails && <div className="expanded-system-details">
            <div><span>MODULE</span><strong>COM-X4 PRIMARY TRANSCEIVER</strong></div>
            <div><span>REDUNDANCY</span><strong>BACKUP CHANNEL AVAILABLE</strong></div>
            <div><span>IMPACT</span><strong>NO MISSION INTERRUPTION</strong></div>
          </div>}
        </section>

        <section className="panel ai-steps">
          <div className="panel-head"><div><span className="eyebrow">AI DIAGNOSTIC STEPS</span><h3>Decision Trace</h3></div><span className="analysis-complete"><Icon name="check" size={13}/> COMPLETE</span></div>
          <div className="step-grid">
            {["Telemetry analyzed", "System behaviour compared", "Fault location identified", "Recovery path generated"].map((step, index) => <div key={step}><span><Icon name="check" size={13}/></span><div><small>STEP 0{index + 1}</small><strong>{step}</strong></div>{index < 3 && <i/>}</div>)}
          </div>
        </section>

        <aside className="analysis-action-stack">
          <section className="panel raksha-ai-status">
            <div className="ai-core-visual"><span/><Icon name="cpu" size={21}/></div>
            <div><span className="eyebrow">RAKSHA AI</span><strong>Diagnostic analysis complete.</strong><p>Autonomous recovery is available.</p></div>
          </section>
          <section className="panel next-action">
            <span className="eyebrow">NEXT ACTION</span>
            <h3>Authorize Recovery</h3>
            <p>Raksha AI will isolate the affected communication module, activate the redundant channel and verify network stability.</p>
            <Button onClick={onRepair}><Icon name="shield"/> INITIATE SELF-REPAIR <Icon name="arrow"/></Button>
            <Button variant="secondary" onClick={() => setShowDetails((current) => !current)}><Icon name="activity"/> {showDetails ? "HIDE SYSTEM DETAILS" : "VIEW SYSTEM DETAILS"}</Button>
            <small><Icon name="shield" size={11}/> OPERATOR AUTHORIZATION REQUIRED</small>
          </section>
        </aside>
      </div>
    </>
  );
}

function RepairScreen({ onRestored, onSound }: { onRestored: () => void; onSound: (name: SoundName) => void }) {
  const [remaining, setRemaining] = useState(15);
  const [repairing, setRepairing] = useState(false);
  const [stage, setStage] = useState(-1);
  const [autoTriggered, setAutoTriggered] = useState(false);
  const [demoMode, setDemoMode] = useState(true);
  const pipeline = ["Detect", "Diagnose", "Isolate", "Repair", "Verify"];
  const recoveryStages = ["FAULT ISOLATION", "MODULE RECOVERY", "SYSTEM REPAIR", "INTEGRITY CHECK", "SYSTEM VERIFICATION"];

  const startRepair = (auto = false) => {
    setRepairing(true);
    setStage(0);
    onSound("repair");
    if (auto) setAutoTriggered(true);
  };

  useEffect(() => {
    if (repairing) return;
    const tick = window.setInterval(() => setRemaining((value) => {
      if (value <= 1) {
        window.clearInterval(tick);
        startRepair(true);
        return 0;
      }
      return value - 1;
    }), 1000);
    return () => window.clearInterval(tick);
  }, [repairing]);

  useEffect(() => {
    if (!repairing) return;
    const tick = window.setInterval(() => setStage((current) => {
      if (current >= 4) {
        window.clearInterval(tick);
        window.setTimeout(() => {
          onSound("success");
          onRestored();
        }, 1100);
        return 4;
      }
      return current + 1;
    }), 1350);
    return () => window.clearInterval(tick);
  }, [repairing, onRestored]);

  useEffect(() => {
    if (repairing && stage >= 0) onSound("repairStage");
  }, [stage, repairing]);

  const timer = `${String(Math.floor(remaining / 60)).padStart(2, "0")}:${String(remaining % 60).padStart(2, "0")}`;
  const progress = repairing ? Math.min((stage + 1) * 20, 100) : 0;
  const activity = [
    { time: "11:42:11", label: "Anomaly confirmed", visible: true },
    { time: "11:44:11", label: "Operator timeout detected", visible: autoTriggered },
    { time: "11:44:12", label: "Autonomous repair initiated", visible: repairing },
    { time: "11:44:14", label: "Fault isolated", visible: stage >= 2 },
    { time: "11:44:18", label: "Recovery completed", visible: stage >= 4 },
  ];

  return (
    <>
      <div className="threat-heading repair-heading">
        <div>
          <span className="eyebrow">RAKSHA NET</span>
          <h2>AUTONOMOUS <em>SELF-REPAIR</em></h2>
          <p>Secure asset recovery and autonomous subsystem restoration.</p>
        </div>
        <div className="diagnostics-badge"><Icon name="shield"/><div><strong>AUTONOMOUS RECOVERY SYSTEM</strong><small>Protocol RP-7741 · safety verified</small></div></div>
      </div>

      <div className="self-repair-layout">
        <section className={`panel repair-status-card ${repairing ? "active" : ""}`}>
          <div className="repair-status-head"><span className={repairing ? "repair-state-icon" : "warning-symbol"}><Icon name={repairing ? "cpu" : "alert"}/></span><div><span className="eyebrow">{repairing ? "RECOVERY PROTOCOL ACTIVE" : "REPAIR STATUS"}</span><h3>{repairing ? "Autonomous Repair Activated" : "System Anomaly Confirmed"}</h3></div></div>
          <dl>
            <div><dt>ASSET</dt><dd>SATELLITE-07</dd></div>
            <div><dt>FAULT</dt><dd>Communication Module Anomaly</dd></div>
            <div><dt>RECOVERY MODE</dt><dd className={repairing ? "green-text" : ""}>AUTONOMOUS</dd></div>
          </dl>
          <div className="protocol-integrity"><span>PROTOCOL INTEGRITY</span><strong>VERIFIED · 99.9%</strong><div><i/></div></div>
          <div className="recovery-sequence">
            <span>ACTIVE RECOVERY SEQUENCE</span>
            {recoveryStages.map((item, index) => <div key={item} className={`${stage === index ? "active" : ""} ${stage > index ? "complete" : ""}`}><i>{stage > index ? <Icon name="check" size={11}/> : index + 1}</i><strong>{item}</strong>{index < 4 && <b/>}</div>)}
          </div>
        </section>

        <section className={`panel repair-asset-stage ${repairing ? "repairing" : ""} repair-stage-${Math.max(stage, 0)}`}>
          <div className="diagnostic-stage-head"><span className="eyebrow">SATELLITE-07 · LIVE RECOVERY VIEW</span><span><StatusDot status={stage >= 3 ? "online" : "warning"}/> {stage >= 3 ? "STABILIZING" : "MODULE DEGRADED"}</span></div>
          <div className="repair-satellite-space">
            <div className="repair-orbit ring-one"/><div className="repair-orbit ring-two"/><div className="repair-orbit ring-three"/>
            <div className="particle-field">{Array.from({ length: 14 }).map((_, index) => <i key={index}/>)}</div>
            <div className="repair-progress-orbit"><svg viewBox="0 0 260 260"><circle cx="130" cy="130" r="118"/><circle className="progress-value" cx="130" cy="130" r="118" style={{strokeDashoffset: 741 - (741 * progress) / 100}}/></svg></div>
            <HoloAsset active={repairing}/>
            <span className={`repair-module-marker ${stage >= 3 ? "operational" : ""}`}><i/><Icon name={stage >= 3 ? "check" : "alert"} size={12}/><span>COMM MODULE<br/><strong>{stage >= 3 ? "RECOVERING" : "ANOMALY"}</strong></span></span>
            <span className="repair-telemetry telemetry-left"><i/> CONTROL LINK <strong>SECURE</strong></span>
            <span className="repair-telemetry telemetry-right"><i/> MODULE HEALTH <strong>{stage >= 4 ? "100%" : repairing ? `${58 + stage * 9}%` : "58%"}</strong></span>
            {repairing && <div className="repair-beam"/>}
          </div>
          <div className="active-repair-message">
            <span>{repairing ? recoveryStages[Math.max(stage, 0)] : "AWAITING OPERATOR AUTHORIZATION"}</span>
            <strong>{repairing ? `${progress}%` : "STANDBY"}</strong>
            <div><i style={{width: `${progress}%`}}/></div>
            <small>{repairing ? stage >= 4 ? "Recovery complete. Preparing final verification…" : "Raksha AI is executing secure recovery procedures." : "Asset maintained in protected degraded mode."}</small>
          </div>
        </section>

        <aside className="repair-control-stack">
          <section className={`panel timeout-control ${repairing ? "active" : ""}`}>
            <span className="eyebrow">AUTO-REPAIR TIMER</span>
            <div className="timer-orbit"><svg viewBox="0 0 130 130"><circle cx="65" cy="65" r="56"/><circle className="timer-value" cx="65" cy="65" r="56" style={{strokeDashoffset: 352 - (352 * remaining) / (demoMode ? 15 : 120)}}/></svg><div><strong>{repairing ? "ACTIVE" : timer}</strong><span>{repairing ? "REPAIR MODE" : "REMAINING"}</span></div></div>
            <p>Automatic repair will begin if no operator action is detected.</p>
            <div className="timeout-rule"><Icon name="clock" size={13}/><div><strong>02:00 · 2-MINUTE OPERATOR TIMEOUT</strong><span>Production safety rule · shortened for demo</span></div></div>
            {!repairing && <button className={`demo-toggle ${demoMode ? "active" : ""}`} onClick={() => { setDemoMode(true); setRemaining(15); }}><span>PROTOTYPE DEMO</span><strong>{demoMode ? "15 SEC ACTIVE" : "USE 15 SEC TIMER"}</strong></button>}
          </section>
          <section className="panel operator-action">
            <span className="eyebrow">OPERATOR ACTION</span>
            <Button onClick={() => startRepair(false)} disabled={repairing}><Icon name="shield"/> {repairing ? "REPAIR IN PROGRESS" : "INITIATE REPAIR"}</Button>
            <p>Operator intervention available</p>
            <small><Icon name="shield" size={11}/> SECURE AUTHORIZATION CHANNEL</small>
          </section>
        </aside>

        <section className="panel repair-pipeline-panel">
          <div className="panel-head"><div><span className="eyebrow">AUTONOMOUS REPAIR PIPELINE</span><h3>Recovery Progress</h3></div><span className="pipeline-status">{repairing ? `${progress}% COMPLETE` : "READY"}</span></div>
          <div className="pipeline compact-pipeline">
            {pipeline.map((item, index) => (
              <div key={item} className={`${index <= stage && repairing ? "done" : ""} ${index === stage && repairing ? "current" : ""}`}>
                <span>{index < stage && repairing ? <Icon name="check"/> : String(index + 1).padStart(2, "0")}</span>
                <strong>{item}</strong>
                {index < pipeline.length - 1 && <i/>}
              </div>
            ))}
          </div>
        </section>

        <section className="panel repair-activity-log">
          <div className="panel-head"><div><span className="eyebrow">SYSTEM ACTIVITY</span><h3>Recovery Log</h3></div><span className="stream-live"><i/> LIVE</span></div>
          <div className="repair-log-rows">{activity.map((event, index) => <div className={`${event.visible ? "visible" : ""} ${index === 1 && autoTriggered ? "warning" : ""}`} key={event.label}><time>{event.visible ? event.time : "--:--:--"}</time><span>{event.visible ? <Icon name={index === 1 ? "clock" : "check"} size={11}/> : <i/>}</span><strong>{event.label}</strong></div>)}</div>
        </section>
      </div>
    </>
  );
}

function RestoredScreen({ onHome, onReport }: { onHome: () => void; onReport: () => void }) {
  const verificationSteps = ["Anomaly detected", "Fault diagnosed", "Fault isolated", "Module repaired", "System verified", "Asset restored"];

  return (
    <>
      <div className="threat-heading restored-heading">
        <div>
          <span className="eyebrow">RAKSHA NET</span>
          <h2>SYSTEM <em>RESTORED</em></h2>
          <p>Autonomous recovery completed and independently verified.</p>
        </div>
        <div className="diagnostics-badge restored-badge"><Icon name="check"/><div><strong>RECOVERY VERIFICATION</strong><small>Protocol RP-7741 · completed</small></div></div>
      </div>

      <div className="restored-layout">
        <section className="panel restored-asset-stage">
          <div className="diagnostic-stage-head"><span className="eyebrow">SATELLITE-07 · VERIFIED ASSET</span><span className="verified-live"><StatusDot/> FULLY OPERATIONAL</span></div>
          <div className="restored-satellite-space">
            <div className="restored-orbit orbit-a"/><div className="restored-orbit orbit-b"/><div className="restored-orbit orbit-c"/>
            <div className="verification-halo"><svg viewBox="0 0 300 300"><circle cx="150" cy="150" r="136"/><circle className="verified-circle" cx="150" cy="150" r="136"/></svg></div>
            <div className="restored-particles">{Array.from({ length: 16 }).map((_, index) => <i key={index}/>)}</div>
            <HoloAsset active/>
            <span className="operational-module"><i/><Icon name="check" size={12}/><span>COMM MODULE<br/><strong>OPERATIONAL</strong></span></span>
            <span className="restored-telemetry tele-one"><i/> SIGNAL QUALITY <strong>99.8%</strong></span>
            <span className="restored-telemetry tele-two"><i/> SECURE UPLINK <strong>STABLE</strong></span>
            <div className="earth-limb"><span/></div>
          </div>
          <div className="restored-asset-readout">
            <div><span>ORBIT</span><strong>LEO · 487 KM</strong></div>
            <div><span>COMM LINK</span><strong className="cyan-text">STABLE</strong></div>
            <div><span>ASSET HEALTH</span><strong>100%</strong></div>
            <div><span>MISSION</span><strong>ACTIVE</strong></div>
          </div>
        </section>

        <section className="panel restored-status">
          <div className="restored-title"><span><Icon name="check" size={22}/></span><div><small>RECOVERY COMPLETE</small><h3>System Restored</h3><strong>SATELLITE-07</strong></div></div>
          <div className="verification-dial"><svg viewBox="0 0 150 150"><circle cx="75" cy="75" r="64"/><circle className="dial-complete" cx="75" cy="75" r="64"/></svg><div><strong>100%</strong><span>VERIFIED</span></div></div>
          <div className="restored-status-grid">
            <div><span>STATUS</span><strong><StatusDot/> OPERATIONAL</strong></div>
            <div><span>COMMUNICATION MODULE</span><strong><Icon name="check" size={12}/> RESTORED</strong></div>
            <div><span>SYSTEM INTEGRITY</span><strong><Icon name="shield" size={12}/> VERIFIED</strong></div>
            <div><span>RECOVERY</span><strong><Icon name="check" size={12}/> SUCCESSFUL</strong></div>
          </div>
        </section>

        <aside className="panel repair-summary">
          <div className="panel-head"><div><span className="eyebrow">REPAIR SUMMARY</span><h3>Recovery Record</h3></div><span className="summary-id">RP-7741</span></div>
          <dl>
            <div><dt>ANOMALY</dt><dd>Communication Module Anomaly</dd></div>
            <div><dt>RECOVERY</dt><dd>Autonomous Recovery</dd></div>
            <div><dt>FAULT</dt><dd>Isolated and repaired</dd></div>
            <div><dt>VERIFICATION</dt><dd className="green-text">Completed</dd></div>
          </dl>
          <p>“RAKSHA NET autonomous recovery successfully restored the asset to operational status.”</p>
          <div className="restored-actions">
            <Button onClick={onHome}><Icon name="grid"/> RETURN TO COMMAND CENTER</Button>
            <Button variant="secondary" onClick={onReport}><Icon name="activity"/> VIEW SYSTEM REPORT</Button>
          </div>
        </aside>

        <section className="panel verification-timeline">
          <div className="timeline-heading"><span className="eyebrow">RECOVERY TIMELINE</span><strong>END-TO-END VERIFICATION COMPLETE</strong></div>
          <div className="verification-steps">
            {verificationSteps.map((step, index) => <div key={step}><span><Icon name="check" size={13}/></span><div><small>{`0${index + 1}`}</small><strong>{step}</strong></div>{index < verificationSteps.length - 1 && <i/>}</div>)}
          </div>
        </section>
      </div>
    </>
  );
}

function SystemReport({
  restored,
  onHome,
  onRunDemo,
  onSound,
}: {
  restored: boolean;
  onHome: () => void;
  onRunDemo: () => void;
  onSound: (name: SoundName) => void;
}) {
  useEffect(() => { onSound("success"); }, []);
  const reportTimeline = [
    ["DETECTED", "Communication module anomaly detected on Satellite-07.", "alert"],
    ["DIAGNOSED", "AI analysis identified the affected communication module.", "cpu"],
    ["ISOLATED", "The affected subsystem was isolated from the simulated network.", "shield"],
    ["REPAIR INITIATED", "Autonomous self-repair workflow started.", "activity"],
    ["REPAIR COMPLETED", "Communication module successfully restored.", "check"],
    ["VERIFIED", "System integrity and communication status verified.", "shield"],
  ] as [string, string, IconName][];
  const impact = ["Detection", "AI Diagnosis", "Isolation", "Self-Repair", "Verification"];

  return (
    <>
      <div className="threat-heading report-heading">
        <div>
          <span className="eyebrow">RAKSHA NET</span>
          <h2>SYSTEM INCIDENT &amp; <em>RECOVERY REPORT</em></h2>
          <p>Verified autonomous-response record generated from simulated mission telemetry.</p>
        </div>
        <div className="diagnostics-badge report-status-badge"><Icon name="check"/><div><strong>REPORT STATUS · RESOLVED</strong><small>Generated · 12:26:31 IST</small></div></div>
      </div>

      <div className="system-report-page">
        <section className="panel report-overview">
          <div className="report-id-block"><span>PROFESSIONAL INCIDENT RECORD</span><strong>RKN-SIM-2026-001</strong><small>RAKSHA NET · AUTONOMOUS DEFENSE INTELLIGENCE</small></div>
          <div className="report-generation-line"><i/></div>
          <div className="report-facts">
            <div><span>STATUS</span><strong className={restored ? "green-text" : "amber-text"}>{restored ? "RESOLVED" : "UNDER REVIEW"}</strong></div>
            <div><span>INCIDENT TYPE</span><strong>COMMUNICATION MODULE ANOMALY</strong></div>
            <div><span>ASSET</span><strong>SATELLITE-07</strong></div>
            <div><span>SEVERITY</span><strong className="amber-text">MEDIUM</strong></div>
            <div><span>AI CONFIDENCE</span><strong>94%</strong></div>
          </div>
        </section>

        <section className="panel report-timeline">
          <div className="panel-head"><div><span className="eyebrow">INCIDENT TIMELINE</span><h3>Autonomous Response Sequence</h3></div><span className="analysis-complete"><Icon name="check" size={13}/> 6 / 6 VERIFIED</span></div>
          <div className="report-timeline-steps">
            {reportTimeline.map(([title, description, icon], index) => <div key={title} style={{animationDelay: `${index * 90}ms`}}>
              <span className="report-step-number">{String(index + 1).padStart(2, "0")}</span>
              <span className="report-step-icon"><Icon name={icon} size={15}/></span>
              <div><strong>{title}</strong><p>{description}</p><small>{index < 2 ? "RAKSHA AI CORE" : "PROTOCOL RP-7741"}</small></div>
              {index < reportTimeline.length - 1 && <i/>}
            </div>)}
          </div>
        </section>

        <aside className="report-side">
          <section className="panel report-final-result">
            <div className="result-verified-orb"><span/><Icon name="satellite" size={27}/><i><Icon name="check" size={11}/></i></div>
            <span className="eyebrow">FINAL RESULT</span>
            <h3>Satellite-07</h3>
            <div><span>STATUS</span><strong className="green-text">{restored ? "OPERATIONAL" : "PENDING"}</strong></div>
            <div><span>SYSTEM HEALTH</span><strong>{restored ? "100%" : "72%"}</strong></div>
            <div><span>COMMUNICATION</span><strong className="cyan-text">{restored ? "RESTORED" : "DEGRADED"}</strong></div>
            <div><span>ACTIVE ANOMALY</span><strong className={restored ? "green-text" : "amber-text"}>{restored ? "NONE" : "COMM MODULE"}</strong></div>
          </section>
          <section className="panel report-impact">
            <span className="eyebrow">SYSTEM IMPACT</span>
            {impact.map((item) => <div key={item}><span><Icon name="check" size={12}/>{item}</span><strong>Successful</strong></div>)}
          </section>
        </aside>

        <section className="panel recovery-summary-card">
          <div className="summary-mark"><BrandMark compact/></div>
          <div><span className="eyebrow">RECOVERY SUMMARY</span><p>“RAKSHA NET detected, diagnosed, isolated, repaired and verified the simulated anomaly through its autonomous recovery workflow.”</p></div>
          <div className="report-actions"><Button onClick={onHome}><Icon name="grid"/> RETURN TO COMMAND CENTER</Button><Button variant="secondary" onClick={onRunDemo}><Icon name="activity"/> RUN DEMO AGAIN</Button></div>
        </section>

        <div className="simulated-report-label"><Icon name="shield" size={14}/><div><strong>SIMULATED DATA</strong><span>All satellite, telemetry, network and repair information in this prototype is simulated for demonstration purposes.</span></div></div>
      </div>
    </>
  );
}

function AssetsScreen({ recoveryComplete }: { recoveryComplete: boolean }) {
  type AssetCategory = "Satellites" | "Drones" | "Aerospace" | "Ground";
  type AssetFilter = "All" | AssetCategory;
  type NetworkAsset = {
    id: string;
    category: AssetCategory;
    status: "Operational" | "Warning";
    health: number;
    connectivity: string;
    diagnostic: string;
    activity: string;
    anomaly: string;
    icon: IconName;
  };
  const assets: NetworkAsset[] = [
    { id: "Satellite-01", category: "Satellites", status: "Operational", health: 98, connectivity: "Secure orbital link", diagnostic: "18 Jun · 11:36 IST", activity: "Earth observation · Sector Alpha", anomaly: "None", icon: "satellite" },
    { id: "Satellite-07", category: "Satellites", status: recoveryComplete ? "Operational" : "Warning", health: recoveryComplete ? 100 : 72, connectivity: recoveryComplete ? "Secure orbital link" : "Communication degraded", diagnostic: recoveryComplete ? "Recovery verified · 11:44 IST" : "Anomaly confirmed · 11:42 IST", activity: recoveryComplete ? "Mission operations resumed" : "Protected degraded mode", anomaly: recoveryComplete ? "None" : "Communication Module Anomaly", icon: "satellite" },
    { id: "Satellite-12", category: "Satellites", status: "Operational", health: 96, connectivity: "Secure orbital link", diagnostic: "18 Jun · 11:34 IST", activity: "Signal intelligence · Orbit 12", anomaly: "None", icon: "satellite" },
    { id: "Satellite-18", category: "Satellites", status: "Operational", health: 94, connectivity: "Mesh synchronized", diagnostic: "18 Jun · 11:30 IST", activity: "Relay coverage · Eastern arc", anomaly: "None", icon: "satellite" },
    { id: "Drone-01", category: "Drones", status: "Operational", health: 97, connectivity: "Telemetry stable", diagnostic: "18 Jun · 11:38 IST", activity: "Recon patrol · Sector Delta", anomaly: "None", icon: "drone" },
    { id: "Drone-03", category: "Drones", status: "Operational", health: 91, connectivity: "Telemetry stable", diagnostic: "18 Jun · 11:35 IST", activity: "Perimeter sweep · Corridor 04", anomaly: "None", icon: "drone" },
    { id: "Drone-07", category: "Drones", status: "Operational", health: 88, connectivity: "Encrypted uplink", diagnostic: "18 Jun · 11:32 IST", activity: "Target tracking · Grid 7B", anomaly: "None", icon: "drone" },
    { id: "Drone-12", category: "Drones", status: "Operational", health: 93, connectivity: "Telemetry stable", diagnostic: "18 Jun · 11:29 IST", activity: "Standby formation · Base 02", anomaly: "None", icon: "drone" },
    { id: "Aero-System-01", category: "Aerospace", status: "Operational", health: 99, connectivity: "Defense mesh active", diagnostic: "18 Jun · 11:37 IST", activity: "Airspace coordination", anomaly: "None", icon: "cpu" },
    { id: "Aero-System-04", category: "Aerospace", status: "Warning", health: 84, connectivity: "Relay redundancy active", diagnostic: "18 Jun · 11:28 IST", activity: "Telemetry drift monitoring", anomaly: "Synchronization drift", icon: "cpu" },
    { id: "Aero-System-08", category: "Aerospace", status: "Operational", health: 95, connectivity: "Defense mesh active", diagnostic: "18 Jun · 11:31 IST", activity: "Navigation support", anomaly: "None", icon: "cpu" },
    { id: "Ground-01", category: "Ground", status: "Operational", health: 98, connectivity: "12.8 Gbps secure", diagnostic: "18 Jun · 11:39 IST", activity: "Orbital command uplink", anomaly: "None", icon: "station" },
    { id: "Ground-04", category: "Ground", status: "Operational", health: 96, connectivity: "11.4 Gbps secure", diagnostic: "18 Jun · 11:33 IST", activity: "Telemetry processing", anomaly: "None", icon: "station" },
    { id: "Ground-08", category: "Ground", status: "Warning", health: 86, connectivity: "8.2 Gbps · elevated latency", diagnostic: "18 Jun · 11:27 IST", activity: "Packet latency monitoring", anomaly: "Latency elevated", icon: "station" },
  ];
  const [filter, setFilter] = useState<AssetFilter>("All");
  const [selectedId, setSelectedId] = useState("Satellite-07");
  const selected = assets.find((asset) => asset.id === selectedId) ?? assets[0];
  const visibleCategories = (["Satellites", "Drones", "Aerospace", "Ground"] as AssetCategory[]).filter((category) => filter === "All" || filter === category);
  const filterLabels: { key: AssetFilter; label: string }[] = [
    { key: "All", label: "ALL" }, { key: "Satellites", label: "SATELLITES" }, { key: "Drones", label: "DRONES" },
    { key: "Aerospace", label: "AEROSPACE" }, { key: "Ground", label: "GROUND" },
  ];

  return (
    <>
      <PageHeading eyebrow="ASSET NETWORK" title="Unified Asset Network" copy="Real-time readiness and connectivity across all protected aerospace domains." />
      <section className="asset-summary-cards">
        <Metric label="TOTAL ASSETS" value="60" detail="58 network connected" />
        <Metric label="SATELLITES" value="12" detail={recoveryComplete ? "All priority assets stable" : "1 active warning"} tone={recoveryComplete ? "green" : "amber"} />
        <Metric label="DRONES" value="24" detail="24 mission ready" tone="green" />
        <Metric label="AEROSPACE" value="8" detail="7 fully operational" tone="purple" />
        <Metric label="GROUND SYSTEMS" value="16" detail="16 network linked" tone="blue" />
      </section>

      <div className="asset-network-main">
        <section className="panel asset-network-map">
          <div className="asset-map-head"><div><span className="eyebrow">CONNECTED DEFENSE MESH</span><h3>Global Asset Network</h3></div><div className="asset-filter">{filterLabels.map((item) => <button key={item.key} className={filter === item.key ? "active" : ""} onClick={() => { setFilter(item.key); if (item.key !== "All") setSelectedId(assets.find((asset) => asset.category === item.key)?.id ?? selectedId); }}>{item.label}</button>)}</div></div>
          <div className="asset-earth-stage">
            <EarthVisual large satelliteRestored={recoveryComplete}/>
            <div className="asset-network-lines"><i/><i/><i/><i/></div>
            {(filter === "All" || filter === "Satellites") && <button className={`asset-net-marker marker-sat ${selected.category === "Satellites" ? "selected" : ""}`} onClick={() => setSelectedId("Satellite-07")}><Icon name="satellite" size={12}/><span>SATELLITE-07</span></button>}
            {(filter === "All" || filter === "Drones") && <button className={`asset-net-marker marker-drone ${selected.category === "Drones" ? "selected" : ""}`} onClick={() => setSelectedId("Drone-07")}><Icon name="drone" size={12}/><span>DRONE-07</span></button>}
            {(filter === "All" || filter === "Aerospace") && <button className={`asset-net-marker marker-aero ${selected.category === "Aerospace" ? "selected" : ""}`} onClick={() => setSelectedId("Aero-System-01")}><Icon name="cpu" size={12}/><span>AERO-01</span></button>}
            {(filter === "All" || filter === "Ground") && <button className={`asset-net-marker marker-ground ${selected.category === "Ground" ? "selected" : ""}`} onClick={() => setSelectedId("Ground-01")}><Icon name="station" size={12}/><span>GROUND-01</span></button>}
          </div>
          <div className="asset-map-legend"><span><i className="satellite"/> Satellites · 12</span><span><i className="drone"/> Drones · 24</span><span><i className="aero"/> Aerospace · 8</span><span><i className="ground"/> Ground · 16</span></div>
        </section>

        <aside className="panel asset-detail-panel">
          <div className="asset-detail-visual">
            {selected.category === "Satellites" || selected.category === "Drones"
              ? <HoloAsset type={selected.category === "Drones" ? "drone" : "satellite"} active/>
              : <div className={`system-model ${selected.category.toLowerCase()}`}><span/><Icon name={selected.icon} size={42}/><i/></div>}
          </div>
          <div className="asset-detail-title"><div><span className="eyebrow">SELECTED ASSET</span><h3>{selected.id}</h3><small>{selected.category.toUpperCase()}</small></div><StatusDot status={selected.status === "Warning" ? "warning" : "online"}/></div>
          <dl>
            <div><dt>ASSET ID</dt><dd>{selected.id}</dd></div>
            <div><dt>ASSET TYPE</dt><dd>{selected.category}</dd></div>
            <div><dt>STATUS</dt><dd className={selected.status === "Operational" ? "green-text" : "amber-text"}>{selected.status.toUpperCase()}</dd></div>
            <div><dt>HEALTH</dt><dd>{selected.health}%</dd></div>
            <div><dt>CONNECTIVITY</dt><dd>{selected.connectivity}</dd></div>
            <div><dt>LAST DIAGNOSTIC</dt><dd>{selected.diagnostic}</dd></div>
            <div><dt>CURRENT ACTIVITY</dt><dd>{selected.activity}</dd></div>
            <div><dt>ANOMALY</dt><dd className={selected.anomaly === "None" ? "green-text" : "amber-text"}>{selected.anomaly.toUpperCase()}</dd></div>
          </dl>
          <div className="detail-health"><span>ASSET HEALTH</span><strong>{selected.health}%</strong><div><i style={{width: `${selected.health}%`}}/></div></div>
        </aside>
      </div>

      <section className="panel asset-catalog">
        <div className="panel-head"><div><span className="eyebrow">ASSET REGISTRY</span><h3>Protected Fleet</h3></div><div className="table-legend"><span><StatusDot/> Operational</span><span><StatusDot status="warning"/> Warning</span></div></div>
        {visibleCategories.map((category) => <div className="asset-category" key={category}>
          <div className="asset-category-head"><div className="icon-tile"><Icon name={category === "Satellites" ? "satellite" : category === "Drones" ? "drone" : category === "Aerospace" ? "cpu" : "station"}/></div><div><strong>{category === "Ground" ? "GROUND STATIONS" : category.toUpperCase()}</strong><span>{category === "Satellites" ? "ORBITAL DOMAIN" : category === "Drones" ? "AERIAL DOMAIN" : category === "Aerospace" ? "AEROSPACE DOMAIN" : "TERRESTRIAL DOMAIN"}</span></div></div>
          <div className="asset-card-grid">
            {assets.filter((asset) => asset.category === category).map((asset) => <button className={`network-asset-card ${selected.id === asset.id ? "selected" : ""}`} key={asset.id} onClick={() => setSelectedId(asset.id)}>
              <div className="asset-card-visual">
                {category === "Satellites" || category === "Drones" ? <HoloAsset type={category === "Drones" ? "drone" : "satellite"}/> : <div className={`system-model ${category.toLowerCase()}`}><span/><Icon name={asset.icon} size={28}/><i/></div>}
              </div>
              <div className="asset-card-copy"><span>{category.toUpperCase()}</span><strong>{asset.id}</strong><small><StatusDot status={asset.status === "Warning" ? "warning" : "online"}/>{asset.status}</small></div>
              <div className="asset-card-health"><span>{category === "Drones" ? "BATTERY / HEALTH" : category === "Ground" ? "SIGNAL HEALTH" : "SYSTEM HEALTH"}</span><strong>{asset.health}%</strong><div><i style={{width: `${asset.health}%`}}/></div></div>
              <p>{asset.activity}</p>
            </button>)}
          </div>
        </div>
        )}
      </section>
    </>
  );
}

function NetworkScreen({ recoveryComplete }: { recoveryComplete: boolean }) {
  type MapDomain = "All" | "Satellites" | "Drones" | "Aerospace" | "Ground";
  type MapAsset = {
    id: string;
    shortId: string;
    domain: Exclude<MapDomain, "All">;
    status: "Operational" | "Warning" | "Critical";
    health: number;
    connectivity: string;
    diagnostic: string;
    anomaly: string;
    marker: string;
    icon: IconName;
  };
  const mapAssets: MapAsset[] = [
    { id: "SATELLITE-07", shortId: "SAT-07", domain: "Satellites", status: recoveryComplete ? "Operational" : "Warning", health: recoveryComplete ? 100 : 72, connectivity: recoveryComplete ? "Secure orbital link" : "Communication degraded", diagnostic: recoveryComplete ? "Recovery verified · 11:44 IST" : "Anomaly confirmed · 11:42 IST", anomaly: recoveryComplete ? "None" : "Communication Module Anomaly", marker: "map-sat-07", icon: "satellite" },
    { id: "SATELLITE-12", shortId: "SAT-12", domain: "Satellites", status: "Operational", health: 96, connectivity: "Secure orbital link", diagnostic: "18 Jun · 11:34 IST", anomaly: "None", marker: "map-sat-12", icon: "satellite" },
    { id: "DRONE-03", shortId: "DRONE-03", domain: "Drones", status: "Operational", health: 91, connectivity: "Telemetry stable", diagnostic: "18 Jun · 11:35 IST", anomaly: "None", marker: "map-drone-03", icon: "drone" },
    { id: "DRONE-07", shortId: "DRONE-07", domain: "Drones", status: "Operational", health: 88, connectivity: "Encrypted uplink", diagnostic: "18 Jun · 11:32 IST", anomaly: "None", marker: "map-drone-07", icon: "drone" },
    { id: "AERO-SYSTEM-04", shortId: "AERO-04", domain: "Aerospace", status: "Warning", health: 84, connectivity: "Redundant relay active", diagnostic: "18 Jun · 11:28 IST", anomaly: "Telemetry synchronization drift", marker: "map-aero-04", icon: "cpu" },
    { id: "GROUND-01", shortId: "GROUND-01", domain: "Ground", status: "Operational", health: 98, connectivity: "12.8 Gbps secure", diagnostic: "18 Jun · 11:39 IST", anomaly: "None", marker: "map-ground-01", icon: "station" },
    { id: "GROUND-08", shortId: "GROUND-08", domain: "Ground", status: "Critical", health: 68, connectivity: "Failover link active", diagnostic: "18 Jun · 11:27 IST", anomaly: "Packet latency critical", marker: "map-ground-08", icon: "station" },
  ];
  const [filter, setFilter] = useState<MapDomain>("All");
  const [selectedId, setSelectedId] = useState("SATELLITE-07");
  const selected = mapAssets.find((asset) => asset.id === selectedId) ?? mapAssets[0];
  const filters: { key: MapDomain; label: string; icon: IconName }[] = [
    { key: "All", label: "ALL ASSETS", icon: "globe" },
    { key: "Satellites", label: "SATELLITES", icon: "satellite" },
    { key: "Drones", label: "DRONES", icon: "drone" },
    { key: "Aerospace", label: "AEROSPACE", icon: "cpu" },
    { key: "Ground", label: "GROUND STATIONS", icon: "station" },
  ];
  const mapTime = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });

  return (
    <>
      <div className="threat-heading live-map-heading">
        <div>
          <span className="eyebrow">RAKSHA NET</span>
          <h2>LIVE NETWORK <em>MAP</em></h2>
          <p>Real-time orbital, aerial and terrestrial defense-mesh situational awareness.</p>
        </div>
        <div className="monitoring-badge"><span/><div><strong>REAL-TIME ASSET MONITORING</strong><small>{mapTime} IST · synchronized</small></div></div>
      </div>

      <div className="live-map-layout">
        <aside className="panel live-map-filters">
          <div className="section-label"><span>01</span><div><strong>FILTER</strong><small>Asset domains</small></div></div>
          <div className="map-filter-list">
            {filters.map((item) => <button key={item.key} className={filter === item.key ? "active" : ""} onClick={() => { setFilter(item.key); if (item.key !== "All") setSelectedId(mapAssets.find((asset) => asset.domain === item.key)?.id ?? selectedId); }}><span><Icon name={item.icon}/></span><strong>{item.label}</strong><i>{item.key === "All" ? "60" : item.key === "Satellites" ? "12" : item.key === "Drones" ? "24" : item.key === "Aerospace" ? "08" : "16"}</i></button>)}
          </div>
          <div className="map-status-key">
            <span>STATUS KEY</span>
            <div><i className="operational"/> CYAN · OPERATIONAL</div>
            <div><i className="warning"/> AMBER · WARNING</div>
            <div><i className="critical"/> RED · CRITICAL</div>
            <div><i className="restored"/> GREEN/CYAN · RESTORED</div>
          </div>
          <div className="map-filter-integrity"><span>FILTERED NETWORK HEALTH</span><strong>98.7%</strong><div><i/></div></div>
        </aside>

        <section className="panel live-network-globe">
          <div className="live-globe-head"><div><span className="eyebrow">GLOBAL DEFENSE MESH</span><strong>ORBITAL GRID · 42°N 78°E</strong></div><div className="live-map-indicator"><i/> LIVE <span>{mapTime}</span></div></div>
          <div className="live-map-earth">
            <EarthVisual large satelliteRestored={recoveryComplete}/>
            <div className="global-network-lines"><i/><i/><i/><i/><i/><i/></div>
            <div className="network-scan-ring ring-alpha"/><div className="network-scan-ring ring-beta"/>
            {mapAssets.filter((asset) => filter === "All" || asset.domain === filter).map((asset) => <button key={asset.id} className={`live-asset-marker ${asset.marker} ${asset.status.toLowerCase()} ${selected.id === asset.id ? "selected" : ""} ${asset.id === "SATELLITE-07" && recoveryComplete ? "restored" : ""}`} onClick={() => setSelectedId(asset.id)}><span><Icon name={asset.icon} size={11}/></span><strong>{asset.shortId}</strong></button>)}
            <div className="orbital-object object-one"><i/><b/></div>
            <div className="orbital-object object-two"><i/><b/></div>
            <div className="orbital-object object-three"><i/><b/></div>
            <div className="selected-map-card">
              <div className="selected-map-head"><span><Icon name={selected.icon} size={14}/></span><div><small>SELECTED ASSET</small><strong>{selected.id}</strong></div><StatusDot status={selected.status === "Critical" ? "offline" : selected.status === "Warning" ? "warning" : "online"}/></div>
              <dl>
                <div><dt>ASSET TYPE</dt><dd>{selected.domain}</dd></div>
                <div><dt>STATUS</dt><dd className={selected.status === "Operational" ? "green-text" : selected.status === "Warning" ? "amber-text" : "critical-text"}>{selected.status.toUpperCase()}</dd></div>
                <div><dt>HEALTH</dt><dd>{selected.health}%</dd></div>
                <div><dt>CONNECTIVITY</dt><dd>{selected.connectivity}</dd></div>
                <div><dt>LAST DIAGNOSTIC</dt><dd>{selected.diagnostic}</dd></div>
                <div><dt>ANOMALY</dt><dd className={selected.anomaly === "None" ? "green-text" : "amber-text"}>{selected.anomaly.toUpperCase()}</dd></div>
              </dl>
            </div>
          </div>
          <div className="live-map-footer"><span><i className="orbital"/> ORBITAL · 12</span><span><i className="aerial"/> AERIAL · 24</span><span><i className="aerospace"/> AEROSPACE · 08</span><span><i className="terrestrial"/> GROUND · 16</span><strong>1,249 ENCRYPTED DATA LINKS</strong></div>
        </section>

        <aside className="panel live-network-status">
          <div className="panel-head"><div><span className="eyebrow">LIVE STATUS</span><h3>Defense Mesh</h3></div><span className="stream-live"><i/> LIVE</span></div>
          <div className="network-secure-state"><div><Icon name="shield" size={25}/><span/></div><section><small>NETWORK STATUS</small><strong>SECURE</strong></section></div>
          <div className="network-status-metrics">
            <div><span>ACTIVE ASSETS</span><strong>56</strong><small>93.3% availability</small></div>
            <div><span>ACTIVE ANOMALIES</span><strong className="amber-text">{recoveryComplete ? "02" : "03"}</strong><small>{recoveryComplete ? "SAT-07 resolved" : "1 medium priority"}</small></div>
            <div><span>NETWORK HEALTH</span><strong>98.7%</strong><small>Nominal integrity</small></div>
            <div><span>DATA LINKS</span><strong>1,249</strong><small>Quantum secured</small></div>
          </div>
          <div className="network-health-bar"><span>GLOBAL NETWORK HEALTH</span><strong>98.7%</strong><div><i/></div></div>
          <div className="live-network-activity">
            <div className="activity-title"><span>LIVE ACTIVITY</span><i/></div>
            {[
              ["Telemetry synchronized", "11:45:08"],
              ["Satellite network connected", "11:45:06"],
              ["Drone fleet monitoring", "11:45:03"],
              ["Ground stations online", "11:44:59"],
            ].map(([label, time], index) => <div key={label}><span><Icon name={index === 0 ? "activity" : index === 1 ? "satellite" : index === 2 ? "drone" : "station"} size={12}/></span><section><strong>{label}</strong><small>{time} IST</small></section><StatusDot/></div>)}
          </div>
        </aside>
      </div>
    </>
  );
}

function SystemScreen({ recoveryComplete }: { recoveryComplete: boolean }) {
  const [aiView, setAiView] = useState<"overview" | "anomalies" | "diagnostics">("overview");
  const activityEvents: { time: string; title: string; detail: string; icon: IconName; tone: "info" | "warning" | "critical" | "success"; recoveryEvent?: boolean }[] = [
    { time: "12:24:08", title: "Satellite telemetry synchronized", detail: "Orbital telemetry stream aligned across 12 assets", icon: "satellite", tone: "info" },
    { time: "12:24:16", title: "Drone fleet status updated", detail: "24 aerial assets reporting nominal readiness", icon: "drone", tone: "info" },
    { time: "12:24:31", title: "Ground station connection verified", detail: "All 16 terrestrial nodes connected to secure mesh", icon: "station", tone: "info" },
    { time: "12:25:02", title: "Satellite-07 anomaly detected", detail: "Communication module behavior outside baseline", icon: "alert", tone: "warning" },
    { time: "12:25:14", title: "AI diagnostic completed", detail: "Fault location identified with 94% confidence", icon: "cpu", tone: "info" },
    { time: "12:26:01", title: "Autonomous repair initiated", detail: "Protocol RP-7741 assumed secure recovery control", icon: "shield", tone: "info", recoveryEvent: true },
    { time: "12:26:18", title: "Satellite-07 repair completed", detail: "Communication module returned to nominal state", icon: "check", tone: "success", recoveryEvent: true },
    { time: "12:26:25", title: "System integrity verified", detail: "End-to-end asset verification completed", icon: "shield", tone: "success", recoveryEvent: true },
  ];
  const visibleEvents = activityEvents.filter((event) => recoveryComplete || !event.recoveryEvent);
  const activeAnomalies = [
    ...(!recoveryComplete ? [{ id: "Satellite-07", detail: "Communication Module Anomaly", severity: "Medium" }] : []),
    { id: "Aero-System-04", detail: "Telemetry synchronization drift", severity: "Low" },
    { id: "Ground-08", detail: "Secure packet latency elevated", severity: "Critical" },
  ];

  return (
    <>
      <div className="threat-heading ai-system-heading">
        <div>
          <span className="eyebrow">RAKSHA NET</span>
          <h2>RAKSHA <em>AI</em></h2>
          <p>Autonomous intelligence, diagnostics and live operational awareness.</p>
        </div>
        <div className="diagnostics-badge"><Icon name="cpu"/><div><strong>AUTONOMOUS DEFENSE INTELLIGENCE</strong><small>Core v4.2 · continuously learning</small></div></div>
      </div>

      <div className="ai-system-layout">
        <section className="panel raksha-intelligence-panel">
          <div className="raksha-ai-hero">
            <div className="intelligence-orb"><span className="orb-shell"/><span className="orb-core"/><i/><b/><Icon name="cpu" size={28}/></div>
            <div><span className="eyebrow">RAKSHA AI</span><h3>Autonomous Defense Intelligence</h3><p>Continuous multi-domain reasoning across the protected asset network.</p></div>
            <span className="ai-online"><i/> ONLINE</span>
          </div>

          <div className="ai-intelligence-content">
            {aiView === "overview" && <>
              <div className="ai-insight-block"><span>SYSTEM STATUS</span><strong>All monitored assets are being continuously analyzed.</strong></div>
              <div className="ai-insight-block current"><span>CURRENT INSIGHT</span><strong>{recoveryComplete ? "Network operating within normal parameters." : "Satellite-07 recovery action remains available."}</strong><small>{recoveryComplete ? "No mission-impacting conditions detected." : "Communication anomaly isolated from critical operations."}</small></div>
              <div className="ai-stat-grid">
                <div><span>MONITORED ASSETS</span><strong>60</strong><small>Across 4 domains</small></div>
                <div><span>ACTIVE ANOMALIES</span><strong className="amber-text">{recoveryComplete ? "02" : "03"}</strong><small>Unresolved only</small></div>
                <div><span>RECENTLY RESTORED</span><strong className={recoveryComplete ? "green-text" : ""}>{recoveryComplete ? "Satellite-07" : "—"}</strong><small>{recoveryComplete ? "Autonomous recovery" : "No recent recovery"}</small></div>
                <div><span>AI CONFIDENCE</span><strong>94%</strong><small>High correlation</small></div>
              </div>
              <div className="ai-confidence-line"><span>INFERENCE CONFIDENCE</span><strong>94%</strong><div><i/></div></div>
            </>}

            {aiView === "anomalies" && <div className="ai-anomaly-view">
              <div className="ai-view-title"><div><span className="eyebrow">ACTIVE UNRESOLVED ANOMALIES</span><h3>{activeAnomalies.length} conditions require monitoring</h3></div><span className="severity high">LIVE</span></div>
              {activeAnomalies.map((anomaly) => <div className={`ai-anomaly-row ${anomaly.severity.toLowerCase()}`} key={anomaly.id}><span><Icon name="alert" size={15}/></span><div><strong>{anomaly.id}</strong><p>{anomaly.detail}</p></div><small>{anomaly.severity.toUpperCase()}</small></div>)}
              {recoveryComplete && <div className="ai-resolved-note"><Icon name="check" size={14}/><div><strong>Satellite-07 excluded from active anomalies</strong><span>Communication module repair is verified and resolved.</span></div></div>}
            </div>}

            {aiView === "diagnostics" && <div className="ai-diagnostics-view">
              <div className="ai-view-title"><div><span className="eyebrow">SYSTEM DIAGNOSTICS</span><h3>Core intelligence services</h3></div><span className="analysis-complete"><Icon name="check" size={13}/> NOMINAL</span></div>
              {[
                ["Threat Intelligence", "Analyzing 18.4M telemetry signals", 99],
                ["Autonomy Engine", "Recovery protocols verified", 98],
                ["Secure Defense Mesh", "1,249 encrypted data links", 99],
                ["Telemetry Ingest", "All domain streams synchronized", 97],
              ].map(([service, detail, value]) => <div className="diagnostic-service" key={String(service)}><span><StatusDot/><Icon name="cpu" size={14}/></span><div><strong>{service}</strong><small>{detail}</small><i><b style={{width: `${value}%`}}/></i></div><em>{value}%</em></div>)}
            </div>}
          </div>

          <div className="ai-quick-actions">
            <span>QUICK ACTIONS</span>
            <div>
              <Button variant={aiView === "overview" ? "primary" : "secondary"} onClick={() => setAiView("overview")}><Icon name="network" size={14}/> ANALYZE NETWORK</Button>
              <Button variant={aiView === "anomalies" ? "primary" : "secondary"} onClick={() => setAiView("anomalies")}><Icon name="alert" size={14}/> VIEW ANOMALIES</Button>
              <Button variant={aiView === "diagnostics" ? "primary" : "secondary"} onClick={() => setAiView("diagnostics")}><Icon name="activity" size={14}/> SYSTEM DIAGNOSTICS</Button>
            </div>
          </div>
        </section>

        <section className="panel live-system-activity">
          <div className="panel-head"><div><span className="eyebrow">LIVE SYSTEM ACTIVITY</span><h3>Operational Event Stream</h3></div><div className="activity-live-badge"><i/> LIVE <span>12:26:25 IST</span></div></div>
          <div className="activity-status-legend"><span><i className="info"/> Information</span><span><i className="warning"/> Warning</span><span><i className="critical"/> Critical</span><span><i className="success"/> Successful</span></div>
          <div className="system-event-stream">
            {visibleEvents.map((event, index) => <div className={`system-event ${event.tone}`} key={event.time}>
              <time>{event.time}<small>IST</small></time>
              <span className="event-node"><Icon name={event.icon} size={14}/></span>
              <div><strong>{event.title}</strong><p>{event.detail}</p><small>{event.recoveryEvent ? "Protocol RP-7741" : "Raksha AI Core"}</small></div>
              {index < visibleEvents.length - 1 && <i className="event-line"/>}
            </div>)}
          </div>
          {!recoveryComplete && <div className="activity-awaiting"><span/><div><strong>Recovery events awaiting authorization</strong><small>Timeline will update when autonomous repair begins.</small></div></div>}
        </section>
      </div>
    </>
  );
}

export default function App() {
  const [active, setActive] = useState<NavKey>("command");
  const [flow, setFlow] = useState<FlowStep>("detect");
  const [recoveryComplete, setRecoveryComplete] = useState(false);
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [demoActive, setDemoActive] = useState(false);
  const [demoPhase, setDemoPhase] = useState<DemoPhase>("monitoring");
  const demoOriginalRecoveryRef = useRef(false);
  const audio = useSystemAudio();
  const clock = useMemo(() => new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false }), []);
  const demoIncidentActive = demoActive && (demoPhase === "threat" || demoPhase === "analysis" || demoPhase === "repair");
  const satelliteOperational = demoActive ? !demoIncidentActive : recoveryComplete;
  const activeAnomalyCount = demoActive ? (demoIncidentActive ? 4 : 3) : recoveryComplete ? 2 : 3;
  const repairedSystemCount = demoActive ? (demoPhase === "restored" || demoPhase === "resolution" || demoPhase === "complete" ? 18 : 17) : recoveryComplete ? 18 : 17;

  useEffect(() => {
    if (!audio.enabled) return;
    const handleClick = (event: MouseEvent) => {
      if ((event.target as HTMLElement).closest("button")) audio.play("click");
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [audio.enabled]);

  useEffect(() => {
    if (!demoActive) return;
    let timer: number | undefined;
    if (demoPhase === "monitoring") {
      timer = window.setTimeout(() => setDemoPhase("threat"), 7000);
    } else if (demoPhase === "threat") {
      audio.play("warning");
      timer = window.setTimeout(() => {
        setActive("detect");
        setFlow("analysis");
        setDemoPhase("analysis");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 8000);
    } else if (demoPhase === "analysis") {
      timer = window.setTimeout(() => {
        setFlow("repair");
        setDemoPhase("repair");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 12000);
    } else if (demoPhase === "restored") {
      timer = window.setTimeout(() => {
        setDemoPhase("resolution");
        audio.play("resolved");
      }, 6500);
    } else if (demoPhase === "resolution") {
      timer = window.setTimeout(() => {
        setRecoveryComplete(true);
        setActive("command");
        setFlow("detect");
        setDemoPhase("complete");
        audio.play("navigation");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 5000);
    }
    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [demoActive, demoPhase]);

  const startDemoMode = () => {
    demoOriginalRecoveryRef.current = recoveryComplete;
    setDemoActive(true);
    setDemoPhase("monitoring");
    setActive("command");
    setFlow("detect");
    setAlertsOpen(false);
    audio.play("navigation");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const toggleDemoMode = () => {
    if (!demoActive) {
      startDemoMode();
      return;
    }
    const finished = demoPhase === "restored" || demoPhase === "resolution" || demoPhase === "complete";
    setRecoveryComplete(finished ? true : demoOriginalRecoveryRef.current);
    setDemoActive(false);
    setDemoPhase("monitoring");
    setActive("command");
    setFlow("detect");
    audio.play("navigation");
  };

  const goDetect = () => { setFlow("detect"); setActive("detect"); audio.play("navigation"); };
  const home = () => {
    if (active === "detect" && flow === "restored") setRecoveryComplete(true);
    setActive("command");
    setFlow("detect");
    audio.play("navigation");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const navigate = (key: NavKey) => {
    if (key === "command") {
      home();
      return;
    }
    setActive(key);
    if (key === "detect") setFlow("detect");
    audio.play("navigation");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const goBack = () => {
    if (active !== "detect") {
      home();
      return;
    }
    if (flow === "report") {
      setFlow("restored");
      return;
    }
    if (flow === "restored") {
      home();
      return;
    }
    else if (flow === "repair") setFlow("analysis");
    else if (flow === "analysis") setFlow("detect");
    else home();
    audio.play("navigation");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleChatRoute = (route: ChatRoute) => {
    if (route === "command") home();
    else if (route === "assets") { setActive("assets"); }
    else if (route === "network") { setActive("network"); }
    else if (route === "diagnostics") { setActive("system"); }
    else if (route === "detect") { setActive("detect"); setFlow("analysis"); }
    else if (route === "recovery") { setActive("detect"); setFlow("repair"); }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const flowLabels: Record<FlowStep, string> = {
    detect: "THREAT DETECTION",
    analysis: "AI THREAT ANALYSIS",
    repair: "AUTONOMOUS SELF-REPAIR",
    restored: "SYSTEM RESTORED",
    report: "SYSTEM REPORT",
  };
  const currentLabel = active === "detect" ? flowLabels[flow] : navItems.find((item) => item.key === active)?.label.toUpperCase();

  return (
    <div className="app-shell">
      <div className="space-noise" />
      <aside className="sidebar">
        <div className="brand"><BrandMark compact/><div><strong>RAKSHA NET</strong><span>DEFENSE NETWORK</span></div></div>
        <nav aria-label="Primary navigation">
          {navItems.map((item) => <button key={item.key} className={active === item.key ? "active" : ""} onClick={() => navigate(item.key)}><Icon name={item.icon}/><span>{item.label}</span></button>)}
        </nav>
        <div className="sidebar-bottom">
          <div className="ai-status"><span className="ai-orb"><i/></span><div><strong>RAKSHA AI</strong><span>ONLINE · v4.2</span></div></div>
          <div className="secure"><Icon name="shield" size={14}/> QUANTUM SECURED</div>
        </div>
      </aside>

      <main>
        <header className="topbar">
          <div className="mobile-brand"><BrandMark compact/><strong>RAKSHA NET</strong></div>
          <div className="topbar-context">
            <div className="top-nav-actions">
              {active !== "command" && <button onClick={goBack} aria-label="Go back"><Icon name="arrow" size={14}/><span>BACK</span></button>}
              <button className={active === "command" ? "current" : ""} onClick={home} aria-label="Return home"><Icon name="grid" size={14}/><span>HOME</span></button>
            </div>
            <div className="breadcrumb"><span>RAKSHA NET</span><i>/</i><strong>{currentLabel}</strong></div>
          </div>
          <div className="top-status">
            <span><StatusDot/> NETWORK SECURE</span>
            <span className="clock">{clock} <small>IST</small></span>
            <button className={`audio-control ${audio.enabled ? "enabled" : ""}`} onClick={audio.toggle} aria-label={audio.enabled ? "Turn sound off" : "Enable system audio"} title={audio.enabled ? "Sound On" : "Click to enable system audio"}><Icon name="volume"/><span>{audio.enabled ? "SOUND ON" : "SOUND OFF"}</span></button>
            <span className={`audio-system-indicator ${audio.enabled ? "online" : ""}`}><i/>{audio.enabled ? "AUDIO SYSTEM ONLINE" : "AUDIO SYSTEM OFFLINE"}</span>
            <div className="alert-anchor">
              <button className={alertsOpen ? "open" : ""} aria-label="Open active alerts" aria-expanded={alertsOpen} onClick={() => { setAlertsOpen((current) => !current); audio.play("alert"); }}><Icon name="alert"/><i>{activeAnomalyCount}</i></button>
              {alertsOpen && <div className="alerts-panel">
                <div className="alerts-panel-head"><div><span>RAKSHA NET</span><strong>System Alerts</strong></div><b>{activeAnomalyCount} ACTIVE</b></div>
                <section>
                  <div className="alerts-section-title"><span>ACTIVE ALERTS</span><b>{String(activeAnomalyCount).padStart(2, "0")}</b></div>
                  {!satelliteOperational && <div className="alert-item priority">
                    <span className="alert-item-icon"><Icon name="satellite" size={15}/></span>
                    <div><strong>Satellite-07</strong><p>Communication Module Anomaly</p><small><StatusDot status="warning"/> MEDIUM · ACTIVE NOW</small></div>
                  </div>}
                  <div className="alert-item">
                    <span className="alert-item-icon"><Icon name="cpu" size={15}/></span>
                    <div><strong>GARUDA-AE-12</strong><p>Telemetry synchronization drift</p><small><StatusDot status="warning"/> LOW · MONITORING</small></div>
                  </div>
                  <div className="alert-item">
                    <span className="alert-item-icon"><Icon name="station" size={15}/></span>
                    <div><strong>GS-LAD-03</strong><p>Secure packet latency elevated</p><small><StatusDot status="warning"/> LOW · MONITORING</small></div>
                  </div>
                  {demoActive && <div className="alert-item">
                    <span className="alert-item-icon"><Icon name="drone" size={15}/></span>
                    <div><strong>DRONE-12</strong><p>Navigation checksum variance</p><small><StatusDot status="warning"/> LOW · SIMULATED</small></div>
                  </div>}
                </section>
                <section className="resolved-alerts">
                  <div className="alerts-section-title"><span>RESOLVED ALERTS</span><b>{satelliteOperational && (demoActive ? demoPhase === "resolution" || demoPhase === "complete" : recoveryComplete) ? "01" : "00"}</b></div>
                  {satelliteOperational && (demoActive ? demoPhase === "resolution" || demoPhase === "complete" : recoveryComplete) ? <div className="alert-item resolved">
                    <span className="alert-item-icon"><Icon name="check" size={15}/></span>
                    <div><strong>Satellite-07</strong><p>Communication Module Anomaly</p><small>Autonomous repair completed</small><em>Status: Resolved</em></div>
                  </div> : <div className="alerts-empty"><Icon name="check" size={14}/> No resolved alerts in this session</div>}
                </section>
              </div>}
            </div>
          </div>
        </header>
        <div className="content">
          <div className="screen-transition" key={`${active}-${flow}`}>
            {active === "command" && <CommandCenter onDetect={goDetect} satelliteOperational={satelliteOperational} activeAnomalies={activeAnomalyCount} repairedSystems={repairedSystemCount} demoActive={demoActive} demoComplete={demoActive && demoPhase === "complete"} onDemoToggle={toggleDemoMode}/>}
            {active === "detect" && flow === "detect" && <DetectionScreen onAnalyze={() => setFlow("analysis")} recoveryComplete={satelliteOperational} onAnomalyDetected={() => setRecoveryComplete(false)} onSound={audio.play}/>}
            {active === "detect" && flow === "analysis" && <AnalysisScreen onRepair={() => setFlow("repair")} onSound={audio.play}/>}
            {active === "detect" && flow === "repair" && <RepairScreen onRestored={() => {
              if (demoActive) {
                setFlow("restored");
                setDemoPhase("restored");
              } else {
                setRecoveryComplete(true);
                setFlow("restored");
                window.setTimeout(() => audio.play("resolved"), 1600);
              }
            }} onSound={audio.play}/>}
            {active === "detect" && flow === "restored" && <RestoredScreen onHome={home} onReport={() => {
              setRecoveryComplete(true);
              setDemoActive(false);
              setDemoPhase("monitoring");
              setFlow("report");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}/>}
            {active === "detect" && flow === "report" && <SystemReport restored={recoveryComplete || satelliteOperational} onHome={home} onRunDemo={startDemoMode} onSound={audio.play}/>}
            {active === "assets" && <AssetsScreen recoveryComplete={satelliteOperational}/>}
            {active === "network" && <NetworkScreen recoveryComplete={satelliteOperational}/>}
            {active === "system" && <SystemScreen recoveryComplete={satelliteOperational}/>}
          </div>
        </div>
      </main>
      {demoActive && <div className="demo-mode-controller">
        <div><span>DEMO MODE · SIMULATED DATA</span><strong>{demoPhase === "monitoring" ? "01 · SYSTEM MONITORING" : demoPhase === "threat" ? "02 · THREAT DETECTED" : demoPhase === "analysis" ? "03 · AI ANALYSIS" : demoPhase === "repair" ? "04 · AUTONOMOUS SELF-REPAIR" : demoPhase === "restored" ? "05 · SYSTEM RESTORED" : demoPhase === "resolution" ? "06 · RESOLUTION" : "07 · DEMO COMPLETE"}</strong></div>
        <button onClick={toggleDemoMode}>EXIT DEMO</button>
      </div>}
      <RakshaChat recoveryComplete={satelliteOperational} activeAnomalies={activeAnomalyCount} repairedSystems={repairedSystemCount} demoActive={demoActive} playSound={audio.play} onRoute={handleChatRoute}/>
    </div>
  );
}
