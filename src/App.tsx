import { useState, type FormEvent } from 'react';
import { ArrowRight, CalendarDays, Facebook, Instagram, Linkedin, Menu, Mic, Plane, Plus, Search, Send, Sparkles, Star, X } from 'lucide-react';
import QRCode from 'react-qr-code';
import { destinations, faqs, routes, testimonials, type TravelScope } from './data';
import { ActionDialog, ScopeTabs, SectionHeading, type DialogContent } from './components/ui';

type OpenDialog = (content: DialogContent) => void;

function Header({ openDialog }: { openDialog: OpenDialog }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [['Home', '#home'], ['Flights', '#flights'], ['Destinations', '#destinations'], ['Deals', '#flights'], ['About Us', '#about'], ['Support', '#support']];
  return <header className="site-header page-width flex items-center justify-between">
    <a href="#home" className="brand" aria-label="CloudPilot home">CloudPilot</a>
    <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">{links.map(([name, href]) => <a key={name} href={href} onClick={() => setMenuOpen(false)}>{name}</a>)}</nav>
    <div className="flex items-center gap-6 header-actions"><button className="signin-link" onClick={() => openDialog({ kind: 'signin', title: 'Welcome back' })}>Sign In</button><button className="button register-button" onClick={() => openDialog({ kind: 'register', title: 'Your next adventure starts here' })}>Register</button><button className="menu-toggle icon-button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button></div>
  </header>;
}

function Hero({ openDialog }: { openDialog: OpenDialog }) {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [voiceMessage, setVoiceMessage] = useState('');
  const allDestinations = [...destinations.Domestic, ...destinations.International];
  const matches = allDestinations.filter(place => place.name.toLowerCase().includes(query.trim().toLowerCase()));
  function submitSearch(event: FormEvent) { event.preventDefault(); setShowResults(true); setVoiceMessage(''); }
  return <section className="hero" id="home">
    <div className="hero-sky" aria-hidden="true" />
    <Header openDialog={openDialog} />
    <div className="hero-content relative text-center">
      <p className="hero-tagline">Your next destination is just a click away.</p>
      <h1>Fly Beyond Limits – Explore<br className="desktop-break" /> the World with Us</h1>
      <p className="hero-description">Discover the freedom of seamless travel with our smart<br className="desktop-break" /> booking platform designed</p>
      <div className="search-container">
        <form className="search-form flex items-center" role="search" onSubmit={submitSearch}>
          <button type="submit" className="icon-button search-submit" aria-label="Search destinations"><Search size={20} strokeWidth={1.5} /></button>
          <label className="sr-only" htmlFor="destination-search">Where do you want to fly?</label>
          <input id="destination-search" value={query} onChange={event => { setQuery(event.target.value); setShowResults(true); }} onKeyDown={event => { if (event.key === 'Escape') setShowResults(false); }} placeholder="Search here Where do you want to fly?" autoComplete="off" aria-expanded={showResults} aria-controls="search-results" />
          <button type="button" className="icon-button" aria-label="Voice search information" onClick={() => { setVoiceMessage('To search by voice, use your keyboard’s dictation feature, then select a destination.'); setShowResults(false); }}><Mic size={20} strokeWidth={1.4} /></button>
          <button type="button" className="icon-button" aria-label="Choose travel dates" onClick={() => openDialog({ kind: 'flight', title: 'Plan your next flight', destination: query.trim() || 'Cox’s Bazar' })}><CalendarDays size={20} strokeWidth={1.4} /></button>
        </form>
        {voiceMessage && <div className="search-results text-left" role="status"><p>{voiceMessage}</p><button className="text-link mt-3" onClick={() => setVoiceMessage('')}>Dismiss</button></div>}
        {showResults && <div className="search-results text-left" id="search-results"><div className="flex items-center justify-between mb-2"><strong>{query ? 'Matching destinations' : 'Where will you go next?'}</strong><button className="icon-button" onClick={() => setShowResults(false)} aria-label="Close search results"><X size={18} /></button></div>{matches.length ? matches.map(place => <button key={place.name} className="search-result" onClick={() => { setShowResults(false); openDialog({ kind: 'flight', title: `Let’s go to ${place.name}`, destination: place.name }); }}><span>{place.name}</span><ArrowRight size={17} /></button>) : <p className="py-4">No destinations found for “{query}”. Try Dhaka, Toronto, or Maldives.</p>}</div>}
      </div>
    </div>
    <img className="hero-airplane" src="/images/airplane.png" alt="A white passenger airplane taking flight" fetchPriority="high" width="613" height="290" />
  </section>;
}

