import { UiControlClient, UiController } from 'askui';
import { Db, MongoClient } from 'mongodb';

// ASKUI SETUP

// Server for controlling the operating system
let uiController: UiController;

// Client is necessary to use the askui API
// eslint-disable-next-line import/no-mutable-exports
let aui: UiControlClient;

const askuiConfig = {
  workspaceId: process.env.ASKUI_WORKSPACE_ID,
  token: process.env.ASKUI_TOKEN,
  withController: false,
} as const;

type AskuiConfig = typeof askuiConfig;

async function setupAskui(config: AskuiConfig) {
  if (config.withController) {
    uiController = new UiController({
      /**
       * Select the display you want to run your tests on, display 0 is your main display;
       * ignore if you have only one display
      */
     display: 0,
    });
    await uiController.start();
  }
  
  aui = await UiControlClient.build({
    credentials: {
      workspaceId: config.workspaceId,
      token: config.token,
    },
  });
  
  await aui.connect();
}

async function teardownAskui(config: AskuiConfig) {
  aui.close();
  
  if (config.withController) {
    await uiController.stop();
  }
}

// MONGODB SETUP

const mongoConfig = {
  uri: process.env.MONGO_URI ?? globalThis.__MONGO_URI__,
  dbName: process.env.MONGO_DB_NAME ?? globalThis.__MONGO_DB_NAME__,
} as const;

type MongoConfig = typeof mongoConfig;

let connection: MongoClient;
let mongodb: Db;

async function setupMongo(config: MongoConfig) {
  connection = await MongoClient.connect(config.uri);
  mongodb = await connection.db(config.dbName);
}

async function teardownMongo(_config: MongoConfig) {
  await connection.close();
}

// JEST SETUP

jest.setTimeout(60 * 1000 * 60);

beforeAll(async () => {
  await setupAskui(askuiConfig);
  await setupMongo(mongoConfig);
});  

afterAll(async () => {
  await teardownAskui(askuiConfig);
  await teardownMongo(mongoConfig);
});  

export { aui, mongodb };
