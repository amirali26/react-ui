import { Client } from './client';
import { Topic } from './topic';

export type Request = {
    id: string,
    requestNumber: number,
    client: Client,
    description: string,
    topic: Topic,
    createdDate: string,
    region: string,
    postCode: string,
    areaInRegion: string,
}

export type RequestDto = {
    requestNumber: number;
    topic: string;
    id: string;
    name: string;
    phoneNumber: string;
    email: string;
    description: string;
    createdDate: string;
}

export enum RequestStatus {
    OPEN = 'OPEN',
    PENDING = 'PENDING',
    RESOLVED = 'RESOLVED',
}
