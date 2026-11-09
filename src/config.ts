// Site-wide constants. Change the brand name or prices here and they update everywhere.

export const BRAND_NAME = 'Kale Street'

/** Off your next juice for each glass bottle you bring back ($12 → $11.50). Not a deposit: nothing is added at checkout. */
export const BOTTLE_RETURN_CREDIT = 0.5

/** Bundle pricing: 4 for $44, 5 for $55 — i.e. 4+ juices are $11 each. Shots don't count. */
export const BUNDLE_MIN_BOTTLES = 4
export const BUNDLE_BOTTLE_PRICE = 11

/** Delivery is offered on orders of at least this much (after bundle savings). */
export const DELIVERY_MINIMUM = 100

export const formatPrice = (dollars: number) => `$${dollars.toFixed(dollars % 1 === 0 ? 0 : 2)}`
