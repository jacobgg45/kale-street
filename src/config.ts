// Site-wide constants. Change the brand name or deposit here and it updates everywhere.

export const BRAND_NAME = 'Kale Street'

/** Refundable deposit per glass bottle, in dollars. */
export const BOTTLE_DEPOSIT = 0.5

/** Bundle pricing: 4 for $44, 5 for $55 — i.e. 4+ juices are $11 each. Shots don't count. */
export const BUNDLE_MIN_BOTTLES = 4
export const BUNDLE_BOTTLE_PRICE = 11

/** Delivery is offered on orders of at least this much (juice and shots, before deposit). */
export const DELIVERY_MINIMUM = 100

export const formatPrice = (dollars: number) => `$${dollars.toFixed(dollars % 1 === 0 ? 0 : 2)}`
