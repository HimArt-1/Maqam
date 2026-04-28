import { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MusicWhiteboardProps {
  activeNotes: string[];
}

const notePositions: Record<string, number> = {
  'B5': 0, 'A#5': 5, 'A5': 10, 'G#5': 15, 'G5': 20, 'F#5': 25, 'F5': 30, 'E5': 40, 'D#5': 45, 'D5': 50, 'C#5': 55, 'C5': 60,
  'B4': 70, 'A#4': 75, 'A4': 80, 'G#4': 85, 'G4': 90, 'F#4': 95, 'F4': 100, 'E4': 110, 'D#4': 115, 'D4': 120, 'C#4': 125, 'C4': 130
};

const staffLines = [20, 40, 60, 80, 100]; // Y positions percentage

const MusicWhiteboard: FC<MusicWhiteboardProps> = ({ activeNotes }) => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white/95 backdrop-blur-md rounded-[2.5rem] border-4 border-primary-200 p-8 shadow-[0_15px_40px_-10px_rgba(14,165,233,0.2)] overflow-hidden mb-8 h-80 relative flex items-center">
      <div className="absolute top-4 right-6 text-primary-200 font-black text-4xl select-none">
        السبورة الموسيقية
      </div>
      
      {/* Musical Staff */}
      <div className="relative w-full h-40 opacity-70">
        {staffLines.map((y, i) => (
          <div key={i} className="absolute w-full h-[2px] bg-slate-800" style={{ top: `${y}%` }}></div>
        ))}
        {/* Treble Clef Graphic (Simplified CSS/Text) */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[8rem] leading-none text-slate-800 font-serif opacity-80 pointer-events-none">
          𝄞
        </div>

        {/* Active Notes Visualization */}
        <AnimatePresence>
          {activeNotes.map((note, index) => {
            const yPos = notePositions[note];
            if (yPos === undefined) return null;
            
            // X position shifts right slightly for multiple notes
            const xPos = 150 + (index * 60);

            // Create ledger line if necessary (e.g., C4)
            const needsLedger = note.includes('C4');

            return (
              <motion.div
                key={`${note}-${index}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0, transition: { duration: 0.2 } }}
                className="absolute flex items-center justify-center pointer-events-none"
                style={{ top: `${yPos}%`, left: `${xPos}px`, transform: 'translateY(-50%)' }}
              >
                {needsLedger && (
                  <div className="absolute w-12 h-[3px] bg-slate-700 z-0 rounded-full"></div>
                )}
                <div className="w-6 h-5 bg-secondary-400 rounded-[50%] rotate-[-15deg] shadow-lg border-2 border-secondary-600 z-10 relative transform hover:scale-110 transition-transform">
                  <div className="absolute -top-4 -right-8 font-black text-xs bg-white text-secondary-600 px-2 py-0.5 rounded-full shadow-md border-2 border-secondary-200">
                    {note}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MusicWhiteboard;
