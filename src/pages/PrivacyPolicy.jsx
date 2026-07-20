import PageHero from '../components/shared/PageHero';

const Section = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="font-heading font-bold text-xl mb-4" style={{ color: 'var(--midnight-navy)' }}>{title}</h2>
    <div className="font-body text-base leading-relaxed space-y-3" style={{ color: 'var(--slate-text)' }}>{children}</div>
  </div>
);

export default function PrivacyPolicy() {
  return (
    <div>
      <PageHero
        label="Legal"
        title="Privacy Policy"
        subtitle="How MedTech Special Device collects, uses, and protects your personal information."
      />
      <section className="py-16 bg-white">
        <div className="section-container max-w-4xl">
          <p className="text-sm font-body mb-10 pb-6 border-b" style={{ color: 'var(--slate-text)', borderColor: 'var(--light-border)' }}>
            <strong>Last Updated: 1 June 2026</strong> &nbsp;|&nbsp; MedTech Special Device (Pty) Ltd, Reg. No. 1989/012345/07
          </p>

          <Section title="1. Introduction">
            <p>MedTech Special Device (Pty) Ltd ("MedTech Special Device", "we", "our", or "us") is committed to protecting your privacy and ensuring the responsible processing of your personal information in accordance with the Protection of Personal Information Act, 4 of 2013 ("POPIA"), and all applicable South African data protection legislation.</p>
            <p>This Privacy Policy applies to all personal information collected via our website (www.medtechspecialdevice.com), our Client Portal, quote request forms, event registrations, and any other interaction with MedTech Special Device. By using our services, you acknowledge that you have read and understood this policy.</p>
          </Section>

          <Section title="2. Information We Collect">
            <p>We collect personal information only to the extent necessary for legitimate business purposes. The categories of information we may collect include:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>Identity Data:</strong> Full name, job title, professional registration number.</li>
              <li><strong>Contact Data:</strong> Email address, telephone number, physical and postal address.</li>
              <li><strong>Organisational Data:</strong> Employer / institution name, organisation type, province and country.</li>
              <li><strong>Transaction Data:</strong> Details of products and services you have enquired about or procured.</li>
              <li><strong>Technical Data:</strong> IP address, browser type, device identifiers, cookies and usage data from our website.</li>
              <li><strong>Communication Data:</strong> Records of correspondence with MedTech Special Device, including emails, support tickets, and enquiry forms.</li>
              <li><strong>Marketing Preferences:</strong> Your preferences for receiving marketing and communications from MedTech Special Device.</li>
            </ul>
          </Section>

          <Section title="3. How We Use Your Information">
            <p>We process your personal information for the following purposes:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>To respond to enquiries, quote requests, and service requests.</li>
              <li>To manage client relationships and deliver contracted services.</li>
              <li>To process and manage service tickets via the Client Portal.</li>
              <li>To send relevant product information, event invitations, and healthcare insights (with your consent, or where we have a legitimate interest).</li>
              <li>To comply with legal and regulatory obligations, including South African healthcare procurement legislation.</li>
              <li>To improve our website, products, and services through analytics.</li>
              <li>To prevent fraud and ensure the security of our systems.</li>
            </ul>
          </Section>

          <Section title="4. Legal Basis for Processing">
            <p>We process your personal information on one or more of the following lawful grounds:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>Consent:</strong> Where you have provided explicit consent (e.g., newsletter subscription).</li>
              <li><strong>Contract:</strong> Where processing is necessary to perform a contract with you or your organisation.</li>
              <li><strong>Legal obligation:</strong> Where we are required by law to process your information.</li>
              <li><strong>Legitimate interest:</strong> Where we have a legitimate business interest that does not override your rights.</li>
            </ul>
          </Section>

          <Section title="5. Sharing of Personal Information">
            <p>MedTech Special Device does not sell, rent, or trade your personal information. We may share your information with:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>Service Providers:</strong> Trusted third-party IT, logistics, and support service providers who process data on our behalf and are bound by data processing agreements.</li>
              <li><strong>Manufacturer Partners:</strong> Where necessary to fulfil your equipment order, warranty claim, or technical support request.</li>
              <li><strong>Regulatory Authorities:</strong> As required by law, court order, or government regulation.</li>
              <li><strong>Professional Advisers:</strong> Including lawyers, auditors, and insurers where necessary.</li>
            </ul>
            <p>We require all third parties to implement appropriate security measures and to use your data only for the specified purpose.</p>
          </Section>

          <Section title="6. International Data Transfers">
            <p>Where personal information is transferred outside South Africa (e.g., to international manufacturer partners), MedTech Special Device ensures that adequate safeguards are in place, including contractual protections equivalent to those required under POPIA, as required by Section 72 of POPIA.</p>
          </Section>

          <Section title="7. Data Retention">
            <p>We retain personal information only for as long as necessary to fulfil the purposes for which it was collected, or as required by applicable law. In general:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Client and transaction records: 7 years (in line with South African tax and commercial record-keeping requirements).</li>
              <li>Service and maintenance records: Duration of the contract plus 5 years.</li>
              <li>Marketing and consent records: Until you withdraw consent or 3 years of inactivity.</li>
              <li>Website analytics data: 26 months.</li>
            </ul>
          </Section>

          <Section title="8. Your Rights Under POPIA">
            <p>As a data subject, you have the following rights:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>Right to Access:</strong> Request confirmation of whether MedTech Special Device holds your personal information and obtain a copy.</li>
              <li><strong>Right to Correction:</strong> Request correction of inaccurate or outdated personal information.</li>
              <li><strong>Right to Deletion:</strong> Request erasure of your personal information where no lawful ground for retention exists.</li>
              <li><strong>Right to Object:</strong> Object to processing based on legitimate interest, including direct marketing.</li>
              <li><strong>Right to Withdraw Consent:</strong> Where processing is based on consent, you may withdraw consent at any time without affecting the lawfulness of prior processing.</li>
              <li><strong>Right to Complain:</strong> Lodge a complaint with the Information Regulator of South Africa at www.inforegulator.org.za.</li>
            </ul>
            <p>To exercise any of these rights, contact our Information Officer at <a href="mailto:privacy@medtechspecialdevice.com" className="underline" style={{ color: 'var(--medihub-blue)' }}>privacy@medtechspecialdevice.com</a>.</p>
          </Section>

          <Section title="9. Security of Your Information">
            <p>MedTech Special Device implements appropriate technical and organisational security measures to protect your personal information against unauthorised access, disclosure, alteration, or destruction. These measures include SSL/TLS encryption, access controls, regular security audits, and staff data protection training.</p>
            <p>In the event of a data breach that poses a risk to your rights, MedTech Special Device will notify the Information Regulator and affected data subjects as required by POPIA within 72 hours of becoming aware of the breach.</p>
          </Section>

          <Section title="10. Information Officer">
            <p>MedTech Special Device's designated Information Officer, as required by POPIA, is responsible for overseeing data protection compliance.</p>
            <p><strong>Information Officer:</strong> [Name on request]<br />
            <strong>Email:</strong> <a href="mailto:privacy@medtechspecialdevice.com" style={{ color: 'var(--medihub-blue)' }}>privacy@medtechspecialdevice.com</a><br />
            <strong>Postal Address:</strong> 123 Healthcare Drive, Sandton, Johannesburg, 2196</p>
          </Section>

          <Section title="11. Changes to This Policy">
            <p>We may update this Privacy Policy from time to time. The "Last Updated" date at the top of this page will reflect any changes. We encourage you to review this policy periodically. Continued use of our services following any update constitutes acceptance of the revised policy.</p>
          </Section>
        </div>
      </section>
    </div>
  );
}