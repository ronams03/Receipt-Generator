
import React, { forwardRef, useCallback } from 'react';
import type { ReceiptItem } from '../types';
import { PrintIcon, DownloadIcon, ShoppingBagIcon, QrCodeIcon } from './icons';

interface ReceiptProps {
    company: string;
    header: string;
    items: ReceiptItem[];
    footer: string;
    isGenerated: boolean;
    logo: string | null;
    showQrCode: boolean;
    logoSize: number;
}

const Receipt = forwardRef<HTMLDivElement, ReceiptProps>(({ company, header, items, footer, isGenerated, logo, showQrCode, logoSize }, ref) => {

    const handlePrint = useCallback(() => {
        const receiptNode = (ref as React.RefObject<HTMLDivElement>)?.current;
        if (!receiptNode) return;

        const printWindow = window.open('', '', 'height=800,width=800');
        if (printWindow) {
            printWindow.document.write('<html><head><title>Print Receipt</title>');
            
            printWindow.document.write('<script src="https://cdn.tailwindcss.com"></script>');
            
            printWindow.document.write(`<style>
                body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                @page { size: auto;  margin: 0mm; }
            </style>`);

            printWindow.document.write('</head><body class="bg-white">');
            printWindow.document.write(receiptNode.innerHTML);
            printWindow.document.write('</body></html>');

            setTimeout(() => {
                printWindow.document.close();
                printWindow.focus();
                printWindow.print();
                printWindow.close();
            }, 500);
        } else {
             alert('Could not open print window. Please check your browser settings.');
        }

    }, [ref]);

    const handleDownload = useCallback(() => {
        const receiptElement = (ref as React.RefObject<HTMLDivElement>)?.current;
        if (receiptElement && (window as any).html2canvas) {
            (window as any).html2canvas(receiptElement, {
                backgroundColor: '#ffffff',
                scale: 3
            }).then((canvas: HTMLCanvasElement) => {
                const link = document.createElement('a');
                link.download = 'receipt.png';
                link.href = canvas.toDataURL('image/png');
                link.click();
            });
        } else {
            alert('Download functionality is not available.');
        }
    }, [ref]);
    
    const logoStyle = {
        width: `${logoSize}px`,
        height: `${logoSize}px`,
    };

    return (
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg sticky top-8">
            <h3 className="text-xl font-semibold mb-4 text-cyan-300">Preview</h3>
            <div id="receipt-container" ref={ref} className="bg-white text-gray-800 p-8 font-sans w-full min-w-[320px] max-w-md mx-auto rounded-lg shadow-xl transition-all duration-300">
                <div className="text-center mb-8">
                    {logo ? (
                        <img src={logo} alt="Company Logo" className="object-contain mx-auto mb-4 rounded-md" style={logoStyle} />
                    ) : (
                        <div className="bg-cyan-100 text-cyan-600 flex items-center justify-center rounded-full mx-auto mb-4" style={logoStyle}>
                            <ShoppingBagIcon />
                        </div>
                    )}
                    <p className="text-lg font-semibold text-gray-700">{company}</p>
                    <h2 className="text-2xl font-bold uppercase text-gray-900 tracking-wider">{header}</h2>
                    <p className="text-xs text-gray-500">{new Date().toLocaleString()}</p>
                </div>
                
                <div className="space-y-3 mb-6">
                    {items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center text-sm py-2 border-b border-gray-100">
                            <span className="text-gray-600">{item.label}</span>
                            <span className="font-semibold text-gray-900 font-mono">{item.value}</span>
                        </div>
                    ))}
                </div>

                 <div className="border-t-2 border-dashed border-gray-300 pt-6 mt-6 text-center">
                    <p className="text-sm text-gray-600 mb-4">{footer}</p>
                    {showQrCode && (
                        <>
                            <QrCodeIcon />
                            <p className="text-xs text-gray-400 mt-2">Scan for details</p>
                        </>
                    )}
                </div>
            </div>
             {isGenerated && (
                <div className="mt-6 flex justify-center gap-4">
                    <button onClick={handlePrint} className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-transform transform hover:scale-105">
                        <PrintIcon /> Print
                    </button>
                    <button onClick={handleDownload} className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-transform transform hover:scale-105">
                        <DownloadIcon /> Download
                    </button>
                </div>
            )}
        </div>
    );
});

export default Receipt;
