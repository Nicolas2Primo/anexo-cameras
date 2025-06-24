export default function CameraContainer({
  children,
  className,
  key,
}: {
  children?: React.ReactNode;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  key?: React.Attributes["key"];
}) {
  return (
    <div key={key} className={`${className}`}>
      {children}
    </div>
  );
}
