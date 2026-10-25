import React, { useState } from 'react';
import {
  ShieldAlert,
  Search,
  Filter,
  CheckCircle,
  Clock,
  Trash2,
  Download,
  AlertTriangle,
  Info,
  Footprints,
  Eye,
  Camera,
  Activity,
  UserCheck,
  UserX,
} from 'lucide-react';
import { SecurityEvent, EventType, EventSeverity } from '../../types/events';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';

interface EventLogProps {
  events: SecurityEvent[];
  isLoading: boolean;
  totalCount: number;
  onAcknowledge: (id: string) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
}

export const EventLog: React.FC<EventLogProps> = ({
  events,
  isLoading,
  totalCount,
  onAcknowledge,
  onDelete,
  onClearAll,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('ALL');
  const [selectedEvent, setSelectedEvent] = useState<SecurityEvent | null>(null);

  // Filter events locally
  const filteredEvents = events.filter((e) => {
    if (selectedType !== 'ALL' && e.eventType !== selectedType) return false;
    if (selectedSeverity !== 'ALL' && e.severity !== selectedSeverity) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const matchDesc = e.description.toLowerCase().includes(term);
      const matchType = e.eventType.toLowerCase().includes(term);
      const matchSource = e.source.toLowerCase().includes(term);
      const matchName = e.metadata?.recognizedName?.toLowerCase().includes(term);
      if (!matchDesc && !matchType && !matchSource && !matchName) return false;
    }
    return true;
  });

  const getEventIcon = (type: EventType, sev: EventSeverity) => {
    switch (type) {
      case 'Footstep Event':
      case 'Potential Intrusion':
        return <Footprints className="w-4 h-4 text-state-warning" />;
      case 'Known Face Match':
        return <UserCheck className="w-4 h-4 text-state-success" />;
      case 'Unknown Face':
        return <UserX className="w-4 h-4 text-state-warning" />;
      case 'Face Detected':
        return <Eye className="w-4 h-4 text-cyan" />;
      case 'Camera Started':
      case 'Camera Stopped':
        return <Camera className="w-4 h-4 text-signal-blue" />;
      case 'Device Connected':
      case 'Device Disconnected':
        return <Activity className="w-4 h-4 text-cyan" />;
      default:
        return <Info className="w-4 h-4 text-text-secondary" />;
    }
  };

  const getSeverityBadgeVariant = (sev: EventSeverity) => {
    switch (sev) {
      case 'critical':
        return 'critical' as const;
      case 'warning':
        return 'warning' as const;
      case 'success':
        return 'success' as const;
      default:
        return 'cyan' as const;
    }
  };

  const handleExportCSV = () => {
    if (filteredEvents.length === 0) return;
    const headers = ['ID', 'Timestamp', 'Event Type', 'Source', 'Severity', 'Mode', 'Acknowledged', 'Description'];
    const rows = filteredEvents.map((e) => [
      e.id,
      e.timestamp,
      `"${e.eventType}"`,
      `"${e.source}"`,
      e.severity,
      e.mode,
      e.acknowledged ? 'YES' : 'NO',
      `"${e.description.replace(/"/g, '""')}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `floorguard-security-events-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-bg-card border border-border rounded-2xl overflow-hidden shadow-xl flex flex-col">
      {/* Header & Controls */}
      <div className="p-4 sm:p-5 border-b border-border bg-bg-secondary/40 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-text-primary text-base sm:text-lg flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-cyan" />
            <span>Intrusion & Vision Event Log</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-bg-elevated border border-border text-cyan">
              {totalCount} Total
            </span>
          </h3>
          <p className="text-xs text-text-muted mt-0.5">
            Real-time multi-sensor audit trail (Piezoelectric stress transients + Optical identity verification).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleExportCSV}
            icon={<Download className="w-3.5 h-3.5" />}
            disabled={filteredEvents.length === 0}
          >
            Export CSV
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            icon={<Trash2 className="w-3.5 h-3.5 text-state-critical" />}
            disabled={events.length === 0}
          >
            Clear Log
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-3 sm:p-4 border-b border-border bg-bg-card/70 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-text-muted shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search events, sources, or profile names..."
            className="w-full bg-transparent border-none text-text-primary placeholder:text-text-muted text-xs focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-3">
          {/* Event Type Dropdown */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-bg-elevated border border-border rounded-lg px-2.5 py-1 text-xs text-text-primary focus:outline-none"
          >
            <option value="ALL">All Event Types</option>
            <option value="Footstep Event">Footstep Event</option>
            <option value="Potential Intrusion">Potential Intrusion</option>
            <option value="Known Face Match">Known Face Match</option>
            <option value="Unknown Face">Unknown Face</option>
            <option value="Face Detected">Face Detected</option>
            <option value="Device Connected">Device Connected</option>
          </select>

          {/* Severity Dropdown */}
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="bg-bg-elevated border border-border rounded-lg px-2.5 py-1 text-xs text-text-primary focus:outline-none"
          >
            <option value="ALL">All Severities</option>
            <option value="critical">Critical</option>
            <option value="warning">Warning</option>
            <option value="success">Success</option>
            <option value="info">Info</option>
          </select>
        </div>
      </div>

      {/* Event Items List */}
      <div className="overflow-y-auto max-h-[480px] divide-y divide-border/60">
        {isLoading && events.length === 0 ? (
          <div className="p-8 text-center text-xs font-mono text-text-muted">
            Loading security event history...
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="p-12 text-center space-y-2">
            <CheckCircle className="w-8 h-8 text-cyan mx-auto opacity-40" />
            <h4 className="font-semibold text-text-primary text-sm">No Security Events Found</h4>
            <p className="text-xs text-text-muted max-w-sm mx-auto">
              {searchTerm || selectedType !== 'ALL'
                ? 'No events match the selected search or filter criteria.'
                : 'The event log is currently empty. Footstep detections or camera verifications will appear here in real time.'}
            </p>
          </div>
        ) : (
          filteredEvents.map((evt) => (
            <div
              key={evt.id}
              onClick={() => setSelectedEvent(evt)}
              className="p-3.5 sm:p-4 hover:bg-bg-elevated/40 cursor-pointer transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              {/* Left Details */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-bg-elevated border border-border shrink-0 mt-0.5">
                  {getEventIcon(evt.eventType, evt.severity)}
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-text-primary text-sm">
                      {evt.eventType}
                    </span>
                    <Badge variant={getSeverityBadgeVariant(evt.severity)} size="sm">
                      {evt.severity}
                    </Badge>
                    <Badge variant={evt.mode === 'DEMO' ? 'warning' : 'success'} size="sm">
                      {evt.mode}
                    </Badge>
                    {evt.acknowledged ? (
                      <span className="text-[10px] font-mono text-state-success flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Acknowledged
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-state-warning flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> Action Required
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-text-secondary leading-relaxed">
                    {evt.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-text-muted pt-0.5">
                    <span>Source: {evt.source}</span>
                    <span>•</span>
                    <span>{new Date(evt.timestamp).toLocaleTimeString()}</span>
                    <span>•</span>
                    <span>{new Date(evt.timestamp).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                {!evt.acknowledged && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAcknowledge(evt.id);
                    }}
                    className="text-xs py-1"
                  >
                    Acknowledge
                  </Button>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(evt.id);
                  }}
                  className="p-1.5 rounded text-text-muted hover:text-state-critical transition-colors"
                  title="Remove event from log"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Event Details Modal */}
      <Modal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        title={selectedEvent ? `Event Inspection: ${selectedEvent.id}` : ''}
        subtitle="Cryptographic Log & Sensor Telemetry Metadata"
        maxWidth="md"
      >
        {selectedEvent && (
          <div className="space-y-4 text-xs font-mono">
            <div className="p-3 rounded-lg bg-bg-secondary border border-border space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-text-muted">Type:</span>
                <span className="font-bold text-text-primary">{selectedEvent.eventType}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-muted">Timestamp:</span>
                <span className="text-cyan">{new Date(selectedEvent.timestamp).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-muted">Origin Source:</span>
                <span className="text-text-primary">{selectedEvent.source}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-muted">Operation Mode:</span>
                <span className={selectedEvent.mode === 'DEMO' ? 'text-state-warning' : 'text-state-success'}>
                  {selectedEvent.mode === 'DEMO' ? 'SIMULATED DEMONSTRATION' : 'VERIFIED HARDWARE DEVICE'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-muted">Status:</span>
                <span className={selectedEvent.acknowledged ? 'text-state-success' : 'text-state-warning'}>
                  {selectedEvent.acknowledged ? `Acknowledged by ${selectedEvent.acknowledgedBy || 'Operator'}` : 'Unacknowledged'}
                </span>
              </div>
            </div>

            <div>
              <span className="text-text-muted block mb-1">Description:</span>
              <div className="p-3 rounded-lg bg-bg-card border border-border text-text-secondary leading-relaxed font-sans text-xs">
                {selectedEvent.description}
              </div>
            </div>

            {selectedEvent.metadata && (
              <div>
                <span className="text-text-muted block mb-1">Telemetry Payload:</span>
                <pre className="p-3 rounded-lg bg-black/60 border border-border text-cyan text-[11px] overflow-x-auto">
                  {JSON.stringify(selectedEvent.metadata, null, 2)}
                </pre>
              </div>
            )}

            <div className="pt-2 flex justify-end gap-2">
              {!selectedEvent.acknowledged && (
                <Button
                  variant="cyan"
                  size="sm"
                  onClick={() => {
                    onAcknowledge(selectedEvent.id);
                    setSelectedEvent(null);
                  }}
                >
                  Acknowledge Alert
                </Button>
              )}
              <Button variant="secondary" size="sm" onClick={() => setSelectedEvent(null)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
