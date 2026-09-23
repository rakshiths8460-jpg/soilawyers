import { neon } from '@neondatabase/serverless';
import fs from 'fs';
import path from 'path';

export interface EventConfig {
  id?: number | string;
  event_slug: string;
  title: string;
  price_inr: number;
  student_price_inr: number;
  is_registration_open: boolean;
  max_capacity: number;
  updated_at?: string;
}

export interface AttendeeRecord {
  id?: number | string;
  ticket_id: string;
  event_slug: string;
  name: string;
  email: string;
  phone: string;
  organization?: string;
  designation?: string;
  category?: string;
  fee_amount?: number;
  amount_paid: number;
  payment_status: 'free' | 'paid' | 'pending' | 'failed';
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  created_at: string;
}

export interface ContactInquiry {
  id?: number | string;
  inquiry_id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  opt_in: boolean;
  status: 'unread' | 'read' | 'resolved';
  created_at: string;
}

const LOCAL_STORE_PATH = path.join(process.cwd(), 'data', 'local_event_store.json');

function getLocalStore() {
  try {
    if (!fs.existsSync(LOCAL_STORE_PATH)) {
      const initial = {
        config: {
          'ibc-turns-10': {
            event_slug: 'ibc-turns-10',
            title: 'IBC Turns 10: A Decade of the Insolvency & Bankruptcy Code',
            price_inr: 2000,
            student_price_inr: 1000,
            is_registration_open: true,
            max_capacity: 200,
            updated_at: new Date().toISOString()
          }
        },
        attendees: [] as AttendeeRecord[],
        inquiries: [] as ContactInquiry[]
      };
      fs.mkdirSync(path.dirname(LOCAL_STORE_PATH), { recursive: true });
      fs.writeFileSync(LOCAL_STORE_PATH, JSON.stringify(initial, null, 2), 'utf-8');
      return initial;
    }
    const data = fs.readFileSync(LOCAL_STORE_PATH, 'utf-8');
    const parsed = JSON.parse(data);
    parsed.inquiries = parsed.inquiries || [];
    parsed.attendees = parsed.attendees || [];
    if (parsed.config && parsed.config['ibc-turns-10']) {
      if (parsed.config['ibc-turns-10'].student_price_inr === undefined) {
        parsed.config['ibc-turns-10'].student_price_inr = 1000;
      }
      if (parsed.config['ibc-turns-10'].price_inr === 0 || parsed.config['ibc-turns-10'].price_inr === undefined) {
        parsed.config['ibc-turns-10'].price_inr = 2000;
      }
    }
    return parsed;
  } catch (err) {
    return {
      config: {
        'ibc-turns-10': {
          event_slug: 'ibc-turns-10',
          title: 'IBC Turns 10: A Decade of the Insolvency & Bankruptcy Code',
          price_inr: 2000,
          student_price_inr: 1000,
          is_registration_open: true,
          max_capacity: 200,
          updated_at: new Date().toISOString()
        }
      },
      attendees: [] as AttendeeRecord[],
      inquiries: [] as ContactInquiry[]
    };
  }
}

