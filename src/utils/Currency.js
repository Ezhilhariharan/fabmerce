export default function Currency(number) {
    const CURRENCY_FORMATTER = new Intl.NumberFormat('en-US', {
      currency: "USD", style: 'currency'
    })
    return (
      CURRENCY_FORMATTER.format(number)
    )
  }