import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { ArticleLock } from './article-lock.entity';
import { User } from '../user/user.entity';

@Injectable()
export class LockService {
  constructor(private readonly em: EntityManager) {}

  async acquireLock(articleId: number, userId: number) {
    await this.cleanupExpiredLocks();
    const lock = await this.em.findOne(ArticleLock, { articleId });

    if (lock && lock.userId.id !== userId && new Date().getTime() - lock.lastSeenAt.getTime() < 5 * 60 * 1000) {
      const user = await this.em.findOne(User, { id: lock.userId.id });
      return { success: false, lockedBy: user?.username };
    }

    const user = await this.em.findOne(User, { id: userId });
    if (user) {
      if (!lock) {
        const newLock = this.em.create(ArticleLock, { 
          articleId, 
          userId: user, 
          acquiredAt: new Date(), 
          lastSeenAt: new Date(),
          visibleId: Math.random().toString(36).substring(2, 15) // Generate a random visibleId
        });
        await this.em.persistAndFlush(newLock);
        return { success: true, lock: newLock };
      }

      lock.userId = user;
      lock.acquiredAt = new Date();
      lock.lastSeenAt = new Date();
      await this.em.persistAndFlush(lock);
      return { success: true, lock };
    }
    return { success: false, message: 'User not found' };
  }

  async releaseLock(articleId: number, userId: number) {
    const lock = await this.em.findOne(ArticleLock, { articleId, userId });
    if (lock) {
      await this.em.removeAndFlush(lock);
    }
  }

  async refreshLock(articleId: number, userId: number) {
    const lock = await this.em.findOne(ArticleLock, { articleId, userId });
    if (lock) {
      lock.lastSeenAt = new Date();
      await this.em.persistAndFlush(lock);
    }
  }

  async getLockStatus(articleId: number) {
    return await this.em.findOne(ArticleLock, { articleId });
  }

  async cleanupExpiredLocks() {
    const expiredLocks = await this.em.find(ArticleLock, { lastSeenAt: { $lt: new Date(Date.now() - 5 * 60 * 1000) } });
    await this.em.removeAndFlush(expiredLocks);
  }
}
