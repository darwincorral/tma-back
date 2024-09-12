import { WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})

export class DeliveryGatewayGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    console.log('WebSocket Gateway initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // Método para emitir eventos
  emitDeliveryCreated(delivery: any) {
    this.server.emit('deliveryCreated', delivery);
  }

  // Método para emitir eventos
  emitRouteLive(route: any) {
    this.server.emit('routeLive', route);
  }

  // Método para emitir eventos
  emitDeliveryUpdate(route: any) {
    this.server.emit('deliveryUpdate', route);
  }
}
