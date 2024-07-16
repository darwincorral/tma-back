export class ConsoleDevelopment {
  constructor() {}

  log(...optionalParams: any[]) {
    optionalParams.map((co) => {
      console.log(co);
    });
  }
  logInfo(...optionalParams: any[]) {
    optionalParams.map((co) => {
      console.info(co);
    });
  }
  logDebug(...optionalParams: any[]) {
    optionalParams.map((co) => {
      console.debug(co);
    });
  }
  logWar(...optionalParams: any[]) {
    optionalParams.map((co) => {
      console.warn(co);
    });
  }
}
