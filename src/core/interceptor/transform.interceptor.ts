/*
 * @Author: 王鑫
 * @Description: 拦截成功请求
 * @Date: 2022-04-11 16:46:51
 */
import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          status: HttpStatus.OK,
          message: '请求成功',
          data: data,
        };
      }),
    );
  }
}
