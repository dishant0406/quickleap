'use client';

import React, { forwardRef, useCallback, useEffect, useState } from 'react';

import { AlertCircle, CheckCircle, Globe } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Input } from './input';
import { Label } from './label';

export interface UrlInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'onBlur'> {
  /** Label text for the input */
  label?: string;

  /** Whether to accept query parameters in the URL */
  acceptQuery?: boolean;

  /** Whether to accept path components in the URL */
  acceptPath?: boolean;

  /** Whether to show validation errors */
  showError?: boolean;

  /** Custom validation function */
  isValid?: (url: string) => boolean;

  /** Callback when validation fails */
  onNotValid?: (url: string, error: string) => void;

  /** Callback when validation succeeds */
  onValid?: (url: string) => void;

  /** Custom onChange handler that receives processed URL */
  onChange?: (value: string) => void;

  /** Custom onBlur handler that receives processed URL */
  onBlur?: (value: string) => void;

  /** Whether to process URLs automatically (remove path/query based on acceptPath/acceptQuery) */
  autoProcess?: boolean;

  /** Whether to require HTTPS protocol */
  requireHttps?: boolean;

  /** Whether to allow domain-only URLs (no protocol required) */
  allowDomainOnly?: boolean;

  /** Custom placeholder text */
  placeholderText?: string;

  /** Whether to show validation status icon */
  showValidationIcon?: boolean;

  /** Additional validation constraints */
  validation?: {
    /** Minimum URL length */
    minLength?: number;
    /** Maximum URL length */
    maxLength?: number;
    /** Required domain patterns (regex) */
    allowedDomains?: RegExp[];
    /** Blocked domain patterns (regex) */
    blockedDomains?: RegExp[];
    /** Custom validation message */
    customMessage?: string;
  };

  /** URL processing options */
  processing?: {
    /** Remove path when path is not accepted */
    removePath?: boolean;
    /** Remove query when query is not accepted */
    removeQuery?: boolean;
    /** Remove hash/fragment */
    removeHash?: boolean;
    /** Convert to lowercase */
    toLowerCase?: boolean;
    /** Add protocol if missing */
    addProtocol?: 'http' | 'https';
  };

  /** Error display options */
  errorDisplay?: {
    /** Position of error message */
    position?: 'bottom' | 'top' | 'inline';
    /** Custom error styling */
    className?: string;
    /** Show error icon */
    showIcon?: boolean;
  };

  /** Current validation error */
  error?: string;

  /** External validation state */
  isValidExternal?: boolean;
}

