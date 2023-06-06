enum StorageType {
  l = 'localStorage',
  s = 'sessionStorage',
}

class MBTStorage {
  constructor(type: StorageType) {
    this.storage = type === StorageType.l ? window.localStorage : window.sessionStorage
  }
  storage = window.localStorage
  set(key: string, value: any) {
    const data = JSON.stringify(value)
    this.storage.setItem(key, data)
  }
  get(key: string) {
    const value = this.storage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }
  delete(key: string) {
    this.storage.removeItem(key)
  }
  clear() {
    this.storage.clear()
  }
}

const LStorage = new MBTStorage(StorageType.l)
const SStorage = new MBTStorage(StorageType.s)

export { LStorage, SStorage }