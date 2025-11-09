"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CiExport } from "react-icons/ci";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { MdFilterList } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { Input } from "@/components/ui/input";
const invoices = [
  { invoice: "INV001", paymentStatus: "Paid", totalAmount: "$250.00", paymentMethod: "Credit Card" },
  { invoice: "INV002", paymentStatus: "Pending", totalAmount: "$150.00", paymentMethod: "PayPal" },
  { invoice: "INV003", paymentStatus: "Unpaid", totalAmount: "$350.00", paymentMethod: "Bank Transfer" },
  { invoice: "INV004", paymentStatus: "Paid", totalAmount: "$450.00", paymentMethod: "Credit Card" },
  { invoice: "INV005", paymentStatus: "Paid", totalAmount: "$550.00", paymentMethod: "PayPal" },
  { invoice: "INV006", paymentStatus: "Pending", totalAmount: "$200.00", paymentMethod: "Bank Transfer" },
  { invoice: "INV007", paymentStatus: "Unpaid", totalAmount: "$300.00", paymentMethod: "Credit Card" },
];

const AdminCourses = () => {
  const [selected, setSelected] = useState<string[]>([]);

  // kiểm tra nếu tất cả được chọn
  const allChecked = selected.length === invoices.length;

  // toggle tất cả checkbox
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelected(invoices.map((i) => i.invoice));
    } else {
      setSelected([]);
    }
  };

  // toggle từng checkbox
  const handleSelectOne = (invoice: string, checked: boolean) => {
    if (checked) {
      setSelected((prev) => [...prev, invoice]);
    } else {
      setSelected((prev) => prev.filter((i) => i !== invoice));
    }
  };

  console.log("Selected invoices:", selected); // xem danh sách invoice đã chọn

  return (
    <div>
      <h1 className="text-lg pb-3 font-bold">Courses List</h1>
      <div className="border">
        {/* Header */}
        <div className="flex py-3 border-b px-6 justify-between items-center">
          <div>
            <h1 className="font-bold">Courses List</h1>
            <p className="text-sm">Track your store's progress to boost your sales.</p>
          </div>
          <div className="flex gap-5">
            <Button size="lg" variant="outline" className="text-black cursor-pointer">
              Export
              <CiExport />
            </Button>
            <Button size="lg" className="text-black cursor-pointer bg-blue-600">
              <Plus />
              Add Courses
            </Button>
          </div>
        </div>
        <div className="flex py-3 border-b px-6 justify-between items-center"
        >
            
<form 
    className='flex lg:w-[20rem] border rounded-3xl'>
           <Input
placeholder="Nhập từ khóa tìm kiếm..."

  className="border-none bg-transparent 
w-[96%]
  shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
/>
<Button
  type="submit"
  size="icon"
  variant="default"
  className="!rounded-[1000px] !bg-blue-700 !hover:bg-blue-800 text-white"
  
>
  <IoSearchOutline size={16} />
</Button>



    </form>
            <div className="flex">
               
<Button size="lg" variant="outline" className="text-black cursor-pointer">
              Filter
              <MdFilterList />
            </Button>
            </div>
            
        </div>

        {/* Table */}
        <Table>
      
          <TableHeader>
            <TableRow >
              <TableHead>
                <Checkbox
                  id="all"
                  checked={allChecked}
                  onCheckedChange={(checked) => handleSelectAll(checked === true)}
                />
              </TableHead>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.invoice} >
                <TableCell>
                  <Checkbox
                    id={invoice.invoice}
                    checked={selected.includes(invoice.invoice)}
                    onCheckedChange={(checked) =>
                      handleSelectOne(invoice.invoice, checked === true)
                    }
                  />
                </TableCell>
                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                <TableCell>{invoice.paymentStatus}</TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell className="text-right">{invoice.totalAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
      
        </Table>
           <div className="flex border-t justify-between items-center px-6">
                <p className="text-sm">Showing 1 to 7 of 20</p>
                <div>
                    <Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>
                </div>
            </div>
      </div>
    </div>
  );
};

export default AdminCourses;
