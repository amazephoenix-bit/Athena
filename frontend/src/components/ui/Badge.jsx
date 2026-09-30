export default function Badge({ children, variant = 'red', className = '' }) {
  const classes = {
    red: 'badge-red',
    green: 'badge-green',
    amber: 'badge-amber',
    blue: 'badge-blue',
    purple: 'badge-purple',
  };
  return (
    <span className={`athena-badge ${classes[variant] || classes.red} ${className}`}>
      {children}
    </span>
  );
}
