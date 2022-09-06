import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Injectable, Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

import { createClient } from 'redis';
import { createAdapter } from '@socket.io/redis-adapter';

// const pubClient = createClient();
// const subClient = pubClient.duplicate();

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@Injectable()
export class ChatService
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('ChatModule');

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): void {
    console.log('msgToClient', payload);
    this.server.emit('msgToClient', payload);
  }

  afterInit(server: Server) {
    this.logger.log('Init');

    // Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
    //   server.adapter(createAdapter(pubClient, subClient));
    // });
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
