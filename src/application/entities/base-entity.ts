import { randomUUID } from 'node:crypto';

export default class BaseEntity {
  private _id: string;
  private _createdAt: Date;

  constructor(createdAt = new Date()) {
    this._id = randomUUID();
    this._createdAt = createdAt;
  }

  public get id(): string {
    return this._id;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }
}
