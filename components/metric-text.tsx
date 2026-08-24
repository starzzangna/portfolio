const METRIC_SPLIT_PATTERN = /(\d+(?:\.\d+)?(?:%|초|줄|개|시간|건|회))/g;
const METRIC_MATCH_PATTERN = /^\d+(?:\.\d+)?(?:%|초|줄|개|시간|건|회)$/;

export function MetricText({ text }: { text: string }) {
  return (
    <>
      {text.split(METRIC_SPLIT_PATTERN).map((part, index) =>
        METRIC_MATCH_PATTERN.test(part) ? (
          <span
            key={`${part}-${index}`}
            className="font-semibold text-[var(--accent)]"
          >
            {part}
          </span>
        ) : (
          <span key={`${part}-${index}`}>{part}</span>
        ),
      )}
    </>
  );
}
