// Typeorm
import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";

// Entity
import { CompanyEntity } from "../entities/company.entity";

// Main section

@EventSubscriber()
export class CompanySubscriber implements EntitySubscriberInterface<CompanyEntity> {
  constructor(
    connection: Connection,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return CompanyEntity;
  }

  // Listener section
  beforeInsert(event: InsertEvent<CompanyEntity>) {}

  beforeUpdate(event: UpdateEvent<CompanyEntity>) {}

  afterInsert(event: InsertEvent<CompanyEntity>) {}

  afterUpdate(event: UpdateEvent<CompanyEntity>) {}
}
