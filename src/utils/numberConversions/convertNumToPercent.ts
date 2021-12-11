export const convertNumToPercent = (num: number): string => {
    let progPercString: string = num.toString();
    if (
       progPercString === "1" ||
       progPercString === "Infinity" ||
       progPercString === "0" ||
       progPercString === "NaN"
    ) {
       progPercString = "100%";
    } else {
       progPercString = progPercString.split(".")[1].substr(0, 4);
       progPercString = parseInt(progPercString) / 100 + "%";
    }
    return progPercString;
 };