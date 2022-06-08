/*
 * @Author: 王鑫
 * @Description: 角色判断  （没有使用）
 * @Date: 2022-05-17 14:37:30
 */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    // 获取路由角色
    const roles = this.reflector.get('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    // 读取user
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    if (!user) {
      return false;
    }
    // 判断用户的角色是否包含和roles相同的角色列表，并返回一个布尔类型
    const hasRoles = roles.some((role) => role === user.role);
    if (!hasRoles) {
      throw new UnauthorizedException('您没有权限');
    }
    return hasRoles;
  }
}
