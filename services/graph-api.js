"use strict";

// Imports dependencies
const config = require("./config"),
  fetch = require("node-fetch");

module.exports = class GraphApi {
  static async sendRequestToFB(request_json) {
    try {
      let response = await fetch(`${config.apiUrl}/me/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request_json)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.text}`);
      }
      let data = await response.json();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  static async sendMsg(psid) {
    let request_json = {
      recipient: { id: psid },
      messaging_type: "RESPONSE",
      message: {
        text: "Category",
        quick_replies: [
          {
            content_type: "text",
            title: "Laptop",
            payload: "Laptop"
          },
          {
            content_type: "text",
            title: "Phone",
            payload: "Phone"
          },
          {
            content_type: "text",
            title: "Tablet",
            payload: "Tablet"
          }
        ]
      },
      access_token: config.pageAccesToken
    };

    await this.sendRequestToFB(request_json);
  }

  static async sendMsg_Phone(psid) {
    let request_json = {
      recipient: { id: psid },
      messaging_type: "RESPONSE",
      message: {
        text: "What will you use the phone mostly for?",
        quick_replies: [
          {
            content_type: "text",
            title: "Camera on Phone",
            payload: "Camera on Phone"
          },
          {
            content_type: "text",
            title: "Gaming on Phone",
            payload: "Gaming on Phone"
          },
          {
            content_type: "text",
            title: "Work on Phone",
            payload: "Work on Phone"
          }
        ]
      },
      access_token: config.pageAccesToken
    };

    await this.sendRequestToFB(request_json);
  }

  static async sendMsg_Phone_Option1(psid) {
    let request_json = {
      recipient: { id: psid },
      messaging_type: "RESPONSE",
      message: {
        text: "Screen size?",
        quick_replies: [
          {
            content_type: "text",
            title: "Below 6.3 inches",
            payload: "Below 6.3 inches"
          },
          {
            content_type: "text",
            title: "Above 6.3 inches",
            payload: "Above 6.3 inches"
          }
        ]
      },
      access_token: config.pageAccesToken
    };

    await this.sendRequestToFB(request_json);
  }

  static async sendMsg_Phone_Option2(psid) {
    let request_json = {
      recipient: { id: psid },
      messaging_type: "RESPONSE",
      message: {
        text: "Android or iPhone?",
        quick_replies: [
          {
            content_type: "text",
            title: "Android",
            payload: "Android"
          },
          {
            content_type: "text",
            title: "iPhone",
            payload: "iPhone"
          }
        ]
      },
      access_token: config.pageAccesToken
    };

    await this.sendRequestToFB(request_json);
  }

  static async sendMsg_Laptop(psid) {
    let request_json = {
      recipient: { id: psid },
      messaging_type: "RESPONSE",
      message: {
        text: "What will you use the laptop mostly for?",
        quick_replies: [
          {
            content_type: "text",
            title: "Gaming on Laptop",
            payload: "Gaming on Laptop"
          },
          {
            content_type: "text",
            title: "Study on Laptop",
            payload: "Study on Laptop"
          },
          {
            content_type: "text",
            title: "Work on Laptop",
            payload: "Work on Laptop"
          }
        ]
      },
      access_token: config.pageAccesToken
    };

    await this.sendRequestToFB(request_json);
  }

  static async sendMsg_Laptop_Option1(psid) {
    let request_json = {
      recipient: { id: psid },
      messaging_type: "RESPONSE",
      message: {
        text: "Screen size?",
        quick_replies: [
          {
            content_type: "text",
            title: "Below 14 inches",
            payload: "Below 14 inches"
          },
          {
            content_type: "text",
            title: "Above 15 inches",
            payload: "Above 15 inches"
          },
          {
            content_type: "text",
            title: "Above 16 inches",
            payload: "Above 16 inches"
          }
        ]
      },
      access_token: config.pageAccesToken
    };

    await this.sendRequestToFB(request_json);
  }

  static async sendMsg_Laptop_Option2(psid) {
    let request_json = {
      recipient: { id: psid },
      messaging_type: "RESPONSE",
      message: {
        text: "Portability?",
        quick_replies: [
          {
            content_type: "text",
            title: "Powerful",
            payload: "Powerful"
          },
          {
            content_type: "text",
            title: "Portable",
            payload: "Portable"
          }
        ]
      },
      access_token: config.pageAccesToken
    };

    await this.sendRequestToFB(request_json);
  }

  static async sendMsg_Tablet(psid) {
    let request_json = {
      recipient: { id: psid },
      messaging_type: "RESPONSE",
      message: {
        text: "What will you use the tablet mostly for?",
        quick_replies: [
          {
            content_type: "text",
            title: "Gaming on Tablet",
            payload: "Gaming on Tablet"
          },
          {
            content_type: "text",
            title: "Study on Tablet",
            payload: "Study on Tablet"
          },
          {
            content_type: "text",
            title: "Work on Tablet",
            payload: "Work on Tablet"
          }
        ]
      },
      access_token: config.pageAccesToken
    };

    await this.sendRequestToFB(request_json);
  }

  static async sendMsg_Tablet_Option1(psid) {
    let request_json = {
      recipient: { id: psid },
      messaging_type: "RESPONSE",
      message: {
        text: "Which screen size do you prefer?",
        quick_replies: [
          {
            content_type: "text",
            title: "Below 9 inches",
            payload: "Below 9 inches"
          },
          {
            content_type: "text",
            title: "11 inches",
            payload: "11 inches"
          },
          {
            content_type: "text",
            title: "13 inches",
            payload: "13 inches"
          },
          {
            content_type: "text",
            title: "Above 14 inches",
            payload: "Above 14 inches"
          }
        ]
      },
      access_token: config.pageAccesToken
    };

    await this.sendRequestToFB(request_json);
  }

  static async sendMsg_Tablet_Option2(psid) {
    let request_json = {
      recipient: { id: psid },
      messaging_type: "RESPONSE",
      message: {
        text: "What phone do you already have?",
        quick_replies: [
          {
            content_type: "text",
            title: "I own an Android phone",
            payload: "I own an Android phone"
          },
          {
            content_type: "text",
            title: "I own an iPhone",
            payload: "I own an iPhone"
          }
        ]
      },
      access_token: config.pageAccesToken
    };

    await this.sendRequestToFB(request_json);
  }
  static async sendResult(psid, result) {
    let request_json = {
      recipient: { id: psid },
      messaging_type: "RESPONSE",
      message: {
        text: result
      },
      access_token: config.pageAccesToken
    };

    await this.sendRequestToFB(request_json);
  }
};
