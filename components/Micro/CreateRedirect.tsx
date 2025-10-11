'use client';

import { useEffect, useState } from 'react';

import { GitPullRequestCreateArrowIcon } from 'lucide-react';
import { z } from 'zod';

import { addRedirect, updateRedirect } from '@/lib/api';
import { RedirectType } from '@/lib/constants';
import { formatUrl } from '@/lib/helpers';
import useForm from '@/lib/hooks/useForm';
import { promiseToast } from '@/lib/toast';
import useRedirectStore from '@/lib/zustand';

import { Alert } from '../ui/alert';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/custom-checkbox';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { Switch } from '../ui/switch';
import { UrlInput } from '../ui/url-input';

import Modal, { ModalFooter } from './Modal';

const redirectSchema = z.object({
  fromDomain: z.string().url('Please enter a valid URL'),
  toDomain: z.string().url('Please enter a valid URL'),
  redirectType: z.enum([RedirectType.Permanent, RedirectType.Temporary]),
  pathForwarding: z.boolean(),
  queryForwarding: z.boolean(),
  samplingRate: z.number().min(0).max(1),
});

// Initial state matching your example
const initialState = {
  fromDomain: '',
  toDomain: '',
  redirectType: RedirectType.Permanent,
  pathForwarding: false,
  queryForwarding: false,
  samplingRate: 1,
};

type Props = {
  redirect?: Redirect;
};

type ModalProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  redirect?: Redirect;
};

