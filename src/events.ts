type EventHandler<T> = (payload: T) => void | Promise<void>;

class EventBus {
  private handlers: Record<string, EventHandler<any>[]> = {};

  on<T>(event: string, handler: EventHandler<T>) {
    if (!this.handlers[event]) this.handlers[event] = [];
    this.handlers[event].push(handler);
  }

  async emit<T>(event: string, payload: T) {
    if (this.handlers[event]) {
      for (const handler of this.handlers[event]) {
        await handler(payload);
      }
    }
  }
}

export const eventBus = new EventBus();
