// Card checks for the simulated checkout. Nothing here charges, stores or sends a card.

export type CardBrand = 'Visa' | 'Mastercard' | 'Amex' | 'Discover' | 'Card'

export const TEST_CARD = { number: '4242 4242 4242 4242', expiry: '12/30', cvc: '123', zip: '92618' }

export const digitsOnly = (value: string) => value.replace(/\D/g, '')

export function cardBrand(number: string): CardBrand {
  const d = digitsOnly(number)
  if (/^4/.test(d)) return 'Visa'
  if (/^(5[1-5]|2[2-7])/.test(d)) return 'Mastercard'
  if (/^3[47]/.test(d)) return 'Amex'
  if (/^6(011|5)/.test(d)) return 'Discover'
  return 'Card'
}

/** Groups digits the way they're printed on the card: 4-6-5 for Amex, 4-4-4-4 otherwise. */
export function formatCardNumber(value: string) {
  const d = digitsOnly(value)
  if (cardBrand(d) === 'Amex') {
    const v = d.slice(0, 15)
    return [v.slice(0, 4), v.slice(4, 10), v.slice(10)].filter(Boolean).join(' ')
  }
  return d.slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ')
}

export function formatExpiry(value: string) {
  const d = digitsOnly(value).slice(0, 4)
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d
}

/** Luhn checksum: catches typos the same way a real payment form does. */
export function isValidCardNumber(number: string) {
  const d = digitsOnly(number)
  const expectedLength = cardBrand(d) === 'Amex' ? 15 : 16
  if (d.length !== expectedLength) return false
  let sum = 0
  for (let i = 0; i < d.length; i++) {
    let n = Number(d[d.length - 1 - i])
    if (i % 2 === 1) {
      n *= 2
      if (n > 9) n -= 9
    }
    sum += n
  }
  return sum % 10 === 0
}

export function isValidExpiry(expiry: string, now = new Date()) {
  const m = /^(\d{2})\/(\d{2})$/.exec(expiry)
  if (!m) return false
  const month = Number(m[1])
  const year = 2000 + Number(m[2])
  if (month < 1 || month > 12) return false
  // Cards are valid through the last day of the expiry month.
  return new Date(year, month, 1) > now
}

export const isValidCvc = (cvc: string, number: string) =>
  new RegExp(`^\\d{${cardBrand(number) === 'Amex' ? 4 : 3}}$`).test(cvc)
