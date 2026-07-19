import { ArrowRight } from 'lucide-react';
import PageHero from '../components/shared/PageHero';

export default function Products() {
  return (
    <div>
      <PageHero
        label="Product Catalogue"
        title="World-Class Medical Equipment for Every Department"
        subtitle="Browse our comprehensive range of 10,000+ medical devices from 100+ global manufacturers — all backed by MedTech's clinical engineering support."
        image="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&q=80"
      />

      <section className="py-24 bg-white">
        <div className="section-container text-center">
          <h2 className="font-heading font-black text-3xl lg:text-4xl mb-4" style={{ color: 'var(--midnight-navy)' }}>
            Explore Our Full Product Catalogue
          </h2>
          <p className="font-body max-w-xl mx-auto mb-8" style={{ color: 'var(--slate-text)' }}>
            View our complete range of medical equipment and devices on our dedicated catalogue site.
          </p>
          <a
            href="https://www.synergysurgical.com/search/index.php.html"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            View Full Catalogue <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </div>
  );
}