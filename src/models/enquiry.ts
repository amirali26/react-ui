import { Request } from './request';

export type EnquiryInput = {
    message: string,
    requestId: string,
    initialConsultationFee: number,
    estimatedPrice: number,
    officeAppointment: boolean,
    phoneAppointment: boolean,
    videoCallAppointment: boolean,
}

export type Enquiry = {
    id: string,
    message: string,
    initialConsultationFee: number,
    estimatedPrice: number,
    officeAppointment: boolean,
    phoneAppointment: boolean,
    videoCallAppointment: boolean,
    createdAt: string,
    request: Request,
};

export default EnquiryInput;
