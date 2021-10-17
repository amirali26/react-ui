export type Request = {
    id: string,
    name: string,
    phoneNumber: string,
    email: string,
    status: RequestStatus,
    case: string,
    topic: string,
    createdDate: string,
}

enum RequestStatus {
    OPEN = 'OPEN',
    CLOSED = 'CLOSED',
    HANDLED = 'HANDLED',
}
