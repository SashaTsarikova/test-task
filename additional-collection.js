// Как в основном задании(2), только реализовать методы:
// union(объединение коллекций)
// unique(достать коллекцию уникальных значений)
// sortIndex(сортировать индексы, принимает callback)
// sort(сортировать значения, принимает callback)
// setTo(добавить после индекса)
// removeAt(удалить после индекса)


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

  union(...maps) {
    let currentCollection = this.collection;
    this.collection = maps.reduce((a,b) => a.concat(b.collection), currentCollection);
    return this.collection;
  }

  unique() {
    return this.collection.filter((elem, index) => {
      let valueCounts = 0;
      this.collection.forEach((el, index2) => {
        if (el.value === elem.value && index2 !== index) {
          valueCounts += 1;
        }
      })
      return !(valueCounts > 0)
    });
  }

  sort(callback) {
    return this.collection.sort(callback);
  }

  //не поняла техники работы метода

  sortIndexes(callback) {
    const indexesArr = Object.values(this.collection).map((el, index) => index);
    const newIndexedArr = indexesArr.sort(callback);

    const returnArr = [];
    newIndexedArr.forEach((elem) => {
      this.collection.forEach((el, index) => {
        if (index === elem) {
          returnArr.push(el);
        }
      })
    })
    return returnArr;
  }
    
  setTo(index, value) {
    this.collection[index].value = value;
  }

  removeAt(index, count = 1) {
    return this.collection.splice(index, count);
  }
}

let collec = new IndexedMap();
collec.set('name', 'sasha');
collec.set('age', 24);
collec.set('know', 'JS');

let collec2 = new IndexedMap();
collec2.set('name', 'vika');
collec2.set('age', 28);
collec2.set('know', 'JS');

collec2.set('name', 'Vova');
collec2.set('age', 29);
collec2.set('know', 'Angular');

collec.union(collec2)
// console.log(collec);
// console.log(collec.unique());
// console.log(collec.sort((a) => {
//   if (a.key === "age") return -1;
//   if (a.key === "name") return 0;
//   else { return 1}
// }));

// console.log(collec.sortIndexes((a, b) => {
//  return b-a
// }));

// collec.setTo(2, 'new value');
// console.log(collec);

// collec.removeAt(2);
// console.log(collec);