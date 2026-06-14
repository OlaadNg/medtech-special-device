import PageHero from '../components/shared/PageHero';
import { Shield, CheckCircle, FileText, User, Lock, AlertCircle } from 'lucide-react';

const Section = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="font-heading font-bold text-xl mb-4" style={{ color: 'var(--midnight-navy)' }}>{title}</h2>
    <div className="font-body text-base leading-relaxed space-y-3" style={{ color: 'var(--slate-text)' }}>{children}</div>
  </div>
);

const principles = [
  { Icon: CheckCircle, title: 'Accountability', description: 'MediHub has appointed a dedicated Information Officer responsible for compliance with POPIA across all divisions and operations.' },
  { Icon: FileText, title: 'Processing Limitation', description: 'We collect only the minimum personal information required for a specific, lawful purpose. Information is not processed beyond that purpose without consent.' },
  { Icon: Shield, title: 'Purpose Specification', description: 'The purpose for collecting personal information is clearly defined before collection and communicated to data subjects at the time of collection.' },
  { Icon: CheckCircle, title: 'Further Processing Limitation', description: 'Personal information is not used for purposes incompatible with the original reason for collection, unless the data subject consents or an exemption applies.' },
  { Icon: AlertCircle, title: 'Information Quality', description: 'We take reasonable steps to ensure that all personal information we hold is accurate, complete, and not misleading.' },
  { Icon: FileText, title: 'Openness', description: 'We maintain a PAIA Information Manual and notify data subjects of the purpose, rights, and consequences of providing personal information.' },
  { Icon: Lock, title: 'Security Safeguards', description: 'Appropriate technical, physical, and organisational security measures are in place to prevent loss, damage, unauthorised access, or unlawful processing.' },
  { Icon: User, title: 'Data Subject Participation', description: 'Data subjects may request access to, correction of, or deletion of their personal information held by MediHub at any time.' },
];

