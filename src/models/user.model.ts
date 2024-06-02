export interface  User {
    id: number
    email: string
    name: string
}

export interface  AuthUser {
    access_token: string
    user: User
}

export interface  RegistrationRequestDto {
    email: string
    name: string
    password: string
}