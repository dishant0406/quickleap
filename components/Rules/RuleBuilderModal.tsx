'use client';

import React, { useState } from 'react';

import { LucideHandMetal } from 'lucide-react';

import Modal, { ModalFooter } from '@/components/Micro/Modal';
import { Button } from '@/components/ui/button';
import { createRule, updateRule } from '@/lib/api';
import { promiseToast } from '@/lib/toast';
import type { Rule, RuleFormData } from '@/lib/types/rules';

import RuleBuilder from './RuleBuilder';

interface RuleBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  redirectId: string;
  rule?: Rule | null;
}

const RuleBuilderModal: React.FC<RuleBuilderModalProps> = ({
  isOpen,
  onClose,
  onSave,
  redirectId,
  rule,
}) => {
  const [saving, setSaving] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [formData, setFormData] = useState<RuleFormData>({
    name: '',
    description: '',
    type: 'force',
    conditions: [],
    conditionLogic: 'AND',
    action: { type: 'redirect', url: '' },
  });
  const [hasSchedule, setHasSchedule] = useState(false);

  const handleSave = async (): Promise<void> => {
    try {
      setSaving(true);

      const payload = {
        name: formData.name,
        description: formData.description,
        type: formData.type,
        conditions: formData.conditions,
        conditionLogic: formData.conditionLogic,
        action: formData.action,
        ...(hasSchedule && {
          startDate: formData.startDate?.toISOString(),
          endDate: formData.endDate?.toISOString(),
        }),
      };

      if (rule) {
        await updateRule(rule.id.toString(), payload);
        promiseToast(Promise.resolve(), 'Rule updated successfully', {
          errorMessage: 'Error updating rule',
        });
      } else {
        await createRule(redirectId, payload);
        promiseToast(Promise.resolve(), 'Rule created successfully', {
          errorMessage: 'Error creating rule',
        });
      }

      onSave();
    } catch (error) {
      console.error('Error saving rule:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      className="!w-[95%] !h-[90%] md:!w-[90vw] lg:!w-[85vw] xl:!w-[80vw]"
      contentClassName="h-full"
      footer={
        <ModalFooter className="w-full flex justify-end">
          <Button className="gap-2" disabled={!isFormValid || saving} onClick={handleSave}>
            <LucideHandMetal className="h-4 w-4" />
            {saving ? 'Saving...' : rule ? 'Update Rule' : 'Create Rule'}
          </Button>
        </ModalFooter>
      }
      isOpen={isOpen}
      title={rule ? 'Edit Rule' : 'Create Rule'}
      onClose={onClose}
    >
      <div className="h-full overflow-hidden">
        <RuleBuilder
          isModal={true}
          redirectId={redirectId}
          rule={rule}
          onClose={onClose}
          onFormDataChange={setFormData}
          onFormValidityChange={setIsFormValid}
          onScheduleChange={setHasSchedule}
        />
      </div>
    </Modal>
  );
};

export default RuleBuilderModal;
