import { NextResponse } from 'next/server';
import { WebSocketServer } from 'ws';

export const runtime = 'nodejs';

let wss: WebSocketServer;

function getWebSocketServer() {
  if (!wss) {
    wss = new WebSocketServer({ 
      noServer: true,
      perMessageDeflate: false
    });

    wss.on('connection', (ws) => {
      console.log('Client connected');

      ws.on('message', (data) => {
        try {
          const message = JSON.parse(data.toString());
          
          // Handle different message types
          switch (message.type) {
            case 'booking_update':
              // Broadcast booking updates to all connected clients
              wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === 1) {
                  client.send(JSON.stringify(message));
                }
              });
              break;
            
            case 'track_status':
              // Handle track status updates
              wss.clients.forEach((client) => {
                if (client.readyState === 1) {
                  client.send(JSON.stringify(message));
                }
              });
              break;

            default:
              console.warn('Unknown message type:', message.type);
          }
        } catch (error) {
          console.error('Error handling WebSocket message:', error);
        }
      });

      ws.on('close', () => {
        console.log('Client disconnected');
      });

      ws.on('error', (error) => {
        console.error('WebSocket error:', error);
      });
    });
  }
  return wss;
}

export async function GET(req: Request) {
  const upgrade = req.headers.get('upgrade');
  if (!upgrade || upgrade.toLowerCase() !== 'websocket') {
    return new NextResponse('Expected Websocket', { status: 426 });
  }

  try {
    // For Next.js 14, we need to disable WebSocket handling in the API route
    // as it's causing issues with the current implementation
    return new NextResponse('WebSocket support is temporarily disabled', { status: 503 });
    
    /* Original implementation - disabled due to compatibility issues
    const wss = getWebSocketServer();
    const { socket: res } = process as any;
    const head = Buffer.alloc(0);
    
    if (!res?.socket) {
      throw new Error('No socket found');
    }

    await new Promise((resolve, reject) => {
      wss.handleUpgrade(req as any, res.socket, head, (ws) => {
        wss.emit('connection', ws, req);
        resolve(ws);
      });
    });
    
    return new NextResponse(null);
    */
  } catch (error) {
    console.error('WebSocket upgrade error:', error);
    return new NextResponse('WebSocket upgrade failed', { status: 500 });
  }
} 