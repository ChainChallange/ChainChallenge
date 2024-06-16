import { Buffer } from 'buffer';

export function stringToBase64(input: string): string {
  const buffer = Buffer.from(input, 'utf-8');
  
  return buffer.toString('base64');
}

export function convertCodesToBase64(codes: Record<string, string>): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(codes)) {
    result[key] = stringToBase64(value);
  }
  console.log(result);
  return result;
}
