import { ButtonLink, Container, Eyebrow } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="py-24 sm:py-32">
      <Container className="max-w-3xl">
        <Eyebrow>Page not found</Eyebrow>
        <h1 className="mt-4 text-[2.75rem] sm:text-[4rem]">
          We couldn&apos;t find that page.
        </h1>
        <p className="mt-6 max-w-lg">
          The link may be old, or the page may not be ready yet. You can go back
          to the home page or tell us about the home you want to sell.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <ButtonLink href="/">Go to the home page</ButtonLink>
          <ButtonLink href="/sell" variant="dark">
            Get a cash offer
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
