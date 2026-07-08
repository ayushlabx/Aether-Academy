/**
 * PixelCharacters – Living world companion system
 *
 * Astra (pink)  – roams activity stations near the TOP of the screen only
 *                 (fixed positioning – does NOT travel down the page or scroll with content)
 * Lumi (white)  – pinned top-right, cycles through activities (does NOT scroll with page)
 *
 * Sprites: every pose is now its own individually-cropped, transparent PNG
 * (see /public/sprites/astra and /public/sprites/lumi). This replaces the old
 * "one big sprite-sheet + CSS background-position" approach, which assumed a
 * perfectly uniform grid. The source art was NOT a uniform grid (rows had
 * different heights and different numbers of poses per row), which is why
 * sprites used to render half-cut / bled into each other. Each pose here is
 * tightly cropped to its own artwork, so nothing overlaps or clips anymore.
 */
import React, {
  useEffect, useRef, useState, useCallback,
} from 'react';
import { motion, AnimatePresence, type TargetAndTransition } from 'framer-motion';

// ─── Display scale ────────────────────────────────────────────────────────────
// Target on-screen height for each character; width follows automatically so
// every pose (even ones with a wider/taller crop, like "eating" or "watchTV")
// stays visually consistent instead of being stretched into a fixed cell.
const A_HEIGHT = 108; // Astra display height (px)
const L_HEIGHT = 96;  // Lumi display height (px)

// ─── Astra pose → image map ───────────────────────────────────────────────────
// 42 unique poses (40 original + 2 bonus expressions recovered from the sheet)
const A_POSES = [
  'walk1','walk2','stand','stand2','wave','wink','sleepLie','sleepSit',
  'readStand','readSit','laptop','writing','drink','eating','icecream',
  'musicSit','headphones','watchTV','paintEasel','painting','drawDesk','dancing',
  'watering','sweeping','shopping','cooking','boba','scrolling','sitCushion','window',
  'blush','excited','happy','angry','neutral','sad','cute','waveHappy','giggle','hug',
] as const;
// Assets live in /public/sprites, so paths must respect Vite's configured
// BASE_PATH (this project deploys under a dynamic base, not always "/").
const BASE = import.meta.env.BASE_URL;

type APose = typeof A_POSES[number] | 'stand3';
const A: Record<APose, string> = Object.fromEntries(
  A_POSES.map(p => [p, `${BASE}sprites/astra/${p}.png`]),
) as Record<APose, string>;
// 'stand3' isn't a distinct piece of art on the sheet — alias it to stand2
// rather than leaving stale references broken.
A.stand3 = A.stand2;

// ─── Lumi pose → image map ─────────────────────────────────────────────────────
// 27 unique poses (up from the ~24 that used to be wired up, several of which
// were accidentally pointing at Astra's rows due to a grid-math bug).
const L_POSES = [
  'walk1','walk2','stand','stand2','wave','wink','readBook','laptop','giggle','peek',
  'sleep','cheerful','eating','boba','musicSit','headphones','painting','drawing','daydream',
  'watering','sweeping','cooking','dancing','window','sitCushion','thinking','stretching',
] as const;
type LPose = typeof L_POSES[number];
const L: Record<LPose, string> = Object.fromEntries(
  L_POSES.map(p => [p, `${BASE}sprites/lumi/${p}.png`]),
) as Record<LPose, string>;

// ─── Sprite renderer ─────────────────────────────────────────────────────────
interface SpriteProps {
  src: string;
  height: number;
  flip?: boolean;
}
function Sprite({ src, height, flip }: SpriteProps) {
  return (
    <img
      src={src}
      alt=""
      draggable={false}
      style={{
        height,
        width: 'auto',
        display: 'block',
        imageRendering: 'pixelated',
        transform: flip ? 'scaleX(-1)' : undefined,
        userSelect: 'none',
        pointerEvents: 'none',
      }}
    />
  );
}

