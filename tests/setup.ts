import { beforeEach } from 'vitest';

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

/**
 * IntersectionObserver stub: jsdom never scrolls, so tests decide explicitly
 * whether a card is on screen.
 */
class TestIntersectionObserver implements IntersectionObserver {
  static instances: TestIntersectionObserver[] = [];

  readonly targets = new Set<Element>();

  readonly root = null;
  readonly rootMargin = '0px';
  readonly thresholds: readonly number[] = [0];

  constructor(private readonly callback: IntersectionObserverCallback) {
    TestIntersectionObserver.instances.push(this);
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

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  trigger(isIntersecting: boolean): void {
    this.callback(
      [
        {
          isIntersecting,
          intersectionRatio: isIntersecting ? 1 : 0,
          target: [...this.targets][0],
          boundingClientRect: null,
          intersectionRect: null,
          rootBounds: null,
          time: 0,
        } as unknown as IntersectionObserverEntry,
      ],
      this
    );
  }
}

(globalThis as unknown as { TestIntersectionObserver: typeof TestIntersectionObserver })
  .TestIntersectionObserver = TestIntersectionObserver;
(globalThis as unknown as { IntersectionObserver: unknown }).IntersectionObserver =
  TestIntersectionObserver;

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

/**
 * Cards remember switched-off series per entity pair. A test that clicks a
 * series off must not leak that preference into the next one.
 */
beforeEach(() => {
  try {
    window.localStorage.clear();
  } catch {
    // Storage unavailable – nothing to clear.
  }
});
