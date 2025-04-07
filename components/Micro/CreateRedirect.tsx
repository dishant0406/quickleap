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
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';

import Modal, { ModalFooter } from './Modal';

const redirectSchema = z.object({
  fromDomain: z.string().url('Please enter a valid URL'),
  toDomain: z.string().url('Please enter a valid URL'),
  redirectType: z.enum([RedirectType.Permanent, RedirectType.Temporary]),
  pathForwarding: z.boolean(),
  queryForwarding: z.boolean(),
});

// Initial state matching your example
const initialState = {
  fromDomain: '',
  toDomain: '',
  redirectType: RedirectType.Permanent,
  pathForwarding: false,
  queryForwarding: false,
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

      promiseToast(addRedirect(data), 'Redirect created successfully', {
        errorMessage: 'Failed to create redirect',
        final: () => {
          setIsOpen(false);
          fetchRedirects();
        },
        loadingText: 'Creating redirect...',
        setLoading,
      });
    }
  );

  useEffect(() => {
    if (redirect) {
      setFormData({
        fromDomain: formatUrl(redirect.fromDomain)?.formattedUrl || '',
        toDomain: formatUrl(redirect.toDomain)?.formattedUrl,
        redirectType: redirect.redirectType,
        pathForwarding: redirect.pathForwarding,
        queryForwarding: redirect.queryForwarding,
      });
    }
  }, [redirect]);

  // Process URL based on forwarding settings
  const processUrl = (url: string, removePath = false, removeQuery = false) => {
    try {
      const parsed = formatUrl(url);

      if (!parsed.formattedUrl) return url;

      // Create a new URL to modify
      const urlObj = new URL(parsed.formattedUrl);

      if (removePath) {
        urlObj.pathname = '/';
      }

      if (removeQuery) {
        urlObj.search = '';
      }

      return urlObj.toString();
    } catch {
      return url;
    }
  };

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

    // Only process URLs when the input loses focus
    if (field === 'fromDomain') {
      processedValue = processFromDomain(value);
    } else if (field === 'toDomain') {
      if (formData.pathForwarding || formData.queryForwarding) {
        processedValue = processUrl(value, formData.pathForwarding, formData.queryForwarding);
      }
    }

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
    const newFormData = {
      ...formData,
      [field]: value,
    };

    // First, update the domain values if needed
    if (field === 'pathForwarding' && value === true) {
      const newToDomain = processUrl(formData.toDomain, true, formData.queryForwarding);
      newFormData.toDomain = newToDomain;
    }

    if (field === 'queryForwarding' && value === true) {
      const newToDomain = processUrl(formData.toDomain, formData.pathForwarding, true);
      newFormData.toDomain = newToDomain;
    }

    // Update all form values at once to avoid react issues with the Switch component
    setFormData(newFormData);
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
                  Path forwarding is enabled. Paths in To Domain will be automatically removed.
                </li>
              )}
              {showQueryForwardingAlert && (
                <li>
                  Query forwarding is enabled. Query parameters in To Domain will be automatically
                  removed.
                </li>
              )}
            </ul>
          </Alert>
        )}

        <div className="flex flex-col gap-2">
          <Label className="md:text-base text-xs" htmlFor="fromDomain">
            From Domain
          </Label>
          <Input
            disabled={!!redirect?.fromDomain}
            id="fromDomain"
            placeholder="From Domain (e.g., example.com)"
            value={formData.fromDomain}
            onBlur={(e) => handleDomainBlur('fromDomain', e.target.value)}
            onChange={(e) => handleChange('fromDomain', e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="md:text-base text-xs" htmlFor="toDomain">
            To Domain
          </Label>
          <Input
            id="toDomain"
            placeholder="To Domain"
            value={formData.toDomain}
            onBlur={(e) => handleDomainBlur('toDomain', e.target.value)}
            onChange={(e) => handleChange('toDomain', e.target.value)}
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
