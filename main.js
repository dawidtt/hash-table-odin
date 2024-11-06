class HashMap {
  constructor() {
    this.buckets = new Array(16).fill(null);
  }
  growHash() {
    const capacity = 0.75;
    let counter = 0;
    this.buckets.forEach((bucket) => {
      if (bucket !== null) counter++;
    });
    console.log(counter);
    console.log(Math.floor(this.buckets.length * capacity));
    if (counter > Math.floor(this.buckets.length * capacity))
      this.buckets.push(null);
  }
  hash(key) {
    this.growHash();
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    hashCode = hashCode % this.buckets.length;
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
  entries() {
    let entries = [];
    this.buckets.forEach((bucket) => {
      if (bucket !== null) entries = entries.concat(bucket);
    });
    return entries;
  }
}

const test = new HashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
console.log(test);

test.set("moon", "silver");

console.log(test);
