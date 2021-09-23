class Storage {
  type: string;
  expires: number;

  constructor(type = 'localStorage', expires = 24*60*365) {
    this.type = type;
    this.expires = expires;
  }

  get(key: string) {
    const source = JSON.parse(Reflect.get(window, this.type).getItem(key));
    const now = new Date().getTime();
    const expiresTime = source && source[`${key}__expires__`];

    if (now > expiresTime) {
      this.remove(key);
      return null;
    }

    return source[key];
  }

  /**
   * @param key
   * @param value
   * @param isExpires 是否允许过期
   */
  set(key: string, value: any, isExpires = true) {
    const source = {};
    Reflect.set(source, key, value);
    if (isExpires) {
      Reflect.set(
        source,
        `${key}__expires__`,
        new Date().getTime() + 1000 * 60 * this.expires
      );
    }
    Reflect.get(window, this.type).setItem(key, JSON.stringify(source));
  }

  remove(key: string) {
    Reflect.get(window, this.type).removeItem(key);
  }

  clear() {
    Reflect.get(window, this.type).clear();
  }
}

export default Storage;
