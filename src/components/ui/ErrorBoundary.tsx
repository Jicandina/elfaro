import { Component, type ReactNode } from 'react';

interface Props { children: ReactNode; }
interface State { error: Error | null; }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
          <span className="text-2xl">⚠</span>
        </div>
        <div>
          <p className="font-display text-xl font-bold text-white mb-2">Algo salió mal</p>
          <p className="text-navy-400 text-sm max-w-sm">
            Ocurrió un error inesperado. Recarga la página o vuelve al inicio.
          </p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => window.location.reload()}
            className="btn-primary text-sm py-2">
            Recargar página
          </button>
          <a href="/" className="btn-navy text-sm py-2">Volver al inicio</a>
        </div>
      </div>
    );
  }
}
