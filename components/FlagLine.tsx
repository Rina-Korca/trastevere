// Fine Italian tricolour hairline – a quiet brand accent.
export default function FlagLine({ className = "w-24" }: { className?: string }) {
  return (
    <span aria-hidden className={`flex h-[2px] ${className}`}>
      <span className="flex-1 bg-[#4c7a5a]" /><span className="flex-1 bg-bone" /><span className="flex-1 bg-[#a8403d]" />
    </span>
  );
}
