export default function FilterChip({ active, onClick, children }) {
  return (
    <button type="button" onClick={onClick} className={`filter-chip${active ? ' active' : ''}`}>
      {children}
    </button>
  );
}
