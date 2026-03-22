import { useState, useEffect } from 'react';

type TProps = {
  label: string;
  from?: number;
  to?: number;
  onFromChange: (value: number | undefined) => void;
  onToChange: (value: number | undefined) => void;
  max?: number;
  min?: number;
};

export const RangeInput = ({
  label,
  from,
  to,
  onFromChange,
  onToChange,
  max = 10,
  min = 0,
}: TProps) => {
  const [localFrom, setLocalFrom] = useState(from);
  const [localTo, setLocalTo] = useState(to);

  useEffect(() => {
    setLocalFrom(from);
  }, [from]);

  useEffect(() => {
    setLocalTo(to);
  }, [to]);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>, isMin: boolean) => {
    const rawValue = e.target.value;
    const value = rawValue === '' ? undefined : Number(rawValue);
    const clampedValue = Math.max(
      min,
      Math.min(
        max,
        isMin
          ? value !== undefined && value <= (to ?? max)
            ? value
            : (to ?? max)
          : value !== undefined && value >= (from ?? min)
            ? value
            : (from ?? min)
      )
    );

    if (isMin) {
      setLocalFrom(clampedValue);
      onFromChange(clampedValue);
    } else {
      setLocalTo(clampedValue);
      onToChange(clampedValue);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, isMin: boolean) => {
    const value = e.target.value === '' ? undefined : Number(e.target.value);
    if (isMin) setLocalFrom(value);
    else setLocalTo(value);
  };

  return (
    <div className="mb-4">
      <h3 className="mb-1 text-sm font-semibold">{label}</h3>
      <div className="flex gap-2">
        <input
          type="number"
          placeholder="От"
          value={localFrom ?? ''}
          onChange={(e) => handleChange(e, true)}
          onBlur={(e) => handleBlur(e, true)}
          className="bg-bg w-full rounded border p-1.5 text-sm"
        />
        <input
          type="number"
          placeholder="До"
          value={localTo ?? ''}
          onChange={(e) => handleChange(e, false)}
          onBlur={(e) => handleBlur(e, false)}
          className="bg-bg w-full rounded border p-1.5 text-sm"
        />
      </div>
    </div>
  );
};
