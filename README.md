# Super Artificial Transaction Receipt Generator

A highly customizable tool for creating, editing, and generating artificial transaction receipts. Perfect for mockups, prototypes, or entertainment purposes.

![Screenshot of the Receipt Generator application in use]("sample.png") <!-- It's a good practice to add a real screenshot here -->

## ✨ Features

- **Editable Fields**: Customize the company name, header, footer, and individual line items (both label and value).
- **Dynamic Layout**: The receipt automatically adjusts its size to fit the content you provide.
- **Logo Customization**: Upload your own company logo and adjust its size with a simple slider.
- **QR Code Toggle**: Easily show or hide a placeholder QR code in the receipt's footer.
- **Live Preview**: See your changes reflected in the receipt preview in real-time.
- **Print & Download**: Once a receipt is generated, it can be printed directly from the browser or downloaded as a high-quality PNG image.
- **Modern UI**: A sleek, modern interface built with Tailwind CSS for a great user experience.

## 🚀 How to Use

1.  **Edit Content**: Use the "Receipt Editor" on the left to modify the `Company`, `Header`, `Footer`, and line items.
2.  **Customize Appearance**: 
    - Click `Change` to upload a custom logo. You can remove it anytime.
    - Use the `Logo Size` slider to adjust the logo's dimensions.
    - Toggle the `Show QR Code` switch to control its visibility.
3.  **Manage Items**: Click `Add Item` to add a new line to the receipt or click the trash icon (🗑️) to remove an existing one.
4.  **Generate**: When you're satisfied with the details, click the **Generate Receipt** button. This will lock the editor and enable the print/download functionality.
5.  **Print or Download**: Use the **Print** and **Download** buttons that appear below the receipt preview.
6.  **Re-edit**: Need to make more changes? Simply click the **Edit Receipt** button to unlock the editor again.

## 🛠️ Tech Stack

- **Framework**: React
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Image Generation**: `html2canvas` library

## ⚠️ Disclaimer

This application is intended for entertainment, educational, and prototyping purposes only. The receipts generated are artificial. **Do not use generated receipts for any fraudulent or illegal activities.**
