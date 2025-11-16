export default function PlayingTrackBars () {
    const neonGreen = "#1ED760"
    return (
        <div className="flex flex-col items-center justify-center p-4 min-h-[100px] w-full">
            {/* Bloque de estilos para la animación. Es la forma más corta de incluir keyframes en React/JSX sin archivos CSS separados. */}
            <style>
                {`
                    @keyframes pulse-bar {
                        0%, 100% { transform: scaleY(0.1); }
                        50% { transform: scaleY(1); }
                        75% { transform: scaleY(0.5); }
                    }
                    /* Clase base que define el ancho, el color y la animación */
                    .bar-visualizer {
                        width: 4px;
                        margin: 0 1px;
                        background-color: ${neonGreen};
                        transform-origin: bottom;
                        border-radius: 9999px;
                        height: 100%;
                        animation: pulse-bar 1.2s ease-in-out infinite alternate;
                    }
                `}
            </style>
        
            <div className="flex items-end h-6 w-5"> 
                <div 
                    className="bar-visualizer" 
                    style={{ animationDuration: '1.2s', animationDelay: '0s' }}
                />
                <div 
                    className="bar-visualizer" 
                    style={{ animationDuration: '1.0s', animationDelay: '0.2s' }}
                />
                <div 
                    className="bar-visualizer" 
                    style={{ animationDuration: '1.3s', animationDelay: '0.4s' }}
                />
                <div 
                    className="bar-visualizer" 
                    style={{ animationDuration: '0.9s', animationDelay: '0.1s' }}
                />
            </div>
        </div>
    )
}