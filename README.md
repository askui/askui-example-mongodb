# askui-example-mongodb
Simple example of using askui together with mongodb as the source for test data. In this example, askui is used to click on the last two buttons of the quickstart guide on https://app.askui.com. The data of the buttons is saved to and retrieved from a MongoDB database.

## Install

```bash
npm install
```

## Configure

Set the following environment variables to configure the example. The `ASKUI_WORKSPACE_ID` and `ASKUI_TOKEN` are required to connect to the askui services. Read at our docs on how to get them: [Windows](https://docs.askui.com/docs/general/Getting%20Started/Installing%20AskUI/getting-started#step-4-connect-your-askui-account) [Linux](https://docs.askui.com/docs/general/Getting%20Started/Installing%20AskUI/getting-started-linux#access-token), [macOS](https://docs.askui.com/docs/general/Getting%20Started/Installing%20AskUI/getting-started-macos#access-token). The `MONGO_URI` and `MONGO_DB_NAME` are optional. If they are not provided, an empty in-memory database will be used instead of connecting to a real MongoDB database.

```bash
export ASKUI_WORKSPACE_ID=
export ASKUI_TOKEN=
export MONGO_URI=
export MONGO_DB_NAME=
```

## Usage

```bash
npm run test
```
