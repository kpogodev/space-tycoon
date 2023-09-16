export interface AuthResponseData {
    id: number,
    email: string
    nick: string
}

export interface LoginInputs {
    email: string
    password: string
}

export interface RegisterInputs extends LoginInputs {
    nick: string
}