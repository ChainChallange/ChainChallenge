import { IPayloadMethod } from "../models/types/IPayloadMethods";

export default function verifyPayload(payload: Record<string, any> | null): {method: IPayloadMethod, data: any} {
    if(!payload) {
      throw new Error('Payload cant be decoded');
    }
  
    if(!payload.method) {
      throw new Error('Payload needs to have an method field')
    }
  
    if(!['challenge', 'application', 'challenge_update', 'creator_update', 'applicant_update'].includes(payload.method)) {
      throw new Error('Method not allowed');
    }
  
    if(!payload.data) {
      throw new Error('No Payload Data found');
    }
  
    return {
        method: payload.method,
        data: payload.data,
    }
}