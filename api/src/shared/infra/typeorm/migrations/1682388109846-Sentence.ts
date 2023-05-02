import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class Sentence1682388109846 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sentence',
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
            name: 'tbc_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'sentence_category_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'code',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'coligate',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'system_code',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'content',
            type: 'text',
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
            name: 'TbcAndSentence',
            columnNames: ['tbc_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'tbc',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'SentenceCategoryAndSentence',
            columnNames: ['sentence_category_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'sentence_category',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('sentence', 'TbcAndSentence');
    await queryRunner.dropForeignKey('sentence', 'SentenceCategoryAndSentence');
    await queryRunner.dropTable('sentence');
  }
}
