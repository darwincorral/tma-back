import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryGatewayGateway } from './delivery-gateway.gateway';

describe('DeliveryGatewayGateway', () => {
  let gateway: DeliveryGatewayGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeliveryGatewayGateway],
    }).compile();

    gateway = module.get<DeliveryGatewayGateway>(DeliveryGatewayGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
