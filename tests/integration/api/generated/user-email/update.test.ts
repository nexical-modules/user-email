// GENERATED CODE - DO NOT MODIFY
import { ApiClient } from '@tests/integration/lib/client';
import { Factory } from '@tests/integration/lib/factory';
import { TestServer } from '@tests/integration/lib/server';
import { beforeEach, describe, expect, it } from 'vitest';
describe('UserEmail API - Update', () => {
  let client: ApiClient;

  beforeEach(async () => {
    client = new ApiClient(TestServer.getUrl());
  });

  // PUT /api/user-email/[id]
  describe('PUT /api/user-email/[id]', () => {
    it('should update userEmail', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', {});

      const target = await Factory.create('userEmail', { ...{} });
      const updatePayload = {
        name: 'name_updated',
      };

      const res = await client.put(`/api/user-email/${target.id}`, updatePayload);

      expect(res.status).toBe(200);

      const updated = await Factory.prisma.userEmail.findUnique({ where: { id: target.id } });
      expect(updated?.name).toBe(updatePayload.name);
    });
  });
});