function PopularDestinations({ openDialog }: { openDialog: OpenDialog }) {
  const [scope, setScope] = useState<TravelScope>('Domestic');
  return <section id="destinations" className="destinations-section page-width">
    <SectionHeading title="Popular Destinations">Experience the romance of the Eiffel Tower, historic streets, and<br className="desktop-break" /> exquisite cuisine Escape to tropical bliss with pristine</SectionHeading>
    <ScopeTabs value={scope} onChange={setScope} label="Destination region" />
    <div className="destination-grid grid grid-cols-2 md:grid-cols-4 gap-6">{destinations[scope].map(destination => <button key={destination.name} className="destination-card group" onClick={() => openDialog({ kind: 'flight', title: `Explore ${destination.name}`, destination: destination.name, description: destination.description })}>
      <img src={`/images/${destination.image}`} alt="" loading="lazy" width="600" height="750" />
      <span>{destination.name}</span><ArrowRight className="destination-arrow" size={21} />
    </button>)}</div>
  </section>;
}

function FlightRoutes({ openDialog }: { openDialog: OpenDialog }) {
  const [scope, setScope] = useState<TravelScope>('Domestic');
  return <section id="flights" className="flights-section page-width">
    <SectionHeading title="Search Cheapest Flight By Destinations">Looking to fly on a budget? Easily compare and search the<br className="desktop-break" /> cheapest flights by destination with our smar</SectionHeading>
    <ScopeTabs value={scope} onChange={setScope} label="Flight region" />
    <div className="flight-grid grid md:grid-cols-2 gap-6">{routes[scope].map(destination => <button key={destination} className="flight-route flex items-center justify-between" onClick={() => openDialog({ kind: 'flight', title: `Dhaka to ${destination}`, destination })}>
      <span className="text-left"><strong>Dhaka</strong><span>Hazrat Shahjalal I.</span></span><span className="route-plane" aria-hidden="true"><Plane size={16} strokeWidth={1.2} /></span><span className="text-right"><strong>{destination}</strong><span>{scope === 'Domestic' ? 'Cox’s Bazar Airport' : 'International Airport'}</span></span>
    </button>)}</div>
  </section>;
}

function FAQ({ openDialog }: { openDialog: OpenDialog }) {
  return <section id="support" className="faq-section">
    <SectionHeading title="Frequently Asked Questions">Our Frequently Asked Questions (FAQs) section is here to make your travel<br className="desktop-break" /> planning smooth and stress-free. Whether you’re booking</SectionHeading>
    <div className="faq-list">{faqs.map(faq => <details key={faq.question} className="faq-item"><summary><span>Q. {faq.question}</span><Plus size={17} strokeWidth={1.7} /></summary><p>{faq.answer}</p></details>)}</div>
    <div className="questions-callout text-center"><h2>Still have questions ?</h2><p>Discover the freedom of seamless travel with our smart<br className="desktop-break" /> booking platform designed Popular Destinations</p><button className="button" onClick={() => openDialog({ kind: 'support', title: 'Let’s talk travel', description: 'Have a question about your next trip? Try our support inquiry form.' })}>Let’s Chat Now</button></div>
  </section>;
}

