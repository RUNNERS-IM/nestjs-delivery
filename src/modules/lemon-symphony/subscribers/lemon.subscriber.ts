// Typeorm
import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";

// Entity
import { LemonEntity } from "../entities/lemon.entity";

// Main section

@EventSubscriber()
export class LemonSubscriber implements EntitySubscriberInterface<LemonEntity> {
  constructor(
    connection: Connection,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return LemonEntity;
  }

  // Listener section
  beforeInsert(event: InsertEvent<LemonEntity>) {}

  beforeUpdate(event: UpdateEvent<LemonEntity>) {}

  afterInsert(event: InsertEvent<LemonEntity>) {}

  afterUpdate(event: UpdateEvent<LemonEntity>) {}
}
