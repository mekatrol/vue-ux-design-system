import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';
import { useIntervalTimer } from '@/composables';

describe('useIntervalTimer', () => {
  beforeEach((): void => {
    vi.useFakeTimers();
  });

  afterEach((): void => {
    vi.useRealTimers();
  });

  it('runs the callback on an interval until it returns false', async (): Promise<void> => {
    let callbackCount = 0;
    const callback = async (): Promise<boolean> => {
      callbackCount += 1;
      return callbackCount < 2;
    };

    mount(
      defineComponent({
        setup() {
          useIntervalTimer(callback, 100);
          return {};
        },
        template: '<div />'
      })
    );

    await vi.advanceTimersByTimeAsync(100);
    await vi.advanceTimersByTimeAsync(100);
    await vi.advanceTimersByTimeAsync(100);

    expect(callbackCount).toBe(2);
  });

  it('stops the interval when the component unmounts', async (): Promise<void> => {
    let callbackCount = 0;
    const callback = (): boolean => {
      callbackCount += 1;
      return true;
    };
    const wrapper = mount(
      defineComponent({
        setup() {
          useIntervalTimer(callback, 100);
          return {};
        },
        template: '<div />'
      })
    );

    await vi.advanceTimersByTimeAsync(100);
    wrapper.unmount();
    await vi.advanceTimersByTimeAsync(100);

    expect(callbackCount).toBe(1);
  });
});
