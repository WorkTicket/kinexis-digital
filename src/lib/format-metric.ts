export type MetricFormatOptions = {
  prefix?: string;
  suffix?: string;
  decimals?: number;
};

export function formatMetricValue(
  value: number,
  options: MetricFormatOptions = {}
): string {
  const { prefix = "", suffix = "", decimals = 0 } = options;
  const formatted = value.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${prefix}${formatted}${suffix}`;
}
