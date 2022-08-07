import { useMouse, useWindowSize } from '@vueuse/core'
import { computed } from 'vue'

export const useMouseParallax = () => {
    const { x, y } = useMouse()
    const { width, height } = useWindowSize()
    const normalizedX = computed(() => 2 * (x.value - width.value / 2) / width.value)
    const normalizedY = computed(() => 2 * (y.value - height.value / 2) / height.value)

    return { normalizedX, normalizedY }
}