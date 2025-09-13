#!/usr/bin/env node

import { IconFinder } from './icon-finder';

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Icon Finder CLI');
    console.log('===============');
    console.log('');
    console.log('Usage:');
    console.log('  icon-finder <icon-name>');
    console.log('');
    console.log('Examples:');
    console.log('  icon-finder folder');
    console.log('  icon-finder document-open');
    console.log('  icon-finder application-exit');
    process.exit(0);
  }

  const iconName = args[0]!;
  const finder = new IconFinder();

  console.log(`🔍 Searching for icon: "${iconName}"\n`);

  const results = finder.findIcon(iconName);

  if (results.length === 0) {
    console.log(`❌ Icon "${iconName}" not found in theme\n`);
    process.exit(1);
  }

  console.log(`✅ Icon "${iconName}" found!\n`);
  console.log('📁 Found files:\n');

  results.forEach((result, index) => {
    const sizesStr = result.sizes.join(', ');
    console.log(`${index + 1}. ${result.path}`);
    console.log(`   Sizes: [${sizesStr}]`);
    console.log('');
  });
}

if (require.main === module) {
  main();
}