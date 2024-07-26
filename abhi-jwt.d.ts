declare module "abhi-jwt" {
  export function encode_jwt(
    secret: string,
    username: string,
    payload: object,
    expiresIn: number
  ): string;

  export function decode_jwt(secret: string, token: string): object;

  export function validate_jwt(secret: string, token: string): boolean;
}
