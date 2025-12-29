type timeUnits = 'ms' | 's' | 'min';

export function formatTime(
  timeInMs: number,
  unit: timeUnits | 'auto' = 'auto'
) {
  if (!Number.isFinite(timeInMs)) return '-';

  const totalMs = Math.round(timeInMs);

  const minutes = Math.floor(totalMs / 60_000);
  const seconds = Math.floor((totalMs % 60_000) / 1000);
  const milliseconds = totalMs % 1000;

  if (unit === 'ms') return `${totalMs}ms`;
  if (unit === 's') {
    return joinNonZeroParts(
      [
        [minutes * 60 + seconds, 's'],
        [milliseconds, 'ms'],
      ],
      '0ms'
    );
  }

  return joinNonZeroParts(
    [
      [minutes, 'min'],
      [seconds, 's'],
      [milliseconds, 'ms'],
    ],
    '0ms'
  );
}

type memoryUnits = 'B' | 'KiB' | 'MiB' | 'GiB';

export function formatMemory(
  memoryInBytes: number,
  unit: memoryUnits | 'auto' = 'auto'
) {
  if (!Number.isFinite(memoryInBytes)) return '-';

  const totalB = Math.round(memoryInBytes);

  const gib = Math.floor(totalB / 1024 ** 3);
  const mib = Math.floor((totalB % 1024 ** 3) / 1024 ** 2);
  const kib = Math.floor((totalB % 1024 ** 2) / 1024);
  const b = totalB % 1024;

  if (unit === 'B') return `${totalB}B`;
  if (unit === 'KiB') {
    return joinNonZeroParts(
      [
        [gib * 1024 ** 2 + mib * 1024 + kib, 'KiB'],
        [b, 'B'],
      ],
      '0B'
    );
  }
  if (unit === 'MiB') {
    return joinNonZeroParts(
      [
        [gib * 1024 + mib, 'MiB'],
        [kib, 'KiB'],
        [b, 'B'],
      ],
      '0B'
    );
  }
  if (unit === 'GiB') {
    return joinNonZeroParts(
      [
        [gib, 'GiB'],
        [mib, 'MiB'],
        [kib, 'KiB'],
        [b, 'B'],
      ],
      '0B'
    );
  }

  const highest: memoryUnits =
    totalB >= 1024 ** 3
      ? 'GiB'
      : totalB >= 1024 ** 2
        ? 'MiB'
        : totalB >= 1024
          ? 'KiB'
          : 'B';

  if (highest === 'B') return `${totalB}B`;
  if (highest === 'KiB') {
    return joinNonZeroParts(
      [
        [gib * 1024 ** 2 + mib * 1024 + kib, 'KiB'],
        [b, 'B'],
      ],
      '0B'
    );
  }
  if (highest === 'MiB') {
    return joinNonZeroParts(
      [
        [gib * 1024 + mib, 'MiB'],
        [kib, 'KiB'],
        [b, 'B'],
      ],
      '0B'
    );
  }
  return joinNonZeroParts(
    [
      [gib, 'GiB'],
      [mib, 'MiB'],
      [kib, 'KiB'],
      [b, 'B'],
    ],
    '0B'
  );
}

function joinNonZeroParts(
  parts: Array<[number, string]>,
  emptyFallback: string
) {
  const joined = parts
    .filter(([value]) => value !== 0)
    .map(([value, suffix]) => `${value}${suffix}`)
    .join(' ');

  return joined || emptyFallback;
}
