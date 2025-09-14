'use client';

import React, { useState } from 'react';

import { CheckCircle, Play, RefreshCw, XCircle } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { testRuleEvaluation } from '@/lib/api';
import type { RuleTestRequest, RuleTestResponse, UserAttributes } from '@/lib/types/rules';

interface RuleTesterProps {
  redirectId: string;
}

const RuleTester: React.FC<RuleTesterProps> = ({ redirectId }) => {
  const [userAttributes, setUserAttributes] = useState<UserAttributes>({
    country: 'US',
    device_type: 'desktop',
    browser_name: 'Chrome',
    os_name: 'Windows',
    language: 'en',
    hour_of_day: 14,
    day_of_week: 2,
  });
  const [testResult, setTestResult] = useState<RuleTestResponse | null>(null);
  const [testing, setTesting] = useState(false);
  const [jsonMode, setJsonMode] = useState(false);
  const [jsonInput, setJsonInput] = useState('');

  const handleTest = async (): Promise<void> => {
    try {
      setTesting(true);

      let attributesToTest = userAttributes;

      if (jsonMode && jsonInput.trim()) {
        try {
          attributesToTest = JSON.parse(jsonInput);
        } catch (error) {
          console.error('Invalid JSON:', error);
          return;
        }
      }

      const request: RuleTestRequest = {
        userAttributes: attributesToTest,
      };

      const response = await testRuleEvaluation(redirectId, request);
      setTestResult(response.data);
    } catch (error) {
      console.error('Error testing rules:', error);
    } finally {
      setTesting(false);
    }
  };

  const updateAttribute = (key: keyof UserAttributes, value: string | number): void => {
    setUserAttributes((prev) => ({ ...prev, [key]: value }));
  };

  const loadPreset = (preset: 'mobile-us' | 'desktop-eu' | 'tablet-asia'): void => {
    const presets = {
      'mobile-us': {
        country: 'US',
        region: 'California',
        city: 'San Francisco',
        device_type: 'mobile',
        device_brand: 'Apple',
        browser_name: 'Safari',
        os_name: 'iOS',
        language: 'en',
        hour_of_day: 10,
        day_of_week: 1,
        referrer_domain: 'google.com',
      },
      'desktop-eu': {
        country: 'DE',
        region: 'Berlin',
        city: 'Berlin',
        device_type: 'desktop',
        device_brand: 'Dell',
        browser_name: 'Chrome',
        os_name: 'Windows',
        language: 'de',
        hour_of_day: 15,
        day_of_week: 3,
        referrer_domain: 'bing.com',
      },
      'tablet-asia': {
        country: 'JP',
        region: 'Tokyo',
        city: 'Tokyo',
        device_type: 'tablet',
        device_brand: 'Samsung',
        browser_name: 'Chrome',
        os_name: 'Android',
        language: 'ja',
        hour_of_day: 20,
        day_of_week: 5,
        referrer_domain: 'yahoo.co.jp',
      },
    };

    setUserAttributes(presets[preset]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Rule Tester</h2>
        <p className="text-muted-foreground">
          Test how your rules would evaluate against different visitor attributes
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle>Test Attributes</CardTitle>
            <CardDescription>Set visitor attributes to test against your rules</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Label>Quick Presets:</Label>
              <Button size="sm" variant="neutral" onClick={() => loadPreset('mobile-us')}>
                Mobile US
              </Button>
              <Button size="sm" variant="neutral" onClick={() => loadPreset('desktop-eu')}>
                Desktop EU
              </Button>
              <Button size="sm" variant="neutral" onClick={() => loadPreset('tablet-asia')}>
                Tablet Asia
              </Button>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <Button
                size="sm"
                variant={jsonMode ? 'default' : 'neutral'}
                onClick={() => {
                  setJsonMode(!jsonMode);
                  if (!jsonMode) {
                    setJsonInput(JSON.stringify(userAttributes, null, 2));
                  }
                }}
              >
                {jsonMode ? 'Form Mode' : 'JSON Mode'}
              </Button>
            </div>

            {jsonMode ? (
              <div className="space-y-2">
                <Label>User Attributes (JSON)</Label>
                <Textarea
                  className="font-mono text-sm"
                  placeholder="Enter JSON object with user attributes"
                  rows={12}
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Country</Label>
                  <Input
                    placeholder="US"
                    value={userAttributes.country || ''}
                    onChange={(e) => updateAttribute('country', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Device Type</Label>
                  <Input
                    placeholder="desktop"
                    value={userAttributes.device_type || ''}
                    onChange={(e) => updateAttribute('device_type', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Browser</Label>
                  <Input
                    placeholder="Chrome"
                    value={userAttributes.browser_name || ''}
                    onChange={(e) => updateAttribute('browser_name', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>OS</Label>
                  <Input
                    placeholder="Windows"
                    value={userAttributes.os_name || ''}
                    onChange={(e) => updateAttribute('os_name', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Input
                    placeholder="en"
                    value={userAttributes.language || ''}
                    onChange={(e) => updateAttribute('language', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Hour of Day</Label>
                  <Input
                    max="23"
                    min="0"
                    type="number"
                    value={userAttributes.hour_of_day || 0}
                    onChange={(e) => updateAttribute('hour_of_day', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Day of Week</Label>
                  <Input
                    max="6"
                    min="0"
                    type="number"
                    value={userAttributes.day_of_week || 0}
                    onChange={(e) => updateAttribute('day_of_week', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Referrer Domain</Label>
                  <Input
                    placeholder="google.com"
                    value={userAttributes.referrer_domain || ''}
                    onChange={(e) => updateAttribute('referrer_domain', e.target.value)}
                  />
                </div>
              </div>
            )}

            <Button className="w-full gap-2" disabled={testing} onClick={handleTest}>
              {testing ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Testing Rules...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  Test Rules
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card>
          <CardHeader>
            <CardTitle>Test Results</CardTitle>
            <CardDescription>
              Results of rule evaluation against the provided attributes
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!testResult ? (
              <div className="text-center py-8 text-muted-foreground">
                Run a test to see results here
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  {testResult.result ? (
                    <>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-medium text-green-700">Rule Matched</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5 text-red-500" />
                      <span className="font-medium text-red-700">No Rules Matched</span>
                    </>
                  )}
                </div>

                <div className="text-sm text-muted-foreground">{testResult.message}</div>

                {testResult.result && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      {testResult.result.ruleId && (
                        <div>
                          <Label className="text-xs text-muted-foreground">Rule ID</Label>
                          <div className="font-mono">{testResult.result.ruleId}</div>
                        </div>
                      )}
                      {testResult.result.ruleName && (
                        <div>
                          <Label className="text-xs text-muted-foreground">Rule Name</Label>
                          <div>{testResult.result.ruleName}</div>
                        </div>
                      )}
                      {testResult.result.actionType && (
                        <div>
                          <Label className="text-xs text-muted-foreground">Action Type</Label>
                          <Badge variant="default">{testResult.result.actionType}</Badge>
                        </div>
                      )}
                      {testResult.result.url && (
                        <div>
                          <Label className="text-xs text-muted-foreground">Redirect URL</Label>
                          <div className="text-sm break-all">{testResult.result.url}</div>
                        </div>
                      )}
                    </div>

                    {testResult.result.variant && (
                      <div>
                        <Label className="text-xs text-muted-foreground">A/B Variant</Label>
                        <Badge variant="neutral">{testResult.result.variant}</Badge>
                      </div>
                    )}

                    {testResult.result.percentage && (
                      <div>
                        <Label className="text-xs text-muted-foreground">Percentage</Label>
                        <div>{testResult.result.percentage}%</div>
                      </div>
                    )}
                  </div>
                )}

                <div className="border-t pt-4">
                  <Label className="text-xs text-muted-foreground">Evaluated Attributes</Label>
                  <pre className="text-xs bg-muted p-3 rounded-md mt-2 overflow-auto">
                    {JSON.stringify(testResult.userAttributes, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RuleTester;
