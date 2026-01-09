export class AssetLoader {
  private cache: Map<string, HTMLImageElement> = new Map();
  private loading: Map<string, Promise<HTMLImageElement>> = new Map();

  public async loadImage(url: string): Promise<HTMLImageElement> {
    // Return cached if available
    if (this.cache.has(url)) {
      return this.cache.get(url)!;
    }

    // Return existing promise if loading
    if (this.loading.has(url)) {
      return this.loading.get(url)!;
    }

    // Start loading
    const promise = new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.cache.set(url, img);
        this.loading.delete(url);
        console.log(`✓ Loaded: ${url}`);
        resolve(img);
      };
      img.onerror = (error) => {
        this.loading.delete(url);
        console.error(`✗ Failed to load: ${url}`, error);
        reject(new Error(`Failed to load image: ${url}`));
      };
      img.src = url;
    });

    this.loading.set(url, promise);
    return promise;
  }

  public async preloadAssets(urls: string[]): Promise<HTMLImageElement[]> {
    console.log(`Preloading ${urls.length} assets...`);
    const results = await Promise.all(urls.map((url) => this.loadImage(url)));
    console.log(`✓ All assets loaded`);
    return results;
  }

  public getImage(url: string): HTMLImageElement | null {
    return this.cache.get(url) || null;
  }

  public isLoaded(url: string): boolean {
    return this.cache.has(url);
  }

  public clear(): void {
    this.cache.clear();
    this.loading.clear();
  }
}
