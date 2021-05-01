const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

// Load env vars
dotenv.config({ path: "./config/.env" });

const User = require("./models/User");
const Category = require("./models/Category");
const Comment = require("./models/Comment");
const Feeling = require("./models/Feeling");
const History = require("./models/History");
const Reply = require("./models/Reply");
const Subs = require("./models/Subscription");
const Video = require("./models/Video");
const Subscription = require("./models/Subscription");

//load the file constants
const commentsFile = `${__dirname}/_data/comments.json`;
const feelingsFile = `${__dirname}/_data/feelings.json`;
const historyFile = `${__dirname}/_data/history.json`;
const replyFile = `${__dirname}/_data/reply.json`;
const subsFile = `${__dirname}/_data/subs.json`;
const videoFile = `${__dirname}/_data/video.json`;
const usersFile = `${__dirname}/_data/users.json`;
const categoriesFile = `${__dirname}/_data/categories.json`;

// Connection to Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const importData = async () => {
  try {
    const users = JSON.parse(fs.readFileSync(usersFile, "utf-8"));
    const categories = JSON.parse(fs.readFileSync(categoriesFile, "utf-8"));
    const comments = JSON.parse(fs.readFileSync(commentsFile, "utf-8"));
    const feelings = JSON.parse(fs.readFileSync(feelingsFile, "utf-8"));
    const history = JSON.parse(fs.readFileSync(historyFile, "utf-8"));
    const reply = JSON.parse(fs.readFileSync(replyFile, "utf-8"));
    const subs = JSON.parse(fs.readFileSync(subsFile, "utf-8"));
    const videos = JSON.parse(fs.readFileSync(videoFile, "utf-8"));
    await User.create(users);
    await Category.create(categories);
    await Video.create(videos);
    await Subscription.create(subs);
    await Reply.create(reply);
    await History.create(history);
    await Feeling.create(feelings);
    await Comment.create(comments);
    console.log("Data Imported...".green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

const createFiles = async () => {
  fs.open(commentsFile, "w", function (err, file) {
    if (err) throw err;
  });
  fs.open(replyFile, "w", function (err, file) {
    if (err) throw err;
  });
  fs.open(videoFile, "w", function (err, file) {
    if (err) throw err;
  });
  fs.open(subsFile, "w", function (err, file) {
    if (err) throw err;
  });
  fs.open(feelingsFile, "w", function (err, file) {
    if (err) throw err;
  });
  fs.open(usersFile, "w", function (err, file) {
    if (err) throw err;
  });
  fs.open(categoriesFile, "w", function (err, file) {
    if (err) throw err;
  });
};

const backupData = async (query) => {
  try {
    if (isNaN(query.length)) {
      query = {};
    }
    let l = [1, 2, 3, 4, 5, 6, 7, 8];
    let commentResponse = await Comment.find(query.id);
    let videoResponse = await Video.find(query.id);
    let categoryResponse = await Category.find(query.id);
    let userResponse = await User.find(query.id);
    let replyResonse = await Reply.find(query.id);
    let feelingsReponse = await Feeling.find(query.id);
    let historyResponse = await History.find(query.id);
    let subResponse = await Subscription.find(query.id);
    console.log("0/" + l.length);
    fs.writeFileSync(commentsFile, JSON.stringify(commentResponse));
    console.log("1/" + l.length.toString());
    fs.writeFileSync(videoFile, JSON.stringify(videoResponse));
    console.log("2/" + l.length.toString());
    fs.writeFileSync(categoriesFile, JSON.stringify(categoryResponse));
    console.log("3/" + l.length.toString());
    fs.writeFileSync(usersFile, JSON.stringify(userResponse));
    console.log("4/" + l.length.toString());
    fs.writeFileSync(replyFile, JSON.stringify(replyResonse));
    console.log("5/" + l.length.toString());
    fs.writeFileSync(feelingsFile, JSON.stringify(feelingsReponse));
    console.log("6/" + l.length.toString());
    fs.writeFileSync(historyFile, JSON.stringify(historyResponse));
    console.log("7/" + l.length.toString());
    fs.writeFileSync(subsFile, JSON.stringify(subResponse));
    console.log("8/" + l.length.toString() + " Done!".green.inverse);
    process.exit();
  } catch (e) {
    console.log(e + "!".red.inverse);
    process.exit();
  }
};

const deleteData = async () => {
  try {
    await User.deleteMany();
    await Category.deleteMany();
    await Video.deleteMany();
    await Comment.deleteMany();
    await Subscription.deleteMany();
    await Reply.deleteMany();
    await History.deleteMany();
    await Feeling.deleteMany();
    console.log("Data Destroyed...".red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === "-i") {
  // node seeder -i
  importData();
} else if (process.argv[2] === "-d") {
  // node seeder -d
  deleteData();
} else if (process.argv[2] === "-b") {
  // node seeder -b
  createFiles().then(backupData(process.argv[3] ?? {}));
}