export default function PoPIACompliance() {
  return (
    <div>
      <PageHero
        label="Legal"
        title="POPIA Compliance Statement"
        subtitle="MediHub's commitment to the Protection of Personal Information Act, 4 of 2013 (POPIA)."
      />
      <section className="py-16 bg-white">
        <div className="section-container max-w-4xl">
          <p className="text-sm font-body mb-10 pb-6 border-b" style={{ color: 'var(--slate-text)', borderColor: 'var(--light-border)' }}>
            <strong>Last Updated: 1 June 2026</strong> &nbsp;|&nbsp; MediHub Healthcare Solutions (Pty) Ltd, Reg. No. 1989/012345/07
          </p>

          {/* Compliance Badge */}
          <div className="flex items-start gap-5 p-6 rounded-2xl mb-12" style={{ background: 'rgba(0,91,170,0.06)', border: '1.5px solid rgba(0,91,170,0.15)' }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'var(--medihub-blue)' }}>
              <Shield size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg mb-1" style={{ color: 'var(--midnight-navy)' }}>POPIA Compliant Organisation</h3>
              <p className="font-body text-sm" style={{ color: 'var(--slate-text)' }}>
                MediHub Healthcare Solutions (Pty) Ltd is fully compliant with the Protection of Personal Information Act, 4 of 2013 (POPIA), which became fully effective on 1 July 2021. We have implemented comprehensive data governance frameworks, security controls, and staff training programmes to uphold the rights of all data subjects.
              </p>
            </div>
          </div>

          <Section title="1. About POPIA">
            <p>The Protection of Personal Information Act, 4 of 2013 (POPIA) is South Africa's primary data protection legislation. POPIA regulates the processing of personal information by public and private bodies and gives individuals (data subjects) rights over their personal information.</p>
            <p>POPIA aligns with international data protection standards, including the EU General Data Protection Regulation (GDPR), and is overseen by the Information Regulator of South Africa.</p>
          </Section>

          <Section title="2. Our Eight Conditions for Lawful Processing">
            <p>MediHub's data processing practices are governed by the eight conditions for lawful processing set out in Chapter 3 of POPIA:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {principles.map(({ Icon, title, description }) => (
                <div key={title} className="flex gap-4 p-5 rounded-xl" style={{ background: 'var(--clinical-mist)' }}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'var(--medihub-blue)' }}>
                    <Icon size={16} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-sm mb-1" style={{ color: 'var(--midnight-navy)' }}>{title}</h4>
                    <p className="font-body text-xs leading-relaxed" style={{ color: 'var(--slate-text)' }}>{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="3. Information Officer">
            <p>In compliance with Section 55 of POPIA and the PAIA, MediHub has registered a designated Information Officer with the Information Regulator of South Africa. The Information Officer is responsible for:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Ensuring that MediHub complies with POPIA at all times.</li>
              <li>Handling all requests from data subjects relating to access, correction, or deletion of personal information.</li>
              <li>Developing, implementing, and maintaining a POPIA Compliance Framework.</li>
              <li>Receiving and managing complaints relating to MediHub's data processing activities.</li>
              <li>Notifying the Information Regulator and affected data subjects in the event of a data breach.</li>
            </ul>
            <div className="mt-4 p-5 rounded-xl" style={{ background: 'var(--clinical-mist)' }}>
              <p className="font-body text-sm"><strong>Information Officer:</strong> Available on request<br />
              <strong>Deputy Information Officer:</strong> Available on request<br />
              <strong>Contact:</strong> <a href="mailto:privacy@medihub.co.za" style={{ color: 'var(--medihub-blue)' }}>privacy@medihub.co.za</a><br />
              <strong>Postal Address:</strong> 123 Healthcare Drive, Sandton, Johannesburg, 2196</p>
            </div>
          </Section>

          <Section title="4. PAIA Manual">
            <p>In terms of Section 51 of the Promotion of Access to Information Act, 2 of 2000 (PAIA), MediHub maintains a PAIA Information Manual which describes:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>The categories of personal information MediHub holds.</li>
              <li>The purposes for which personal information is processed.</li>
              <li>How to submit a request for access to records held by MediHub.</li>
              <li>The prescribed fees applicable to PAIA requests.</li>
            </ul>
            <p>To request a copy of MediHub's PAIA Manual, email <a href="mailto:privacy@medihub.co.za" style={{ color: 'var(--medihub-blue)' }}>privacy@medihub.co.za</a>.</p>
          </Section>

          <Section title="5. Data Subject Rights">
            <p>Under POPIA, individuals whose personal information MediHub processes have the following rights:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>Right to be notified</strong> of the collection and purpose of personal information.</li>
              <li><strong>Right of access</strong> to personal information held about them.</li>
              <li><strong>Right to correction or deletion</strong> of inaccurate, irrelevant, or out-of-date information.</li>
              <li><strong>Right to object</strong> to the processing of personal information, including for direct marketing.</li>
              <li><strong>Right not to be subject</strong> to decisions based solely on automated processing.</li>
              <li><strong>Right to submit a complaint</strong> to the Information Regulator.</li>
            </ul>
            <p>To exercise any of these rights, submit a written request to <a href="mailto:privacy@medihub.co.za" style={{ color: 'var(--medihub-blue)' }}>privacy@medihub.co.za</a>. We will respond within 30 days as required by POPIA.</p>
          </Section>

          <Section title="6. Data Breach Notification">
            <p>In the event of a data security compromise involving personal information, MediHub will:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Notify the Information Regulator as soon as reasonably practicable.</li>
              <li>Notify all affected data subjects where the breach poses a risk to their rights.</li>
              <li>Conduct an internal investigation and implement corrective measures.</li>
              <li>Maintain records of all security incidents as required by POPIA.</li>
            </ul>
          </Section>

          <Section title="7. Special / Sensitive Categories of Information">
            <p>MediHub recognises that certain categories of information require heightened protection under POPIA, including health information, biometric data, and financial data. Where MediHub processes such information — for example, in the context of clinical engineering service records — we apply additional safeguards, including:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Encryption of health-related records at rest and in transit.</li>
              <li>Strict role-based access controls limiting access to authorised personnel only.</li>
              <li>Explicit consent obtained before processing special categories of information.</li>
            </ul>
          </Section>

          <Section title="8. Third-Party Processing & Operator Agreements">
            <p>Where MediHub engages third parties (operators) to process personal information on our behalf, we enter into written data processing agreements that require operators to:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Process personal information only on documented instructions from MediHub.</li>
              <li>Implement appropriate technical and organisational security measures.</li>
              <li>Assist MediHub in responding to data subject rights requests.</li>
              <li>Delete or return all personal information upon termination of the agreement.</li>
            </ul>
          </Section>

          <Section title="9. Information Regulator of South Africa">
            <p>Data subjects who are not satisfied with MediHub's response to a complaint or rights request may contact the Information Regulator of South Africa:</p>
            <div className="p-5 rounded-xl" style={{ background: 'var(--clinical-mist)' }}>
              <p className="font-body text-sm">
                <strong>Information Regulator (South Africa)</strong><br />
                JD House, 27 Stiemens Street, Braamfontein, Johannesburg, 2001<br />
                P.O. Box 31533, Braamfontein, Johannesburg, 2017<br />
                <strong>Email:</strong> <a href="mailto:inforeg@justice.gov.za" style={{ color: 'var(--medihub-blue)' }}>inforeg@justice.gov.za</a><br />
                <strong>Website:</strong> <a href="https://www.inforegulator.org.za" target="_blank" rel="noreferrer" style={{ color: 'var(--medihub-blue)' }}>www.inforegulator.org.za</a>
              </p>
            </div>
          </Section>
        </div>
      </section>
    </div>
  );
}