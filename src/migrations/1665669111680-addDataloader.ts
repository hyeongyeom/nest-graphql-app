import {MigrationInterface, QueryRunner} from "typeorm";

export class addDataloader1665669111680 implements MigrationInterface {
    name = 'addDataloader1665669111680'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."phone_color_enum" AS ENUM('Black', 'White', 'Red', 'Blue')`);
        await queryRunner.query(`CREATE TABLE "phone" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "color" "public"."phone_color_enum" DEFAULT 'Black', "ownerId" integer NOT NULL, CONSTRAINT "PK_f35e6ee6c1232ce6462505c2b25" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "phone" ADD CONSTRAINT "FK_05edafb9cb818e5e292d1c35565" FOREIGN KEY ("ownerId") REFERENCES "owner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "phone" DROP CONSTRAINT "FK_05edafb9cb818e5e292d1c35565"`);
        await queryRunner.query(`DROP TABLE "phone"`);
        await queryRunner.query(`DROP TYPE "public"."phone_color_enum"`);
    }

}
