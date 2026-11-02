// All site data is MOCK for the MVP. Swap these exports for a real data source later.
export * from './types'
export { products } from './products'
export { markets } from './markets'
export { farms } from './farms'

import { farms } from './farms'
export const farmById = (id: string) => farms.find((f) => f.id === id)
