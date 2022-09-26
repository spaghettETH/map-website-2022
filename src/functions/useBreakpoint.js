import { screens } from '../theme'
import { ref } from 'vue'
import { tryOnMounted } from '@vueuse/shared'
import { useEventListener } from '@vueuse/core'

/**
 *
 * @returns {Object} an object containing all breakpoint names with their trus/state state
 */
export const useBreakpoint = () => {
    const matches = ref({})

    const update = () => {
        Object.entries(screens).forEach(([name, size]) => {
            let mediaQuery
            if (typeof size === 'string') {
                mediaQuery = `(min-width: ${size})`
            } else {
                if (size.max && size.min) {
                    mediaQuery = `(max-width: ${size.max}) and (min-width: ${size.min})`
                } else {
                    mediaQuery = `(max-width: ${size.max})`
                }
            }
            matches.value[name] = window.matchMedia(mediaQuery).matches
        })
    }

    update()
    tryOnMounted(update)
    useEventListener('resize', update, { passive: true })

    return matches
}
