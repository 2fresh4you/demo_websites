import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import {
  ArrowUpRight,
  CalendarDays,
  Camera,
  ChevronRight,
  Clock,
  Coffee,
  Flame,
  Icon,
  Leaf,
  Mail,
  MapPin,
  Menu,
  Phone,
  Quote,
  Sparkles,
  Star,
  Wheat,
  X,
} from 'lucide-react'
import { coffeeBean } from '@lucide/lab'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import 'leaflet/dist/leaflet.css'
import '@fontsource/instrument-sans/400.css'
import '@fontsource/instrument-sans/500.css'
import '@fontsource/instrument-sans/600.css'
import '@fontsource/instrument-sans/700.css'
import '@fontsource/fraunces/600.css'
import '@fontsource/fraunces/700.css'
import cafeLogo from './assets/logos/cafe_logo_cropped.png'
import BottomGradualBlur from './components/BottomGradualBlur'

gsap.registerPlugin(ScrollTrigger)

const cafeLocation = {
  lat: 52.5262,
  lng: 13.4018,
}

const weatherCodeLabels = {
  0: 'Klarer Himmel',
  1: 'Überwiegend klar',
  2: 'Leicht bewölkt',
  3: 'Bedeckt',
  45: 'Nebel',
  48: 'Reifnebel',
  51: 'Leichter Nieselregen',
  53: 'Nieselregen',
  55: 'Dichter Nieselregen',
  61: 'Leichter Regen',
  63: 'Regen',
  65: 'Kräftiger Regen',
  71: 'Leichter Schneefall',
  73: 'Schneefall',
  75: 'Kräftiger Schneefall',
  80: 'Leichte Schauer',
  81: 'Schauer',
  82: 'Kräftige Schauer',
  95: 'Gewitter',
}

const navItems = [
  ['Geschichte', '#geschichte'],
  ['Signaturen', '#signaturen'],
  ['Galerie', '#galerie'],
  ['Handwerk', '#handwerk'],
  ['Besuch', '#besuch'],
]

const signatures = [
  {
    icon: Wheat,
    title: 'Sauerteig-Croissant',
    text: 'Drei Tage Teigruhe, tief gebräunte Kruste, weiche Butterlagen.',
    price: '4,80 €',
  },
  {
    icon: Sparkles,
    title: 'Kardamom-Knoten',
    text: 'Warmer Kardamom, Rohrohrzucker, ein Hauch Orange.',
    price: '4,20 €',
  },
  {
    icon: Coffee,
    title: 'Espresso Tonic',
    text: 'Hausblend, trockenes Tonic, Zitruszeste, klarer Kaltzug.',
    price: '5,40 €',
  },
  {
    icon: Leaf,
    title: 'Flat White mit Hafer',
    text: 'Seidiger Mikroschaum, schokoladige Röstung, präzise extrahiert.',
    price: '4,90 €',
  },
]

const menuItems = [
  ['Brioche mit Vanillecreme', 'Madagaskar-Vanille, gebrannte Butter, Salzblüte', '5,80 €'],
  ['Hausbrot mit gerösteter Butter', 'Natursauerteig, Roggen, kultivierte Butter', '6,20 €'],
  ['Miso-Schoko-Schnecke', 'Dunkle Schokolade, helle Miso-Karamellglasur', '5,40 €'],
  ['Filterkaffee Tagesröstung', 'Single Origin, handgebrüht, saisonal wechselnd', '4,60 €'],
  ['Stracciatella-Toast', 'Geröstetes Brot, Tomate, Basilikumöl, Pfeffer', '9,80 €'],
]

const craftSteps = [
  ['01', Flame, 'Teigführung', 'Unsere Sauerteige ruhen langsam und kühl. Zeit ist hier keine Zutat, sondern Haltung.'],
  ['02', Coffee, 'Röstprofil', 'Die Bohnen werden hell bis mittel geröstet, damit Süße, Säure und Textur sauber bleiben.'],
  ['03', Wheat, 'Ofenmoment', 'Gebäck kommt in kleinen Chargen aus dem Ofen. Lieber öfter frisch als einmal zu viel.'],
]

