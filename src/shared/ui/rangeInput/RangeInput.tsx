import { useState } from 'react';

type TProps = {
  label: string;
  from?: number;
  to?: number;
  onFromChange: (value: number | undefined) => void;
  onToChange: (value: number | undefined) => void;
};

export const RangeInput = ({ label, from, to, onFromChange, onToChange }: TProps) => {
  const [localFrom, setLocalFrom] = useState(from);
  const [localTo, setLocalTo] = useState(to);

  const handleBlur = () => {
    if (localFrom !== from) onFromChange(localFrom);
    if (localTo !== to) onToChange(localTo);
  };

  return (
    <div className="mb-4">
      <h3 className="mb-1 text-sm font-semibold">{label}</h3>
      <div className="flex gap-2">
        <input
          type="number"
          placeholder="От"
          value={localFrom ?? ''}
          onChange={(e) => setLocalFrom(e.target.value ? Number(e.target.value) : undefined)}
          onBlur={handleBlur}
          className="bg-bg w-full rounded border p-1.5 text-sm"
        />
        <input
          type="number"
          placeholder="До"
          value={localTo ?? ''}
          onChange={(e) => setLocalTo(e.target.value ? Number(e.target.value) : undefined)}
          onBlur={handleBlur}
          className="bg-bg w-full rounded border p-1.5 text-sm"
        />
      </div>
    </div>
  );
};
