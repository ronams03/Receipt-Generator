
import React, { useState, useCallback, useRef } from 'react';
import { ReceiptItem } from './types';
import ReceiptEditor from './components/ReceiptEditor';
import Receipt from './components/Receipt';
import { LogoIcon } from './components/icons';

const App: React.FC = () => {
    const [company, setCompany] = useState<string>('S.A.R.G. Industries');
    const [header, setHeader] = useState<string>('TRANSACTION RECEIPT');
    const [items, setItems] = useState<ReceiptItem[]>([
        { id: crypto.randomUUID(), label: 'Item Description', value: '1,250.00' },
        { id: crypto.randomUUID(), label: 'Tax (7.5%)', value: '93.75' },
        { id: crypto.randomUUID(), label: 'Service Charge', value: '50.00' },
    ]);
    const [footer, setFooter] = useState<string>('Thank you for your business!');
    const [isGenerated, setIsGenerated] = useState<boolean>(false);
    const [logo, setLogo] = useState<string | null>(null);
    const [showQrCode, setShowQrCode] = useState<boolean>(true);
    const [logoSize, setLogoSize] = useState<number>(64); // Default size 64px

    const receiptRef = useRef<HTMLDivElement>(null);

    const handleAddItem = useCallback(() => {
        setItems(prev => [...prev, { id: crypto.randomUUID(), label: 'New Item', value: '0.00' }]);
    }, []);

    const handleUpdateItem = useCallback((id: string, field: 'label' | 'value', newValue: string) => {
        setItems(prev => prev.map(item => item.id === id ? { ...item, [field]: newValue } : item));
    }, []);

    const handleRemoveItem = useCallback((id: string) => {
        setItems(prev => prev.filter(item => item.id !== id));
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-6 lg:p-8 font-sans">
            <header className="w-full max-w-5xl flex items-center justify-center sm:justify-start mb-6">
                <LogoIcon />
                <h1 className="text-2xl sm:text-3xl font-bold ml-3 text-cyan-400">
                    Super Artificial Receipt Generator
                </h1>
            </header>
            
            <main className="w-full max-w-5xl flex flex-col lg:flex-row gap-8">
                <div className="lg:w-1/2">
                    <ReceiptEditor 
                        company={company}
                        setCompany={setCompany}
                        header={header}
                        setHeader={setHeader}
                        items={items}
                        handleAddItem={handleAddItem}
                        handleUpdateItem={handleUpdateItem}
                        handleRemoveItem={handleRemoveItem}
                        footer={footer}
                        setFooter={setFooter}
                        isGenerated={isGenerated}
                        setIsGenerated={setIsGenerated}
                        logo={logo}
                        setLogo={setLogo}
                        showQrCode={showQrCode}
                        setShowQrCode={setShowQrCode}
                        logoSize={logoSize}
                        setLogoSize={setLogoSize}
                    />
                </div>
                <div className="lg:w-1/2">
                    <Receipt
                        ref={receiptRef}
                        company={company}
                        header={header}
                        items={items}
                        footer={footer}
                        isGenerated={isGenerated}
                        logo={logo}
                        showQrCode={showQrCode}
                        logoSize={logoSize}
                    />
                </div>
            </main>
            
            <footer className="w-full max-w-5xl text-center mt-8 text-gray-500 text-sm">
                <p>&copy; {new Date().getFullYear()} S.A.R.G. All rights reserved. For entertainment purposes only.</p>
            </footer>
        </div>
    );
};

export default App;
