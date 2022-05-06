import { applyDecorators, UseGuards } from '@nestjs/common';
import { RequireAdminGuard } from '../guards/roles.';

export function RequireAdmin() {
  return applyDecorators(UseGuards(RequireAdminGuard()));
}
