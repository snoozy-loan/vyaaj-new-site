import { Link } from 'react-router-dom'

export default function Terms() {
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '5rem 1.5rem 3rem', fontFamily: 'sans-serif' }}>
      <Link to="/" style={{ color: '#3B6D11', fontSize: 14, textDecoration: 'none', display: 'inline-block', marginBottom: '2rem' }}>← Back to home</Link>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: '1rem' }}>Terms & Conditions</h1>
      <p style={{ color: '#555', fontSize: 14, marginBottom: '2rem' }}>Last updated: June 2026</p>
      <p style={{ lineHeight: 1.8, color: '#444', marginBottom: '1rem' }}>
        Vyaaj.in is a digital lending marketplace operated by Leverse Labs Private Limited. We are not a lender and do not provide loans directly. We facilitate connections between borrowers and RBI-registered lending institutions.
      </p>
      <p style={{ lineHeight: 1.8, color: '#444', marginBottom: '1rem' }}>
        All loans are subject to approval by the respective lending institution. Interest rates, fees, and terms are determined by each lender and disclosed before signing. Vyaaj does not guarantee loan approval or specific rates.
      </p>
      <p style={{ lineHeight: 1.8, color: '#444' }}>
        For grievances, contact <a href="mailto:support@vyaaj.in" style={{ color: '#3B6D11' }}>support@vyaaj.in</a>.
      </p>
    </div>
  )
}
