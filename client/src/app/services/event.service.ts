import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

@Injectable()
export class EventService {
    private _subjects = {};

    constructor(
    ) {

    }

    observe(key: string) {
        if (!this._subjects[key])
            this._subjects[key] = new Subject();
        return this._subjects[key];
    }

    emit(key: string, val?: any): void {
        this.observe(key).next(val || null);
    }

    dispose(key: string): void {
        if (this._subjects[key]) {
            this._subjects[key].complete();
            delete this._subjects[key];
        }
    }

    get activeEvents(): any[] {
        return Object.keys(this._subjects);
    }
}
