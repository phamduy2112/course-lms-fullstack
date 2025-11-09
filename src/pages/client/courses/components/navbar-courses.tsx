"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FilterSidebarProps {
  onToggle?: (isOpen: boolean) => void;
    isOpen: boolean;

}

const FilterSidebar = ({ onToggle,isOpen }: FilterSidebarProps) => {

  // const handleToggle = () => {
  //   const newState = !isOpen;
  //   setIsOpen(newState);
  //   onToggle?.(newState); // gửi trạng thái ra ngoài
  // };

  return (
    <motion.aside
      animate={{
        width: isOpen ? 250 : 0, // width động
        opacity: isOpen ? 1 : 0,
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="overflow-hidden border-r bg-white shadow-md p-4"
    >
      {isOpen && (
        <div>
        

          <Accordion
            type="multiple"
            defaultValue={["ratings", "duration"]}
            className="space-y-2"
          >
            {/* Ratings */}
            <AccordionItem value="ratings" className="border-none">
              <AccordionTrigger className="text-base font-semibold">
                Ratings
              </AccordionTrigger>
              <AccordionContent className="space-y-2">
                <RadioGroup defaultValue="4.5">
                  {[
                    { value: "4.5", label: "4.5 & up", count: "4.864" },
                    { value: "4.0", label: "4.0 & up", count: "10.000" },
                    { value: "3.5", label: "3.5 & up", count: "10.000" },
                    { value: "3.0", label: "3.0 & up", count: "10.000" },
                  ].map((item) => (
                    <Label
                      key={item.value}
                      htmlFor={item.value}
                      className="flex items-center gap-2  text-[.8rem] cursor-pointer"
                    >
                      <RadioGroupItem id={item.value} value={item.value} />
                      <span className="text-yellow-500 ">★★★★★</span>
                      <span>{item.label}</span>
                      <span className="text-gray-500">({item.count})</span>
                    </Label>
                  ))}
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}

      {/* Toggle button */}
    
    </motion.aside>
  );
};

export default FilterSidebar;
