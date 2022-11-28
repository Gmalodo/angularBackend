import {app} from "../app";
import {createServer} from "http";

const port = 3000
app.set('port', port);

const server = createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error: { syscall: string; code: any; }) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  switch (error.code) {
    case 'EACCES':
      console.error('Port ' + port + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error('Port ' + port + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr!.port;
  console.log('Listening on ' + bind);
}
