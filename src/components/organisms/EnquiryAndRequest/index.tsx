import React from 'react';
import { Enquiry as EnquiryType } from '../../../models/enquiry';
import { RequestDto } from '../../../models/request';
import Case from '../Cases/Case';
import Enquiry from '../Enquiries/Enquiry';

type IProps = {
  request: RequestDto,
} & EnquiryType
const EnquiryAndRequest: React.FC<IProps> = ({ request, ...rest }) => (
  <>
    <Enquiry {...rest} style={{ height: 'auto', justifyContent: 'flex-start', marginBottom: '32px' }} />
    <Case {...request} handleEnquiryClick={() => { console.log(' in here '); }} style={{ height: 'auto', justifyContent: 'flex-start' }} readonly />
  </>
);

export default EnquiryAndRequest;
