export type Request = {
    id: string,
    name: string,
    phoneNumber: string,
    email: string,
    status: RequestStatus,
    case: string,
    createdDate: string,
}

enum RequestStatus {
    OPEN = 'OPEN',
    CLOSED = 'CLOSED',
    HANDLED = 'HANDLED',
}
