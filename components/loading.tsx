export default function Loading() {
  return (
    <div className="w-full flex items-center justify-center gap-3">
      <span>Carregando</span>
      <div className="w-5 h-5 border-b border-r border-l border-white rounded-full animate-spin"></div>
    </div>
  );
}
