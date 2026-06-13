import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  CheckCircle, Clock, Shield, Smartphone, CreditCard, Users,
  Star, ArrowRight, Mail, MapPin, IndianRupee, Coins,
  Menu, X, ChevronUp, ChevronDown
} from 'lucide-react'

const WEB3FORMS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY' // replace after signup at web3forms.com

const scrollToSection = (id: string) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

type FormData = {
  name: string
  mobile: string
  email: string
  city: string
  pincode: string
  address: string
  dob: string
  monthlySalary: string
  employmentType: string
}

type LenderFormData = {
  companyName: string
  contactPerson: string
  email: string
  phone: string
  lenderType: string
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [lenderFormOpen, setLenderFormOpen] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const [formData, setFormData] = useState<FormData>({
    name: '', mobile: '', email: '', city: '', pincode: '',
    address: '', dob: '', monthlySalary: '', employmentType: 'salaried'
  })

  const [lenderData, setLenderData] = useState<LenderFormData>({
    companyName: '', contactPerson: '', email: '', phone: '', lenderType: 'bank'
  })

  const handleScroll = useCallback(() => {
    const total = document.documentElement.scrollHeight - window.innerHeight
    setScrollProgress((window.scrollY / total) * 100)
    setShowBackToTop(window.scrollY > 500)
    const sections = ['home', 'features', 'how-it-works', 'testimonials', 'lenders', 'cta']
    for (const s of sections) {
      const el = document.getElementById(s)
      if (el) {
        const r = el.getBoundingClientRect()
        if (r.top <= 100 && r.bottom >= 100) { setActiveSection(s); break }
      }
    }
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    if (formOpen || lenderFormOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [formOpen, lenderFormOpen])

  const navClass = (s: string) =>
    `nav-link${activeSection === s ? ' nav-active' : ''}`

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleLenderInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setLenderData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const submitToWeb3Forms = async (data: Record<string, string>, subject: string) => {
    const payload = { access_key: WEB3FORMS_KEY, subject, ...data }
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload)
    })
    return res.json()
  }

  const handleBorrowerSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const result = await submitToWeb3Forms(
        { ...formData, form_type: 'Borrower Lead' },
        'New borrower application — Vyaaj'
      )
      if (result.success) {
        setFormOpen(false)
        setSuccessMsg('borrower')
        setFormData({ name: '', mobile: '', email: '', city: '', pincode: '', address: '', dob: '', monthlySalary: '', employmentType: 'salaried' })
      }
    } catch {
      alert('Something went wrong. Please try again.')
    }
    setSubmitting(false)
  }

  const handleLenderSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const result = await submitToWeb3Forms(
        { ...lenderData, form_type: 'Lender Partner Interest' },
        'New lender partner inquiry — Vyaaj'
      )
      if (result.success) {
        setLenderFormOpen(false)
        setSuccessMsg('lender')
        setLenderData({ companyName: '', contactPerson: '', email: '', phone: '', lenderType: 'bank' })
      }
    } catch {
      alert('Something went wrong. Please try again.')
    }
    setSubmitting(false)
  }

  const faqs = [
    { q: 'How quickly can I get my loan?', a: 'Once approved, funds are typically transferred to your bank account within 5 minutes. The approval process itself takes just 2–3 minutes.' },
    { q: 'What documents are needed?', a: 'PAN card, Aadhaar, latest salary slips, bank statements (last 3 months), and address proof. All documents can be uploaded digitally.' },
    { q: 'What is the maximum loan amount?', a: 'You can borrow up to ₹10,00,000 depending on your income, CIBIL score, and employment status.' },
    { q: 'Are there any processing fees?', a: 'A processing fee of 1–2% applies. All charges are clearly disclosed before you sign any agreement.' },
    { q: 'What are the interest rates?', a: 'Rates start from 8.5% p.a. and vary based on your CIBIL score, income, and loan tenure.' },
    { q: 'Is foreclosure allowed?', a: 'Yes, after 6 EMIs with a nominal foreclosure charge of 2–4% on outstanding principal, per RBI guidelines.' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      {/* Scroll progress */}
      <div id="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* Header */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        background: '#fff', zIndex: 100,
        borderBottom: '0.5px solid #e8e8e8',
        boxShadow: '0 1px 8px rgba(0,0,0,0.06)'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home') }}
            style={{ fontSize: 26, fontWeight: 700, color: '#3B6D11', textDecoration: 'none', letterSpacing: '-0.5px' }}>
            vyaaj<span style={{ color: '#97C459' }}>.</span>in
          </a>

          {/* Desktop nav */}
          <nav className="hide-mobile" style={{ display: 'flex', gap: '2rem' }}>
            {[['home','Home'],['features','Why Us'],['how-it-works','How It Works'],['testimonials','Reviews'],['lenders','For Lenders']].map(([id, label]) => (
              <button key={id} onClick={() => scrollToSection(id)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: activeSection === id ? '#3B6D11' : '#555', fontWeight: activeSection === id ? 600 : 400, transition: 'color 0.2s' }}>
                {label}
              </button>
            ))}
          </nav>

          <button className="btn-primary hide-mobile" onClick={() => setFormOpen(true)} style={{ fontSize: 14, padding: '9px 22px' }}>
            Apply now
          </button>

          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)}
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
            className="mobile-menu-btn" aria-label="Toggle menu">
            {menuOpen ? <X size={24} color="#3B6D11" /> : <Menu size={24} color="#3B6D11" />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ background: '#fff', borderTop: '0.5px solid #e8e8e8', padding: '0.5rem 0 1rem' }}>
            {[['home','Home'],['features','Why Us'],['how-it-works','How It Works'],['testimonials','Reviews'],['lenders','For Lenders']].map(([id, label]) => (
              <button key={id} onClick={() => { scrollToSection(id); setMenuOpen(false) }}
                style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 24px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 15, color: '#333' }}>
                {label}
              </button>
            ))}
            <div style={{ padding: '8px 24px' }}>
              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => { setFormOpen(true); setMenuOpen(false) }}>
                Apply now
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <div style={{ paddingTop: 64 }}>

        {/* HERO */}
        <section id="home" style={{ background: 'linear-gradient(135deg, #EAF3DE 0%, #fff 50%, #f0f9e8 100%)', minHeight: '90vh', display: 'flex', alignItems: 'center', padding: '4rem 0' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', alignItems: 'center' }}>
              <div>
                <span className="badge" style={{ marginBottom: '1.25rem', display: 'inline-flex' }}>✨ Trusted by 50,000+ borrowers</span>
                <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 800, color: '#1a1a1a', lineHeight: 1.15, marginBottom: '1rem' }}>
                  Compare loans.<br />
                  <span style={{ color: '#3B6D11' }}>Get the lowest rate.</span>
                </h1>
                <p style={{ fontSize: 18, color: '#555', lineHeight: 1.7, marginBottom: '2rem', maxWidth: 440 }}>
                  Matched to 30+ RBI-registered lenders in minutes. Rates from <strong>8.5% p.a.</strong> Free, secure & 100% digital.
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                  <button className="btn-primary" onClick={() => setFormOpen(true)} style={{ fontSize: 16, padding: '13px 30px' }}>
                    Compare loan offers <ArrowRight size={18} />
                  </button>
                </div>
                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                  {[['₹100Cr+', 'Loans disbursed'], ['50,000+', 'Happy borrowers'], ['30+', 'Lender partners']].map(([n, l]) => (
                    <div key={n}>
                      <div style={{ fontSize: 22, fontWeight: 700, color: '#3B6D11' }}>{n}</div>
                      <div style={{ fontSize: 12, color: '#777' }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hero visual */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ position: 'relative', width: 300, height: 300 }}>
                  <div style={{ width: 280, height: 280, background: 'linear-gradient(135deg, #C0DD97, #EAF3DE)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px auto' }}>
                    <div style={{ width: 140, height: 140, background: '#3B6D11', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <IndianRupee size={72} color="#fff" />
                    </div>
                  </div>
                  <div style={{ position: 'absolute', top: 0, right: 10, width: 56, height: 56, background: '#97C459', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'bounce 2s infinite' }}>
                    <Coins size={28} color="#fff" />
                  </div>
                  <div style={{ position: 'absolute', bottom: 20, left: 0, background: '#fff', border: '1px solid #C0DD97', borderRadius: 14, padding: '10px 14px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 36, height: 36, background: '#EAF3DE', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CheckCircle size={18} color="#3B6D11" />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 13, color: '#1a1a1a' }}>Loan approved!</div>
                        <div style={{ fontSize: 11, color: '#777' }}>₹50,000 transferred</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust badges */}
        <div style={{ background: '#3B6D11', padding: '1rem 0' }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', flexWrap: 'wrap' }}>
            {[
              [<Shield size={16} />, 'No CIBIL score impact'],
              [<Clock size={16} />, 'Results in 2 minutes'],
              [<CheckCircle size={16} />, 'Zero hidden charges'],
              [<Users size={16} />, '30+ RBI-registered lenders'],
            ].map(([icon, text], i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#C0DD97', fontSize: 13, fontWeight: 500 }}>
                {icon as React.ReactNode} {text as string}
              </div>
            ))}
          </div>
        </div>

        {/* FEATURES */}
        <section id="features" style={{ padding: '5rem 0', background: '#fafafa' }}>
          <div className="container">
            <div className="text-center" style={{ marginBottom: '3rem' }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: '#3B6D11', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 }}>Why Vyaaj</p>
              <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.25rem)', fontWeight: 700, color: '#1a1a1a', marginBottom: 12 }}>The smarter way to get a personal loan</h2>
              <p style={{ color: '#666', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>We compare rates from 30+ lenders so you get the best deal without the legwork.</p>
            </div>
            <div className="grid-3">
              {[
                { icon: <Shield size={28} color="#3B6D11" />, title: 'Lowest rates guaranteed', desc: 'AI matching across 30+ lenders to find you the best rate starting from 8.5% p.a.' },
                { icon: <CreditCard size={28} color="#3B6D11" />, title: 'Flexible EMIs', desc: 'Choose repayment tenure from 3 to 60 months that fits your budget perfectly.' },
                { icon: <Clock size={28} color="#3B6D11" />, title: 'Instant approval', desc: 'Get approved within minutes with our AI-powered assessment system.' },
                { icon: <Smartphone size={28} color="#3B6D11" />, title: '100% digital', desc: 'No branch visits, no paperwork. Apply, get approved, receive funds entirely online.' },
                { icon: <Users size={28} color="#3B6D11" />, title: '30+ trusted lenders', desc: 'Banks, NBFCs & fintech lenders — all RBI-registered and thoroughly vetted.' },
                { icon: <CheckCircle size={28} color="#3B6D11" />, title: 'Zero hidden charges', desc: 'Complete transparency. Know exactly what you pay before you sign anything.' },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="card" style={{ textAlign: 'center' }}>
                  <div style={{ width: 56, height: 56, background: '#EAF3DE', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>{icon}</div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: '#1a1a1a' }}>{title}</h3>
                  <p style={{ fontSize: 14, color: '#666', lineHeight: 1.6 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" style={{ padding: '5rem 0', background: '#fff' }}>
          <div className="container">
            <div className="text-center" style={{ marginBottom: '3rem' }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: '#3B6D11', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 }}>Process</p>
              <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.25rem)', fontWeight: 700, color: '#1a1a1a', marginBottom: 12 }}>Get your loan in 4 easy steps</h2>
              <p style={{ color: '#666', fontSize: 16 }}>Fully digital from application to disbursal.</p>
            </div>
            <div className="grid-4">
              {[
                { n: 1, icon: <Smartphone size={28} color="#3B6D11" />, title: 'Apply online', desc: 'Fill our 2-minute form with basic details' },
                { n: 2, icon: <CheckCircle size={28} color="#3B6D11" />, title: 'AI matches you', desc: 'We compare offers from 30+ lenders instantly' },
                { n: 3, icon: <Shield size={28} color="#3B6D11" />, title: 'Get approval', desc: 'Receive offer with rates, EMI & terms' },
                { n: 4, icon: <CreditCard size={28} color="#3B6D11" />, title: 'Receive funds', desc: 'Money transferred to your bank in 5 minutes' },
              ].map(({ n, icon, title, desc }) => (
                <div key={n} style={{ textAlign: 'center' }}>
                  <div style={{ width: 52, height: 52, background: '#3B6D11', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#fff', fontSize: 20, fontWeight: 700 }}>{n}</div>
                  <div style={{ width: 52, height: 52, background: '#EAF3DE', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>{icon}</div>
                  <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 6, color: '#1a1a1a' }}>{title}</h3>
                  <p style={{ fontSize: 13, color: '#666', lineHeight: 1.6 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials" style={{ padding: '5rem 0', background: '#EAF3DE' }}>
          <div className="container">
            <div className="text-center" style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.25rem)', fontWeight: 700, color: '#1a1a1a', marginBottom: 12 }}>What our customers say</h2>
              <p style={{ color: '#555', fontSize: 16 }}>Join thousands of satisfied borrowers</p>
            </div>
            <div className="grid-3">
              {[
                { name: 'Arun Patel', role: 'IT Professional', text: 'Got a personal loan for my sister\'s wedding within minutes! The entire process was seamless and hassle-free.' },
                { name: 'Meera Reddy', role: 'Business Owner', text: 'Best loan comparison service ever! Quick approval and minimal documentation. Got funds for my business expansion quickly.' },
                { name: 'Vikram Malhotra', role: 'Software Engineer', text: 'The flexible EMI options are great. Helped me manage my home renovation expenses perfectly!' },
              ].map(({ name, role, text }) => (
                <div key={name} className="card">
                  <div style={{ display: 'flex', gap: 2, marginBottom: 12 }}>
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#f5b800" color="#f5b800" />)}
                  </div>
                  <p style={{ fontSize: 14, color: '#444', lineHeight: 1.7, marginBottom: '1rem', fontStyle: 'italic' }}>"{text}"</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 40, height: 40, background: '#3B6D11', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 15 }}>
                      {name[0]}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14, color: '#1a1a1a' }}>{name}</div>
                      <div style={{ fontSize: 12, color: '#777' }}>{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ELIGIBILITY */}
        <section style={{ padding: '5rem 0', background: '#fff' }}>
          <div className="container">
            <div className="text-center" style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.25rem)', fontWeight: 700, color: '#1a1a1a', marginBottom: 12 }}>Eligibility criteria</h2>
              <p style={{ color: '#666', fontSize: 16 }}>Simple requirements to get started</p>
            </div>
            <div className="grid-2" style={{ maxWidth: 800, margin: '0 auto' }}>
              <div className="card" style={{ border: '1.5px solid #C0DD97' }}>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: '1.25rem', color: '#1a1a1a' }}>Basic requirements</h3>
                {['Age: 21–65 years', 'Valid PAN Card & Aadhaar', 'Active bank account with net banking', 'Indian resident'].map(item => (
                  <div key={item} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12 }}>
                    <CheckCircle size={18} color="#3B6D11" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: 14, color: '#444' }}>{item}</span>
                  </div>
                ))}
              </div>
              <div className="card" style={{ border: '1.5px solid #C0DD97' }}>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: '1.25rem', color: '#1a1a1a' }}>Income requirements</h3>
                {['All credit score types accepted', 'Salaried & self-employed both eligible', 'Valid Indian mobile number', 'Minimum monthly income: ₹10,000'].map(item => (
                  <div key={item} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12 }}>
                    <CheckCircle size={18} color="#3B6D11" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: 14, color: '#444' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: '5rem 0', background: '#fafafa' }}>
          <div className="container">
            <div className="text-center" style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.25rem)', fontWeight: 700, color: '#1a1a1a', marginBottom: 12 }}>Frequently asked questions</h2>
            </div>
            <div style={{ maxWidth: 700, margin: '0 auto' }}>
              {faqs.map((faq, i) => (
                <div key={i} style={{ borderBottom: '0.5px solid #e0e0e0', paddingBottom: 0 }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.1rem 0', fontSize: 15, fontWeight: 600, color: '#1a1a1a' }}>
                    {faq.q}
                    {openFaq === i ? <ChevronDown size={18} color="#3B6D11" /> : <ChevronDown size={18} color="#999" />}
                  </button>
                  {openFaq === i && (
                    <p style={{ fontSize: 14, color: '#555', lineHeight: 1.7, paddingBottom: '1rem' }}>{faq.a}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOR LENDERS */}
        <section id="lenders" style={{ padding: '5rem 0', background: '#fff' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: '#3B6D11', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 }}>For lenders & NBFCs</p>
                <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.1rem)', fontWeight: 700, color: '#1a1a1a', marginBottom: '1rem', lineHeight: 1.3 }}>Grow your loan book with pre-qualified borrowers</h2>
                <p style={{ fontSize: 15, color: '#555', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                  Partner with Vyaaj to access a steady pipeline of credit-verified borrowers — reducing acquisition costs while increasing approval rates.
                </p>
                {[
                  'Pre-qualified borrowers with verified credit profiles',
                  'AI-powered risk assessment & CIBIL scoring',
                  'Up to 60% lower customer acquisition cost',
                  'Real-time analytics dashboard',
                  'Dedicated onboarding & partnership support',
                ].map(item => (
                  <div key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10 }}>
                    <CheckCircle size={17} color="#3B6D11" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: 14, color: '#444' }}>{item}</span>
                  </div>
                ))}
                <button className="btn-primary" style={{ marginTop: '1.5rem' }} onClick={() => setLenderFormOpen(true)}>
                  Register as a lending partner <ArrowRight size={16} />
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {[['10M+', 'Monthly loan leads'], ['68%', 'Conversion rate'], ['30+', 'Active partners'], ['₹100Cr+', 'Disbursed monthly']].map(([n, l]) => (
                  <div key={l} style={{ background: '#EAF3DE', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
                    <div style={{ fontSize: 28, fontWeight: 800, color: '#3B6D11' }}>{n}</div>
                    <div style={{ fontSize: 12, color: '#555', marginTop: 4 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA BANNER */}
        <section id="cta" style={{ padding: '5rem 0', background: '#3B6D11' }}>
          <div className="container text-center">
            <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.25rem)', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>Ready to get your best loan offer?</h2>
            <p style={{ fontSize: 16, color: '#C0DD97', marginBottom: '2rem' }}>Join thousands who compared & saved on interest. Free, instant, no CIBIL impact.</p>
            <button onClick={() => setFormOpen(true)}
              style={{ background: '#fff', color: '#3B6D11', border: 'none', borderRadius: 10, padding: '14px 36px', fontSize: 16, fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              Apply now — it's free <ArrowRight size={18} />
            </button>
            <p style={{ fontSize: 13, color: '#97C459', marginTop: '1rem' }}>No credit score impact · 100% secure · 2-minute application</p>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ background: '#1a1a1a', color: '#ccc', padding: '3rem 0 1.5rem' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
              <div>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#97C459', marginBottom: 10 }}>vyaaj.in</div>
                <p style={{ fontSize: 13, color: '#888', lineHeight: 1.7 }}>Fast, reliable, and secure loan comparison for all your financial needs.</p>
              </div>
              <div>
                <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: 12, fontSize: 14 }}>Quick links</h4>
                {[['home','Home'],['features','Why Us'],['how-it-works','How It Works'],['lenders','For Lenders']].map(([id, label]) => (
                  <button key={id} onClick={() => scrollToSection(id)}
                    style={{ display: 'block', background: 'none', border: 'none', cursor: 'pointer', color: '#888', fontSize: 13, padding: '3px 0', textAlign: 'left' }}>
                    {label}
                  </button>
                ))}
              </div>
              <div>
                <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: 12, fontSize: 14 }}>Legal</h4>
                <Link to="/privacy-policy" style={{ display: 'block', color: '#888', fontSize: 13, textDecoration: 'none', padding: '3px 0' }}>Privacy policy</Link>
                <Link to="/terms" style={{ display: 'block', color: '#888', fontSize: 13, textDecoration: 'none', padding: '3px 0' }}>Terms & conditions</Link>
              </div>
              <div>
                <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: 12, fontSize: 14 }}>Contact</h4>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                  <Mail size={14} color="#888" />
                  <span style={{ fontSize: 13, color: '#888' }}>support@vyaaj.in</span>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <MapPin size={14} color="#888" style={{ marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: '#888' }}>India</span>
                </div>
              </div>
            </div>
            <div style={{ borderTop: '0.5px solid #333', paddingTop: '1.5rem' }}>
              <p style={{ fontSize: 12, color: '#555', textAlign: 'center', lineHeight: 1.7 }}>
                © 2026 Vyaaj.in · Powered by Leverse Labs Private Limited<br />
                Vyaaj is a loan marketplace and does not lend directly. All loans subject to lender approval. All partner lenders are RBI-registered.
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* Back to top */}
      {showBackToTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ position: 'fixed', bottom: 24, right: 24, width: 44, height: 44, background: '#3B6D11', color: '#fff', border: 'none', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.2)', zIndex: 200 }}
          aria-label="Back to top">
          <ChevronUp size={22} />
        </button>
      )}

      {/* BORROWER FORM MODAL */}
      {formOpen && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setFormOpen(false) }}>
          <div className="modal">
            <button className="modal-close" onClick={() => setFormOpen(false)} aria-label="Close"><X size={20} /></button>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1a1a1a', marginBottom: 4, textAlign: 'center' }}>Quick loan application</h2>
            <p style={{ fontSize: 14, color: '#777', textAlign: 'center', marginBottom: '1.5rem' }}>Get up to ₹10,00,000 instantly · No CIBIL impact</p>
            <form onSubmit={handleBorrowerSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div><label>Full name *</label><input name="name" placeholder="Your full name" value={formData.name} onChange={handleInput} required /></div>
                <div><label>Mobile number *</label><input name="mobile" type="tel" pattern="[0-9]{10}" placeholder="10-digit number" value={formData.mobile} onChange={handleInput} required /></div>
                <div><label>Email address *</label><input name="email" type="email" placeholder="your@email.com" value={formData.email} onChange={handleInput} required /></div>
                <div><label>Date of birth *</label><input name="dob" type="date" value={formData.dob} onChange={handleInput} required max={new Date().toISOString().split('T')[0]} /></div>
                <div><label>City *</label><input name="city" placeholder="Your city" value={formData.city} onChange={handleInput} required /></div>
                <div><label>PIN code *</label><input name="pincode" placeholder="6-digit PIN" pattern="[0-9]{6}" value={formData.pincode} onChange={handleInput} required /></div>
                <div style={{ gridColumn: '1 / -1' }}><label>Address *</label><input name="address" placeholder="Your address" value={formData.address} onChange={handleInput} required /></div>
                <div><label>Monthly income (₹) *</label><input name="monthlySalary" type="number" min="10000" placeholder="e.g. 35000" value={formData.monthlySalary} onChange={handleInput} required /></div>
                <div>
                  <label>Employment type *</label>
                  <select name="employmentType" value={formData.employmentType} onChange={handleInput}>
                    <option value="salaried">Salaried</option>
                    <option value="self-employed">Self-employed</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
                <button type="button" className="btn-outline" onClick={() => setFormOpen(false)}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={submitting}>
                  {submitting ? 'Submitting…' : 'Get instant loan →'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* LENDER FORM MODAL */}
      {lenderFormOpen && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setLenderFormOpen(false) }}>
          <div className="modal" style={{ maxWidth: 480 }}>
            <button className="modal-close" onClick={() => setLenderFormOpen(false)} aria-label="Close"><X size={20} /></button>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1a1a1a', marginBottom: 4, textAlign: 'center' }}>Partner with Vyaaj</h2>
            <p style={{ fontSize: 14, color: '#777', textAlign: 'center', marginBottom: '1.5rem' }}>Tell us about your organisation and we'll be in touch.</p>
            <form onSubmit={handleLenderSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div><label>Company / organisation name *</label><input name="companyName" placeholder="e.g. ABC Finance Ltd" value={lenderData.companyName} onChange={handleLenderInput} required /></div>
                <div><label>Contact person *</label><input name="contactPerson" placeholder="Full name" value={lenderData.contactPerson} onChange={handleLenderInput} required /></div>
                <div><label>Business email *</label><input name="email" type="email" placeholder="name@company.com" value={lenderData.email} onChange={handleLenderInput} required /></div>
                <div><label>Phone number *</label><input name="phone" type="tel" pattern="[0-9]{10}" placeholder="10-digit number" value={lenderData.phone} onChange={handleLenderInput} required /></div>
                <div>
                  <label>Organisation type *</label>
                  <select name="lenderType" value={lenderData.lenderType} onChange={handleLenderInput}>
                    <option value="bank">Bank</option>
                    <option value="nbfc">NBFC</option>
                    <option value="fintech">Fintech lender</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
                <button type="button" className="btn-outline" onClick={() => setLenderFormOpen(false)}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={submitting}>
                  {submitting ? 'Submitting…' : 'Register interest →'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SUCCESS MODAL */}
      {successMsg && (
        <div className="modal-overlay">
          <div className="modal" style={{ maxWidth: 420, textAlign: 'center' }}>
            <div style={{ width: 64, height: 64, background: '#EAF3DE', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
              <CheckCircle size={32} color="#3B6D11" />
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1a1a1a', marginBottom: 8 }}>
              {successMsg === 'borrower' ? 'Application received!' : 'Interest registered!'}
            </h2>
            <p style={{ fontSize: 15, color: '#555', marginBottom: '0.5rem' }}>
              {successMsg === 'borrower'
                ? 'Thank you for applying with Vyaaj. Our partner lenders will contact you shortly.'
                : 'Thank you for your interest. Our partnerships team will reach out within 2 business days.'}
            </p>
            <div style={{ background: '#EAF3DE', borderRadius: 10, padding: '10px 16px', marginBottom: '1.5rem', fontSize: 13, color: '#3B6D11' }}>
              You'll hear from us on the contact details you provided.
            </div>
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setSuccessMsg('')}>
              Got it, thanks!
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @media(max-width:640px){
          .mobile-menu-btn{display:flex!important}
          .hide-mobile{display:none!important}
        }
        nav.hide-mobile{display:flex}
        @media(max-width:640px){nav.hide-mobile{display:none}}
      `}</style>
    </div>
  )
}