function PartnerBanner({ openDialog }: { openDialog: OpenDialog }) {
  return <section className="partner-section"><div className="page-width flex items-center justify-between gap-8"><div><h2>Grow Your Business with CloudPilot</h2><p>From seamless bookings to top-notch support, our<br className="desktop-break" /> clients share how we’ve helped make their travel dreams</p></div><button className="button shrink-0" onClick={() => openDialog({ kind: 'partner', title: 'Let’s grow together', description: 'Tell us about your business and explore a CloudPilot partnership.' })}>Become a partner</button></div></section>;
}

function Testimonials() {
  return <section id="about" className="testimonials-section page-width"><div className="testimonials-heading flex justify-between gap-10"><h2>Loved by thousands of<br /> travelers</h2><p>We take pride in creating memorable travel experiences for our<br className="desktop-break" /> customers. Don’t just take our word for it</p></div>
    <div className="testimonials-grid grid md:grid-cols-3 gap-7">{testimonials.map(person => <figure className="testimonial" key={person.name}><figcaption className="flex items-center gap-4"><img src={`/images/${person.avatar}`} alt="" width="48" height="48" loading="lazy" /><div><strong>{person.name}</strong><span>{person.location}</span></div></figcaption><blockquote>“{person.quote}”</blockquote><div className="testimonial-bottom flex items-center justify-between gap-2"><div><strong>{person.country}</strong><time dateTime="2024-12-24">24 December 2024</time></div><span className="stars flex" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, index) => <Star key={index} size={22} fill="currentColor" strokeWidth={0} />)}</span></div></figure>)}</div>
  </section>;
}

function StoreBadge({ store, onClick }: { store: 'apple' | 'google'; onClick: () => void }) {
  return <button className="store-badge flex items-center" onClick={onClick} aria-label={store === 'apple' ? 'Download on the App Store' : 'Get it on Google Play'}>{store === 'apple' ? <svg width="23" height="27" viewBox="0 0 24 28" fill="currentColor" aria-hidden="true"><path d="M17.1 4.5c1.1-1.3 1.8-3 1.6-4.5-1.6.1-3.4 1.1-4.5 2.3-1 1.1-1.9 2.9-1.6 4.5 1.7.1 3.4-.9 4.5-2.3ZM21 14.8c0-3 2.5-4.5 2.6-4.6-1.4-2.1-3.6-2.4-4.4-2.4-1.9-.2-3.7 1.2-4.7 1.2s-2.5-1.2-4.1-1.1C8.3 8 6.4 9.2 5.3 11c-2.2 3.8-.6 9.5 1.5 12.5 1 1.5 2.1 3 3.7 2.9 1.5-.1 2.1-.9 4-.9s2.5.9 4.1.9c1.7 0 2.7-1.5 3.6-2.9 1.1-1.6 1.6-3.2 1.6-3.3-.1 0-2.8-1.1-2.8-5.4Z" transform="translate(-3 0)" /></svg> : <svg width="23" height="25" viewBox="0 0 24 26" aria-hidden="true"><path fill="#40d4ed" d="M1 1v24l13-12Z"/><path fill="#62dd9d" d="m1 1 16 9-3 3Z"/><path fill="#ffd057" d="m17 10 6 3-6 3-3-3Z"/><path fill="#ff677c" d="m1 25 16-9-3-3Z"/></svg>}<span><small>{store === 'apple' ? 'Download on the' : 'Get it on'}</small><strong>{store === 'apple' ? 'App Store' : 'Google Play'}</strong></span></button>;
}

