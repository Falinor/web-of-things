export function encode(email: string, password: string): string {
  const encoded = btoa(`${email}:${password}`);
  return `Basic ${encoded}`;
}
