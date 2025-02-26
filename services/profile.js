"use strict";

// Imports dependencies
const GraphApi = require("./graph-api"),
  config = require("./config");

module.exports = class Profile {

  setWhitelistedDomains() {
    let domainPayload = this.getWhitelistedDomains();
    GraphApi.callMessengerProfileAPI(domainPayload);
  }

  getWhitelistedDomains() {
    let whitelistedDomains = {
      whitelisted_domains: config.whitelistedDomains
    };

    console.log({ whitelistedDomains });
    return whitelistedDomains;
  }
};
