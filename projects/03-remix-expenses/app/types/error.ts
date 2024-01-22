export class AuthError extends Error {
  public status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status

    // Establecer el prototipo explícitamente para garantizar que se hereden las propiedades correctamente
    Object.setPrototypeOf(this, AuthError.prototype)
  }
}