'use client';

import { Table } from '../ui/table';

import { RedirectRow } from './components/RedirectRow';
import { Theader } from './components/TableHeader';

interface RedirectsTableProps {
  redirects: Redirect[];
  onSelect?: (ids: string[]) => void;
  onRedirectClick?: ((redirect: Redirect) => void) | undefined;
}

const RedirectsTable = ({ redirects, onSelect, onRedirectClick }: RedirectsTableProps) => {
  return (
    <div className="border-2 border-border dark:border-darkNavBorder rounded-base overflow-hidden">
      <div className="overflow-x-auto">
        <Table className="w-full border-collapse">
          <Theader />
          <tbody className="divide-y divide-border">
            {redirects.map((redirect) => (
              <RedirectRow
                key={redirect.id}
                redirect={redirect}
                onRedirectClick={(redirect) => onRedirectClick && onRedirectClick(redirect)}
                onSelect={(ids) => onSelect && onSelect(ids)}
              />
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default RedirectsTable;
