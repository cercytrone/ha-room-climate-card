/**
 * Test environment: jsdom has no layout engine, so ResizeObserver is replaced by
 * a controllable stub. Tests can trigger a size change explicitly.
 */
class TestResizeObserver implements ResizeObserver {
  static instances: TestResizeObserver[] = [];

  readonly targets = new Set<Element>();

  constructor(private readonly callback: ResizeObserverCallback) {
    TestResizeObserver.instances.push(this);
  }

  observe(target: Element): void {
    this.targets.add(target);
  }

  unobserve(target: Element): void {
    this.targets.delete(target);
  }

  disconnect(): void {
    this.targets.clear();
  }

  trigger(width: number, height: number): void {
    this.callback(
      [
        {
          contentRect: { width, height, top: 0, left: 0, bottom: height, right: width, x: 0, y: 0 },
          contentBoxSize: [{ inlineSize: width, blockSize: height }],
          borderBoxSize: [{ inlineSize: width, blockSize: height }],
          devicePixelContentBoxSize: [{ inlineSize: width, blockSize: height }],
          target: [...this.targets][0],
        } as unknown as ResizeObserverEntry,
      ],
      this
    );
  }
}

(globalThis as unknown as { TestResizeObserver: typeof TestResizeObserver }).TestResizeObserver =
  TestResizeObserver;
(globalThis as unknown as { ResizeObserver: unknown }).ResizeObserver = TestResizeObserver;

if (!window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => undefined,
    removeListener: () => undefined,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}
