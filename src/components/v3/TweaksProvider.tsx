'use client';

import { useEffect } from 'react';
import { useTweaks, TweaksPanel, TweakSection, TweakSlider, TweakColor, TweakToggle, TweakRadio } from './TweaksPanel';
import Hero from './Hero';
import Operator from './Operator';
import Stack from './Stack';
import InProduction from './InProduction';
import Newsletter from './Newsletter';
import Footer from './Footer';

const TWEAK_DEFAULTS = {
  creamLevel: 30,
  grain: true,
  glitch: true,
  handwriting: 'regular',
  marker: true,
  accent: '#ef5541',
};

export default function TweaksProvider() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    const root = document.documentElement;
    const cream = Math.max(0, Math.min(100, t.creamLevel as number));
    const lightness = 97 - cream * 0.13;
    const sat = 28 + cream * 0.22;
    root.style.setProperty('--bg', `hsl(36 ${sat}% ${lightness}%)`);
    root.style.setProperty('--bg-deep', `hsl(34 ${sat}% ${Math.max(78, lightness - 6)}%)`);
    root.style.setProperty('--cherry', t.accent as string);
    root.style.setProperty('--grain-opacity', (t.grain as boolean) ? '0.5' : '0');

    document.body.classList.toggle('no-grain', !(t.grain as boolean));
    document.body.classList.toggle('no-glitch', !(t.glitch as boolean));
    document.body.classList.toggle('no-marker', !(t.marker as boolean));
    document.body.classList.toggle('no-hand', t.handwriting === 'off');
    document.body.classList.toggle('hand-light', t.handwriting === 'light');
  }, [t]);

  return (
    <>
      <aside className="left-rail" aria-label="primary">
        <div className="logo">c</div>
        <a className="nav-link" href="#hero">home</a>
        <a className="nav-link" href="#operator">operator</a>
        <a className="nav-link" href="#stack">stack</a>
        <a className="nav-link" href="#in-production">in&nbsp;prod</a>
        <a className="nav-link" href="#connect">connect</a>
        <div className="vert">cherry pi · v3.2</div>
      </aside>

      <header className="top-bar">
        <span className="wm">cherry <em>pi</em></span>
        <a href="#connect" className="btn primary" style={{ padding: '8px 14px', fontSize: 12 }}>→ start</a>
      </header>

      <main className="with-rail">
        <Hero />
        <Operator />
        <Stack />
        <InProduction />
        <Newsletter />
        <Footer />
      </main>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Surface" />
        <TweakSlider label="Cream level" value={t.creamLevel as number} min={0} max={100} unit="%"
                     onChange={(v) => setTweak('creamLevel', v)} />
        <TweakColor label="Accent" value={t.accent as string}
                    onChange={(v) => setTweak('accent', v)} />
        <TweakToggle label="Film grain" value={t.grain as boolean}
                     onChange={(v) => setTweak('grain', v)} />
        <TweakSection label="Personality" />
        <TweakRadio label="Handwriting" value={t.handwriting as string}
                    options={['off', 'light', 'regular']}
                    onChange={(v) => setTweak('handwriting', v)} />
        <TweakToggle label="Highlighter marker" value={t.marker as boolean}
                     onChange={(v) => setTweak('marker', v)} />
        <TweakToggle label="Glitch headers" value={t.glitch as boolean}
                     onChange={(v) => setTweak('glitch', v)} />
      </TweaksPanel>
    </>
  );
}
