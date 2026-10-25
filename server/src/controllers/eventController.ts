import { Request, Response } from 'express';
import { store } from '../database/store';
import { broadcastEvent } from '../services/websocketService';
import { SecurityEvent } from '../../src/types/events';

export const getEvents = (req: Request, res: Response) => {
  const { eventType, severity, mode, search, acknowledged, page = '1', limit = '50' } = req.query;

  let events = store.getEvents();

  if (eventType && typeof eventType === 'string') {
    events = events.filter(e => e.eventType.toLowerCase() === eventType.toLowerCase());
  }

  if (severity && typeof severity === 'string') {
    events = events.filter(e => e.severity === severity);
  }

  if (mode && typeof mode === 'string') {
    events = events.filter(e => e.mode === mode);
  }

  if (acknowledged !== undefined) {
    const isAck = acknowledged === 'true';
    events = events.filter(e => e.acknowledged === isAck);
  }

  if (search && typeof search === 'string') {
    const term = search.toLowerCase();
    events = events.filter(e =>
      e.description.toLowerCase().includes(term) ||
      e.eventType.toLowerCase().includes(term) ||
      e.source.toLowerCase().includes(term) ||
      (e.metadata?.recognizedName && e.metadata.recognizedName.toLowerCase().includes(term))
    );
  }

  const pageNum = parseInt(page as string, 10) || 1;
  const limitNum = parseInt(limit as string, 10) || 50;
  const total = events.length;
  const startIndex = (pageNum - 1) * limitNum;
  const paginatedEvents = events.slice(startIndex, startIndex + limitNum);

  return res.json({
    success: true,
    total,
    page: pageNum,
    totalPages: Math.ceil(total / limitNum),
    data: paginatedEvents
  });
};

export const getEventById = (req: Request, res: Response) => {
  const { id } = req.params;
  const event = store.getEvent(id);
  if (!event) {
    return res.status(404).json({ success: false, error: 'Event not found' });
  }
  return res.json({ success: true, data: event });
};

export const createEvent = (req: Request, res: Response) => {
  const {
    eventType,
    source,
    description,
    severity = 'info',
    mode = 'DEMO',
    metadata
  } = req.body;

  if (!eventType || !source || !description) {
    return res.status(400).json({
      success: false,
      error: 'Missing required event fields: eventType, source, description'
    });
  }

  // Deduplication check: prevent duplicate event spam within 3 seconds
  const recentEvents = store.getEvents().slice(0, 5);
  const now = Date.now();
  const isDuplicate = recentEvents.some(e => {
    const timeDiff = now - new Date(e.timestamp).getTime();
    return timeDiff < 3000 &&
      e.eventType === eventType &&
      e.source === source &&
      e.metadata?.recognizedName === metadata?.recognizedName;
  });

  if (isDuplicate) {
    return res.status(200).json({
      success: true,
      deduplicated: true,
      message: 'Event deduplicated by cooldown window.'
    });
  }

  const newEvent: SecurityEvent = {
    id: `EVT-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 1000)}`,
    timestamp: new Date().toISOString(),
    eventType,
    source,
    description,
    severity,
    mode,
    acknowledged: false,
    metadata
  };

  store.addEvent(newEvent);
  broadcastEvent(newEvent);

  return res.status(201).json({ success: true, data: newEvent });
};

export const acknowledgeEvent = (req: Request, res: Response) => {
  const { id } = req.params;
  const { acknowledgedBy = 'Security Operator' } = req.body;

  const event = store.acknowledgeEvent(id, acknowledgedBy);
  if (!event) {
    return res.status(404).json({ success: false, error: 'Event not found' });
  }

  return res.json({ success: true, message: 'Event acknowledged', data: event });
};

export const deleteEvent = (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = store.deleteEvent(id);
  if (!deleted) {
    return res.status(404).json({ success: false, error: 'Event not found' });
  }
  return res.json({ success: true, message: 'Event removed from log' });
};

export const clearAllEvents = (_req: Request, res: Response) => {
  store.clearEvents();
  return res.json({ success: true, message: 'All event logs cleared.' });
};
