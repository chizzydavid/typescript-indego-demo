import crypto from 'crypto';

export const createdBatch = {
  batchId:  crypto.randomUUID(),
  "createdAt": new Date(),
  "updatedAt": new Date(),
  "deletedAt": null
}
