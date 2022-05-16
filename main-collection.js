// Написать коллекцию, в которой ключи будут хранится в строгом порядке, в
// зависимости от того, когда элемент был добавлен (что-то подобное Map, но с
// возможностью, обратится к элементу не только по ключу, но и по индексу).
// Реализовать методы set, has, get, remove

class IndexedMap {
  collection;

  constructor() {
    this.collection = [];
  }

  set(key, value) {
    this.collection.push({key: key, value: value});
  }

  has(key) {
    return this.collection.some((elem) => elem.key === key);
  }

  get(key) {
    return this.collection.find((elem) => elem.key === key) || null
  }

  remove(key) {
    let removedIndex =  this.getIndex(key);
    return removedIndex ? this.collection.splice(removedIndex, 1) : null;
  }
  size() {
    return this.collection.length;
  }

  getIndex(key) {
    if (this.get(key)) {
      return this.collection.at(this.get(key));
    } 
    return null;
  }
}

// let collec = new IndexedMap();
// collec.set('name', 'sasha');
// collec.set('age', 24);
// collec.set('know', 'JS');

// console.log(collec.size());
// console.log(collec.has('name'))
// console.log(collec.has('falseValue'))
// console.log(collec.get('name'))
// console.log(collec.get('falseValue'));
// console.log(collec.remove('age'));
// console.log(collec);