import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { SketchPicker } from 'react-color';
import '../App.css'; // Import CSS file for styles

function SignaturePad() {
    const [textColor, setTextColor] = useState('#000000'); // Default color black
    const [backgroundColor, setBackgroundColor] = useState('#FFFFFF'); // Default color white
    const [showTextColorPicker, setShowTextColorPicker] = useState(false); // State for text color picker popover
    const [showBgColorPicker, setShowBgColorPicker] = useState(false); // State for background color picker popover

    const signatureRef = useRef(null);

    const clearSignature = () => {
        signatureRef.current.clear();
    };

    const saveSignature = () => {
        const canvas = signatureRef.current.getCanvas(); // Get the signature canvas element

        // Create a new canvas
        const newCanvas = document.createElement('canvas');
        const newCanvasContext = newCanvas.getContext('2d');

        // Set the dimensions of the new canvas
        newCanvas.width = canvas.width;
        newCanvas.height = canvas.height;

        // Set background color
        newCanvasContext.fillStyle = backgroundColor;
        newCanvasContext.fillRect(0, 0, newCanvas.width, newCanvas.height);

        // Draw signature from the signature canvas
        newCanvasContext.drawImage(canvas, 0, 0);

        // Draw text
        newCanvasContext.font = '30px Arial';
        newCanvasContext.fillStyle = textColor;

        // Get data URL of the new canvas
        const signatureDataURL = newCanvas.toDataURL();

        // Create a link element
        const a = document.createElement('a');
        a.href = signatureDataURL;
        a.download = 'signature.png';

        // Simulate a click to trigger the download
        a.click();
    };

    return (
        <div className="signature-container">
            <div className="options">
                <div className="option">
                    <label htmlFor="textColor">Text Color: </label>
                    <input
                        type="text"
                        value={textColor}
                        onClick={() => setShowTextColorPicker(!showTextColorPicker)}
                        readOnly // Prevent editing by user
                        style={{ backgroundColor: textColor }} // Display selected color
                    />
                    {showTextColorPicker && (
                        <div className="popover">
                            <SketchPicker
                                color={textColor}
                                onChange={(color) => setTextColor(color.hex)}
                            />
                        </div>
                    )}
                </div>
                <div className="option">
                    <label htmlFor="backgroundColor">Background Color: </label>
                    <input
                        type="text"
                        value={backgroundColor}
                        onClick={() => setShowBgColorPicker(!showBgColorPicker)}
                        readOnly // Prevent editing by user
                        style={{ backgroundColor: backgroundColor }} // Display selected color
                    />
                    {showBgColorPicker && (
                        <div className="popover">
                            <SketchPicker
                                color={backgroundColor}
                                onChange={(color) => setBackgroundColor(color.hex)}
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className="signature-pad">
                <h2>Signature Pad</h2>
                <SignatureCanvas
                    penColor={textColor}
                    canvasProps={{ className: 'signature-canvas', style: { backgroundColor, width: '800px', height: '400px' } }} // Adjust width and height as needed
                    ref={signatureRef}
                />
                <div className="btn-group">
                    <button className="btn btn-danger" onClick={clearSignature}>Clear</button>
                    <button className='btn btn-primary' onClick={saveSignature}>Save</button>
                </div>
            </div>
        </div>
    );
}

export default SignaturePad;
