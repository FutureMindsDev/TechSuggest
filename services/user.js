/**
 * Copyright 2021-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Messenger For Original Coast Clothing
 * https://developers.facebook.com/docs/messenger-platform/getting-started/sample-apps/original-coast-clothing
 */

"use strict";

module.exports = class User {
  constructor(psid) {
    this.psid = psid;
    this.category_phone_option1 = "";
    this.category_phone_option2 = "";
    this.category_laptop_option1 = "";
    this.category_laptop_option2 = "";
    this.category_tablet_option1 = "";
    this.category_tablet_option2 = "";
  }
  setCategoryPhoneOption1(option1) {
    this.category_phone_option1 = option1;
  }
  getCategoryPhoneOption1() {
    return this.category_phone_option1;
  }

  setCategoryPhoneOption2(option2) {
    this.category_phone_option2 = option2;
  }
  getCategoryPhoneOption2() {
    return this.category_phone_option2;
  }

  setCategoryLaptopOption1(option1) {
    this.category_laptop_option1 = option1;
  }
  getCategoryLaptopOption1() {
    return this.category_laptop_option1;
  }

  setCategoryLaptopOption2(option2) {
    this.category_laptop_option2 = option2;
  }
  getCategoryLaptopOption2() {
    return this.category_laptop_option2;
  }

  setCategoryTabletOption1(option1) {
    this.category_tablet_option1 = option1;
  }
  getCategoryTabletOption1() {
    return this.category_tablet_option1;
  }

  setCategoryTabletOption2(option2) {
    this.category_tablet_option2 = option2;
  }
  getCategoryTabletOption2() {
    return this.category_tablet_option2;
  }
};
