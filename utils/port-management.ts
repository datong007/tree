import { exec } from 'child_process';
import { promisify } from 'util';
import net from 'net';

const execAsync = promisify(exec);

export async function findAvailablePort(startPort: number, endPort: number = startPort + 10): Promise<number> {
  for (let port = startPort; port <= endPort; port++) {
    try {
      await new Promise((resolve, reject) => {
        const server = net.createServer()
          .once('error', reject)
          .once('listening', () => {
            server.close();
            resolve(port);
          })
          .listen(port);
      });
      return port;
    } catch (err) {
      if (port === endPort) throw new Error('No available ports found');
      continue;
    }
  }
  throw new Error('No available ports found');
}

export async function killProcessOnPort(port: number): Promise<void> {
  const platform = process.platform;
  let command: string;

  if (platform === 'win32') {
    command = `FOR /F "tokens=5" %a in ('netstat -ano ^| findstr :${port}') do taskkill /F /PID %a`;
  } else {
    command = `lsof -i :${port} | grep LISTEN | awk '{print $2}' | xargs kill -9`;
  }

  try {
    await execAsync(command);
  } catch (error) {
    console.error(`Failed to kill process on port ${port}:`, error);
    throw error;
  }
} 