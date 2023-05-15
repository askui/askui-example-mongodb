import { Collection, Document } from 'mongodb';
import { aui, mongodb } from './helper/jest.setup';

describe('jest with askui', () => {
  let buttons: Collection<Document>;

  beforeAll(async () => {
    // (Re-)Setting up db (may not be necessary if the data in the db does not change and is set up beforehand)
    buttons = mongodb.collection('buttons');
    await buttons.insertOne({ label: 'CHECK OUT THE DOCS' });
    await buttons.insertOne({ label: 'JOIN THE COMMUNITY' });
  });

  it('should click on buttons at end of askui quick start guide', async () => {
    const buttonsCursor = buttons.find();
    let nextButton = await buttonsCursor.next();
    while (nextButton !== null) {
      await aui.click().button().withText(nextButton.label).exec();
      nextButton = await buttonsCursor.next();
    }
  });
});
