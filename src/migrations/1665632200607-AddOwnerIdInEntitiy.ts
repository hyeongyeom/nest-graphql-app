import {MigrationInterface, QueryRunner} from "typeorm";

export class AddOwnerIdInEntitiy1665632200607 implements MigrationInterface {
    name = 'AddOwnerIdInEntitiy1665632200607'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "phone" DROP CONSTRAINT "FK_05edafb9cb818e5e292d1c35565"`);
        await queryRunner.query(`ALTER TABLE "phone" ALTER COLUMN "ownerId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pet" DROP CONSTRAINT "FK_20acc45f799c122ec3735a3b8b1"`);
        await queryRunner.query(`ALTER TABLE "pet" ALTER COLUMN "ownerId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "phone" ADD CONSTRAINT "FK_05edafb9cb818e5e292d1c35565" FOREIGN KEY ("ownerId") REFERENCES "owner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pet" ADD CONSTRAINT "FK_20acc45f799c122ec3735a3b8b1" FOREIGN KEY ("ownerId") REFERENCES "owner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pet" DROP CONSTRAINT "FK_20acc45f799c122ec3735a3b8b1"`);
        await queryRunner.query(`ALTER TABLE "phone" DROP CONSTRAINT "FK_05edafb9cb818e5e292d1c35565"`);
        await queryRunner.query(`ALTER TABLE "pet" ALTER COLUMN "ownerId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pet" ADD CONSTRAINT "FK_20acc45f799c122ec3735a3b8b1" FOREIGN KEY ("ownerId") REFERENCES "owner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "phone" ALTER COLUMN "ownerId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "phone" ADD CONSTRAINT "FK_05edafb9cb818e5e292d1c35565" FOREIGN KEY ("ownerId") REFERENCES "owner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
