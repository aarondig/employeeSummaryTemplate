// TODO: Write code to define and export the Employee class
class Shape {
    // Just like constructor functions, classes can accept arguments
    constructor(area, perimeter) {
      this.area = area;
      this.perimeter = perimeter;
    }
  
    printInfo() {
      console.log(`Area: ${this.area}`);
      console.log(`Perimeter: ${this.perimeter}`);
    }
  }