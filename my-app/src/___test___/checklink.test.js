import { linktool } from '../components/post/Checklink';

test('Verify create link Format', () => {
    expect(linktool.isValidURL("")).toBe(false);
    expect(linktool.isValidURL("@test.com")).toBe(false);
    expect(linktool.isValidURL("test@test")).toBe(false);
    expect(linktool.isValidURL("not pass user@yahoo.com.tw")).toBe(false);

    expect(linktool.isValidURL("https://jestjs.io/docs/en/tutorial-react#setup-with-create-react-app")).toBe(true);
});



test('Verify video link Format', () => {
    expect(linktool.validURL("")).toBe(false);
    expect(linktool.validURL("www")).toBe(false);
    expect(linktool.validURL("http")).toBe(false);
    expect(linktool.validURL("http://123123")).toBe(false);

    expect(linktool.validURL("https://jestjs.io/docs/en/tutorial-react#setup-with-create-react-app")).toBe(true);
});