const testimonials = [
  {
    quote: 'KORNLICHT fühlt sich an wie ein Morgen in Berlin, nur leiser, wärmer und viel besser gebacken.',
    name: 'Mara Lenz',
    detail: 'Food Editor, Prenzlauer Berg',
  },
  {
    quote: 'Selten ist ein Café so präzise gestaltet und trotzdem so entspannt. Der Flat White ist außergewöhnlich.',
    name: 'Jonas Krüger',
    detail: 'Designer, Mitte',
  },
  {
    quote: 'Die Croissants haben dieses feine Knistern, das man nicht inszenieren kann. Man hört das Handwerk.',
    name: 'Leonie Falk',
    detail: 'Stammgast seit 2025',
  },
]

const faqs = [
  ['Kann ich einen Tisch reservieren?', 'Für Frühstück und kleine Gruppen nehmen wir Anfragen per E-Mail an. Für spontane Besuche halten wir täglich Plätze frei.'],
  ['Gibt es vegane Optionen?', 'Ja. Wir backen täglich ausgewählte vegane Stücke und führen Hafermilch ohne Aufpreis.'],
  ['Kann ich Brot vorbestellen?', 'Hausbrot und Sauerteiglaibe können bis 16 Uhr für den nächsten Tag angefragt werden.'],
  ['Arbeitet ihr mit Laptop-Plätzen?', 'Unter der Woche gibt es ruhige Fensterplätze mit Steckdosen. Am Wochenende gehört der Raum ganz dem Cafébetrieb.'],
]

const images = {
  hero:
    'https://images.unsplash.com/photo-1523942839745-7848c839b661?auto=format&fit=crop&w=2400&q=86',
  pastry:
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1500&q=86',
  coffee:
    'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1500&q=86',
  bakery:
    'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=1700&q=86',
  table:
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1500&q=86',
  interior:
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1900&q=86',
  dough:
    'https://images.unsplash.com/photo-1598373182133-52452f7691ef?auto=format&fit=crop&w=1500&q=86',
  counter:
    'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=1700&q=86',
}

const galleryImages = [
  [images.pastry, 'Goldene Croissants auf hellem Backpapier'],
  [images.coffee, 'Espresso an der Bar mit warmem Seitenlicht'],
  [images.dough, 'Hände formen frischen Teig in der Backstube'],
  [images.table, 'Cappuccino und Gebäck auf einem kleinen Tisch'],
  [images.counter, 'Kaffeebar mit Bohnen, Glas und dunklem Holz'],
]

function Button({ href, children, variant = 'dark', icon: Icon = ArrowUpRight }) {
  return (
    <a className={`button button--${variant}`} href={href}>
      <span>{children}</span>
      <Icon aria-hidden="true" size={17} strokeWidth={2.2} />
    </a>
  )
}

function HeroReservationButton() {
  return (
    <a className="button hero-blob-button" href="mailto:hallo@kornlicht.de?subject=Tischanfrage%20KORNLICHT">
      <span className="blob1" aria-hidden="true" />
      <span className="blob2" aria-hidden="true" />
      <span className="hero-blob-button__inner">
        <span>Tisch anfragen</span>
        <CalendarDays aria-hidden="true" size={17} strokeWidth={2.2} />
      </span>
    </a>
  )
}

function Logo() {
  return (
    <span className="brand-lockup">
      <img className="brand-logo-img" src={cafeLogo} alt="" aria-hidden="true" />
      <span className="brand-word">KORNLICHT</span>
    </span>
  )
}

function EmblemMark() {
  return (
    <span className="gold-emblem" aria-hidden="true">
      <Icon className="gold-emblem__mark" iconNode={coffeeBean} strokeWidth={2.25} />
    </span>
  )
}

function LegacySeal() {
  return (
    <div className="legacy-seal" aria-label="KORNLICHT Handwerkssignet">
      <EmblemMark />
      <span>
        <strong>Hausröstung</strong>
        <small>seit dem ersten Morgen</small>
      </span>
    </div>
  )
}

