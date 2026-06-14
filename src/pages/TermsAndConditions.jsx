import PageHero from '../components/shared/PageHero';

const Section = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="font-heading font-bold text-xl mb-4" style={{ color: 'var(--midnight-navy)' }}>{title}</h2>
    <div className="font-body text-base leading-relaxed space-y-3" style={{ color: 'var(--slate-text)' }}>{children}</div>
  </div>
);

export default function TermsAndConditions() {
  return (
    <div>
      <PageHero
        label="Legal"
        title="Terms & Conditions"
        subtitle="The terms governing your use of MediHub's website and services."
      />
      <section className="py-16 bg-white">
        <div className="section-container max-w-4xl">
          <p className="text-sm font-body mb-10 pb-6 border-b" style={{ color: 'var(--slate-text)', borderColor: 'var(--light-border)' }}>
            <strong>Last Updated: 1 June 2026</strong> &nbsp;|&nbsp; MediHub Healthcare Solutions (Pty) Ltd, Reg. No. 1989/012345/07
          </p>

          <Section title="1. Acceptance of Terms">
            <p>By accessing or using the MediHub website (www.medihub.co.za), Client Portal, or any MediHub service, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree, please discontinue use immediately.</p>
            <p>These Terms apply to all visitors, clients, healthcare professionals, procurement officers, and other users of our platform. MediHub reserves the right to update these Terms at any time with immediate effect upon publication.</p>
          </Section>

          <Section title="2. Company Information">
            <p>MediHub Healthcare Solutions (Pty) Ltd is a company registered under the laws of the Republic of South Africa, with registration number 1989/012345/07, having its registered office at 123 Healthcare Drive, Sandton, Johannesburg, 2196.</p>
            <p>MediHub is a SAHPRA-registered medical device distributor and operates in compliance with all applicable South African healthcare legislation, including the Medicines and Related Substances Act, 101 of 1965.</p>
          </Section>

          <Section title="3. Use of the Website">
            <p>You agree to use this website only for lawful purposes and in a manner consistent with all applicable laws. You must not:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Use the website in any way that breaches any applicable local or international law or regulation.</li>
              <li>Transmit any unsolicited or unauthorised advertising or promotional material.</li>
              <li>Knowingly transmit any data, viruses, or other malicious software.</li>
              <li>Attempt to gain unauthorised access to any part of the website or its servers.</li>
              <li>Reproduce, republish, or commercially exploit any content without prior written consent.</li>
              <li>Use the website in a manner that could damage, disable, or impair its functionality.</li>
            </ul>
          </Section>

          <Section title="4. Product Information & Accuracy">
            <p>MediHub makes every effort to ensure that product specifications, descriptions, certifications, and pricing information displayed on this website are accurate and up to date. However:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Product specifications are subject to change by manufacturers without notice.</li>
              <li>Images are for illustrative purposes only and may not represent the final product configuration.</li>
              <li>Price indications on the website are indicative only and are not binding quotations. All formal pricing is subject to a written quotation from MediHub.</li>
              <li>Product availability is subject to stock, import clearance, and SAHPRA registration status.</li>
            </ul>
          </Section>

          <Section title="5. Quote Requests & Procurement">
            <p>Submission of a quote request form does not constitute a binding order or contract. A binding contract is only formed upon MediHub's written acceptance of a formal purchase order. All supply agreements are subject to:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>MediHub's standard terms of sale, which will be provided with any formal quotation.</li>
              <li>Applicable South African public procurement regulations where relevant (PFMA, MFMA, PPPFA).</li>
              <li>Import and customs regulations applicable to international deliveries.</li>
              <li>SAHPRA registration and compliance requirements for the relevant medical devices.</li>
            </ul>
          </Section>

          <Section title="6. Client Portal">
            <p>Access to the MediHub Client Portal is provided to registered clients only. Users are responsible for maintaining the confidentiality of their login credentials. You agree to notify MediHub immediately at <a href="mailto:support@medihub.co.za" style={{ color: 'var(--medihub-blue)' }}>support@medihub.co.za</a> if you suspect unauthorised access to your account.</p>
            <p>MediHub reserves the right to suspend or terminate portal access at its discretion, including in cases of breach of these Terms.</p>
          </Section>

          <Section title="7. Intellectual Property">
            <p>All content on this website — including text, graphics, logos, product images, technical documents, and software — is the intellectual property of MediHub Healthcare Solutions (Pty) Ltd or its licensors and is protected by South African and international copyright law.</p>
            <p>You may download and print content for personal, non-commercial reference only. Any other use, reproduction, or distribution requires prior written permission from MediHub.</p>
          </Section>

          <Section title="8. Disclaimer of Warranties">
            <p>This website and its content are provided on an "as is" basis. To the fullest extent permitted by law, MediHub disclaims all warranties, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement.</p>
            <p>MediHub does not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components. Use of this website is at your own risk.</p>
          </Section>

          <Section title="9. Limitation of Liability">
            <p>To the maximum extent permitted by South African law, MediHub shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of this website or reliance on its content.</p>
            <p>In no event shall MediHub's total liability to you exceed the amount paid by you to MediHub in the three months preceding the event giving rise to the claim.</p>
          </Section>

          <Section title="10. Third-Party Links">
            <p>This website may contain links to third-party websites, including manufacturer and partner sites. These links are provided for convenience only. MediHub does not endorse, control, or accept responsibility for the content, privacy practices, or availability of any third-party website.</p>
          </Section>

          <Section title="11. Governing Law & Jurisdiction">
            <p>These Terms are governed by the laws of the Republic of South Africa. Any disputes arising from or related to these Terms shall be subject to the exclusive jurisdiction of the South Gauteng High Court, Johannesburg, unless the parties agree otherwise in writing.</p>
          </Section>

          <Section title="12. Contact Us">
            <p>For any queries regarding these Terms, please contact:<br />
            <strong>MediHub Healthcare Solutions (Pty) Ltd</strong><br />
            123 Healthcare Drive, Sandton, Johannesburg, 2196<br />
            <a href="tel:+27112345678" style={{ color: 'var(--medihub-blue)' }}>+27 11 234 5678</a> &nbsp;|&nbsp;
            <a href="mailto:legal@medihub.co.za" style={{ color: 'var(--medihub-blue)' }}>legal@medihub.co.za</a></p>
          </Section>
        </div>
      </section>
    </div>
  );
}