import { z } from 'zod';

const textSchema = z.string().min(1).max(600);

export class PostContent {
  private _value: string;

  constructor(value: string) {
    textSchema.parse(value);
    this._value = value;
  }

  get value() {
    return this._value;
  }
}
