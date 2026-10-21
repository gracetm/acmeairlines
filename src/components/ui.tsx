import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowRight, CheckCircle2, Rocket, X } from 'lucide-react';
import { airports, type TravelScope } from '../data';

export function SectionHeading({ title, children }: { title: string; children: ReactNode }) {
  return <div className="section-heading text-center"><h2>{title}</h2><p>{children}</p></div>;
}

export function ScopeTabs({ value, onChange, label }: { value: TravelScope; onChange: (value: TravelScope) => void; label: string }) {
  return <div className="scope-tabs flex justify-center gap-2" role="group" aria-label={label}>
    {(['Domestic', 'International'] as const).map(scope => <button key={scope} type="button" aria-pressed={value === scope} className={`scope-tab ${value === scope ? 'is-active' : ''}`} onClick={() => onChange(scope)}>{scope}</button>)}
  </div>;
}

export type DialogContent = { kind: 'signin' | 'register' | 'partner' | 'support' | 'flight' | 'info' | 'download'; title: string; description?: string; destination?: string };

export function ActionDialog({ content, onClose }: { content: DialogContent | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [departureCode, setDepartureCode] = useState(airports[0].code);
  useEffect(() => {
    setSubmitted(false);
    setDepartureCode(airports[0].code);
    if (content) ref.current?.showModal();
    else ref.current?.close();
  }, [content]);
  const isAuth = content?.kind === 'signin' || content?.kind === 'register';
  const isFlight = content?.kind === 'flight';
  const isSpace = content?.destination === 'Space';
  const departure = airports.find(airport => airport.code === departureCode) ?? airports[0];
  const isForm = content && !['info', 'download'].includes(content.kind);
  return <dialog ref={ref} className="action-dialog" onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }} aria-labelledby="dialog-title">
    {content && <div className={`dialog-inner ${isSpace ? 'space-dialog-inner' : ''}`}>
      <button type="button" className="icon-button dialog-close" onClick={onClose} aria-label="Close dialog"><X size={21} /></button>
      <span className="brand">Acme Air</span>
      {isSpace && <div className="space-scene" aria-hidden="true"><span className="space-star star-one" /><span className="space-star star-two" /><span className="space-star star-three" /><Rocket size={33} strokeWidth={1.5} /></div>}
      <h2 id="dialog-title">{content.title}</h2>
      <p className="dialog-description">{content.description ?? (isFlight ? `Plan your journey from ${departure.city} to ${content.destination}.` : 'A little closer to your next adventure.')}</p>
      {submitted ? <div className="success-message" role="status"><CheckCircle2 size={30} /><h3>{isFlight ? 'Your trip is ready to explore' : 'You’re all set!'}</h3><p>{isFlight ? 'Your route and dates have been selected. Live fares and booking will be available when a flight provider is connected.' : 'Thanks for trying Acme Air. This demo has not sent or saved your information.'}</p><button className="button mt-5" onClick={onClose}>Keep exploring</button></div> : isForm ? <form className="dialog-form" onSubmit={event => { event.preventDefault(); setSubmitted(true); }}>
        {isFlight ? <>
          <div className="grid grid-cols-2 gap-4"><label>From<select value={departureCode} onChange={event => setDepartureCode(event.target.value)}>{airports.map(airport => <option key={airport.code} value={airport.code}>{airport.city} ({airport.code})</option>)}</select></label><label>To<input value={content.destination} readOnly /></label></div>
          <div className="grid grid-cols-2 gap-4"><label>Departure<input type="date" min={new Date().toLocaleDateString('en-CA')} required /></label><label>Travelers<select defaultValue="1"><option value="1">1 traveler</option><option value="2">2 travelers</option><option value="3">3 travelers</option><option value="4">4 travelers</option></select></label></div>
        </> : <>
          {content.kind !== 'signin' && <label>{content.kind === 'partner' ? 'Business name' : 'Your name'}<input name="name" autoComplete="name" placeholder={content.kind === 'partner' ? 'Your company' : 'Your full name'} required /></label>}
          <label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>
          {isAuth && <label>Password<input name="password" type="password" minLength={8} autoComplete={content.kind === 'signin' ? 'current-password' : 'new-password'} placeholder="At least 8 characters" required /></label>}
          {!isAuth && <label>{content.kind === 'support' ? 'How can we help?' : 'Tell us about your business'}<textarea rows={3} required placeholder="Tell us a little more…" /></label>}
        </>}
        <p className="demo-note">Interactive demo — no {isFlight ? 'booking or payment' : 'information is sent or stored'}.</p>
        <button type="submit" className="button flex items-center justify-center gap-3">{isFlight ? 'Explore this trip' : content.kind === 'signin' ? 'Sign in' : content.kind === 'register' ? 'Create account' : 'Send inquiry'}<ArrowRight size={16} /></button>
      </form> : <button className="button mt-6" onClick={onClose}>Got it</button>}
    </div>}
  </dialog>;
}
