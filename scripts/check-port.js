const net = require('net');
const { exec } = require('child_process');

const port = 3000;

const server = net.createServer();

server.once('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`端口 ${port} 已被占用，正在尝试释放...`);
    if (process.platform === 'win32') {
      exec(`taskkill /F /PID $(netstat -ano | findstr :${port} | awk '{print $5}')`, 
        (error) => {
          if (error) {
            console.error(`无法释放端口 ${port}:`, error);
            process.exit(1);
          }
          console.log(`端口 ${port} 已释放`);
          process.exit(0);
        }
      );
    }
  }
});

server.once('listening', () => {
  server.close();
  process.exit(0);
});

server.listen(port); 