import React from "react";

const themeSteps = [100, 200, 300, 400, 500, 600, 700, 800, 900];
const shadeSteps = [5, 10, 20, 0, 30];

const shades = [
    "primary",
    "secondary",
    "brown",
    "salmon",
    "orange",
    "havanna",
    "yellow",
    "spring",
    "green",
    "sage",
    "olive",
    "nude",
    "soft-pink",
    "red",
    "rose",
    "mulberry",
    "pink",
    "purple",
    "violet",
    "royalblue",
    "blue",
    "cyan",
    "sea",
]


export interface ColorSwatchProps {
    theme?: boolean;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ theme }) => {

    return (
        <div >
            {
                theme ? (
                    <div className="colors">
                        {themeSteps.map((step) => {
                            const name = `theme-${step}`;
                            const className = `bg-theme-${step}`;

                            return (
                                <div key={name} className={`color ${className}`}>
                                    <div className="color__desc">
                                        <span>{name}</span>
                                        <span className="text-mute">Muted</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) :
                    shades.map((color) => (
                        <div key={color} >
                            <h3>{color}</h3>

                            <div className="colors">
                                {shadeSteps.map((step) => {
                                    const name = step === 0 ? color : `${color}-${step}`;
                                    const className = step === 0 ? `bg-${color}` : `bg-${color}-${step}`;

                                    return (
                                        <div key={name} className={`color ${className}`}>
                                            <div className="color__desc">
                                                <span>{name}</span>
                                                <span className="text-mute">Muted</span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ))
            }

        </div>
    );
}

export default ColorSwatch;