import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';


interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  // receber o token
  const authToken = request.headers.authorization;

  // Validar se está preenchido
  if (!authToken) {
    return response.status(401).end();
  }

  const [, token] = authToken.split(' ');

  try {
    // validar  se token  é válido
    const { sub } = verify(token, 'df6e0d674a28323779e788ab89c0f900') as IPayload;
  
    // recuperar  informações do usuário
    request.user_id = sub;
    
    return next();
  } catch (err) {
    return response.status(401).end();
  }

}
