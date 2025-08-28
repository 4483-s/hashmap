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
    const size = getSize(head);
    if (n >= size || n < 0) {
      return undefined;
    }
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
  const insertAt = (key, value, index) => {
    if (index < 0) {
      console.error("Fatal Error: Invalid index, exiting.");
      return;
    }
    const newNode = Node(key, value);
    if (!headNode) {
      headNode = newNode;
      size++;
      return;
    }
    const preNode = at(index - 1);
    if (at(index)) {
      newNode.nextNode = at(index);
    }
    if (preNode) {
      preNode.nextNode = newNode;
    } else if (size === 1) {
      headNode = newNode;
    } else {
      at(size - 1).nextNode = newNode;
    }
    size++;
  };
  const removeAt = (index) => {
    if (index === 0) {
      headNode = headNode.nextNode;
      size--;
    } else if (at(index)) {
      at(index - 1).nextNode = at(index + 1) ? at(index + 1) : null;
      size--;
    }
  };

  return {
    append,
    at,
    getSize,
    findByKey,
  };
})();
function Node(key, value) {
  return { key, value, nextNode: null };
}

//
let loadFactor = 3 / 4;
function HashMap() {
  let buckets = new Array(16 * 4);
  //utils
  //
  const getGrowNum = () => buckets.length * loadFactor;
  const checkAndGrow = () => {
    const num = getGrowNum();
    const len = length();
    if (len >= num) {
      buckets = [...buckets, ...new Array(buckets.length).fill(null)];
    }
  };
  function hash(key) {
    let hashCode = 0;
    const primeNumber = 97;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % buckets.length;
    }
    return hashCode;
  }
  function tempTest() {
    for (const b of buckets) {
      console.log(b);
    }
  }
  // HashMap methods
  //
  const set = (key, value) => {
    const bIndex = hash(key);
    if (!buckets[bIndex]) {
      buckets[bIndex] = Node(key, value);
    } else if (linkedList.findByKey(buckets[bIndex], key)) {
      const targetNode = linkedList.findByKey(buckets[bIndex], key);
      targetNode.value = value;
    } else {
      const newNode = Node(key, value);
      linkedList.append(buckets[bIndex], newNode);
    }
    checkAndGrow();
  };
  //count keys in the whole hashtable
  const length = () => {
    let count = 0;
    for (const buk of buckets) {
      count += linkedList.getSize(buk);
    }
    return count;
  };
  const clear = () => {
    buckets.fill(null);
  };
  return { hash, clear, set, tempTest, length };
}
let n = HashMap();
console.log(n.hash("a"));
