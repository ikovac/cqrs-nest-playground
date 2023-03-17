export class EntityNotFoundException extends Error {
  constructor(entityName: string) {
    super(`${entityName} not found.`);
    this.name = this.constructor.name;
  }
}
