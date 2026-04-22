import { useState, useEffect, useCallback, useRef } from 'react';

export type MIDIMessageObj = {
  command: number;
  note: number;
  velocity: number;
};

export const useMIDI = () => {
  const [inputs, setInputs] = useState<WebMidi.MIDIInput[]>([]);
  const [midiError, setMidiError] = useState<string | null>(null);
  const [currentNote, setCurrentNote] = useState<MIDIMessageObj | null>(null);
  const attachedRef = useRef<WebMidi.MIDIInput[]>([]);

  const onMIDIMessage = useCallback((event: WebMidi.MIDIMessageEvent) => {
    const [status, note, velocity] = event.data;
    const high = status & 0xf0;
    /** Note On أي قناة 0x9* ؛ Note Off 0x8* ؛ بعض الأجهزة ترسل 0x9* بسرعة 0 كـ Note Off */
    const isNoteOn = high === 0x90 && velocity > 0;
    const isNoteOff = high === 0x80 || (high === 0x90 && velocity === 0);

    if (isNoteOn || isNoteOff) {
      setCurrentNote({
        command: isNoteOn ? 144 : 128,
        note,
        velocity,
      });
    }
  }, []);

  useEffect(() => {
    attachedRef.current = [];
    if (!navigator.requestMIDIAccess) {
      setMidiError('متصفحك لا يدعم Web MIDI API.');
      return;
    }

    let access: WebMidi.MIDIAccess | null = null;

    navigator.requestMIDIAccess().then(
      (a) => {
        access = a;
        const list = Array.from(a.inputs.values());
        attachedRef.current = list;
        setInputs(list);
        setMidiError(null);

        list.forEach((input) => {
          input.onmidimessage = onMIDIMessage;
        });

        a.onstatechange = () => {
          const next = Array.from(a.inputs.values());
          attachedRef.current = next;
          setInputs(next);
          next.forEach((input) => {
            if (!input.onmidimessage) input.onmidimessage = onMIDIMessage;
          });
        };
      },
      () => {
        setMidiError('لا يمكن الوصول إلى أجهزة MIDI. تحقق من الصلاحيات والمتصفح.');
      }
    );

    return () => {
      attachedRef.current.forEach((input) => {
        input.onmidimessage = null;
      });
      attachedRef.current = [];
      if (access) {
        access.onstatechange = null;
      }
    };
  }, [onMIDIMessage]);

  return { inputs, currentNote, midiError };
};
