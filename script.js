// 1. Написать функцию loop, которая будет принимать параметры: times (значение по умолчанию = 0), callback (значение по умолчанию = null) и будет в цикле (times раз), вызывать функцию callback. Если функция не передана, то цикл не должен отрабатывать ни разу. Покажите применение этой функции.

const loop = (times = 0, callback = null) => {
  if (!callback) {
    return;
  }

  for (let i = 0; i < times; i++) {
    callback();
  }
};

// loop(2, () => alert('hi'));

// 2. Написать функцию calculateArea, которая будет принимать параметры для вычисления площади (можете выбрать конкретную фигуру или, основываясь на переданных параметрах, выполнять требуемый алгоритм вычисления площади для переданной в параметрах фигуры) и возвращать объект вида: { area, figure, input } (где area – вычисленная площадь, figure – название фигуры, для которой вычислялась площадь, input – входные параметры, по которым было произведено вычисление.

const calculateArea = (figure, params = []) => {
  let s;
  switch (figure) {
    case 'circle':
      const [r] = params;
      s = Math.PI * r ^ 2;
      break;
    case 'triangle':
      const [a, h] = params;
      s = a * h / 2;
      break;
  }

  return {
    area: s,
    figure: figure,
    input: params
  };
};

// calculateArea('triangle', [3, 4]);


/*3. Необходимо написать иерархию классов вида:
  Human -> Employee -> Developer
Human -> Employee -> Manager
Каждый Менеджер (Manager) должен иметь внутренний массив своих сотрудников (разработчиков), а также методы по удалению и добавлению разработчиков.
  Каждый Разработчик (Developer) должны иметь ссылку на Менеджера и методы для изменения менеджера (имеется в виду возможность назначить другого менеджера).
У класса Human должны быть следующие параметры: name (строка), age (число), dateOfBirth (строка или дата).
У класса Employee должны присутствовать параметры: salary (число), department (строка).
  В классе Human должен присутствовать метод displayInfo, который возвращает строку со всеми параметрами экземпляра Human.
  В классе Employee должен быть реализован такой же метод (displayInfo), который вызывает базовый метод и дополняет его параметрами из экземпляра Employee.
  Чтобы вызвать метод базового класса, необходимо внутри вызова метода displayInfo класса Employee написать: super.displayInfo(). Это вызовет метод disaplyInfo класс Human и вернет строку с параметрами Human.*/

class Human {
  constructor(name, age, dateOfBirth) {
    this.name = name;
    this.age = age;
    this.dateOfBirth = dateOfBirth;
  }

  displayInfo() {
    return `${this.name}, ${this.age}, ${this.dateOfBirth}`;
  }
}

class Employee extends Human {
  constructor(name, age, dateOfBirth, salary, department) {
    super(name, age, dateOfBirth);
    this.salary = salary;
    this.department = department;
  }

  displayInfo() {
    return `${super.displayInfo()}, ${this.salary}, ${this.department}`;
  }
}

class Manager extends Employee {

}

class Developer extends Employee {

}


// 4. *При помощи генератора написать функцию-анкету, которая запрашивает у пользователя на ввод параметры и передает их в генератор. В конце, когда генератор завершается, он должен вернуть все введенные входные параметры в виде объекта. Этот объект нужно вывести в консоли.

function* generateSequence(count) {

  for (let i = 0; i < count; i++) {
    yield prompt('input parameters');
  }

}

// let sequence = [...generateSequence(5)];

// console.log(sequence);

/*5. *Написать цикл, который создает массив промисов. Внутри каждого промиса происходит обращение к ресурсу (https://jsonplaceholder.typicode.com/users/number), где вместо number подставляется число от 1 до 10. В итоге должно получиться 10 промисов. Следует дождаться выполнения загрузки всеми промисами и далее вывести массив загруженных данных.*/

function httpGet(url) {

  return new Promise(function (resolve, reject) {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function () {
      if (this.status === 200) {
        resolve(this.response);
      } else {
        var error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }
    };

    xhr.onerror = function () {
      reject(new Error("Network Error"));
    };

    xhr.send();
  });

}

let a = [];

for (let i = 1; i <= 10; i++) {
  httpGet('https://jsonplaceholder.typicode.com/users/' + i).then(response => a.push(response));
}

console.log(a);