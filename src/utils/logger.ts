
class LoggerService {
  debugMode = false;

  constructor() {
    if (typeof window !== "undefined" && window) {
      this.debugMode =
        process.env.NODE_ENV === "development"
          ? true
          : JSON.parse(localStorage.getItem("app:debug") ?? "false");
    } else {
      this.debugMode = true;
    }
  }

  public get log(): Function {
    return this.debugMode ? console.log.bind(console) : (): void => {};
  }
  public get debug(): any {
    return this.debugMode ? console.debug.bind(console) : (): void => {};
  }
  public get info(): any {
    return this.debugMode ? console.info.bind(console) : (): void => {};
  }
  public get warn(): any {
    return this.debugMode ? console.warn.bind(console) : (): void => {};
  }

  public get error(): Function {
    return this.debugMode ? console.error.bind(console) : (): void => {};
  }

  public get table(): Function {
    return this.debugMode ? console.table.bind(console) : (): void => {};
  }
}

const logger = new LoggerService();

export default logger;
