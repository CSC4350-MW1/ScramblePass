export function Grid({ children, columns }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridGap: 5,
        padding: 5,
      }}
    >
      {children}
    </div>
  );
}
