import React, { useMemo, useState } from 'react';
import { SAMPLE_PROPERTIES, SampleProperty, SamplePropertyType } from '../data/sampleProperties';
import { AI_EMPLOYEES } from '../data/nexusData';
import { NexusPageShell, NexusProvenanceBadge, NexusStatePanel } from './product/ProductPrimitives';
import { AppLink } from '../routing/AppLink';
import { APP_PATHS, propertyDetailPath, type ProductRoutePath } from '../routing/appRoutes';

const cardClass = 'rounded-2xl border border-white/10 bg-white/[0.03] p-5';
const inputClass = 'w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-3 text-sm text-white outline-none placeholder:text-neutral-600 focus:border-[#D4AF37]';
const formatPrice = (price: string) => price || 'Information not available.';

const PropertyCard: React.FC<{ property: SampleProperty }> = ({ property }) => (
  <AppLink to={propertyDetailPath(property.propertyId)} className={`${cardClass} block transition hover:border-[#D4AF37]/50`}>
    <div className="mb-4 flex items-start justify-between gap-3">
      <NexusProvenanceBadge value="SAMPLE" />
      <span className="text-[10px] uppercase tracking-wide text-neutral-500">Not verified</span>
    </div>
    <div className="mb-4 aspect-[16/9] overflow-hidden rounded-xl bg-neutral-900">
      <img src={property.image} alt="" loading="lazy" className="h-full w-full object-cover opacity-80" />
    </div>
    <h2 className="font-bold text-white">{property.title}</h2>
    <p className="mt-1 text-xs text-neutral-400">{property.area}, {property.city}</p>
    <div className="mt-4 flex items-end justify-between gap-2">
      <span className="font-semibold text-[#D4AF37]">{formatPrice(property.price)}</span>
      <span className="text-xs text-neutral-400">{property.areaSize}</span>
    </div>
  </AppLink>
);

