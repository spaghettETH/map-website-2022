export const pxToRem = (px, base = 16) => {
    if (typeof px === 'string') return px
    return `${px / base}rem`
}