//#region angular imports
//#endregion angular imports

//#region core imports
//#endregion core imports

//#region functional/model imports
//#endregion functional/model imports

export class CustomStorage implements Storage {

  //#region model properties

  private data: Map<string, string>;

  //#endregion model properties

  //#region constructor

  constructor() {
    this.data = new Map<string, string>();
  }

  //#endregion constructor

  //#region read only ptoperties

  get length(): number {
    return this.data.size;
  }

  //#endregion read only properties

  //#region public functions

  /**
   * clears all items from the store
   */
  public clear(): void {
    this.data = new Map<string, string>();
  }

  /**
   * gets value by key
   * @param key
   */
  public getItem(key: string): string {
    let value: string = null;
    if (key) {
      if (this.data.has(key)) {
        return this.data.get(key);
      }
    }
    return value;
  }

  /**
   * gets key name based on the index
   * @param index
   */
  public key(index: number): string | null {
    if (index && index >= 0 && index < this.data.size) {
      return this.data.keys[index];
    }
    return null;
  }

  /**
   * creates/updates data in the store wrt key
   * @param key
   * @param value
   */
  public setItem(key: string, value: string): void {
    if (key) {
      this.data.set(key, value);
    }
  }

  /**
   * removes entry from store
   * @param key
   */
  public removeItem(key: string): void {
    this.data.delete(key);
  }

  //#endregion public functions

  //#region private functions
  //#endregion private functions

}
