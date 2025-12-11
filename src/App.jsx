import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'

// Image Placeholder Component
const ImagePlaceholder = ({ className = '', text = 'IMAGE' }) => (
  <div className={`bg-placeholder flex items-center justify-center ${className}`}>
    <span className="text-dark/40 text-sm font-medium tracking-wider">{text}</span>
  </div>
)

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    // Force scroll to top immediately before paint
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [pathname])

  return null
}

// Logo Component with masked "M"
const Logo = ({ size = 'default' }) => {
  const iconSize = size === 'large' ? 'text-5xl' : 'text-4xl'
  const textSize = size === 'large' ? 'text-xl' : 'text-base'

  return (
    <Link to="/" className="flex items-center gap-2 group cursor-pointer">
      {/* M icon with roof texture mask */}
      <span className={`logo-icon ${iconSize}`}>M</span>
      {/* Text */}
      <div className={`font-serif ${textSize} leading-tight`}>
        <span className="text-dark group-hover:text-accent transition-colors">Toiture</span>
        <br />
        <span className="text-dark group-hover:text-accent transition-colors">Martin</span>
      </div>
    </Link>
  )
}

// Header Component
const Header = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-cream/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="px-5 py-3 flex items-center justify-between">
        <Logo />
        <a
          href="tel:0612345678"
          className="flex items-center gap-2 text-sm font-medium text-dark hover:text-accent transition-colors"
        >
          <span>06 12 34 56 78</span>
          <span className="text-accent">&rarr;</span>
        </a>
      </div>
    </header>
  )
}

// Hero Section
const Hero = () => {
  const [offset, setOffset] = useState(0)
  const heroRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section ref={heroRef} className="pt-20 px-5 pb-0 bg-cream relative">
      <div className="max-w-lg mx-auto">
        {/* SIRET Label */}
        <p className="label-accent mb-6 opacity-0 animate-fade-in-up">
          SIRET N&deg; 123 456 789
        </p>

        {/* Main Title */}
        <h1 className="title-serif text-5xl sm:text-6xl mb-6 opacity-0 animate-fade-in-up animation-delay-100">
          Couverture<br />
          <span className="text-accent">&amp;</span> R&eacute;novation
        </h1>

        {/* Description */}
        <p className="text-dark/70 text-base leading-relaxed mb-8 opacity-0 animate-fade-in-up animation-delay-200">
          Prot&eacute;ger votre maison demande plus que des tuiles et du zinc.
          Cela exige savoir-faire, rigueur et attention aux d&eacute;tails.
        </p>

        {/* CTA Button */}
        <div className="opacity-0 animate-fade-in-up animation-delay-300 mb-8">
          <a href="#contact" className="btn-outline inline-block">
            Demander un devis
          </a>
        </div>
      </div>

      {/* Large M Logo - parallax: moves slower than scroll so section covers it */}
      <div className="hero-logo-container flex justify-center opacity-0 animate-fade-in-up animation-delay-400">
        <div
          className="hero-logo-icon"
          style={{ transform: `translateY(${offset * 0.4}px)` }}
        >
          M
        </div>
      </div>
    </section>
  )
}

