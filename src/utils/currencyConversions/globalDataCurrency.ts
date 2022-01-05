import { GlobalData } from "store/globalData/types";

export const globalMarketCap = (currency: string, globalData: GlobalData) => {
    switch (currency) {
       case "usd":
          return globalData.total_market_cap.usd;
       case "gbp":
          return globalData.total_market_cap.gbp;
       case "eur":
          return globalData.total_market_cap.eur;
       default:
          return globalData.total_market_cap.jpy;
    }
 };

 export const globalVolume = (currency: string, globalData: GlobalData) => {
    switch (currency) {
       case "usd":
          return globalData.total_volume.usd;
       case "gbp":
          return globalData.total_volume.gbp;
       case "eur":
          return globalData.total_volume.eur;
       default:
          return globalData.total_volume.jpy;
    }
 };