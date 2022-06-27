// Typeorm
import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";
// Third party
// Entity
import { TestSubEntity } from "../entities/testSub.entity";
// Main section
@EventSubscriber()
export class TestSubscriber implements EntitySubscriberInterface<TestSubEntity> {
  constructor(
    connection: Connection,
  ) {
    connection.subscribers.push(this);
  }
  listenTo() {
    return TestSubEntity;
  }
  // Listener section
  beforeInsert(event: InsertEvent<TestSubEntity>) {}
  beforeUpdate(event: UpdateEvent<TestSubEntity>) {}
  afterInsert(event: InsertEvent<TestSubEntity>) {}
  afterUpdate(event: UpdateEvent<TestSubEntity>) {}
}
