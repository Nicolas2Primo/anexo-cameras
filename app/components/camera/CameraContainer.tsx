export default function CameraContainer({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
}) {
  return <div className={`${className}`}>{children}</div>;
}
