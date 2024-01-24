import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { ValidationError } from 'sequelize';

@Catch(ValidationError)
export class SequelizeExceptionFilter implements ExceptionFilter {
  catch(exception: ValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = HttpStatus.BAD_REQUEST;

    response.status(status).json({
      statusCode: status,
      message: 'Validation failed',
      error: exception.errors.map((error: { message: string }) => error.message),
    });
  }
}
