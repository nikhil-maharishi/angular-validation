export class user { 
  constructor(
    public id: number,
    public username: string,
    public email: string|number,
    public password: string|number,
    public cnfrmpassword:string|number
  ){}
}