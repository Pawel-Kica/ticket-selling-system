import startTestServer from '../../tests/startTestServer';

if (require.main === module) {
  (async () => {
    const seedService = await startTestServer();
    seedService.main();
  })();
}
