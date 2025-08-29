class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.nextNode = null;
  }
  forEach(callback) {
    callback(this);
    if (this.nextNode) {
      this.nextNode.forEach(callback);
    }
  }
  append(newNode) {
    let currentNode = this;
    while (currentNode.nextNode) {
      currentNode = currentNode.nextNode;
    }
    currentNode.nextNode = newNode;
  }
  find(key) {
    if (this.key === key) {
      return this;
    } else if (this.nextNode) {
      return this.nextNode.find(key);
    } else {
      return null;
    }
  }
  removeByKey(key) {
    if (this.key === key) {
      return this.nextNode;
    }
    let currentNode = this;
    while (currentNode.nextNode) {
      if (currentNode.nextNode.key === key) {
        currentNode.nextNode = currentNode.nextNode.nextNode;
        return this;
      }
      currentNode = currentNode.nextNode;
    }
    return false;
  }
}

// hashmap factory start
function HashMap() {
  let buckets = new Array(16).fill(null);
  let capacity = buckets.length;
  let loadFactor = 3 / 4;
  //utils
  //
  const getGrowNum = () => buckets.length * loadFactor;
  const checkGrow = () => {
    const num = getGrowNum();
    const len = length();
    return len >= num;
  };
  const grow = () => {
    capacity = capacity * 2;
    let newArr = new Array(capacity).fill(null);
    for (const b of buckets) {
      if (b) {
        b.forEach((v) => {
          setNewItem(newArr, v.key, v.value);
        });
      }
    }
    buckets = newArr;
  };
  const setNewItem = (arr, key, value, checkExsisting = false) => {
    const bIndex = hash(key);
    if (!arr[bIndex]) {
      arr[bIndex] = new Node(key, value);
      return;
    }
    //if checkExsisting is true, check if the key already exists, if so, update the value and exit, otherwise, append to the bucket
    if (checkExsisting) {
      const foundKey = arr[bIndex].find(key);
      if (foundKey) {
        foundKey.value = value;
        return;
      }
    }
    const newNode = new Node(key, value);
    arr[bIndex].append(newNode);
  };
  //generate bucket index for an element
  function hash(key) {
    let hashCode = 0;
    const primeNumber = 97;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
    }
    return hashCode;
  }
  //
  // HashMap methods
  //
  const set = (key, value) => {
    if (checkGrow()) {
      grow();
    }
    setNewItem(buckets, key, value, true);
  };
  //count keys in the whole hashtable
  const length = () => {
    let count = 0;
    for (const b of buckets) {
      if (b)
        b.forEach((v) => {
          count++;
        });
    }
    return count;
  };
  const clear = () => {
    buckets.fill(null);
  };
  const values = () => {
    const arr = [];
    for (const b of buckets) {
      if (b) {
        b.forEach((v) => {
          arr.push(v.value);
        });
      }
    }
    return arr;
  };
  const entries = () => {
    const arr = [];
    for (const b of buckets) {
      if (b) {
        b.forEach((v) => {
          arr.push([v.key, v.value]);
        });
      }
    }
    return arr;
  };
  const keys = () => {
    const arr = [];
    for (const b of buckets) {
      if (b) {
        b.forEach((v) => {
          arr.push(v.key);
        });
      }
    }
    return arr;
  };
  const has = (key) => {
    const bIndex = hash(key);
    if (buckets[bIndex]) {
      const foundKey = buckets[bIndex].find(key);
      return !!foundKey;
    }
    return false;
  };
  const get = (key) => {
    const bIndex = hash(key);
    if (buckets[bIndex]) {
      const result = buckets[bIndex].find(key);
      return result ? result.value : null;
    }
  };
  const remove = (key) => {
    const bIndex = hash(key);
    if (buckets[bIndex]) {
      const result = buckets[bIndex].removeByKey(key);
      if (typeof result === "object") {
        buckets[bIndex] = result;
        return true;
      }
    }
    return false;
  };
  return {
    remove,
    hash,
    clear,
    set,
    length,
    get,
    has,
    values,
    entries,
    keys,
  };
}
let test = HashMap();
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