// ─── Activity stations ────────────────────────────────────────────────────────
// Astra stays in the UPPER portion of the viewport only (per design: she should
// never wander down the page or appear to "follow" the user's scroll).
interface Station {
  id: string; yPct: number;
  actPoses: APose[];
  idlePoses: APose[];
  label: string; zzz?: boolean;
  minMs: number; maxMs: number;
}
const STATIONS: Station[] = [
  { id:'coffee',  yPct:10, actPoses:['boba','drink','icecream'],        idlePoses:['stand','wink'],
    label:'Coffee break ☕', minMs:9000,  maxMs:15000 },
  { id:'work',    yPct:16, actPoses:['laptop','writing'],               idlePoses:['stand2','stand2'],
    label:'Working… 💻',    minMs:11000, maxMs:20000 },
  { id:'music',   yPct:22, actPoses:['headphones','musicSit','dancing'], idlePoses:['wave','wink'],
    label:'Vibing 🎧',      minMs:11000, maxMs:18000 },
  { id:'window',  yPct:28, actPoses:['window','sitCushion'],            idlePoses:['stand','stand2'],
    label:'Stargazing ✨',   minMs:9000,  maxMs:14000 },
  { id:'art',     yPct:34, actPoses:['painting','drawDesk','paintEasel'], idlePoses:['stand2'],
    label:'Making art 🎨',  minMs:12000, maxMs:20000 },
  { id:'reading', yPct:40, actPoses:['readSit','readStand'],            idlePoses:['stand2'],
    label:'Reading 📚',     minMs:12000, maxMs:20000 },
  { id:'eating',  yPct:46, actPoses:['eating','drink','boba'],          idlePoses:['stand','wink'],
    label:'Eating 🍔',      minMs:9000,  maxMs:15000 },
  { id:'garden',  yPct:52, actPoses:['watering','sweeping'],            idlePoses:['stand2'],
    label:'Gardening 🌱',   minMs:10000, maxMs:16000 },
  { id:'sleep',   yPct:58, actPoses:['sleepLie','sleepSit'],            idlePoses:['sitCushion'],
    label:'Sleeping 😴', zzz:true, minMs:13000, maxMs:22000 },
];

// ─── Lumi activity sequence ───────────────────────────────────────────────────
// Cycles through her full pose library – each pose held 4-9 s.
// (Expanded with the extra poses recovered from the sheet: giggle, peek, daydream.)
const LUMI_ACTIVITIES: LPose[] = [
  'stand','wave','wink','readBook','laptop',
  'cheerful','eating','boba','musicSit','headphones',
  'painting','drawing','watering','sweeping','cooking',
  'dancing','window','sitCushion','thinking','stretching',
  'giggle','peek','daydream','stand2','walk1','walk2',
];

// ─── Reactions ────────────────────────────────────────────────────────────────
const REACTIONS = [
  '😊 Hey! Don\'t poke me.', '😤 I\'m busy!', '🙄 Again?',
  '😴 I was sleeping…', '🍔 Can I finish eating first?', '📚 Reading time!',
  '😂 You\'re annoying… but funny.', '🤨 Need something?', '🥺 Be gentle!',
  '✨ Hello there!', '💅 Not now, I\'m busy.', '🌸 ...hi.',
  '😳 You scared me!', '🎧 I can\'t hear you~', '💤 Five more minutes…',
  '🤗 Okay, fine. Hi.', '🍵 Have you tried tea?', '😑 Really?',
  '⭐ I noticed you.', '🎨 You interrupted my art!',
];

const rnd = (min: number, max: number) => min + Math.floor(Math.random() * (max - min + 1));

// ─── ZZZ bubble ──────────────────────────────────────────────────────────────
function ZzzBubble() {
  return (
    <div className="absolute -top-8 right-0 pointer-events-none select-none flex flex-col items-end">
      {(['z','z','Z'] as const).map((z, i) => (
        <motion.span key={i}
          className="font-bold text-[#B0B0FF] drop-shadow-[0_0_6px_rgba(150,100,255,0.9)]"
          style={{ fontSize: 8 + i * 4, opacity: 0 }}
          animate={{ opacity:[0,1,0], y:[0,-(10+i*6)], x:[0,3,6] }}
          transition={{ repeat:Infinity, duration:1.8, delay:i*0.55, ease:'easeOut' }}
        >{z}</motion.span>
      ))}
    </div>
  );
}

