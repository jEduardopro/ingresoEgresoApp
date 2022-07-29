
export class User {

  constructor(
    public uid: string,
    public nombre: string,
    public email: string,
  )
  { }

  static fromFirebase({ uid, nombre, email }: {uid: string, nombre:string, email: string}): User {
    return new User(uid, nombre, email)
  }

}
