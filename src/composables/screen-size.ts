import { onMounted, onUnmounted, ref, type Ref } from 'vue';

export interface ScreenSize {
  width: number;
  height: number;
}

const RESIZE_EVENT = 'resize';
const ZERO_SCREEN_SIZE: ScreenSize = { width: 0, height: 0 };

const getScreenSize = (): ScreenSize => {
  if (typeof window === 'undefined') {
    return ZERO_SCREEN_SIZE;
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
};

export const useScreenSize = (): Ref<ScreenSize> => {
  const screenSize = ref<ScreenSize>(getScreenSize());

  const updateScreenSize = (): void => {
    screenSize.value = getScreenSize();
  };

  onMounted((): void => {
    updateScreenSize();
    window.addEventListener(RESIZE_EVENT, updateScreenSize);
  });

  onUnmounted((): void => {
    window.removeEventListener(RESIZE_EVENT, updateScreenSize);
  });

  return screenSize;
};
