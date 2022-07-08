import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1657170540851 implements MigrationInterface {
    name = 'initial1657170540851'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('USER', 'ADMIN')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "role" "public"."users_role_enum" NOT NULL DEFAULT 'USER', "key" character varying NOT NULL, "name" character varying, "phone" character varying, "email" character varying, "address" character varying, "postcode" character varying, CONSTRAINT "UQ_93f18065a2dd9f6b26c138b37ce" UNIQUE ("key"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "deliveries" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, "title" character varying, "code" character varying, "fid" character varying, "invoice" character varying, "level" integer, "estimate" character varying, "time" TIMESTAMP, "is_complete" boolean DEFAULT false, "name_sender" character varying, "call_office" character varying, "call_driver" character varying, "name_driver" character varying, "address_receiver" character varying, "name_receiver" character varying, "is_tracking_registered" boolean DEFAULT false, CONSTRAINT "PK_a6ef225c5c5f0974e503bfb731f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "deliveryHistories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "delivery_id" uuid, "category" character varying, "level" integer, "time" TIMESTAMP, "call_office" character varying, "address_office" character varying, "name_driver" character varying, "picture_driver" character varying, "call_driver" character varying, CONSTRAINT "PK_f5f562b4d102706741bcd949514" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "deliveries" ADD CONSTRAINT "FK_c1fda5fb48f4641461d9b0756fa" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "deliveryHistories" ADD CONSTRAINT "FK_d17794e5665c10fdd2b1d988cdb" FOREIGN KEY ("delivery_id") REFERENCES "deliveries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deliveryHistories" DROP CONSTRAINT "FK_d17794e5665c10fdd2b1d988cdb"`);
        await queryRunner.query(`ALTER TABLE "deliveries" DROP CONSTRAINT "FK_c1fda5fb48f4641461d9b0756fa"`);
        await queryRunner.query(`DROP TABLE "deliveryHistories"`);
        await queryRunner.query(`DROP TABLE "deliveries"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    }

}
