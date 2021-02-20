const { beforeEach } = require("@jest/globals");
const serverApi = require('../../server-api');

jest.mock('process', () => ({
  platform: 'mockPlatform'
}));

describe('the server-api', () => {
  let mockReq;
  let mockRes;
  beforeEach(() => {
    mockReq = {};
    mockRes = {
      setHeader: jest.fn(),
      end: jest.fn()
    };
  });
  test('returns 200 status code', () => {
    serverApi(mockReq, mockRes);
    expect(mockRes.statusCode).toBe(200);
  });
  test('adds text/plain as content header', () => {
    serverApi(mockReq, mockRes);
    expect(mockRes.setHeader).toBeCalledWith('Content-Type', 'text/plain');
  });
  test('sends a hello world message', () => {
    serverApi(mockReq, mockRes);
    expect(mockRes.end.mock.calls[0][0]).toMatch(/Hello world!\s+The current time is .*\s+and I am running on the mockPlatform platform/);
  });
});