const MarketplacePage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('');
  const [type, setType] = useState('');
  const [purpose, setPurpose] = useState('');
  const [sort, setSort] = useState('relevance');
  const cities = useMemo(() => [...new Set(SAMPLE_PROPERTIES.map((property) => property.city))].sort(), []);
  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = SAMPLE_PROPERTIES.filter((property) =>
      (!city || property.city === city)
      && (!type || property.propertyType === type)
      && (!purpose || property.purpose === purpose)
      && (!normalizedQuery || `${property.title} ${property.area} ${property.city} ${property.propertyType}`.toLowerCase().includes(normalizedQuery)),
    );
    return sort === 'price-low'
      ? [...filtered].sort((a, b) => a.priceRaw - b.priceRaw)
      : sort === 'price-high'
        ? [...filtered].sort((a, b) => b.priceRaw - a.priceRaw)
        : filtered;
  }, [city, purpose, query, sort, type]);

  return (
    <NexusPageShell eyebrow="PROPERTY MARKETPLACE / SAMPLE CATALOG" title="Explore properties" description="Search and filter the catalog preview. Every result is sample data; this page does not provide verified or live inventory.">
      <div className="mb-5"><NexusProvenanceBadge value="SAMPLE" /></div>
      <form className="mb-6 grid gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:grid-cols-2 lg:grid-cols-5" onSubmit={(event) => event.preventDefault()}>
        <label className="text-xs text-neutral-400">Search<input value={query} onChange={(event) => setQuery(event.target.value)} className={`${inputClass} mt-2`} placeholder="Area, city, property type" /></label>
        <label className="text-xs text-neutral-400">City<select value={city} onChange={(event) => setCity(event.target.value)} className={`${inputClass} mt-2`}><option value="">All sample locations</option>{cities.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="text-xs text-neutral-400">Property type<select value={type} onChange={(event) => setType(event.target.value)} className={`${inputClass} mt-2`}><option value="">All types</option>{['House', 'Plot', 'Commercial', 'Apartment', 'Investment', 'Farm House', 'Building', 'Shop', 'Office'].map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="text-xs text-neutral-400">Purpose<select value={purpose} onChange={(event) => setPurpose(event.target.value)} className={`${inputClass} mt-2`}><option value="">All purposes</option>{['Residential', 'Commercial', 'Investment'].map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="text-xs text-neutral-400">Sort<select value={sort} onChange={(event) => setSort(event.target.value)} className={`${inputClass} mt-2`}><option value="relevance">Default</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></label>
      </form>
      <p className="mb-4 text-xs text-neutral-500">{results.length} sample records • no verified inventory results are available in this preview.</p>
      {results.length ? <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{results.slice(0, 30).map((property) => <PropertyCard key={property.propertyId} property={property} />)}</div> : <NexusStatePanel title="No sample results" detail="Change or clear the filters to explore the sample catalog. No verified property available." state="INFORMATION NOT AVAILABLE" />}
    </NexusPageShell>
  );
};

const PropertyDetailPage: React.FC<{ propertyId: string }> = ({ propertyId }) => {
  const property = SAMPLE_PROPERTIES.find((item) => item.propertyId === propertyId);
  if (!property) return <NexusPageShell eyebrow="PROPERTY DETAIL" title="Property not found" description="The requested property record is not available."><NexusStatePanel title="Information not available." detail="No record matching this property identifier is present in the current catalog." state="INFORMATION NOT AVAILABLE" /><AppLink to={APP_PATHS.marketplace} className="mt-4 inline-flex rounded-xl border border-white/10 px-4 py-3 text-sm text-neutral-300">Back to marketplace</AppLink></NexusPageShell>;
  return (
    <NexusPageShell eyebrow="PROPERTY DETAIL / SAMPLE RECORD" title={property.title} description="Sample listing details for interface demonstration only. This record has not been verified and is not an offer or confirmation of ownership.">
      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <section className={cardClass}>
          <NexusProvenanceBadge value="SAMPLE" />
          <img src={property.image} alt="" className="mt-4 aspect-[16/9] w-full rounded-xl bg-neutral-900 object-cover" />
          <h2 className="mt-5 text-xl font-bold">Property information</h2>
          <p className="mt-2 text-sm leading-6 text-neutral-300">{property.description || 'Information not available.'}</p>
          <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">{[['Location', `${property.area}, ${property.city}`], ['Type', property.propertyType], ['Purpose', property.purpose], ['Area', property.areaSize], ['Bedrooms', property.bedrooms?.toString() || 'Information not available.'], ['Bathrooms', property.bathrooms?.toString() || 'Information not available.']].map(([label, value]) => <div key={label} className="rounded-xl bg-black/30 p-3"><dt className="text-xs text-neutral-500">{label}</dt><dd className="mt-1 text-white">{value}</dd></div>)}</dl>
        </section>
        <aside className="space-y-4">
          <section className={cardClass}><NexusProvenanceBadge value="SAMPLE" /><p className="mt-4 text-xl font-bold text-[#D4AF37]">{formatPrice(property.price)}</p><p className="mt-2 text-sm text-neutral-400">Price and ownership are not authoritative.</p><div className="mt-4"><NexusProvenanceBadge value="NOT CONNECTED" /></div><p className="mt-2 text-sm text-neutral-400">Verification, owner/agent profile, and contact details are not available.</p></section>
          <NexusStatePanel title="Lead Lock" detail="Canonical policy: 48 hours. No lead has been created or locked; production enforcement is not connected." state="NOT CONNECTED" />
          <AppLink to={APP_PATHS.leadProtection} className="block rounded-xl border border-[#D4AF37]/40 px-4 py-3 text-center text-sm font-semibold text-[#D4AF37]">Read Lead Lock policy</AppLink>
          <AppLink to={APP_PATHS.marketplace} className="block rounded-xl border border-white/10 px-4 py-3 text-center text-sm text-neutral-300">Back to marketplace</AppLink>
        </aside>
      </div>
    </NexusPageShell>
  );
};

const ListingWizard: React.FC = () => {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [draft, setDraft] = useState({ purpose: '', propertyType: '', city: '', area: '', size: '', price: '', description: '' });
  const steps = ['Purpose', 'Property type', 'Location', 'Details and price', 'Description', 'Review', 'Submit'];
  const update = (key: keyof typeof draft, value: string) => setDraft((current) => ({ ...current, [key]: value }));
  const field = (key: keyof typeof draft, label: string, placeholder: string, required = false) => <label className="block text-sm text-neutral-300">{label}{required && <span aria-hidden="true" className="ml-1 text-amber-300">*</span>}<input required={required} aria-invalid={Boolean(validationMessage && required && !draft[key].trim())} className={`${inputClass} mt-2`} type="text" value={draft[key]} onChange={(event) => { update(key, event.target.value); setValidationMessage(''); }} placeholder={placeholder} /></label>;
  const advanceStep = () => {
    const requiredFields: Partial<Record<number, Array<keyof typeof draft>>> = {
      0: ['purpose'],
      1: ['propertyType'],
      2: ['city', 'area'],
      3: ['size'],
    };
    const missingField = requiredFields[step]?.find((key) => !draft[key].trim());
    if (missingField) {
      setValidationMessage(`Complete ${missingField.replace(/([A-Z])/g, ' $1').toLowerCase()} before continuing.`);
      return;
    }
    setValidationMessage('');
    setStep((current) => Math.min(6, current + 1));
  };

  return (
    <NexusPageShell eyebrow="SELLER WORKFLOW / FRONTEND PREVIEW" title="List a property" description="Prepare a listing draft. This browser-only wizard does not upload, save, publish, verify, or submit data to a backend. Do not enter sensitive identity or document information.">
      <ol className="mb-5 flex flex-wrap gap-2" aria-label="Listing draft steps">{steps.map((label, index) => <li key={label} aria-current={index === step ? 'step' : undefined} className={`rounded-full border px-3 py-1.5 text-xs ${index === step ? 'border-[#D4AF37]/50 bg-[#D4AF37]/10 text-[#D4AF37]' : 'border-white/10 text-neutral-400'}`}>Step {index + 1}: {label}</li>)}</ol>
      {submitted ? <><NexusStatePanel title="Preview complete — not submitted" detail="No backend submission occurred. The draft exists only in this page's current browser session and was not saved." state="NOT CONNECTED" /><div className="mt-4 flex flex-wrap gap-3"><AppLink to={APP_PATHS.marketplace} className="rounded-xl bg-[#D4AF37] px-4 py-3 text-sm font-bold text-black">Explore marketplace</AppLink><AppLink to={APP_PATHS.home} className="rounded-xl border border-white/10 px-4 py-3 text-sm text-neutral-300">Return home</AppLink></div></> : (
        <section className={`${cardClass} max-w-3xl`}>
          <p className="mb-5 text-sm text-neutral-400">Step {step + 1} of {steps.length}: {steps[step]}</p>
          <div className="space-y-4">
            {step === 0 && <label className="block text-sm text-neutral-300">Purpose <span aria-hidden="true" className="text-amber-300">*</span><select required aria-invalid={Boolean(validationMessage && !draft.purpose)} className={`${inputClass} mt-2`} value={draft.purpose} onChange={(event) => { update('purpose', event.target.value); setValidationMessage(''); }}><option value="">Choose purpose</option>{['For sale', 'For rent', 'Investment'].map((value) => <option key={value}>{value}</option>)}</select></label>}
            {step === 1 && <label className="block text-sm text-neutral-300">Property type <span aria-hidden="true" className="text-amber-300">*</span><select required aria-invalid={Boolean(validationMessage && !draft.propertyType)} className={`${inputClass} mt-2`} value={draft.propertyType} onChange={(event) => { update('propertyType', event.target.value); setValidationMessage(''); }}><option value="">Choose type</option>{(['House', 'Plot', 'Commercial', 'Apartment', 'Investment', 'Farm House', 'Building', 'Shop', 'Office'] as SamplePropertyType[]).map((value) => <option key={value}>{value}</option>)}</select></label>}
            {step === 2 && <div className="grid gap-4 sm:grid-cols-2">{field('city', 'City', 'City', true)}{field('area', 'Area', 'Area', true)}</div>}
            {step === 3 && <div className="grid gap-4 sm:grid-cols-2">{field('size', 'Area / size', 'e.g. 10 marla', true)}{field('price', 'Asking price', 'Information if known')}<p className="text-xs text-neutral-500 sm:col-span-2">Price remains user-entered and unverified. Missing values are not inferred.</p></div>}
            {step === 4 && <label className="block text-sm text-neutral-300">Description<textarea className={`${inputClass} mt-2 min-h-32`} value={draft.description} onChange={(event) => update('description', event.target.value)} placeholder="Describe the property. Avoid sensitive personal information." /></label>}
            {step === 5 && <div className="space-y-3 text-sm">{Object.entries(draft).map(([key, value]) => <p key={key}><span className="capitalize text-neutral-500">{key.replace(/([A-Z])/g, ' $1')}: </span>{value || 'Information not available.'}</p>)}<NexusProvenanceBadge value="DRAFT" /></div>}
            {step === 6 && <NexusStatePanel title="Submission requires a connected backend" detail="The listing is not approved or published by this preview. Final submission is disabled until persistent storage and review workflows exist." state="NOT CONNECTED" />}
          </div>
          {validationMessage && <p className="mt-4 text-sm text-amber-300" role="alert">{validationMessage}</p>}
          <div className="mt-6 flex flex-wrap justify-between gap-3">
            <button type="button" disabled={step === 0} onClick={() => { setValidationMessage(''); setStep((current) => Math.max(0, current - 1)); }} className="rounded-xl border border-white/10 px-4 py-2.5 text-sm disabled:opacity-40">Back</button>
            {step < 5 && <button type="button" onClick={advanceStep} className="rounded-xl bg-[#D4AF37] px-4 py-2.5 text-sm font-bold text-black">Next</button>}
            {step === 5 && <button type="button" onClick={() => setStep(6)} className="rounded-xl border border-[#D4AF37]/40 px-4 py-2.5 text-sm font-semibold text-[#D4AF37]">Review submission state</button>}
            {step === 6 && <button type="button" onClick={() => setSubmitted(true)} className="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-neutral-300">Finish preview</button>}
          </div>
        </section>
      )}
    </NexusPageShell>
  );
};

const PricingPage: React.FC = () => (
  <NexusPageShell eyebrow="PRICING / DOCUMENTED VALUES" title="Plans and listing prices" description="These are documented price points only. No billing provider, entitlement enforcement, plan quotas, or subscription activation is connected.">
    <div className="grid gap-4 md:grid-cols-3">
      {([['Starter', 'PKR 1,000', 'per month'], ['Professional', 'PKR 5,000', 'per month'], ['Enterprise', 'PKR 25,000', 'per month']] as const).map(([name, price, cadence]) => <section key={name} className={cardClass}><NexusProvenanceBadge value="DOCUMENTED POLICY" /><h2 className="mt-4 text-xl font-bold">{name}</h2><p className="mt-2 text-2xl font-extrabold text-[#D4AF37]">{price}<span className="ml-1 text-xs font-normal text-neutral-400">{cadence}</span></p><p className="mt-4 text-sm text-neutral-400">Plan entitlements: CONFIGURATION PENDING</p></section>)}
    </div>
    <section className={`${cardClass} mt-5`}>
      <h2 className="text-xl font-bold">Premium listing prices</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">{[['Featured Listing', 'PKR 15,000'], ['Premium Listing', 'PKR 30,000'], ['Developer Spotlight', 'PKR 50,000']].map(([label, price]) => <div key={label} className="rounded-xl bg-black/30 p-4"><p className="text-sm text-neutral-300">{label}</p><p className="mt-2 font-bold text-[#D4AF37]">{price}</p><p className="mt-2 text-xs text-neutral-500">Placement and duration: CONFIGURATION PENDING</p></div>)}</div>
    </section>
    <div className="mt-5"><NexusStatePanel title="Billing not connected" detail="JazzCash, Easypaisa, and Bank Transfer are conceptual options only. No payment or subscription can be initiated or confirmed here." /></div>
    <AppLink to={APP_PATHS.subscriptions} className="mt-4 inline-flex rounded-xl border border-[#D4AF37]/40 px-4 py-3 text-sm font-semibold text-[#D4AF37]">View subscription workspace status</AppLink>
  </NexusPageShell>
);

const AgentDirectory: React.FC<{ agentId?: string }> = ({ agentId }) => (
  <NexusPageShell eyebrow="AGENT NETWORK" title={agentId ? 'Agent profile unavailable' : 'Find an agent'} description="No verified human agent directory or authoritative profile records are connected. AI Workforce Registry entries are not real-estate agents.">
    <NexusStatePanel title={agentId ? 'Information not available.' : 'No verified agent profiles available.'} detail={agentId ? 'No agent record matches this route.' : 'The repository does not provide authoritative credentials, service areas, availability, agency memberships, or transaction history for individual agents.'} state="INFORMATION NOT AVAILABLE" />
    {agentId && <AppLink to={APP_PATHS.agents} className="mt-4 inline-flex rounded-xl border border-white/10 px-4 py-3 text-sm text-neutral-300">Back to agent directory</AppLink>}
  </NexusPageShell>
);

const OperationalPreview: React.FC<{ pathname: ProductRoutePath; onOpenAssistant: () => void }> = ({ pathname, onOpenAssistant }) => {
  const routeInfo: Record<string, [string, string, string]> = {
    '/lead-protection': ['LEAD LOCK POLICY', 'Lead Lock', 'Canonical duration: 48 hours. The property remains visible while an active lock is shown. Production acquisition, exclusivity, authoritative timestamps, expiry, release, and reassignment enforcement are not connected.'],
    '/deal-lock': ['DEAL LOCK POLICY', 'Deal Lock', 'Canonical policy: an initial 7-day lock, with a maximum of 15 days total. Production lock acquisition, extensions, settlement, or title reservation are not connected.'],
    '/coverage': ['COVERAGE AREAS', 'Pilot geography: Lahore', 'Location selectors and maps use sample data. No verified nationwide coverage, active-area count, dealer count, live cadastral data, or external map provider is established.'],
    '/faq': ['HELP CENTER', 'Frequently asked questions', 'Answers must distinguish documented product policy from unavailable live data. No authoritative property or provider status is supplied by this preview.'],
    '/contact': ['CONTACT', 'Contact information', 'A production support channel and verified response service are not configured in this frontend route.'],
    '/messages': ['MESSAGES', 'Messaging inbox', 'No server-backed conversations, delivery receipts, real-time transport, or shared message history are connected.'],
    '/notifications': ['NOTIFICATIONS', 'Notification center', 'No persisted cross-device notification feed or delivery provider is connected.'],
    '/crm': ['CRM', 'Contacts and follow-up', 'No authoritative customer records or connected CRM integration are available in this preview.'],
    '/verification': ['VERIFICATION', 'Verification workspace', 'VERIFICATION NOT CONNECTED. This interface cannot verify identity, ownership, government records, cadastral boundaries, or submitted documents.'],
    '/subscriptions': ['SUBSCRIPTIONS', 'Subscription management', 'Prices are documented; entitlements, billing status, invoices, renewal, and subscription activation are not connected.'],
    '/payments': ['PAYMENTS', 'Payment history', 'No payment records or gateway connection are available. A client-side status is never proof of payment.'],
    '/commission': ['COMMISSIONS', 'Commission records', 'NEXUS platform share is 1%. Commission base, tax, payer, participant split, rounding, adjustments, and settlement are DECISION REQUIRED.'],
    '/ai': ['AI ASSISTANCE', 'AI assistant preview', 'The application has a scripted assistant interface, not a production model-backed service. It has no authoritative live inventory or external verification connection.'],
    '/ai-workforce': ['AI WORKFORCE REGISTRY', '54 design entries', 'All 54 registry entries are preserved as design definitions. Production agents, live telemetry, shared memory, and independent model instances are not established.'],
    '/admin/ai': ['AI ADMIN / REVIEW BLUEPRINT', 'Recommendations and human review', 'Review concepts only. No production authority, telemetry, queue, freeze, suspension, or irreversible action is connected.'],
    '/admin/audit': ['AUDIT / BLUEPRINT', 'Audit review workspace', 'This route does not provide a production audit log or immutable audit storage.'],
  };
  const [eyebrow, title, detail] = routeInfo[pathname] || ['PRODUCT WORKSPACE', 'Not connected', 'This workflow is not yet available in the frontend.'];
  return <NexusPageShell eyebrow={eyebrow} title={title} description={detail}>
    {pathname === '/lead-protection' ? <div className="grid gap-4 md:grid-cols-2"><NexusStatePanel title="48 HOURS" detail="Canonical Lead Lock duration. No client-side action can acquire or enforce a production lock." state="DOCUMENTED POLICY" /><NexusStatePanel title="Property remains visible" detail="An active lock does not hide the associated public property. Eligibility, fees, release, and extensions remain DECISION REQUIRED." state="DOCUMENTED POLICY" /></div>
      : pathname === '/deal-lock' ? <div className="grid gap-4 md:grid-cols-2"><NexusStatePanel title="INITIAL DURATION: 7 DAYS" detail="Canonical Deal Lock initial duration. Production acquisition is not connected." state="DOCUMENTED POLICY" /><NexusStatePanel title="MAXIMUM TOTAL: 15 DAYS" detail="Canonical Deal Lock maximum total duration. Extension eligibility, fees, release, and settlement conditions are DECISION REQUIRED." state="DOCUMENTED POLICY" /></div>
      : pathname === APP_PATHS.coverage ? <NexusStatePanel title="PLANNED / SAMPLE" detail="Lahore is a design focus only; pilot inventory sources and acceptance criteria remain DECISION REQUIRED." state="SAMPLE" />
      : pathname === '/faq' ? <div className="grid gap-4 md:grid-cols-2">{[
        ['Are properties verified?', 'No. The visible catalog contains sample data; the verification service is not connected.'],
        ['How long does Lead Lock last?', 'The documented policy states 48 hours. Production enforcement, fees, release, and extension rules are not connected or fully decided.'],
        ['How long does Deal Lock last?', 'The documented policy states an initial 7 days and a maximum of 15 days total. Extension mechanics remain undecided.'],
        ['Can I pay for a plan here?', 'No. Prices are documented, but the payment and subscription services are not connected.'],
        ['Is the AI workforce deployed?', 'No. The 54-entry AI Workforce is a design registry, not a set of deployed AI services.'],
        ['What happens to a listing I enter?', 'This browser-only preview does not save or submit the draft to a backend.'],
      ].map(([question, answer]) => <section key={question} className={cardClass}><h2 className="font-semibold">{question}</h2><p className="mt-2 text-sm leading-6 text-neutral-400">{answer}</p></section>)}</div>
      : pathname === APP_PATHS.contact ? <div className="space-y-4"><NexusStatePanel title="Support channel not configured" detail="A production contact endpoint is not configured. Register for demo access or browse the public product pages." /><AppLink to={APP_PATHS.register} className="inline-flex rounded-xl bg-[#D4AF37] px-4 py-3 text-sm font-bold text-black">Create a demo account</AppLink></div>
      : pathname === APP_PATHS.subscriptions ? <AppLink to={APP_PATHS.pricing} className="inline-flex rounded-xl border border-[#D4AF37]/40 px-4 py-3 text-sm text-[#D4AF37]">Review documented pricing</AppLink>
      : pathname === APP_PATHS.ai ? <div className="space-y-4"><NexusStatePanel title="Scripted assistant preview" detail="The assistant drawer uses scripted responses. It is not model-backed and has no authoritative property or verification data." state="DEMO" /><button type="button" onClick={onOpenAssistant} className="rounded-xl bg-[#D4AF37] px-4 py-3 text-sm font-bold text-black">Open scripted assistant preview</button></div>
      : pathname === '/ai-workforce' ? <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{AI_EMPLOYEES.map((entry) => <section key={entry.id} className={cardClass}><div className="flex items-center justify-between gap-2"><span className="font-mono text-xs text-[#D4AF37]">{entry.id.toUpperCase()}</span><NexusProvenanceBadge value="NOT DEPLOYED" /></div><h2 className="mt-3 font-bold">{entry.name}</h2><p className="mt-1 text-xs text-neutral-400">{entry.department}</p><p className="mt-3 text-sm text-neutral-300">{entry.role}</p></section>)}</div>
      : <NexusStatePanel title="NOT CONNECTED" detail="This screen is a route placeholder for the future service adapter. No real records or successful actions are fabricated." />}
  </NexusPageShell>;
};

export const ProductExperiencePage: React.FC<{ pathname: ProductRoutePath; onOpenAssistant: () => void }> = ({ pathname, onOpenAssistant }) => {
  if (pathname === APP_PATHS.marketplace) return <MarketplacePage />;
  if (pathname === APP_PATHS.listProperty) return <ListingWizard />;
  if (pathname === APP_PATHS.pricing) return <PricingPage />;
  if (pathname === APP_PATHS.agents) return <AgentDirectory />;
  if (pathname.startsWith(`${APP_PATHS.agentDetail}/`)) return <AgentDirectory agentId={decodeURIComponent(pathname.slice(`${APP_PATHS.agentDetail}/`.length))} />;
  if (pathname.startsWith(`${APP_PATHS.propertyDetail}/`)) return <PropertyDetailPage propertyId={decodeURIComponent(pathname.slice(`${APP_PATHS.propertyDetail}/`.length))} />;
  if (pathname.startsWith(`${APP_PATHS.leadDetail}/`)) {
    const leadId = decodeURIComponent(pathname.slice(`${APP_PATHS.leadDetail}/`.length));
    return <NexusPageShell eyebrow="LEAD RECORD / NOT CONNECTED" title="Lead record unavailable" description="The route identifier is not evidence that a lead exists. No connected lead repository is available."><NexusStatePanel title={`Lead: ${leadId}`} detail="No lead record or lock state was retrieved." state="INFORMATION NOT AVAILABLE" /><AppLink to={APP_PATHS.leadProtection} className="mt-4 inline-block rounded-xl border border-white/10 px-4 py-3 text-sm text-neutral-300">Read Lead Lock policy</AppLink></NexusPageShell>;
  }
  if (pathname.startsWith(`${APP_PATHS.dealDetail}/`)) {
    const dealId = decodeURIComponent(pathname.slice(`${APP_PATHS.dealDetail}/`.length));
    return <NexusPageShell eyebrow="DEAL RECORD / NOT CONNECTED" title="Deal record unavailable" description="The route identifier is not evidence that a deal exists. No connected deal repository is available."><NexusStatePanel title={`Deal: ${dealId}`} detail="No deal record or lock state was retrieved." state="INFORMATION NOT AVAILABLE" /><AppLink to={APP_PATHS.dealLock} className="mt-4 inline-block rounded-xl border border-white/10 px-4 py-3 text-sm text-neutral-300">Read Deal Lock policy</AppLink></NexusPageShell>;
  }
  return <OperationalPreview pathname={pathname} onOpenAssistant={onOpenAssistant} />;
};

export const ProductNotFoundPage: React.FC = () => (
  <NexusPageShell eyebrow="404 / PAGE NOT FOUND" title="Page Not Found" description="That address does not match a NEXUS page. Choose a supported destination below.">
    <div className="flex flex-wrap gap-3">
      <AppLink to={APP_PATHS.home} className="rounded-xl bg-[#D4AF37] px-4 py-3 text-sm font-bold text-black">Return Home</AppLink>
      <AppLink to={APP_PATHS.marketplace} className="rounded-xl border border-white/10 px-4 py-3 text-sm text-neutral-300">Explore Properties</AppLink>
      <AppLink to={APP_PATHS.agents} className="rounded-xl border border-white/10 px-4 py-3 text-sm text-neutral-300">Find an Agent</AppLink>
    </div>
  </NexusPageShell>
);
