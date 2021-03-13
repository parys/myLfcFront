import { Pm } from '@domain/models/pm.model';
import { Notification } from '@notifications/models/notification.model';

export class ChangeMobile {
    static readonly type = '[Core] Change mobile view';
    constructor(public readonly payload: boolean) { }
}

export class NewPm {
    static readonly type = '[Core] New pm';
    constructor(public readonly payload: Pm) { }
}

export class ReadPms {
    static readonly type = '[Core] Read pm';
}

export class NewNotification {
    static readonly type = '[Core] New notification';
    constructor(public readonly payload: Notification) { }
}

export class ReadNotifications {
    static readonly type = '[Core] Read notifications';
    constructor(public readonly payload: number) { }
}