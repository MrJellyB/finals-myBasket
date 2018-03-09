export class Event {

  constructor(
    public id: string,
    public name: string,
    public description: string,
    public start_time: string,
    public end_time: string,
    public place?: string,
    public photo?: string,
    public attendees?: User[]
  ) { }
}

export class User {

  eventsAttended = 1;

  constructor(
    public id: string,
    public name: string,
    public profilePhoto?: string,
  ) { }
}
