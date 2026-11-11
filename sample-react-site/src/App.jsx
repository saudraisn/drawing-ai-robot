import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import DrawingPad from './components/DrawingPad.jsx'
import Features from './components/Features.jsx'
import Pricing from './components/Pricing.jsx'
import Faq from './components/Faq.jsx'
import Contact from './components/Contact.jsx'

const year = new Date().getFullYear()

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <DrawingPad />
        <Features />
        <Pricing />
        <Faq />
        <Contact />
      </main>
      <footer className="footer">
        <p>© {year} Sketchbot · A sample React site</p>
      </footer>
    </>
  )
}
