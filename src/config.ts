// Site-wide constants. Change the brand name or deposit here and it updates everywhere.

export const BRAND_NAME = 'Kale Street'

/** Refundable deposit per glass bottle, in dollars. */
export const BOTTLE_DEPOSIT = 0.5

export const formatPrice = (dollars: number) => `$${dollars.toFixed(dollars % 1 === 0 ? 0 : 2)}`
