// GENERATED CODE - DO NOT MODIFY
import type { ApiActor } from '@/lib/api/api-docs';
import { db } from '@/lib/core/db';
import { Logger } from '@/lib/core/logger';
import { HookSystem } from '@/lib/modules/hooks';
import type { ServiceResponse } from '@/types/service';
import type { Prisma, UserEmail } from '@prisma/client';

/** Service class for UserEmail-related business logic. */
export class UserEmailService {
  public static async list(
    params?: Prisma.UserEmailFindManyArgs,
    actor?: ApiActor,
  ): Promise<ServiceResponse<UserEmail[]>> {
    try {
      let { where, take, skip, orderBy, select } = params || {};

      // Allow hooks to modify the query parameters (e.g. for scoping)
      // Pass actor context if available
      const filteredParams = await HookSystem.filter('userEmail.beforeList', {
        where,
        take,
        skip,
        orderBy,
        select,
        actor,
      });
      where = filteredParams.where;
      take = filteredParams.take;
      skip = filteredParams.skip;
      orderBy = filteredParams.orderBy;
      select = filteredParams.select;

      const [data, total] = await db.$transaction([
        db.userEmail.findMany({ where, take, skip, orderBy, select }),
        db.userEmail.count({ where }),
      ]);

      const filteredData = await HookSystem.filter('userEmail.list', data);

      return { success: true, data: filteredData, total };
    } catch (error) {
      Logger.error('UserEmail list Error', error);
      return { success: false, error: 'userEmail.service.error.list_failed' };
    }
  }

  public static async get(
    id: string,
    select?: Prisma.UserEmailSelect,
    actor?: ApiActor,
  ): Promise<ServiceResponse<UserEmail | null>> {
    try {
      const data = await db.userEmail.findUnique({ where: { id }, select });
      if (!data) return { success: false, error: 'userEmail.service.error.not_found' };

      const filtered = await HookSystem.filter('userEmail.read', data, { actor });

      return { success: true, data: filtered };
    } catch (error) {
      Logger.error('UserEmail get Error', error);
      return { success: false, error: 'userEmail.service.error.get_failed' };
    }
  }

  public static async create(
    data: Prisma.UserEmailCreateInput,
    select?: Prisma.UserEmailSelect,
    actor?: ApiActor,
  ): Promise<ServiceResponse<UserEmail>> {
    try {
      // Pass actor context to hooks for security/authorship validation
      const input = await HookSystem.filter('userEmail.beforeCreate', data, { actor });

      const newItem = await db.$transaction(async (tx) => {
        const created = await tx.userEmail.create({
          data: input as Prisma.UserEmailCreateInput,
          select,
        });
        await HookSystem.dispatch('userEmail.created', {
          id: created.id,
          actorId: actor?.id || 'system',
        });
        return created;
      });

      const filtered = await HookSystem.filter('userEmail.read', newItem, { actor });

      return { success: true, data: filtered };
    } catch (error) {
      Logger.error('UserEmail create Error', error);
      return { success: false, error: 'userEmail.service.error.create_failed' };
    }
  }

  public static async update(
    id: string,
    data: Prisma.UserEmailUpdateInput,
    select?: Prisma.UserEmailSelect,
    actor?: ApiActor,
  ): Promise<ServiceResponse<UserEmail>> {
    try {
      const input = await HookSystem.filter('userEmail.beforeUpdate', data, { actor, id });

      const updatedItem = await db.$transaction(async (tx) => {
        const updated = await tx.userEmail.update({
          where: { id },
          data: input as Prisma.UserEmailUpdateInput,
          select,
        });
        await HookSystem.dispatch('userEmail.updated', {
          id,
          changes: Object.keys(input),
          actorId: actor?.id,
        });
        return updated;
      });

      const filtered = await HookSystem.filter('userEmail.read', updatedItem, { actor });

      return { success: true, data: filtered };
    } catch (error) {
      Logger.error('UserEmail update Error', error);
      return { success: false, error: 'userEmail.service.error.update_failed' };
    }
  }

  public static async delete(id: string, actor?: ApiActor): Promise<ServiceResponse<void>> {
    try {
      await db.$transaction(async (tx) => {
        await tx.userEmail.delete({ where: { id } });
        await HookSystem.dispatch('userEmail.deleted', { id, actorId: actor?.id });
      });
      return { success: true };
    } catch (error) {
      Logger.error('UserEmail delete Error', error);
      return { success: false, error: 'userEmail.service.error.delete_failed' };
    }
  }
}
