import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
 
@Entity()
class Comment {
  @PrimaryGeneratedColumn()
  public id: number;
 
  @Column()
  public body: string;
 
  @Column()
  public clientIp: string;

  @Column()
  public movie: string;

  @CreateDateColumn({ update: false, name: "create_date" })
  public createDate: Date;

  @UpdateDateColumn({ select: false, name: "last_modified" })
  public lastModified: Date;

  @Column({ nullable: true, type: "varchar", length: 255, select: false, name: "last_updated_by" })
  public lastUpdatedBy: string;

  @Column({ nullable: true, type: "varchar", length: 255, select: false, name: "created_by" })
  public createdBy: string;

  @Column({ type: "boolean", default: true })
  active: boolean;

  @Column({ type: "boolean", default: false })
  deleted: boolean;
}
 
export default Comment;