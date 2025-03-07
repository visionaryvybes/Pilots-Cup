type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: any;
}

class Logger {
  private static instance: Logger;
  private logs: LogEntry[] = [];
  private readonly maxLogs = 1000;
  private readonly isDevelopment = process.env.NODE_ENV === 'development';

  private constructor() {}

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private log(level: LogLevel, message: string, data?: any) {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      data,
    };

    // Store log
    this.logs.push(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    // In development, also log to console
    if (this.isDevelopment) {
      const consoleMethod = level === 'error' ? 'error' : level === 'warn' ? 'warn' : 'log';
      console[consoleMethod](`[${entry.timestamp}] [${level.toUpperCase()}] ${message}`, data || '');
    }

    // In production, you might want to send logs to a service like Sentry or CloudWatch
    if (!this.isDevelopment && (level === 'error' || level === 'warn')) {
      // TODO: Implement production logging service
      // this.sendToLoggingService(entry);
    }
  }

  public debug(message: string, data?: any) {
    this.log('debug', message, data);
  }

  public info(message: string, data?: any) {
    this.log('info', message, data);
  }

  public warn(message: string, data?: any) {
    this.log('warn', message, data);
  }

  public error(message: string, error?: Error | any) {
    this.log('error', message, {
      error: error instanceof Error ? {
        message: error.message,
        stack: error.stack,
        name: error.name,
      } : error,
    });
  }

  public getLogs(): LogEntry[] {
    return [...this.logs];
  }

  public clearLogs(): void {
    this.logs = [];
  }
}

export const logger = Logger.getInstance(); 