const UrlInput = forwardRef<HTMLInputElement, UrlInputProps>(
  (
    {
      label,
      acceptQuery = true,
      acceptPath = true,
      showError = true,
      isValid,
      onNotValid,
      onValid,
      onChange,
      onBlur,
      autoProcess = true,
      requireHttps = false,
      allowDomainOnly = false,
      placeholderText,
      showValidationIcon = true,
      validation,
      processing,
      errorDisplay = { position: 'bottom', showIcon: true },
      error: externalError,
      isValidExternal,
      className,
      value,
      ...props
    },
    ref
  ) => {
    // Initialize with protocol if specified and value is empty/undefined
    const getInitialValue = (): string => {
      if (value) return String(value);
      if (processing?.addProtocol && allowDomainOnly) {
        return `${processing.addProtocol}://`;
      }
      return '';
    };

    const [internalValue, setInternalValue] = useState(getInitialValue());
    const [validationError, setValidationError] = useState<string>('');
    const [isValidState, setIsValidState] = useState<boolean | null>(null);
    const [isFocused, setIsFocused] = useState(false);

    // Use external validation state if provided, otherwise use internal state
    const currentError = externalError || validationError;
    const currentIsValid = isValidExternal !== undefined ? isValidExternal : isValidState;

    // Generate appropriate placeholder
    const getPlaceholder = useCallback(() => {
      if (placeholderText) return placeholderText;

      let placeholder = '';
      if (allowDomainOnly) {
        placeholder = 'example.com';
      } else {
        placeholder = requireHttps ? 'https://example.com' : 'https://example.com';
      }

      if (acceptPath) placeholder += '/path';
      if (acceptQuery) placeholder += '?param=value';

      return placeholder;
    }, [placeholderText, allowDomainOnly, requireHttps, acceptPath, acceptQuery]);

    // URL validation function
    const validateUrl = useCallback(
      (url: string): { isValid: boolean; error: string } => {
        if (!url.trim()) {
          return { isValid: true, error: '' }; // Empty is valid (required check should be separate)
        }

        // Custom validation function takes precedence
        if (isValid) {
          const valid = isValid(url);
          return {
            isValid: valid,
            error: valid ? '' : validation?.customMessage || 'Invalid URL format',
          };
        }

        // Length validation
        if (validation?.minLength && url.length < validation.minLength) {
          return {
            isValid: false,
            error: `URL must be at least ${validation.minLength} characters`,
          };
        }
        if (validation?.maxLength && url.length > validation.maxLength) {
          return {
            isValid: false,
            error: `URL must be no more than ${validation.maxLength} characters`,
          };
        }

        // Pre-validation checks for obviously malformed URLs
        const trimmedUrl = url.trim();

        // Check for repeated protocols (e.g., https://example.comhttps://example.com)
        const protocolMatches = trimmedUrl.match(/https?:\/\//g);
        if (protocolMatches && protocolMatches.length > 1) {
          return { isValid: false, error: 'URL contains multiple protocols' };
        }

        // Check for invalid characters that shouldn't be in URLs
        if (/[\s<>"{}|\\^`]/.test(trimmedUrl)) {
          return { isValid: false, error: 'URL contains invalid characters' };
        }

        // Try to parse URL
        let parsedUrl: URL;
        let processedUrl = trimmedUrl;

        // Handle domain-only URLs
        if (allowDomainOnly && !processedUrl.includes('://')) {
          const protocol = processing?.addProtocol || (requireHttps ? 'https' : 'https');
          processedUrl = `${protocol}://${processedUrl}`;
        }

        // Check if URL is just a protocol (invalid)
        if (processedUrl.match(/^https?:\/\/$/) || processedUrl.match(/^https?:\/\/\s*$/)) {
          return {
            isValid: false,
            error: 'Please enter a valid domain'
          };
        }

        try {
          parsedUrl = new URL(processedUrl);
        } catch {
          if (allowDomainOnly) {
            // Try with www prefix if it's a simple domain
            try {
              parsedUrl = new URL(`https://www.${trimmedUrl}`);
            } catch {
              return { isValid: false, error: 'Invalid URL or domain format' };
            }
          } else {
            return { isValid: false, error: 'Invalid URL format' };
          }
        }

        // Additional validation after successful URL parsing
        // Check if the hostname is reasonable (not empty, doesn't contain invalid chars)
        if (!parsedUrl.hostname || parsedUrl.hostname.length === 0) {
          return { isValid: false, error: 'URL must have a valid hostname' };
        }

        // Check for valid hostname format
        if (
          !/^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
            parsedUrl.hostname
          )
        ) {
          return { isValid: false, error: 'Invalid hostname format' };
        }

        // Check if URL was properly reconstructed (catches many malformed cases)
        const reconstructedUrl = parsedUrl.toString();
        // Normalize both URLs for comparison (remove trailing slash for comparison)
        const normalizeForComparison = (url: string): string =>
          url.endsWith('/') && url !== 'https://' && url !== 'http://' ? url.slice(0, -1) : url;
        const normalizedProcessed = normalizeForComparison(processedUrl);
        const normalizedReconstructed = normalizeForComparison(reconstructedUrl);

        if (normalizedProcessed !== normalizedReconstructed && !allowDomainOnly) {
          // For non-domain-only inputs, the processed URL should match the reconstructed URL
          // This catches cases where the URL constructor accepted malformed input
          return { isValid: false, error: 'Malformed URL detected' };
        }

        // Protocol validation
        if (requireHttps && parsedUrl.protocol !== 'https:') {
          return { isValid: false, error: 'HTTPS protocol is required' };
        }

        // Ensure protocol is http or https
        if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
          return { isValid: false, error: 'Only HTTP and HTTPS protocols are allowed' };
        }

        // Path validation (only validate if not going to be processed away)
        if (!acceptPath && parsedUrl.pathname !== '/' && !processing?.removePath) {
          return { isValid: false, error: 'Path components are not allowed' };
        }

        // Query validation (only validate if not going to be processed away)
        if (!acceptQuery && parsedUrl.search && !processing?.removeQuery) {
          return { isValid: false, error: 'Query parameters are not allowed' };
        }

        // Domain validation
        if (validation?.allowedDomains) {
          const isAllowed = validation.allowedDomains.some((pattern) =>
            pattern.test(parsedUrl.hostname)
          );
          if (!isAllowed) {
            return { isValid: false, error: 'Domain is not allowed' };
          }
        }

        if (validation?.blockedDomains) {
          const isBlocked = validation.blockedDomains.some((pattern) =>
            pattern.test(parsedUrl.hostname)
          );
          if (isBlocked) {
            return { isValid: false, error: 'Domain is not allowed' };
          }
        }

        return { isValid: true, error: '' };
      },
      [
        isValid,
        validation,
        acceptPath,
        acceptQuery,
        requireHttps,
        allowDomainOnly,
        processing?.addProtocol,
        processing?.removePath,
        processing?.removeQuery,
      ]
    );

    // URL processing function
    const processUrl = useCallback(
      (url: string): string => {
        if (!url.trim() || !autoProcess) return url;

        try {
          // Parse the URL directly instead of using formatUrl to avoid unwanted transformations
          let processedUrl = url.trim();

          // Add protocol if missing and allowDomainOnly is true
          if (allowDomainOnly && !processedUrl.includes('://')) {
            const protocol = processing?.addProtocol || 'https';
            processedUrl = `${protocol}://${processedUrl}`;
          }

          const urlObj = new URL(processedUrl);

          // Apply processing options
          // Remove path if explicitly requested OR if not accepted
          if (processing?.removePath || (!acceptPath && urlObj.pathname !== '/')) {
            urlObj.pathname = '/';
          }

          // Remove query if explicitly requested OR if not accepted
          if (processing?.removeQuery || (!acceptQuery && urlObj.search)) {
            urlObj.search = '';
          }

          if (processing?.removeHash) {
            urlObj.hash = '';
          }

          let result = urlObj.toString();

          // Remove trailing slash if it was just added by URL constructor and wasn't in original
          if (result.endsWith('/') && !url.endsWith('/') && urlObj.pathname === '/') {
            result = result.slice(0, -1);
          }

          if (processing?.toLowerCase) {
            result = result.toLowerCase();
          }

          return result;
        } catch {
          return url;
        }
      },
      [autoProcess, processing, allowDomainOnly, acceptPath, acceptQuery]
    );

    // Handle value changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const newValue = e.target.value;
      setInternalValue(newValue);

      // Validate immediately
      const { isValid: valid, error } = validateUrl(newValue);
      setValidationError(error);
      setIsValidState(valid);

      // Call validation callbacks
      if (!valid && onNotValid) {
        onNotValid(newValue, error);
      } else if (valid && onValid) {
        onValid(newValue);
      }

      // Call onChange with original value (not processed)
      onChange?.(newValue);
    };

    // Handle blur events (process URL if needed)
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
      setIsFocused(false);
      const currentValue = e.target.value;

      if (autoProcess) {
        const processedValue = processUrl(currentValue);
        if (processedValue !== currentValue) {
          setInternalValue(processedValue);

          // Re-validate processed URL
          const { isValid: valid, error } = validateUrl(processedValue);
          setValidationError(error);
          setIsValidState(valid);

          // Call callbacks with processed value
          if (!valid && onNotValid) {
            onNotValid(processedValue, error);
          } else if (valid && onValid) {
            onValid(processedValue);
          }

          onBlur?.(processedValue);
          return;
        }
      }

      onBlur?.(currentValue);
    };

    const handleFocus = (): void => {
      setIsFocused(true);
    };

    // Update internal value when external value changes
    useEffect(() => {
      if (value !== undefined && value !== internalValue) {
        const stringValue = String(value);
        setInternalValue(stringValue);
        const { isValid: valid, error } = validateUrl(stringValue);
        setValidationError(error);
        setIsValidState(valid);
      }
    }, [value, internalValue, validateUrl]);

    // Reprocess URL when processing options change
    useEffect(() => {
      if (autoProcess && internalValue) {
        const valueStr = String(internalValue).trim();
        if (valueStr) {
          const processedValue = processUrl(valueStr);
          if (processedValue !== valueStr) {
            setInternalValue(processedValue);

            // Re-validate processed URL
            const { isValid: valid, error } = validateUrl(processedValue);
            setValidationError(error);
            setIsValidState(valid);

            // Notify parent of the processed value
            onChange?.(processedValue);
          }
        }
      }
    }, [
      processing?.removePath,
      processing?.removeQuery,
      processing?.removeHash,
      autoProcess,
      processUrl,
      validateUrl,
      onChange,
      internalValue,
    ]);

    // Determine icon to show
    const getValidationIcon = (): React.ReactElement | null => {
      const stringValue = String(internalValue);
      if (!showValidationIcon || !stringValue.trim()) return null;

      if (currentIsValid === true) {
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      } else if (currentIsValid === false) {
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      }

      return <Globe className="h-4 w-4 text-muted-foreground" />;
    };

    // Error message component
    const ErrorMessage = ({ error }: { error: string }): React.ReactElement | null => {
      if (!error || !showError) return null;

      return (
        <div
          className={cn(
            'flex items-center gap-1 text-sm text-red-500 mt-1',
            errorDisplay.className
          )}
        >
          {errorDisplay.showIcon && <AlertCircle className="h-3 w-3" />}
          <span>{error}</span>
        </div>
      );
    };

    return (
      <div className="space-y-2">
        {label && (
          <Label className="md:text-base text-xs" htmlFor={props.id}>
            {label}
          </Label>
        )}

        {errorDisplay.position === 'top' && <ErrorMessage error={currentError} />}

        <div className="relative">
          <Input
            {...props}
            ref={ref}
            className={cn(
              'pr-8', // Space for validation icon
              currentIsValid === false && 'border-red-500 focus:border-red-500',
              currentIsValid === true && 'border-green-500 focus:border-green-500',
              className
            )}
            placeholder={getPlaceholder()}
            type="text"
            value={internalValue}
            onBlur={handleBlur}
            onChange={handleInputChange}
            onFocus={handleFocus}
          />

          {/* Validation icon */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2">{getValidationIcon()}</div>
        </div>

        {errorDisplay.position === 'bottom' && <ErrorMessage error={currentError} />}

        {errorDisplay.position === 'inline' && isFocused && <ErrorMessage error={currentError} />}
      </div>
    );
  }
);

UrlInput.displayName = 'UrlInput';

export { UrlInput };
