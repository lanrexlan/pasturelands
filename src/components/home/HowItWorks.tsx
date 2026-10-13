import { Container, Eyebrow } from "../ui";
const steps = [
  ["Tell us about your home", "Share a few details about your property in Abuja or Lagos."],
  ["We verify the title", "Our lawyer checks the registry, survey, owners and any charges before we buy."],
  ["Get a cash offer", "Receive a written offer directly from us. Ask questions, accept or say no."],
  ["Get paid", "Once every owner signs and our lawyer signs off, we complete the sale and pay you."],
];
export function HowItWorks() {
  return <section className="architecture-process bg-paper" aria-labelledby="how-heading">
    <Container className="grid gap-12 lg:grid-cols-2 lg:gap-24">
      <div><Eyebrow>How it works</Eyebrow><h2 id="how-heading" className="section-title mt-6">A sale with<br />fewer unknowns.</h2><p className="mt-6 max-w-sm">A simple, transparent process. You deal with us directly, from your first message to payment.</p></div>
      <ol className="process-list">{steps.map(([title,body],i)=><li key={title}><span className="process-number" aria-hidden="true">{String(i+1).padStart(2,"0")}</span><div><h3>{title}</h3><p>{body}</p></div></li>)}</ol>
    </Container>
  </section>;
}
