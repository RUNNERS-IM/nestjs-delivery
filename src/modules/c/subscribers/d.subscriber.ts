// Typeorm
import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";

// Third party
// Entity
import { DEntity } from "../entities/d.entity";

// Main section

@EventSubscriber()
export class DSubscriber implements EntitySubscriberInterface<DEntity> {
  constructor(
    connection: Connection,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return DEntity;
  }

  // Listener section
  beforeInsert(event: InsertEvent<DEntity>) {}

  beforeUpdate(event: UpdateEvent<DEntity>) {}

  afterInsert(event: InsertEvent<DEntity>) {}

  afterUpdate(event: UpdateEvent<DEntity>) {}
}
