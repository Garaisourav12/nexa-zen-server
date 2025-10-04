// lint.cjs
const { globby } = require('globby');
const { ESLint } = require('eslint');
const stripAnsi = require('strip-ansi').default;

(async function main() {
  try {
    // Create ESLint instance
    const eslint = new ESLint({ errorOnUnmatchedPattern: false });

    // Load the stylish formatter
    const formatter = await eslint.loadFormatter('stylish');

    // Get all TS/JS files in src folder
    const files = await globby(['src/**/*.{ts,js}']);

    let hasError = false;

    // Lint files one by one and show status immediately
    for (const file of files) {
      const results = await eslint.lintFiles([file]);
      const res = results[0]; // There is only one file per iteration
      const formatted = formatter.format([res]);

      console.log();
      if (res.errorCount > 0 || res.warningCount > 0) {
        const lines = formatted.split('\n');
        const filteredLines = lines.filter((line) => !!stripAnsi(line).trim());
        console.log(filteredLines.join('\n')); // Show lint errors/warnings
        hasError = true;
      } else {
        console.log(`✅ ${res.filePath} passed lint`);
      }
    }

    if (hasError) {
      console.error('\n❌ Lint failed for some files.');
      process.exit(1);
    } else {
      console.log('\n🎉 All files passed lint check!');
    }
  } catch (err) {
    console.error('\n❌ Lint execution failed:', err);
    process.exit(1);
  }
})();
