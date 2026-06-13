import { Link } from 'react-router-dom'

export default function PrivacyPolicy() {
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '5rem 1.5rem 3rem', fontFamily: 'sans-serif' }}>
      <Link to="/" style={{ color: '#3B6D11', fontSize: 14, textDecoration: 'none', display: 'inline-block', marginBottom: '2rem' }}>← Back to home</Link>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: '1rem' }}>Privacy Policy</h1>
      <p style={{ color: '#555', fontSize: 14, marginBottom: '2rem' }}>Last updated: June 2026</p>
      <p style={{ lineHeight: 1.8, color: '#444', marginBottom: '1rem' }}>
        Vyaaj.in (operated by Leverse Labs Private Limited) collects personal information solely for the purpose of connecting you with RBI-registered lending partners. We do not sell your data to third parties outside of our lending network.
      </p>
      <p style={{ lineHeight: 1.8, color: '#444', marginBottom: '1rem' }}>
        Information collected includes name, contact details, income, and employment information. This is shared with lenders only to process your loan inquiry. All data is encrypted in transit and at rest.
      </p>
      <p style={{ lineHeight: 1.8, color: '#444' }}>
        For questions, email us at <a href="mailto:support@vyaaj.in" style={{ color: '#3B6D11' }}>support@vyaaj.in</a>.
      </p>
    </div>
  )
}
