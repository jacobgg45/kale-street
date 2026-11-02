// Site-wide constants. Change the brand name or deposit here and it updates everywhere.

export const BRAND_NAME = 'Kale Street'

/** Refundable deposit per glass bottle, in dollars. Placeholder amount. */
export const BOTTLE_DEPOSIT = 2

/** Required on every page that shows the product. Do not edit the wording. */
export const FDA_WARNING =
  'WARNING: This product has not been pasteurized and therefore may contain harmful bacteria that can cause serious illness in children, the elderly, and persons with weakened immune systems.'

export const formatPrice = (dollars: number) => `$${dollars.toFixed(dollars % 1 === 0 ? 0 : 2)}`
