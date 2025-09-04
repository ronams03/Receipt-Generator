
import React from 'react';
import type { ReceiptItem } from '../types';
import { PlusIcon, TrashIcon, GenerateIcon, EditIcon, UploadIcon } from './icons';

interface ReceiptEditorProps {
    company: string;
    setCompany: (value: string) => void;
    header: string;
    setHeader: (value: string) => void;
    items: ReceiptItem[];
    handleAddItem: () => void;
    handleUpdateItem: (id: string, field: 'label' | 'value', value: string) => void;
    handleRemoveItem: (id:string) => void;
    footer: string;
    setFooter: (value: string) => void;
    isGenerated: boolean;
    setIsGenerated: (value: boolean) => void;
    logo: string | null;
    setLogo: (value: string | null) => void;
    showQrCode: boolean;
    setShowQrCode: (value: boolean) => void;
    logoSize: number;
    setLogoSize: (value: number) => void;
}

const ReceiptEditor: React.FC<ReceiptEditorProps> = ({
    company,
    setCompany,
    header,
    setHeader,
    items,
    handleAddItem,
    handleUpdateItem,
    handleRemoveItem,
    footer,
    setFooter,
    isGenerated,
    setIsGenerated,
    logo,
    setLogo,
    showQrCode,
    setShowQrCode,
    logoSize,
    setLogoSize
}) => {
    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setLogo(event.target?.result as string);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    return (
        <div className="p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-2xl space-y-6">
            <h2 className="text-2xl font-bold text-cyan-300 border-b border-gray-700 pb-3">Receipt Editor</h2>

            <div className="space-y-4">
                <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">Company</label>
                    <input
                        type="text"
                        id="company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        disabled={isGenerated}
                        className="w-full bg-gray-900/50 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                </div>
                <div>
                    <label htmlFor="header" className="block text-sm font-medium text-gray-300 mb-1">Header</label>
                    <input
                        type="text"
                        id="header"
                        value={header}
                        onChange={(e) => setHeader(e.target.value)}
                        disabled={isGenerated}
                        className="w-full bg-gray-900/50 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                </div>

                <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-300">Customization</h3>
                    <div className="p-3 bg-gray-900/30 rounded-md space-y-3 border border-gray-700">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-300">Company Logo</span>
                            <div className="flex items-center gap-2">
                                <label htmlFor="logo-upload" className={`flex items-center gap-2 text-sm bg-gray-600/50 hover:bg-gray-600/80 border border-gray-500 text-gray-200 font-semibold py-1 px-3 rounded-md transition ${isGenerated ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
                                    <UploadIcon />
                                    Change
                                </label>
                                <input type="file" id="logo-upload" accept="image/*" className="hidden" onChange={handleLogoChange} disabled={isGenerated} />
                                {logo && (
                                    <button
                                        onClick={() => setLogo(null)}
                                        disabled={isGenerated}
                                        className="p-2 bg-red-800/50 hover:bg-red-700 rounded-md transition text-red-300 hover:text-white disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed"
                                        aria-label="Remove logo"
                                    >
                                        <TrashIcon />
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="logo-size" className={`text-sm text-gray-300 ${isGenerated ? 'opacity-50' : ''}`}>Logo Size</label>
                            <div className="flex items-center gap-2">
                                <input 
                                    type="range" 
                                    id="logo-size" 
                                    min="24" 
                                    max="128" 
                                    value={logoSize} 
                                    onChange={(e) => setLogoSize(Number(e.target.value))}
                                    disabled={isGenerated}
                                    className="w-24 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                                <span className="text-xs font-mono text-gray-400 w-8 text-right">{logoSize}px</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                             <label htmlFor="show-qr" className={`text-sm text-gray-300 ${isGenerated ? 'opacity-50' : ''}`}>Show QR Code</label>
                            <label htmlFor="show-qr" className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" id="show-qr" className="sr-only peer" checked={showQrCode} onChange={(e) => setShowQrCode(e.target.checked)} disabled={isGenerated} />
                                <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600 peer-disabled:opacity-50 peer-disabled:cursor-not-allowed"></div>
                            </label>
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Line Items</label>
                    <div className="space-y-3">
                        {items.map((item, index) => (
                            <div key={item.id} className="flex items-center gap-2 p-2 bg-gray-900/30 rounded-md">
                                <span className="text-gray-400 font-mono text-xs">{index + 1}.</span>
                                <input
                                    type="text"
                                    aria-label="Item Label"
                                    value={item.label}
                                    onChange={(e) => handleUpdateItem(item.id, 'label', e.target.value)}
                                    disabled={isGenerated}
                                    className="flex-grow bg-gray-700 border border-gray-600 rounded-md px-2 py-1 text-white focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition text-sm disabled:opacity-50"
                                    placeholder="Label"
                                />
                                <input
                                    type="text"
                                    aria-label="Item Value"
                                    value={item.value}
                                    onChange={(e) => handleUpdateItem(item.id, 'value', e.target.value)}
                                    disabled={isGenerated}
                                    className="w-28 bg-gray-700 border border-gray-600 rounded-md px-2 py-1 text-white focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition text-sm disabled:opacity-50"
                                    placeholder="Value"
                                />
                                <button
                                    onClick={() => handleRemoveItem(item.id)}
                                    disabled={isGenerated}
                                    className="p-2 bg-red-800/50 hover:bg-red-700 rounded-md transition text-red-300 hover:text-white disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed"
                                    aria-label="Remove item"
                                >
                                    <TrashIcon />
                                </button>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={handleAddItem}
                        disabled={isGenerated}
                        className="mt-4 flex items-center gap-2 text-sm bg-cyan-600/30 hover:bg-cyan-600/50 border border-cyan-500 text-cyan-200 font-semibold py-2 px-4 rounded-md transition w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <PlusIcon /> Add Item
                    </button>
                </div>

                <div>
                    <label htmlFor="footer" className="block text-sm font-medium text-gray-300 mb-1">Footer</label>
                    <input
                        type="text"
                        id="footer"
                        value={footer}
                        onChange={(e) => setFooter(e.target.value)}
                        disabled={isGenerated}
                        className="w-full bg-gray-900/50 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                </div>
            </div>

            <div className="border-t border-gray-700 pt-6">
                <button
                    onClick={() => setIsGenerated(!isGenerated)}
                    className={`w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg text-lg font-bold transition-all transform hover:scale-105 ${isGenerated
                            ? 'bg-yellow-500 hover:bg-yellow-600 text-black'
                            : 'bg-cyan-500 hover:bg-cyan-600 text-white'
                        }`}
                >
                    {isGenerated ? (
                        <>
                            <EditIcon /> Edit Receipt
                        </>
                    ) : (
                        <>
                            <GenerateIcon /> Generate Receipt
                        </>
                    )}
                </button>
                <p className="text-xs text-gray-400 text-center mt-3">
                    {isGenerated ? "Click to unlock editor and make changes." : "Finalize the receipt to enable printing and downloading."}
                </p>
            </div>
        </div>
    );
};

export default ReceiptEditor;
