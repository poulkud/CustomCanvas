import React, { useState, useEffect } from 'react';
import {Button, Input} from './index';
const Canvas = props => {
    const [file, setFile] = useState('');
    const [toggle, setToggle] = useState(false);
    const [warning, setWarning] = useState('Please add new file');
    const [canvas, setCanvas] = useState([]);
    const [downloadHref, setDownloadHref] = useState('');
    useEffect(() => {
    }, [canvas])
    function readInpit(event) {
        let result = event.target.files[0];
        let reader = new FileReader();
        reader.onload = function(event) {
            setFile(event.target.result);
        }
        reader.readAsText(result);
    };

    function matrix( rows, cols, defaultValue, bordersTop, bordersSide){
        console.log('cols', cols);
        let arr = [];
        for(let i = 0; i < rows; i++){
            arr.push([]);
            arr[i].push( new Array(cols));
            for(let j = 0; j < cols; j++){
                if (j === 0 ) {
                    arr[i][j] = bordersSide;
                } else if (j === (cols - 1)){
                    arr[i][j] = bordersSide;
                } else {
                    arr[i][j] = defaultValue;
                }
                if(i === 0) {
                    arr[i][j] = bordersTop;
                } else if (i === (rows - 1)) {
                    arr[i][j] = bordersTop;
                }
            }
        }
      
      return arr;
    };

    function createPaint() {
        let test = new RegExp(/C/);

        if(test.test(file)) {
            let commands = file.split('\n');
            let arrMat;
            let str = '';
            commands.forEach((item) => {
                let comandParams = item.slice(2).split(' ');
                switch(item[0]) {
                    case 'C':
                        arrMat = matrix(+comandParams[1] + 2, +comandParams[0] + 2, ' ', '-', '|');
                        setCanvas(prevState => ([...prevState, arrMat]));
                        break;
                    case 'L':
                        renderLine(arrMat, ...comandParams);
                        break;
                    case 'R':
                        renderRectangle(arrMat, ...comandParams)
                        break;
                    case 'B':
                        bucketFill(arrMat, ...comandParams);
                        break;
                    default:
                        alert('Вставленно неизвестное значение')
                }
            })
            arrMat.forEach((item) => {
                str += item.join('') + `\n`;
            })
            let converUtf8_to_b64 = utf8_to_b64(str);
            setDownloadHref(`data:application/octet-stream;charset=utf-8;base64,${converUtf8_to_b64}`);
            setToggle(true);
        } else {
            setWarning('You need add command "C"');
        }

        function renderLine(args,  x_1, y_1, x_2, y_2) {
            if(args[y_1][x_1] === ' ' && args[y_2][x_2] === ' ') {
                if( y_1 === y_2) {                      //Проверяем горизонтальная линия, или вертикальная 
                    for ( let i = +x_1; i <= +x_2; i++) {
                        args[y_1][i] = 'x';
                    }
                } else if (x_1 === x_2) {
                    for ( let a = +y_1; a <= +y_2; a++) {
                        args[a][x_1] = 'x';
                    }
                }
                setCanvas(args);
            }
        };

        function renderRectangle(args, x_1, y_1, x_2, y_2) {
            if(args[y_1][x_1] === ' ' && args[y_2][x_2] === ' ') {
                for (let i = +x_1; i <= +x_2; i++) {
                    args[y_1][i] = 'x';
                    args[y_2][i] = 'x';
                }
                for (let i = +y_1; i <= +y_2; i++) {
                    args[i][x_2] = 'x';
                    args[i][x_1] = 'x';
                }
            }
            setCanvas(args);
        };

        function bucketFill(args, x, y, color) {
            if(args[y][x] === ' ') {
                args[y][x] = color;
                bucketFill(args, +x+1, y, color);
                bucketFill(args, +x-1, y, color);
                bucketFill(args, x, +y+1, color);
                bucketFill(args, x, +y-1, color);
            }
            setCanvas(args);
        }

        function utf8_to_b64(str) {
            return window.btoa(unescape(encodeURIComponent(str)));
        }
    };

    const renderPaintBlock = (arg) => (
        <table style={{borderSpacing: '0'}}>
            <tbody>
                {arg.map((item, indexY) => (
                    <tr key={`indexY_${indexY}`}>
                        {item.map((value, indexX) => (
                            (value === '-')
                                ? (
                                    <td key={`indexX_${indexX}`} className="CellPaint Scope"></td>
                                ) : (value === '|')
                                    ? (
                                        <td key={`indexX_${indexX}`} className="CellPaint Scope"></td> 
                                    ) : (value === 'x') ? (
                                        <td key={`indexX_${indexX}`} className="CellPaint CellBorderPaint"></td>
                                    ) : (value === ' ') ? (
                                        <td key={`indexX_${indexX}`} className="CellPaint"></td>
                                    ) : (
                                        <td key={`indexX_${indexX}`} className="CellPaint CellPaintBackground"></td>
                                    )
                        ))}
                    </tr>
                ))}
            </tbody>
    </table>);
    
    return ( 
        <div className="CanvasContainer">
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Input type='file' onChange={(event) => readInpit(event)}/>
                <Button onClick={() => {
                    createPaint();
                }}>
                    Paint
                </Button>
                {(toggle) ? (<Button link href={downloadHref} download='output.txt'>Download</Button>) : null}
            </div>
            <div className="PaintContainer">
                {(toggle)
                    ? (
                        <div className="MainContainer">
                            {renderPaintBlock(canvas)}
                        </div>
                    ) : 
                    (
                        <div className="mainContainer">{warning}</div>
                    )
                }
            </div>
        </div>
    )
}

export default Canvas;