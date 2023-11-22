import { colorArray } from "./colorArray.js";
import fs from "fs";
import path from "path";
const __dirname = path.resolve();
import inquirer from "inquirer";
import { triangle, square, circle } from "./shapes.js";

const canvasWidth = 400;
const canvasHeight = 300;

inquirer
    .prompt([
        {
            type: 'input',
            name: 'text',
            message: 'enter three letters',
            validate: (input) => {
                if (input.length === 3) {
                    return true;
                }
                return 'Please enter three letters';
            },
            {
                type: 'input',
                name: 'textColor',
                message: 'enter a color',
                validate: (input) => {
                    if (input.length === 3) {
                        return true;
                    }
                    return 'Please enter a color';
                },
                {
                    type: 'input',
                    name: 'backgroundColor',
                    message: 'enter a color',
                    validate: (input) => {
                        if (input.length === 3) {
                            return true;
                        }
                        return 'Please enter a color';
                    },
                    {
                        type: 'input',
                        name: 'shape',
                        message: 'enter a shape',
                        validate: (input) => {
                            if (input.length === 3) {
                                return true;
                            }
                            return 'Please enter a shape';
                        },
                    },
                ])
            .then((answers) => {
                let shape;
                const text = {
                    _attributes: {
                        x: canvasWidth / 2,
                        y: canvasHeight / 1.35,
                        'text-anchor': 'middle',
                        fill: answers.textColor,
                    },
                    _text: answers.text.toUpperCase(),

                    render: function () {
                        return `
                            <text x="${this._attributess.x}"y="${this._attributes.y}" 
                            text-anchor="${this._attributes['text-anchor']}" 
                            fill="${this._attributes.fill}" font-size="${fontSize}">
                            ${this._text}
                            </text>
                            `;
                    },
                };

                let fontSize;
                switch (answers.shape) {
                    case 'triangle':
                        shape = triangle;
                        fontSize = 100;
                        break;
                    case 'square':
                        shape = square;
                        fontSize = 80;
                        break;
                    case 'circle':
                        shape = circle;
                        fontSize = 60;
                        break;
                    default:
                        shape = triangle;
                        fontSize = 100;
                }
                const svgData = `
                <svg xmlns="http://www.w3.org/2000/svg" width="${canvasWidth}" height="${canvasHeight}" viewBox="0 0 ${canvasWidth} ${canvasHeight}">
                   ${shape.render(answers.shapeColor)}
                     ${text.render()}
                </svg>`;

                fs.writeFileSync(`${__dirname}/logo.svg`, svgData.toString());

                console.log('SVG file created');
            })
            .catch((error) => {
                console.log(error);
            });