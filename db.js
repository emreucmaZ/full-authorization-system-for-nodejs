const mongoose = require("mongoose");

// Mongoose bağlantı URL'sini ayarlayın
const connectionString = "your mongodb connection string";


// Mongoose bağlantısını oluşturun
mongoose
  .connect(connectionString)
  .then(() => {
    console.log("MongoDB bağlantısı başarılı");
  })
  .catch((error) => {
    console.error("MongoDB bağlantı hatası:", error);
  });