function saveLocalStore(data: any) {
  try {
    fs.mkdirSync(path.dirname(LOCAL_STORE_PATH), { recursive: true });
    fs.writeFileSync(LOCAL_STORE_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving local store:', err);
  }
}

export function isNeonConfigured(): boolean {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  return Boolean(url && url.startsWith('postgres') && !url.includes('YOUR_NEON_DB_URL'));
}

async function getNeonClient() {
  if (!isNeonConfigured()) return null;
  try {
    const connStr = (process.env.DATABASE_URL || process.env.POSTGRES_URL)!;
    const sql = neon(connStr);
    // Ensure tables exist
    await sql`
      CREATE TABLE IF NOT EXISTS event_settings (
        id SERIAL PRIMARY KEY,
        event_slug VARCHAR(100) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        price_inr INTEGER NOT NULL DEFAULT 2000,
        student_price_inr INTEGER NOT NULL DEFAULT 1000,
        is_registration_open BOOLEAN NOT NULL DEFAULT true,
        max_capacity INTEGER NOT NULL DEFAULT 200,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await sql`
      ALTER TABLE event_settings ADD COLUMN IF NOT EXISTS student_price_inr INTEGER NOT NULL DEFAULT 1000;
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS event_registrations (
        id SERIAL PRIMARY KEY,
        ticket_id VARCHAR(50) UNIQUE NOT NULL,
        event_slug VARCHAR(100) NOT NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        organization VARCHAR(255),
        designation VARCHAR(255),
        category VARCHAR(100),
        fee_amount INTEGER NOT NULL DEFAULT 0,
        amount_paid INTEGER NOT NULL DEFAULT 0,
        payment_status VARCHAR(50) NOT NULL DEFAULT 'free',
        razorpay_order_id VARCHAR(100),
        razorpay_payment_id VARCHAR(100),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await sql`
      ALTER TABLE event_registrations ADD COLUMN IF NOT EXISTS fee_amount INTEGER NOT NULL DEFAULT 0;
    `;
    // Ensure existing pending or failed records do NOT show money as paid
    await sql`
      UPDATE event_registrations 
      SET fee_amount = amount_paid 
      WHERE (fee_amount IS NULL OR fee_amount = 0) AND amount_paid > 0;
    `;
    await sql`
      UPDATE event_registrations 
      SET amount_paid = 0 
      WHERE payment_status = 'pending' OR payment_status = 'failed';
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS contact_inquiries (
        id SERIAL PRIMARY KEY,
        inquiry_id VARCHAR(50) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        subject VARCHAR(255),
        message TEXT NOT NULL,
        opt_in BOOLEAN NOT NULL DEFAULT true,
        status VARCHAR(50) NOT NULL DEFAULT 'unread',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    return sql;
  } catch (err) {
    console.warn('Neon connection failed, falling back to local persistent store:', err);
    return null;
  }
}

export async function getEventConfig(slug: string = 'ibc-turns-10'): Promise<EventConfig> {
  const sql = await getNeonClient();
  if (sql) {
    try {
      const rows = await sql`
        SELECT * FROM event_settings WHERE event_slug = ${slug} LIMIT 1;
      `;
      if (rows && rows.length > 0) {
        const item = rows[0] as unknown as EventConfig;
        return {
          ...item,
          price_inr: item.price_inr !== undefined && item.price_inr !== null ? Number(item.price_inr) : 2000,
          student_price_inr: item.student_price_inr !== undefined && item.student_price_inr !== null ? Number(item.student_price_inr) : 1000,
        };
      }
      // Insert default if not exists
      const inserted = await sql`
        INSERT INTO event_settings (event_slug, title, price_inr, student_price_inr, is_registration_open, max_capacity)
        VALUES (${slug}, 'IBC Turns 10: A Decade of the Insolvency & Bankruptcy Code', 2000, 1000, true, 200)
        RETURNING *;
      `;
      const newItem = inserted[0] as unknown as EventConfig;
      return {
        ...newItem,
        price_inr: newItem.price_inr !== undefined && newItem.price_inr !== null ? Number(newItem.price_inr) : 2000,
        student_price_inr: newItem.student_price_inr !== undefined && newItem.student_price_inr !== null ? Number(newItem.student_price_inr) : 1000,
      };
    } catch (e) {
      console.error('Neon query error in getEventConfig:', e);
    }
  }

  // Fallback to local store
  const store = getLocalStore();
  if (!store.config[slug]) {
    store.config[slug] = {
      event_slug: slug,
      title: 'IBC Turns 10: A Decade of the Insolvency & Bankruptcy Code',
      price_inr: 2000,
      student_price_inr: 1000,
      is_registration_open: true,
      max_capacity: 200,
      updated_at: new Date().toISOString()
    };
    saveLocalStore(store);
  } else {
    if (store.config[slug].student_price_inr === undefined) {
      store.config[slug].student_price_inr = 1000;
    }
    if (store.config[slug].price_inr === 0 || store.config[slug].price_inr === undefined) {
      store.config[slug].price_inr = 2000;
    }
  }
  return store.config[slug];
}

export async function updateEventConfig(
  slug: string,
  updates: { price_inr?: number; student_price_inr?: number; is_registration_open?: boolean; max_capacity?: number }
): Promise<EventConfig> {
  const sql = await getNeonClient();
  if (sql) {
    try {
      const current = await getEventConfig(slug);
      const newPrice = updates.price_inr !== undefined ? updates.price_inr : current.price_inr;
      const newStudentPrice = updates.student_price_inr !== undefined ? updates.student_price_inr : (current.student_price_inr ?? 1000);
      const newOpen = updates.is_registration_open !== undefined ? updates.is_registration_open : current.is_registration_open;
      const newCap = updates.max_capacity !== undefined ? updates.max_capacity : current.max_capacity;

      const rows = await sql`
        UPDATE event_settings
        SET price_inr = ${newPrice}, student_price_inr = ${newStudentPrice}, is_registration_open = ${newOpen}, max_capacity = ${newCap}, updated_at = CURRENT_TIMESTAMP
        WHERE event_slug = ${slug}
        RETURNING *;
      `;
      if (rows.length > 0) return rows[0] as unknown as EventConfig;
    } catch (e) {
      console.error('Neon query error in updateEventConfig:', e);
    }
  }

  // Local fallback
  const store = getLocalStore();
  if (!store.config[slug]) {
    await getEventConfig(slug);
  }
  store.config[slug] = {
    ...store.config[slug],
    ...updates,
    updated_at: new Date().toISOString()
  };
  saveLocalStore(store);
  return store.config[slug];
}

export async function createAttendeeRegistration(
  data: Omit<AttendeeRecord, 'id' | 'created_at' | 'ticket_id'>
): Promise<AttendeeRecord> {
  const ticket_id = `IBC10-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Date.now().toString().slice(-4)}`;
  const created_at = new Date().toISOString();
  const fee_amount = data.fee_amount !== undefined ? data.fee_amount : (data.amount_paid || 0);
  const isPaid = data.payment_status === 'paid';
  const amount_paid = isPaid ? (data.amount_paid || fee_amount) : 0;

  const record: AttendeeRecord = {
    ...data,
    fee_amount,
    amount_paid,
    ticket_id,
    created_at
  };

  const sql = await getNeonClient();
  if (sql) {
    try {
      const rows = await sql`
        INSERT INTO event_registrations (
          ticket_id, event_slug, name, email, phone, organization, designation, category, fee_amount, amount_paid, payment_status, razorpay_order_id, razorpay_payment_id
        ) VALUES (
          ${record.ticket_id}, ${record.event_slug}, ${record.name}, ${record.email}, ${record.phone},
          ${record.organization || ''}, ${record.designation || ''}, ${record.category || 'General Delegate'},
          ${record.fee_amount}, ${record.amount_paid}, ${record.payment_status}, ${record.razorpay_order_id || ''}, ${record.razorpay_payment_id || ''}
        )
        RETURNING *;
      `;
      if (rows.length > 0) return rows[0] as unknown as AttendeeRecord;
    } catch (e) {
      console.error('Neon insert error:', e);
    }
  }

  // Local fallback
  const store = getLocalStore();
  store.attendees.unshift(record);
  saveLocalStore(store);
  return record;
}

export async function getAttendeeByTicketId(ticket_id: string): Promise<AttendeeRecord | null> {
  const sql = await getNeonClient();
  if (sql) {
    try {
      const rows = await sql`
        SELECT * FROM event_registrations WHERE ticket_id = ${ticket_id} LIMIT 1;
      `;
      if (rows && rows.length > 0) return rows[0] as unknown as AttendeeRecord;
    } catch (e) {
      console.error('Neon getAttendeeByTicketId error:', e);
    }
  }

  const store = getLocalStore();
  const found = (store.attendees || []).find((a: AttendeeRecord) => a.ticket_id === ticket_id);
  return found || null;
}

export async function getAttendeeByOrderId(order_id: string): Promise<AttendeeRecord | null> {
  const sql = await getNeonClient();
  if (sql) {
    try {
      const rows = await sql`
        SELECT * FROM event_registrations WHERE razorpay_order_id = ${order_id} LIMIT 1;
      `;
      if (rows && rows.length > 0) return rows[0] as unknown as AttendeeRecord;
    } catch (e) {
      console.error('Neon getAttendeeByOrderId error:', e);
    }
  }

  const store = getLocalStore();
  const found = (store.attendees || []).find((a: AttendeeRecord) => a.razorpay_order_id === order_id);
  return found || null;
}

export async function updateAttendeePayment(
  identifier: { ticket_id?: string; order_id?: string },
  updates: {
    payment_status: 'free' | 'paid' | 'pending' | 'failed';
    razorpay_payment_id?: string;
    razorpay_order_id?: string;
    amount_paid?: number;
    fee_amount?: number;
  }
): Promise<AttendeeRecord | null> {
  const isPaid = updates.payment_status === 'paid';
  const sql = await getNeonClient();
  if (sql) {
    try {
      let rows;
      if (identifier.ticket_id) {
        rows = await sql`
          UPDATE event_registrations
          SET payment_status = ${updates.payment_status},
              razorpay_payment_id = COALESCE(${updates.razorpay_payment_id || null}, razorpay_payment_id),
              razorpay_order_id = COALESCE(${updates.razorpay_order_id || null}, razorpay_order_id),
              fee_amount = COALESCE(${updates.fee_amount !== undefined ? updates.fee_amount : null}, fee_amount),
              amount_paid = CASE 
                WHEN ${isPaid} THEN COALESCE(${updates.amount_paid !== undefined ? updates.amount_paid : null}, NULLIF(amount_paid, 0), fee_amount, 0)
                ELSE 0
              END
          WHERE ticket_id = ${identifier.ticket_id}
          RETURNING *;
        `;
      } else if (identifier.order_id) {
        rows = await sql`
          UPDATE event_registrations
          SET payment_status = ${updates.payment_status},
              razorpay_payment_id = COALESCE(${updates.razorpay_payment_id || null}, razorpay_payment_id),
              razorpay_order_id = COALESCE(${updates.razorpay_order_id || null}, razorpay_order_id),
              fee_amount = COALESCE(${updates.fee_amount !== undefined ? updates.fee_amount : null}, fee_amount),
              amount_paid = CASE 
                WHEN ${isPaid} THEN COALESCE(${updates.amount_paid !== undefined ? updates.amount_paid : null}, NULLIF(amount_paid, 0), fee_amount, 0)
                ELSE 0
              END
          WHERE razorpay_order_id = ${identifier.order_id}
          RETURNING *;
        `;
      }
      if (rows && rows.length > 0) return rows[0] as unknown as AttendeeRecord;
    } catch (e) {
      console.error('Neon updateAttendeePayment error:', e);
    }
  }

  // Local fallback
  const store = getLocalStore();
  store.attendees = store.attendees || [];
  const idx = store.attendees.findIndex((a: AttendeeRecord) =>
    (identifier.ticket_id && a.ticket_id === identifier.ticket_id) ||
    (identifier.order_id && a.razorpay_order_id === identifier.order_id)
  );

  if (idx !== -1) {
    const existing = store.attendees[idx];
    const newFee = updates.fee_amount !== undefined ? updates.fee_amount : (existing.fee_amount || existing.amount_paid || 0);
    const newAmountPaid = isPaid
      ? (updates.amount_paid !== undefined ? updates.amount_paid : (existing.amount_paid || newFee))
      : 0;

    store.attendees[idx] = {
      ...existing,
      payment_status: updates.payment_status,
      razorpay_payment_id: updates.razorpay_payment_id || existing.razorpay_payment_id,
      razorpay_order_id: updates.razorpay_order_id || existing.razorpay_order_id,
      fee_amount: newFee,
      amount_paid: newAmountPaid,
    };
    saveLocalStore(store);
    return store.attendees[idx];
  }

  return null;
}

export async function getAllAttendees(slug?: string, search?: string): Promise<AttendeeRecord[]> {
  const sanitize = (a: any): AttendeeRecord => {
    const isPaid = a.payment_status === 'paid';
    const fee = a.fee_amount !== undefined && a.fee_amount !== null && Number(a.fee_amount) > 0
      ? Number(a.fee_amount)
      : Number(a.amount_paid || 0);
    return {
      ...a,
      fee_amount: fee,
      amount_paid: isPaid ? (Number(a.amount_paid) > 0 ? Number(a.amount_paid) : fee) : 0,
    };
  };

  const sql = await getNeonClient();
  if (sql) {
    try {
      let rows;
      if (slug) {
        rows = await sql`
          SELECT * FROM event_registrations WHERE event_slug = ${slug} ORDER BY created_at DESC;
        `;
      } else {
        rows = await sql`
          SELECT * FROM event_registrations ORDER BY created_at DESC;
        `;
      }
      let list = (rows as unknown as AttendeeRecord[]).map(sanitize);
      if (search) {
        const q = search.toLowerCase();
        list = list.filter(
          (a) =>
            a.name.toLowerCase().includes(q) ||
            a.email.toLowerCase().includes(q) ||
            a.phone.includes(q) ||
            (a.organization && a.organization.toLowerCase().includes(q)) ||
            a.ticket_id.toLowerCase().includes(q)
        );
      }
      return list;
    } catch (e) {
      console.error('Neon get attendees error:', e);
    }
  }

  // Local fallback
  const store = getLocalStore();
  let list: AttendeeRecord[] = (store.attendees || []).map(sanitize);
  if (slug) {
    list = list.filter((a) => a.event_slug === slug);
  }
  if (search) {
    const q = search.toLowerCase();
    list = list.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q) ||
        a.phone.includes(q) ||
        (a.organization && a.organization.toLowerCase().includes(q)) ||
        a.ticket_id.toLowerCase().includes(q)
    );
  }
  return list;
}

export async function createContactInquiry(
  data: Omit<ContactInquiry, 'id' | 'created_at' | 'inquiry_id' | 'status'>
): Promise<ContactInquiry> {
  const inquiry_id = `INQ-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Date.now().toString().slice(-4)}`;
  const created_at = new Date().toISOString();
  const record: ContactInquiry = {
    ...data,
    inquiry_id,
    status: 'unread',
    created_at
  };

  const sql = await getNeonClient();
  if (sql) {
    try {
      const rows = await sql`
        INSERT INTO contact_inquiries (
          inquiry_id, name, email, phone, subject, message, opt_in, status
        ) VALUES (
          ${record.inquiry_id}, ${record.name}, ${record.email}, ${record.phone || ''},
          ${record.subject || ''}, ${record.message}, ${record.opt_in}, 'unread'
        )
        RETURNING *;
      `;
      if (rows.length > 0) return rows[0] as unknown as ContactInquiry;
    } catch (e) {
      console.error('Neon insert inquiry error:', e);
    }
  }

  // Local fallback
  const store = getLocalStore();
  store.inquiries = store.inquiries || [];
  store.inquiries.unshift(record);
  saveLocalStore(store);
  return record;
}

export async function getAllContactInquiries(search?: string, status?: string): Promise<ContactInquiry[]> {
  const sql = await getNeonClient();
  if (sql) {
    try {
      let rows;
      if (status && status !== 'all') {
        rows = await sql`
          SELECT * FROM contact_inquiries WHERE status = ${status} ORDER BY created_at DESC;
        `;
      } else {
        rows = await sql`
          SELECT * FROM contact_inquiries ORDER BY created_at DESC;
        `;
      }
      let list = rows as unknown as ContactInquiry[];
      if (search) {
        const q = search.toLowerCase();
        list = list.filter(
          (inq) =>
            inq.name.toLowerCase().includes(q) ||
            inq.email.toLowerCase().includes(q) ||
            (inq.phone && inq.phone.includes(q)) ||
            (inq.subject && inq.subject.toLowerCase().includes(q)) ||
            inq.message.toLowerCase().includes(q) ||
            inq.inquiry_id.toLowerCase().includes(q)
        );
      }
      return list;
    } catch (e) {
      console.error('Neon get inquiries error:', e);
    }
  }

  // Local fallback
  const store = getLocalStore();
  let list: ContactInquiry[] = store.inquiries || [];
  if (status && status !== 'all') {
    list = list.filter((i) => i.status === status);
  }
  if (search) {
    const q = search.toLowerCase();
    list = list.filter(
      (inq) =>
        inq.name.toLowerCase().includes(q) ||
        inq.email.toLowerCase().includes(q) ||
        (inq.phone && inq.phone.includes(q)) ||
        (inq.subject && inq.subject.toLowerCase().includes(q)) ||
        inq.message.toLowerCase().includes(q) ||
        inq.inquiry_id.toLowerCase().includes(q)
    );
  }
  return list;
}

export async function updateContactInquiryStatus(
  inquiry_id: string,
  status: 'unread' | 'read' | 'resolved'
): Promise<boolean> {
  const sql = await getNeonClient();
  if (sql) {
    try {
      await sql`
        UPDATE contact_inquiries SET status = ${status} WHERE inquiry_id = ${inquiry_id};
      `;
      return true;
    } catch (e) {
      console.error('Neon update inquiry status error:', e);
    }
  }

  // Local fallback
  const store = getLocalStore();
  store.inquiries = store.inquiries || [];
  const idx = store.inquiries.findIndex((i: ContactInquiry) => i.inquiry_id === inquiry_id);
  if (idx !== -1) {
    store.inquiries[idx].status = status;
    saveLocalStore(store);
    return true;
  }
  return false;
}

export async function deleteContactInquiry(inquiry_id: string): Promise<boolean> {
  const sql = await getNeonClient();
  if (sql) {
    try {
      await sql`
        DELETE FROM contact_inquiries WHERE inquiry_id = ${inquiry_id};
      `;
      return true;
    } catch (e) {
      console.error('Neon delete inquiry error:', e);
    }
  }

  // Local fallback
  const store = getLocalStore();
  store.inquiries = store.inquiries || [];
  store.inquiries = store.inquiries.filter((i: ContactInquiry) => i.inquiry_id !== inquiry_id);
  saveLocalStore(store);
  return true;
}
