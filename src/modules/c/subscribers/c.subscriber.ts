// Typeorm
import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";

// Third party
// Entity
import { CEntity } from "../entities/c.entity";

// Main section

@EventSubscriber()
export class CSubscriber implements EntitySubscriberInterface<CEntity> {
  constructor(
    connection: Connection,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return CEntity;
  }

  // Listener section
  beforeInsert(event: InsertEvent<CEntity>) {}

  beforeUpdate(event: UpdateEvent<CEntity>) {}

  afterInsert(event: InsertEvent<CEntity>) {}

  afterUpdate(event: UpdateEvent<CEntity>) {}
}