export const CreateRedirectModal: React.FC<ModalProps> = ({ isOpen, setIsOpen, redirect }) => {
  const { fetchRedirects } = useRedirectStore();
  const [formData, errors, handleChange, handleSubmit, loading, setLoading, setFormData] = useForm(
    initialState,
    redirectSchema,
    async (data) => {
      if (redirect) {
        promiseToast(
          updateRedirect({
            id: redirect.id,
            pathForwarding: data.pathForwarding,
            queryForwarding: data.queryForwarding,
            redirectType: data.redirectType,
            toDomain: data.toDomain,
            samplingRate: data.samplingRate,
          }),
          'Redirect updated successfully',
          {
            errorMessage: 'Failed to update redirect',
            final: () => {
              setIsOpen(false);
              fetchRedirects();
            },
            loadingText: 'Updating redirect...',
            setLoading,
          }
        );
        return;
      }

      promiseToast(
        addRedirect({
          fromDomain: data.fromDomain,
          toDomain: data.toDomain,
          redirectType: data.redirectType,
          pathForwarding: data.pathForwarding,
          queryForwarding: data.queryForwarding,
          samplingRate: data.samplingRate,
        }),
        'Redirect created successfully',
        {
          errorMessage: 'Failed to create redirect',
          final: () => {
            setIsOpen(false);
            fetchRedirects();
          },
          loadingText: 'Creating redirect...',
          setLoading,
        }
      );
    }
  );

  useEffect(() => {
    if (redirect) {
      setFormData({
        fromDomain: formatUrl(redirect.fromDomain)?.formattedUrl || '',
        toDomain: formatUrl(redirect.toDomain)?.formattedUrl || '',
        redirectType: redirect.redirectType,
        pathForwarding: redirect.pathForwarding,
        queryForwarding: redirect.queryForwarding,
        samplingRate: redirect.samplingRate ?? 1,
      });
    } else {
      // Reset to initial state when creating a new redirect
      setFormData(initialState);
    }
  }, [redirect, setFormData]);

  // Process fromDomain to always remove path and query
  const processFromDomain = (url: string) => {
    try {
      const parsed = formatUrl(url);
      if (!parsed.domain) return url;
      return `https://${parsed.domain}`;
    } catch {
      return url;
    }
  };

  // Add a new function for when the input loses focus
  const handleDomainBlur = (field: string, value: string) => {
    let processedValue = value;

    // Only process fromDomain to ensure it's domain-only
    if (field === 'fromDomain') {
      processedValue = processFromDomain(value);
    }
    // For toDomain, let UrlInput handle the processing based on its configuration

    handleChange(
      field as 'fromDomain' | 'toDomain' | 'redirectType' | 'pathForwarding' | 'queryForwarding',
      processedValue
    );
  };

  // Handle toggling pathForwarding or queryForwarding
  const handleForwardingToggle = (
    field: 'fromDomain' | 'toDomain' | 'redirectType' | 'pathForwarding' | 'queryForwarding',
    value: boolean
  ) => {
    // Simply update the form data - UrlInput will handle processing automatically
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const activeError = Object.values(errors)
    ?.filter((err) => err !== undefined)?.[0]
    ?.trim();

  const isButtonDisabled =
    activeError?.length > 0 || formData.fromDomain === '' || formData.toDomain === '' || loading;

  const error =
    activeError?.length > 0 ? activeError : isButtonDisabled ? 'Please fill out all fields' : '';

  // Check if we need to show forwarding alerts
  const showPathForwardingAlert = formData.pathForwarding;
  const showQueryForwardingAlert = formData.queryForwarding;

  return (
    <Modal
      className="!w-[95%] md:!w-[50vw]"
      footer={
        <ModalFooter className="w-full flex justify-end">
          <Button disabled={isButtonDisabled} tooltip={error} onClick={handleSubmit}>
            {redirect ? 'Update' : 'Create'}
          </Button>
        </ModalFooter>
      }
      isOpen={isOpen}
      title={redirect ? 'Update redirect' : 'Create a new redirect'}
      onClose={() => setIsOpen(false)}
    >
      <div className="w-full flex flex-col gap-4">
        {(showPathForwardingAlert || showQueryForwardingAlert || true) && (
          <Alert>
            <p className="text-text">Important:</p>
            <ul className="list-disc ml-5 mt-1">
              <li>
                From Domain always requires a domain-only format (no paths or queries allowed).
              </li>
              {showPathForwardingAlert && (
                <li>
                  Path forwarding is enabled. Paths from From Domain will be automatically appended
                  to To Domain, so To Domain should not include paths.
                </li>
              )}
              {showQueryForwardingAlert && (
                <li>
                  Query forwarding is enabled. Query parameters from From Domain will be
                  automatically appended to To Domain, so To Domain should not include query
                  parameters.
                </li>
              )}
            </ul>
          </Alert>
        )}

        <div className="flex flex-col gap-2">
          <UrlInput
            acceptPath={false}
            acceptQuery={false}
            allowDomainOnly={true}
            autoProcess={true}
            disabled={!!redirect?.fromDomain}
            id="fromDomain"
            label="From Domain"
            placeholder="From Domain (e.g., example.com)"
            processing={{
              removePath: true,
              removeQuery: true,
              addProtocol: 'https',
            }}
            showValidationIcon={true}
            value={formData.fromDomain}
            onBlur={(value) => handleDomainBlur('fromDomain', value)}
            onChange={(value) => handleChange('fromDomain', value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <UrlInput
            acceptPath={!formData.pathForwarding}
            acceptQuery={!formData.queryForwarding}
            allowDomainOnly={false}
            autoProcess={true}
            id="toDomain"
            label="To Domain"
            placeholder="To Domain"
            processing={{
              removePath: formData.pathForwarding,
              removeQuery: formData.queryForwarding,
            }}
            showValidationIcon={true}
            value={formData.toDomain}
            onBlur={(value) => handleDomainBlur('toDomain', value)}
            onChange={(value) => handleChange('toDomain', value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="redirectType">Redirect Type</Label>
          <div className="flex gap-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="Permanent">Permanent</Label>
              <Checkbox
                checked={formData.redirectType === RedirectType.Permanent}
                id="Permanent"
                onCheckedChange={(e) =>
                  handleChange(
                    'redirectType',
                    e.valueOf() ? RedirectType.Permanent : RedirectType.Temporary
                  )
                }
              />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="Temporary">Temporary</Label>
              <Checkbox
                checked={formData.redirectType === RedirectType.Temporary}
                id="Temporary"
                onCheckedChange={(e) =>
                  handleChange(
                    'redirectType',
                    e.valueOf() ? RedirectType.Temporary : RedirectType.Permanent
                  )
                }
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            checked={formData.pathForwarding || false}
            id="pathForwarding"
            onCheckedChange={(e) => handleForwardingToggle('pathForwarding', e)}
          />
          <Label>Do you want to forward the path?</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            checked={formData.queryForwarding || false}
            id="queryForwarding"
            onCheckedChange={(e) => handleForwardingToggle('queryForwarding', e)}
          />
          <Label>Do you want to forward the query?</Label>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="samplingRate">
            Sampling Rate: {((formData.samplingRate ?? 1) * 100).toFixed(0)}%
          </Label>
          <Slider
            id="samplingRate"
            max={1}
            min={0}
            step={0.01}
            value={[formData.samplingRate ?? 1]}
            onValueChange={(value) => handleChange('samplingRate', value[0])}
          />
          <p className="text-sm text-muted-foreground">
            Controls the percentage of traffic to track for analytics (0% = no tracking, 100% =
            track all)
          </p>
        </div>
      </div>
    </Modal>
  );
};

const CreateRedirect: React.FC<Props> = ({ redirect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <GitPullRequestCreateArrowIcon className="w-6 h-6" />
        Create redirect
      </Button>
      <CreateRedirectModal isOpen={isOpen} redirect={redirect} setIsOpen={setIsOpen} />
    </>
  );
};

export default CreateRedirect;