// Services Section (Dark) - Klindworth style
const ServicesSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const services = [
    {
      title: 'Couverture Tuiles',
      tagline: 'Tradition & Durabilit&eacute;.',
      image: 'https://images.pexels.com/photos/31406334/pexels-photo-31406334.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      title: 'Ardoise & Zinc',
      tagline: 'Finitions Nobles.',
      image: 'https://images.pexels.com/photos/34793389/pexels-photo-34793389.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      title: 'R&eacute;novation',
      tagline: 'Redonner Vie &agrave; Votre Toit.',
      image: 'https://images.pexels.com/photos/11467876/pexels-photo-11467876.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
  ]

  return (
    <section ref={sectionRef} className="bg-anthracite pt-16 pb-20 px-5 relative z-10">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <p className={`label-accent mb-8 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          CE QUE NOUS FAISONS
        </p>

        {/* Description - Klindworth style long text */}
        <p className={`text-cream/90 text-lg sm:text-xl leading-relaxed mb-16 font-serif transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          Toiture Martin propose une gamme compl&egrave;te de services de couverture,
          des solutions traditionnelles en tuiles aux installations modernes en zinc.
          Sp&eacute;cialis&eacute;s dans la r&eacute;novation et les r&eacute;parations d'urgence,
          notre &eacute;quipe certifi&eacute;e est d&eacute;di&eacute;e &agrave; un travail
          exceptionnel et &agrave; la satisfaction client, ce qui nous vaut le titre
          d'artisan couvreur de r&eacute;f&eacute;rence dans le Pas-de-Calais.
        </p>

        {/* Services Cards - Large vertical layout */}
        <div className="space-y-12">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`group cursor-pointer transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              {/* Large Image with premium reveal */}
              <div className="aspect-[4/3] mb-5 overflow-hidden relative">
                {/* Image with scale animation */}
                <div
                  className={`w-full h-full transition-all duration-1000 ease-out ${isVisible ? 'scale-100' : 'scale-110'}`}
                  style={{ transitionDelay: `${300 + index * 200}ms` }}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                {/* Reveal overlay */}
                <div
                  className={`absolute inset-0 bg-anthracite origin-bottom transition-transform duration-1000 ease-out ${isVisible ? 'scale-y-0' : 'scale-y-100'}`}
                  style={{ transitionDelay: `${250 + index * 200}ms` }}
                />
              </div>

              {/* Title with arrow */}
              <div className="flex items-center gap-2 mb-1">
                <h3
                  className="text-cream text-lg font-medium"
                  dangerouslySetInnerHTML={{ __html: service.title }}
                />
                <span className="text-accent group-hover:translate-x-2 transition-transform duration-300">&rarr;</span>
              </div>

              {/* Tagline */}
              <p
                className="text-cream/50 text-sm"
                dangerouslySetInnerHTML={{ __html: service.tagline }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Portfolio Section - Simple preview with CTA button
const PortfolioSection = () => {
  const [cardStates, setCardStates] = useState([])
  const [travailsState, setTravailsState] = useState({ opacity: 1, scale: 1 })
  const cardsRef = useRef([])
  const titleRef = useRef(null)

  const projects = [
    { name: 'DUPONT', location: 'Arras', image: 'https://images.pexels.com/photos/18397905/pexels-photo-18397905.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'LEFEBVRE', location: 'Lens', image: 'https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'MARTIN', location: 'Douai', image: 'https://images.pexels.com/photos/32682864/pexels-photo-32682864.jpeg?auto=compress&cs=tinysrgb&w=800' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      // Fade out and shrink TRAVAUX title based on first card position
      const firstCard = cardsRef.current[0]
      if (firstCard && titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect()
        const cardRect = firstCard.getBoundingClientRect()

        // Start fading when card approaches title
        const overlap = titleRect.bottom - cardRect.top
        if (overlap > 0) {
          const progress = Math.min(1, overlap / (titleRect.height * 0.5))
          setTravailsState({
            opacity: Math.max(0, 1 - progress),
            scale: Math.max(0.85, 1 - progress * 0.15)
          })
        } else {
          setTravailsState({ opacity: 1, scale: 1 })
        }
      }

      const newStates = cardsRef.current.map((card, index) => {
        if (!card) return { opacity: 1, scale: 1 }

        // Don't fade out the last card
        const isLastCard = index === cardsRef.current.length - 1
        if (isLastCard) return { opacity: 1, scale: 1 }

        const rect = card.getBoundingClientRect()
        const cardTop = rect.top
        const stickyTop = window.innerHeight * 0.12 // 12vh

        // When card is stuck and being pushed up by next card
        if (cardTop <= stickyTop) {
          const progress = Math.min(1, (stickyTop - cardTop) / (rect.height * 0.5))
          return {
            opacity: Math.max(0, 1 - progress),
            scale: Math.max(0.85, 1 - progress * 0.15)
          }
        }

        return { opacity: 1, scale: 1 }
      })

      setCardStates(newStates)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="realisations" className="bg-anthracite">
      {/* Title section - sticky */}
      <div
        ref={titleRef}
        className="sticky top-[10vh] py-8 flex items-center justify-center z-0"
        style={{
          opacity: travailsState.opacity,
          transform: `scale(${travailsState.scale})`,
          transition: 'opacity 0.1s, transform 0.1s'
        }}
      >
        <h2 className="font-serif text-[18vw] sm:text-[14vw] text-cream font-medium tracking-tight leading-none select-none">
          TRAVAUX
        </h2>
      </div>

      {/* Cards section - comes over TRAVAUX */}
      <div className="px-5 pb-8 relative">
        <div className="max-w-lg mx-auto">
          {projects.map((project, index) => {
            const state = cardStates[index] || { opacity: 1, scale: 1 }

            return (
              <div
                key={project.name}
                ref={el => cardsRef.current[index] = el}
                className="sticky top-[12vh] mb-6"
                style={{
                  zIndex: index + 10,
                  opacity: state.opacity,
                  transform: `scale(${state.scale})`,
                  transition: 'opacity 0.1s, transform 0.1s'
                }}
              >
                <div className="relative aspect-[4/3] overflow-hidden shadow-2xl group cursor-pointer">
                  <img src={project.image} alt={`Chantier ${project.name}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-b from-anthracite/30 via-transparent to-anthracite/50" />
                  <h3 className="absolute top-4 left-4 font-serif text-3xl sm:text-4xl text-cream font-medium drop-shadow-lg">
                    {project.name}
                  </h3>
                  <p className="absolute bottom-4 left-4 text-cream/80 text-sm">
                    {project.location}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* CTA Button */}
      <div className="px-5 py-12 text-center relative z-20">
        <Link to="/realisations" className="btn-outline-light inline-block">
          Voir tous nos chantiers
        </Link>
      </div>
    </section>
  )
}

