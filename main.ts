import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const joke = "I put 'per my last email' in the subject; the threat arrives first.";

async function main() {
  // The competition gate counts Unicode code points, not UTF-16 code units.
  const codePoints = [...joke].length;
  if (codePoints < 1 || codePoints > 200 || !joke.trim()) {
    throw new Error(`Entry must contain 1-200 non-whitespace code points (got ${codePoints}).`);
  }

  const outputDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';
  await mkdir(outputDir, { recursive: true });
  await writeFile(join(outputDir, 'entry.txt'), joke, { encoding: 'utf8' });
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`Failed to write entry: ${message}\n`);
  process.exitCode = 1;
});
