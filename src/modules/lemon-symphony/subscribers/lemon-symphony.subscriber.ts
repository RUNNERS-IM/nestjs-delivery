// Typeorm
import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";

// Entity
import { LemonSymphonyEntity } from "../entities/lemon-symphony.entity";

// Main section

@EventSubscriber()
export class LemonSymphonySubscriber implements EntitySubscriberInterface<LemonSymphonyEntity> {
  constructor(
    connection: Connection,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return LemonSymphonyEntity;
  }

  // Listener section
  beforeInsert(event: InsertEvent<LemonSymphonyEntity>) {}

  beforeUpdate(event: UpdateEvent<LemonSymphonyEntity>) {}

  afterInsert(event: InsertEvent<LemonSymphonyEntity>) {}

  afterUpdate(event: UpdateEvent<LemonSymphonyEntity>) {}
}
