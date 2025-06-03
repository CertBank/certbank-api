import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "../base.entity"; 

@Entity()
export class User extends BaseEntity {
  @Property()
  name!: string;

  @Property({ unique: true })
  email!: string;
}