function Footer({ openDialog }: { openDialog: OpenDialog }) {
  const [subscribed, setSubscribed] = useState(false);
  function openInfo(title: string) { openDialog({ kind: 'info', title, description: `${title} is part of the CloudPilot frontend preview. This demo does not process bookings, collect personal data, or provide live travel services.` }); }
  const download = () => openDialog({ kind: 'download', title: 'Adventure, in your pocket', description: 'The CloudPilot app is part of this website concept. App Store and Google Play releases are not yet available. For now, explore all our destinations right here.' });
  return <footer className="site-footer"><div className="footer-clouds" aria-hidden="true" /><section id="download" className="app-section relative text-center"><p className="app-tagline"><Sparkles size={13} color="#bd871d" />Always connected wherever you go</p><h2>Your All in one Travel App</h2><p>Discover the freedom of seamless travel with our smart booking<br className="desktop-break" /> platform designed Popular Destinations</p><div className="app-downloads flex items-center justify-center gap-8"><StoreBadge store="apple" onClick={download} /><a className="app-qr" href="#destinations" aria-label="Explore destinations"><QRCode value={`${window.location.origin}/#destinations`} size={65} /></a><StoreBadge store="google" onClick={download} /></div></section>
    <div className="footer-main page-width relative grid"><div className="footer-brand"><a href="#home" className="brand">CloudPilot</a><p>Discover the freedom of seamless travel with<br className="desktop-break" /> our smart booking platform designed Popular<br className="desktop-break" /> Destinations</p><form className="newsletter flex" onSubmit={event => { event.preventDefault(); setSubscribed(true); }}><label htmlFor="newsletter-email" className="sr-only">Your email address</label><input id="newsletter-email" type="email" placeholder="Enter your email address" required aria-describedby={subscribed ? 'newsletter-status' : undefined} /><button className="button" aria-label="Subscribe to travel updates"><ArrowRight size={23} strokeWidth={1.5} /></button></form>{subscribed && <p id="newsletter-status" className="newsletter-status" role="status">Thanks! You’re on the demo list. No email was stored.</p>}<p className="follow-label">Follow us on</p><div className="social-links flex items-center gap-3">{[{ name: 'Facebook', Icon: Facebook }, { name: 'Instagram', Icon: Instagram }, { name: 'LinkedIn', Icon: Linkedin }, { name: 'Telegram', Icon: Send }].map(({ name, Icon }) => <button key={name} aria-label={name} onClick={() => openInfo(`CloudPilot on ${name}`)}><Icon size={22} strokeWidth={2} /></button>)}</div></div>
      <nav className="footer-nav" aria-label="Footer navigation"><h3>Navigation</h3>{[['Home', '#home'], ['Plans', '#flights'], ['Destinations', '#destinations'], ['About us', '#about'], ['Blog', '#about'], ['Download', '#download']].map(([label, href]) => <a key={label} href={href}>{label}</a>)}</nav>
      <nav className="footer-nav" aria-label="Top destinations"><h3>Top Destinations</h3>{['Singapore', 'Qatar', 'Malaysia', 'Italy', 'United States'].map(place => <button key={place} onClick={() => openDialog({ kind: 'flight', title: `Explore ${place}`, destination: place })}>{place}</button>)}</nav>
      <nav className="footer-nav" aria-label="Help and services"><h3>Help & Services</h3>{['Customer Services', 'Deliver Devices', 'Faq’s', 'Refound Policy', 'Website Terms of use'].map(label => label === 'Faq’s' ? <a key={label} href="#support">{label}</a> : <button key={label} onClick={() => openInfo(label)}>{label}</button>)}</nav>
    </div>
    <div className="footer-bottom page-width relative flex items-center justify-between gap-6"><p>©2025 Singularity internet provider company</p><div className="flex gap-8"><button onClick={() => openInfo('Terms & Condition')}>Terms & Condition</button><button onClick={() => openInfo('Privacy Policy')}>Privacy Policy</button></div></div>
  </footer>;
}

export default function App() {
  const [dialog, setDialog] = useState<DialogContent | null>(null);
  return <><a className="skip-link" href="#destinations">Skip to content</a><main><Hero openDialog={setDialog} /><PopularDestinations openDialog={setDialog} /><FlightRoutes openDialog={setDialog} /><FAQ openDialog={setDialog} /><PartnerBanner openDialog={setDialog} /><Testimonials /></main><Footer openDialog={setDialog} /><ActionDialog content={dialog} onClose={() => setDialog(null)} /></>;
}
