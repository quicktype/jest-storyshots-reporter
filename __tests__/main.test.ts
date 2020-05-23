import { readAndParseXMLFile } from "../src/parser";

// test('throws invalid number', async () => {
//   const input = parseInt('foo', 10)
//   await expect(wait(input)).rejects.toThrow('milliseconds not a number')
// })

// test('wait 500 ms', async () => {
//   const start = new Date()
//   await wait(500)
//   const end = new Date()
//   var delta = Math.abs(end.getTime() - start.getTime())
//   expect(delta).toBeGreaterThan(450)
// })

// shows how the runner will run a javascript action with env / stdout protocol
test("test parse", async () => {
    const result = await readAndParseXMLFile("./__tests__/data/junit.xml");

    console.log(JSON.stringify(result));
});
