import { MigrationInterface, QueryRunner } from 'typeorm';

export class deleteNicknameOwnerTable1665564342391
  implements MigrationInterface
{
  name = 'deleteNicknameOwnerTable1665564342391';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "owner" DROP COLUMN "nickname"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "owner" ADD "nickname" character varying NOT NULL`,
    );
  }
}
