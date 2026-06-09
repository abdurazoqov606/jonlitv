/**
 * Web Audio API synthesizer for premium UI sounds
 * No external file downloads needed - works completely offline!
 */

class AudioEngine {
  private ctx: AudioContext | null = null;
  private ambientSource: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;
  private isRainPlaying: boolean = false;

  private init() {
    if (!this.ctx) {
      // Create audio context on user interaction
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  /**
   * Synthesizes a beautiful water droplet chime/splash sound
   */
  public playDropChime() {
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      
      // Node 1: Fast sweeping droplet "plop"
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      
      // Sweep frequency quickly downwards representing liquid impact
      osc1.frequency.setValueAtTime(140, now);
      osc1.frequency.exponentialRampToValueAtTime(1200, now + 0.05);
      osc1.frequency.exponentialRampToValueAtTime(300, now + 0.15);
      
      // Pure sine wave for pristine round tone
      osc1.type = "sine";
      
      gain1.gain.setValueAtTime(0, now);
      gain1.gain.linearRampToValueAtTime(0.5, now + 0.02);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.3);

      // Node 2: Lush high frequency "metallic water splash echo"
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(1600, now + 0.04);
      osc2.frequency.exponentialRampToValueAtTime(1800, now + 0.08);
      osc2.frequency.exponentialRampToValueAtTime(1200, now + 0.4);
      
      gain2.gain.setValueAtTime(0, now + 0.04);
      gain2.gain.linearRampToValueAtTime(0.2, now + 0.06);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now + 0.04);
      osc2.stop(now + 0.7);

      // Node 3: Low-frequency ripple resonance
      const osc3 = this.ctx.createOscillator();
      const gain3 = this.ctx.createGain();
      osc3.type = "sine";
      osc3.frequency.setValueAtTime(80, now + 0.05);
      osc3.frequency.exponentialRampToValueAtTime(150, now + 0.2);
      gain3.gain.setValueAtTime(0, now);
      gain3.gain.linearRampToValueAtTime(0.3, now + 0.05);
      gain3.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      
      osc3.connect(gain3);
      gain3.connect(this.ctx.destination);
      osc3.start(now);
      osc3.stop(now + 0.52);

    } catch (e) {
      console.warn("Audio Context error:", e);
    }
  }

  /**
   * Synthesizes a soft bubble pop/button click
   */
  public playBubblePop() {
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.03);
      osc.frequency.exponentialRampToValueAtTime(50, now + 0.08);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.1);
    } catch (e) {
      console.warn(e);
    }
  }

  /**
   * Synthesizes a gorgeous metallic notification gong/chime
   */
  public playNotificationChime() {
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const frequencies = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (chord)
      
      frequencies.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);
        
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.08, now + idx * 0.04 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.8);
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.start(now + idx * 0.04);
        osc.stop(now + idx * 0.04 + 0.9);
      });
    } catch (e) {
      console.warn(e);
    }
  }

  /**
   * Synthesizes dynamic, soothing rain and river soundboard
   */
  public startAmbientSound() {
    try {
      this.init();
      if (!this.ctx || this.isRainPlaying) return;

      const now = this.ctx.currentTime;
      this.isRainPlaying = true;

      // We simulate relaxing hums/wind oscillations
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(90, now);
      
      // Modulate frequency to simulate gentle breeze waves/water flow
      osc.frequency.linearRampToValueAtTime(95, now + 2);
      osc.frequency.linearRampToValueAtTime(85, now + 4);

      gain.gain.setValueAtTime(0.02, now);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start(now);
      
      this.ambientSource = osc;
      this.ambientGain = gain;
    } catch (e) {
      console.warn(e);
    }
  }

  public stopAmbientSound() {
    if (this.ambientSource) {
      try {
        this.ambientSource.stop();
        this.ambientSource.disconnect();
      } catch (e) {}
    }
    this.ambientSource = null;
    this.ambientGain = null;
    this.isRainPlaying = false;
  }
}

export const audio = new AudioEngine();
