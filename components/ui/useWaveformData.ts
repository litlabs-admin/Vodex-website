"use client";

import { useEffect, useState } from "react";

const BAR_COUNT = 30;
const MIN_PX = 6;
const MAX_PX = 30;

/**
 * Decodes an audio file client-side (Web Audio API) into BAR_COUNT
 * peak-amplitude bars, so each call sample shows its own real waveform
 * shape instead of AudioWaveform's generic decorative one.
 *
 * Runs once per `src`. Returns `null` while decoding, or if decoding fails
 * (unsupported format, network hiccup) — callers should fall back to
 * AudioWaveform's built-in shape in that case rather than render nothing.
 */
export function useWaveformData(src: string): number[] | null {
  const [heights, setHeights] = useState<number[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    setHeights(null);

    async function decode() {
      try {
        const ctx = new AudioContext();
        const res = await fetch(src);
        const arrayBuffer = await res.arrayBuffer();
        const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
        void ctx.close();
        if (cancelled) return;

        const raw = audioBuffer.getChannelData(0);
        const samplesPerBar = Math.floor(raw.length / BAR_COUNT);
        const peaks: number[] = [];
        for (let i = 0; i < BAR_COUNT; i++) {
          let peak = 0;
          const start = i * samplesPerBar;
          const end = start + samplesPerBar;
          for (let j = start; j < end; j++) {
            const abs = Math.abs(raw[j]);
            if (abs > peak) peak = abs;
          }
          peaks.push(peak);
        }

        const max = Math.max(...peaks) || 1;
        if (!cancelled) {
          setHeights(peaks.map((p) => MIN_PX + (p / max) * (MAX_PX - MIN_PX)));
        }
      } catch {
        // Leave heights null — AudioWaveform falls back to its decorative
        // shape rather than rendering nothing.
      }
    }

    void decode();
    return () => {
      cancelled = true;
    };
  }, [src]);

  return heights;
}
