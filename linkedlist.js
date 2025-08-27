function LinkedList() {
  let headNode = null;
  let size = 0;
  const prepend = (key, value) => {
    const newNode = Node(key, value);
    if (!headNode) {
      headNode = newNode;
    } else {
      newNode.nextNode = headNode;
      headNode = newNode;
    }
    size++;
  };
  const getSize = () => {
    let count = 0;
    let currentNode = headNode;
    while (currentNode) {
      count++;
      currentNode = currentNode.nextNode;
    }
    return count;
  };
  const at = (n) => {
    if (n >= size || n < 0) {
      return undefined;
    }
    let currentNode = headNode;
    for (let i = 0; i <= n; i++) {
      if (i === n) {
        return currentNode;
      }
      currentNode = currentNode.nextNode;
    }
  };
  const append = (key, value) => {
    const newNode = Node(key, value);
    if (!size) {
      headNode = newNode;
    } else {
      at(size - 1).nextNode = newNode;
    }
    size++;
  };
  const pop = () => {
    if (!size) return;
    if (size === 1) {
      headNode = null;
    } else {
      let target = at(size - 2);
      target.nextNode = null;
    }
    size--;
  };
  const toString = () => {
    let result = "";
    for (let i = 0; i < size; i++) {
      result += `( ${at(i).key}  ${at(i).value}) -> `;
    }
    return result + "null";
  };
  const containsKey = (key) => {
    for (let i = 0; i < size; i++) {
      if (at(i).key === key) {
        return true;
      }
    }
    return false;
  };
  const find = (key) => {
    for (let i = 0; i < size; i++) {
      if (at(i).key === key) {
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
    prepend,
    at,
    pop,
    toString,
    containsKey,
    find,
    insertAt,
    removeAt,
    get head() {
      return headNode;
    },
    get tail() {
      const v = at(size - 1);
      return v ? v : null;
    },
    get size() {
      return size;
    },
  };
}
function Node(key, value) {
  return { key, value, nextNode: null };
}

//
let loadFactor = 3 / 4;
function HashMap() {
  const buckets = new Array(16);
  const getGrowNum = () => buckets.length * loadFactor;
  const length = () => {
    let count = 0;
    for (const buk of buckets) {
      if (buk) {
        count += buk.getSize();
      }
    }
    return count;
  };
  const clear = () => {
    buckets.fill();
  };
  function hash(key) {
    let hashCode = 0;

    const primeNumber = 97;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
      console.log(hashCode);
    }

    return hashCode;
  }
  return { hash };
}
