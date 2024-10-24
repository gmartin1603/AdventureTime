export class DateService {
  static getDueDate(day: number) {
    switch (day) {
      case 1:
        return "1st";
      case 2:
        return "2nd";
      case 3:
        return "3rd";
      case 21:
        return "21st";
      case 22:
        return "22nd";
      case 23:
        return "23rd";
      case 31:
        return "31st";
      default:
        return `${day}th`;
    }
  }

  static getTargetMonth(): [number, string] {
    const monthArg: number = Deno.args.indexOf("--month");

    if (monthArg === -1 || Deno.args.length <= monthArg + 1) {
      return [new Date().getMonth() + 1, "Current Month"];
    }

    const monthInput: string = Deno.args[monthArg + 1].toLowerCase();

    if (
      monthInput.includes("jan") || monthInput === "1" || monthInput === "01"
    ) {
      return [1, "January"];
    } else if (
      monthInput.includes("feb") || monthInput === "2" || monthInput === "02"
    ) {
      return [2, "February"];
    } else if (
      monthInput.includes("mar") || monthInput === "3" || monthInput === "03"
    ) {
      return [3, "March"];
    } else if (
      monthInput.includes("apr") || monthInput === "4" || monthInput === "04"
    ) {
      return [4, "April"];
    } else if (
      monthInput.includes("may") || monthInput === "5" || monthInput === "05"
    ) {
      return [5, "May"];
    } else if (
      monthInput.includes("jun") || monthInput === "6" || monthInput === "06"
    ) {
      return [6, "June"];
    } else if (
      monthInput.includes("jul") || monthInput === "7" || monthInput === "07"
    ) {
      return [7, "July"];
    } else if (
      monthInput.includes("aug") || monthInput === "8" || monthInput === "08"
    ) {
      return [8, "August"];
    } else if (
      monthInput.includes("sep") || monthInput === "9" || monthInput === "09"
    ) {
      return [9, "September"];
    } else if (monthInput.includes("oct") || monthInput === "10") {
      return [10, "October"];
    } else if (monthInput.includes("nov") || monthInput === "11") {
      return [11, "November"];
    } else if (monthInput.includes("dec") || monthInput === "12") {
      return [12, "December"];
    } else {
      return [new Date().getMonth() + 1, "Current Month"];
    }
  }
}
