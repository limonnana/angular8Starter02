export class Login {
  constructor(
    public email: string,
    public password: string,
    public retypePassword: string,
    public rememberMe: boolean
  ) {}
}
