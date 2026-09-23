import { AI_EMPLOYEES } from '../data/nexusData';

export type RoutingLevel = 'SPECIALIST' | 'MULTI_SPECIALIST' | 'AI_ADMIN' | 'SUPER_ADMIN' | 'REJECTED';

export interface RoutingDecision {
  level: RoutingLevel;
  specialists: string[];
  reason: string;
  responsePolicy: string;
}

const names = AI_EMPLOYEES.map(employee => employee.name);
const findName = (name: string) => names.includes(name) ? name : 'AI Admin Supervisory Core';

export function routeMessage(message: string): RoutingDecision {
  const query = message.toLowerCase();

  if (/fake|guess|invent|made[- ]?up|not in database|without listing|hidden price|fake statistics/.test(query)) {
    return {
      level: 'REJECTED',
      specialists: [],
      reason: 'The request conflicts with the No Fake Listings, No Fake Prices, or No Fake Statistics laws.',
      responsePolicy: 'Use verified records only. Do not guess or fabricate.'
    };
  }

  if (/government complaint|court case|large financial dispute|system abuse|fraud investigation|national security|policy override/.test(query)) {
    return {
      level: 'SUPER_ADMIN',
      specialists: [findName('AI Admin Supervisory Core')],
      reason: 'Critical governance matter requires authorized human review.',
      responsePolicy: 'AI Admin must escalate to Super Admin. No autonomous final decision.'
    };
  }

  if (/fake document|fake identity|commission dispute|lead theft|payment fraud|ownership conflict|duplicate list|duplicate listing/.test(query)) {
    return {
      level: 'AI_ADMIN',
      specialists: [findName('AI Admin Supervisory Core')],
      reason: 'Security, ownership, payment, or fraud risk detected.',
      responsePolicy: 'Open an investigation workflow and preserve an audit record.'
    };
  }

  if (/invest|portfolio|roi|rental yield|return|capital gain/.test(query)) {
    return {
      level: 'MULTI_SPECIALIST',
      specialists: [
        findName('National Property Valuator AI'),
        findName('Rental Yield Forecaster AI'),
        findName('Market Momentum Forecaster AI'),
        findName('Property Matching AI')
      ],
      reason: 'Investment requests require combined valuation and market analysis.',
      responsePolicy: 'Generate a combined report from verified market evidence.'
    };
  }

  if (/lahore|dha|plot|house|property|villa|apartment|rent|buy|sell|listing|parcel/.test(query)) {
    return {
      level: 'SPECIALIST',
      specialists: [findName('Property Matching AI')],
      reason: 'Property search or inventory request detected.',
      responsePolicy: 'Return only available verified property information.'
    };
  }

  if (/tax|contract|legal|inheritance|succession|power of attorney|environment|zoning|planning|signature|escrow/.test(query)) {
    return {
      level: 'SPECIALIST',
      specialists: [findName('Legal Contract Drafter AI')],
      reason: 'Legal or governance workflow detected.',
      responsePolicy: 'Provide procedural guidance and route final decisions to authorized humans.'
    };
  }

  if (/lead|crm|whatsapp|follow.?up|tenant|marketing|campaign|customer/.test(query)) {
    return {
      level: 'SPECIALIST',
      specialists: [findName('Lead Re-engagement AI')],
      reason: 'Lead, communication, or customer workflow detected.',
      responsePolicy: 'Log the action and preserve lead ownership controls.'
    };
  }

  return {
    level: 'SPECIALIST',
    specialists: [findName('AI Admin Supervisory Core')],
    reason: 'General request routed to the supervisory assistant.',
    responsePolicy: 'Answer from verified records and escalate uncertainty.'
  };
}
