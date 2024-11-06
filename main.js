class HashMap {
  constructor() {
    this.buckets = new Array(16).fill(null);
  }
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % 16;
    }

    return hashCode;
  }
  set(key, value) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    } else {
      this.buckets[index] = {};
      this.buckets[index][key] = value;
    }
  }
  get(key) {
    const index = this.hash(key);
    return this.buckets[index] ? this.buckets[index].value : null;
  }
  has(key) {
    const index = this.hash(key);
    if (
      typeof this.buckets[index] === "undefined" ||
      this.buckets[index] === null
    ) {
      return false;
    } else {
      return true;
    }
  }
  remove(key) {
    const index = this.hash(key);
    if (
      typeof this.buckets[index] === "undefined" ||
      this.buckets[index] === null
    ) {
      return false;
    } else {
      this.buckets[index] = null;
      return true;
    }
  }
  length() {
    let length = 0;
    this.buckets.forEach((bucket) => {
      if (bucket !== null) length++;
    });
    return length;
  }
  clear() {
    this.buckets = this.buckets.map((bucket) => {
      return null;
    });
  }
  keys() {
    let keys = [];
    this.buckets.forEach((bucket) => {
      if (bucket !== null) keys = keys.concat(Object.keys(bucket));
    });
    return keys;
  }
  values() {
    let values = [];
    this.buckets.forEach((bucket) => {
      if (bucket !== null) values = values.concat(Object.values(bucket));
    });
    return values;
  }
}

let hashMap = new HashMap();
hashMap.set("Carlos", "carlo");
console.log(hashMap);
console.log(hashMap.keys());
console.log(hashMap.values());

hashMap.clear();
console.log(hashMap);
console.log(hashMap.has("Carlos"));
