import React from "react";
import { Card } from "../ui/card";
import { ArrowDownToLine, IndianRupee } from "lucide-react";
import { PDFDocument,rgb } from "pdf-lib";

const OrderData = ({
  amount = 100,
  address = "123, abc street, xyz city",
  status = "pending",
  createdAt = "2021-09-01",
  updatedAt = "2021-09-01",
  products,
}) => {
  const handleDownloadInvoice = async () => {
    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([600, 800]);

      // Add header
      page.drawRectangle({
        x: 0,
        y: 720,
        width: 600,
        height: 80,
        color: rgb(0, 0.53, 0.71),
      });
      page.drawText("INVOICE", {
        x: 50,
        y: 750,
        size: 28,
        color: rgb(1, 1, 1),
      });
      page.drawText("CodeStore", {
        x: 400,
        y: 750,
        size: 12,
        color: rgb(1, 1, 1),
      });
      page.drawText("Mumbai, Maharashtra", { x: 400, y: 735, size: 10 });
      page.drawText("Email: support@company.com", { x: 400, y: 705, size: 10 });
      page.drawText("Phone: +1 234 567 890", { x: 400, y: 690, size: 10 });

      // Add order details
      page.drawText("Order Details", {
        x: 50,
        y: 670,
        size: 16,
        color: rgb(0, 0, 0),
      });
      page.drawText(`Paid: Rs.${amount}`, { x: 50, y: 630, size: 12 });
      page.drawText(`Status: ${status}`, { x: 50, y: 610, size: 12 });
      page.drawText(`Ordered On: ${new Date(createdAt).toLocaleString()}`, {
        x: 50,
        y: 590,
        size: 12,
      });
      page.drawText(`Updated On: ${new Date(updatedAt).toLocaleString()}`, {
        x: 50,
        y: 570,
        size: 12,
      });

      // Table Header
      page.drawRectangle({
        x: 50,
        y: 500,
        width: 500,
        height: 20,
        color: rgb(0.85, 0.85, 0.85),
      });
      page.drawText("Item", { x: 60, y: 505, size: 12 });
      page.drawText("Quantity", { x: 200, y: 505, size: 12 });
      page.drawText("Price", { x: 300, y: 505, size: 12 });
      page.drawText("Total", { x: 450, y: 505, size: 12 });

      // Products Table
      let yOffset = 485;
      products.forEach((product) => {
        page.drawText(`${product?.id?.name?.substring(0, 10) + "..."}`, {
          x: 60,
          y: yOffset,
          size: 12,
        });
        page.drawText(`${product?.quantity}`, { x: 200, y: yOffset, size: 12 });
        page.drawText(`Rs.${product?.id?.price}`, {
          x: 300,
          y: yOffset,
          size: 12,
        });
        page.drawText(`Rs.${product?.quantity * product?.id?.price}`, {
          x: 450,
          y: yOffset,
          size: 12,
        });
        yOffset -= 20;
      });

      // Add footer
      page.drawRectangle({
        x: 0,
        y: 0,
        width: 600,
        height: 40,
        color: rgb(0.1, 0.1, 0.1),
      });
      page.drawText("Thank you for your order!", {
        x: 230,
        y: 15,
        size: 12,
        color: rgb(1, 1, 1),
      });

      // Save the PDF and trigger download
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "invoice.pdf";
      link.click();
    } catch (error) {
      console.error("Error generating PDF invoice:", error);
    }
  };

  return (
  <>
  </>
  );
};

export default OrderData;
