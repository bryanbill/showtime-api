var pixels = require("image-pixels");

let b = async () =>
  await pixels(
    "public/uploads/thumbnails/thumbnail-608d59ab2f23920015aa80d7.jpg"
  ).then((d) => {
    let c = [];
    for (i in d) {
      c.push(i);
    }
    console.log(c);
  });
console.log(b());
