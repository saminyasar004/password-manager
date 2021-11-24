/*
 * Title: Data Handle
 * Description: handle data of this project (CRUD)
 * Author: Samin Yasar
 * Date: 02/December/2020
 */

// Dependencies
const fs = require("fs");
const path = require("path");

// Module Scaffolding
const dataLib = {};

// Configuration
dataLib.config = {};

// difine the base directory
dataLib.baseDir = path.join(__dirname + "./../.data/");

// create data to file
dataLib.createData = (dir, file, data, callBack) => {
  // open file for writing
  fs.open(
    dataLib.baseDir + dir + "/" + file + ".json",
    "wx",
    (err, fileDescriptor) => {
      if (!err && fileDescriptor) {
        // convert JSON data to string
        const stringData = JSON.stringify(data);
        // write data to file then close it
        fs.writeFile(fileDescriptor, stringData, (err) => {
          if (!err) {
            fs.close(fileDescriptor, (err) => {
              if (!err) {
                callBack("File created successfully!");
              } else {
                callBack("Error closing the new file.");
              }
            });
          } else {
            callBack("Error writing to new file");
          }
        });
      } else {
        callBack("Could not create a new file, it may already exist.");
      }
    }
  );
};

// read existing file data
dataLib.readData = (dir, file, callBack) => {
  fs.readFile(
    dataLib.baseDir + dir + "/" + file + ".json",
    "utf-8",
    (err, data) => {
      callBack(err, data);
    }
  );
};

// update existing file data
dataLib.updateData = (dir, file, data, callBack) => {
  fs.open(
    dataLib.baseDir + dir + "/" + file + ".json",
    "r+",
    (err, fileDescriptor) => {
      if (!err && fileDescriptor) {
        const stringData = JSON.stringify(data);
        fs.ftruncate(fileDescriptor, (err) => {
          if (!err) {
            fs.writeFile(fileDescriptor, stringData, (err) => {
              if (!err) {
                fs.close(fileDescriptor, (err) => {
                  if (!err) {
                    callBack("Successfully updated file.");
                  } else {
                    callBack("Error closing file.");
                  }
                });
              } else {
                callBack("Error writing file.");
              }
            });
          } else {
            callBack("Error truncating file.");
          }
        });
      } else {
        callBack("Error opening file.");
      }
    }
  );
};

// delete existing file data
dataLib.deleteData = (dir, file, callBack) => {
  // unlink the following file
  fs.unlink(dataLib.baseDir + dir + "/" + file + ".json", (err) => {
    if (!err) {
      callBack("Successfully deleted file data.");
    } else {
      callBack("Error deleting file data. It may not exist.");
    }
  });
};

// Export Module
module.exports = dataLib;
