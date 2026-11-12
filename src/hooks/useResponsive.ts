import { useWindowDimensions } from 'react-native';

const BREAKPOINT_DESKTOP = 768;

export function useResponsive() {
  const { width, height } = useWindowDimensions();
  const isDesktop = width >= BREAKPOINT_DESKTOP;

  return {
    width,
    height,
    isDesktop,
    isMobile: !isDesktop,
    colWidth: isDesktop ? (width - 60) / 2 : width - 40,
  };
}
