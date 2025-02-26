"use strict";

// Import dependencies and set up http server
const express = require("express"),
  { urlencoded, json } = require("body-parser"),
  crypto = require("crypto"),
  path = require("path"),
  GraphApi = require("../services/graph-api.js"),
  User = require("../services/user.js"),
  Gemini = require("../services/gemini.js"),
  config = require("../services/config.js"),
  i18n = require("../i18n.config.js"),
  app = express();

var users = {};

// Parse application/x-www-form-urlencoded
app.use(
  urlencoded({
    extended: true
  })
);

// Parse application/json. Verify that callback came from Facebook
app.use(json({ verify: verifyRequestSignature }));

// Serving static files in Express
app.use(express.static(path.join(path.resolve(), "public")));

// Set template engine in Express
app.set("view engine", "ejs");

app.get("/", (req, res) => res.send("Express on Vercel"));

// Add support for GET requests to our webhook
app.get("/webhook", (req, res) => {
  // Parse the query params
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Check if a token and mode is in the query string of the request
  if (mode && token) {
    // Check the mode and token sent is correct
    if (mode === "subscribe" && token === config.verifyToken) {
      // Respond with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Respond with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});

// Create the endpoint for your webhook
app.post("/webhook", (req, res) => {
  let body = req.body;

  // console.log(`\u{1F7EA} Received webhook:`);
  // console.dir(body, { depth: null });

  // Check if this is an event from a page subscription
  if (body.object === "page") {
    // Returns a '200 OK' response to all requests
    res.status(200).send("EVENT_RECEIVED");

    // Iterate over each entry - there may be multiple if batched
    body.entry.forEach(async function (entry) {
      // Iterate over webhook events - there may be multiple
      entry.messaging.forEach(async function (webhookEvent) {
        // console.log(webhookEvent);
        // Discard uninteresting events
        if ("read" in webhookEvent) {
          console.log("Got a read event");
          return;
        } else if ("delivery" in webhookEvent) {
          console.log("Got a delivery event");
          return;
        } else if (webhookEvent.message && webhookEvent.message.is_echo) {
          console.log(
            "Got an echo of our send, mid = " + webhookEvent.message.mid
          );
          return;
        }

        // Get the sender PSID
        let senderPsid = webhookEvent.sender.id;
        if (senderPsid != null && senderPsid != undefined) {
          // Make call to UserProfile API only if user is not guest
          if (!(senderPsid in users)) {
            users[senderPsid] = new User(senderPsid);
          }
          if (!("postback" in webhookEvent) && "text" in webhookEvent.message && !("quick_reply" in webhookEvent.message) ) {
            if (webhookEvent.message.text === "Choose category") {
              GraphApi.sendMsg(senderPsid);
            } else {
              GraphApi.sendResult(senderPsid ,"Please only type Choose category")
            }
          }
          else if ("postback" in webhookEvent ) {
            GraphApi.sendMsg(senderPsid);
          } else {
            switch (webhookEvent.message.quick_reply.payload) {
              case "Phone":
                GraphApi.sendMsg_Phone(senderPsid);
                break;
              case "Laptop":
                GraphApi.sendMsg_Laptop(senderPsid);
                break;
              case "Tablet":
                GraphApi.sendMsg_Tablet(senderPsid);
                break;
              case "Camera on Phone":
                GraphApi.sendMsg_Phone_Option1(senderPsid);
                users[senderPsid].setCategoryPhoneOption1("Camera on Phone");
                break;
              case "Gaming on Phone":
                GraphApi.sendMsg_Phone_Option1(senderPsid);
                users[senderPsid].setCategoryPhoneOption1("Gaming on Phone");
                break;
              case "Work on Phone":
                GraphApi.sendMsg_Phone_Option1(senderPsid);
                users[senderPsid].setCategoryPhoneOption1("Work on Phone");
                break;
              case "Below 6.3 inches":
                GraphApi.sendMsg_Phone_Option2(senderPsid);
                users[senderPsid].setCategoryPhoneOption2("Below 6.3 inches");
                break;
              case "Above 6.3 inches":
                GraphApi.sendMsg_Phone_Option2(senderPsid);
                users[senderPsid].setCategoryPhoneOption2("Above 6.3 inches");
                break;
              case "Android":
                var prompt = `I want you to recommend me a phone, i will ${users[
                  senderPsid
                ].getCategoryPhoneOption1()}, its screen size should be ${users[
                  senderPsid
                ].getCategoryPhoneOption2()} and should be an Android. Return me your response in less than 4000 characters, and with two options and with prices. Add the reason why each is a good choice. They should be able to be bought in Myanmar, and you dont need to explicitly tell it. Dont change the font to bold, and break line after subtitles (arrange as appropriately). Never give prices in Myanmar Kyats.`;
                Gemini.generateContent(senderPsid, prompt);
                break;
              case "iPhone":
                var prompt = `I want you to recommend me a phone, i will ${users[
                  senderPsid
                ].getCategoryPhoneOption1()}, its screen size should be ${users[
                  senderPsid
                ].getCategoryPhoneOption2()} and should be an iPhone. Return me your response in less than 4000 characters, and with two options and with prices. Add the reason why each is a good choice. They should be able to be bought in Myanmar, and you dont need to explicitly tell it. Dont change the font to bold, and break line after subtitles (arrange as appropriately). Never give prices in Myanmar Kyats.`;
                Gemini.generateContent(senderPsid, prompt);
                break;
              case "Gaming on Laptop":
                GraphApi.sendMsg_Laptop_Option1(senderPsid);
                users[senderPsid].setCategoryLaptopOption1("Gaming on Laptop");
                break;
              case "Study on Laptop":
                GraphApi.sendMsg_Laptop_Option1(senderPsid);
                users[senderPsid].setCategoryLaptopOption1("Study on Laptop");
                break;
              case "Work on Laptop":
                GraphApi.sendMsg_Laptop_Option1(senderPsid);
                users[senderPsid].setCategoryLaptopOption1("Work on Laptop");
                break;
              case "Below 14 inches":
                GraphApi.sendMsg_Laptop_Option2(senderPsid);
                users[senderPsid].setCategoryLaptopOption2("Below 14 inches");
                break;
              case "Above 15 inches":
                GraphApi.sendMsg_Laptop_Option2(senderPsid);
                users[senderPsid].setCategoryLaptopOption2("Above 15 inches");
                break;
              case "Above 16 inches":
                GraphApi.sendMsg_Laptop_Option2(senderPsid);
                users[senderPsid].setCategoryLaptopOption2("Above 16 inches");
                break;
              case "Powerful":
                var prompt = `I want you to recommend me a laptop, i will ${users[
                  senderPsid
                ].getCategoryLaptopOption1()}, its screen size should be ${users[
                  senderPsid
                ].getCategoryLaptopOption2()} and should be powerful for most games. Return me your response in less than 4000 characters, and with two options and with prices. Add the reason why each is a good choice. They should be able to be bought in Myanmar, and you dont need to explicitly tell it. Dont change the font to bold, and break line after subtitles (arrange as appropriately). Never give prices in Myanmar Kyats.`;
                Gemini.generateContent(senderPsid, prompt);
                break;
              case "Portable":
                var prompt = `I want you to recommend me a laptop, i will ${users[
                  senderPsid
                ].getCategoryLaptopOption1()}, its screen size should be ${users[
                  senderPsid
                ].getCategoryLaptopOption2()} and should be portable. Return me your response in less than 4000 characters, and with two options and with prices. Add the reason why each is a good choice. They should be able to be bought in Myanmar, and you dont need to explicitly tell it. Dont change the font to bold, and break line after subtitles (arrange as appropriately). Never give prices in Myanmar Kyats.`;
                Gemini.generateContent(senderPsid, prompt);
                break;
              case "Gaming on Tablet":
                GraphApi.sendMsg_Tablet_Option1(senderPsid);
                users[senderPsid].setCategoryTabletOption1("Gaming on Tablet");
                break;
              case "Study on Tablet":
                GraphApi.sendMsg_Tablet_Option1(senderPsid);
                users[senderPsid].setCategoryTabletOption1("Study on Tablet");
                break;
              case "Work on Tablet":
                GraphApi.sendMsg_Tablet_Option1(senderPsid);
                users[senderPsid].setCategoryTabletOption1("Work on Tablet");
                break;
              case "Below 9 inches":
                GraphApi.sendMsg_Tablet_Option2(senderPsid);
                users[senderPsid].setCategoryTabletOption2("Below 9 inches");
                break;
              case "11 inches":
                GraphApi.sendMsg_Tablet_Option2(senderPsid);
                users[senderPsid].setCategoryTabletOption2("11 inches");
                break;
              case "13 inches":
                GraphApi.sendMsg_Tablet_Option2(senderPsid);
                users[senderPsid].setCategoryTabletOption2("13 inches");
                break;
              case "Above 14 inches":
                GraphApi.sendMsg_Tablet_Option2(senderPsid);
                users[senderPsid].setCategoryTabletOption2("Above 14 inches");
                break;
              case "I own an Android phone":
                var prompt = `I want you to recommend me a tablet, i will ${users[
                  senderPsid
                ].getCategoryTabletOption1()}, its screen size should be ${users[
                  senderPsid
                ].getCategoryTabletOption2()} and I already have an Android phone. Return me your response in less than 4000 characters, and with two options and with prices. Add the reason why each is a good choice. They should be able to be bought in Myanmar. Dont, and you dont need to explicitly tell it change the font to bold, and break line after subtitles (arrange as appropriately). Never give prices in Myanmar Kyats.`;
                Gemini.generateContent(senderPsid, prompt);
                break;
              case "I own an iPhone":
                var prompt = `I want you to recommend me a tablet, i will ${users[
                  senderPsid
                ].getCategoryTabletOption1()}, its screen size should be ${users[
                  senderPsid
                ].getCategoryTabletOption2()} and I already have an iPhone. Return me your response in less than 4000 characters, and with two options and with prices. Add the reason why each is a good choice.  They should be able to be bought in Myanmar, and you dont need to explicitly tell it. Dont change the font to bold, and break line after subtitles (arrange as appropriately). Never give prices in Myanmar Kyats.`;
                Gemini.generateContent(senderPsid, prompt);
                break;
            }
          }
        }
      });
    });
  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
});

// Set up your App's Messenger Profile
app.get("/profile", (req, res) => {
  let token = req.query["verify_token"];
  let mode = req.query["mode"];

  if (!config.webhookUrl.startsWith("https://")) {
    res.status(200).send("ERROR - Need a proper API_URL in the .env file");
  }
  var Profile = require("../services/profile.js");
  Profile = new Profile();

  // Check if a token and mode is in the query string of the request
  if (mode && token) {
    if (token === config.verifyToken) {
      if (mode == "webhook" || mode == "all") {
        Profile.setWebhook();
        res.write(
          `<p>&#9989; Set app ${config.appId} call to ${config.webhookUrl}</p>`
        );
      }
      if (mode == "profile" || mode == "all") {
        Profile.setThread();
        res.write(
          `<p>&#9989; Set Messenger Profile of Page ${config.pageId}</p>`
        );
      }
      
      if (mode == "domains" || mode == "all") {
        Profile.setWhitelistedDomains();
        res.write(
          `<p>&#9989; Whitelisted domains: ${config.whitelistedDomains}</p>`
        );
      }
      if (mode == "private-reply") {
        Profile.setPageFeedWebhook();
        res.write(`<p>&#9989; Set Page Feed Webhook for Private Replies.</p>`);
      }
      res.status(200).end();
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  } else {
    // Returns a '404 Not Found' if mode or token are missing
    res.sendStatus(404);
  }
});

// Verify that the callback came from Facebook.
function verifyRequestSignature(req, res, buf) {
  var signature = req.headers["x-hub-signature"];

  if (!signature) {
    console.warn(`Couldn't find "x-hub-signature" in headers.`);
  } else {
    var elements = signature.split("=");
    var signatureHash = elements[1];
    var expectedHash = crypto
      .createHmac("sha1", config.appSecret)
      .update(buf)
      .digest("hex");
    if (signatureHash != expectedHash) {
      throw new Error("Couldn't validate the request signature.");
    }
  }
}

// Check if all environment variables are set
config.checkEnvVariables();

// Listen for requests :)
var listener = app.listen(config.port, function () {
  console.log(`The app is listening on port ${listener.address().port}`);
  if (
    config.appUrl &&
    config.verifyToken
  ) {
    console.log(
      "Is this the first time running?\n" +
        "Make sure to set the both the Messenger profile, persona " +
        "and webhook by visiting:\n" +
        config.appUrl +
        "/profile?mode=all&verify_token=" +
        config.verifyToken
    );
  }

  if (config.pageId) {
    console.log("Test your app by messaging:");
    console.log(`https://m.me/${config.pageId}`);
  }
});
