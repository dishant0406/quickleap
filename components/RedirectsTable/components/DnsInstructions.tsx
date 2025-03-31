import React from 'react';

import { Loader2, Lock, ShieldCheck } from 'lucide-react';

import { Alert } from '@/components/ui/alert';

interface DnsInstructionsProps {
  status: DomainStatus;
  isPolling: boolean;
}

export const DnsInstructions: React.FC<DnsInstructionsProps> = ({ status, isPolling }) => {
  if (status.status.success) {
    return (
      <div className="space-y-4 max-w-full">
        <Alert>
          <div className="flex items-start gap-2 md:gap-4">
            <div className="mt-1">
              <ShieldCheck className="h-5 w-5 md:h-6 md:w-6 text-accent-foreground" />
            </div>
            <div>
              <h3 className="text-foreground text-sm md:text-base font-medium mb-1 md:mb-2">
                {status.status.title}
              </h3>
              <p className="text-muted-foreground text-xs md:text-sm">{status.status.summary}</p>
              {status.status.detail && (
                <div className="mt-3 md:mt-4 flex items-center gap-2 text-xs md:text-sm">
                  {status.status.certificateStatus === 'pending' ? (
                    <>
                      <Loader2 className="animate-spin text-accent-foreground" size={14} />
                      <span className="text-accent-foreground">{status.status.detail}</span>
                    </>
                  ) : (
                    <>
                      <Lock className="text-accent-foreground" size={14} />
                      <span className="text-accent-foreground">
                        SSL certificate is active and protecting your domain
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </Alert>

        <Alert variant={'destructive'}>
          <div className="space-y-2">
            <h4 className="font-medium text-foreground">DNS Configuration</h4>
            <div className="flex flex-col mt-2 gap-1 md:gap-2">
              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="text-muted-foreground">Record Type:</span>
                <span className="text-foreground sm:ml-2">{status.dnsRecords.type}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="text-muted-foreground">Value:</span>
                <span className="text-foreground sm:ml-2 break-all">
                  {status.dnsRecords.addresses[0]}
                </span>
              </div>
            </div>
          </div>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6 max-w-full">
      <Alert variant={'destructive'}>
        <h3 className="text-destructive text-sm md:text-base font-medium mb-1 md:mb-2">
          {status.status.title}
        </h3>
        <p className="text-muted-foreground text-xs md:text-sm">{status.status.summary}</p>
      </Alert>

      <Alert>
        <h4 className="font-medium text-sm md:text-base text-foreground">Required DNS Record</h4>
        <div className="bg-card rounded-base p-3 md:p-4 mt-2 font-mono text-xs md:text-sm border border-border">
          <div className="flex flex-col gap-1 md:gap-2">
            <div className="flex flex-col sm:flex-row sm:items-center">
              <span className="text-muted-foreground">Type:</span>
              <span className="text-foreground sm:ml-2">{status.required?.recordType}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center">
              <span className="text-muted-foreground">Value:</span>
              <span className="text-foreground sm:ml-2 break-all">{status.required?.value}</span>
            </div>
          </div>
        </div>
      </Alert>

      {status.instructions && (
        <div className="space-y-3 md:space-y-4">
          <h4 className="font-medium text-sm md:text-base text-foreground">
            {status.instructions.title}
          </h4>
          <ol className="space-y-2 md:space-y-3">
            {status.instructions.steps.map((step) => (
              <li
                key={step.step}
                className="flex items-start gap-2 md:gap-3 text-xs md:text-sm text-muted-foreground"
              >
                <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full bg-muted text-xs font-medium text-muted-foreground">
                  {step.step}
                </span>
                <span>{step.description}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {status.support && (
        <Alert>
          <p>{status.support.additionalInfo}</p>
          <p className="mt-2">
            Need help?{' '}
            <a
              className="text-primary hover:text-primary/80 transition-colors"
              href={`mailto:${status.support.contactEmail}`}
              onClick={(e) => e.stopPropagation()}
            >
              Contact support
            </a>
          </p>
        </Alert>
      )}

      {isPolling && (
        <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
          <Loader2 className="animate-spin" size={14} />
          Checking DNS records every 5 seconds...
        </div>
      )}
    </div>
  );
};
