import db from '../config/db.js';
import { logAudit } from '../middleware/auth.js';

export async function createTicket(req, res) {
  try {
    const { subject, category = 'General', message, priority = 'Medium' } = req.body;
    const uid = req.user.uid;
    const candidateId = req.user.candidateId;

    if (!subject || !message) {
      return res.status(400).json({ success: false, message: 'Subject and message are required' });
    }

    const tickets = db.getCollection('supportTickets');
    const ticketId = `#AICQB-${1001 + tickets.length}`;

    const newTicket = {
      id: `tick_${Date.now()}`,
      ticketId,
      candidateUid: uid,
      candidateId,
      candidateName: req.user.fullName || 'Candidate',
      candidateEmail: req.user.email,
      subject: subject.trim(),
      category,
      priority,
      message: message.trim(),
      status: 'In Progress',
      createdAt: new Date().toISOString(),
      dateFormatted: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      replies: [
        {
          sender: req.user.fullName,
          senderRole: 'Candidate',
          message: message.trim(),
          timestamp: new Date().toISOString(),
        },
      ],
    };

    db.addDoc('supportTickets', newTicket);

    logAudit(req, 'CREATE_TICKET', 'Help Center & Support', `Ticket ${ticketId} raised: ${newTicket.subject}`);

    return res.status(201).json({ success: true, message: 'Support ticket raised successfully.', ticket: newTicket });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to create support ticket' });
  }
}

export async function getCandidateTickets(req, res) {
  try {
    const uid = req.user.uid;
    const candidateId = req.user.candidateId;

    const list = db.find(
      'supportTickets',
      t => t.candidateUid === uid || t.candidateId === candidateId
    );

    return res.json({ success: true, count: list.length, tickets: list });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch tickets' });
  }
}

export async function getAllTicketsAdmin(req, res) {
  try {
    const list = db.getCollection('supportTickets');
    return res.json({ success: true, count: list.length, tickets: list.reverse() });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch tickets' });
  }
}

export async function replyTicket(req, res) {
  try {
    const { id } = req.params;
    const { message, status } = req.body;

    const ticket = db.findOne('supportTickets', t => t.id === id || t.ticketId === id);
    if (!ticket) {
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }

    const replies = ticket.replies || [];
    replies.push({
      sender: req.user.fullName || 'AICQB Support Officer',
      senderRole: req.user.role || 'Support Admin',
      message: message.trim(),
      timestamp: new Date().toISOString(),
    });

    const updates = { replies };
    if (status) updates.status = status;

    const updated = db.updateDoc('supportTickets', ticket.id, updates);

    logAudit(req, 'REPLY_TICKET', 'Help Center & Support', `Replied to ticket ${ticket.ticketId}`);

    return res.json({ success: true, message: 'Reply sent', ticket: updated });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to reply to ticket' });
  }
}

export async function submitContactForm(req, res) {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required' });
    }

    const count = db.getCollection('supportTickets').length + 1001;
    const ticketId = `#INQ-${count}`;

    const inquiry = {
      id: `inq_${Date.now()}`,
      ticketId,
      candidateUid: 'public_guest',
      candidateName: name.trim(),
      candidateEmail: email.trim().toLowerCase(),
      subject: subject ? subject.trim() : 'Public Website Inquiry',
      category: 'Inquiry',
      priority: 'Normal',
      message: message.trim(),
      status: 'Open',
      createdAt: new Date().toISOString(),
      dateFormatted: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      replies: [
        {
          sender: name.trim(),
          senderRole: 'Guest',
          message: message.trim(),
          timestamp: new Date().toISOString(),
        },
      ],
    };

    db.addDoc('supportTickets', inquiry);

    return res.json({
      success: true,
      message: 'Thank you! Your message has been received. Our advisory team will respond within 24 hours.',
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to submit message' });
  }
}