function WeatherWidget() {
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let ignore = false
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${cafeLocation.lat}&longitude=${cafeLocation.lng}&current=temperature_2m,weather_code,wind_speed_10m&timezone=Europe%2FBerlin`

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Wetterdaten nicht verfügbar')
        }
        return response.json()
      })
      .then((data) => {
        if (!ignore) {
          setWeather(data.current)
        }
      })
      .catch(() => {
        if (!ignore) {
          setError(true)
        }
      })

    return () => {
      ignore = true
    }
  }, [])

  const label = weather ? weatherCodeLabels[weather.weather_code] || 'Aktuelles Wetter' : ''
  const updateTime = weather?.time
    ? new Intl.DateTimeFormat('de-DE', {
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date(weather.time))
    : null

  return (
    <div className="weather-widget" aria-label="Aktuelles Wetter am Standort">
      <div className="weather-widget__header">
        <Leaf aria-hidden="true" size={17} />
        <span>Wetter am Standort</span>
      </div>
      {weather ? (
        <>
          <strong>{Math.round(weather.temperature_2m)}°C</strong>
          <p>{label}</p>
          <small>
            Wind {Math.round(weather.wind_speed_10m)} km/h
            {updateTime ? ` · Stand ${updateTime} Uhr` : ''}
          </small>
        </>
      ) : (
        <p>{error ? 'Wetterdaten gerade nicht verfügbar' : 'Wetterdaten werden geladen'}</p>
      )}
    </div>
  )
}

function FooterMap() {
  const mapRef = useRef(null)

  useEffect(() => {
    if (!mapRef.current) {
      return undefined
    }

    const map = L.map(mapRef.current, {
      attributionControl: false,
      scrollWheelZoom: false,
      zoomControl: true,
    }).setView([cafeLocation.lat, cafeLocation.lng], 15)

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap &copy; CARTO',
    }).addTo(map)

    const marker = L.divIcon({
      className: 'footer-map-marker',
      html: '<span></span>',
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    })

    L.marker([cafeLocation.lat, cafeLocation.lng], { icon: marker })
      .addTo(map)
      .bindPopup('KORNLICHT<br>Auguststraße 42')

    return () => {
      map.remove()
    }
  }, [])

  return (
    <div className="footer-map" aria-label="Interaktive Karte zur Lage von KORNLICHT">
      <div className="leaflet-map" ref={mapRef} />
      <div className="map-overlay-card">
        <MapPin aria-hidden="true" size={18} />
        <span>
          <strong>KORNLICHT</strong>
          Auguststraße 42
        </span>
      </div>
      <span className="map-credit">Kartendaten: OpenStreetMap / CARTO</span>
    </div>
  )
}

function SectionHeader({ kicker, title, text, icon: Icon = Sparkles }) {
  return (
    <div className="section-header reveal">
      <p className="dot-label">
        <Icon aria-hidden="true" size={15} />
        {kicker}
      </p>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  )
}

function Navigation() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    return () => document.body.classList.remove('menu-open')
  }, [open])

  const closeMenu = () => setOpen(false)

  return (
    <header className="site-nav" aria-label="Hauptnavigation">
      <a className="nav-brand" href="#start" aria-label="KORNLICHT Startseite" onClick={closeMenu}>
        <Logo />
      </a>
      <nav className="desktop-nav">
        {navItems.map(([label, href]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>
      <a className="nav-cta" href="mailto:hallo@kornlicht.de?subject=Tischanfrage%20KORNLICHT">
        Tisch anfragen
      </a>
      <button
        className="menu-toggle"
        type="button"
        aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
        aria-expanded={open}
        aria-controls="mobiles-menue"
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <X size={25} strokeWidth={2.5} /> : <Menu size={25} strokeWidth={2.5} />}
      </button>
      <div className={`mobile-panel ${open ? 'is-open' : ''}`} id="mobiles-menue">
        <nav aria-label="Mobile Navigation">
          {navItems.map(([label, href]) => (
            <a key={href} href={href} onClick={closeMenu}>
              {label}
              <ChevronRight aria-hidden="true" size={18} />
            </a>
          ))}
        </nav>
        <Button href="mailto:hallo@kornlicht.de?subject=Tischanfrage%20KORNLICHT" icon={CalendarDays}>
          Tisch anfragen
        </Button>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero-section" id="start" aria-label="KORNLICHT Café und Bäckerei">
      <div className="hero-media">
        <img src={images.hero} alt="Handwerkliches Cafégebäck und Kaffee in warmem Morgenlicht" />
      </div>
      <div className="hero-grain" />
      <div className="hero-overlay" />
      <div className="hero-content">
        <p className="dot-label hero-intro">
          <Coffee aria-hidden="true" size={15} />
          Café · Bäckerei · Berlin-Mitte
        </p>
        <h1 className="hero-title hero-intro">KORNLICHT</h1>
        <p className="hero-copy hero-intro">
          Handwerklich gebacken. Sorgfältig gebrüht. Ein heller Ort für
          Sauerteig, Specialty Coffee und lange Vormittage.
        </p>
        <div className="hero-actions hero-intro">
          <HeroReservationButton />
          <Button href="#signaturen" variant="light" icon={ChevronRight}>
            Menü ansehen
          </Button>
        </div>
      </div>
      <div className="hero-note hero-intro">
        <Clock aria-hidden="true" size={18} />
        <span>Heute geöffnet</span>
        <strong>7:30-18:30</strong>
      </div>
    </section>
  )
}

function BrandStory() {
  return (
    <section className="story-section section-pad" id="geschichte">
      <div className="story-grid">
        <SectionHeader
          icon={Leaf}
          kicker="Unsere Haltung"
          title="Ein Café-Atelier für frühes Licht, gutes Brot und klare Formen."
          text="KORNLICHT verbindet die Ruhe einer handwerklichen Backstube mit der Präzision einer modernen Kaffeebar. Alles entsteht in kleinen Mengen, nah am Ofen, nah am Gast."
        />
        <div className="story-copy reveal">
          <p>
            Morgens duftet es nach karamellisierter Butter, geröstetem Kaffee und
            frischem Sauerteig. Mittags wird der Raum heller, leiser, fast
            wohnlich. Abends bleibt der Nachhall von warmem Holz, Stein und
            Kruste.
          </p>
          <LegacySeal />
          <div className="sensory-strip ambient-loop">
            <span><Flame size={16} />Warm</span>
            <span><Wheat size={16} />Knusprig</span>
            <span><Coffee size={16} />Klar</span>
          </div>
          <p>
            Unser Anspruch ist einfach: wenige Dinge, sehr sorgfältig gemacht.
            Keine Show, kein Überfluss, nur gutes Handwerk mit urbaner Leichtigkeit.
          </p>
        </div>
      </div>
    </section>
  )
}

function SignatureMenu() {
  return (
    <section className="signature-section section-pad" id="signaturen">
      <SectionHeader
        icon={Star}
        kicker="Unsere Signaturen"
        title="Gebäck und Kaffee mit ruhiger Spannung."
        text="Saisonale Zutaten, saubere Texturen, präzise Röstungen. Jeden Morgen neu gebacken und gebrüht."
      />
      <div className="signature-layout">
        <div className="image-panel tall reveal">
          <img src={images.pastry} alt="Frisch gebackene Croissants mit goldener Kruste" />
        </div>
        <div className="signature-list">
          {signatures.map((item) => {
            const Icon = item.icon
            return (
              <article className="menu-card reveal" key={item.title}>
                <div className="menu-icon">
                  <Icon aria-hidden="true" size={20} />
                </div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
                <span>{item.price}</span>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function BakeryShowcase() {
  return (
    <section className="bakery-section section-pad" aria-label="Café und Bäckerei Erlebnis">
      <div className="bakery-grid">
        <div className="bakery-text reveal">
          <p className="dot-label">
            <Wheat aria-hidden="true" size={15} />
            Café + Backstube
          </p>
          <h2>Der Ofen arbeitet sichtbar. Die Bar bleibt nah.</h2>
          <p>
            Zwischen Naturstein, warmem Espressoholz und offener Backfläche wird
            jeder Besuch sinnlich, aber nie laut. Man sieht, wie Teig geschnitten,
            Milch gezogen und Brot gebrochen wird.
          </p>
          <Button href="#besuch" variant="outline" icon={MapPin}>
            Besuch planen
          </Button>
        </div>
        <div className="image-stack reveal ambient-loop">
          <img className="stack-main" src={images.coffee} alt="Barista gießt Milch in einen Flat White" />
          <img className="stack-float" src={images.bakery} alt="Handwerklich gebackenes Brot auf einem Bäckereitisch" />
          <div className="steam-lines" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </section>
  )
}

function FeaturedMenu() {
  return (
    <section className="featured-menu section-pad" aria-label="Auszug aus dem Menü">
      <div className="menu-heading reveal">
        <p className="dot-label">
          <Sparkles aria-hidden="true" size={15} />
          Auszug aus dem Menü
        </p>
        <h2>Früh, warm, frisch.</h2>
      </div>
      <div className="menu-table">
        {menuItems.map(([name, description, price]) => (
          <article className="menu-row reveal" key={name}>
            <h3>{name}</h3>
            <p>{description}</p>
            <span>{price}</span>
          </article>
        ))}
      </div>
    </section>
  )
}

function CraftSection() {
  return (
    <section className="craft-section section-pad" id="handwerk">
      <SectionHeader
        icon={Flame}
        kicker="Handwerk"
        title="Langsame Prozesse, klare Ergebnisse."
        text="Unser Rhythmus folgt dem Teig, der Bohne und dem Ofen. Das Ergebnis soll selbstverständlich wirken, nicht kompliziert."
      />
      <div className="craft-grid">
        {craftSteps.map(([number, Icon, title, text]) => (
          <article className="craft-step reveal" key={number}>
            <span>{number}</span>
            <Icon aria-hidden="true" size={24} />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function GalleryExperience() {
  const loopItems = [...galleryImages, ...galleryImages]

  return (
    <section className="gallery-section" id="galerie" aria-label="Erste Eindrücke von KORNLICHT">
      <div className="gallery-intro section-pad reveal">
        <p className="dot-label">
          <Sparkles aria-hidden="true" size={15} />
          Erste Eindrücke
        </p>
        <h2>Ein bewegter Blick durch den Morgen.</h2>
      </div>
      <div className="gallery-carousel ambient-loop" aria-label="Animierte Bildergalerie">
        <div className="gallery-rail">
          {loopItems.map(([src, alt], index) => (
            <figure className="gallery-card" key={`${alt}-${index}`}>
              <img src={src} alt={alt} />
              <figcaption>{alt}</figcaption>
            </figure>
          ))}
        </div>
      </div>
      <div className="gallery-track">
        <figure className="gallery-item wide reveal">
          <img src={images.interior} alt="Moderner Café-Innenraum mit warmem Licht und Holzdetails" />
          <figcaption>Morgenlicht auf Stein, Holz und Croissantkrumen.</figcaption>
        </figure>
        <figure className="gallery-item reveal">
          <img src={images.table} alt="Espresso und Gebäck auf einem hellen Cafétisch" />
          <figcaption>Kleine Tische, klare Linien, ruhiger Duft.</figcaption>
        </figure>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section className="testimonial-section section-pad" aria-label="Stimmen von Gästen">
      <SectionHeader icon={Quote} kicker="Stimmen" title="Was bleibt, ist das Gefühl von Wärme und Präzision." />
      <div className="testimonial-grid">
        {testimonials.map((item) => (
          <figure className="testimonial reveal" key={item.name}>
            <Quote aria-hidden="true" size={28} />
            <blockquote>„{item.quote}“</blockquote>
            <figcaption>
              <strong>{item.name}</strong>
              <span>{item.detail}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

function VisitCTA() {
  return (
    <section className="visit-cta" aria-label="Besuch anfragen">
      <div className="visit-inner reveal">
        <p className="dot-label">
          <CalendarDays aria-hidden="true" size={15} />
          Reservierung
        </p>
        <h2>Ein guter Morgen lässt sich planen.</h2>
        <p>
          Für Frühstück, kleine Treffen oder einen Platz am Fenster nehmen wir
          Anfragen unkompliziert per E-Mail entgegen.
        </p>
        <Button href="mailto:hallo@kornlicht.de?subject=Tischanfrage%20KORNLICHT" variant="light" icon={CalendarDays}>
          Tisch anfragen
        </Button>
      </div>
    </section>
  )
}

function LocationSection() {
  return (
    <section className="location-section section-pad" id="besuch">
      <div className="location-grid">
        <div className="location-copy reveal">
          <p className="dot-label">
            <MapPin aria-hidden="true" size={15} />
            Besuch
          </p>
          <h2>Auguststraße 42, 10119 Berlin-Mitte</h2>
          <p>
            Zwischen Galerien, Ateliers und ruhigen Hinterhöfen. U8 Rosenthaler
            Platz ist fünf Minuten entfernt.
          </p>
          <div className="contact-links">
            <a href="mailto:hallo@kornlicht.de"><Mail size={17} />hallo@kornlicht.de</a>
            <a href="tel:+493020994218"><Phone size={17} />+49 30 2099 4218</a>
          </div>
        </div>
        <div className="hours-card reveal" aria-label="Öffnungszeiten">
          <span><Clock size={16} />Öffnungszeiten</span>
          <dl>
            <div>
              <dt>Montag-Freitag</dt>
              <dd>7:30-18:30</dd>
            </div>
            <div>
              <dt>Samstag-Sonntag</dt>
              <dd>8:30-17:00</dd>
            </div>
          </dl>
          <p>Feiertage kündigen wir eine Woche vorher an.</p>
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  return (
    <section className="faq-section section-pad" id="faq" aria-label="Häufige Fragen">
      <SectionHeader icon={Sparkles} kicker="Gut zu wissen" title="Kurze Antworten vor dem Besuch." />
      <div className="faq-list">
        {faqs.map(([question, answer]) => (
          <details className="faq-item reveal" key={question}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <a className="footer-brand" href="#start" aria-label="KORNLICHT Startseite">
            <Logo />
          </a>
          <p>Handwerkliche Bäckerei, Specialty Coffee und warme Morgenkultur in Berlin-Mitte.</p>
        </div>
        <Button href="mailto:hallo@kornlicht.de?subject=Tischanfrage%20KORNLICHT" variant="light" icon={CalendarDays}>
          Tisch anfragen
        </Button>
      </div>
      <div className="footer-grid">
        <FooterMap />
        <WeatherWidget />
        <div className="footer-column">
          <h3>Besuch</h3>
          <a href="#besuch"><MapPin size={16} />Auguststraße 42, 10119 Berlin</a>
          <a href="mailto:hallo@kornlicht.de"><Mail size={16} />hallo@kornlicht.de</a>
          <a href="tel:+493020994218"><Phone size={16} />+49 30 2099 4218</a>
        </div>
        <div className="footer-column">
          <h3>Öffnungszeiten</h3>
          <p>Mo-Fr · 7:30-18:30</p>
          <p>Sa-So · 8:30-17:00</p>
          <a href="#faq"><Clock size={16} />Fragen zum Besuch</a>
        </div>
        <div className="footer-column">
          <h3>Folgen</h3>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
            <Camera size={16} />Instagram
          </a>
          <a href="#galerie"><Sparkles size={16} />Erste Eindrücke</a>
          <a href="#signaturen"><Coffee size={16} />Menü ansehen</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 KORNLICHT Café & Bäckerei. Alle Rechte vorbehalten.</span>
        <div>
          <a href="#start">Impressum</a>
          <a href="#start">Datenschutz</a>
          <a href="#start">AGB</a>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  const rootRef = useRef(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) {
      document.querySelectorAll('.ambient-loop').forEach((element) => {
        element.classList.add('is-active')
      })
      return undefined
    }

    const context = gsap.context(() => {
      gsap.utils.toArray('.reveal').forEach((element) => {
        gsap.fromTo(
          element,
          { y: 30, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1.15,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 94%',
              toggleActions: 'play none none none',
            },
          },
        )
      })

      gsap.utils.toArray('.ambient-loop').forEach((element) => {
        ScrollTrigger.create({
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          onEnter: () => element.classList.add('is-active'),
          onEnterBack: () => element.classList.add('is-active'),
          onLeave: () => element.classList.remove('is-active'),
          onLeaveBack: () => element.classList.remove('is-active'),
        })
      })
    }, rootRef)

    return () => context.revert()
  }, [])

  return (
    <div className="site-shell" ref={rootRef}>
      <Navigation />
      <main>
        <Hero />
        <BrandStory />
        <SignatureMenu />
        <BakeryShowcase />
        <FeaturedMenu />
        <CraftSection />
        <GalleryExperience />
        <Testimonials />
        <VisitCTA />
        <LocationSection />
        <FAQ />
      </main>
      <Footer />
      <BottomGradualBlur height={60} maxBlur={14} layers={6} tint="rgba(37, 19, 15, 0.1)" zIndex={55} />
    </div>
  )
}
