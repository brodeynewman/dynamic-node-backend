export default (client) => {
  client.on('hello', ping => console.log('PING', ping));
}