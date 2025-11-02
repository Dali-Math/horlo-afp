import React from 'react'

const serializeError = (error: any) => {
  if (error instanceof Error) {
    return `${error.message}\n${error.stack}`
  }
  try {
    return JSON.stringify(error, null, 2)
  } catch {
    return String(error)
  }
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: any }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-50 dark:bg-red-950/20 border border-red-500/40 rounded-xl text-red-600 dark:text-red-400 max-w-2xl mx-auto mt-20 shadow-lg">
          <h2 className="text-lg font-bold mb-2">⚠️ Erreur d’exécution détectée</h2>
          <pre className="text-xs bg-black/5 dark:bg-black/30 p-3 rounded-lg overflow-x-auto whitespace-pre-wrap">
            {serializeError(this.state.error)}
          </pre>
          <p className="text-sm text-red-500/80 mt-3">
            Rechargez la page ou contactez le support si le problème persiste.
          </p>
        </div>
      )
    }

    return this.props.children
  }
}
