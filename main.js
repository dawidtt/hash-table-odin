class HashMap {
  constructor() {
    this.buckets = new Array(16).fill(null).map(() => []); // Each bucket is an array to handle collisions
    this.size = 0;
    this.loadFactor = 0.75;
  }

  reassign() {
    const oldBuckets = this.buckets;
    this.buckets = new Array(this.buckets.length * 2).fill(null).map(() => []); // Double the size
    this.size = 0; // Reset size and re-add entries to avoid double counting

    // Reinsert each key-value pair into the new bucket array
    oldBuckets.forEach((bucket) => {
      bucket.forEach(({ key, value }) => {
        this.set(key, value);
      });
    });
  }

  growHash() {
    if (this.size / this.buckets.length > this.loadFactor) {
      this.reassign(); // Resize and rehash only once
    }
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    return Math.abs(hashCode); // Ensure positive index
  }

  set(key, value) {
    const index = this.hash(key) % this.buckets.length;
    const bucket = this.buckets[index];

    // Check if key exists and update value if found
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        bucket[i].value = value;
        return;
      }
    }

    // If key doesn't exist, add new entry
    bucket.push({ key, value });
    this.size++;

    // Grow the hash map if needed
    this.growHash();
  }

  get(key) {
    const index = this.hash(key) % this.buckets.length;
    const bucket = this.buckets[index];

    for (const entry of bucket) {
      if (entry.key === key) {
        return entry.value;
      }
    }
    return null;
  }

  has(key) {
    return this.get(key) !== null;
  }

  remove(key) {
    const index = this.hash(key) % this.buckets.length;
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }
    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets = new Array(this.buckets.length).fill(null).map(() => []);
    this.size = 0;
  }

  keys() {
    const keys = [];
    this.buckets.forEach((bucket) => {
      bucket.forEach(({ key }) => keys.push(key));
    });
    return keys;
  }

  values() {
    const values = [];
    this.buckets.forEach((bucket) => {
      bucket.forEach(({ value }) => values.push(value));
    });
    return values;
  }

  entries() {
    const entries = [];
    this.buckets.forEach((bucket) => {
      bucket.forEach((entry) => entries.push(entry));
    });
    return entries;
  }
}

// Testing with the given data
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
console.log("Size:", test.length());
test.set("moon", "silver"); // This should trigger a resize
console.log("Size after resizing:", test.length());

console.log("Entries:", test.entries());
