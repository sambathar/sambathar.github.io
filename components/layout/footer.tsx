import { Container } from "@/components/layout/container";

export function Footer() {
  return (
    <footer className="border-t">
      <Container>
        <div className="flex min-h-16 flex-col justify-center gap-2 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>Placeholder footer text.</p>
          <p>TODO: Define footer links.</p>
        </div>
      </Container>
    </footer>
  );
}
