const gh = require("gh-pages");
const path = require("path");

gh.publish(path.join(__dirname, "dist"), (err) => {
  if (err) {
    console.log("An error ocurred:");
    console.log(err);
    throw err;
  }
  console.log("Success Publish!");
});
