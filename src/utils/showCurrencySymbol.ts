export const showCurrencySymbol = (currency: string) => {
    switch (currency) {
       case "usd":
          return "$";
       case "gbp":
          return "£";
       case "eur":
          return "€";
       default:
          return "¥";
    }
 };