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

//пример создания и наполнения колекции

// let collection = new IndexedMap();
// collection.set('name', 'sasha');
// collection.set('age', 24);
// collection.set('know', 'JS');


//примеры использования базовых методов колекции

// console.log(collection.size());
// console.log(collection.has('name'))
// console.log(collection.has('falseValue'))
// console.log(collection.get('name'))
// console.log(collection.get('falseValue'));
// console.log(collection.remove('age'));
// console.log(collection);