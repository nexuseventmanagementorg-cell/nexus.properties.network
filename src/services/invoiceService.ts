import { invoiceRepository } from '../database/repositories/InvoiceRepository';
import type { Invoice } from '../database/schemas/models';

export type InvoiceType = 'Subscription Invoice' | 'Lead Lock Invoice' | 'Deal Lock Invoice' | 'Premium Listing Invoice';

export const generateInvoice = async (input: { ownerId: string; amount: number; type: InvoiceType; reference?: string; status?: Invoice['status']; }): Promise<Invoice> => {
  const now = new Date().toISOString();
  return invoiceRepository.save({
    id: `INV-${Date.now()}`,
    ownerId: input.ownerId,
    amount: input.amount,
    currency: 'PKR',
    type: input.type,
    reference: input.reference || `REF-${Date.now()}`,
    status: input.status || 'Pending',
    createdAt: now,
    updatedAt: now,
    auditId: `AUD-${Date.now()}`,
  } as Invoice);
};

export const getInvoiceSummary = async () => {
  const invoices = await invoiceRepository.findAll();
  return {
    totalInvoices: invoices.length,
    pendingInvoices: invoices.filter((i) => i.status === 'Pending').length,
    paidInvoices: invoices.filter((i) => i.status === 'Paid').length,
    totalInvoiceValue: invoices.reduce((sum, i) => sum + Number(i.amount), 0),
  };
};