// ─── Speech bubble ────────────────────────────────────────────────────────────
function SpeechBubble({ text, align='left' }: { text:string; align?:'left'|'right' }) {
  return (
    <motion.div
      initial={{ opacity:0, scale:0.6, y:6 }}
      animate={{ opacity:1, scale:1, y:0 }}
      exit={{ opacity:0, scale:0.6, y:6 }}
      transition={{ type:'spring', stiffness:320, damping:22 }}
      className={`absolute -top-12 ${align==='right'?'right-0':'left-0'} pointer-events-none z-10`}
      style={{ whiteSpace:'nowrap' }}
    >
      <div className="bg-[#13132B]/92 border border-[#B64DFF]/50 text-[#E8E8FF] text-[11px] font-semibold px-3 py-1.5 rounded-2xl shadow-[0_0_16px_rgba(182,77,255,0.3)] backdrop-blur-md">
        {text}
      </div>
    </motion.div>
  );
}

// ─── ASTRA – station roaming, upper area only ────────────────────────────────
function AstraCharacter() {
  type Phase = 'walking'|'arrive_wait'|'activity'|'leave_wait';

  const [stationIdx,    setStationIdx]    = useState(0);
  const [phase,         setPhase]         = useState<Phase>('arrive_wait');
  const [pose,          setPose]          = useState<APose>('stand');
  const [walkFrame,     setWalkFrame]     = useState(0);
  const [flipChar,      setFlipChar]      = useState(false);
  const [posY,          setPosY]          = useState(STATIONS[0].yPct);
  const [walkDurationS, setWalkDurationS] = useState(0.8);
  const [reaction,      setReaction]      = useState<string|null>(null);

  const reactionIdx  = useRef(0);
  const reactionT    = useRef<ReturnType<typeof setTimeout>|null>(null);
  const timers       = useRef<ReturnType<typeof setTimeout>[]>([]);
  const walkInterval = useRef<ReturnType<typeof setInterval>|null>(null);

  const clear = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (walkInterval.current) { clearInterval(walkInterval.current); walkInterval.current = null; }
  }, []);

  const after = useCallback((ms: number, fn: () => void) => {
    timers.current.push(setTimeout(fn, ms));
  }, []);

  const pickNext = (cur: number) => {
    let n: number;
    do { n = Math.floor(Math.random() * STATIONS.length); } while (n === cur);
    return n;
  };

  const advance = useCallback((fromIdx: number, fromPhase: Phase) => {
    clear();
    const station = STATIONS[fromIdx];

    if (fromPhase === 'walking') {
      setPose(station.idlePoses[0]);
      setPhase('arrive_wait');
      after(rnd(3500, 7000), () => advance(fromIdx, 'arrive_wait'));
      return;
    }
    if (fromPhase === 'arrive_wait') {
      setPhase('activity');
      let i = 0;
      const cycle = () => {
        setPose(station.actPoses[i % station.actPoses.length]);
        i++;
        timers.current.push(setTimeout(cycle, rnd(3000, 5500)));
      };
      cycle();
      after(rnd(station.minMs, station.maxMs), () => advance(fromIdx, 'activity'));
      return;
    }
    if (fromPhase === 'activity') {
      setPose(station.idlePoses[0]);
      setPhase('leave_wait');
      after(rnd(3000, 6500), () => advance(fromIdx, 'leave_wait'));
      return;
    }
    // leave_wait → walk
    const nxt = pickNext(fromIdx);
    const targetY = STATIONS[nxt].yPct;
    setFlipChar(targetY < STATIONS[fromIdx].yPct); // flip when going up
    setPhase('walking');
    setWalkFrame(0);
    walkInterval.current = setInterval(() => setWalkFrame(f => (f + 1) % 2), 300);
    const dist = Math.abs(targetY - STATIONS[fromIdx].yPct);
    const walkMs = Math.max(2500, Math.min(9000, dist * 320));
    setWalkDurationS(walkMs / 1000);
    setPosY(targetY);
    setStationIdx(nxt);
    after(walkMs, () => {
      if (walkInterval.current) { clearInterval(walkInterval.current); walkInterval.current = null; }
      advance(nxt, 'walking');
    });
  }, [clear, after]);

  useEffect(() => {
    after(800, () => advance(0, 'arrive_wait'));
    return () => {
      clear();
      if (reactionT.current) clearTimeout(reactionT.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const station = STATIONS[stationIdx];
  const currentPose: APose = phase === 'walking'
    ? (walkFrame === 0 ? 'walk1' : 'walk2') : pose;
  const src = A[currentPose] ?? A.stand;

  const handleClick = useCallback(() => {
    setReaction(REACTIONS[reactionIdx.current % REACTIONS.length]);
    reactionIdx.current++;
    if (reactionT.current) clearTimeout(reactionT.current);
    reactionT.current = setTimeout(() => setReaction(null), 2800);
  }, []);

  const breathe: TargetAndTransition = phase === 'walking'
    ? { y: [0,-3,0,-3,0] as number[], transition:{ repeat:Infinity, duration:0.35, ease:'linear' as const } }
    : { scaleY:[1,1.03,1] as number[], transition:{ repeat:Infinity, duration:2.8, ease:'easeInOut' as const } };

  return (
    <motion.div
      className="fixed left-3 z-[60] pointer-events-none"
      style={{ position: 'fixed' }}
      animate={{ top:`${posY}vh` }}
      transition={{ duration:walkDurationS, ease:'linear' }}
    >
      <div className="relative cursor-pointer pointer-events-auto" style={{ transform:'translateY(-50%)' }}
        onClick={handleClick} role="button" aria-label="Astra character">
        <AnimatePresence>
          {reaction && <SpeechBubble text={reaction} />}
        </AnimatePresence>
        {phase === 'activity' && station.zzz && <ZzzBubble />}
        <AnimatePresence>
          {phase === 'activity' && !reaction && (
            <motion.div
              initial={{ opacity:0, x:-4 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-4 }}
              className="absolute -top-7 left-0 text-[9px] text-[#C8C8FF]/70 font-semibold whitespace-nowrap pointer-events-none select-none"
            >{station.label}</motion.div>
          )}
        </AnimatePresence>
        <motion.div animate={breathe}>
          <Sprite src={src} height={A_HEIGHT} flip={flipChar} />
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── LUMI – fixed top-right, activity cycler ──────────────────────────────────
// Position: always pinned near top-right. Does NOT follow page scroll.
function LumiCharacter() {
  const [poseIdx,  setPoseIdx]  = useState(0);
  const [reaction, setReaction] = useState<string|null>(null);

  const reactionIdx = useRef(0);
  const reactionT   = useRef<ReturnType<typeof setTimeout>|null>(null);
  const cycleT      = useRef<ReturnType<typeof setTimeout>|null>(null);

  // Schedule next activity pose
  const scheduleCycle = useCallback((nextIdx: number) => {
    cycleT.current = setTimeout(() => {
      const idx = (nextIdx + 1) % LUMI_ACTIVITIES.length;
      setPoseIdx(idx);
      scheduleCycle(idx);
    }, rnd(4000, 9000));
  }, []);

  useEffect(() => {
    scheduleCycle(0);
    return () => {
      if (cycleT.current) clearTimeout(cycleT.current);
      if (reactionT.current) clearTimeout(reactionT.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = useCallback(() => {
    // Offset index so Lumi says different things from Astra
    const text = REACTIONS[(reactionIdx.current + 10) % REACTIONS.length];
    reactionIdx.current = (reactionIdx.current + 1) % REACTIONS.length;
    setReaction(text);
    if (reactionT.current) clearTimeout(reactionT.current);
    reactionT.current = setTimeout(() => setReaction(null), 2800);
  }, []);

  const pose = LUMI_ACTIVITIES[poseIdx];
  const src = L[pose] ?? L.stand;

  return (
    // Fixed top-right — top:15vh keeps her just below the navbar, always
    // visible, and pinned to the TOP of the screen (never scrolls with page).
    <div
      className="fixed right-3 z-[60] pointer-events-none"
      style={{ position: 'fixed', top: '15vh', transform: 'translateY(-50%)' }}
    >
      <div className="relative cursor-pointer pointer-events-auto"
        onClick={handleClick} role="button" aria-label="Lumi character">
        <AnimatePresence>
          {reaction && <SpeechBubble text={reaction} align="right" />}
        </AnimatePresence>
        <motion.div
          animate={{ scaleY:[1,1.04,1], y:[0,-3,0] }}
          transition={{ repeat:Infinity, duration:3.2, ease:'easeInOut' }}
        >
          <Sprite src={src} height={L_HEIGHT} />
        </motion.div>
      </div>
    </div>
  );
}

// ─── Root ────────────────────────────────────────────────────────────────────
export default function PixelCharacters() {
  return (
    <>
      <AstraCharacter />
      <LumiCharacter />
    </>
  );
}
