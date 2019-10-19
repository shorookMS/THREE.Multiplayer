//Options
const star_age = ["early", "middle", "late", "dead"];
const star_color = ["yellow", "red", "blue", "white"];
const star_size = ["dwarf", "giant"];
const star_temp = [
  "1,800 - 3,500 °C",
  "3,500 - 5,000 °C",
  "5,000 - 7,300 °C",
  "4,000 - 150,000 °C",
  "7,300 - 200,000 °C"
];

dwarf = 3;
giant = 5;
//
const stars = [
  {
    name: "Yellow Dwarf Stars",
    temp: "5,000 - 7,300 °C",
    age: "early, middle",
    types: "G, F",
    lum: "0.6 - 5.0",
    rad: "0.96 - 1.4",
    mass: "0.8 - 1.4",
    examp: "Our Sun!"
  },
  {
    name: "Red Dwarf Stars",
    temp: "1,800 - 3,500 °C",
    age: "early, middle",
    types: "M",
    lum: "0.0001 - 0.08",
    rad: "0.12 - 0.7",
    mass: "0.08 - 0.45",
    examp: "Proxima Centauri"
  },

  {
    name: "Blue Giant Stars",
    temp: "7,300 - 200,000 °C",
    age: "early, middle",
    types: "O, B, A",
    lum: "5.0 - 9,000,000",
    rad: "1.4 - 250",
    mass: "1.4 - 265",
    examp: "Rigel"
  },
  {
    name: "Red Giant Stars",
    temp: "3,000 - 5,000 °C",
    age: "late",
    types: "M, K",
    lum: "100 - 1000",
    rad: " 20 - 100",
    mass: "0.3 - 10",
    examp: "Aldebaran"
  },

  {
    name: "White Dwarfs",
    temp: "4,000 - 150,000 °C",
    age: "dead, cooling",
    types: "D",
    lum: "0.0001 - 100",
    rad: "0.008 - 0.2",
    mass: "0.1 - 1.4",
    examp: "Sirius B"
  }
];

const star_example = [
  {
    color: "red",
    temp: "1,800 - 3,500 °C",
    age: "middle",
    size: "dwarf"
  },
  {
    color: "red",
    temp: "3,000 - 5,000 °C",
    age: "late",
    size: "giant"
  },
  {
    color: "yellow",
    temp: "5,000 - 7,300 °C",
    age: "early",
    size: "dwarf"
  },

  {
    color: "blue",
    temp: "7,300 - 200,000 °C",
    age: "middle",
    size: "giant"
  },

  {
    color: "white",
    temp: "4,000 - 150,000 °C",
    age: "dead",
    size: "dwarf"
  }
];

const q = {
  color: "red",
  temp: "1,800 - 3,500 °C",
  age: "middle",
  size: "dwarf"
};

// let question = `This system is in it's ${q.age} age stages and the star's temprature is ${} `

// var d = 10;
// let star_arr = star_example.map(star => {
//   let st = new THREE.Mesh(
//     new THREE.SphereGeometry(5, 32, 32),
//     new THREE.MeshBasicMaterial({
//       color: star.color
//     })
//   );

//   st.castShadow = false;
//   st.position.set();
//   return st;
// });
