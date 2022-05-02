export async function testWelcome() {
  await global.request.get('/').expect(200).expect('Welcome');
}
