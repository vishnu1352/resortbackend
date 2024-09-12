const mongoose = require("mongoose");
// const DB = 'mongodb+srv://vishnuvardhan18100:guBNBvfK0mfxVinx@cluster0.qzpvnrk.mongodb.net/radhikaworks?retryWrites=true&w=majority&appName=Cluster0'
const DB = process.env.DATABASE;
mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("db connection established"))
  .catch((err) => {
    console.log(err);
  });
