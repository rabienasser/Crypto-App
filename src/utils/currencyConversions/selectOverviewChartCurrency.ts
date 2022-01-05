import { MarketData } from "store/overview/types";

export const selectChartCurrency = (marketData: MarketData | null, currency: string, volume: boolean) => {
    switch (currency) {
       case "usd":
          return volume ? marketData?.total_volume.usd : marketData?.current_price.usd;
       case "gbp":
        return volume ? marketData?.total_volume.gbp : marketData?.current_price.gbp;
       case "eur":
        return volume ? marketData?.total_volume.eur : marketData?.current_price.eur;
       default:
        return volume ? marketData?.total_volume.jpy : marketData?.current_price.jpy;

    }
 };