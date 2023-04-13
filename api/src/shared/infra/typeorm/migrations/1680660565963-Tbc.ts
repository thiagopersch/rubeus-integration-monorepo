import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class Tbc1680660565963 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tbc',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'client_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'user',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'link',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'unlicensed_method',
            type: 'boolean',
            default: true,
            isNullable: false,
          },
          {
            name: 'context_coligate_code',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'context_branch_code',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'context_education_level_code',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'context_system_code',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'context_user_code',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamptz',
            default: 'now()',
          },
          {
            name: 'deleted_at',
            type: 'timestamptz',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: 'ClientAndTbc',
            columnNames: ['client_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'client',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('tbc', 'ClientAndTbc');
    await queryRunner.dropTable('tbc');
  }
}
