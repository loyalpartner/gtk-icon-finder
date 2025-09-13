# gtk-icon-finder

Find GTK icon files by name using node-gtk.

## Installation

```bash
npm install gtk-icon-finder
```

### Prerequisites

Requires GTK 3.0 to be installed on your system:

```bash
# Ubuntu/Debian
sudo apt-get install libgtk-3-dev

# Fedora
sudo dnf install gtk3-devel

# Arch
sudo pacman -S gtk3
```

## Usage

### As a Library

```javascript
const { IconFinder } = require('gtk-icon-finder');
// or
import { IconFinder } from 'gtk-icon-finder';

const finder = new IconFinder();

// Check if an icon exists
if (finder.hasIcon('folder')) {
  console.log('Icon exists!');
}

// Find all files for an icon
const results = finder.findIcon('folder');
results.forEach(result => {
  console.log(`Path: ${result.path}`);
  console.log(`Sizes: ${result.sizes.join(', ')}`);
});

// Get icon file for a specific size
const iconPath = finder.findIconForSize('folder', 48);
console.log(`48x48 icon: ${iconPath}`);

// List all available icons
const allIcons = finder.listAllIcons();
console.log(`Total icons: ${allIcons.length}`);

// Get search paths
const paths = finder.getSearchPaths();
console.log('Icon search paths:', paths);
```

### As a CLI Tool

```bash
# Install globally
npm install -g gtk-icon-finder

# Use the command
icon-finder folder
icon-finder document-open
icon-finder application-exit
```

## API

### `IconFinder`

#### `new IconFinder()`
Creates a new IconFinder instance using the default GTK icon theme.

#### `hasIcon(iconName: string): boolean`
Check if an icon exists in the current theme.

#### `findIcon(iconName: string): IconInfo[]`
Find all files for a given icon name. Returns an array of `IconInfo` objects.

```typescript
interface IconInfo {
  path: string;    // Full path to the icon file
  sizes: number[]; // Array of sizes this file is used for
}
```

#### `findIconForSize(iconName: string, size: number): string | null`
Get the best icon file for a given size. Returns the file path or null if not found.

#### `getSearchPaths(): string[]`
Get all icon theme search paths.

#### `listAllIcons(): string[]`
List all available icon names in the current theme.

#### `listContexts(): string[]`
Get all available contexts (categories) in the icon theme.

#### `listIconsInContext(context: string): string[]`
List all icons in a specific context.

## Examples

### Find all variants of an icon

```javascript
const { IconFinder } = require('gtk-icon-finder');

const finder = new IconFinder();
const results = finder.findIcon('folder-documents');

if (results.length > 0) {
  console.log('Found folder-documents icon:');
  results.forEach(({ path, sizes }) => {
    console.log(`  ${path} (sizes: ${sizes.join(', ')})`);
  });
} else {
  console.log('Icon not found');
}
```

### Check multiple icons

```javascript
const { IconFinder } = require('gtk-icon-finder');

const finder = new IconFinder();
const iconsToCheck = ['folder', 'document', 'terminal', 'unknown-icon'];

iconsToCheck.forEach(icon => {
  if (finder.hasIcon(icon)) {
    const path = finder.findIconForSize(icon, 48);
    console.log(`✓ ${icon}: ${path}`);
  } else {
    console.log(`✗ ${icon}: not found`);
  }
});
```

## License

MIT