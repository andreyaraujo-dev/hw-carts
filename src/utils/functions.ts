export function formatCurrency(value: number): string {
  const valueFormatted = value.toLocaleString('pt-BR', {
    // style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  })

  return valueFormatted
}

export function formatCurrencyOnKeyUp(value: string) {
  let valueFormatted = value
  valueFormatted = valueFormatted.replace(/[\D]+/g, '')
  valueFormatted = valueFormatted.replace(/([0-9]{2})$/g, ',$1')

  if (valueFormatted.length > 6) {
    valueFormatted = valueFormatted.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2')
  }

  if (valueFormatted === 'NaN') return ''

  return valueFormatted
}
