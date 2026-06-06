import { describe, expect, it } from 'vitest';

import { mount } from '@vue/test-utils';
import { defineComponent, nextTick } from 'vue';
import { useScreenSize } from '@/composables';

describe('useScreenSize', () => {
  it('tracks the current window size', async (): Promise<void> => {
    const wrapper = mount(
      defineComponent({
        setup() {
          return {
            screenSize: useScreenSize()
          };
        },
        template: '<output>{{ screenSize.width }}x{{ screenSize.height }}</output>'
      })
    );

    expect(wrapper.text()).toBe(`${window.innerWidth}x${window.innerHeight}`);

    window.dispatchEvent(new Event('resize'));
    await nextTick();

    expect(wrapper.text()).toBe(`${window.innerWidth}x${window.innerHeight}`);
  });
});
