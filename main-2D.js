// 1. Нужно написать набор функций для управления объектом в 2D пространстве:
// Перемещение, поворот, перемещение с динамической скоростью(разбег-торможение).
// Функции должны выдавать массивы значений, для промежутка времени. Например:
// moveTo(from, to, duration, speed) и тд.

function moveTo(from, to, duration, speedOfPrerender) {
  if (speedOfPrerender > duration) return null;
  const partsToReshape = duration/speedOfPrerender;
  const finalArr = Array.from({length: partsToReshape}, (v, i) => i)
    .map((partNumber) => {
      return {
          position: getNewPositions(from, to, partsToReshape, partNumber),
          timeFromPreviousData: speedOfPrerender,
        }
      }
    )
  return finalArr;
}

function getNewPositions(from, to, partsToReshape, partNumber) {
  return from.map((positionsArr, index) => {
   let newArr = positionsArr.map((position, indexPos) => {
      const valueToAdd = ((to[index][indexPos] - position) / partsToReshape) * partNumber;
      return position+valueToAdd;
    });
  return newArr;
  });
}


function rotation(from, deg, duration, speedOfPrerender) {
  const to = findPositionWithDegree(from, deg);
  return moveTo(from, to, duration, speedOfPrerender);
}

function findPositionWithDegree(from, deg) {
 const radians = deg * Math.PI / 180;
 const width = from[0][0] + from[2][0];
 const height = from[0][1] + from[2][1];
 const centerX = width/2;
 const centerY = height/2;
 const centerPosition = [centerX, centerY];
 return from.map((positionsArr) => {
  let x = (Math.cos(radians) * (positionsArr[0] - centerPosition[0])) 
    - (Math.sin(radians) * (positionsArr[1] - centerPosition[1])) + centerPosition[0];
  let y = (Math.sin(radians) * (positionsArr[0] - centerPosition[0])) 
    +  (Math.cos(radians) * (positionsArr[1] - centerPosition[1])) + centerPosition[1];
  return [x, y];
 })
}


function moveToWithDynamicSpeed(from, to, duration, speedOfPrerender) {
  if (speedOfPrerender > duration) return null;
  const partsToReshape = duration/speedOfPrerender;
  const timeArrayFull = createTimeToAddArr(duration, partsToReshape);
  const finalArr = Array.from({length: partsToReshape}, (v, i) => i)
    .map((partNumber) => {
      return {
          position: getNewPositions(from, to, partsToReshape, partNumber),
          timeFromPreviousData: timeArrayFull[partNumber],
        }
      }
    )
  return finalArr;
}

function createTimeToAddArr(duration, partsToReshape) {
  let timeArrayPart2;
  const timeArrayPart1 = Array.from({length: Math.ceil(partsToReshape/2)}, (v, i) => i)
    .map(index => {
      const timeParts = Math.ceil(partsToReshape/2);
      const minTimePart = duration/findTimePartsCount(timeParts);
      return minTimePart*(index+1)
    });
  if (partsToReshape%2) {
    timeArrayPart2 = [...timeArrayPart1].splice(0, timeArrayPart1.length-1).reverse();
  } else {
    timeArrayPart2 = [...timeArrayPart1].reverse();
  }
  return timeArrayPart1.concat(timeArrayPart2);
}

function findTimePartsCount(timeParts) {
  if (timeParts === 1) {
    return timeParts;
  } else {
    return timeParts+findTimePartsCount( timeParts-1 )
  }
}


const fromArr= [
  [2, 2], // topRight
  [2, 0], // bottomRight
  [0, 0], // bottomLeft
  [0, 2] // topLeft
]

const toArr = [
  [6, 6], // topRight
  [6, 4], // bottomRight
  [4, 4], // bottomLeft
  [4, 6] // topLeft
]

// примеры вызова функций

// console.log(moveTo(fromArr, toArr, 5000, 500));
// console.log(rotation(fromArr, 45, 5000, 1000))
// console.log(moveToWithDynamicSpeed(fromArr, toArr, 1500, 500))