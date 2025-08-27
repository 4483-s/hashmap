function LinkedList() {
  let headNode = null;
  const prepend = (key, value) => {
    const newNode = Node(key, value);
    if (!headNode) {
      headNode = newNode;
    } else {
      newNode.nextNode = headNode;
      headNode = newNode;
    }
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
    if (n >= getSize() || n < 0) {
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
    const size = getSize();
    const newNode = Node(key, value);
    if (!size) {
      headNode = newNode;
      return;
    }
    at(size - 1).nextNode = newNode;
  };
  const pop = () => {
    const size = getSize();
    if (!size) return;
    if (size === 1) {
      headNode = null;
      return;
    }
    let target = at(size - 2);
    target.nextNode = null;
  };
  const toString = () => {
    const size = getSize();
    let result = "";
    for (let i = 0; i < size; i++) {
      result += `( ${at(i).value} ) -> `;
    }
    return result + "null";
  };
  const contains = (key) => {
    const size = getSize();
    for (let i = 0; i < size; i++) {
      if (at(i).key === key) {
        return true;
      }
    }
    return false;
  };
  const find = (key) => {
    const size = getSize();
    for (let i = 0; i < size; i++) {
      if (at(i).key === key) {
        return i;
      }
    }
    return null;
  };
  const insertAt = (key, value, index) => {
    const newNode = Node(key, value);
    if (!headNode) {
      headNode = newNode;
      return;
    }
    const size = getSize();
    const preNode = at(index - 1);
    if (at(index)) {
      newNode.nextNode = at(index);
    }
    if (preNode) {
      preNode.nextNode = newNode;
    } else {
      at(size - 1).nextNode = newNode;
    }
  };
  const removeAt = (index) => {
    if (index === 0) {
      headNode = headNode.nextNode;
    } else if (at(index)) {
      at(index - 1).nextNode = at(index + 1) ? at(index + 1) : null;
    }
  };

  return {
    append,
    prepend,
    at,
    pop,
    toString,
    contains,
    find,
    insertAt,
    removeAt,
    get head() {
      return headNode;
    },
    get tail() {
      const v = at(getSize() - 1);
      return v ? v : null;
    },
    get size() {
      return getSize();
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
  const getGrow = () => buckets.length * loadFactor;
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
