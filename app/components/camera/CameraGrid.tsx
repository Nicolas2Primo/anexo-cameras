import CameraContainer from "./CameraContainer";

export default function CameraGrid({ cameras }: { cameras: number[] }) {
  return (
    <div className="grid grid-cols-4 gap-4 w-full">
      {cameras.map((camera) => (
        <CameraContainer
          key={camera}
          className="w-full aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center text-white font-semibold"
        >
          Câmera {camera}
        </CameraContainer>
      ))}
    </div>
  );
}
