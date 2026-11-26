import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One fortune-cookie line for a software engineer: the classic
// "lucky numbers" closer, with the twist that the numbers are the
// line numbers of a bug the reader has been ignoring since March.
// Concrete scene (a specific bug, a specific month) + the reversal
// lands on the last word, per the winner-study rule.
const fortune =
  "Your lucky numbers are the line numbers of the bug you've been ignoring since March.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
// Guard the gate before writing: a fortune over 120 characters, empty,
// or carrying an embedded newline would score Valid 0 and never reach
// the judge, so fail loudly here instead of writing a dead entry.
if (fortune.length < 1 || fortune.length > 120 || fortune.includes("\n")) {
  throw new Error(`Invalid fortune (${fortune.length} chars): ${fortune}`);
}
// No trailing newline: the file holds exactly the one line, so the
// gate's character count is the text's character count.
writeFileSync(join(outDir, "entry.txt"), fortune, "utf8");
