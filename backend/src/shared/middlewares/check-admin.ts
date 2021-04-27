import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CheckAdmin implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    //TODO https://docs.nestjs.com/security/authentication
    //   try {
    //     const token = req.headers.authorization.split(' ')[1];
    //     const decodedToken = jwt.verify(
    //       token,
    //       'asdsadvhbhbrejbjhb223bhblbhljbhblbcsdlhbaaakksxa;na;sdknx##1akkkaxxaxalg',
    //     );
    //     req.userData = {
    //       email: decodedToken.email,
    //       userId: decodedToken.userId,
    //     };
    //     const email = req.userData.email;
    //     User.findOne({ email }).then((user) => {
    //       if (!user.isAdmin) {
    //         return res.status(401).json({
    //           message: LOGS.PERMISSIONS.DENIED,
    //         });
    //       }
    //     });
    //     next();
    //   } catch (error) {
    //     res.status(401).json({ message: LOGS.PERMISSIONS.DENIED });
    //   }
    next();
  }
}
