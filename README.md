# TechSuggest

TechSuggest is a Facebook Messenger AI designed to showcase the key features of the Messenger Platform. This project demonstrates how automation and AI-generated responses can create a seamless and engaging messaging experience.
Project Overview
TechSuggest is an AI-powered chatbot integrated into a Facebook Page Messenger. Users can interact with the bot by selecting a device category and answering a series of guided questions. Based on the user's responses, the chatbot utilizes the Google Gemini 2.0 Flash API to provide tailored device recommendations.

[Access the Messenger experience of TechSuggest](https://www.messenger.com/t/569761872883181/)

## Workflow
1.	Users start by interacting with the Choose Category button.
2.	They select from three main device categories: Phone, Laptop, Tablet
3.	The chatbot asks additional questions based on:	Primary use case (e.g., gaming, work, study, etc.),	Screen size preference,	Other relevant preferences
4.	The collected user inputs are sent to the Google Gemini 2.0 Flash API.
5.	The AI processes the data and returns a personalized device recommendation.


## Requirements

- **Facebook Page:** Will be used as the identity of your messaging experience. When people chat with your page. To create a new Page, visit https://www.facebook.com/pages/create.
- **Facebook Developer Account:** Required to create new apps, which are the core of any Facebook integration. You can create a new developer account by going to the [Facebook Developers website](https://developers.facebook.com/) and clicking the "Get Started" button.
- **Facebook App:** Contains the settings for your Messenger automation, including access tokens. To create a new app, visit your [app dashboard](https://developers.facebook.com/apps).

## Setup Steps

Before you begin, make sure you have completed all of the requirements listed above. At this point you should have a Page and a registered Facebook App.

#### Get the App id and App Secret

1. Go to your app Basic Settings, [Find your app here](https://developers.facebook.com/apps)
2. Save the **App ID** number and the **App Secret**

#### Grant  Messenger access to your Facebook App

1. Go to your app Dashboard
2. Under _Add Product_ find _Messenger_ and click _Set Up_
3. Now you should be in the App Messenger Settings
4. Under Access Tokens, click on _Add or Remove Pages_
5. Select the desired page and allow "Manage and access Page conversations" in Messenger
6. Select the desired page and an access token should appear
7. Get the Page ID from the page access token by using the [Access Token Debugger](https://developers.facebook.com/tools/debug/accesstoken/)
8. In the section Built-In NLP, select your page and enable the toggle

# Installation

Clone this repository on your local machine:

```bash
$ git clone https://github.com/FutureMindsDev/TechSuggest.git
$ cd TechSuggest
```

You will need:

- [Node](https://nodejs.org/en/) 10.x or higher
- Remote server service such as [Railway](https://www.railway.com/) or your own webserver.

# Usage

## Using Railway

#### 1. Create a railway account by connecting it to your GitHub

#### 2. Create a new production using this repository

#### 3. Add environment variables

#### 4. Test that your app setup is successful

Send a message to your Page from Facebook or in Messenger.

If you see a response to your message in messenger, you have fully set up your app! Voilà!
