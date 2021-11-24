/*
 * Title: Password Manager
 * Description: you can generate or manually create password for any website and store it
 * Author: Samin Yasar
 * Date: 02/December/2020
 */

// Dependencies
const { userInfo } = require("os");
const readLine = require("readline");
const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const dataLib = require("./helpers/data");
const generator = require("./helpers/generator");

// Module Scaffolding
const app = {};

// Configuration
app.config = {};

// Base Function
app.getPassword = () => {
  const myPassword = generator.pwdGenerate();
  return myPassword;
};

// define base function
app.baseFunction = () => {
  const commandLine = {
    create: "c",
    read: "r",
    update: "u",
    delete: "d",
    random: "1",
    manual: "2",
  };
  rl.question(
    `For create a new password press ${commandLine.create}
  For read existing data press ${commandLine.read}
  For update existing data press ${commandLine.update}
  For delete any data press ${commandLine.delete}
  `,
    (cmd) => {
      const command =
        typeof cmd === "string" && cmd.length > 0 ? cmd.toLowerCase() : false;
      if (command) {
        if (command === commandLine.create) {
          rl.question("What is the name of this website? ", (site) => {
            const siteName =
              typeof site === "string" && site.length > 0 && site.includes(".")
                ? site
                : false;
            if (siteName) {
              rl.question("What is the Email for this website? ", (email) => {
                const emailName =
                  typeof email === "string" &&
                  email.length > 0 &&
                  email.includes("@")
                    ? email
                    : false;
                if (emailName) {
                  rl.question(
                    "For random password press " +
                      commandLine.random +
                      "\nFor manual password press " +
                      commandLine.manual +
                      " ",
                    (pwdCmd) => {
                      const pwdCommand =
                        typeof pwdCmd === "string" && pwdCmd.length > 0
                          ? pwdCmd
                          : false;
                      if (pwdCommand === commandLine.random) {
                        const finalPassword = app.getPassword();
                        const allInfo = {
                          siteName,
                          emailName,
                          finalPassword,
                        };
                        const fileName = allInfo.siteName.slice(0, -4);
                        dataLib.createData(
                          "accounts",
                          fileName,
                          allInfo,
                          (err) => {
                            if (!err) {
                              rl.on("close", () => {
                                console.log(
                                  "Your Email Id is: " +
                                    allInfo.emailName +
                                    "\nYour website is: " +
                                    allInfo.siteName +
                                    "\nYour password is: " +
                                    allInfo.finalPassword
                                );
                              });
                            } else {
                              console.log(err);
                            }
                          }
                        );
                        rl.close();
                      } else if (pwdCommand === commandLine.manual) {
                        rl.question(
                          "Please enter your password. ",
                          (manualPwd) => {
                            const manualPassword =
                              typeof manualPwd === "string" &&
                              manualPwd.length > 0
                                ? manualPwd
                                : false;
                            if (manualPassword) {
                              const finalPassword = manualPassword;
                              const allInfo = {
                                siteName,
                                emailName,
                                finalPassword,
                              };
                              const fileName = allInfo.siteName.slice(0, -4);
                              dataLib.createData(
                                "accounts",
                                fileName,
                                allInfo,
                                (err) => {
                                  if (!err) {
                                    rl.on("close", () => {
                                      console.log(
                                        "Your Email Id is: " +
                                          allInfo.emailName +
                                          "\nYour website is: " +
                                          allInfo.siteName +
                                          "\nYour password is: " +
                                          allInfo.finalPassword
                                      );
                                    });
                                  } else {
                                    console.log(err);
                                  }
                                }
                              );
                              rl.close();
                            } else {
                              rl.on("close", () => {
                                console.log("Please Enter a valid password.");
                                process.exit(0);
                              });
                              rl.close();
                            }
                          }
                        );
                      } else {
                        rl.on("close", () => {
                          console.log("Please Enter a valid Command.");
                          process.exit(0);
                        });
                        rl.close();
                      }
                    }
                  );
                } else {
                  rl.on("close", () => {
                    console.log("Please enter your valid Email Id.");
                    process.exit(0);
                  });
                  rl.close();
                }
              });
            } else {
              rl.on("close", () => {
                console.log("Please enter a valid website name.");
                process.exit(0);
              });
              rl.close();
            }
          });
        } else if (command === commandLine.read) {
          rl.question(`Please enter the name of website. `, (site) => {
            const siteNameFile =
              typeof site === "string" && site.length > 0 ? site : false;
            if (siteNameFile) {
              dataLib.readData("accounts", siteNameFile, (err, data) => {
                if (!err) {
                  const userData = JSON.parse(data);
                  console.log(
                    "Your website is: " +
                      userData.siteName +
                      "\nYour Email Id is: " +
                      userData.emailName +
                      "\nYour password is: " +
                      userData.finalPassword
                  );
                  rl.close();
                } else {
                  rl.on("close", () => {
                    console.log("Error reading file. It may not exist.");
                    process.exit(0);
                  });
                  rl.close();
                }
              });
            } else {
              rl.on("close", () => {
                console.log("Please enter the name of the website.");
                process.exit(0);
              });
              rl.close();
            }
          });
        } else if (command === commandLine.delete) {
          rl.question(
            "Please enter the name of website that you want to delete. ",
            (dltSiteName) => {
              const deleteSiteName =
                typeof dltSiteName === "string" && dltSiteName.length > 0
                  ? dltSiteName
                  : false;
              if (deleteSiteName) {
                dataLib.deleteData("accounts", dltSiteName, (err) => {
                  rl.on("close", () => {
                    console.log(err);
                  });
                  rl.close();
                });
              } else {
                rl.on("close", () => {
                  console.log("Please enter the name of website.");
                  process.exit(0);
                });
                rl.close();
              }
            }
          );
        } else if (command === commandLine.update) {
          rl.question(
            "Please enter the name of website that you want to update. ",
            (editSite) => {
              const editSiteName =
                typeof editSite === "string" &&
                editSite.length > 0 &&
                editSite.includes(".")
                  ? editSite
                  : false;
              if (editSiteName) {
                rl.question("what is Email of this website? ", (email) => {
                  const emailName =
                    typeof email === "string" &&
                    email.length > 0 &&
                    email.includes("@")
                      ? email
                      : false;
                  if (emailName) {
                    rl.question(
                      "For random password press " +
                        commandLine.random +
                        "\nFor manual password press " +
                        commandLine.manual +
                        " ",
                      (pwdCmd) => {
                        const pwdCommand =
                          typeof pwdCmd === "string" && pwdCmd.length > 0
                            ? pwdCmd
                            : false;
                        if (pwdCommand === commandLine.random) {
                          const finalPassword = app.getPassword();
                          const allInfo = {
                            siteName: editSiteName,
                            emailName,
                            finalPassword,
                          };
                          const fileName = allInfo.siteName.slice(0, -4);
                          dataLib.updateData(
                            "accounts",
                            fileName,
                            allInfo,
                            (err) => {
                              if (!err) {
                                rl.on("close", () => {
                                  console.log(
                                    "Your Email Id is: " +
                                      allInfo.emailName +
                                      "\nYour website is: " +
                                      allInfo.editSiteName +
                                      "\nYour password is: " +
                                      allInfo.finalPassword
                                  );
                                });
                              } else {
                                console.log(err);
                              }
                            }
                          );
                          rl.close();
                        } else if (pwdCommand === commandLine.manual) {
                          rl.question(
                            "Please enter your password. ",
                            (manualPwd) => {
                              const manualPassword =
                                typeof manualPwd === "string" &&
                                manualPwd.length > 0
                                  ? manualPwd
                                  : false;
                              if (manualPassword) {
                                const finalPassword = manualPassword;
                                const allInfo = {
                                  siteName: editSiteName,
                                  emailName,
                                  finalPassword,
                                };
                                const fileName = allInfo.siteName.slice(0, -4);
                                dataLib.updateData(
                                  "accounts",
                                  fileName,
                                  allInfo,
                                  (err) => {
                                    if (!err) {
                                      rl.on("close", () => {
                                        console.log(
                                          "Your Email Id is: " +
                                            allInfo.emailName +
                                            "\nYour website is: " +
                                            allInfo.editSiteName +
                                            "\nYour password is: " +
                                            allInfo.finalPassword
                                        );
                                      });
                                    } else {
                                      console.log(err);
                                    }
                                  }
                                );
                                rl.close();
                              } else {
                                rl.on("close", () => {
                                  console.log("Please Enter a valid password.");
                                  process.exit(0);
                                });
                                rl.close();
                              }
                            }
                          );
                        } else {
                          rl.on("close", () => {
                            console.log("Please Enter a valid Command.");
                            process.exit(0);
                          });
                          rl.close();
                        }
                      }
                    );
                  } else {
                    rl.on("close", () => {
                      console.log("Please enter a valid Email Id.");
                      process.exit(0);
                    });
                    rl.close();
                  }
                });
              } else {
                rl.on("close", () => {
                  console.log("The entered name of file may not exist.");
                  process.exit(0);
                });
                rl.close();
              }
            }
          );
        } else {
          rl.on("close", () => {
            console.log("Please enter a command to start.");
            process.exit(0);
          });
          rl.close();
        }
      } else {
        rl.on("close", () => {
          console.log("Please enter a command to start.");
          process.exit(0);
        });
        rl.close();
      }
    }
  );
};

// initialize base function
app.baseFunction();
