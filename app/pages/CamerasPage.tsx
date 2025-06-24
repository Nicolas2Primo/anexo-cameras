import CameraGrid from "~/components/camera/CameraGrid";
export default function CameraPage() {
  return (
    <div className="w-screen h-screen bg-gray-900 flex items-center justify-center p-4">
      <CameraGrid cameras={[1, 2, 3, 4, 5, 6, 7, 8]}></CameraGrid>
    </div>
  );
}
