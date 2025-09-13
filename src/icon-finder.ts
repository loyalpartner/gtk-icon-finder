import * as gi from 'node-gtk';

const Gtk = gi.require('Gtk', '3.0');

// Initialize GTK
Gtk.init();

export interface IconInfo {
  path: string;
  sizes: number[];
}

export class IconFinder {
  private iconTheme: any;

  constructor() {
    this.iconTheme = Gtk.IconTheme.getDefault();
  }

  /**
   * Check if an icon exists in the current theme
   */
  public hasIcon(iconName: string): boolean {
    return this.iconTheme.hasIcon(iconName);
  }

  /**
   * Find all files for a given icon name
   */
  public findIcon(iconName: string): IconInfo[] {
    if (!this.hasIcon(iconName)) {
      return [];
    }

    const sizes = [16, 22, 24, 32, 48, 64, 96, 128, 256, 512];
    const foundIcons = new Map<string, number[]>();

    for (const size of sizes) {
      const iconInfo = this.iconTheme.lookupIcon(iconName, size, 0);

      if (iconInfo) {
        const filename = iconInfo.getFilename();

        if (filename) {
          if (!foundIcons.has(filename)) {
            foundIcons.set(filename, []);
          }
          foundIcons.get(filename)!.push(size);
        }
      }
    }

    const results: IconInfo[] = [];
    foundIcons.forEach((sizes, path) => {
      results.push({ path, sizes });
    });

    return results;
  }

  /**
   * Get the best icon file for a given size
   */
  public findIconForSize(iconName: string, size: number): string | null {
    if (!this.hasIcon(iconName)) {
      return null;
    }

    const iconInfo = this.iconTheme.lookupIcon(iconName, size, 0);

    if (iconInfo) {
      const filename = iconInfo.getFilename();
      return filename || null;
    }

    return null;
  }

  /**
   * Get all available icon themes search paths
   */
  public getSearchPaths(): string[] {
    return this.iconTheme.getSearchPath();
  }

  /**
   * List all available icons
   */
  public listAllIcons(): string[] {
    const contexts = this.iconTheme.listContexts();
    const allIcons = new Set<string>();

    if (contexts) {
      contexts.forEach((context: string) => {
        const icons = this.iconTheme.listIcons(context);
        if (icons) {
          icons.forEach((icon: string) => {
            allIcons.add(icon);
          });
        }
      });
    }

    return Array.from(allIcons).sort();
  }

  /**
   * List icons in a specific context
   */
  public listIconsInContext(context: string): string[] {
    const icons = this.iconTheme.listIcons(context);
    return icons ? icons.sort() : [];
  }

  /**
   * Get all available contexts
   */
  public listContexts(): string[] {
    const contexts = this.iconTheme.listContexts();
    return contexts ? contexts : [];
  }
}