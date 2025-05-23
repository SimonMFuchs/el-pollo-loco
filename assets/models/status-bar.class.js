// status-bar.class.js

class StatusBar extends DrawableObject {
  x = 20;
  width = 188;
  height = 50;
  percentage = 100;

  constructor() {
    super();
  }

  // setPercentage(50)
  setPercentage(percentage) {
    this.percentage = percentage; // => 0... 5
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage >= 80 && this.percentage < 100) {
      return 4;
    } else if (this.percentage >= 60 && this.percentage < 80) {
      return 3;
    } else if (this.percentage >= 40 && this.percentage < 60) {
      return 2;
    } else if (this.percentage > 0 && this.percentage < 40) {
      return 1;
    } else {
      return 0;
    }
  }
}

// setPercentage(percentage) {
//   this.percentage = percentage; // => 0... 5

//   if (this.percentage <= 0) {
//     return imageNumber = 0;
//   } else if (this.percentage > 0 && this.percentage < 40) {
//     return imageNumber = 1;
//   } else if (this.percentage > 20 && this.percentage < 60) {
//     return imageNumber = 2;
//   } else if (this.percentage > 40 && this.percentage < 80) {
//     return imageNumber = 3;
//   } else if (this.percentage > 60 && this.percentage < 100) {
//     return imageNumber = 4;
//   } else {
//     return imageNumber = 5;
//   }
// }