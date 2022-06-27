// Typeorm
import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";
// Third party
// Entity
import { CardEntity } from "../entities/card.entity";
import { IamportService } from "../../../shared/services/iamport.service";
import { CryptoService } from "../../../shared/services/crypto.service";
// Main section
@EventSubscriber()
export class CardSubscriber implements EntitySubscriberInterface<CardEntity> {
  constructor(
    connection: Connection,
    private readonly iamportService: IamportService,
    private readonly cryptoService: CryptoService,
  ) {
    connection.subscribers.push(this);
  }
  listenTo() {
    return CardEntity;
  }
  // Listener section
  beforeInsert(event: InsertEvent<CardEntity>) {}
  beforeUpdate(event: UpdateEvent<CardEntity>) {}
}
