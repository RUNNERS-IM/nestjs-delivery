// Typeorm
import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";
// Third party
// Entity
import { TestEntity } from "../entities/test.entity";
// Main section
@EventSubscriber()
export class TestSubscriber implements EntitySubscriberInterface<TestEntity> {
  constructor(
    connection: Connection,
  ) {
    connection.subscribers.push(this);
  }
  listenTo() {
    return TestEntity;
  }
  // Listener section
  beforeInsert(event: InsertEvent<TestEntity>) {}
  beforeUpdate(event: UpdateEvent<TestEntity>) {}
  afterInsert(event: InsertEvent<TestEntity>) {}
  afterUpdate(event: UpdateEvent<TestEntity>) {}
}
