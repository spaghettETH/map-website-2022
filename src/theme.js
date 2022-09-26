import { pxToRem } from "./pxToRem"

export const screens = {
    xsOnly: { min: pxToRem(1), max: pxToRem(1) },
    beforeXs: { max: pxToRem(1) },
    xs: pxToRem(1),

    smOnly: { min: pxToRem(640), max: pxToRem(767) },
    beforeSm: { max: pxToRem(639) },
    sm: pxToRem(640),
    // => @media (min-width: 640px) { ... }

    mdOnly: { min: pxToRem(768), max: pxToRem(1023) },
    beforeMd: { max: pxToRem(767) },
    md: pxToRem(768),
    // => @media (min-width: 768px) { ... }

    lgOnly: { min: pxToRem(1024), max: pxToRem(1279) },
    beforeLg: { max: pxToRem(1023) },
    lg: pxToRem(1024),
    // => @media (min-width: 1024px) { ... }

    xlOnly: { min: pxToRem(1280), max: pxToRem(1537) },
    beforeXL: { max: pxToRem(1279) },
    xl: pxToRem(1280),
    // => @media (min-width: 1280px) { ... }

    '2xlOnly': { min: pxToRem(1538), max: pxToRem(2499) },
    before2xl: { max: pxToRem(1537) },
    '2xl': pxToRem(1538),
    // => @media (min-width: 1538px) { ... }

    '3xlOnly': { min: pxToRem(2500), max: pxToRem(9999999) },
    before3xl: { max: pxToRem(2499) },
    '3xl': pxToRem(2500)
    // => @media (min-width: 2500px) { ... }
}

export const flexGrid = {
    columns: 12,
    gutter: 48,
    container: {
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
        '2xl': 1536,
        '3xl': 2000
    }
}
export { pxToRem }

export default {
    flexGrid,
    screens
}