// Réalisations Page - Full page with filters
const RealisationsPage = () => {
  const [cardStates, setCardStates] = useState([])
  const [travailsState, setTravailsState] = useState({ opacity: 1, scale: 1 })
  const [activeFilter, setActiveFilter] = useState('all')
  const cardsRef = useRef([])
  const titleRef = useRef(null)

  const filters = [
    { id: 'all', label: 'Tous' },
    { id: 'tuiles', label: 'Tuiles' },
    { id: 'ardoise', label: 'Ardoise' },
    { id: 'zinc', label: 'Zinc' },
    { id: 'renovation', label: 'R\u00e9novation' },
  ]

  const allProjects = [
    { name: 'DUPONT', location: 'Arras', category: 'tuiles', image: 'https://images.pexels.com/photos/18397905/pexels-photo-18397905.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'LEFEBVRE', location: 'Lens', category: 'ardoise', image: 'https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'MARTIN', location: 'Douai', category: 'zinc', image: 'https://images.pexels.com/photos/32682864/pexels-photo-32682864.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'DURAND', location: 'Beaurins', category: 'renovation', image: 'https://images.pexels.com/photos/3935333/pexels-photo-3935333.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'BERNARD', location: 'B\u00e9thune', category: 'tuiles', image: 'https://images.pexels.com/photos/32152511/pexels-photo-32152511.png?auto=compress&cs=tinysrgb&w=800' },
    { name: 'MOREAU', location: 'Li\u00e9vin', category: 'ardoise', image: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'PETIT', location: 'Henin', category: 'zinc', image: 'https://images.pexels.com/photos/23510958/pexels-photo-23510958.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'ROUX', location: 'Carvin', category: 'renovation', image: 'https://images.pexels.com/photos/1212053/pexels-photo-1212053.jpeg?auto=compress&cs=tinysrgb&w=800' },
  ]

  const filteredProjects = activeFilter === 'all'
    ? allProjects
    : allProjects.filter(p => p.category === activeFilter)

  useEffect(() => {
    // Reset refs when filter changes
    cardsRef.current = []
  }, [activeFilter])

  useEffect(() => {
    const handleScroll = () => {
      // Fade out and shrink TRAVAUX title based on first card position
      const firstCard = cardsRef.current[0]
      if (firstCard && titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect()
        const cardRect = firstCard.getBoundingClientRect()

        // Start fading when card approaches title
        const overlap = titleRect.bottom - cardRect.top
        if (overlap > 0) {
          const progress = Math.min(1, overlap / (titleRect.height * 0.5))
          setTravailsState({
            opacity: Math.max(0, 1 - progress),
            scale: Math.max(0.85, 1 - progress * 0.15)
          })
        } else {
          setTravailsState({ opacity: 1, scale: 1 })
        }
      }

      const newStates = cardsRef.current.map((card, index) => {
        if (!card) return { opacity: 1, scale: 1 }

        // Don't fade out the last card
        const isLastCard = index === cardsRef.current.length - 1
        if (isLastCard) return { opacity: 1, scale: 1 }

        const rect = card.getBoundingClientRect()
        const cardTop = rect.top
        const stickyTop = window.innerHeight * 0.12 // 12vh

        // When card is stuck and being pushed up by next card
        if (cardTop <= stickyTop) {
          const progress = Math.min(1, (stickyTop - cardTop) / (rect.height * 0.5))
          return {
            opacity: Math.max(0, 1 - progress),
            scale: Math.max(0.85, 1 - progress * 0.15)
          }
        }

        return { opacity: 1, scale: 1 }
      })

      setCardStates(newStates)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [filteredProjects.length])

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-cream">
      <Header />

      {/* Hero header */}
      <div className="pt-24 pb-8 px-5">
        <div className="max-w-lg mx-auto">
          <p className="label-accent mb-4">NOS R&Eacute;ALISATIONS</p>
          <h1 className="title-serif text-4xl sm:text-5xl mb-6">
            D&eacute;couvrez nos<br />
            <span className="text-accent">chantiers</span>
          </h1>
        </div>
      </div>

      {/* Filters */}
      <div className="pb-8 px-5">
        <div className="max-w-lg mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-accent text-cream'
                    : 'bg-dark/5 text-dark hover:bg-dark/10'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content with dark background */}
      <div className="bg-anthracite">
        {/* Title section - sticky */}
        <div
          ref={titleRef}
          className="sticky top-[10vh] py-8 flex items-center justify-center z-0"
          style={{
            opacity: travailsState.opacity,
            transform: `scale(${travailsState.scale})`,
            transition: 'opacity 0.1s, transform 0.1s'
          }}
        >
          <h2 className="font-serif text-[18vw] sm:text-[14vw] text-cream font-medium tracking-tight leading-none select-none">
            TRAVAUX
          </h2>
        </div>

        {/* Cards section - comes over TRAVAUX */}
        <div className="px-5 pb-16 relative">
          <div className="max-w-lg mx-auto">
            {filteredProjects.map((project, index) => {
              const state = cardStates[index] || { opacity: 1, scale: 1 }

              return (
                <div
                  key={`${project.name}-${activeFilter}`}
                  ref={el => cardsRef.current[index] = el}
                  className="sticky top-[12vh] mb-6"
                  style={{
                    zIndex: index + 10,
                    opacity: state.opacity,
                    transform: `scale(${state.scale})`,
                    transition: 'opacity 0.1s, transform 0.1s'
                  }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden shadow-2xl group cursor-pointer">
                    <img src={project.image} alt={`Chantier ${project.name}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-b from-anthracite/30 via-transparent to-anthracite/50" />
                    <h3 className="absolute top-4 left-4 font-serif text-3xl sm:text-4xl text-cream font-medium drop-shadow-lg">
                      {project.name}
                    </h3>
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                      <p className="text-cream/80 text-sm">
                        {project.location}
                      </p>
                      <span className="text-cream/60 text-xs uppercase tracking-wider">
                        {project.category}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Results count */}
        <div className="px-5 py-12 bg-anthracite text-center">
          <p className="text-cream/50 text-sm">
            {filteredProjects.length} r&eacute;alisation{filteredProjects.length > 1 ? 's' : ''}
            {activeFilter !== 'all' && ` en ${filters.find(f => f.id === activeFilter)?.label.toLowerCase()}`}
          </p>
        </div>
      </div>

      {/* CTA */}
      <CTASection />
      <Footer />
      <FloatingMenu />
    </div>
  )
}

// Services Carousel Section - Native horizontal scroll
const ServicesCarousel = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)
  const scrollRef = useRef(null)

  const services = [
    {
      title: 'R&eacute;novation compl&egrave;te',
      description: 'Transformation totale de votre toiture avec les mat&eacute;riaux les plus adapt&eacute;s &agrave; votre habitation.',
      image: 'https://images.pexels.com/photos/2893177/pexels-photo-2893177.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      title: 'R&eacute;parations',
      description: 'Intervention rapide pour fuites, tuiles cass&eacute;es, probl&egrave;mes d\'&eacute;tanch&eacute;it&eacute; et d&eacute;g&acirc;ts divers.',
      image: 'https://images.pexels.com/photos/9729882/pexels-photo-9729882.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      title: 'Urgence 24h',
      description: 'Service d\'urgence disponible 7j/7 pour s&eacute;curiser votre toiture apr&egrave;s intemp&eacute;ries.',
      image: 'https://images.pexels.com/photos/6357619/pexels-photo-6357619.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="bg-cream py-16">
      <div className="px-5 max-w-lg mx-auto">
        <p className={`label-accent mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          SERVICES
        </p>

        <h2 className={`font-serif text-3xl italic mb-10 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          Nous vous accompagnons<br />
          du d&eacute;but &agrave; la fin de<br />
          votre projet.
        </h2>
      </div>

      {/* Native horizontal scroll carousel */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory px-5 pb-4"
        style={{ scrollPaddingLeft: '20px' }}
      >
        {services.map((service, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[75%] snap-start"
          >
            <div className="aspect-[3/4] mb-4 overflow-hidden rounded-sm">
              <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <h3
                className="font-medium text-dark"
                dangerouslySetInnerHTML={{ __html: service.title }}
              />
              <span className="text-accent">&rarr;</span>
            </div>
            <p
              className="text-dark/60 text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: service.description }}
            />
          </div>
        ))}
        {/* Spacer at end */}
        <div className="flex-shrink-0 w-4" />
      </div>

      {/* CTA */}
      <div className="px-5 max-w-lg mx-auto">
        <div className="text-center mt-10">
          <a href="#contact" className="btn-outline inline-block">
            Parlons-en
          </a>
        </div>
      </div>
    </section>
  )
}

// Camionnette Section (Full Width Image)
const CamionnetteSection = () => (
  <section className="relative h-64 sm:h-80">
    <img src="https://images.pexels.com/photos/4391239/pexels-photo-4391239.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Camionnette entreprise" className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-gradient-to-b from-cream via-transparent to-anthracite opacity-60" />
  </section>
)

// Testimonials Section - Auto-scroll with native horizontal scroll
const TestimonialsSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)
  const scrollRef = useRef(null)
  const autoScrollRef = useRef(null)

  const testimonials = [
    {
      quote: "Travail impeccable, &eacute;quipe r&eacute;active et professionnelle. Je recommande &agrave; 100%.",
      location: 'Arras (62)',
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80'
    },
    {
      quote: "Intervention rapide apr&egrave;s la temp&ecirc;te. Toiture r&eacute;par&eacute;e en moins de 48h. Merci !",
      location: 'Lens (62)',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80'
    },
    {
      quote: "Devis clair, travaux propres, d&eacute;lais respect&eacute;s. Que demander de plus ?",
      location: 'Douai (59)',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'
    },
  ]

  const certifications = [
    'RGE',
    'QUALIBAT',
    'D&Eacute;CENNALE',
    'ARTISAN',
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Auto-scroll effect
  useEffect(() => {
    if (!isVisible || !scrollRef.current) return

    const container = scrollRef.current
    let currentIndex = 0
    let isAutoScrolling = false
    let userInteracted = false
    let restartTimeout = null

    const getCardWidth = () => {
      const card = container.querySelector('.testimonial-card')
      return card ? card.offsetWidth + 16 : 320 // card width + gap
    }

    const autoScroll = () => {
      if (userInteracted) return

      isAutoScrolling = true
      currentIndex = (currentIndex + 1) % testimonials.length
      const cardWidth = getCardWidth()

      container.scrollTo({
        left: currentIndex * cardWidth,
        behavior: 'smooth'
      })

      // Reset flag after scroll animation
      setTimeout(() => {
        isAutoScrolling = false
      }, 500)
    }

    // Start auto-scroll after 3 seconds delay
    let startDelayTimeout = setTimeout(() => {
      autoScrollRef.current = setInterval(autoScroll, 4000)
    }, 3000)

    // Only stop on touch interaction (not scroll events)
    const handleTouchStart = () => {
      userInteracted = true
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current)
        autoScrollRef.current = null
      }
      if (restartTimeout) {
        clearTimeout(restartTimeout)
      }
    }

    const handleTouchEnd = () => {
      // Restart auto-scroll after 6 seconds of no interaction
      restartTimeout = setTimeout(() => {
        userInteracted = false
        const cardWidth = getCardWidth()
        currentIndex = Math.round(container.scrollLeft / cardWidth)
        autoScrollRef.current = setInterval(autoScroll, 4000)
      }, 6000)
    }

    container.addEventListener('touchstart', handleTouchStart, { passive: true })
    container.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      if (startDelayTimeout) clearTimeout(startDelayTimeout)
      if (autoScrollRef.current) clearInterval(autoScrollRef.current)
      if (restartTimeout) clearTimeout(restartTimeout)
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isVisible, testimonials.length])

  return (
    <section ref={sectionRef} className="bg-anthracite py-16">
      <div className="px-5 max-w-lg mx-auto">
        <h2 className={`font-serif text-4xl sm:text-5xl text-cream text-center mb-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          Avis Clients
        </h2>
      </div>

      {/* Native horizontal scroll testimonials */}
      <div
        ref={scrollRef}
        className={`flex gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory px-5 pb-4 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="testimonial-card flex-shrink-0 w-[85%] snap-center"
          >
            {/* Image */}
            <div className="aspect-[4/3] mb-6 overflow-hidden rounded-sm">
              <img src={testimonial.image} alt={`Maison ${testimonial.location}`} className="w-full h-full object-cover" />
            </div>

            {/* Quote */}
            <blockquote
              className="text-cream/90 text-lg italic text-center mb-4 font-serif leading-relaxed"
              dangerouslySetInnerHTML={{ __html: `"${testimonial.quote}"` }}
            />

            {/* Location */}
            <p className="text-cream/50 text-sm text-center">
              {testimonial.location}
            </p>
          </div>
        ))}
        {/* Spacer at end */}
        <div className="flex-shrink-0 w-4" />
      </div>

      {/* Certifications */}
      <div className="px-5 max-w-lg mx-auto">
        <div className={`mt-12 flex gap-4 overflow-x-auto hide-scrollbar snap-x pb-2 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-20 h-20 rounded-lg bg-cream/10 flex items-center justify-center snap-start"
            >
              <span
                className="text-cream/60 text-xs font-medium text-center px-2"
                dangerouslySetInnerHTML={{ __html: cert }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// CTA Section
const CTASection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="contact" className="bg-cream py-20 px-5">
      <div className="max-w-lg mx-auto text-center">
        <p className={`label-accent mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          TRAVAILLONS ENSEMBLE
        </p>

        <a
          href="tel:0612345678"
          className={`block font-serif text-4xl sm:text-5xl md:text-6xl text-dark mb-8 hover:text-accent transition-colors duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          06 12 34 56 78
        </a>

        <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <a href="tel:0612345678" className="btn-outline inline-block">
            Appeler
          </a>
        </div>
      </div>
    </section>
  )
}

// Footer Section
const Footer = () => (
  <footer className="bg-cream border-t border-dark/10 pt-12 pb-32 px-5">
    <div className="max-w-lg mx-auto">
      {/* Contact Info */}
      <div className="mb-8">
        <a href="tel:0612345678" className="block text-lg font-medium text-dark mb-1">
          06 12 34 56 78
        </a>
        <a href="mailto:contact@toiture-martin.fr" className="text-dark/60 hover:text-accent transition-colors">
          contact@toiture-martin.fr
        </a>
      </div>

      {/* Zones d'intervention */}
      <div className="mb-8">
        <p className="label-accent mb-3">Zones d'intervention</p>
        <p className="text-dark/70">
          Beaurins &middot; Arras &middot; Lens &middot; Douai &middot; B&eacute;thune
        </p>
      </div>

      {/* Social Links */}
      <div className="flex gap-8 mb-8">
        <a href="#" className="group">
          <span className="text-dark font-medium">Facebook</span>
          <span className="text-accent ml-2 group-hover:translate-x-1 inline-block transition-transform">&rarr;</span>
          <span className="block text-dark/50 text-sm">Suivez-nous</span>
        </a>
        <a href="#" className="group">
          <span className="text-dark font-medium">Instagram</span>
          <span className="text-accent ml-2 group-hover:translate-x-1 inline-block transition-transform">&rarr;</span>
          <span className="block text-dark/50 text-sm">Nos chantiers</span>
        </a>
      </div>

      <hr className="border-dark/10 mb-8" />

      {/* Logo */}
      <div className="mb-8">
        <Logo size="large" />
      </div>

      {/* Address */}
      <div className="text-dark/50 text-sm mb-4">
        <p>12 rue des Artisans</p>
        <p>62217 Beaurins</p>
      </div>

      {/* Copyright */}
      <p className="text-dark/40 text-xs mb-2">
        &copy; 2025 Toiture Martin. Tous droits r&eacute;serv&eacute;s.
      </p>
      <p className="text-dark/30 text-xs">
        Made by <a href="https://devir.agency" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">devir.agency</a>
      </p>
    </div>
  </footer>
)

// Floating Burger Menu
const FloatingMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const menuItems = [
    { label: 'Accueil', to: '/', isLink: true },
    { label: 'Services', href: '/#services', isLink: false },
    { label: 'R\u00e9alisations', to: '/realisations', isLink: true },
    { label: 'Avis', href: '/#avis', isLink: false },
    { label: 'Contact', href: '/#contact', isLink: false },
  ]

  const handleClick = (item) => {
    setIsOpen(false)
    // If it's a hash link and we're on the homepage, scroll to element
    if (!item.isLink && item.href.startsWith('/#')) {
      const hash = item.href.replace('/', '')
      if (location.pathname === '/') {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        // Navigate to homepage then scroll
        window.location.href = item.href
      }
    }
  }

  return (
    <>
      {/* Burger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-full shadow-lg transition-all duration-300 ${
          isOpen ? 'bg-anthracite' : 'bg-cream'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="flex flex-col gap-1">
            <span className={`block w-5 h-0.5 transition-all duration-300 ${isOpen ? 'bg-cream rotate-45 translate-y-1.5' : 'bg-anthracite'}`} />
            <span className={`block w-5 h-0.5 transition-all duration-300 ${isOpen ? 'opacity-0' : 'bg-anthracite'}`} />
            <span className={`block w-5 h-0.5 transition-all duration-300 ${isOpen ? 'bg-cream -rotate-45 -translate-y-1.5' : 'bg-anthracite'}`} />
          </div>
          <span className={`text-sm font-medium transition-colors ${isOpen ? 'text-cream' : 'text-anthracite'}`}>
            Menu
          </span>
        </div>
      </button>

      {/* Fullscreen Menu */}
      <div
        className={`fixed inset-0 z-[90] bg-anthracite transition-all duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="h-full flex flex-col items-center justify-center gap-6">
          {menuItems.map((item, index) => (
            item.isLink ? (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={`font-serif text-4xl text-cream hover:text-accent transition-all duration-500 ${
                  isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: isOpen ? `${index * 100}ms` : '0ms' }}
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                onClick={() => handleClick(item)}
                className={`font-serif text-4xl text-cream hover:text-accent transition-all duration-500 ${
                  isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: isOpen ? `${index * 100}ms` : '0ms' }}
              >
                {item.label}
              </a>
            )
          ))}
        </nav>
      </div>
    </>
  )
}

// HomePage Component
const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <ServicesSection />
      <PortfolioSection />
      <ServicesCarousel />
      <CamionnetteSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
      <FloatingMenu />
    </div>
  )
}

// Main App Component with Router
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/realisations" element={<RealisationsPage />} />
      </Routes>
    </BrowserRouter>
  )
}
