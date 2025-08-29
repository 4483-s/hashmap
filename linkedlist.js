const linkedList = (function () {
  //accept a head node of a linked list, if head is falsy, return 0
  const getSize = (head) => {
    let count = 0;
    let currentNode = head;
    while (currentNode) {
      count++;
      currentNode = currentNode.nextNode;
    }
    return count;
  };
  //return the node at index n
  const at = (head, n) => {
    let currentNode = head;
    for (let i = 0; i <= n; i++) {
      if (i === n) {
        return currentNode;
      }
      currentNode = currentNode.nextNode;
    }
  };
  //only works if the head is a node object
  const append = (head, newNode) => {
    at(head, getSize(head) - 1).nextNode = newNode;
  };
  const findByKey = (head, key) => {
    const size = getSize(head);
    for (let i = 0; i < size; i++) {
      const currentNode = at(head, i);
      if (currentNode.key === key) {
        return currentNode;
      }
    }
    return null;
  };
  // not refactored
  const find = (key) => {
    for (let i = 0; i < size; i++) {
      if ((head, at(i).key === key)) {
        return i;
      }
    }
    return null;
  };

  return {
    append,
    at,
    getSize,
    findByKey,
  };
})();
// function Node(key, value) {
//   return { key, value, nextNode: null };
// }
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
  getLength() {
    let count = 0;
    let currentNode = this;
    while (currentNode) {
      count++;
      currentNode = currentNode.nextNode;
    }
    return count;
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
  get length() {
    return this.getLength();
  }
}

//
let loadFactor = 3 / 4;
// hashmap factory start
function HashMap() {
  let buckets = new Array(16).fill(null);
  let capacity = buckets.length;
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
  //hash function
  function hash(key) {
    let hashCode = 0;
    const primeNumber = 97;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
    }
    return hashCode;
  }
  // show hashmap
  function tempTest() {
    for (const b of buckets) {
      console.log(b);
    }
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
    for (const buk of buckets) {
      if (buk) count += buk.length;
    }
    return count;
  };
  const clear = () => {
    buckets.fill(null);
  };
  const getBucket = () => buckets;
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
    for (const b of buckets) {
      if (b) {
        const foundKey = b.find(key);
        if (foundKey) return true;
      }
    }
    return false;
  };
  const get = (key) => {
    for (const b of buckets) {
      if (b) {
        const foundKey = b.find(key);
        if (foundKey) {
          return foundKey.value;
        }
      }
    }
    return null;
  };
  const remove = (key) => {
    for (let i = 0; i < buckets.length; i++) {
      if (buckets[i]) {
        const result = buckets[i].removeByKey(key);
        if (typeof result === "object") {
          buckets[i] = result;
          return true;
        }
      }
    }
    return false;
  };
  return {
    remove,
    hash,
    clear,
    set,
    tempTest,
    length,
    getBucket,
    get,
    has,
    values,
    entries,
    keys,
  };
}
let m = HashMap();
for (let i = 0; i < 30; i++) {
  m.set(`${Math.random() * 100}`, `${Math.random() * 700}`);
}
