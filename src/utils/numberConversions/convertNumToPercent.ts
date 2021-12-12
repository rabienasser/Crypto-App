export const convertNumToPercent = (num: number): string => {
   let progPercString: string = num.toString();
   switch(progPercString) {
      case '1':
      case 'Infinity':
      case '0':
      case 'NaN':
         progPercString = '100%'
      break;
      default: 
         progPercString = progPercString.split(".")[1].substr(0, 4);
         progPercString = parseInt(progPercString) / 100 + "%";

   }
   return progPercString
};